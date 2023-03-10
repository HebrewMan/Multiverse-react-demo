import {  useNavigate, useLocation} from 'react-router-dom';
import { useState,useEffect,useRef,useContext} from 'react';
import { ethers, Signer } from 'ethers';
import { Game as _Game,ERC20 } from '../contracts';
import '../css/header.css';
import "../css/button.css"

import ContextStore from './store';

// import ContextStore from '../components/store/index';
const Header: any = (props: any) => {

    const ctx = useContext(ContextStore);
    const [milk,setMilk] = useState(100);
    const location = useLocation();

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [mp3, setMp3] = useState('index');

    const [path, setPath] = useState<any>('')
    const nav = useNavigate()

    const paths = [
        { path: 'index', name: '🥽', },
        { path: 'mint', name: 'Mint 💎', },
        { path: 'train', name: 'Train 🥋', },
        { path: 'arena', name: 'Arena🤺', },
        { path: 'vault', name: 'Vault 💸', },
    ]

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        isPlaying?audioRef.current?.pause():audioRef.current?.play();
    } 

    const changePath = (item: string,tokenId?:number) => {
        setMp3(item);
        if(item != 'arena'){
            setPath(item);
            nav('/'+item);
            setIsPlaying(true);
            setTimeout(()=>audioRef.current?.play(),200)
        }
    }

    useEffect(()=>{
        const str = location.pathname.match(/[a-zA-Z]+/g);
        if(str){
            setPath(str[0])
            setMp3(str[0])
        }else{
            setPath('index')
        }
        connetToNetwork()
    },[])

    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState('');

    async function connetToNetwork() {
        const { ethereum } = (window as any);
        if (ethereum && account == '') {

            let web3Provider: any;
            web3Provider = new ethers.providers.Web3Provider(ethereum);
            const accounts = await web3Provider.send("eth_requestAccounts", []);
            let _account: any = accounts[0].substr(0, 2) + '...' + accounts[0].substr(-4);
            localStorage.account = accounts[0];
            setAccount(_account)
            const signer: Signer = await web3Provider.getSigner();
            (window as any).provider = signer;

            try {
                let _balance = await web3Provider.getBalance(accounts[0]);
                _balance = _balance / 10 ** 18;
                setBalance(_balance)
                const balance = await ERC20(signer).balanceOf(localStorage.account);
                setMilk(balance/10**18)
                console.log(balance,'balance')
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <div className='account' style={{ marginTop: 20 + 'px' }}>
            <audio ref={audioRef} src={require(`../assets/mp3/${mp3}.mp3`)} loop={true}/>
            <p className="nav-item">
                {paths.map(item=>
                    <span onClick={e => changePath(item.path)} key={item.name} className={path == item.path ? 'cur' : ''}>{item.name}</span>
                )}
            </p>
            <p className="nav-item2">
                <span>👨‍⚖️ {account}</span>
                <span>💰 {parseInt(balance)}</span>
                <span>🥛 {milk}</span>
                <span onClick={handlePlay}>{isPlaying?'⏸':'⏯'}</span>
            </p>
        </div>
    )
}
export default Header;
