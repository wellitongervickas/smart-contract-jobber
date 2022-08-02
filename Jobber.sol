// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Jobber is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _jobIds;

    enum Status {
        Pending,
        Accepted,
        Rejected,
        Canceled
    }

    struct Job {
        Status status;
        uint256 jobId;
    }

    mapping(address => Job) public _jobQueue;

    event LogJobQueued(
        address indexed sender,
        uint256 indexed jobId,
        Status jobStatus
    );

    function setJob(Status _status) external {
        _jobQueue[msg.sender].status = _status;
        _jobQueue[msg.sender].jobId = _jobIds.current();

        _jobIds.increment();

        emit LogJobQueued(msg.sender, _jobQueue[msg.sender].jobId, _status);
    } 
}
