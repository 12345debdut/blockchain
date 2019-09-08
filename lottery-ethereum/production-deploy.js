const HdWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3')
const compile=require('./compile')
const AllLottery=require('./build/AllLottery.json');
const provider=new HdWalletProvider(
    'diagram vacuum odor auto can aisle vintage whip rude smooth tuna gentle',
    'https://rinkeby.infura.io/v3/0dc5d7bb17a347b2aa65c7c8153e6ac6'
);

const web3=new Web3(provider);


const AllLotterydeploy=async()=>{
    let accounts=await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(AllLottery.interface))
     .deploy({data: '0x' + AllLottery.bytecode}) // add 0x bytecode
     .send({from: accounts[0]});
    console.log("Deployed All Lottery to "+result.options.address);
    console.log("Abi is-->",AllLottery.interface);
};
AllLotterydeploy();