// const fetch = require("fetch");

const req = fetch(
  "https://app-apdapi-prod-southeastasia-01.azurewebsites.net/results/past/latest-before/31-12-204/9"
);

async function main() {
  const result = await req.then((d) => d.json());
  const { PastResults } = result.PastResultsRange;
  console.log({ result, PastResults });
}

main();
