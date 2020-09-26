import { awaitWorldMapLoad } from "./world_map";
import { Game } from "./game";
import { getCountryStatistics } from "./country_success_statistics";

async function main() {
  const worldMap = await awaitWorldMapLoad();
  new Game(worldMap);
}

main();
