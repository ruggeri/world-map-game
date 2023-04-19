import CountryDataMap from "./country_data";
import CountrySuccessStatisticsMap from "./country_success_statistics";
import Game from "./game";
import WorldMap from "./world_map";

interface App {
  allDataMap: CountryDataMap;
  countrySuccessStatisticsMap: CountrySuccessStatisticsMap;
  worldMap: WorldMap;
  game: Game;
}

declare global {
  var app: App;
}

async function main() {
  const allDataMap = CountryDataMap.allDataMap();
  const countrySuccessStatisticsMap =
    await CountrySuccessStatisticsMap.fetchMapFromServer();
  const worldMap = await WorldMap.fetchMapFromServer();
  const game = new Game(allDataMap, countrySuccessStatisticsMap, worldMap);

  window.app = {
    allDataMap,
    countrySuccessStatisticsMap,
    worldMap,
    game,
  };
}

main().catch((err) => {
  console.log(err);
});
