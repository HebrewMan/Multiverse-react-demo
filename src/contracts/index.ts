import {ethers,Signer} from 'ethers';

import gameAbi from '../abis/Game.json';


const Game = (provider:Signer)=>{
    return new ethers.Contract('0x1Dc68b16062FB9b0Cac4bB9F11076e8C8c61b2Fe',gameAbi,provider);//game edit task infoc
}


export {
    Game,
}