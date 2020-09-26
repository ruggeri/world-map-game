import { getCountryData, CountryDatum, SovereigntyLevel } from "./country_data";
import { WorldMap } from "./world_map";
import * as CountryStatistics from "./country_success_statistics";

const COUNTRY_POPULATION_MINIMUM = 200_000;

export class Game {
  allCountries: Map<string, CountryDatum>;
  allCountryCodes: Array<string>;
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

    this.allCountryCodes = Array.from(this.allCountries.keys());
    this.worldMap = worldMap;

    // Hide circles for countries we won't be playing with.
    this.worldMap.hideCountryCircles(countriesToHide);

    this.startNextTurn();

    worldMap.setWorldMapClickHandler(this.attemptGuess.bind(this));
  }

  pickRandomCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.allCountryCodes.length);
    const countryCode = this.allCountryCodes[idx];
    return this.allCountries.get(countryCode)!;
  }

  pickLowestRankCountry(): CountryDatum {
    const countryCode = CountryStatistics.lowestRankCountry(
      this.allCountries,
      1
    );
    return this.allCountries.get(countryCode)!;
  }

  startNextTurn() {
    this.targetCountry = this.pickLowestRankCountry();
    console.log(`Find ${this.targetCountry.countryName}`);
    console.log(
      CountryStatistics.getCountryStatistics(this.targetCountry.isoCountryCode)
    );
  }

  async attemptGuess(guessedCountryCode: string) {
    console.log(`You clicked: ${guessedCountryCode}`);

    if (this.targetCountry.isoCountryCode === guessedCountryCode) {
      this.worldMap.setCountryColor(this.targetCountry.isoCountryCode, "green");
      await CountryStatistics.updateCountryStatistics(
        this.targetCountry.isoCountryCode,
        "correct"
      );
      this.startNextTurn();
    } else {
      await CountryStatistics.updateCountryStatistics(
        this.targetCountry.isoCountryCode,
        "incorrect"
      );
    }
  }
}
