import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import Loading from '../../components/loading';

import { Game, Signer_} from '../../contracts';
import "./index.scss"
const Vault = ()=>{

    const [rewards,setRewards] = useState<number>();

    const [loadingStatus,setLoadingStatus] = useState('');
    const closeLoading = ()=> setTimeout(()=>setLoadingStatus(''),3000)

    const getRewards = async()=>{
        const signer = await Signer_();
        const balance = await Game(signer).rewards(localStorage.account);
        setRewards(balance/10**18)
    }

    useEffect(()=>{
        getRewards()
    },[])

    const claim = async()=>{
     
        try {
            setLoadingStatus('loading');
            const signer = await Signer_();
            const tx = await Game(signer).claim();
            
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                closeLoading()
                setRewards(0)
            }).catch(()=>{
                setLoadingStatus('fail');
                closeLoading()
            })

        } catch (error) {
            setLoadingStatus('fail');
            console.log(error)
            closeLoading()
        }
    }


    return (
        <React.Fragment>
        <Loading status={loadingStatus} />
         
        <h1 className="neonText">
            🥛 Vault 🏧
        </h1>
        <div className="box">
            <p>当前可领取的牛奶 </p>
            <p> {rewards} X 🥛</p>
        </div>
        <div style={{ textAlign: 'center'}}>
                <button onClick={claim}>🏆 Claim</button>
        </div>
    </React.Fragment>
    )
}

export default Vault;