import { awaitWorldMapLoad } from "./world_map";
import { Game } from "./game";
import { loadCountrySuccessStatisticsMap } from "./country_success_statistics";

async function main() {
  const worldMap = await awaitWorldMapLoad();
  await loadCountrySuccessStatisticsMap();
  new Game(worldMap);
}

main();
