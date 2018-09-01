const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    '<ENTER YOUR METAMASK MNEUMONIC HERE>',
    '<ENTER YOUR RINKEBY PROVIDER URL HERE>'
);

// Getting an instance of web3 from the providers
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy the contract', accounts.length, accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data: '0x' + bytecode, arguments: ['Hi There!']})
                    .send({from: accounts[0], gas: '1000000'});

    console.log('Deployed on ', result.options.address);
};

deploy();
