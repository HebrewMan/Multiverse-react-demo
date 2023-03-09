import {  useNavigate, } from 'react-router-dom';
import { useState,useEffect,useRef} from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from '../contracts';
import '../css/header.css';
import "../css/button.css"
import bgMusic from '../assets/mp3/Main-Titles.mp3';
const Header: any = (props: any) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [path, setPath] = useState<any>('')
    const nav = useNavigate()

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        isPlaying?audioRef.current?.pause():audioRef.current?.play();
        console.log(audioRef.current)
    } 

    const changePath = (item: string,tokenId?:number) => {
        //背景音乐切换 3种场景
        if(item != 'arena'){
            setPath(item);
            nav('/'+item);
        }
    }

    useEffect(()=>{
        if(window.location.href.indexOf('arena')!=-1)setPath('arena');
    })


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
            <audio ref={audioRef} src={bgMusic} loop={true}/>
            <p className="nav-item">

                <span onClick={e => changePath('')} className={path === '' ? 'cur' : ''}>🥽</span>
        
                <span onClick={e => changePath('mint')} className={path === 'mint' ? 'cur' : ''}>
                    Mint 💎
                </span>
                <span onClick={e => changePath('arena')} className={path === 'arena' ? 'cur' : ''} >
                    Arena🤺
                </span>
                <span onClick={e => changePath('vault')} className={path === 'vault' ? 'cur' : ''}>
                    Vault 💸
                </span>
            </p>
            <p className="nav-item2">
                <span>👨‍⚖️ {account}</span>
                <span>💰 {Number(balance).toFixed(4)}</span>
                <span onClick={handlePlay}>{isPlaying?'⏸':'⏯'}</span>
            </p>
        </div>
    )
}
export default Header;
