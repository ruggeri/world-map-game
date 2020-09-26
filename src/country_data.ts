interface RawCountryDatum {
  isoCountryCode: string;
  countryName: string;
  population: string;
}

interface CountryDatum {
  isoCountryCode: string;
  countryName: string;
  population: number;
}

const rawCountryData: Record<string, RawCountryDatum> = {
  AF: {
    isoCountryCode: "AF",
    countryName: "Afghanistan",
    population: "29121286",
  },
  AX: {
    isoCountryCode: "AX",
    countryName: "Aland Islands",
    population: "26711",
  },
  AL: {
    isoCountryCode: "AL",
    countryName: "Albania",
    population: "2986952",
  },
  DZ: {
    isoCountryCode: "DZ",
    countryName: "Algeria",
    population: "34586184",
  },
  AS: {
    isoCountryCode: "AS",
    countryName: "American Samoa",
    population: "57881",
  },
  AD: {
    isoCountryCode: "AD",
    countryName: "Andorra",
    population: "84000",
  },
  AO: {
    isoCountryCode: "AO",
    countryName: "Angola",
    population: "13068161",
  },
  AI: {
    isoCountryCode: "AI",
    countryName: "Anguilla",
    population: "13254",
  },
  AQ: {
    isoCountryCode: "AQ",
    countryName: "Antarctica",
    population: "0",
  },
  AG: {
    isoCountryCode: "AG",
    countryName: "Antigua And Barbuda",
    population: "86754",
  },
  AR: {
    isoCountryCode: "AR",
    countryName: "Argentina",
    population: "41343201",
  },
  AM: {
    isoCountryCode: "AM",
    countryName: "Armenia",
    population: "2968000",
  },
  AW: {
    isoCountryCode: "AW",
    countryName: "Aruba",
    population: "71566",
  },
  AU: {
    isoCountryCode: "AU",
    countryName: "Australia",
    population: "21515754",
  },
  AT: {
    isoCountryCode: "AT",
    countryName: "Austria",
    population: "8205000",
  },
  AZ: {
    isoCountryCode: "AZ",
    countryName: "Azerbaijan",
    population: "8303512",
  },
  BS: {
    isoCountryCode: "BS",
    countryName: "Bahamas",
    population: "301790",
  },
  BH: {
    isoCountryCode: "BH",
    countryName: "Bahrain",
    population: "738004",
  },
  BD: {
    isoCountryCode: "BD",
    countryName: "Bangladesh",
    population: "156118464",
  },
  BB: {
    isoCountryCode: "BB",
    countryName: "Barbados",
    population: "285653",
  },
  BY: {
    isoCountryCode: "BY",
    countryName: "Belarus",
    population: "9685000",
  },
  BE: {
    isoCountryCode: "BE",
    countryName: "Belgium",
    population: "10403000",
  },
  BZ: {
    isoCountryCode: "BZ",
    countryName: "Belize",
    population: "314522",
  },
  BJ: {
    isoCountryCode: "BJ",
    countryName: "Benin",
    population: "9056010",
  },
  BM: {
    isoCountryCode: "BM",
    countryName: "Bermuda",
    population: "65365",
  },
  BT: {
    isoCountryCode: "BT",
    countryName: "Bhutan",
    population: "699847",
  },
  BO: {
    isoCountryCode: "BO",
    countryName: "Bolivia",
    population: "9947418",
  },
  BA: {
    isoCountryCode: "BA",
    countryName: "Bosnia And Herzegovina",
    population: "4590000",
  },
  BW: {
    isoCountryCode: "BW",
    countryName: "Botswana",
    population: "2029307",
  },
  BV: {
    isoCountryCode: "BV",
    countryName: "Bouvet Island",
    population: "0",
  },
  BR: {
    isoCountryCode: "BR",
    countryName: "Brazil",
    population: "201103330",
  },
  IO: {
    isoCountryCode: "IO",
    countryName: "British Indian Ocean Territory",
    population: "4000",
  },
  BN: {
    isoCountryCode: "BN",
    countryName: "Brunei Darussalam",
    population: "395027",
  },
  BG: {
    isoCountryCode: "BG",
    countryName: "Bulgaria",
    population: "7148785",
  },
  BF: {
    isoCountryCode: "BF",
    countryName: "Burkina Faso",
    population: "16241811",
  },
  BI: {
    isoCountryCode: "BI",
    countryName: "Burundi",
    population: "9863117",
  },
  KH: {
    isoCountryCode: "KH",
    countryName: "Cambodia",
    population: "14453680",
  },
  CM: {
    isoCountryCode: "CM",
    countryName: "Cameroon",
    population: "19294149",
  },
  CA: {
    isoCountryCode: "CA",
    countryName: "Canada",
    population: "33679000",
  },
  CV: {
    isoCountryCode: "CV",
    countryName: "Cape Verde",
    population: "508659",
  },
  KY: {
    isoCountryCode: "KY",
    countryName: "Cayman Islands",
    population: "44270",
  },
  CF: {
    isoCountryCode: "CF",
    countryName: "Central African Republic",
    population: "4844927",
  },
  TD: {
    isoCountryCode: "TD",
    countryName: "Chad",
    population: "10543464",
  },
  CL: {
    isoCountryCode: "CL",
    countryName: "Chile",
    population: "16746491",
  },
  CN: {
    isoCountryCode: "CN",
    countryName: "China",
    population: "1330044000",
  },
  CX: {
    isoCountryCode: "CX",
    countryName: "Christmas Island",
    population: "1500",
  },
  CC: {
    isoCountryCode: "CC",
    countryName: "Cocos (Keeling) Islands",
    population: "628",
  },
  CO: {
    isoCountryCode: "CO",
    countryName: "Colombia",
    population: "47790000",
  },
  KM: {
    isoCountryCode: "KM",
    countryName: "Comoros",
    population: "773407",
  },
  CG: {
    isoCountryCode: "CG",
    countryName: "Congo",
    population: "3039126",
  },
  CD: {
    isoCountryCode: "CD",
    countryName: "Congo, Democratic Republic",
    population: "70916439",
  },
  CK: {
    isoCountryCode: "CK",
    countryName: "Cook Islands",
    population: "21388",
  },
  CR: {
    isoCountryCode: "CR",
    countryName: "Costa Rica",
    population: "4516220",
  },
  CI: {
    isoCountryCode: "CI",
    countryName: 'Cote D"Ivoire',
    population: "21058798",
  },
  HR: {
    isoCountryCode: "HR",
    countryName: "Croatia",
    population: "4284889",
  },
  CU: {
    isoCountryCode: "CU",
    countryName: "Cuba",
    population: "11423000",
  },
  CY: {
    isoCountryCode: "CY",
    countryName: "Cyprus",
    population: "1102677",
  },
  CZ: {
    isoCountryCode: "CZ",
    countryName: "Czech Republic",
    population: "10476000",
  },
  DK: {
    isoCountryCode: "DK",
    countryName: "Denmark",
    population: "5484000",
  },
  DJ: {
    isoCountryCode: "DJ",
    countryName: "Djibouti",
    population: "740528",
  },
  DM: {
    isoCountryCode: "DM",
    countryName: "Dominica",
    population: "72813",
  },
  DO: {
    isoCountryCode: "DO",
    countryName: "Dominican Republic",
    population: "9823821",
  },
  EC: {
    isoCountryCode: "EC",
    countryName: "Ecuador",
    population: "14790608",
  },
  EG: {
    isoCountryCode: "EG",
    countryName: "Egypt",
    population: "80471869",
  },
  SV: {
    isoCountryCode: "SV",
    countryName: "El Salvador",
    population: "6052064",
  },
  GQ: {
    isoCountryCode: "GQ",
    countryName: "Equatorial Guinea",
    population: "1014999",
  },
  ER: {
    isoCountryCode: "ER",
    countryName: "Eritrea",
    population: "5792984",
  },
  EE: {
    isoCountryCode: "EE",
    countryName: "Estonia",
    population: "1291170",
  },
  ET: {
    isoCountryCode: "ET",
    countryName: "Ethiopia",
    population: "88013491",
  },
  FK: {
    isoCountryCode: "FK",
    countryName: "Falkland Islands (Malvinas)",
    population: "2638",
  },
  FO: {
    isoCountryCode: "FO",
    countryName: "Faroe Islands",
    population: "48228",
  },
  FJ: {
    isoCountryCode: "FJ",
    countryName: "Fiji",
    population: "875983",
  },
  FI: {
    isoCountryCode: "FI",
    countryName: "Finland",
    population: "5244000",
  },
  FR: {
    isoCountryCode: "FR",
    countryName: "France",
    population: "64768389",
  },
  GF: {
    isoCountryCode: "GF",
    countryName: "French Guiana",
    population: "195506",
  },
  PF: {
    isoCountryCode: "PF",
    countryName: "French Polynesia",
    population: "270485",
  },
  TF: {
    isoCountryCode: "TF",
    countryName: "French Southern Territories",
    population: "140",
  },
  GA: {
    isoCountryCode: "GA",
    countryName: "Gabon",
    population: "1545255",
  },
  GM: {
    isoCountryCode: "GM",
    countryName: "Gambia",
    population: "1593256",
  },
  GE: {
    isoCountryCode: "GE",
    countryName: "Georgia",
    population: "4630000",
  },
  DE: {
    isoCountryCode: "DE",
    countryName: "Germany",
    population: "81802257",
  },
  GH: {
    isoCountryCode: "GH",
    countryName: "Ghana",
    population: "24339838",
  },
  GI: {
    isoCountryCode: "GI",
    countryName: "Gibraltar",
    population: "27884",
  },
  GR: {
    isoCountryCode: "GR",
    countryName: "Greece",
    population: "11000000",
  },
  GL: {
    isoCountryCode: "GL",
    countryName: "Greenland",
    population: "56375",
  },
  GD: {
    isoCountryCode: "GD",
    countryName: "Grenada",
    population: "107818",
  },
  GP: {
    isoCountryCode: "GP",
    countryName: "Guadeloupe",
    population: "443000",
  },
  GU: {
    isoCountryCode: "GU",
    countryName: "Guam",
    population: "159358",
  },
  GT: {
    isoCountryCode: "GT",
    countryName: "Guatemala",
    population: "13550440",
  },
  GG: {
    isoCountryCode: "GG",
    countryName: "Guernsey",
    population: "65228",
  },
  GN: {
    isoCountryCode: "GN",
    countryName: "Guinea",
    population: "10324025",
  },
  GW: {
    isoCountryCode: "GW",
    countryName: "Guinea-Bissau",
    population: "1565126",
  },
  GY: {
    isoCountryCode: "GY",
    countryName: "Guyana",
    population: "748486",
  },
  HT: {
    isoCountryCode: "HT",
    countryName: "Haiti",
    population: "9648924",
  },
  HM: {
    isoCountryCode: "HM",
    countryName: "Heard Island & Mcdonald Islands",
    population: "0",
  },
  VA: {
    isoCountryCode: "VA",
    countryName: "Holy See (Vatican City State)",
    population: "921",
  },
  HN: {
    isoCountryCode: "HN",
    countryName: "Honduras",
    population: "7989415",
  },
  HK: {
    isoCountryCode: "HK",
    countryName: "Hong Kong",
    population: "6898686",
  },
  HU: {
    isoCountryCode: "HU",
    countryName: "Hungary",
    population: "9982000",
  },
  IS: {
    isoCountryCode: "IS",
    countryName: "Iceland",
    population: "308910",
  },
  IN: {
    isoCountryCode: "IN",
    countryName: "India",
    population: "1173108018",
  },
  ID: {
    isoCountryCode: "ID",
    countryName: "Indonesia",
    population: "242968342",
  },
  IR: {
    isoCountryCode: "IR",
    countryName: "Iran, Islamic Republic Of",
    population: "76923300",
  },
  IQ: {
    isoCountryCode: "IQ",
    countryName: "Iraq",
    population: "29671605",
  },
  IE: {
    isoCountryCode: "IE",
    countryName: "Ireland",
    population: "4622917",
  },
  IM: {
    isoCountryCode: "IM",
    countryName: "Isle Of Man",
    population: "75049",
  },
  IL: {
    isoCountryCode: "IL",
    countryName: "Israel",
    population: "7353985",
  },
  IT: {
    isoCountryCode: "IT",
    countryName: "Italy",
    population: "60340328",
  },
  JM: {
    isoCountryCode: "JM",
    countryName: "Jamaica",
    population: "2847232",
  },
  JP: {
    isoCountryCode: "JP",
    countryName: "Japan",
    population: "127288000",
  },
  JE: {
    isoCountryCode: "JE",
    countryName: "Jersey",
    population: "90812",
  },
  JO: {
    isoCountryCode: "JO",
    countryName: "Jordan",
    population: "6407085",
  },
  KZ: {
    isoCountryCode: "KZ",
    countryName: "Kazakhstan",
    population: "15340000",
  },
  KE: {
    isoCountryCode: "KE",
    countryName: "Kenya",
    population: "40046566",
  },
  KI: {
    isoCountryCode: "KI",
    countryName: "Kiribati",
    population: "92533",
  },
  KR: {
    isoCountryCode: "KR",
    countryName: "Korea",
    population: "48422644",
  },
  KW: {
    isoCountryCode: "KW",
    countryName: "Kuwait",
    population: "2789132",
  },
  KG: {
    isoCountryCode: "KG",
    countryName: "Kyrgyzstan",
    population: "5776500",
  },
  LA: {
    isoCountryCode: "LA",
    countryName: 'Lao People"s Democratic Republic',
    population: "6368162",
  },
  LV: {
    isoCountryCode: "LV",
    countryName: "Latvia",
    population: "2217969",
  },
  LB: {
    isoCountryCode: "LB",
    countryName: "Lebanon",
    population: "4125247",
  },
  LS: {
    isoCountryCode: "LS",
    countryName: "Lesotho",
    population: "1919552",
  },
  LR: {
    isoCountryCode: "LR",
    countryName: "Liberia",
    population: "3685076",
  },
  LY: {
    isoCountryCode: "LY",
    countryName: "Libyan Arab Jamahiriya",
    population: "6461454",
  },
  LI: {
    isoCountryCode: "LI",
    countryName: "Liechtenstein",
    population: "35000",
  },
  LT: {
    isoCountryCode: "LT",
    countryName: "Lithuania",
    population: "2944459",
  },
  LU: {
    isoCountryCode: "LU",
    countryName: "Luxembourg",
    population: "497538",
  },
  MO: {
    isoCountryCode: "MO",
    countryName: "Macao",
    population: "449198",
  },
  MK: {
    isoCountryCode: "MK",
    countryName: "Macedonia",
    population: "2062294",
  },
  MG: {
    isoCountryCode: "MG",
    countryName: "Madagascar",
    population: "21281844",
  },
  MW: {
    isoCountryCode: "MW",
    countryName: "Malawi",
    population: "15447500",
  },
  MY: {
    isoCountryCode: "MY",
    countryName: "Malaysia",
    population: "28274729",
  },
  MV: {
    isoCountryCode: "MV",
    countryName: "Maldives",
    population: "395650",
  },
  ML: {
    isoCountryCode: "ML",
    countryName: "Mali",
    population: "13796354",
  },
  MT: {
    isoCountryCode: "MT",
    countryName: "Malta",
    population: "403000",
  },
  MH: {
    isoCountryCode: "MH",
    countryName: "Marshall Islands",
    population: "65859",
  },
  MQ: {
    isoCountryCode: "MQ",
    countryName: "Martinique",
    population: "432900",
  },
  MR: {
    isoCountryCode: "MR",
    countryName: "Mauritania",
    population: "3205060",
  },
  MU: {
    isoCountryCode: "MU",
    countryName: "Mauritius",
    population: "1294104",
  },
  YT: {
    isoCountryCode: "YT",
    countryName: "Mayotte",
    population: "159042",
  },
  MX: {
    isoCountryCode: "MX",
    countryName: "Mexico",
    population: "112468855",
  },
  FM: {
    isoCountryCode: "FM",
    countryName: "Micronesia, Federated States Of",
    population: "107708",
  },
  MD: {
    isoCountryCode: "MD",
    countryName: "Moldova",
    population: "4324000",
  },
  MC: {
    isoCountryCode: "MC",
    countryName: "Monaco",
    population: "32965",
  },
  MN: {
    isoCountryCode: "MN",
    countryName: "Mongolia",
    population: "3086918",
  },
  ME: {
    isoCountryCode: "ME",
    countryName: "Montenegro",
    population: "666730",
  },
  MS: {
    isoCountryCode: "MS",
    countryName: "Montserrat",
    population: "9341",
  },
  MA: {
    isoCountryCode: "MA",
    countryName: "Morocco",
    population: "33848242",
  },
  MZ: {
    isoCountryCode: "MZ",
    countryName: "Mozambique",
    population: "22061451",
  },
  MM: {
    isoCountryCode: "MM",
    countryName: "Myanmar",
    population: "53414374",
  },
  NA: {
    isoCountryCode: "NA",
    countryName: "Namibia",
    population: "2128471",
  },
  NR: {
    isoCountryCode: "NR",
    countryName: "Nauru",
    population: "10065",
  },
  NP: {
    isoCountryCode: "NP",
    countryName: "Nepal",
    population: "28951852",
  },
  NL: {
    isoCountryCode: "NL",
    countryName: "Netherlands",
    population: "16645000",
  },
  AN: {
    isoCountryCode: "AN",
    countryName: "Netherlands Antilles",
    population: "300000",
  },
  NC: {
    isoCountryCode: "NC",
    countryName: "New Caledonia",
    population: "216494",
  },
  NZ: {
    isoCountryCode: "NZ",
    countryName: "New Zealand",
    population: "4252277",
  },
  NI: {
    isoCountryCode: "NI",
    countryName: "Nicaragua",
    population: "5995928",
  },
  NE: {
    isoCountryCode: "NE",
    countryName: "Niger",
    population: "15878271",
  },
  NG: {
    isoCountryCode: "NG",
    countryName: "Nigeria",
    population: "154000000",
  },
  NU: {
    isoCountryCode: "NU",
    countryName: "Niue",
    population: "2166",
  },
  NF: {
    isoCountryCode: "NF",
    countryName: "Norfolk Island",
    population: "1828",
  },
  MP: {
    isoCountryCode: "MP",
    countryName: "Northern Mariana Islands",
    population: "53883",
  },
  NO: {
    isoCountryCode: "NO",
    countryName: "Norway",
    population: "5009150",
  },
  OM: {
    isoCountryCode: "OM",
    countryName: "Oman",
    population: "2967717",
  },
  PK: {
    isoCountryCode: "PK",
    countryName: "Pakistan",
    population: "184404791",
  },
  PW: {
    isoCountryCode: "PW",
    countryName: "Palau",
    population: "19907",
  },
  PS: {
    isoCountryCode: "PS",
    countryName: "Palestinian Territory, Occupied",
    population: "3800000",
  },
  PA: {
    isoCountryCode: "PA",
    countryName: "Panama",
    population: "3410676",
  },
  PG: {
    isoCountryCode: "PG",
    countryName: "Papua New Guinea",
    population: "6064515",
  },
  PY: {
    isoCountryCode: "PY",
    countryName: "Paraguay",
    population: "6375830",
  },
  PE: {
    isoCountryCode: "PE",
    countryName: "Peru",
    population: "29907003",
  },
  PH: {
    isoCountryCode: "PH",
    countryName: "Philippines",
    population: "99900177",
  },
  PN: {
    isoCountryCode: "PN",
    countryName: "Pitcairn",
    population: "46",
  },
  PL: {
    isoCountryCode: "PL",
    countryName: "Poland",
    population: "38500000",
  },
  PT: {
    isoCountryCode: "PT",
    countryName: "Portugal",
    population: "10676000",
  },
  PR: {
    isoCountryCode: "PR",
    countryName: "Puerto Rico",
    population: "3916632",
  },
  QA: {
    isoCountryCode: "QA",
    countryName: "Qatar",
    population: "840926",
  },
  RE: {
    isoCountryCode: "RE",
    countryName: "Reunion",
    population: "776948",
  },
  RO: {
    isoCountryCode: "RO",
    countryName: "Romania",
    population: "21959278",
  },
  RU: {
    isoCountryCode: "RU",
    countryName: "Russian Federation",
    population: "140702000",
  },
  RW: {
    isoCountryCode: "RW",
    countryName: "Rwanda",
    population: "11055976",
  },
  BL: {
    isoCountryCode: "BL",
    countryName: "Saint Barthelemy",
    population: "8450",
  },
  SH: {
    isoCountryCode: "SH",
    countryName: "Saint Helena",
    population: "7460",
  },
  KN: {
    isoCountryCode: "KN",
    countryName: "Saint Kitts And Nevis",
    population: "51134",
  },
  LC: {
    isoCountryCode: "LC",
    countryName: "Saint Lucia",
    population: "160922",
  },
  MF: {
    isoCountryCode: "MF",
    countryName: "Saint Martin",
    population: "35925",
  },
  PM: {
    isoCountryCode: "PM",
    countryName: "Saint Pierre And Miquelon",
    population: "7012",
  },
  VC: {
    isoCountryCode: "VC",
    countryName: "Saint Vincent And Grenadines",
    population: "104217",
  },
  WS: {
    isoCountryCode: "WS",
    countryName: "Samoa",
    population: "192001",
  },
  SM: {
    isoCountryCode: "SM",
    countryName: "San Marino",
    population: "31477",
  },
  ST: {
    isoCountryCode: "ST",
    countryName: "Sao Tome And Principe",
    population: "175808",
  },
  SA: {
    isoCountryCode: "SA",
    countryName: "Saudi Arabia",
    population: "25731776",
  },
  SN: {
    isoCountryCode: "SN",
    countryName: "Senegal",
    population: "12323252",
  },
  RS: {
    isoCountryCode: "RS",
    countryName: "Serbia",
    population: "7344847",
  },
  SC: {
    isoCountryCode: "SC",
    countryName: "Seychelles",
    population: "88340",
  },
  SL: {
    isoCountryCode: "SL",
    countryName: "Sierra Leone",
    population: "5245695",
  },
  SG: {
    isoCountryCode: "SG",
    countryName: "Singapore",
    population: "4701069",
  },
  SK: {
    isoCountryCode: "SK",
    countryName: "Slovakia",
    population: "5455000",
  },
  SI: {
    isoCountryCode: "SI",
    countryName: "Slovenia",
    population: "2007000",
  },
  SB: {
    isoCountryCode: "SB",
    countryName: "Solomon Islands",
    population: "559198",
  },
  SO: {
    isoCountryCode: "SO",
    countryName: "Somalia",
    population: "10112453",
  },
  ZA: {
    isoCountryCode: "ZA",
    countryName: "South Africa",
    population: "49000000",
  },
  GS: {
    isoCountryCode: "GS",
    countryName: "South Georgia And Sandwich Isl.",
    population: "30",
  },
  ES: {
    isoCountryCode: "ES",
    countryName: "Spain",
    population: "46505963",
  },
  LK: {
    isoCountryCode: "LK",
    countryName: "Sri Lanka",
    population: "21513990",
  },
  SD: {
    isoCountryCode: "SD",
    countryName: "Sudan",
    population: "35000000",
  },
  SR: {
    isoCountryCode: "SR",
    countryName: "Suriname",
    population: "492829",
  },
  SJ: {
    isoCountryCode: "SJ",
    countryName: "Svalbard And Jan Mayen",
    population: "2550",
  },
  SZ: {
    isoCountryCode: "SZ",
    countryName: "Swaziland",
    population: "1354051",
  },
  SE: {
    isoCountryCode: "SE",
    countryName: "Sweden",
    population: "9828655",
  },
  CH: {
    isoCountryCode: "CH",
    countryName: "Switzerland",
    population: "7581000",
  },
  SY: {
    isoCountryCode: "SY",
    countryName: "Syrian Arab Republic",
    population: "22198110",
  },
  TW: {
    isoCountryCode: "TW",
    countryName: "Taiwan",
    population: "22894384",
  },
  TJ: {
    isoCountryCode: "TJ",
    countryName: "Tajikistan",
    population: "7487489",
  },
  TZ: {
    isoCountryCode: "TZ",
    countryName: "Tanzania",
    population: "41892895",
  },
  TH: {
    isoCountryCode: "TH",
    countryName: "Thailand",
    population: "67089500",
  },
  TL: {
    isoCountryCode: "TL",
    countryName: "Timor-Leste",
    population: "1154625",
  },
  TG: {
    isoCountryCode: "TG",
    countryName: "Togo",
    population: "6587239",
  },
  TK: {
    isoCountryCode: "TK",
    countryName: "Tokelau",
    population: "1466",
  },
  TO: {
    isoCountryCode: "TO",
    countryName: "Tonga",
    population: "122580",
  },
  TT: {
    isoCountryCode: "TT",
    countryName: "Trinidad And Tobago",
    population: "1228691",
  },
  TN: {
    isoCountryCode: "TN",
    countryName: "Tunisia",
    population: "10589025",
  },
  TR: {
    isoCountryCode: "TR",
    countryName: "Turkey",
    population: "77804122",
  },
  TM: {
    isoCountryCode: "TM",
    countryName: "Turkmenistan",
    population: "4940916",
  },
  TC: {
    isoCountryCode: "TC",
    countryName: "Turks And Caicos Islands",
    population: "20556",
  },
  TV: {
    isoCountryCode: "TV",
    countryName: "Tuvalu",
    population: "10472",
  },
  UG: {
    isoCountryCode: "UG",
    countryName: "Uganda",
    population: "33398682",
  },
  UA: {
    isoCountryCode: "UA",
    countryName: "Ukraine",
    population: "45415596",
  },
  AE: {
    isoCountryCode: "AE",
    countryName: "United Arab Emirates",
    population: "4975593",
  },
  GB: {
    isoCountryCode: "GB",
    countryName: "United Kingdom",
    population: "62348447",
  },
  US: {
    isoCountryCode: "US",
    countryName: "United States",
    population: "310232863",
  },
  UM: {
    isoCountryCode: "UM",
    countryName: "United States Outlying Islands",
    population: "0",
  },
  UY: {
    isoCountryCode: "UY",
    countryName: "Uruguay",
    population: "3477000",
  },
  UZ: {
    isoCountryCode: "UZ",
    countryName: "Uzbekistan",
    population: "27865738",
  },
  VU: {
    isoCountryCode: "VU",
    countryName: "Vanuatu",
    population: "221552",
  },
  VE: {
    isoCountryCode: "VE",
    countryName: "Venezuela",
    population: "27223228",
  },
  VN: {
    isoCountryCode: "VN",
    countryName: "Vietnam",
    population: "89571130",
  },
  VG: {
    isoCountryCode: "VG",
    countryName: "Virgin Islands, British",
    population: "21730",
  },
  VI: {
    isoCountryCode: "VI",
    countryName: "Virgin Islands, U.S.",
    population: "108708",
  },
  WF: {
    isoCountryCode: "WF",
    countryName: "Wallis And Futuna",
    population: "16025",
  },
  EH: {
    isoCountryCode: "EH",
    countryName: "Western Sahara",
    population: "273008",
  },
  YE: {
    isoCountryCode: "YE",
    countryName: "Yemen",
    population: "23495361",
  },
  ZM: {
    isoCountryCode: "ZM",
    countryName: "Zambia",
    population: "13460305",
  },
  ZW: {
    isoCountryCode: "ZW",
    countryName: "Zimbabwe",
    population: "13061000",
  },
};

export function getCountryData(
  populationFloor: number
): Map<string, CountryDatum> {
  const countryDataMap = new Map();

  for (const countryName of Object.keys(rawCountryData)) {
    const rawCountryDatum = rawCountryData[countryName];
    const countryDatum = {
      isoCountryCode: rawCountryDatum.isoCountryCode,
      countryName: rawCountryDatum.countryName,
      population: Number(rawCountryDatum.population),
    };

    if (countryDatum.population > populationFloor) {
      countryDataMap.set(countryDatum.isoCountryCode, countryDatum);
    }
  }

  return countryDataMap;
}
