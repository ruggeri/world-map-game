import WorldMap from "./world_map";
import { Game } from "./game";
import { loadCountrySuccessStatisticsMap } from "./country_success_statistics";

async function main() {
  const worldMap = await WorldMap.load();
  await loadCountrySuccessStatisticsMap();
  new Game(worldMap);
}

main();
