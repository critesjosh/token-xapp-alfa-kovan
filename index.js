"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var BridgeRouter_json_1 = require("./abi/BridgeRouter.json");
var ERC20 = require("./abi/ERC20.json");
// import { BridgeRouter } from "./BridgeRouter";
var tokenBridgeRouterProvider;
var tokenBridgeRouterSigner;
var chainId;
var account;
// const alfajoresBridgeAddress: string = "0x0000000000000000000000000000000000000000"
// const kovanBridgeAddress: string     = "0x0000000000000000000000000000000000000000"
var alfajoresCeloAddress = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
// const alfajorescETHAddress: string   = "0x0000000000000000000000000000000000000000"
// const kovaneCeloAddress: string      = "0x0000000000000000000000000000000000000000"
// const kovanWETHAddress: string       = "0x0000000000000000000000000000000000000000"
var kovanBridgeRouterAddress = "0xb0e9347457CcfC9B36476B58BBD542E6eBA25852";
var alfaBridgeRouterAddress = "0x032ADec328A5aeB6b364ebA439a3a2d377D95CFf";
var alfajoresDomain = 1000;
var kovanDomain = 3000;
var alfajoresChainId = 44787;
var kovanChainId = 42;
var provider;
var alfaCeloContract;
var recipient = "0x5038ae19CDf0B623e6e8015249ecF58A1165D653"; // can be whatever
var connectWallet = function () {
    return __awaiter(this, void 0, void 0, function () {
        var signer, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.ethereum) return [3 /*break*/, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    //@ts-ignore
                    return [4 /*yield*/, window.ethereum.enable()
                        //@ts-ignore
                    ];
                case 2:
                    //@ts-ignore
                    _a.sent();
                    return [4 /*yield*/, new ethers_1.ethers.providers.Web3Provider(window.ethereum)];
                case 3:
                    //@ts-ignore
                    provider = _a.sent();
                    signer = provider.getSigner();
                    return [4 /*yield*/, provider.listAccounts()];
                case 4:
                    account = (_a.sent())[0];
                    return [4 /*yield*/, provider.getNetwork()];
                case 5:
                    chainId = (_a.sent()).chainId;
                    // initalize contract & set signer
                    tokenBridgeRouterProvider = setBridgeContract(chainId, provider);
                    tokenBridgeRouterSigner = tokenBridgeRouterProvider.connect(signer);
                    alfaCeloContract = new ethers_1.ethers.Contract(alfajoresCeloAddress, ERC20.abi, provider);
                    alfaCeloContract = alfaCeloContract.connect(signer);
                    setNetworkHtml(chainId);
                    updateBalances();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log("\u26A0\uFE0F " + error_1 + ".");
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.log("⚠️ Please install Metamask.");
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
};
function approve() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(alfaCeloContract);
                    return [4 /*yield*/, alfaCeloContract.approve(alfaBridgeRouterAddress, ethers_1.ethers.utils.parseUnits("1.0", 20))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// based on the current network detected, users should be shown different options
// if the network is alfajores
// - allow users to send CELO to kovan
function sendCeloToKovan(_amountToSend) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
// - allow users to send cETH to another alfajores account
// NEED: what is the cETH contract address?
function sendcETH() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
// - allow users to send cETH back to kovan
// NEED: what is the cETH contract address?
function sendcETHToKovan() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
// if the network is kovan
// - allow users to send ETH to alfajores
// - allow users to send eCELO to another kovan account
// - allow users to send eCELO back to alfajores
function send(_fx, _amountToSend) {
    return __awaiter(this, void 0, void 0, function () {
        var tx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(chainId == alfajoresChainId)) return [3 /*break*/, 6];
                    _a = _fx;
                    switch (_a) {
                        case "sendXchain": return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 4];
                case 1:
                    console.log(alfajoresCeloAddress, _amountToSend, kovanDomain, ethers_1.ethers.utils.hexZeroPad(recipient, 32));
                    return [4 /*yield*/, approve()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, tokenBridgeRouterSigner.send(alfajoresCeloAddress, _amountToSend, kovanDomain, ethers_1.ethers.utils.hexZeroPad(recipient, 32))
                        // case "send":
                        //     tx = await tokenBridgeRouter.send(alfajorescETHAddress, alfajoresDomain, recipient, _amountToSend)
                        // case "sendHome":
                        //     tx = await tokenBridgeRouter.send(alfajorescETHAddress, kovanDomain, account, _amountToSend)
                    ];
                case 3:
                    tx = _b.sent();
                    _b.label = 4;
                case 4:
                    console.error("unrecognized function");
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    if (chainId == kovanChainId) {
                        switch (_fx) {
                            // case "sendXchain":
                            //     tx = await tokenBridgeRouter.send(kovanWETHAddress, alfajoresDomain, account, _amountToSend)
                            // case "send":
                            //     tx = await tokenBridgeRouter.send(kovaneCeloAddress, kovanDomain, recipient, _amountToSend)
                            // case "sendHome":
                            //     tx = await tokenBridgeRouter.send(kovaneCeloAddress, alfajoresDomain, account, _amountToSend)
                            default:
                                console.error("unrecognized function");
                        }
                    }
                    else {
                        throw "please select the Kovan or Alfajores network";
                    }
                    _b.label = 7;
                case 7:
                    console.log(tx);
                    return [2 /*return*/];
            }
        });
    });
}
//@ts-ignore
document.querySelector("#login").addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connectWallet();
        return [2 /*return*/];
    });
}); });
//@ts-ignore
document.querySelector("#sendTx").addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var amountToSend, fx;
    return __generator(this, function (_a) {
        amountToSend = ethers_1.ethers.utils.parseEther(document.querySelector("#amount").value);
        fx = document.querySelector("#action").value;
        console.log(fx, amountToSend);
        send(fx, amountToSend);
        return [2 /*return*/];
    });
}); });
function setNetworkHtml(chainId) {
    if (chainId == alfajoresChainId) {
        //@ts-ignore
        document.querySelector("#network").textContent = "Alfajores";
    }
    else if (chainId == kovanChainId) {
        //@ts-ignore
        document.querySelector("#network").textContent = "Kovan";
    }
    else {
        console.error("connect to alfajores or kovan.");
    }
}
function updateBalances() {
    return __awaiter(this, void 0, void 0, function () {
        var infura, ethBalance, datahub, celoBalance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    infura = new ethers_1.ethers.providers.InfuraProvider('kovan', '54a72648fd34496e91538859b4e37102');
                    return [4 /*yield*/, infura.getBalance(account)];
                case 1:
                    ethBalance = _a.sent();
                    datahub = new ethers_1.ethers.providers.JsonRpcProvider("https://celo-alfajores--rpc.datahub.figment.io/apikey/e892a66dc36e4d2d98a5d6406d609796/");
                    return [4 /*yield*/, datahub.getBalance(account)
                        //@ts-ignore
                    ];
                case 2:
                    celoBalance = _a.sent();
                    //@ts-ignore
                    document.querySelector("#kovanEthBalance").textContent = ethers_1.ethers.utils.formatUnits(ethBalance, "ether");
                    //@ts-ignore
                    document.querySelector("#alfaCeloBalance").textContent = ethers_1.ethers.utils.formatUnits(celoBalance, "ether");
                    return [2 /*return*/];
            }
        });
    });
}
function setBridgeContract(chainId, provider) {
    var contract;
    if (chainId == alfajoresChainId) {
        contract = new ethers_1.ethers.Contract(alfaBridgeRouterAddress, BridgeRouter_json_1.abi, provider);
    }
    else if (chainId == kovanChainId) {
        // @ts-ignore
        contract = new ethers_1.ethers.Contract(kovanBridgeRouterAddress, BridgeRouter_json_1.abi, provider);
    }
    else {
        console.log("invalid network");
        throw "invalid network";
    }
    return contract;
}
//@ts-ignore
ethereum.on('chainChanged', function (_chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setNetworkHtml(_chainId);
    chainId = _chainId;
    console.log("new chain id", chainId);
    // window.location.reload();
});
