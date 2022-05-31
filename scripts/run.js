const main = async () => {
  // const [owner, randomPerson] = await hre.ethers.getSigners();
  const greetContractFactory = await hre.ethers.getContractFactory("GreetPortal");
  const greetContract = await greetContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await greetContract.deployed();
  console.log("Contract deployed to:", greetContract.address);

  //Get the contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    greetContract.address
  );
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

  const greetTxn = await greetContract.greet("Greet #1!");
  await greetTxn.wait();

  const greetTxn2 = await greetContract.greet("Greet #2!!");
  await greetTxn2.wait();

  // //Send greets
  // let greetTxn = await greetContract.greet("A message!");
  // await greetTxn.wait();

  // Get contract balance to see what happened
  
  contractBalance = await hre.ethers.provider.getBalance(greetContract.address);
  console.log(
    "Contract Balance: ",
    hre, ethers.utils.formatEther(contractBalance)
  );

  let allGreets = await greetContract.getAllGreets();
  console.log(allGreets);
};

/*    
// console.log("Contract deployed by:", owner.address);
let greetCount;
greetCount = await greetContract.getTotalGreet();   //Total count of how many greets recived
console.log(greetCount.toNumber());


let greetTxn = await greetContract.greet("Test Message!!");   //Greeting ourself(Owner greets itself)
await greetTxn.wait();    //Wait for transction to be mined

// greetCount = await greetContract.getTotalGreet();

const [_, randomPerson] = await hre.ethers.getSigners();
greetTxn = await greetContract.connect(randomPerson).greet("Another Message by randome!!");
await greetTxn.wait();

// greetTxn = await greetContract.connect(randomPerson).greet();   //Greeting done by a random person 
// await greetTxn.wait();


greetCount = await greetContract.getTotalGreet();
};
*/
const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }

};

runMain();