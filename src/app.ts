import { awaitWorldMapLoad } from "./world_map";
import { Game } from "./game";

async function main() {
  const worldMap = await awaitWorldMapLoad();
  new Game(worldMap);
}

main();
