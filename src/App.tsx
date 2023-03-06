import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from './contracts';

import Header from './components/Header';
import Enemy from './components/Master';
import Mint from './components/Mint';
import Tips from './components/Tips';

function App() {

  const [signer, setSigner] = useState<any>();
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  const [inputData, setInputData] = useState<any>({});

  const [nav, setNav] = useState<any>('monster');

  function conncetWallet() {

    async function connetToNetwork() {
      const { ethereum } = (window as any);
      if (ethereum && account === '') {
    
        let web3Provider: any;
        web3Provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        let _account: any = accounts[0].substr(0, 2) + '...' + accounts[0].substr(-4);
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

  async function Confirm() {
    if (account !== '0xa89c...7926') {
      return alert('当前账户不是owner')
    }

    try {
      let tx:any;
      if(nav === 'monster'){
 
      }else{
        let {id,odds,reward} = inputData;
        tx = await _Game(signer).editTask(id, odds,reward);
      }

      await tx.wait(1);
      alert('This transaction was successful~')
    } catch (e) {
      console.log(e);
      alert('This transaction failed~')
    }
  }


  const _setInputData = (key: any, value: any) => {
    inputData[key] = value;
    setInputData(inputData);
  };

  return (
    <React.Fragment>
      <Header account={account} balance={balance} />
    
      <Mint/>
      <Tips />

    </React.Fragment>
  );
}

export default App;
