let ethers = require("ethers")

const connectWallet = async function () {
    // connect to metamask
    // detect current network (alfajores or kovan)

    // update #network span in html
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
