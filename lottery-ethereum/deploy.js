const HdWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3')
const Lottery =require('./build/Lottery.json');
const provider=new HdWalletProvider(
    'diagram vacuum odor auto can aisle vintage whip rude smooth tuna gentle',
    'https://rinkeby.infura.io/v3/0dc5d7bb17a347b2aa65c7c8153e6ac6'
);

const web3=new Web3(provider);

exports.Lotterydeploy=async(image,name)=>{
    let accounts=await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0])
    let date=new Date().getTime()
    const result = await new web3.eth.Contract(JSON.parse(Lottery.interface))
     .deploy({data: '0x' + Lottery.bytecode,arguments:[imgae,name,date]}) // add 0x bytecode
     .send({from: accounts[0]});
    return result.options.address;
};
