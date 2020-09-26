import { CountryDatum, getCountryData } from "./country_data";

interface CountrySuccessStatistics {
  isoCountryCode: string;
  timesGuessedCorrectly: number;
  timesGuessedIncorrectly: number;
}

let countrySuccessStatisticsMap: Map<string, CountrySuccessStatistics>;

export function initializeCountrySuccessStatistics() {
  console.log("initializing country success statistics map");
  countrySuccessStatisticsMap = new Map();
  for (const countryDatum of getCountryData().values()) {
    countrySuccessStatisticsMap.set(countryDatum.isoCountryCode, {
      isoCountryCode: countryDatum.isoCountryCode,
      timesGuessedCorrectly: 0,
      timesGuessedIncorrectly: 0,
    });
  }

  saveCountrySuccessStatisticsMap();
}

function loadCountrySuccessStatisticsMap() {
  let countrySuccessStatisticsString = localStorage.getItem(
    "countrySuccessStatisticsMap"
  );

  if (countrySuccessStatisticsString === null) {
    initializeCountrySuccessStatistics();
    return;
  }

  console.log("deserializing country success statistics map");
  let countrySuccessStatisticsObject = JSON.parse(
    countrySuccessStatisticsString
  ) as Object;
  countrySuccessStatisticsMap = new Map(
    Object.entries(countrySuccessStatisticsObject)
  );
}

function saveCountrySuccessStatisticsMap() {
  console.log("saving country success statistics map");
  const countrySuccessStatisticsObject: Record<
    string,
    CountrySuccessStatistics
  > = {};
  for (const [key, value] of countrySuccessStatisticsMap.entries()) {
    countrySuccessStatisticsObject[key] = value;
  }

  const countrySuccessStatisticsString = JSON.stringify(
    countrySuccessStatisticsObject
  );
  localStorage.setItem(
    "countrySuccessStatisticsMap",
    countrySuccessStatisticsString
  );
}

export function getCountryStatistics(
  countryCode: string
): CountrySuccessStatistics {
  if (!countrySuccessStatisticsMap) {
    loadCountrySuccessStatisticsMap();
  }

  return countrySuccessStatisticsMap.get(countryCode.toUpperCase())!;
}

export function markCountryCorrect(countryCode: string) {
  const countrySuccessStatistics = getCountryStatistics(countryCode);
  countrySuccessStatistics.timesGuessedCorrectly++;
  saveCountrySuccessStatisticsMap();
}

export function markCountryIncorrect(countryCode: string) {
  const countrySuccessStatistics = getCountryStatistics(countryCode);
  countrySuccessStatistics.timesGuessedIncorrectly++;
  saveCountrySuccessStatisticsMap();
}

export function lowestRankCountry(
  allCountries: Map<string, CountryDatum>,
  pseudocounts: number
): string {
  if (!countrySuccessStatisticsMap) {
    loadCountrySuccessStatisticsMap();
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
