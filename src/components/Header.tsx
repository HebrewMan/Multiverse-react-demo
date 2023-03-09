import {  useNavigate, useLocation} from 'react-router-dom';
import { useState,useEffect,useRef,useContext} from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game } from '../contracts';
import '../css/header.css';
import "../css/button.css"
import bgMusic from '../assets/mp3/index.mp3';
import arenaMp3 from '../assets/mp3/arena.mp3';
import vaultMp3 from '../assets/mp3/vault.mp3';
import mintMp3 from '../assets/mp3/mint.mp3';


// import ContextStore from '../components/store/index';
const Header: any = (props: any) => {

    // const ctx = useContext(ContextStore);
    const location = useLocation();

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);


    const [mp3, setMp3] = useState('index');

    const [path, setPath] = useState<any>('')
    const nav = useNavigate()

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        isPlaying?audioRef.current?.pause():audioRef.current?.play();
        // console.log(ctx)
    } 

    const changePath = (item: string,tokenId?:number) => {
        setMp3(item);
        //背景音乐切换 3种场景
        if(item != 'arena'){
            setPath(item);
            nav('/'+item);
            setIsPlaying(true);
            setTimeout(()=>audioRef.current?.play(),200)
        }
    }

    useEffect(()=>{
        const str = location.pathname.match(/[a-zA-Z]+/g);
        setPath(str[0])
        setMp3(str[0])
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
                localStorage.account = accounts[0];
                setAccount(_account)
                const signer: Signer = await web3Provider.getSigner();
                // setSigner(signer);
                (window as any).provider = signer;

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
            {/* <ContextStore.Provider value={{bkMp3:bgMusic,play:true}}>
                <ContextStore.Consumer>
                    {(ctx)=><audio ref={audioRef} src={ctx.bkMp3} loop={true}/>}
                </ContextStore.Consumer>
            </ContextStore.Provider>
             */}

            <audio ref={audioRef} src={require(`../assets/mp3/${mp3}.mp3`)} loop={true}/>
            <p className="nav-item">

                <span onClick={e => changePath('index')} className={path === 'index' ? 'cur' : ''}>🥽</span>
        
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
