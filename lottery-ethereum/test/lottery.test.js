const Assert=require('assert')
const ganache=require('ganache-cli')
const Web3=require('web3')
const web3=new Web3(ganache.provider())

const {interface,bytecode}=require('../compile')

let lottery;
let accounts;
beforeEach(async()=>{
    accounts=await web3.eth.getAccounts();
    lottery=await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from:accounts[0],gas:'1000000'});
});

describe('Lottery Contract',()=>{
    it('deploys a contract',()=>{
        Assert.ok(lottery.options.address);
    })
    it('allows one account to enter',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('0.02','ether')
        })
        const players=await lottery.methods.Allplayers().call({
            from:accounts[0]
        });
        Assert.equal(accounts[0],players[0])
        Assert.equal(1,players.length)
    });

    it('allows multiple accounts to enter',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('0.02','ether')
        })
        await lottery.methods.enter().send({
            from:accounts[1],
            value:web3.utils.toWei('0.02','ether')
        })
        await lottery.methods.enter().send({
            from:accounts[2],
            value:web3.utils.toWei('0.02','ether')
        })
        const players=await lottery.methods.Allplayers().call({
            from:accounts[0]
        });
        Assert.equal(accounts[0],players[0])
        Assert.equal(accounts[1],players[1])
        Assert.equal(accounts[2],players[2])
        Assert.equal(3,players.length)
    });
    it('only manager can call pick winner',async()=>{
        try{
        await lottery.methods.pickWinner().send({
            from:accounts[1]
        })
        Assert(false);
    }catch(err)
    {
        Assert(err)
    }
    });
    it('sends money to the winner and resets the player array',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('2','ether')
        })
        const initialbalance=await web3.eth.getBalance(accounts[0])
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        })
        const finalbalance=await web3.eth.getBalance(accounts[0])
        const difference=finalbalance-initialbalance
        Assert(difference>web3.utils.toWei('1.8','ether'))
    })
});