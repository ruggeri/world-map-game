import { awaitWorldMapLoad } from "./world_map";
import { Game } from "./game";

async function main() {
  const worldMap = await awaitWorldMapLoad();
  // worldMap.setCountryColor("us", "yellow");
  // worldMap.setCountryColor("jp", "red");
  new Game(worldMap);
}

main();
