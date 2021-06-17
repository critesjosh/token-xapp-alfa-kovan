import { ethers } from "ethers";

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

function setNetworkHtml(chainId:any){
    if(chainId == 44787){
        document.querySelector("#network").textContent = "Alfajores"
    } else if (chainId == 42){
        document.querySelector("#network").textContent = "Kovan"
    } else {
        console.error("connect to alfajores or kovan.")
    }
}

//@ts-ignore
ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setNetworkHtml(chainId)
    // window.location.reload();
  });