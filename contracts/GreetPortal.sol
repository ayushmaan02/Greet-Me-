// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GreetPortal {
    uint256 totalGreet;

    uint256 private seed;

    event NewGreet(address indexed from, uint256 timestamp, string message);

    struct Greet{
        address greeter;
        string message;
        uint256 timestamp;
    }

    Greet[] greets;

    mapping(address => uint256) public lastGreetAt;

    constructor() payable {
        console.log("This is a contract which is Smart !!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function greet(string memory _message) public {

        //Cooldown added of 15 min to stop spamming 
        require(lastGreetAt[msg.sender] + 30 seconds < block.timestamp, "Cooldown Process Wait for 30sec");
        lastGreetAt[msg.sender] = block.timestamp;

        totalGreet += 1;
        console.log("%s greeted w/ message %s ", msg.sender, _message);

        greets.push(Greet(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        // console.log("Random # generated: %d", seed);

        if(seed <= 50){
            console.log("%s won!!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
                require(
                    prizeAmount <= address(this).balance,
                    "Trying to withdraw more money than the contract has."
                );

                (bool success, ) = (msg.sender).call{value: prizeAmount}("");
                require(success, "Failed to withdraw money from contract.");
        }

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