import { Contract, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import { abi } from "./abi/BridgeRouter.json"
import { BridgeRouter } from "./BridgeRouter";

const alfajoresBridgeAddress: string = ""
const kovanBridgeAddress: string = ""
let tokenBridgeRouter: BridgeRouter
let chainId: Number
const alfajoresCeloAddress: string = "0xE51e1032Ff1D6CcC8152d53e9f0661aEdE2D98F8"
const alfajoresDomain: ethers.BigNumberish = 1000
const kovanDomain: ethers.BigNumberish = 3000
const alfajoresChainId = 44787
const kovanChainId = 42

const recipient: string = "0x9e643F570FAcB7Be198aC287d4926b18528b6E89" // can be whatever
const amountToSend: ethers.BigNumberish = ethers.utils.parseEther("0.01")

const connectWallet = async function () {
    //@ts-ignore
    if (window.ethereum) {
        try {
          //@ts-ignore
          await window.ethereum.enable()
          //@ts-ignore
          const provider = await new ethers.providers.Web3Provider(window.ethereum)
          chainId = (await provider.getNetwork()).chainId

          // initalize contract
          tokenBridgeRouter = setContract(chainId, provider)
          
          setNetworkHtml(chainId)

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
    async function sendCeloToKovan(){
        if(chainId != alfajoresChainId) throw "must be on the celo alfajores network"
        tokenBridgeRouter.send(alfajoresCeloAddress, kovanDomain, recipient, amountToSend)
    }
    // - allow users to send cETH to another alfajores account
    // NEED: what is the cETH contract address?
    async function sendcETH(){
    }
    // - allow users to send cETH back to kovan
    // NEED: what is the cETH contract address?
    async function sendcETHToKovan(){
    }

    // if the network is kovan
    // - allow users to send ETH to alfajores
    // - allow users to send eCELO to another kovan account
    // - allow users to send eCELO back to alfajores


//@ts-ignore
document.querySelector("#login").addEventListener("click", async (e) => {
    connectWallet()
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

function setContract(chainId: Number, provider: Provider): BridgeRouter{
    let contract: BridgeRouter

    if(chainId == alfajoresChainId){
        contract = <BridgeRouter>new ethers.Contract(alfajoresBridgeAddress, abi, provider)
    } else if (chainId == kovanChainId){
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