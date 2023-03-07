import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../../components/HealthBar";
import "./index.scss"
import HeroItem from '../../components/heroItem/heroItem';
import { childHandleClick } from '../../components/heroItem/heroItem'
interface Props { }
const Arena = () => {
    const childRef = useRef();
  
    const aaa = ()=>{
        console.log(908098908)
    }

    const attack = () => {
        childHandleClick && childHandleClick()
    }

    return (
        <React.Fragment>
            <h1 className="neonText">Arena</h1>
            <div className="arena">
                <div className="left">
                    <HeroItem ref={childRef} onButtonClick={aaa} />
                </div>
                <div className="right"></div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={attack}>attack</button>
            </div>

        </React.Fragment>
    )
}

export default Arena;