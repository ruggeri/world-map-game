import { CountryDatum, IsoCountryCode } from "./country_data";
import CountryDataMap from "./country_data_map";
import {
  CountryPicker,
  CountryPickerType,
  getCountryPicker,
} from "./country_picker";
import WorldMap from "./world_map";
import CountrySuccessStatisticsMap from "./country_success_statistics";

const HIGHLIGHTED_COUNTRY_LIMIT = -1;

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
    const [countryDataMap, removedCountries] = CountryDataMap.dataMapForPlay();

    this.allCountries = countryDataMap;
    this.allCountryCodes = Array.from(this.allCountries.keys());
    this.countryStatisticsMap = countryStatisticsMap;
    this.recentCountryCodes = [];
    this.worldMap = worldMap;

    // Hide circles for countries we won't be playing with.
    this.worldMap.hideCountryCircles(removedCountries);

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
    // Check if there is a limit on highlighted countries, and check in
    // case this is our first turn.
    if (HIGHLIGHTED_COUNTRY_LIMIT !== -1 && this.targetCountry) {
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
