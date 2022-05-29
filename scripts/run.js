const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const greetContractFactory = await hre.ethers.getContractFactory("GreetPortal");
    const greetContract = await greetContractFactory.deploy();
    await greetContract.deployed();

    console.log("Contract deployed to:", greetContract.address);
    console.log("Contract deployed by:", owner.address);

    let greetCount;
    greetCount = await greetContract.getTotalGreet();   //Total count of how many greets recived

    let greetTxn = await greetContract.greet();   //Greeting ourself(Owner greets itself)
    await greetTxn.wait();

    greetCount = await greetContract.getTotalGreet();

    greetTxn = await greetContract.connect(randomPerson).greet();   //Greeting done by a random person 
    await greetTxn.wait();

    greetCount = await greetContract.getTotalGreet();
  };
  
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