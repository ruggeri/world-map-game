#!/usr/bin/env npx ts-node

import bodyParser from "body-parser";
import fs from "fs";
import express from "express";
import os from "os";
import { CountrySuccessStatistics } from "../src/country_success_statistics";

async function main() {
  const app = express();

  app.use(express.static("./dist/"));
  app.use(bodyParser.json());

  app.get("/", (_, res) => {
    res.sendFile("./dist/index.html");
  });

  app.get("/bundle.js", (_, res) => {
    res.sendFile("./dist/bundle.js");
  });

  app.get("/World Map.svg", (_, res) => {
    res.sendFile("./dist/World Map.svg");
  });

  const username = os.userInfo().username;
  const statsFilename = `./dist/${username}-country-success-statistics.json`;
  type CountrySuccessStatisticsMap = Record<string, CountrySuccessStatistics>;

  async function readCountryStatistics(): Promise<CountrySuccessStatisticsMap> {
    try {
      return JSON.parse(
        await fs.promises.readFile(statsFilename, { encoding: "utf-8" })
      );
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  async function writeCountryStatistics(
    countrySuccessStatisticsMap: CountrySuccessStatisticsMap
  ): Promise<undefined> {
    try {
      await fs.promises.writeFile(
        statsFilename,
        JSON.stringify(countrySuccessStatisticsMap, null, 2)
      );

      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  let countrySuccessStatisticsMap = await readCountryStatistics();

  app.get("/country-success-statistics", async (_, res) => {
    res.json(countrySuccessStatisticsMap);
  });

  app.post("/country-success-statistics", async (req, res) => {
    console.log(req.body);

    let countrySuccessStatistics =
      countrySuccessStatisticsMap[req.body.isoCountryCode];
    if (countrySuccessStatistics === undefined) {
      countrySuccessStatistics = {
        isoCountryCode: req.body.isoCountryCode,
        timesGuessedCorrectly: 0,
        timesGuessedIncorrectly: 0,
      };
      countrySuccessStatisticsMap[req.body.isoCountryCode] =
        countrySuccessStatistics;
    }

    if (req.body.direction === "correct") {
      countrySuccessStatistics.timesGuessedCorrectly++;
    } else if (req.body.direction === "incorrect") {
      countrySuccessStatistics.timesGuessedIncorrectly++;
    }

    await writeCountryStatistics(countrySuccessStatisticsMap);

    res.json(countrySuccessStatistics);
  });

  const port = 8080;
  app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
  });
}

main();
