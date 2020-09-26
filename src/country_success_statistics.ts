import { CountryDatum, getCountryData } from "./country_data";

export interface CountrySuccessStatistics {
  isoCountryCode: string;
  timesGuessedCorrectly: number;
  timesGuessedIncorrectly: number;
}

let countrySuccessStatisticsMap: Record<string, CountrySuccessStatistics>;

export async function loadCountrySuccessStatisticsMap() {
  countrySuccessStatisticsMap = await (
    await fetch("country-success-statistics")
  ).json();

  for (const countryDatum of getCountryData().values()) {
    if (countryDatum.isoCountryCode in countrySuccessStatisticsMap) {
      continue;
    }

    countrySuccessStatisticsMap[countryDatum.isoCountryCode] = {
      isoCountryCode: countryDatum.isoCountryCode,
      timesGuessedCorrectly: 0,
      timesGuessedIncorrectly: 0,
    };
  }
}

export function getCountryStatistics(
  countryCode: string
): CountrySuccessStatistics {
  if (!countrySuccessStatisticsMap) {
    throw new Error(
      "must not call getCountryStatistics before statistics are loaded"
    );
  }

  return countrySuccessStatisticsMap[countryCode.toUpperCase()];
}

export async function updateCountryStatistics(
  isoCountryCode: string,
  direction: "correct" | "incorrect"
) {
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

  return await response.json();
}

export function lowestRankCountry(
  allCountries: Map<string, CountryDatum>,
  pseudocounts: number
): string {
  if (!countrySuccessStatisticsMap) {
    if (!countrySuccessStatisticsMap) {
      throw new Error(
        "must not call lowestRankCountry before statistics are loaded"
      );
    }
  }

  let lowestCountryCode: string | null = null;
  let lowestCountryPercentage: number | null = null;
  for (const countryCode of allCountries.keys()) {
    const countryStatistics = getCountryStatistics(countryCode);
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
  console.log(lowestCountryCode);
  return lowestCountryCode!;
}
