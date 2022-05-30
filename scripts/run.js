const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const greetContractFactory = await hre.ethers.getContractFactory("GreetPortal");
    const greetContract = await greetContractFactory.deploy();
    await greetContract.deployed();
    console.log("Contract deployed to:", greetContract.address);
    
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

    let allGreets = await greetContract.getAllGreets();
    console.log(allGreets);

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