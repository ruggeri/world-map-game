import { CountryDataMap, CountryDatum, IsoCountryCode } from "./country_data";
import CountrySuccessStatisticsMap from "./country_success_statistics";
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

export class LowestSuccessCountryPicker implements CountryPicker {
  countryData: CountryDataMap;
  countrySuccessStatistics: CountrySuccessStatisticsMap;
  countriesInPlay: CountryCodes;

  constructor(
    countryData: CountryDataMap,
    countrySuccessStatistics: CountrySuccessStatisticsMap,
    countriesInPlay: CountryCodes
  ) {
    this.countryData = countryData;
    this.countrySuccessStatistics = countrySuccessStatistics;
    this.countriesInPlay = countriesInPlay;
  }

  nextCountry(): CountryDatum {
    const countryCode = this.countrySuccessStatistics.lowestRankCountry(
      this.countriesInPlay,
      1
    );
    return this.countryData.getDataForCode(countryCode)!;
  }
}
