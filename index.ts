import { Contract, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import {abi} from "./abi/BridgeRouter.json"
import * as ERC20 from "./abi/ERC20.json"
// import { BridgeRouter } from "./BridgeRouter";

let tokenBridgeRouterProvider: any
let tokenBridgeRouterSigner: any
let chainId: Number
let account: string

// const alfajoresBridgeAddress: string = "0x0000000000000000000000000000000000000000"
// const kovanBridgeAddress: string     = "0x0000000000000000000000000000000000000000"
const alfajoresCeloAddress: string   = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9"
// const alfajorescETHAddress: string   = "0x0000000000000000000000000000000000000000"
// const kovaneCeloAddress: string      = "0x0000000000000000000000000000000000000000"
// const kovanWETHAddress: string       = "0x0000000000000000000000000000000000000000"

const kovanBridgeRouterAddress: string = "0xb0e9347457CcfC9B36476B58BBD542E6eBA25852"
const alfaBridgeRouterAddress: string = "0x032ADec328A5aeB6b364ebA439a3a2d377D95CFf"

const alfajoresDomain: ethers.BigNumberish = 1000
const kovanDomain: ethers.BigNumberish = 3000

const alfajoresChainId = 44787
const kovanChainId = 42

let provider: any
let alfaCeloContract: any

const recipient: string = "0x5038ae19CDf0B623e6e8015249ecF58A1165D653" // can be whatever

const connectWallet = async function () {
    //@ts-ignore
    if (window.ethereum) {
        try {
          //@ts-ignore
          await window.ethereum.enable()
          //@ts-ignore
          provider = await new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          account = (await provider.listAccounts())[0]
          chainId = (await provider.getNetwork()).chainId

          // initalize contract & set signer
          tokenBridgeRouterProvider = setBridgeContract(chainId, provider)
          tokenBridgeRouterSigner = tokenBridgeRouterProvider.connect(signer)

          alfaCeloContract = <Contract>new ethers.Contract(alfajoresCeloAddress, ERC20.abi, provider) 
          alfaCeloContract = alfaCeloContract.connect(signer)

          setNetworkHtml(chainId)
          updateBalances()
        } catch (error) {
          console.log(`⚠️ ${error}.`)
        }
      } else {
        console.log("⚠️ Please install Metamask.")
      }
}

async function approve(){
    console.log(alfaCeloContract)
    await alfaCeloContract.approve(alfaBridgeRouterAddress, ethers.utils.parseUnits("1.0", 20))
}

async function send(_fx: string, _amountToSend: ethers.BigNumberish){
    let tx

    if(chainId == alfajoresChainId){
        switch (_fx) {
            case "sendXchain":
                console.log(alfajoresCeloAddress, _amountToSend, kovanDomain, ethers.utils.hexZeroPad(recipient, 32))
                await approve()
                tx = await tokenBridgeRouterSigner.send(alfajoresCeloAddress, _amountToSend, kovanDomain, ethers.utils.hexZeroPad(recipient, 32))
            // case "send":
            //     tx = await tokenBridgeRouter.send(alfajorescETHAddress, alfajoresDomain, recipient, _amountToSend)
            // case "sendHome":
            //     tx = await tokenBridgeRouter.send(alfajorescETHAddress, kovanDomain, account, _amountToSend)
            default:
                console.error("unrecognized function")
        }
    } else if (chainId == kovanChainId){
        switch (_fx) {
            // case "sendXchain":
            //     tx = await tokenBridgeRouter.send(kovanWETHAddress, alfajoresDomain, account, _amountToSend)
            // case "send":
            //     tx = await tokenBridgeRouter.send(kovaneCeloAddress, kovanDomain, recipient, _amountToSend)
            // case "sendHome":
            //     tx = await tokenBridgeRouter.send(kovaneCeloAddress, alfajoresDomain, account, _amountToSend)
            default:
                console.error("unrecognized function")    
        }
    } else {
        throw "please select the Kovan or Alfajores network"
    }

    console.log(tx)
}

//@ts-ignore
document.querySelector("#login").addEventListener("click", async (e) => {
    connectWallet()
})

//@ts-ignore
document.querySelector("#sendTx").addEventListener("click", async (e) => {
    //@ts-ignore
    let amountToSend = ethers.utils.parseEther(document.querySelector("#amount").value)
    //@ts-ignore
    let fx = document.querySelector("#action").value

    console.log(fx, amountToSend)
    send(fx, amountToSend)
})

function setNetworkHtml(chainId: Number){
    if(chainId == alfajoresChainId){
        //@ts-ignore
        document.querySelector("#network").textContent = "Alfajores"
    } else if (chainId == kovanChainId){
        //@ts-ignore
        document.querySelector("#network").textContent = "Kovan"
    } else {
        console.error("connect to alfajores or kovan.")
    }
}

async function updateBalances(){
    let infura = new ethers.providers.InfuraProvider('kovan', '54a72648fd34496e91538859b4e37102')
    let ethBalance = await infura.getBalance(account)

    let datahub = new ethers.providers.JsonRpcProvider("https://celo-alfajores--rpc.datahub.figment.io/apikey/e892a66dc36e4d2d98a5d6406d609796/")
    let celoBalance = await datahub.getBalance(account)
    //@ts-ignore
    document.querySelector("#kovanEthBalance").textContent = ethers.utils.formatUnits(ethBalance, "ether")
    //@ts-ignore
    document.querySelector("#alfaCeloBalance").textContent = ethers.utils.formatUnits(celoBalance, "ether")
}

function setBridgeContract(chainId: Number, provider: Provider): Contract{
    let contract: Contract

    if(chainId == alfajoresChainId){
        contract = <Contract>new ethers.Contract(alfaBridgeRouterAddress, abi, provider)
    } else if (chainId == kovanChainId){
        // @ts-ignore
        contract = <Contract>new ethers.Contract(kovanBridgeRouterAddress, abi, provider)
    } else {
        console.log("invalid network")
        throw "invalid network"
    }
    return contract
}

//@ts-ignore
ethereum.on('chainChanged', (_chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setNetworkHtml(_chainId)
    chainId = _chainId
    console.log("new chain id", chainId)
    // window.location.reload();
});