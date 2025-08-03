// 1. Initialize map
const map = L.map('map').setView([40.7, -77.9], 7);

// 2. Base tile
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Sidebar setup
const sidebar = L.control.sidebar({
  container: 'sidebar',
  closeButton: true,
  position: 'right'
}).addTo(map);
// Open the Senate pane by default
sidebar.open('senate');

// 4. Highlight trackers
let highlightedSenate = null;
let highlightedHouse  = null;
let searchMarker = null; // Track the search marker

// 5. Style by party (handles both chambers)
function styleByParty(feature) {
  const props = feature.properties;
  const party =
    props["PA_State_Senators_with_District_Counties_Party"] ||
    props["2025_House_Members_PARTY"];
  const colors = { D: '#3366CC', R: '#DC3912', I: '#999999' };
  return {
    fillColor: colors[party] || '#FFFFFF',
    color: '#333',
    weight: 1,
    fillOpacity: 0.7
  };
}

// 6. Prepare layer‐groups for labels
const senateLabels = L.layerGroup();
const houseLabels  = L.layerGroup();

// 7. Load Senate districts
let senateLayer, houseLayer;
let baseLayers; // Define baseLayers globally

fetch('Senate_Districts.geojson')
  .then(r => r.json())
  .then(senData => {
    senateLayer = L.geoJSON(senData, {
      style: styleByParty,
      onEachFeature: onEachSenate
    }).addTo(map);
    // Add Senate labels (just district numbers) - CENTERED
    addLabels(senateLayer, senateLabels, 'Senate');
    populateList(senData.features, 'senate-list', 'Senate');
  });

// 8. Load House districts
fetch('House_Districts.geojson')
  .then(r => r.json())
  .then(houseData => {
    houseLayer = L.geoJSON(houseData, {
      style: styleByParty,
      onEachFeature: onEachHouse
    }).addTo(map);
    // Add House labels (just district numbers) - CENTERED
    addLabels(houseLayer, houseLabels, 'House');
    populateHouseList(houseData.features);

    // 9. Layer control (mutually exclusive) - COMBINED
    baseLayers = {
      "Senate Districts": L.layerGroup([senateLayer, senateLabels]),
      "House Districts":  L.layerGroup([houseLayer,  houseLabels ])
    };
    
    // Create custom control that combines layer switching with sidebar
    const customControl = L.Control.extend({
      onAdd: function(map) {
        const div = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control');
        
        div.innerHTML = `
          <div style="background: white; padding: 8px; border-radius: 4px; box-shadow: 0 0 6px rgba(0,0,0,0.3);">
            <div style="margin-bottom: 8px; font-weight: bold; font-size: 14px;">Legislature</div>
            <label style="display: block; margin-bottom: 4px; font-size: 13px; cursor: pointer;">
              <input type="radio" name="chamber" value="senate" checked style="margin-right: 6px;"> Senate Districts
            </label>
            <label style="display: block; font-size: 13px; cursor: pointer;">
              <input type="radio" name="chamber" value="house" style="margin-right: 6px;"> House Districts
            </label>
          </div>
        `;
        
        // Add event listeners
        const radioButtons = div.querySelectorAll('input[name="chamber"]');
        radioButtons.forEach(radio => {
          radio.addEventListener('change', function() {
            if (this.value === 'senate') {
              // Switch to Senate
              map.removeLayer(baseLayers["House Districts"]);
              baseLayers["Senate Districts"].addTo(map);
              sidebar.open('senate');
            } else {
              // Switch to House
              map.removeLayer(baseLayers["Senate Districts"]);
              baseLayers["House Districts"].addTo(map);
              sidebar.open('house');
            }
          });
        });
        
        // Prevent map clicks when interacting with control
        L.DomEvent.disableClickPropagation(div);
        
        return div;
      }
    });
    
    new customControl({ position: 'topright' }).addTo(map);
    
    // Start with Senate districts
    baseLayers["Senate Districts"].addTo(map);
  });

// 10. Helper: drop district labels into the given label group (CENTERED)
function addLabels(polyLayer, labelGroup, prefix) {
  polyLayer.eachLayer(layer => {
    const props = layer.feature.properties;
    // Get district number based on chamber type
    let num;
    if (prefix === 'Senate') {
      num = parseInt(props.sldust, 10);
    } else {
      num = props.distr_num;
    }
    
    // Calculate true centroid for better centering
    const bounds = layer.getBounds();
    const centroid = bounds.getCenter();
    
    // For complex polygons, try to get a better center point
    let labelPosition = centroid;
    if (layer.feature.geometry.type === 'Polygon' || layer.feature.geometry.type === 'MultiPolygon') {
      // Use geometric centroid which should be more centered
      labelPosition = centroid;
    }
    
    L.marker(labelPosition, {
      icon: L.divIcon({
        className: 'district-label',
        html: `<span>${num}</span>`, // JUST THE NUMBER
        iconSize: [24, 24],
        iconAnchor: [12, 12] // Center the label
      })
    }).addTo(labelGroup);
  });
}

// Helper function to format names properly
function formatName(name) {
  if (!name) return '';
  return name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Helper function to clear search marker
function clearSearchMarker() {
  if (searchMarker) {
    map.removeLayer(searchMarker);
    searchMarker = null;
  }
}

// 11. Populate Senate sidebar list (SORTED BY DISTRICT NUMBER) - UPDATED FORMAT
function populateList(features, containerId, prefix) {
  // Sort features by district number in ASCENDING order
  const sortedFeatures = features.sort((a, b) => {
    const districtA = parseInt(a.properties.sldust, 10);
    const districtB = parseInt(b.properties.sldust, 10);
    return districtA - districtB;
  });

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';
  
  sortedFeatures.forEach(f => {
    const p = f.properties;
    const name     = formatName(p["PA_State_Senators_with_District_Counties_Name"]);
    const district = parseInt(p.sldust, 10);
    const li = document.createElement('li');
    li.textContent = `District ${district}: Senator ${name}`;
    li.style.cursor = 'pointer';
    li.style.padding = '8px 12px';
    li.style.borderBottom = '1px solid #eee';
    li.style.fontSize = '14px';
    
    li.onmouseover = () => li.style.backgroundColor = '#f0f0f0';
    li.onmouseout = () => li.style.backgroundColor = 'transparent';
    
    li.onclick = () => {
      map.fitBounds(L.geoJSON(f).getBounds());
      // Clear search marker when clicking on district
      clearSearchMarker();
      // highlight & popup
      senateLayer.eachLayer(layer => {
        if (parseInt(layer.feature.properties.sldust,10) === district) {
          layer.fire('click');
        }
      });
    };
    ul.appendChild(li);
  });
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  container.appendChild(ul);
}

// 12. Populate House sidebar list (SORTED BY DISTRICT NUMBER) - UPDATED FORMAT
function populateHouseList(features) {
  // Sort features by district number in ASCENDING order
  const sortedFeatures = features.sort((a, b) => {
    const districtA = parseInt(a.properties.distr_num, 10);
    const districtB = parseInt(b.properties.distr_num, 10);
    return districtA - districtB;
  });

  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  ul.style.margin = '0';
  
  sortedFeatures.forEach(f => {
    const p = f.properties;
    const name     = formatName(p["2025_House_Members_NAME"]);
    const district = p.distr_num;
    const li = document.createElement('li');
    li.textContent = `District ${district}: Representative ${name}`;
    li.style.cursor = 'pointer';
    li.style.padding = '8px 12px';
    li.style.borderBottom = '1px solid #eee';
    li.style.fontSize = '14px';
    
    li.onmouseover = () => li.style.backgroundColor = '#f0f0f0';
    li.onmouseout = () => li.style.backgroundColor = 'transparent';
    
    li.onclick = () => {
      map.fitBounds(L.geoJSON(f).getBounds());
      // Clear search marker when clicking on district
      clearSearchMarker();
      // highlight & popup
      houseLayer.eachLayer(layer => {
        if (layer.feature.properties.distr_num === district) {
          layer.fire('click');
        }
      });
    };
    ul.appendChild(li);
  });
  const container = document.getElementById('house-list');
  container.innerHTML = '';
  container.appendChild(ul);
}

// Add sidebar tab click handlers to control map display
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit for sidebar to be fully initialized
  setTimeout(() => {
    const senateTab = document.querySelector('a[href="#senate"]');
    const houseTab = document.querySelector('a[href="#house"]');
    
    if (senateTab) {
      senateTab.addEventListener('click', function() {
        if (baseLayers) {
          map.removeLayer(baseLayers["House Districts"]);
          baseLayers["Senate Districts"].addTo(map);
          // Update radio button
          const senateRadio = document.querySelector('input[value="senate"]');
          if (senateRadio) senateRadio.checked = true;
        }
      });
    }
    
    if (houseTab) {
      houseTab.addEventListener('click', function() {
        if (baseLayers) {
          map.removeLayer(baseLayers["Senate Districts"]);
          baseLayers["House Districts"].addTo(map);
          // Update radio button
          const houseRadio = document.querySelector('input[value="house"]');
          if (houseRadio) houseRadio.checked = true;
        }
      });
    }
  }, 1000);
});

// 13. Senate popup + highlight
function onEachSenate(feature, layer) {
  const p = feature.properties;
  const num      = parseInt(p.sldust, 10);
  const name     = formatName(p["PA_State_Senators_with_District_Counties_Name"]);
  const party    = p["PA_State_Senators_with_District_Counties_Party"];
  const counties = p["PA_State_Senators_with_District_Counties_District Counties Covered"];
  const bioUrl   = `https://www.legis.state.pa.us/cfdocs/legis/home/member_information/senate_bio.cfm?ID=${num}`;

  layer.bindPopup(`
    <strong>${name}</strong><br/>
    Party: ${party}<br/>
    District: ${num}<br/>
    Counties: ${counties}<br/>
    <button onclick="window.open('${bioUrl}','_blank')">More…</button>
  `);

  layer.on('click', () => {
    if (highlightedSenate) highlightedSenate.setStyle(styleByParty(highlightedSenate.feature));
    layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.5 });
    highlightedSenate = layer;
    layer.openPopup();
  });
}

// 14. House popup + highlight
function onEachHouse(feature, layer) {
  const p = feature.properties;
  const num      = p.distr_num;
  const name     = formatName(p["2025_House_Members_NAME"]);
  const party    = p["2025_House_Members_PARTY"];
  const counties = p["2025_House_Members_COUNTIES"];
  const photoUrl = p["2025_House_Members_PHOTO"];

  layer.bindPopup(`
    <strong>${name}</strong><br/>
    Party: ${party}<br/>
    District: ${num}<br/>
    Counties: ${counties}<br/>
    <button onclick="window.open('${photoUrl}','_blank')">Photo</button>
  `);

  layer.on('click', () => {
    if (highlightedHouse) highlightedHouse.setStyle(styleByParty(highlightedHouse.feature));
    layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.5 });
    highlightedHouse = layer;
    layer.openPopup();
  });
}

// 15. Address search with improved functionality
L.Control.geocoder({ 
  defaultMarkGeocode: false,
  placeholder: 'Search address...',
  errorMessage: 'Address not found'
})
  .on('markgeocode', e => {
    // Clear any existing search marker
    clearSearchMarker();
    
    // Create new search marker
    searchMarker = L.marker(e.geocode.center)
      .bindPopup(`<strong>Location:</strong><br/>${e.geocode.name}`)
      .addTo(map);
    
    // Zoom to location but not too close
    map.setView(e.geocode.center, 13);
    
    // Open popup
    searchMarker.openPopup();
  })
  .addTo(map);

// Clear search marker when clicking elsewhere on map
map.on('click', (e) => {
  // Only clear if not clicking on a feature
  setTimeout(() => {
    if (!e.originalEvent.defaultPrevented) {
      clearSearchMarker();
    }
  }, 100);
});
