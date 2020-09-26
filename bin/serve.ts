import bodyParser from "body-parser";
import fs from "fs";
import express from "express";
import { CountrySuccessStatistics } from "../src/country_success_statistics";
import { count } from "console";

const app = express();

app.use(express.static("./dist/"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("./dist/index.html");
});

app.get("/bundle.js", (req, res) => {
  res.sendFile("./dist/bundle.js");
});

app.get("/World Map.svg", (req, res) => {
  res.sendFile("./dist/World Map.svg");
});

const statsFilename = "./dist/country-success-statistics.json";
let countrySuccessStatisticsMap: Record<string, CountrySuccessStatistics> = {};
try {
  countrySuccessStatisticsMap = JSON.parse(
    fs.readFileSync(statsFilename, { encoding: "utf-8" })
  );
} catch (e) {
  console.log(e);
  countrySuccessStatisticsMap = {};
}

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
    countrySuccessStatisticsMap[
      req.body.isoCountryCode
    ] = countrySuccessStatistics;
  }

  if (req.body.direction === "correct") {
    countrySuccessStatistics.timesGuessedCorrectly++;
  } else if (req.body.direction === "incorrect") {
    countrySuccessStatistics.timesGuessedIncorrectly++;
  }

  fs.writeFile(
    statsFilename,
    JSON.stringify(countrySuccessStatisticsMap),
    (err) => {
      console.log(err);
    }
  );

  res.json(countrySuccessStatistics);
});

const port = 8080;
app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});
