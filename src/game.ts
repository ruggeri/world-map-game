import {
  CountryDataMap,
  CountryDatum,
  getCountryCode,
  IsoCountryCode,
  SovereigntyLevel,
} from "./country_data";
import WorldMap from "./world_map";
import CountrySuccessStatisticsMap from "./country_success_statistics";

const COUNTRY_POPULATION_MINIMUM = 200_000;

/**
 * Represents the state of the country guessing game.
 */
export class Game {
  allCountries: CountryDataMap;
  allCountryCodes: Array<IsoCountryCode>;
  countryStatisticsMap: CountrySuccessStatisticsMap;
  targetCountry!: CountryDatum;
  worldMap: WorldMap;

  constructor(
    allCountries: CountryDataMap,
    countryStatisticsMap: CountrySuccessStatisticsMap,
    worldMap: WorldMap
  ) {
    const countriesToHide: Array<IsoCountryCode> = [];
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

    // Set click handler on world map. When they click, it will trigger
    // a guess for the game.
    worldMap.setWorldMapClickHandler((countryCodeStr: string) => {
      const isoCountryCode = getCountryCode(countryCodeStr);
      this.attemptGuess(isoCountryCode);
    });
  }

  /**
   * Returns a random country from the playing set.
   */
  pickRandomCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.allCountryCodes.length);
    const countryCode = this.allCountryCodes[idx];
    return this.allCountries.getDataForCode(countryCode)!;
  }

  /**
   * Picks the country with the lowest success statistics.
   */
  pickLowestRankCountry(): CountryDatum {
    const countryCode = this.countryStatisticsMap.lowestRankCountry(
      this.allCountries,
      1
    );
    return this.allCountries.getDataForCode(countryCode)!;
  }

  /**
   * Starts the next turn of the game by picking the country with the
   * lowest statistics.
   */
  startNextTurn() {
    this.targetCountry = this.pickLowestRankCountry();
    console.log(`Find ${this.targetCountry.countryName}`);
    console.log(
      this.countryStatisticsMap.statisticsForCode(
        this.targetCountry.isoCountryCode
      )
    );
  }

  /**
   * Call `attemptGuess` to record a guess.
   */
  async attemptGuess(guessedCountryCode: IsoCountryCode) {
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
