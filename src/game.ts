import { CountryDataMap, CountryDatum, SovereigntyLevel } from "./country_data";
import WorldMap from "./world_map";
import CountrySuccessStatisticsMap from "./country_success_statistics";

const COUNTRY_POPULATION_MINIMUM = 200_000;

export class Game {
  allCountries: CountryDataMap;
  allCountryCodes: Array<string>;
  countryStatisticsMap: CountrySuccessStatisticsMap;
  targetCountry!: CountryDatum;
  worldMap: WorldMap;

  constructor(
    allCountries: CountryDataMap,
    countryStatisticsMap: CountrySuccessStatisticsMap,
    worldMap: WorldMap
  ) {
    const countriesToHide: Array<string> = [];
    this.allCountries = allCountries.filter(
      (countryDatum: CountryDatum): boolean => {
        // Don't play with very small population countries.
        if (countryDatum.population < COUNTRY_POPULATION_MINIMUM) {
          countriesToHide.push(countryDatum.isoCountryCode);
          return false;
        }

        // Don't play with countries that aren't sovereign.
        if (countryDatum.sovereigntyLevel === SovereigntyLevel.Territory) {
          countriesToHide.push(countryDatum.isoCountryCode);
          return false;
        }

        return true;
      }
    );

    this.allCountryCodes = Array.from(this.allCountries.keys());
    this.countryStatisticsMap = countryStatisticsMap;
    this.worldMap = worldMap;

    // Hide circles for countries we won't be playing with.
    this.worldMap.hideCountryCircles(countriesToHide);

    this.startNextTurn();

    worldMap.setWorldMapClickHandler(this.attemptGuess.bind(this));
  }

  pickRandomCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.allCountryCodes.length);
    const countryCode = this.allCountryCodes[idx];
    return this.allCountries.getDataForCode(countryCode)!;
  }

  pickLowestRankCountry(): CountryDatum {
    const countryCode = this.countryStatisticsMap.lowestRankCountry(
      this.allCountries,
      1
    );
    return this.allCountries.getDataForCode(countryCode)!;
  }

  startNextTurn() {
    this.targetCountry = this.pickLowestRankCountry();
    console.log(`Find ${this.targetCountry.countryName}`);
    console.log(
      this.countryStatisticsMap.statisticsForCode(
        this.targetCountry.isoCountryCode
      )
    );
  }

  async attemptGuess(guessedCountryCode: string) {
    console.log(`You clicked: ${guessedCountryCode}`);

    if (this.targetCountry.isoCountryCode === guessedCountryCode) {
      this.worldMap.setCountryColor(this.targetCountry.isoCountryCode, "green");
      await this.countryStatisticsMap.update(
        this.targetCountry.isoCountryCode,
        "correct"
      );
      this.startNextTurn();
    } else {
      await this.countryStatisticsMap.update(
        this.targetCountry.isoCountryCode,
        "incorrect"
      );
    }
  }
}

export default Game;
