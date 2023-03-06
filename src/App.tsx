import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from './contracts';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Mint from './components/Mint';
import Tips from './components/Tips';

function App() {

  const [signer, setSigner] = useState<any>();
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  const [inputData, setInputData] = useState<any>({});

  function conncetWallet() {

    async function connetToNetwork() {
      const { ethereum } = (window as any);
      if (ethereum && account === '') {
    
        let web3Provider: any;
        web3Provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        let _account: any = accounts[0].substr(0, 4) + '...' + accounts[0].substr(-4);
        setAccount(_account)
        const signer: Signer = await web3Provider.getSigner();
        setSigner(signer);

        try {
          let _balance = await web3Provider.getBalance(accounts[0]);
          _balance = _balance / 10 ** 18;
          setBalance(_balance)
        } catch (e) {
          console.error(e);
        }
      }
    }
    connetToNetwork();
  }
  conncetWallet();

  return (
    <React.Fragment>
      <Header account={account} balance={balance} />
      <Outlet></Outlet>
      <Mint/>
      <Tips />
    </React.Fragment>
  );
}

export default App;
