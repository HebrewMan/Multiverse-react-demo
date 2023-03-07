import { Link, BrowserRouter, useNavigate, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from '../contracts';
import '../css/header.css';
import "../css/button.css"
const Header: any = (props: any) => {

    const [path, setPath] = useState<any>('mint')
    const nav = useNavigate()
    const changePath = (item: string) => {
        setPath(item)
        nav('/'+item)
    }

    const [signer, setSigner] = useState<any>();
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');


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
        <div className='account' style={{ marginTop: 20 + 'px' }}>
            <p className="nav-item">
        
                <span onClick={e => changePath('mint')} className={path === 'mint' ? 'cur' : ''}>
                    Mint
                </span>
                <span onClick={e => changePath('arena')} className={path === 'arena' ? 'cur' : ''} >
                    Arena
                </span>
                <span onClick={e => changePath('vault')} className={path === 'vault' ? 'cur' : ''}>
                    Vault
                </span>
            </p>
            <p className="nav-item2">
                <span>👨‍⚖️ {account}</span>
                <span>💰 {Number(balance).toFixed(4)}</span>
            </p>
        </div>
    )
}
export default Header;
