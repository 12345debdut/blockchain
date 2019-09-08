pragma solidity >=0.4.17 <0.6.0;
contract Lottery{
    address private manager;
    address[] private players;
    uint private balance;
    string private Lotteryname;
    string private Lotteryimage;
    uint256 private LotteryDate;
    struct userInfo{
        string name;
        string image;
        string email;
        string phonenumber;
    }
    mapping(address => userInfo) private userMapping;
    address[] private userAddress;
    address private winnerAdress;
    bool private done=false;
    function getWinner() public view returns(address)
    {
        require((done==false),'The lottery is not done yet');
        return winnerAdress;
    }
    function setUser(string memory name,string memory image,string memory email,string memory phonenumber,address addressUser) public{
        userAddress.push(addressUser);
         userInfo memory user = userInfo({
            name:name,
            image:image,
            email:email,
            phonenumber:phonenumber
        });
    userMapping[msg.sender] = user;
    }
    function getUserName(address addressUser) public view returns (string memory,string memory,string memory) {
        uint flag = 0;
        for(uint i = 0 ; i < userAddress.length ; i++)
        {
            if(userAddress[i]==addressUser)
            {
                flag = 1;
            }
        }
        require((flag==0),"User doesn't exists");
        return (userMapping[addressUser].name,userMapping[addressUser].image,userMapping[addressUser].email);
    }
    constructor(string image,string lotteryname,uint256 date) public{
        manager = msg.sender;
        Lotteryname = lotteryname;
        Lotteryimage = image;
        LotteryDate = date;
    }
    function  getManager() public view returns (address){
        return manager;
    }
    function enter() public payable paymentRestriction{
        uint flag = 0;
        for(uint i = 0 ; i < userAddress.length ; i++)
        {
            if(userAddress[i]==msg.sender)
            {
                flag = 1;
            }
        }
        require((flag==0),"User doesn't exists");
        players.push(msg.sender);
    }
    function randomNumber() private view returns (uint){
        bytes memory a = abi.encodePacked(block.difficulty, now , players);
        return uint(keccak256(a));
    }
    function pickWinner() public managerRestiction{
        uint index = randomNumber() % players.length;
        address winner = address(uint160(players[index]));
        winner.transfer(address(this).balance);
        done=true;
        winnerAdress = winner;
    }
    function getLotteryInfo() public view returns(string,string,uint){
        return (Lotteryname,Lotteryimage,LotteryDate);
    }
    modifier managerRestiction(){
        require((msg.sender==manager),"You have not privilage to pick a winner");
        _;
    }
    modifier paymentRestriction()
    {
        require ((msg.value > 0.01 ether), "Please give minimum ether to procceed" );
        _;
    }
    function Allplayers() public view returns (address[] memory){
        return players;
    }
}

contract AllLottery{
    address[] private LotteryAddress;
    function newLottery(address lotteryaddress) public{
        LotteryAddress.push(lotteryaddress);
    }
    function getLotteries() public view returns(address[] memory){
        return LotteryAddress;
    }
}


contract contact{
    mapping(address => string) private contactMapping;
    address[] messageAddress;
    function setMessage(address userAddress,string memory message) public{
        messageAddress.push(userAddress);
        contactMapping[userAddress] = message;
    }
    function getMessages(address userAddress) public view returns(string memory){
        return contactMapping[userAddress];
    }
}