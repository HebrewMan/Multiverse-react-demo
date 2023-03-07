import React, { ReactElement, useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../HealthBar";
import "./heroItem.scss"


export let childHandleClick: () => void
const HeroItem = (props: any) => {
    const [position, setPosition] = useState(0);
    const [heroStatus, setHeroStatus] = useState('zhan');

    const [shaking, setShaking] = useState(false);

    const handleShake = () => {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
    };

    const handleAttack = async() => {
        setHeroStatus("run");
        setPosition(position + 300);

        setTimeout(() => {
            setHeroStatus("gongji");
        }, 2000);
        setTimeout(() => {
            setHeroStatus("zhan");
        }, 3500);
        setTimeout(() => {
            setShaking(true);
        }, 4000);
        setTimeout(() => {
            setPosition(position);//回去
        }, 5000);
    }

    const run = () => {
        console.log('run')
    }

    childHandleClick = handleAttack

    /*
        发动进攻
        开启音效
        切换gif 奔跑
        跑到位之后 切换gif 攻击
        敌人受伤。
        切换gif
        敌人切换 gif 攻击
        用户受伤 
        用户回来
        检验 血量
    */


    return (
        <React.Fragment >
            <div className="item"  ref={(_ref) => props.ref} style={{ transform: `translateX(${position}px)`, transition: 'transform 2s ease' }}>
                <HealthBar hp={200} className="hp" />
                <img className={` ${shaking ? 'shake' : ''}`} src={require(`../../assets/yangjian/${heroStatus}.gif`)} alt="" width={300} style={{ marginBottom: '20px' }} />
                <p className='name'>剑 侠 客</p>
            </div>
        </React.Fragment>
    )
}

export default HeroItem;
