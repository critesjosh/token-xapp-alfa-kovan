import { Contract, ethers } from "ethers";
import { Provider } from "@ethersproject/providers";
import { abi } from "./abi/BridgeRouter.json"

const connectWallet = async function () {
    //@ts-ignore
    if (window.ethereum) {
        try {
          //@ts-ignore
          await window.ethereum.enable()
          //@ts-ignore
          const provider = await new ethers.providers.Web3Provider(window.ethereum)
          let chainId = (await provider.getNetwork()).chainId

          // initalize contract
          let tokenBridgeRouter = setContract(chainId, provider)
          
          setNetworkHtml(chainId)

        } catch (error) {
          console.log(`⚠️ ${error}.`)
        }
      } else {
        console.log("⚠️ Please install Metamask.")
      }
}

/*
based on the current network detected, users should be shown different options

    if the network is alfajores
    - allow users to send CELO to kovan
    - allow users to send cETH to another alfajores account
    - allow users to send cETH back to kovan

    if the network is kovan
    - allow users to send ETH to alfajores
    - allow users to send eCELO to another kovan account
    - allow users to send eCELO back to alfajores
*/

//@ts-ignore
document.querySelector("#login").addEventListener("click", async (e) => {
    connectWallet()
})

function setNetworkHtml(chainId: Number){
    if(chainId == 44787){
        //@ts-ignore
        document.querySelector("#network").textContent = "Alfajores"
    } else if (chainId == 42){
        //@ts-ignore
        document.querySelector("#network").textContent = "Kovan"
    } else {
        console.error("connect to alfajores or kovan.")
    }
}

async function setContract(chainId: Number, provider: Provider): Promise<Contract | null>{
    let contract: Contract | null
    if(chainId == 44787){
        contract = new ethers.Contract("0x9e643F570FAcB7Be198aC287d4926b18528b6E89", abi, provider)
    } else if (chainId == 42){
        contract = new ethers.Contract("0x9e643F570FAcB7Be198aC287d4926b18528b6E89", abi, provider)
    } else {
        contract = null
        console.log("invalid network")
    }
    return contract
}

//@ts-ignore
ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setNetworkHtml(chainId)
    // window.location.reload();
  });