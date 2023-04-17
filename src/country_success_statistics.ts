import { CountryDataMap, getCountryCode, IsoCountryCode } from "./country_data";

/**
 * `CountrySuccessStatistics` records how many times a country has been
 * guessed correctly/incorrectly.
 */
export interface CountrySuccessStatistics {
  isoCountryCode: IsoCountryCode;
  timesGuessedCorrectly: number;
  timesGuessedIncorrectly: number;
}

/**
 * `CountrySuccessStatisticsRecord` is the type of the JSON payload
 * we'll be sent from the server.
 */
type CountrySuccessStatisticsRecord = Record<string, CountrySuccessStatistics>;
/**
 * `RawCountrySuccessStatisticsMap` is the 'inner' type that will be
 * wrapped by `CountrySuccessStatisticsMap`.
 */
type RawCountrySuccessStatisticsMap = Map<
  IsoCountryCode,
  CountrySuccessStatistics
>;

/**
 * Wrapper class that stores `CountrySuccessStatistics` for each
 * country.
 */
export class CountrySuccessStatisticsMap {
  countrySuccessStatisticsMap: RawCountrySuccessStatisticsMap;

  /**
   * `fetchMapFromServer` fetches the success data from the server.
   */
  static async fetchMapFromServer(): Promise<CountrySuccessStatisticsMap> {
    // Fetch and parse data.
    const serverCountrySuccessStatisticsRecord = (await (
      await fetch("country-success-statistics")
    ).json()) as CountrySuccessStatisticsRecord;

    // Convert it from JSON object to Map.
    const countrySuccessStatisticsMap: RawCountrySuccessStatisticsMap =
      new Map();
    for (const isoCountryCodeStr in serverCountrySuccessStatisticsRecord) {
      const countrySuccessStatistics =
        serverCountrySuccessStatisticsRecord[isoCountryCodeStr];
      const isoCountryCode = getCountryCode(isoCountryCodeStr);
      countrySuccessStatisticsMap.set(isoCountryCode, countrySuccessStatistics);
    }

    return new CountrySuccessStatisticsMap(countrySuccessStatisticsMap);
  }

  constructor(countrySuccessStatisticsMap: RawCountrySuccessStatisticsMap) {
    this.countrySuccessStatisticsMap = countrySuccessStatisticsMap;
  }

  /**
   * Gets statistics for the specified country.
   */
  statisticsForCode(isoCountryCode: IsoCountryCode): CountrySuccessStatistics {
    const countrySuccessStatistics =
      this.countrySuccessStatisticsMap.get(isoCountryCode);

    if (countrySuccessStatistics !== undefined) {
      return countrySuccessStatistics;
    }

    // If we have no data recorded for this country, then it has been
    // guessed correctly/incorrectly zero times.
    return {
      isoCountryCode,
      timesGuessedCorrectly: 0,
      timesGuessedIncorrectly: 0,
    };
  }

  /**
   * Makes an AJAX request to update the statistics for this country.
   */
  async update(
    isoCountryCode: IsoCountryCode,
    direction: "correct" | "incorrect"
  ): Promise<void> {
    // Make the AJAX request to update the statistics.
    const response = await fetch("country-success-statistics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isoCountryCode,
        direction,
      }),
    });

    // The server will send us the most recent statistics.
    const newSuccessStatistics =
      (await response.json()) as CountrySuccessStatistics;
    // Update our statistics map with the new data.
    this.countrySuccessStatisticsMap.set(isoCountryCode, newSuccessStatistics);
  }

  /**
   * Finds the country in `allCountries` with the lowest ranked
   * statistics. Smooths percentage correct by using pseudocounts.
   */
  lowestRankCountry(
    allCountries: Array<IsoCountryCode>,
    pseudocounts: number
  ): IsoCountryCode {
    let lowestCountryCode: IsoCountryCode | null = null;
    let lowestCountryPercentage: number | null = null;
    for (const isoCountryCode of allCountries) {
      const countryStatistics = this.statisticsForCode(isoCountryCode);

      const countryPercentage =
        countryStatistics.timesGuessedCorrectly /
        (countryStatistics.timesGuessedIncorrectly +
          countryStatistics.timesGuessedCorrectly +
          pseudocounts);

      if (
        lowestCountryPercentage === null ||
        countryPercentage < lowestCountryPercentage
      ) {
        lowestCountryCode = countryStatistics.isoCountryCode;
        lowestCountryPercentage = countryPercentage;
      }
    }

    return lowestCountryCode!;
  }
}

export default CountrySuccessStatisticsMap;
