import { getCountryData, CountryDatum, SovereigntyLevel } from "./country_data";
import { WorldMap } from "./world_map";

const COUNTRY_POPULATION_MINIMUM = 200_000;

export class Game {
  allCountries: Map<string, CountryDatum>;
  allCountryKeys: Array<string>;
  targetCountry!: CountryDatum;
  worldMap: WorldMap;

  constructor(worldMap: WorldMap) {
    this.allCountries = getCountryData((countryDatum) => {
      if (countryDatum.population < COUNTRY_POPULATION_MINIMUM) {
        return false;
      }

      if (countryDatum.sovereigntyLevel === SovereigntyLevel.Territory) {
        return false;
      }

      return true;
    });
    this.allCountryKeys = Array.from(this.allCountries.keys());
    this.worldMap = worldMap;

    this.startNextTurn();

    worldMap.setWorldMapClickHandler(this.attemptGuess.bind(this));
  }

  pickRandomCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.allCountryKeys.length);
    const countryKey = this.allCountryKeys[idx];
    return this.allCountries.get(countryKey)!;
  }

  startNextTurn() {
    this.targetCountry = this.pickRandomCountry();
    console.log(`Find ${this.targetCountry.countryName}`);
  }

  attemptGuess(guessedCountryCode: string) {
    console.log(`You clicked: ${guessedCountryCode}`);

    if (this.targetCountry.isoCountryCode === guessedCountryCode) {
      this.worldMap.setCountryColor(this.targetCountry.isoCountryCode, "green");
      this.startNextTurn();
    }
  }
}
