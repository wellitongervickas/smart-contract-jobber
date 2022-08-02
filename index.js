const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const jobberAddress = process.env.JOBBER_ADDRESS;
  const alchemy = process.env.ALCHEMY;
  const provider = new ethers.providers.AlchemyWebSocketProvider(
    "matic",
    alchemy
  );

  let filter = {
    address: jobberAddress,
  };

  provider.on(filter, (result) => {
    console.log(1, result);
  });
}

main();
