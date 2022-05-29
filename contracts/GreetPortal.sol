// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract GreetPortal {
    uint256 totalGreet;
    constructor() {
        console.log("This is a contract which is Smart !!");
    }

    function greet() public {
        totalGreet += 1;
        console.log("%s has greeted :-)", msg.sender);
    }

    function getTotalGreet() public view returns (uint256) {
        console.log("We have %d total greets!! ", totalGreet);
        return totalGreet;
    }
}