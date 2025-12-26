const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getPrices(symbols) {
  if (symbols.length === 0) return {};

  const ids = symbols.join(",");

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`
  );

  return res.json();
}

module.exports = { getPrices };
