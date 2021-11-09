import { BigNumber, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import UnicornRainbowAbi from "../abis/UnicornRainbow.json";
import { UnicornRainbowAddress } from "../constants/addresses";

export const providerToWeb3Provider = (provider) => {
  return new ethers.providers.Web3Provider(provider);
};

export const getMetamaskProvider = async () => {
  const provider = await detectEthereumProvider();
  if (provider && provider.isMetaMask) {
    return provider;
  }
};

// "connected" and "disconnected" refer to whether the provider can make RPC requests to the current chain.
// export const isMetamaskConnected = (metamaskProvider) => {
//   return metamaskProvider.isConnected();
// };

export const addMetamaskListeners = (
  provider,
  chainChangedCallback,
  messageCallback,
  accountsChangedCallback,
  connectCallback,
  disconnectCallback
) => {
  provider.on("chainChanged", (chainId) => {
    chainChangedCallback(chainId);
  });
  provider.on("message", (message) => {
    messageCallback(message);
  });
  provider.on("accountsChanged", (accounts) => {
    accountsChangedCallback(accounts);
  });
  provider.on("connect", (info) => {
    connectCallback(info);
  });
  provider.on("accountsChanged", (info) => {
    disconnectCallback(info);
  });
};

export const getAccountSigner = (web3Provider) => {
  return web3Provider.getSigner();
};

export const weiToEth = (weiBalance) => {
  return ethers.utils.formatEther(weiBalance);
};

export const ethToWei = (ethBalance) => {
  return ethers.utils.parseEther(ethBalance);
};

export const formatDecimals = (numberString, decimals) => {
  let decimalPos = numberString.indexOf(".");
  if (decimalPos === -1) {
    return numberString;
  } else {
    return numberString.slice(0, decimalPos + 1 + decimals);
  }
};

export const formatUnits = (weiBalance, decimals) => {
  return ethers.utils.formatUnits(weiBalance, decimals);
};

export const isAddress = (address) => {
  return ethers.utils.isAddress(address);
};

// returns the address on success, error on reject
export const connectToMetaMaskPopUp = async (metamaskProvider) => {
  return await metamaskProvider.request({ method: "eth_requestAccounts" });
};

export const getUnicornRainbowContract = async (web3Provider) => {
  const UnicornRainbowContract = new ethers.Contract(
    UnicornRainbowAddress,
    UnicornRainbowAbi,
    web3Provider.getSigner()
  );

  return UnicornRainbowContract;
};

export const getERC20Balance = async (tokenContract, accountAddress) => {
  return await tokenContract.balanceOf(accountAddress);
};

export const getERC20TotalSupply = async (tokenContract) => {
  return await tokenContract.totalSupply();
};

export const burnUnicornToken = async (tokenContract, callback, callbackError) => {
  await tokenContract.burn(ethToWei("0.1")).then(async (tx) => {
    await tx.wait();
    callback();
  }).catch((error) => callbackError(error));
};