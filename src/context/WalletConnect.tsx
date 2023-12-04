import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { EthereumClient } from "@web3modal/ethereum";
import { chains, config, projectId, web3modalClient } from "./wagmiConfig";


export const ethereumClient = new EthereumClient(web3modalClient, chains);

export default function WalletContextProvider({ children }: any) {
  return (
    <>
      <WagmiConfig config={config}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
