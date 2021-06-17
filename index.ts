import { ethers } from "ethers";
import { abi } from "./abi/BridgeRouter.json"

const connectWallet = async function () {
    //@ts-ignore
    if (window.ethereum) {
        try {
          //@ts-ignore
          await window.ethereum.enable()
          //@ts-ignore
          const provider = new ethers.providers.Web3Provider(window.ethereum)

          let network = await provider.getNetwork()
          setNetworkHtml(network.chainId)

          // initalize contract
          let contract = setContract(network.chainId, provider)

        } catch (error) {
          console.log(`⚠️ ${error}.`)
        }
      } else {
        console.log("⚠️ Please install the CeloExtensionWallet.")
      }
}

/*
based on the current network detected, users should be shown different options

    if the network is alfajores
    - allow users to send CELO to kovan
    - allow users to send cETH to another alfajores account

    if the network is kovan
    - allow users to send ETH to alfajores
    - allow users to send eCELO to another kovan account
*/

document.querySelector("#login").addEventListener("click", async (e) => {
    connectWallet()
})

function setNetworkHtml(chainId:Number){
    if(chainId == 44787){
        document.querySelector("#network").textContent = "Alfajores"
    } else if (chainId == 42){
        document.querySelector("#network").textContent = "Kovan"
    } else {
        console.error("connect to alfajores or kovan.")
    }
}

function setContract(chainId:Number, provider){
    let contract
    if(chainId == 44787){
        // contract = new ethers.Contract(insert_alfa_address, abi, provider)
    } else if (chainId == 42){
        // contract = new ethers.Contract(insert_kovan_address, abi, provider)
    } else {
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