
import { useWeb3Modal } from '@web3modal/react'
import { ethereumClient } from './context/WalletConnect';
import { useDisconnect, useContractWrite, useContractRead } from "wagmi";
import { useEffect, useState } from 'react';
import ABI from './ABI.json';

const App: React.FC = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = ethereumClient.getAccount();
  const { disconnect } = useDisconnect();

  const [balance, setBalance] = useState<string>("0");
  const [balanceInput, setBalanceInput] = useState<string>("0");

  const CONTRACT_ADDRESS = '0xA9f1572E1dA2F2108FF512f801be819D5a4c6Fd2'

  const { data: ReadData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getBalance',
    chainId: 11155111,
  });

  const { write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'updateBalance',
    chainId: 11155111,
  })

  console.log(ReadData, balance);

  useEffect(() => {
    setBalance("0");
  }, [])

  const updateBalance = async () => {
    await write({
      args: [balanceInput],
    });
  }

  return (
    <>

      {!isConnected && <button onClick={open}>Connect</button>}
      {isConnected && <button onClick={() => disconnect()}>Disconnect</button >}
      <p>Address: {address}</p>

      <input type="number" value={balanceInput} placeholder='Enter Balance To be Updated' onChange={(e) => setBalanceInput(e.target.value)} />

      <p>Balance: {balance}</p>

      <button onClick={updateBalance}>Update Balance</button>
    </>
  )
}

export default App
