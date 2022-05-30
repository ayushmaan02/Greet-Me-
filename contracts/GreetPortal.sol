// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GreetPortal {
    uint256 totalGreet;

    event NewGreet(address indexed from, uint256 timestamp, string message);

    struct Greet{
        address greeter;
        string message;
        uint256 timestamp;
    }

    Greet[] greets;

    constructor() {
        console.log("This is a contract which is Smart !!");
    }

    function greet(string memory _message) public {
        totalGreet += 1;
        console.log("%s greeted w/ message %s ", msg.sender, _message);

        greets.push(Greet(msg.sender, _message, block.timestamp));

        emit NewGreet(msg.sender, block.timestamp, _message);
    }

    function getAllGreets() public view returns (Greet[] memory) {
        return greets;
    }

    function getTotalGreet() public view returns (uint256) {
        console.log("We have %d total greets!! ", totalGreet);
        return totalGreet;
    }
}