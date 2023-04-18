import { getCountryCode, IsoCountryCode } from "./country_data";

/**
 * `CountrySuccessStatistics` records how many times a country has been
 * guessed correctly/incorrectly.
 */
export interface CountrySuccessStatistics {
  isoCountryCode: IsoCountryCode;
  timesGuessedCorrectly: number;
  timesGuessedIncorrectly: number;
  lastGuessedCorrectly: Date;
}

export function defaultCountrySuccessStatistics(
  isoCountryCode: IsoCountryCode
): CountrySuccessStatistics {
  return {
    isoCountryCode,
    timesGuessedCorrectly: 0,
    timesGuessedIncorrectly: 0,
    lastGuessedCorrectly: new Date(0),
  };
}

/**
 * `CountrySuccessStatisticsPayload` is the type of the JSON payload
 * we'll be sent from the server.
 */
export type CountrySuccessStatisticsPayload = Record<
  string,
  CountrySuccessStatistics
>;

/**
 * `InnerCountrySuccessStatisticsMap` is the 'inner' type that will be
 * wrapped by `CountrySuccessStatisticsMap`.
 */
export type InnerCountrySuccessStatisticsMap = Map<
  IsoCountryCode,
  CountrySuccessStatistics
>;

/**
 * Wrapper class that stores `CountrySuccessStatistics` for each
 * country.
 */
export class CountrySuccessStatisticsMap {
  map: InnerCountrySuccessStatisticsMap;

  /**
   * `fetchMapFromServer` fetches the success data from the server.
   */
  static async fetchMapFromServer(): Promise<CountrySuccessStatisticsMap> {
    // Fetch and parse data.
    const countrySuccessStatisticsPayload = (await (
      await fetch("country-success-statistics")
    ).json()) as CountrySuccessStatisticsPayload;

    console.log(countrySuccessStatisticsPayload);

    // Convert it from JSON object to Map.
    return this.fromJSON(countrySuccessStatisticsPayload);
  }

  static fromJSON(
    countrySuccessStatisticsPayload: CountrySuccessStatisticsPayload
  ): CountrySuccessStatisticsMap {
    const map: InnerCountrySuccessStatisticsMap = new Map();
    for (const isoCountryCodeStr in countrySuccessStatisticsPayload) {
      const countrySuccessStatistics =
        countrySuccessStatisticsPayload[isoCountryCodeStr];

      // Try to parse serialized lastGuessedCorrectly date.
      if (countrySuccessStatistics.lastGuessedCorrectly) {
        countrySuccessStatistics.lastGuessedCorrectly = new Date(
          countrySuccessStatistics.lastGuessedCorrectly as unknown as string
        );
      } else {
        // Default it to the start of the epoch.
        countrySuccessStatistics.lastGuessedCorrectly = new Date(0);
      }

      const isoCountryCode = getCountryCode(isoCountryCodeStr);
      map.set(isoCountryCode, countrySuccessStatistics);
    }

    return new CountrySuccessStatisticsMap(map);
  }

  constructor(map: InnerCountrySuccessStatisticsMap) {
    this.map = map;
  }

  /**
   * Gets statistics for the specified country.
   */
  statisticsForCode(isoCountryCode: IsoCountryCode): CountrySuccessStatistics {
    const countrySuccessStatistics = this.map.get(isoCountryCode);

    if (countrySuccessStatistics !== undefined) {
      return countrySuccessStatistics;
    }

    // If we have no data recorded for this country, then we initialize
    // a default object.
    return defaultCountrySuccessStatistics(isoCountryCode);
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
    this.map.set(isoCountryCode, newSuccessStatistics);
  }

  toJSON() {
    return Object.fromEntries(this.map);
  }
}

export default CountrySuccessStatisticsMap;
