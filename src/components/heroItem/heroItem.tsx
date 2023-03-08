import React, { ReactElement, useState, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../HealthBar";
import "./heroItem.scss"

type childMethods = {
    handleClick:()=>void
}

export let childHandleClick: () => void
const HeroItem = (props:any) => {
    console.log('props', props)

    const [position, setPosition] = useState(0);

    const childRef = useRef<any>(null);
    

    const handleClick = () => {
      setPosition(position + 300);
      setTimeout(() => {
        setPosition(position);
      }, 5000);
      props?.onButtonClick();
    }


    childRef.current = {handleClick}
    const run = ()=>{
        console.log('run')
    }

    childHandleClick = handleClick

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
            <div className="item" ref={(_ref) => props.ref} style={{ transform: `translateX(${position}px)`, transition: 'transform 2s ease' }}>
                <HealthBar hp={200} className="hp"/>
                <img src={require(`../../assets/jianxiake/zhan.gif`)} alt="" width={300} style={{marginBottom:'20px'}} />
                <p className='name' onClick={handleClick}>剑 侠 客</p>
            </div>
        </React.Fragment>
    )
}

export default HeroItem;
