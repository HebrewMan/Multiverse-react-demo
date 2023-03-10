import React, { ReactElement, useState, useImperativeHandle, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../../components/HealthBar";
import "./index.scss"

import healMp3 from '../../assets/mp3/heal.mp3';
import heroAttack from '../../assets/mp3/hero-attack.mp3';
import npcAttack from '../../assets/mp3/npc-attack.mp3';
import heroDeadMp3 from '../../assets/mp3/hero-dead.mp3';
import victoryMp3 from '../../assets/mp3/victory.mp3';

import Loading from '../../components/loading';

interface HeroType {
    name: string;
    pa: number;
    hp: number;
    src: string;
    status?: string,
}

const Arena = () => {

    const herosDatas: HeroType[] = [
        { name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/zhan2.gif`) },
        { name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/zhan2.gif`) },
        { name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/zhan2.gif`) },
    ]

    let tokenId = Number(window.location.href[window.location.href.length - 1]);

    const [heroPosition, setHeroPosition] = useState(0);
    const [heroStatus, setHeroStatus] = useState('zhan');
    const [heroShaking, setHeroShaking] = useState(false);

    let [heroHp, setHeroHp] = useState(herosDatas[tokenId - 1].hp);

    const [healed, setHealed] = useState(false);
    
    const [enemyStatus, setEnemyStatus] = useState('zhan');
    const [enemyShaking, setEnemyShaking] = useState(false);
    let [enemyHp, setEnemyHp] = useState(300);


    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRefAttack = useRef<HTMLAudioElement>(null);
    const [mp3, setMp3] = useState(heroDeadMp3);
    const [mp3Attack, setMp3Attack] = useState(heroDeadMp3);

   
    const [enemyInfo, setEnemyInfo] = useState<HeroType>({
        name: '杨 戬',
        pa: 100,
        hp: 300,
        status: 'zhan',
        src: ''
    });

    const Heal = () => {
        //医治动画 音效
        setMp3(healMp3);
        if(heroHp<tokenId*100) {
            heroHp += 100;
            setHeroHp(heroHp);
            setHeroPosition(0);
        }
       
        setTimeout(() => {
            audioRef.current?.play();
            setHealed(true);
        }, 100);
        setTimeout(() => setHealed(false), 1000);
    }


    const attack = () => {
        handleAttack()
        //战斗结束之后 攻击按钮消失  放生按钮出现
        //攻击动画 音效
    }
    const handleAttack = async () => {

        if(heroHp<=0){
        //    alert('血量不足~')
           return;
        }

        //1 hero 攻击
        setHeroStatus("run");
        setHeroPosition(heroPosition + 650);

        setMp3Attack(heroAttack);
        setTimeout(() => {
            audioRefAttack.current?.play();
            setHeroStatus("gongji")
        }, 500);

        //2 enemy 受伤
        setTimeout(() => {
            setEnemyShaking(true);//挨打
            enemyHp -= herosDatas[tokenId - 1].pa;
            setEnemyHp(enemyHp);//敌人受伤
            console.log(enemyHp,'enemyHp')

            if(enemyHp<=0){
                setMp3(victoryMp3);
                setTimeout(() => {
                    audioRef.current?.play();
                }, 100);
                //2秒钟后 跳转 领取奖励
                return;
            }

            setTimeout(() => setHealed(false), 1000);
        }, 1000);
        //3 enemy 攻击
        setTimeout(() => {
            setEnemyShaking(false);
            if(enemyHp<=0){
                setMp3(victoryMp3);
                audioRef.current?.play();
                return;
            }
            setHeroStatus("zhan");//英雄准备挨打

            setMp3Attack(npcAttack);
            setTimeout(() => {
                audioRefAttack.current?.play();
            }, 10);
            setEnemyStatus("gongji");
      
        }, 2000);

        //3 hero 受伤

        //释放法术
        setTimeout(() => {
            setHeroShaking(true);
            heroHp -= enemyInfo.pa;
            if(heroHp<=0){
                setMp3(heroDeadMp3);
                audioRef.current?.play();
            }
            setHeroHp(heroHp);//英雄受伤
        
        }, 3000);

        setTimeout(() => {
            setHeroShaking(false);
            // setEnemyShaking(false);
            setEnemyStatus("zhan")
           
            //血量检查 等于0  就不回去了
            console.log('heroHp', heroHp)
            heroHp > 0 && setHeroPosition(0);


        }, 4000);

    }


    //获取英雄血量
    //获取敌人血量

    return (
        <React.Fragment>
            {/* <Loading/> */}
            <audio ref={audioRefAttack} src={mp3Attack}/>
            <h1 className="neonText">🗽 大 闹 天 宫 </h1>
            <div className="arena">
                <div className="left" style={{ top: '30px' }}>
                    <div className="item" style={{ transform: `translateX(${heroPosition}px)`, transition: 'transform 0.2s linear' }}>
                        <HealthBar initHp={tokenId * 100} hp={heroHp} pa={tokenId * 50} />
                        <img style={{ transform: heroHp <= 0 ? 'rotate(-90deg)' : '', marginBottom: '20px',zIndex:'99999 !important' }} className={` ${heroShaking ? 'shake' : ''}`} src={require(`../../assets/longtaizi/${heroStatus}.gif`)} alt="" width={300} />
                        <span className='name' style={{ top: '186px' }}>{herosDatas[tokenId].name}</span>
                    </div>

                    <div className="skill" style={{ display: healed ? 'block' : 'none' }}>
                        <audio ref={audioRef} src={mp3} />
                        <img src={require(`../../assets/skill/shengji.gif`)} alt="" width={100} />
                    </div>
                </div>
                <div className="right">
                    <div className="item" style={{ transform: `translateX(0px)` }}>
                        <HealthBar initHp={300} hp={enemyHp} pa={100} />
                        <img style={{ transform: enemyHp <= 0 ? 'rotate(90deg)' : '', marginBottom: '20px' }} className={` ${enemyShaking ? 'shake' : ''}`} src={require(`../../assets/fan/${enemyStatus}.gif`)} alt="" width={260} />
                        <span className='name' style={{ top: '195px' }}>杨 戬</span>
                    </div>
                </div>
            </div>

            <div className='btns' style={{ textAlign: 'center' }}>
                <button onClick={Heal}>Heal</button>
                <button onClick={attack} >attack</button>
            </div>

        </React.Fragment>
    )
}

export default Arena;