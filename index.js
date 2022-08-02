const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const jobberAddress = process.env.JOBBER_ADDRESS;
  const alchemy = process.env.ALCHEMY_API_KEY;
  const provider = new ethers.providers.AlchemyWebSocketProvider(
    "matic",
    alchemy
  );

  let filter = {
    address: jobberAddress,
  };

  provider.on(filter, console.log);
}

main();
