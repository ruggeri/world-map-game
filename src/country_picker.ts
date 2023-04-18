import { CountryDataMap, CountryDatum, IsoCountryCode } from "./country_data";
import {
  CountrySuccessStatistics,
  CountrySuccessStatisticsMap,
} from "./country_success_statistics";
import shuffle from "shuffle-array";

type CountryCodes = Array<IsoCountryCode>;

export interface CountryPicker {
  nextCountry(): CountryDatum;
}

export enum CountryPickerType {
  RANDOM_COUNTRY_PICKER = "RANDOM_COUNTRY_PICKER",
  RANDOM_ORDER_COUNTRY_PICKER = "RANDOM_ORDER_COUNTRY_PICKER",
  LOWEST_SUCCESS_COUNTRY_PICKER = "LOWEST_SUCCESS_COUNTRY_PICKER",
}

export function getCountryPicker(
  countryPickerType: CountryPickerType,
  countryData: CountryDataMap,
  countriesInPlay: CountryCodes,
  countrySuccessStatistics: CountrySuccessStatisticsMap
): CountryPicker {
  if (countryPickerType === CountryPickerType.RANDOM_COUNTRY_PICKER) {
    return new RandomCountryPicker(countryData, countriesInPlay);
  } else if (
    countryPickerType === CountryPickerType.RANDOM_ORDER_COUNTRY_PICKER
  ) {
    return new RandomOrderCountryPicker(countryData, countriesInPlay);
  } else if (
    countryPickerType === CountryPickerType.LOWEST_SUCCESS_COUNTRY_PICKER
  ) {
    return new LowestSuccessCountryPicker(
      countryData,
      countrySuccessStatistics,
      countriesInPlay
    );
  } else {
    throw new Error(`Invalid CountryPickerType: ${countryPickerType}`);
  }
}

export class RandomCountryPicker implements CountryPicker {
  countryData: CountryDataMap;
  countriesInPlay: CountryCodes;

  constructor(countryData: CountryDataMap, countriesInPlay: CountryCodes) {
    this.countryData = countryData;
    this.countriesInPlay = countriesInPlay;
  }

  nextCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.countriesInPlay.length);
    const countryCode = this.countriesInPlay[idx];
    return this.countryData.getDataForCode(countryCode)!;
  }
}

export class RandomOrderCountryPicker implements CountryPicker {
  countryData: CountryDataMap;
  countriesInPlay: CountryCodes;
  idx: number;

  constructor(countryData: CountryDataMap, countriesInPlay: CountryCodes) {
    this.countryData = countryData;
    this.countriesInPlay = Object.assign(countriesInPlay);
    shuffle(this.countriesInPlay);
    this.idx = 0;
  }

  nextCountry(): CountryDatum {
    const countryCode =
      this.countriesInPlay[this.idx++ % this.countriesInPlay.length];
    return this.countryData.getDataForCode(countryCode)!;
  }
}

const PSEUDOCOUNTS = 2;
const RECENCY_LIMIT = 50;

function percentageCorrect(
  countrySuccessStatistics: CountrySuccessStatistics
): number {
  return (
    countrySuccessStatistics.timesGuessedCorrectly /
    (countrySuccessStatistics.timesGuessedIncorrectly +
      countrySuccessStatistics.timesGuessedCorrectly +
      PSEUDOCOUNTS)
  );
}

export class LowestSuccessCountryPicker implements CountryPicker {
  countryData: CountryDataMap;
  countrySuccessStatistics: CountrySuccessStatisticsMap;
  countriesInPlay: CountryCodes;
  recentlySelectedCountries: CountryCodes;

  constructor(
    countryData: CountryDataMap,
    countrySuccessStatistics: CountrySuccessStatisticsMap,
    countriesInPlay: CountryCodes
  ) {
    this.countryData = countryData;
    this.countrySuccessStatistics = countrySuccessStatistics;
    this.countriesInPlay = countriesInPlay;
    this.recentlySelectedCountries = [];
  }

  nextCountry(): CountryDatum {
    if (this.recentlySelectedCountries.length === RECENCY_LIMIT) {
      this.recentlySelectedCountries.shift();
    }

    let minCountryStatistics: CountrySuccessStatistics | null = null;

    for (const currIsoCountryCode of this.countriesInPlay) {
      if (this.recentlySelectedCountries.includes(currIsoCountryCode)) {
        continue;
      }

      const currCountryStatistics =
        this.countrySuccessStatistics.statisticsForCode(currIsoCountryCode);

      const currCountryPercentage = percentageCorrect(currCountryStatistics);

      let currIsLowest = false;
      if (minCountryStatistics === null) {
        // If it is the first country considered, take current.
        currIsLowest = true;
      } else if (
        currCountryPercentage > percentageCorrect(minCountryStatistics)
      ) {
        // Skip current if it has higher success rate than min.
        currIsLowest = false;
      } else if (
        currCountryPercentage < percentageCorrect(minCountryStatistics)
      ) {
        // Take current if has lower success rate than min.
        currIsLowest = true;
      } else if (
        currCountryStatistics.lastGuessedCorrectly.getTime() >=
        minCountryStatistics.lastGuessedCorrectly.getTime()
      ) {
        // If tied for success rate, skip current if it has more recent
        // time that it was last guessed correctly.
        currIsLowest = false;
      } else if (
        currCountryStatistics.lastGuessedCorrectly.getTime() <
        minCountryStatistics.lastGuessedCorrectly.getTime()
      ) {
        // If tied for success rate, take current if it has more distant
        // time that it was last guessed.
        currIsLowest = true;
      } else {
        console.log(currCountryPercentage);
        console.log(minCountryStatistics);
        throw new Error("Cases should be exhaustive.");
      }

      if (!currIsLowest) {
        continue;
      }

      minCountryStatistics = currCountryStatistics;
    }

    const minIsoCountryCode = minCountryStatistics!.isoCountryCode;
    this.recentlySelectedCountries.push(minIsoCountryCode);
    return this.countryData.getDataForCode(minIsoCountryCode)!;
  }
}
