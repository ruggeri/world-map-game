import {
  CountryDataMap,
  CountryDatum,
  getCountryCode,
  IsoCountryCode,
  SovereigntyLevel,
} from "./country_data";
import {
  CountryPicker,
  CountryPickerType,
  getCountryPicker,
} from "./country_picker";
import WorldMap from "./world_map";
import CountrySuccessStatisticsMap from "./country_success_statistics";

const COUNTRY_POPULATION_MINIMUM = 200_000;
const HIGHLIGHTED_COUNTRY_LIMIT = 20;

/**
 * Represents the state of the country guessing game.
 */
export class Game {
  allCountries: CountryDataMap;
  allCountryCodes: Array<IsoCountryCode>;
  countryStatisticsMap: CountrySuccessStatisticsMap;
  countryPicker: CountryPicker;
  recentCountryCodes: Array<IsoCountryCode>;
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
    this.recentCountryCodes = [];
    this.worldMap = worldMap;

    // Hide circles for countries we won't be playing with.
    this.worldMap.hideCountryCircles(countriesToHide);

    this.countryPicker = getCountryPicker(
      CountryPickerType.LOWEST_SUCCESS_COUNTRY_PICKER,
      this.allCountries,
      this.allCountryCodes,
      this.countryStatisticsMap
    );

    this.startNextTurn();

    // Set click handler on world map. When they click, it will trigger
    // a guess for the game.
    worldMap.setWorldMapClickHandler((isoCountryCode) => {
      this.attemptGuess(isoCountryCode);
    });
  }

  /**
   * Starts the next turn of the game by picking the country with the
   * lowest statistics.
   */
  startNextTurn() {
    // Check in case this is our first turn.
    if (this.targetCountry) {
      this.recentCountryCodes.push(this.targetCountry.isoCountryCode);
      if (this.recentCountryCodes.length > HIGHLIGHTED_COUNTRY_LIMIT) {
        const codeToRemoveHighlight = this.recentCountryCodes.shift()!;
        this.worldMap.clearCountryColor(codeToRemoveHighlight);
      }
    }

    this.targetCountry = this.countryPicker.nextCountry();

    console.log(`Find ${this.targetCountry.capitalCity}`);
    // console.log(`Find ${this.targetCountry.countryName}`);
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

      console.log(this.targetCountry);
      console.log(this.targetCountry.wikiUrl);
      console.log(
        this.countryStatisticsMap.statisticsForCode(
          this.targetCountry.isoCountryCode
        )
      );

      this.startNextTurn();
    } else {
      await this.countryStatisticsMap.update(
        this.targetCountry.isoCountryCode,
        "incorrect"
      );
      await this.countryStatisticsMap.update(guessedCountryCode, "incorrect");
    }
  }
}

export default Game;
