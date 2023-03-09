import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import Loading from '../../components/loading';
import ctx  from '../../components/store/'
import "./index.scss"
const Vault = ()=>{

    const [rewards,setRewards] = useState<number>();

    function getRewards(){
        setRewards(100)
    }


    useEffect(()=>{
        getRewards();
    })

    return (
        <React.Fragment>
         
        <h1 className="neonText">
            🥛 Vault 🏧
        </h1>
        <div className="box">
            <p>当前可领取的牛奶 </p>
            <p> 10 X 🥛</p>
        </div>
        <div style={{ textAlign: 'center'}}>
                <button onClick={getRewards}>Claim</button>
        </div>
    </React.Fragment>
    )
}

export default Vault;