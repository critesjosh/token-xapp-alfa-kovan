import { Contract, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import {abi} from "./abi/BridgeRouter.json"
import * as ERC20 from "./abi/ERC20.json"
import { BridgeRouter } from "./BridgeRouter";

let tokenBridgeRouter: BridgeRouter
let chainId: Number
let account: string

const alfajoresBridgeAddress: string = "0x0000000000000000000000000000000000000000"
const kovanBridgeAddress: string     = "0x0000000000000000000000000000000000000000"
const alfajoresCeloAddress: string   = "0xE51e1032Ff1D6CcC8152d53e9f0661aEdE2D98F8"
const alfajorescETHAddress: string   = "0x0000000000000000000000000000000000000000"
const kovaneCeloAddress: string      = "0x0000000000000000000000000000000000000000"
const kovanWETHAddress: string       = "0x0000000000000000000000000000000000000000"

const alfajoresDomain: ethers.BigNumberish = 1000
const kovanDomain: ethers.BigNumberish = 3000

const alfajoresChainId = 44787
const kovanChainId = 42

const recipient: string = "0x5038ae19CDf0B623e6e8015249ecF58A1165D653" // can be whatever

const connectWallet = async function () {
    //@ts-ignore
    if (window.ethereum) {
        try {
          //@ts-ignore
          await window.ethereum.enable()
          //@ts-ignore
          const provider = await new ethers.providers.Web3Provider(window.ethereum)
          account = (await provider.listAccounts())[0]

          chainId = (await provider.getNetwork()).chainId

          // initalize contract
          tokenBridgeRouter = setContract(chainId, provider)
          
          setNetworkHtml(chainId)
            getBalances()
        } catch (error) {
          console.log(`⚠️ ${error}.`)
        }
      } else {
        console.log("⚠️ Please install Metamask.")
      }
}


// based on the current network detected, users should be shown different options

    // if the network is alfajores
    // - allow users to send CELO to kovan
    async function sendCeloToKovan(_amountToSend: ethers.BigNumberish){}
    // - allow users to send cETH to another alfajores account
    // NEED: what is the cETH contract address?
    async function sendcETH(){}
    // - allow users to send cETH back to kovan
    // NEED: what is the cETH contract address?
    async function sendcETHToKovan(){}

    // if the network is kovan
    // - allow users to send ETH to alfajores
    // - allow users to send eCELO to another kovan account
    // - allow users to send eCELO back to alfajores
async function send(_fx: string, _amountToSend: ethers.BigNumberish){
    let tx

    if(chainId == alfajoresChainId){
        switch (_fx) {
            case "sendXchain":
                tx = await tokenBridgeRouter.send(alfajoresCeloAddress, kovanDomain, account, _amountToSend)
            case "send":
                tx = await tokenBridgeRouter.send(alfajorescETHAddress, alfajoresDomain, recipient, _amountToSend)
            case "sendHome":
                tx = await tokenBridgeRouter.send(alfajorescETHAddress, kovanDomain, account, _amountToSend)
        }
    } else if (chainId == kovanChainId){
        switch (_fx) {
            case "sendXchain":
                tx = await tokenBridgeRouter.send(kovanWETHAddress, alfajoresDomain, account, _amountToSend)
            case "send":
                tx = await tokenBridgeRouter.send(kovaneCeloAddress, kovanDomain, recipient, _amountToSend)
            case "sendHome":
                tx = await tokenBridgeRouter.send(kovaneCeloAddress, alfajoresDomain, account, _amountToSend)
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
    // send(fx, amountToSend)
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

async function getBalances(){
    let infura = new ethers.providers.InfuraProvider('kovan', '54a72648fd34496e91538859b4e37102')
    let ethBalance = await infura.getBalance(account)

    let datahub = new ethers.providers.JsonRpcProvider("https://celo-alfajores--rpc.datahub.figment.io/apikey/e892a66dc36e4d2d98a5d6406d609796/")
    let celoBalance = await datahub.getBalance(account)
    //@ts-ignore
    document.querySelector("#kovanEthBalance").textContent = ethers.utils.formatUnits(ethBalance, "ether")
    //@ts-ignore
    document.querySelector("#alfaCeloBalance").textContent = ethers.utils.formatUnits(celoBalance, "ether")
}

function setContract(chainId: Number, provider: Provider): BridgeRouter{
    let contract: BridgeRouter

    if(chainId == alfajoresChainId){
        contract = <BridgeRouter>new ethers.Contract(alfajoresBridgeAddress, abi, provider)
    } else if (chainId == kovanChainId){
        // @ts-ignore
        contract = <BridgeRouter>new ethers.Contract(kovanBridgeAddress, abi, provider)
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