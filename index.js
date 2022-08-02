const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const jobberAddress = process.env.JOBBER_ADDRESS;
  const alchemyWS = process.env.ALCHEMY_WS;
  console.log(jobberAddress, alchemyWS);

  const provider = new ethers.providers.WebSocketProvider(alchemyWS);

  const abi = [
    "event LogJobQueued(address indexed sender, uint256 indexed jobId, Status jobStatus)",
    "function setJob(Status _status) external",
  ];

  const contract = new ethers.Contract(jobberAddress, abi, provider);

  contract.on("LogJobQueued", function (data) {
    console.log("result without filter:", JSON.stringify(data));
  });

  const filters = {
    address: jobberAddress,
  };

  contract.on(filters, function () {
    console.log("result with filter:", JSON.stringify(arguments));
  });
}

main();
