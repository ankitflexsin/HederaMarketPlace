

import { HashConnect } from 'hashconnect';
import axios from 'axios';
import {
	AccountId,
	PrivateKey,
	Client,
	FileCreateTransaction,
	ContractCreateTransaction,
	ContractFunctionParameters,
	ContractExecuteTransaction,
	ContractCallQuery,
    TransactionReceiptQuery,
	Hbar,
	ContractCreateFlow,
    ContractId,
} from '@hashgraph/sdk';

const  hashconnect = new HashConnect();
const accountId = "";


const marketplacecontract = ContractId.fromString('0.0.2257507') //Use Latest marketplace contract Id
const nftcontract = ContractId.fromString('0.0.2257747') //Use latest nft contract id


let appMetadata = {
    name: "dApp Example",
    description: "An example hedera dApp",
    icon: "https://absolute.url/to/icon.png"
}

function Uint8ArrToNumber(Uint8Arr) {
    const length = Uint8Arr.length;
  
    let buffer = Buffer.from(Uint8Arr);
    const result = buffer.readUIntBE(0, length);
  
    return result;
  }

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetadata, "testnet", false);

    hashconnect.foundExtensionEvent.on((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })

    hashconnect.pairingEvent.on((pairingData) => {
        console.log('wallet paired')
        console.log(pairingData)

        const accountId = document.getElementById('accountid')
        accountId.innerHTML = pairingData.accountIds[0]
    })

    return initData
}


export const nftSmartContract = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
        const hexaddr = signer.getAccountId();
        const creatorAddress = hexaddr.toSolidityAddress();

        let sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setFunction("createNftContract", new ContractFunctionParameters().addString("Test protocol").addString("").addBool(true)) //param
        .freezeWithSigner(signer)
        sendHbarTx = await sendHbarTx.signWithSigner(signer);
        const tx =await sendHbarTx.executeWithSigner(signer)
        const rex = await provider.getTransactionReceipt(tx.transactionId);
        let tid =tx.transactionId
        const stid=tid.split("@")
        tid=stid[0]+"-"+stid[1].replace(".","-")
        console.log(tx, "txxxxxxxxxxxxxx");
        const client = Client.forTestnet()
        setTimeout(() => {
            alert('Tx Successfull!');
        if (rex){
            
            axios.get(`https://testnet.mirrornode.hedera.com/api/v1/contracts/results/${tid}`).then((response)=> {
                // handle success
                console.log(response.data,"data xxxxx");
                console.log(response.data.created_contract_ids[0])
                const smartContract=response.data.created_contract_ids[0]
                console.log(smartContract.toString(),creatorAddress);
              })            
        }
    }, 10000);
        
      
}


export const mint = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
    console.log(hashconnectData)
    const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
    const signer = hashconnect.getSigner(provider)
    const hexaddr = signer.getAccountId();
    const contractAddress = hexaddr.toSolidityAddress();
    // console.log(hexaddr, contractAddress, "ccccccc");

    const sendHbarTx = await new ContractExecuteTransaction()
    .setContractId(nftcontract)
    .setGas(100000)
    .setFunction('Mint', new ContractFunctionParameters().addAddress(contractAddress).addUint256(1).addString("popopo"))
    .freezeWithSigner(signer)

    const tx =await sendHbarTx.executeWithSigner(signer)
    console.log(tx, "txxxxxxxxxxxxxx");
}

export const approval = async() =>{
   
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
        const evmaddr = marketplacecontract.toSolidityAddress();
        console.log(evmaddr, "evmaddr");

        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(nftcontract)
        .setGas(10000000)
        .setFunction("approve", new ContractFunctionParameters().addAddress(evmaddr).addUint256(1))
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");  
}

//Create Market item

export const createMarketItem = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
        const evmaddr = nftcontract.toSolidityAddress().toString();

        console.log(evmaddr, "nftevm");
    
        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setPayableAmount(2)
        .setFunction("createMarketItem", new ContractFunctionParameters().addAddress(evmaddr).addUint256(1).addUint256("200000000").addUint256("2")) //param
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}

export const createMarketSale = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");

        const createHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setPayableAmount(1)
        .setFunction("createMarketSale", new ContractFunctionParameters().addUint256(1))
        .freezeWithSigner(signer);

        const tx = await createHbarTx.executeWithSigner(signer)
        console.log(tx, "Txxxx");
}

export const updateListinPrice = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");

        const createHbarTx = await new ContractExecuteTransaction()
        .setContractId(marketplacecontract)
        .setGas(10000000)
        .setFunction("updateListingPrice", new ContractFunctionParameters().addUint256("100000000"))
        .freezeWithSigner(signer);

        const tx = await createHbarTx.executeWithSigner(signer)
        console.log(tx, "Txxxx");
}


export const approvalForAll = async() =>{
    const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
        console.log(hashconnectData)
        const provider = hashconnect.getProvider('testnet', hashconnectData.topic , hashconnectData.pairingData[0].accountIds[0])
        console.log(provider, "provider log");
        const signer = hashconnect.getSigner(provider)
        console.log(signer,"signer ssssssssssssss");
        // const nftaddr = ("0.0.3770161");
        const contractAddress = marketplacecontract.toSolidityAddress();


        const sendHbarTx = await new ContractExecuteTransaction()
        .setContractId(nftcontract)
        .setGas(10000000)
        .setFunction("setApprovalForAll", new ContractFunctionParameters().addAddress(contractAddress).addBool(true)) //param
        .freezeWithSigner(signer);

        const tx =await sendHbarTx.executeWithSigner(signer)
        console.log(tx, "txxxxxxxxxxxxxx");
}

