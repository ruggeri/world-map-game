import CountryDataMap from "./country_data";
import CountrySuccessStatisticsMap from "./country_success_statistics";
import Game from "./game";
import WorldMap from "./world_map";

async function main() {
  const allDataMap = CountryDataMap.allDataMap();
  const countrySuccessStatisticsMap = await CountrySuccessStatisticsMap.fetchMapFromServer();
  const worldMap = await WorldMap.fetchMapFromServer();
  new Game(allDataMap, countrySuccessStatisticsMap, worldMap);
}

main().catch((e) => {
  console.log(e);
});
