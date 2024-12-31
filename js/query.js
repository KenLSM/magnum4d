const csv = require("csv-stringify/sync");
const fs = require("fs");
const path = require("path");

const QUERY_DATE = "31-12-2024"; // DD-MM-YYYY format
const OUTPUT_DIR = "output";
const OUTPUT_FILENAME = "data.csv";

const req = fetch(
  `https://app-apdapi-prod-southeastasia-01.azurewebsites.net/results/past/latest-before/${QUERY_DATE}/9`
);

async function main() {
  const result = await req.then((d) => d.json());
  const { PastResults } = result.PastResultsRange;
  const headers = Object.keys(PastResults[0]);

  const values = PastResults.map((result) => Object.values(result));

  // force quoted_string to wrap numbers as winning numbers can begin with 0 resulting
  // in undesired int-conversion by csv processors
  const csvData = csv.stringify([headers, ...values], { quoted_string: true });
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(
    path.join(OUTPUT_DIR, `${QUERY_DATE}-${OUTPUT_FILENAME}`),
    csvData
  );
}

main();
