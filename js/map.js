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

// 4. Official legislature website links
const senateLinks = {
  1: "https://www.palegis.us/senate/members/bio/1921/sen-saval", // Nikil Saval
  2: "https://www.palegis.us/senate/members/bio/277/senator-christine-tartaglione", // Christine M. Tartaglione
  3: "https://www.palegis.us/senate/members/bio/1767/senator-sharif-street", // Sharif Street
  4: "https://www.palegis.us/senate/members/bio/1689/senator-art-haywood", // Art Haywood
  5: "https://www.palegis.us/senate/members/bio/2036/senator-joe-picozzi", // Joe Picozzi
  6: "https://www.palegis.us/senate/members/bio/1169/senator-frank-farry", // Frank A. Farry
  7: "https://www.palegis.us/senate/members/bio/152/senator-vincent-hughes", // Vincent J. Hughes
  8: "https://www.palegis.us/senate/members/bio/153/senator-anthony-williams", // Anthony H. Williams
  9: "https://www.palegis.us/senate/members/bio/1925/senator-john-kane", // John I. Kane
  10: "https://www.palegis.us/senate/members/bio/1179/senator-steven-santarsiero", // Steven J. Santarsiero
  11: "https://www.palegis.us/senate/members/bio/1234/senator-judith-schwank", // Judith L. Schwank
  12: "https://www.palegis.us/senate/members/bio/1799/senator-maria-collett", // Maria Collett
  13: "https://www.palegis.us/senate/members/bio/1763/senator-scott-martin", // Scott Martin
  14: "https://www.palegis.us/senate/members/bio/2009/senator-nick-miller", // Nick Miller
  15: "https://www.palegis.us/senate/members/bio/1636/sen-kim", // Patty Kim
  16: "https://www.palegis.us/senate/members/bio/2008/senator-jarrett-coleman", // Jarrett Coleman
  17: "https://www.palegis.us/senate/members/bio/1923/senator-amanda-cappelletti", // Amanda M. Cappelletti
  18: "https://www.palegis.us/senate/members/bio/179/senator-lisa-boscola", // Lisa M. Boscola
  19: "https://www.palegis.us/senate/members/bio/1790/senator-carolyn-comitta", // Carolyn T. Comitta
  20: "https://www.palegis.us/senate/members/bio/1077/senator-lisa-baker", // Lisa Baker
  21: "https://www.palegis.us/senate/members/bio/1629/senator-scott-hutchinson", // Scott E. Hutchinson
  22: "https://www.palegis.us/senate/members/bio/1626/senator-marty-flynn", // Marty Flynn
  23: "https://www.palegis.us/senate/members/bio/1186/sen-gene-yaw", // Gene Yaw
  24: "https://www.palegis.us/senate/members/bio/1912/senator-tracy-pennycuick", // Tracy Pennycuick
  25: "https://www.palegis.us/senate/members/bio/1687/senator-cris-dush", // Cris Dush
  26: "https://www.palegis.us/senate/members/bio/1800/senator-timothy-kearney", // Timothy P. Kearney
  27: "https://www.palegis.us/senate/members/bio/1202/senator-lynda-culver", // Lynda Schlegel Culver
  28: "https://www.palegis.us/senate/members/bio/1801/senator-kristin-phillips-hill", // Kristin Phillips-Hill
  29: "https://www.palegis.us/senate/members/bio/69/senator-david-argall", // David G. Argall
  30: "https://www.palegis.us/senate/members/bio/1683/senator-judy-ward", // Judy Ward
  31: "https://www.palegis.us/senate/members/bio/1748/senator-dawn-keefer", // Dawn W. Keefer
  32: "https://www.palegis.us/senate/members/bio/1697/senator-patrick-stefano", // Patrick J. Stefano
  33: "https://www.palegis.us/senate/members/bio/1869/senator-doug-mastriano", // Doug Mastriano
  34: "https://www.palegis.us/senate/members/bio/1733/senator-greg-rothman", // Greg Rothman
  35: "https://www.palegis.us/senate/members/bio/1764/senator-wayne-langerholc", // Wayne Langerholc
  36: "https://www.palegis.us/senate/members/bio/2061/senator-james-malone", // James Andrew Malone
  37: "https://www.palegis.us/senate/members/bio/1924/senator-devlin-robinson", // Devlin J. Robinson
  38: "https://www.palegis.us/senate/members/bio/1803/senator-lindsey-williams", // Lindsey M. Williams
  39: "https://www.palegis.us/senate/members/bio/1188/senator-kim-ward", // Kim L. Ward
  40: "https://www.palegis.us/senate/members/bio/1200/senator-rosemary-brown", // Rosemary M. Brown
  41: "https://www.palegis.us/senate/members/bio/1870/senator-joe-pittman", // Joe Pittman
  42: "https://www.palegis.us/senate/members/bio/1041/senator-wayne-fontana", // Wayne D. Fontana
  43: "https://www.palegis.us/senate/members/bio/254/senator-jay-costa", // Jay Costa
  44: "https://www.palegis.us/senate/members/bio/1802/senator-katie-muth", // Katie J. Muth
  45: "https://www.palegis.us/senate/members/bio/1900/senator-nick-pisciottano", // Nick Pisciottano
  46: "https://www.palegis.us/senate/members/bio/1698/senator-camera-bartolotta", // Camera Bartolotta
  47: "https://www.palegis.us/senate/members/bio/1189/senator-elder-vogel", // Elder A. Vogel
  48: "https://www.palegis.us/senate/members/bio/1928/senator-chris-gebhard", // Chris Gebhard
  49: "https://www.palegis.us/senate/members/bio/1766/senator-daniel-laughlin", // Daniel Laughlin
  50: "https://www.palegis.us/senate/members/bio/1087/senator-michele-brooks" // Michele Brooks
};

const houseLinks = {
  1: "https://www.palegis.us/house/members/bio/1081/representative-patrick-harkins",
  2: "https://www.palegis.us/house/members/bio/1822/representative-robert-merski",
  3: "https://www.palegis.us/house/members/bio/1619/representative-ryan-bizzarro",
  4: "https://www.palegis.us/house/members/bio/1937/representative-jacob-banta",
  5: "https://www.palegis.us/house/members/bio/2021/representative-eric-weaknecht",
  6: "https://www.palegis.us/house/members/bio/1083/representative-brad-roae",
  7: "https://www.palegis.us/house/members/bio/1709/representative-parke-wentling",
  8: "https://www.palegis.us/house/members/bio/1742/representative-aaron-bernstine",
  9: "https://www.palegis.us/house/members/bio/1938/representative-marla-brown",
  10: "https://www.palegis.us/house/members/bio/1919/representative-amen-brown",
  11: "https://www.palegis.us/house/members/bio/1868/representative-marci-mustello",
  12: "https://www.palegis.us/house/members/bio/1939/representative-stephenie-scialabba",
  13: "https://www.palegis.us/house/members/bio/1215/representative-john-lawrence",
  14: "https://www.palegis.us/house/members/bio/2022/representative-roman-kozak",
  15: "https://www.palegis.us/house/members/bio/1823/representative-joshua-kail",
  16: "https://www.palegis.us/house/members/bio/1173/representative-robert-matzie",
  17: "https://www.palegis.us/house/members/bio/1877/representative-timothy-bonner",
  18: "https://www.palegis.us/house/members/bio/1876/representative-kathleen-tomlinson",
  19: "https://www.palegis.us/house/members/bio/1933/representative-aerion-abney",
  20: "https://www.palegis.us/house/members/bio/1896/representative-emily-kinkead",
  21: "https://www.palegis.us/house/members/bio/2016/representative-lindsay-powell",
  22: "https://www.palegis.us/house/members/bio/1940/representative-joshua-siegel",
  23: "https://www.palegis.us/house/members/bio/84/representative-dan-frankel",
  24: "https://www.palegis.us/house/members/bio/1941/representative-latasha-mayes",
  25: "https://www.palegis.us/house/members/bio/1825/representative-brandon-markosek",
  26: "https://www.palegis.us/house/members/bio/1942/representative-paul-friel",
  27: "https://www.palegis.us/house/members/bio/1166/representative-daniel-deasy",
  28: "https://www.palegis.us/house/members/bio/2023/representative-jeremy-shaffer",
  29: "https://www.palegis.us/house/members/bio/1943/representative-tim-brennan",
  30: "https://www.palegis.us/house/members/bio/1944/representative-arvind-venkat",
  31: "https://www.palegis.us/house/members/bio/1743/representative-perry-warren",
  32: "https://www.palegis.us/house/members/bio/2011/representative-joe-mcandrew",
  33: "https://www.palegis.us/house/members/bio/1945/representative-mandy-steele",
  34: "https://www.palegis.us/house/members/bio/2012/representative-abigail-salisbury",
  35: "https://www.palegis.us/house/members/bio/2060/representative-dan-goughnour",
  36: "https://www.palegis.us/house/members/bio/1899/representative-jessica-benham",
  37: "https://www.palegis.us/house/members/bio/1625/representative-mindy-fee",
  38: "https://www.palegis.us/house/members/bio/2024/representative-john-inglis",
  39: "https://www.palegis.us/house/members/bio/1946/representative-andrew-kuzma",
  40: "https://www.palegis.us/house/members/bio/1830/representative-natalie-mihalek",
  41: "https://www.palegis.us/house/members/bio/1699/representative-brett-miller",
  42: "https://www.palegis.us/house/members/bio/1679/representative-dan-miller",
  43: "https://www.palegis.us/house/members/bio/1632/representative-keith-greiner",
  44: "https://www.palegis.us/house/members/bio/1831/representative-valerie-gaydos",
  45: "https://www.palegis.us/house/members/bio/1744/representative-anita-kulik",
  46: "https://www.palegis.us/house/members/bio/1701/representative-jason-ortitay",
  47: "https://www.palegis.us/house/members/bio/1947/representative-joseph-dorsie",
  48: "https://www.palegis.us/house/members/bio/1797/representative-timothy-oneal",
  49: "https://www.palegis.us/house/members/bio/1948/representative-ismail-smith-wade-el",
  50: "https://www.palegis.us/house/members/bio/1745/representative-bud-cook",
  51: "https://www.palegis.us/house/members/bio/1949/representative-charity-krupa",
  52: "https://www.palegis.us/house/members/bio/1708/representative-ryan-warner",
  53: "https://www.palegis.us/house/members/bio/1832/representative-steven-malagari",
  54: "https://www.palegis.us/house/members/bio/1950/representative-greg-scott",
  55: "https://www.palegis.us/house/members/bio/1951/representative-jill-cooper",
  56: "https://www.palegis.us/house/members/bio/2025/representative-brian-rasel",
  57: "https://www.palegis.us/house/members/bio/1738/representative-eric-nelson",
  58: "https://www.palegis.us/house/members/bio/1875/representative-eric-davanzo",
  59: "https://www.palegis.us/house/members/bio/1927/representative-leslie-rossi",
  60: "https://www.palegis.us/house/members/bio/1926/representative-abby-major",
  61: "https://www.palegis.us/house/members/bio/1834/representative-liz-hanbidge",
  62: "https://www.palegis.us/house/members/bio/1835/representative-james-struzzi",
  63: "https://www.palegis.us/house/members/bio/2026/representative-josh-bashline",
  64: "https://www.palegis.us/house/members/bio/1634/representative-lee-james",
  65: "https://www.palegis.us/house/members/bio/1028/representative-kathy-rapp",
  66: "https://www.palegis.us/house/members/bio/1902/representative-brian-smith",
  67: "https://www.palegis.us/house/members/bio/982/representative-martin-causer",
  68: "https://www.palegis.us/house/members/bio/1796/representative-clint-owlett",
  69: "https://www.palegis.us/house/members/bio/1174/representative-carl-metzgar",
  70: "https://www.palegis.us/house/members/bio/1161/representative-matthew-bradford",
  71: "https://www.palegis.us/house/members/bio/1836/representative-jim-rigby",
  72: "https://www.palegis.us/house/members/bio/1163/representative-frank-burns",
  73: "https://www.palegis.us/house/members/bio/1952/representative-dallas-kephart",
  74: "https://www.palegis.us/house/members/bio/1837/representative-dan-williams",
  75: "https://www.palegis.us/house/members/bio/1903/representative-mike-armanini",
  76: "https://www.palegis.us/house/members/bio/1838/representative-stephanie-borowicz",
  77: "https://www.palegis.us/house/members/bio/1096/representative-scott-conklin",
  78: "https://www.palegis.us/house/members/bio/1681/representative-jesse-topper",
  79: "https://www.palegis.us/house/members/bio/1839/representative-louis-schmitt",
  80: "https://www.palegis.us/house/members/bio/2027/representative-scott-barger",
  81: "https://www.palegis.us/house/members/bio/1691/representative-rich-irvin",
  82: "https://www.palegis.us/house/members/bio/1953/representative-paul-takac",
  83: "https://www.palegis.us/house/members/bio/1954/representative-jamie-flick",
  84: "https://www.palegis.us/house/members/bio/1904/representative-joe-hamm",
  85: "https://www.palegis.us/house/members/bio/1871/representative-david-rowe",
  86: "https://www.palegis.us/house/members/bio/1905/representative-perry-stambaugh",
  87: "https://www.palegis.us/house/members/bio/1955/representative-thomas-kutz",
  88: "https://www.palegis.us/house/members/bio/1167/representative-sheryl-delozier",
  89: "https://www.palegis.us/house/members/bio/1022/representative-rob-kauffman",
  90: "https://www.palegis.us/house/members/bio/2028/representative-chad-reichard",
  91: "https://www.palegis.us/house/members/bio/1101/representative-dan-moul",
  92: "https://www.palegis.us/house/members/bio/2029/representative-marc-anderson",
  93: "https://www.palegis.us/house/members/bio/1842/representative-mike-jones",
  94: "https://www.palegis.us/house/members/bio/1956/representative-wendy-fink",
  95: "https://www.palegis.us/house/members/bio/1749/representative-carol-hill-evans",
  96: "https://www.palegis.us/house/members/bio/2030/representative-nikki-rivera",
  97: "https://www.palegis.us/house/members/bio/1642/representative-steven-mentzer",
  98: "https://www.palegis.us/house/members/bio/1957/representative-tom-jones",
  99: "https://www.palegis.us/house/members/bio/1711/representative-david-zimmerman",
  100: "https://www.palegis.us/house/members/bio/1105/representative-bryan-cutler",
  101: "https://www.palegis.us/house/members/bio/1958/representative-john-schlegel",
  102: "https://www.palegis.us/house/members/bio/1686/representative-russ-diamond",
  103: "https://www.palegis.us/house/members/bio/2031/representative-nathan-davidson",
  104: "https://www.palegis.us/house/members/bio/1959/representative-dave-madsen",
  105: "https://www.palegis.us/house/members/bio/1960/representative-justin-fleming",
  106: "https://www.palegis.us/house/members/bio/1751/representative-thomas-mehaffie",
  107: "https://www.palegis.us/house/members/bio/1961/representative-joanne-stehr",
  108: "https://www.palegis.us/house/members/bio/2014/representative-michael-stender",
  109: "https://www.palegis.us/house/members/bio/1962/representative-robert-leadbeter",
  110: "https://www.palegis.us/house/members/bio/97/representative-tina-pickett",
  111: "https://www.palegis.us/house/members/bio/1752/representative-jonathan-fritz",
  112: "https://www.palegis.us/house/members/bio/1844/representative-kyle-mullins",
  113: "https://www.palegis.us/house/members/bio/1963/representative-kyle-donahue",
  114: "https://www.palegis.us/house/members/bio/1866/representative-bridget-kosierowski",
  115: "https://www.palegis.us/house/members/bio/1753/representative-maureen-madden",
  116: "https://www.palegis.us/house/members/bio/1964/representative-dane-watro",
  117: "https://www.palegis.us/house/members/bio/2032/representative-jamie-walsh",
  118: "https://www.palegis.us/house/members/bio/1966/representative-jim-haddock",
  119: "https://www.palegis.us/house/members/bio/1967/representative-alec-ryncavage",
  120: "https://www.palegis.us/house/members/bio/2033/representative-brenda-pugh",
  121: "https://www.palegis.us/house/members/bio/1112/representative-eddie-pashinski",
  122: "https://www.palegis.us/house/members/bio/1211/representative-doyle-heffley",
  123: "https://www.palegis.us/house/members/bio/1906/representative-tim-twardzik",
  124: "https://www.palegis.us/house/members/bio/1968/representative-jamie-barton",
  125: "https://www.palegis.us/house/members/bio/1907/representative-joe-kerwin",
  126: "https://www.palegis.us/house/members/bio/2034/representative-jacklyn-rusnock",
  127: "https://www.palegis.us/house/members/bio/1908/representative-manuel-guzman",
  128: "https://www.palegis.us/house/members/bio/1209/representative-mark-gillen",
  129: "https://www.palegis.us/house/members/bio/1969/representative-johanny-cepeda-freytiz",
  130: "https://www.palegis.us/house/members/bio/1226/representative-david-maloney",
  131: "https://www.palegis.us/house/members/bio/1909/representative-milou-mackenzie",
  132: "https://www.palegis.us/house/members/bio/1649/representative-michael-schlossberg",
  133: "https://www.palegis.us/house/members/bio/1793/representative-jeanne-mcneill",
  134: "https://www.palegis.us/house/members/bio/1706/representative-peter-schweyer",
  135: "https://www.palegis.us/house/members/bio/80/representative-steve-samuelson",
  136: "https://www.palegis.us/house/members/bio/136/representative-robert-freeman",
  137: "https://www.palegis.us/house/members/bio/1207/representative-joe-emrick",
  138: "https://www.palegis.us/house/members/bio/1910/representative-ann-flood",
  139: "https://www.palegis.us/house/members/bio/2018/representative-jeff-olsommer",
  140: "https://www.palegis.us/house/members/bio/2017/representative-jim-prokopiak",
  141: "https://www.palegis.us/house/members/bio/1204/representative-tina-davis",
  142: "https://www.palegis.us/house/members/bio/1971/representative-joe-hogan",
  143: "https://www.palegis.us/house/members/bio/1911/representative-shelby-labs",
  144: "https://www.palegis.us/house/members/bio/1972/representative-brian-munroe",
  145: "https://www.palegis.us/house/members/bio/1707/representative-craig-staats",
  146: "https://www.palegis.us/house/members/bio/1847/representative-joe-ciresi",
  147: "https://www.palegis.us/house/members/bio/1973/representative-donna-scheuren",
  148: "https://www.palegis.us/house/members/bio/1622/representative-mary-jo-daley",
  149: "https://www.palegis.us/house/members/bio/1159/representative-tim-briggs",
  150: "https://www.palegis.us/house/members/bio/1848/representative-joe-webster",
  151: "https://www.palegis.us/house/members/bio/1974/representative-melissa-cerrato",
  152: "https://www.palegis.us/house/members/bio/1913/representative-nancy-guenst",
  153: "https://www.palegis.us/house/members/bio/1849/representative-benjamin-sanchez",
  154: "https://www.palegis.us/house/members/bio/1914/representative-napoleon-nelson",
  155: "https://www.palegis.us/house/members/bio/1850/representative-danielle-friel-otten",
  156: "https://www.palegis.us/house/members/bio/1975/representative-chris-pielli",
  157: "https://www.palegis.us/house/members/bio/1851/representative-melissa-shusterman",
  158: "https://www.palegis.us/house/members/bio/1852/representative-christina-sappey",
  159: "https://www.palegis.us/house/members/bio/1976/representative-carol-kazeem",
  160: "https://www.palegis.us/house/members/bio/1916/representative-craig-williams",
  161: "https://www.palegis.us/house/members/bio/1735/representative-leanne-krueger",
  162: "https://www.palegis.us/house/members/bio/1853/representative-david-delloso",
  163: "https://www.palegis.us/house/members/bio/2015/representative-heather-boyd",
  164: "https://www.palegis.us/house/members/bio/1932/representative-gina-curry",
  165: "https://www.palegis.us/house/members/bio/1855/representative-jennifer-omara",
  166: "https://www.palegis.us/house/members/bio/210/representative-greg-vitali",
  167: "https://www.palegis.us/house/members/bio/1856/representative-kristine-howard",
  168: "https://www.palegis.us/house/members/bio/1977/representative-lisa-borowski",
  169: "https://www.palegis.us/house/members/bio/1694/representative-kate-klunk",
  170: "https://www.palegis.us/house/members/bio/1732/representative-martina-white",
  171: "https://www.palegis.us/house/members/bio/215/representative-kerry-benninghoff",
  172: "https://www.palegis.us/house/members/bio/2035/representative-sean-dougherty",
  173: "https://www.palegis.us/house/members/bio/1978/representative-pat-gallagher",
  174: "https://www.palegis.us/house/members/bio/1615/representative-ed-neilson",
  175: "https://www.palegis.us/house/members/bio/1857/representative-marylouise-isaacson",
  176: "https://www.palegis.us/house/members/bio/1703/representative-jack-rader",
  177: "https://www.palegis.us/house/members/bio/1858/representative-joseph-hohenstein",
  178: "https://www.palegis.us/house/members/bio/1979/representative-kristin-marcell",
  179: "https://www.palegis.us/house/members/bio/1685/representative-jason-dawkins",
  180: "https://www.palegis.us/house/members/bio/1980/representative-jose-giral",
  181: "https://www.palegis.us/house/members/bio/1860/representative-malcolm-kenyatta",
  182: "https://www.palegis.us/house/members/bio/1981/representative-ben-waxman",
  183: "https://www.palegis.us/house/members/bio/1758/representative-zachary-mako",
  184: "https://www.palegis.us/house/members/bio/1861/representative-elizabeth-fiedler",
  185: "https://www.palegis.us/house/members/bio/1917/representative-regina-young",
  186: "https://www.palegis.us/house/members/bio/1633/representative-jordan-harris",
  187: "https://www.palegis.us/house/members/bio/1190/representative-gary-day",
  188: "https://www.palegis.us/house/members/bio/1918/representative-rick-krajewski",
  189: "https://www.palegis.us/house/members/bio/1982/representative-tarah-probst",
  190: "https://www.palegis.us/house/members/bio/1874/representative-roni-green",
  191: "https://www.palegis.us/house/members/bio/1734/representative-joanna-mcclinton",
  192: "https://www.palegis.us/house/members/bio/1759/representative-morgan-cephas",
  193: "https://www.palegis.us/house/members/bio/1862/representative-torren-ecker",
  194: "https://www.palegis.us/house/members/bio/1983/representative-tarik-khan",
  195: "https://www.palegis.us/house/members/bio/2020/representative-keith-harris",
  196: "https://www.palegis.us/house/members/bio/1171/representative-seth-grove",
  197: "https://www.palegis.us/house/members/bio/1863/representative-danilo-burgos",
  198: "https://www.palegis.us/house/members/bio/1920/representative-darisha-parker",
  199: "https://www.palegis.us/house/members/bio/1864/representative-barbara-gleim",
  200: "https://www.palegis.us/house/members/bio/1760/representative-christopher-rabb",
  201: "https://www.palegis.us/house/members/bio/2019/representative-andre-carroll",
  202: "https://www.palegis.us/house/members/bio/1761/representative-jared-solomon",
  203: "https://www.palegis.us/house/members/bio/1984/representative-anthony-bellmon"
};

// 5. Highlight trackers
let highlightedSenate = null;
let highlightedHouse  = null;
let searchMarker = null; // Track the search marker

// 6. Function to load representative info in iframe
function loadRepresentativeInfo(name, district, chamber, url) {
  const iframe = document.getElementById('rep-iframe');
  const loading = document.getElementById('iframe-loading');
  const repNameElement = document.getElementById('rep-name');
  
  // Update header
  const title = chamber === 'Senate' ? 'Senator' : 'Representative';
  repNameElement.textContent = `${title} ${name} (District ${district})`;
  
  // Show loading and hide iframe
  loading.style.display = 'flex';
  iframe.style.display = 'none';
  
  // Load the URL in iframe
  iframe.src = url;
  
  // Handle iframe load
  iframe.onload = function() {
    loading.style.display = 'none';
    iframe.style.display = 'block';
  };
  
  // Handle iframe error
  iframe.onerror = function() {
    loading.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <p>Unable to load representative page.</p>
        <a href="${url}" target="_blank" style="color: #0055a5; text-decoration: none;">
          Open in new tab →
        </a>
      </div>
    `;
  };
  
  // Open the info sidebar
  sidebar.open('rep-info');
}

// 7. Style by party (handles both chambers)
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

// 8. Prepare layer‐groups for labels
const senateLabels = L.layerGroup();
const houseLabels  = L.layerGroup();

// 9. Load Senate districts
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

// 10. Load House districts
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

    // 11. Layer control (mutually exclusive) - COMBINED
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

// 12. Helper: drop district labels into the given label group (CENTERED)
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

// Helper function to get representative name with fallbacks for missing data
function getRepresentativeName(properties, district) {
  let name = properties["2025_House_Members_NAME"];
  
  // Handle specific cases where names might be missing in the data
  if (!name || name.trim() === '') {
    switch(parseInt(district)) {
      case 174:
        return 'Ed Neilson';
      case 200:
        return 'Christopher M. Rabb';
      default:
        return 'Name Not Available';
    }
  }
  
  return formatName(name);
}

// Helper function to clear search marker
function clearSearchMarker() {
  if (searchMarker) {
    map.removeLayer(searchMarker);
    searchMarker = null;
  }
}

// 13. Populate Senate sidebar list (SORTED BY DISTRICT NUMBER) - UPDATED FORMAT
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

// 14. Populate House sidebar list (SORTED BY DISTRICT NUMBER) - UPDATED FORMAT
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
    const name = getRepresentativeName(p, p.distr_num);  // Use the helper function
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

// 15. Senate popup + highlight + iframe loading (UPDATED WITH IFRAME FUNCTIONALITY)
function onEachSenate(feature, layer) {
  const p = feature.properties;
  const num      = parseInt(p.sldust, 10);
  const name     = formatName(p["PA_State_Senators_with_District_Counties_Name"]);
  const party    = p["PA_State_Senators_with_District_Counties_Party"];
  const counties = p["PA_State_Senators_with_District_Counties_District Counties Covered"];
  
  // Use official legislature URL from lookup table
  const officialUrl = senateLinks[num] || `https://www.palegis.us/senate/members`;

  layer.bindPopup(`
    <strong>${name}</strong><br/>
    Party: ${party}<br/>
    District: ${num}<br/>
    Counties: ${counties}<br/>
    <button onclick="window.open('${officialUrl}','_blank')" style="background: #0055a5; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px;">View Full Profile</button>
  `);

  layer.on('click', () => {
    if (highlightedSenate) highlightedSenate.setStyle(styleByParty(highlightedSenate.feature));
    layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.5 });
    highlightedSenate = layer;
    layer.openPopup();
    
    // Auto-load in iframe
    loadRepresentativeInfo(name, num, 'Senate', officialUrl);
  });
}

// 16. House popup + highlight + iframe loading (UPDATED WITH IFRAME FUNCTIONALITY)
function onEachHouse(feature, layer) {
  const p = feature.properties;
  const num      = p.distr_num;
  const name     = getRepresentativeName(p, num);  // Use the helper function
  const party    = p["2025_House_Members_PARTY"];
  const counties = p["2025_House_Members_COUNTIES"];
  
  // Use official legislature URL from lookup table
  const officialUrl = houseLinks[num] || `https://www.palegis.us/house/members`;

  layer.bindPopup(`
    <strong>${name}</strong><br/>
    Party: ${party}<br/>
    District: ${num}<br/>
    Counties: ${counties}<br/>
    <button onclick="window.open('${officialUrl}','_blank')" style="background: #0055a5; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-top: 8px;">View Full Profile</button>
  `);

  layer.on('click', () => {
    if (highlightedHouse) highlightedHouse.setStyle(styleByParty(highlightedHouse.feature));
    layer.setStyle({ fillColor: 'yellow', fillOpacity: 0.5 });
    highlightedHouse = layer;
    layer.openPopup();
    
    // Auto-load in iframe
    loadRepresentativeInfo(name, num, 'House', officialUrl);
  });
}

// 17. Address search with improved functionality
L.Control.geocoder({ 
  defaultMarkGeocode: false,
  placeholder: 'Search Address',
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

// Enhance search bar visibility
setTimeout(() => {
  const searchInput = document.querySelector('.leaflet-control-geocoder-form input');
  if (searchInput) {
    // Make placeholder more visible
    searchInput.style.color = '#333';
    searchInput.style.fontWeight = 'normal';
    
    // Add event listeners to maintain placeholder visibility
    searchInput.addEventListener('focus', function() {
      if (this.value === '') {
        this.style.color = '#333';
      }
    });
    
    searchInput.addEventListener('blur', function() {
      if (this.value === '') {
        this.style.color = '#666';
      }
    });
  }
}, 1000);

// Clear search marker when clicking elsewhere on map
map.on('click', (e) => {
  // Only clear if not clicking on a feature
  setTimeout(() => {
    if (!e.originalEvent.defaultPrevented) {
      clearSearchMarker();
    }
  }, 100);
});

// Make loadRepresentativeInfo globally available for popup buttons
window.loadRepresentativeInfo = loadRepresentativeInfo;
