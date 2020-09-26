import CountryDataMap from "./country_data";

export interface CountrySuccessStatistics {
  isoCountryCode: string;
  timesGuessedCorrectly: number;
  timesGuessedIncorrectly: number;
}

type CountrySuccessStatisticsRecord = Record<string, CountrySuccessStatistics>;
type RawCountrySuccessStatisticsMap = Map<string, CountrySuccessStatistics>;

export class CountrySuccessStatisticsMap {
  countrySuccessStatisticsMap: RawCountrySuccessStatisticsMap;

  static async fetchMapFromServer(): Promise<CountrySuccessStatisticsMap> {
    const serverCountrySuccessStatisticsRecord = (await (
      await fetch("country-success-statistics")
    ).json()) as CountrySuccessStatisticsRecord;

    const countrySuccessStatisticsMap = new Map();
    for (const isoCountryCode in serverCountrySuccessStatisticsRecord) {
      const countrySuccessStatistics =
        serverCountrySuccessStatisticsRecord[isoCountryCode];
      countrySuccessStatisticsMap.set(isoCountryCode, countrySuccessStatistics);
    }

    return new CountrySuccessStatisticsMap(countrySuccessStatisticsMap);
  }

  constructor(countrySuccessStatisticsMap: RawCountrySuccessStatisticsMap) {
    this.countrySuccessStatisticsMap = countrySuccessStatisticsMap;
  }

  statisticsForCode(isoCountryCode: string): CountrySuccessStatistics {
    const countrySuccessStatistics = this.countrySuccessStatisticsMap.get(
      isoCountryCode.toUpperCase()
    );

    if (countrySuccessStatistics) {
      return countrySuccessStatistics;
    }

    return {
      isoCountryCode,
      timesGuessedCorrectly: 0,
      timesGuessedIncorrectly: 0,
    };
  }

  async update(isoCountryCode: string, direction: "correct" | "incorrect") {
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

    const newSuccessStatistics = await response.json();
    this.countrySuccessStatisticsMap.set(isoCountryCode, newSuccessStatistics);
  }

  lowestRankCountry(
    allCountries: CountryDataMap,
    pseudocounts: number
  ): string {
    let lowestCountryCode: string | null = null;
    let lowestCountryPercentage: number | null = null;
    for (const countryDatum of allCountries) {
      const isoCountryCode = countryDatum.isoCountryCode;
      const countryStatistics = this.statisticsForCode(isoCountryCode);

      const countryPercentage =
        countryStatistics.timesGuessedCorrectly /
        (countryStatistics.timesGuessedIncorrectly +
          countryStatistics.timesGuessedCorrectly +
          pseudocounts);

      if (
        lowestCountryCode === null ||
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
