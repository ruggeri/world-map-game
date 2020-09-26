const worldMapObjectEl = document.getElementById("world-map");

let countryCodeKeys;
let countryCodesMap;
let countryPopulationsMap;
let countrySuccessStatistics;

async function fetchCountryCodesMap() {
  countryCodesMap = await (await fetch("iso-country-codes.json")).json();
  countryCodeKeys = Object.keys(countryCodesMap);
}

async function fetchCountryPopulationsMap() {
  countryPopulationsMap = await (
    await fetch("country-populations.json")
  ).json();
  for (const [key, val] of Object.entries(countryPopulationsMap)) {
    countryPopulationsMap[key] = Number(val);
  }
}

const COUNTRY_POPULATION_MINIMUM = 200_000;
async function fetchCountrySuccessStatistics() {
  let countrySuccessStatisticsString = localStorage.getItem(
    "countrySuccessStatistics"
  );
  if (countrySuccessStatisticsString !== null) {
    countrySuccessStatistics = JSON.parse(countrySuccessStatisticsString);
    console.log("Deserialized country success statistics");
    return;
  }

  countrySuccessStatistics = {};
  for (const countryCode of Object.keys(countryCodesMap)) {
    if (countryPopulationsMap[countryCode] < COUNTRY_POPULATION_MINIMUM) {
      console.log(`Skipping small country ${countryCode}`);
      continue;
    }

    countrySuccessStatistics[countryCode] = {
      successes: 0,
      attempts: 0,
    };
  }
}

function colorCountry(isoCountryCode, color) {
  const worldMapDocument = worldMapObjectEl.contentDocument;

  const newStyleElement = worldMapDocument.createElementNS(
    "http://www.w3.org/2000/svg",
    "style"
  );
  newStyleElement.textContent = `
    .${isoCountryCode.toLowerCase()} {
      fill: ${color};
    }
  `;

  worldMapDocument.rootElement.appendChild(newStyleElement);
}

function getCountryCode(targetElement) {
  const svgEl = worldMapObjectEl.contentDocument.rootElement;
  if (targetElement.parentElement !== svgEl) {
    return getCountryCode(targetElement.parentElement);
  }

  return targetElement.id.toUpperCase();
}

let currentCountryCode;
function pickRandomCountryCode() {
  const idx = Math.floor(Math.random() * countryCodeKeys.length);
  currentCountryCode = countryCodeKeys[idx];

  if (currentCountryCode in correctlyLabeledCountries) {
    return pickRandomCountryCode();
  }

  console.log(currentCountryCode);
  console.log(`Find ${countryCodesMap[currentCountryCode]}`);
}

async function main() {
  await fetchCountryCodesMap();
  await fetchCountryPopulationsMap();
  await fetchCountrySuccessStatistics();

  pickRandomCountryCode();

  colorCountry("us", "yellow");
  colorCountry("jp", "red");

  const svgEl = worldMapObjectEl.contentDocument.rootElement;
  svgEl.addEventListener("click", (e) => {
    const clickedCountryCode = getCountryCode(e.target);

    if (clickedCountryCode === currentCountryCode) {
      console.log(`You found ${countryCodesMap[currentCountryCode]}`);
      correctlyLabeledCountries[clickedCountryCode] = true;
      colorCountry(currentCountryCode, "green");
      pickRandomCountryCode();
    } else {
      console.log(`You clicked: ${clickedCountryCode}`);
    }
  });
}

worldMapObjectEl.addEventListener("load", main);
