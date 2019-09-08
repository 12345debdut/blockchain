const path=require('path');

const fs=require('fs-extra');
const solc=require('solc');
try{
const buildpath=path.resolve(__dirname,'build')
fs.removeSync(buildpath);
const lotterypath=path.join(__dirname,'contract','lottery.sol');
const source=fs.readFileSync(lotterypath,'utf8');
var result=solc.compile(source,1).contracts
fs.ensureDirSync(buildpath);

for (let contract in result)
{
    fs.outputJSONSync(
        path.resolve(buildpath,contract.split(':')[1] +".json"),
        result[contract]
    )
}
}catch(err)
{
    console.log(err.message)
}
