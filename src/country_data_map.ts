import {
  jsonCountryDataMap,
  CountryDatum,
  IsoCountryCode,
  SovereigntyLevel,
} from "./country_data";

// JavaScript Map representation of country data (with parsed
// populations).
type _CountryDataMap = Map<IsoCountryCode, CountryDatum>;

/**
 * `CountryDataMap` is the preferred way to access country data.
 * Effectively a wrapper class.
 */
export class CountryDataMap {
  _map: _CountryDataMap;

  /**
   * Builds and returns a `CountryDataMap` consisting of all the
   * countries' data.
   */
  static allDataMap(): CountryDataMap {
    const countryDataMap: _CountryDataMap = new Map();
    for (const isoCountryCodeStr in jsonCountryDataMap) {
      const rawCountryDatum = jsonCountryDataMap[isoCountryCodeStr];
      const isoCountryCode =
        IsoCountryCode[isoCountryCodeStr as keyof typeof IsoCountryCode];
      const countryDatum: CountryDatum = {
        ...rawCountryDatum,
        isoCountryCode,
        population: Number(rawCountryDatum.population),
      };
      countryDataMap.set(isoCountryCode, countryDatum);
    }

    return new CountryDataMap(countryDataMap);
  }

  static dataMapForPlay(): [CountryDataMap, Array<IsoCountryCode>] {
    const COUNTRY_POPULATION_MINIMUM = 200_000;

    const allCountriesMap = this.allDataMap();

    const removedCountries: Array<IsoCountryCode> = [];
    const filteredCountriesMap = allCountriesMap.filter(
      (countryDatum: CountryDatum): boolean => {
        // Don't play with very small population countries.
        if (countryDatum.population < COUNTRY_POPULATION_MINIMUM) {
          removedCountries.push(countryDatum.isoCountryCode);
          return false;
        }

        // Don't play with countries that aren't sovereign.
        if (countryDatum.sovereigntyLevel === SovereigntyLevel.Territory) {
          removedCountries.push(countryDatum.isoCountryCode);
          return false;
        }

        return true;
      }
    );

    return [filteredCountriesMap, removedCountries];
  }

  constructor(countryDataMap: _CountryDataMap) {
    this._map = countryDataMap;
  }

  /**
   * Produces a `CountryDataMap` of only those countries that match the
   * `filterFn`.
   */
  filter(filterFn: (countryDatum: CountryDatum) => boolean): CountryDataMap {
    const filteredCountryDataMap: _CountryDataMap = new Map();
    for (const countryDatum of this._map.values()) {
      if (!filterFn(countryDatum)) {
        continue;
      }
      filteredCountryDataMap.set(countryDatum.isoCountryCode, countryDatum);
    }

    return new CountryDataMap(filteredCountryDataMap);
  }

  /**
   * Get data for the specified country.
   */
  getDataForCode(isoCountryCode: IsoCountryCode): CountryDatum | null {
    return this._map.get(isoCountryCode) || null;
  }

  /**
   * Return an iterator for all the keys in the `CountryDataMap`.
   */
  keys() {
    return this._map.keys();
  }

  /**
   * Return an iterator for the country data values in the map.
   */
  [Symbol.iterator]() {
    return this._map.values();
  }
}

export default CountryDataMap;
