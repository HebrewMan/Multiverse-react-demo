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
    vault:'0x7Bfe878628647858C3B3b3372C2A461D898ADC0A',
    hero:'0x828B485fB8da5954a067e8A3e6BDBbdD1475fe97',
    milk:'0xE4117e3dEcD55a7c0f5d7cF580d485204438E685',
    game:'0x62c1Dd517eC7DC689358e073f9E7B9Eea8675Dae',
 */

    /*

    local test
       vault:'0x1735aA55DC4b51F6BE1F0a451256CF4462f7bec4',
    hero:'0xA17930a20F126E092945968Bd0AcFFd347E5505C',
    milk:'0x735C84A0C206364aDFEf38AE4203dEF7db25276a',
    game:'0x79736cb4761E710b3fbD4bdC0eE428d2988479dB',
    */

const addresses = {
    vault:'0x7Bfe878628647858C3B3b3372C2A461D898ADC0A',
    hero:'0x828B485fB8da5954a067e8A3e6BDBbdD1475fe97',
    milk:'0xE4117e3dEcD55a7c0f5d7cF580d485204438E685',
    game:'0x62c1Dd517eC7DC689358e073f9E7B9Eea8675Dae',
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