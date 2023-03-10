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


const ERC20 = (provider:Signer)=>{
    return new ethers.Contract('0x656c0e5cF23295A23e6EC7e25A834cf28a136aC1',erc20,provider);//game edit task infoc
}

const ERC721 = (provider:Signer)=>{
    return new ethers.Contract('0xe6f4e4B4ab1bfDD62FFE568B58B4C1488B32FC7a',erc721,provider);//game edit task infoc
}

const Game = (provider:Signer)=>{
    return new ethers.Contract('0xe936cA9911782Ef933dFd130E1A11Dd9fd6C76Ab',game,provider);//game edit task infoc
}

const Vault = (provider:Signer)=>{
    return new ethers.Contract('0xE6Ac8a7977db86368dD1EF64D13971f2a4468bE8',vault,provider);//game edit task infoc
}


export {
    ERC20,
    ERC721,
    Game,
    Vault
}