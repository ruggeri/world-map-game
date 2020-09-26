import { getCountryData } from "./country_data";
import { awaitWorldMapLoad, setWorldMapClickHandler } from "./world_map";

const COUNTRY_POPULATION_MINIMUM = 200_000;
const COUNTRY_DATA = getCountryData(COUNTRY_POPULATION_MINIMUM);

// declare global {
//   interface Window {
//     COUNTRY_DATA: any;
//   }
// }

// window.COUNTRY_DATA = COUNTRY_DATA;

async function main() {
  await awaitWorldMapLoad();
  setWorldMapClickHandler((isoCountryCode: string) => {
    console.log(`You clicked: ${isoCountryCode}`);
  });
}

main();

// const countryData =

// let currentCountryCode;
// function pickRandomCountryCode() {
//   const idx = Math.floor(Math.random() * countryCodeKeys.length);
//   currentCountryCode = countryCodeKeys[idx];

//   if (currentCountryCode in correctlyLabeledCountries) {
//     return pickRandomCountryCode();
//   }

//   console.log(currentCountryCode);
//   console.log(`Find ${countryCodesMap[currentCountryCode]}`);
// }

//   await fetchCountrySuccessStatistics();

//   pickRandomCountryCode();

//   colorCountry("us", "yellow");
//   colorCountry("jp", "red");
