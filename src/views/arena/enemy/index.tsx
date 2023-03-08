import React, { ReactElement, useState, useEffect,} from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../../../components/HealthBar";
import "./heroItem.scss"

const HeroItem = (props:any) => {
    return (
        <React.Fragment>
            <div className="item">
                <HealthBar hp={200} className="hp"/>
                <img src={require(`../../assets/jianxiake/zhan.gif`)} alt="" width={300} style={{marginBottom:'20px'}} />
                <p className='name'>剑 侠 客</p>
            </div>
        </React.Fragment>
    )
}
export default HeroItem;