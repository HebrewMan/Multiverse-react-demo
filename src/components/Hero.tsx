import React, { useEffect ,useState,} from 'react';
import "../css/hero.scss"
import HealthBar from "./HealthBar";
interface HeroType {
    tokenId:number,
    name: string;
    pa: number;
    hp: number;
    src: string;
}
function Hero(props: any){

    const selectHero = (id:number) => props.change(id)

    return (
        <div onClick={()=>selectHero(props.heroData.tokenId)}  className={props.heroData.tokenId === props.currentId? 'hero-cur hero':'hero'}>
            <div>
                <p className='hp' style={{ color: '#ff4c4c' }}>🛡 : {props.heroData.hp} HP</p>
                <p className='pa' style={{ color: '#fef900' }}>⚔  : {props.heroData.pa} PA</p>
                <p className='hp' style={{ color: '#ff4c4c' }}>💰 : {props.heroData.tokenId} Ether</p>
                {/* <HealthBar hp={props.heroData.hp} /> */}
                <img src={props.heroData.src} alt="" width={300} height={300} />
                <p className='name'>No.{props.heroData.tokenId} {props.heroData.name}</p>
            </div>
        </div>
    )
}
export default Hero;
