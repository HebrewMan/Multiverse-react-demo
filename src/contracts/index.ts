import {ethers,Signer} from 'ethers';

import erc20 from '../abis/ERC20.json';
import erc721 from '../abis/Hero.json';
import game from '../abis/Game.json';
import vault from '../abis/Vault.json';


/**
 * goerli network
 * Hero 0xe6f4e4B4ab1bfDD62FFE568B58B4C1488B32FC7a
 * MILK 0x656c0e5cF23295A23e6EC7e25A834cf28a136aC1
 * Game 0xe936cA9911782Ef933dFd130E1A11Dd9fd6C76Ab
 * Vault 0xE6Ac8a7977db86368dD1EF64D13971f2a4468bE8
 */

/**
 * Aitd test network
    vault:'0xf1040e708a06595b3F61DBaF7435bb5Af2cD49F7',
    hero:'0xA17930a20F126E092945968Bd0AcFFd347E5505C',
    milk:'0x735C84A0C206364aDFEf38AE4203dEF7db25276a',
    game:'0x7F3eAef6A89527fC1032db02f314F3b59D477184',
 */

const addresses = {
    vault:'0xf1040e708a06595b3F61DBaF7435bb5Af2cD49F7',
    hero:'0xA17930a20F126E092945968Bd0AcFFd347E5505C',
    milk:'0x735C84A0C206364aDFEf38AE4203dEF7db25276a',
    game:'0x7F3eAef6A89527fC1032db02f314F3b59D477184',
}


const ERC20 = (provider:Signer)=>{
    return new ethers.Contract(addresses.milk,erc20,provider);//game edit task infoc
}

const ERC721 = (provider:Signer)=>{
    return new ethers.Contract(addresses.hero,erc721,provider);//game edit task infoc
}

const Game = (provider:Signer)=>{
    return new ethers.Contract(addresses.game,game,provider);//game edit task infoc
}

const Vault = (provider:Signer)=>{
    return new ethers.Contract(addresses.vault,vault,provider);//game edit task infoc
}

const Signer_ = async()=>{
    const {ethereum} = (window as any);
    let  web3Provider = new ethers.providers.Web3Provider(ethereum);
    const signer = await web3Provider.getSigner()
    return signer;
}


export {
    ERC20,
    ERC721,
    Game,
    Vault,
    Signer_,
    addresses
}