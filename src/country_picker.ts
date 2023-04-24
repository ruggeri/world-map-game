import { CountryDatum, IsoCountryCode } from "./country_data";
import CountryDataMap from "./country_data_map";
import {
  CountrySuccessStatistics,
  CountrySuccessStatisticsMap,
} from "./country_success_statistics";
import shuffle from "shuffle-array";
import _ from "lodash";

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
  countryDataMap: CountryDataMap,
  countriesInPlay: CountryCodes,
  countrySuccessStatistics: CountrySuccessStatisticsMap
): CountryPicker {
  if (countryPickerType === CountryPickerType.RANDOM_COUNTRY_PICKER) {
    return new RandomCountryPicker(countryDataMap, countriesInPlay);
  } else if (
    countryPickerType === CountryPickerType.RANDOM_ORDER_COUNTRY_PICKER
  ) {
    return new RandomOrderCountryPicker(countryDataMap, countriesInPlay);
  } else if (
    countryPickerType === CountryPickerType.LOWEST_SUCCESS_COUNTRY_PICKER
  ) {
    return new LowestSuccessCountryPicker(
      countryDataMap,
      countrySuccessStatistics,
      countriesInPlay
    );
  } else {
    throw new Error(`Invalid CountryPickerType: ${countryPickerType}`);
  }
}

export class RandomCountryPicker implements CountryPicker {
  countryDataMap: CountryDataMap;
  countriesInPlay: CountryCodes;

  constructor(countryDataMap: CountryDataMap, countriesInPlay: CountryCodes) {
    this.countryDataMap = countryDataMap;
    this.countriesInPlay = countriesInPlay;
  }

  nextCountry(): CountryDatum {
    const idx = Math.floor(Math.random() * this.countriesInPlay.length);
    const countryCode = this.countriesInPlay[idx];
    return this.countryDataMap.getDataForCode(countryCode)!;
  }
}

export class RandomOrderCountryPicker implements CountryPicker {
  countryDataMap: CountryDataMap;
  countriesInPlay: CountryCodes;
  idx: number;

  constructor(countryDataMap: CountryDataMap, countriesInPlay: CountryCodes) {
    this.countryDataMap = countryDataMap;
    this.countriesInPlay = Object.assign(countriesInPlay);
    shuffle(this.countriesInPlay);
    this.idx = 0;
  }

  nextCountry(): CountryDatum {
    const countryCode =
      this.countriesInPlay[this.idx++ % this.countriesInPlay.length];
    return this.countryDataMap.getDataForCode(countryCode)!;
  }
}

const PSEUDOCOUNTS = 2;

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
  countryDataMap: CountryDataMap;
  countrySuccessStatistics: CountrySuccessStatisticsMap;
  countriesInPlay: CountryCodes;

  constructor(
    countryDataMap: CountryDataMap,
    countrySuccessStatistics: CountrySuccessStatisticsMap,
    countriesInPlay: CountryCodes
  ) {
    this.countryDataMap = countryDataMap;
    this.countrySuccessStatistics = countrySuccessStatistics;
    this.countriesInPlay = countriesInPlay;
  }

  nextCountry(): CountryDatum {
    let countriesInPlay = Array.from(this.countriesInPlay);
    countriesInPlay = _.shuffle(countriesInPlay);
    countriesInPlay = _.sortBy(countriesInPlay, (isoCountryCode): number => {
      return percentageCorrect(
        this.countrySuccessStatistics.statisticsForCode(isoCountryCode)
      );
    });

    const CUT_POINTS = [0.0];
    const chosenCutPoint = _.sample(CUT_POINTS)!;
    const endIdx = Math.floor((1 - chosenCutPoint) * countriesInPlay.length);
    countriesInPlay = countriesInPlay.slice(0, endIdx);

    const isoCountryCode = _.sample(countriesInPlay)!;
    return this.countryDataMap.getDataForCode(isoCountryCode)!;
  }
}
