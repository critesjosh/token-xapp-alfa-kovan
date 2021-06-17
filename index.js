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
var connectWallet = function () {
    return __awaiter(this, void 0, void 0, function () {
        var provider, network, contract, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.ethereum) return [3 /*break*/, 6];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    //@ts-ignore
                    return [4 /*yield*/, window.ethereum.enable()
                        //@ts-ignore
                    ];
                case 2:
                    //@ts-ignore
                    _a.sent();
                    provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                    return [4 /*yield*/, provider.getNetwork()];
                case 3:
                    network = _a.sent();
                    setNetworkHtml(network.chainId);
                    contract = setContract(network.chainId, provider);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("\u26A0\uFE0F " + error_1 + ".");
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    console.log("⚠️ Please install Metamask.");
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
};
/*
based on the current network detected, users should be shown different options

    if the network is alfajores
    - allow users to send CELO to kovan
    - allow users to send cETH to another alfajores account

    if the network is kovan
    - allow users to send ETH to alfajores
    - allow users to send eCELO to another kovan account
*/
document.querySelector("#login").addEventListener("click", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connectWallet();
        return [2 /*return*/];
    });
}); });
function setNetworkHtml(chainId) {
    if (chainId == 44787) {
        document.querySelector("#network").textContent = "Alfajores";
    }
    else if (chainId == 42) {
        document.querySelector("#network").textContent = "Kovan";
    }
    else {
        console.error("connect to alfajores or kovan.");
    }
}
function setContract(chainId, provider) {
    var contract;
    if (chainId == 44787) {
        // contract = new ethers.Contract(insert_alfa_address, abi, provider)
    }
    else if (chainId == 42) {
        // contract = new ethers.Contract(insert_kovan_address, abi, provider)
    }
    else {
        console.log("invalid network");
    }
    return contract;
}
//@ts-ignore
ethereum.on('chainChanged', function (chainId) {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setNetworkHtml(chainId);
    // window.location.reload();
});
