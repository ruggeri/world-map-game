import { getCountryData, CountryDatum, SovereigntyLevel } from "./country_data";
import { WorldMap } from "./world_map";

const COUNTRY_POPULATION_MINIMUM = 200_000;

export class Game {
  allCountries: Map<string, CountryDatum>;
  allCountryKeys: Array<string>;
  targetCountry!: CountryDatum;
  worldMap: WorldMap;

  constructor(worldMap: WorldMap) {
    this.allCountries = new Map();

    const countriesToHide: Array<string> = [];
    for (const countryDatum of getCountryData().values()) {
      // Don't play with very small population countries.
      if (countryDatum.population < COUNTRY_POPULATION_MINIMUM) {
        countriesToHide.push(countryDatum.isoCountryCode);
        continue;
      }

      // Don't play with countries that aren't sovereign.
      if (countryDatum.sovereigntyLevel === SovereigntyLevel.Territory) {
        countriesToHide.push(countryDatum.isoCountryCode);
        continue;
      }

      this.allCountries.set(countryDatum.isoCountryCode, countryDatum);
    }

    this.allCountryKeys = Array.from(this.allCountries.keys());
    this.worldMap = worldMap;

    // Hide circles for countries we won't be playing with.
    this.worldMap.hideCountryCircles(countriesToHide);

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
