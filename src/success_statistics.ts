// let countrySuccessStatistics;

// async function fetchCountrySuccessStatistics() {
//   let countrySuccessStatisticsString = localStorage.getItem(
//     "countrySuccessStatistics"
//   );
//   if (countrySuccessStatisticsString !== null) {
//     countrySuccessStatistics = JSON.parse(countrySuccessStatisticsString);
//     console.log("Deserialized country success statistics");
//     return;
//   }

//   countrySuccessStatistics = {};
//   for (const countryCode of Object.keys(countryCodesMap)) {
//     if (countryPopulationsMap[countryCode] < COUNTRY_POPULATION_MINIMUM) {
//       console.log(`Skipping small country ${countryCode}`);
//       continue;
//     }

//     countrySuccessStatistics[countryCode] = {
//       successes: 0,
//       attempts: 0,
//     };
//   }
// }
