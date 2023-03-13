import React, { useState, useEffect, useRef } from 'react';
import HealthBar from "../../components/HealthBar";
import "./index.scss"

import healMp3 from '../../assets/mp3/heal.mp3';
import heroAttack from '../../assets/mp3/hero-attack.mp3';
import npcAttack from '../../assets/mp3/npc-attack.mp3';
import heroDeadMp3 from '../../assets/mp3/hero-dead.mp3';
import victoryMp3 from '../../assets/mp3/victory.mp3';

import Loading from '../../components/loading';
import {Game,ERC20,Signer_,addresses} from '../../contracts'

interface HeroType {
    name: string;
    pa: number;
    hp: number;
    src: string;
    status?: string,
}

const Arena = () => {
    let tokenId = Number(window.location.href[window.location.href.length - 1]);

    const [approved,setApprove] = useState(false);
    

    const getAllowance = async()=>{
        const signer = await Signer_();
        const res = await ERC20(signer).allowance(localStorage.account,addresses.game);
        console.log('approved',res*1)
        if(res*1>0){
            setApprove(true)
        }
    }

    useEffect(()=>{
        getAllowance()
    },[])

    const [loadingStatus,setLoadingStatus] = useState('');
    const closeLoading = ()=> setTimeout(()=>setLoadingStatus(''),3000)

    const [heroPosition, setHeroPosition] = useState(0);
    const [heroStatus, setHeroStatus] = useState('zhan');
    const [heroShaking, setHeroShaking] = useState(false);

    const [healed, setHealed] = useState(false);

    const [enemyStatus, setEnemyStatus] = useState('zhan');
    const [enemyShaking, setEnemyShaking] = useState(false);
   
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRefAttack = useRef<HTMLAudioElement>(null);
    const [mp3, setMp3] = useState(heroDeadMp3);
    const [mp3Attack, setMp3Attack] = useState(heroDeadMp3);

    const herosDatas: HeroType[] = [
        { name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/${heroStatus}.gif`) },
        { name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/${heroStatus}.gif`) },
        { name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/${heroStatus}.gif`) },
    ]

    let [heroHp, setHeroHp] = useState(herosDatas[tokenId - 1].hp);
    let [enemyHp, setEnemyHp] = useState(300);

    const getHps = async()=>{
        const signer = await Signer_();
        const heroInfo = await Game(signer).getHeroInfo(tokenId);
        const npcInfo = await Game(signer).Npc(); 
        setHeroHp(heroInfo.hp*1);
        setEnemyHp(npcInfo.hp*1)
        console.log(heroInfo,"heroInfo")
        console.log(npcInfo,"npcInfo")
    }

    useEffect(()=>{
        getHps();
    },[])

    const enemyPa =  100;
    
    const approve =async()=>{
        try {
            setMp3(healMp3);
            setLoadingStatus('loading');
            const tx = await ERC20((window as any).provider ).approve(addresses.game,"10000000000000000000000000000");
            
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                closeLoading()
                setApprove(true)
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

    const heal = async() => {
         
        try {
            setMp3(healMp3);
            setLoadingStatus('loading');
            const tx = await Game((window as any).provider ).healHero(tokenId);
            
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                closeLoading()
                setTimeout(() => {
                    if (heroHp < tokenId * 100) {
                        heroHp += 100;
                        setHeroHp(heroHp);
                        setHeroPosition(0);
                    }
                    audioRef.current?.play();
                    setHealed(true);
                }, 3500);
                setTimeout(() => setHealed(false), 4500);
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

   


    const attack = async() => {
        if (heroHp <= 0 || enemyHp<=0) {
            alert('血量不足~')
            return;
        }
        try {
          
            setLoadingStatus('loading');
            const tx = await Game((window as any).provider ).attack(tokenId);
            
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                closeLoading()
                setTimeout(() => handleAttack(), 3000);
            }).catch(()=>{
                setLoadingStatus('fail');
                closeLoading()
            })

        } catch (error) {
            setLoadingStatus('fail');
            console.log(error)
            closeLoading()
        }
        
        //战斗结束之后 攻击按钮消失  放生按钮出现
        //攻击动画 音效
    }
    const handleAttack = async () => {

        const px = Number(document.querySelector('.arena')?.clientWidth) - 330;
        //1 hero 攻击
        setHeroStatus("run");
        setHeroPosition(heroPosition + px);

        setMp3Attack(heroAttack);
        setTimeout(() => {
            audioRefAttack.current?.play();
            setHeroStatus("gongji")
        }, 200);

        //2 enemy 受伤
        setTimeout(() => {
            setEnemyShaking(true);//挨打
            enemyHp -= herosDatas[tokenId - 1].pa;
            setEnemyHp(enemyHp);//敌人受伤
            console.log(enemyHp, 'enemyHp')

            if (enemyHp <= 0) {
                setMp3(victoryMp3);
                setTimeout(() => {
                    audioRef.current?.play();
                }, 100);
                //2秒钟后 跳转 领取奖励
                return;
            }

            setTimeout(() => setHealed(false), 1000);
        }, 800);
        //3 enemy 攻击
        setTimeout(() => {
            setEnemyShaking(false);
            if (enemyHp <= 0) {
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

        setTimeout(() => {
            setHeroShaking(true);
            if(enemyHp>0){
                heroHp -= enemyPa;
            }
           
            if (heroHp <= 0) {
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


    return (
        <React.Fragment>
            <Loading status={loadingStatus} />
            <audio ref={audioRefAttack} src={mp3Attack} />
            <h1 className="neonText">🗽 大 闹 天 宫 </h1>
            <div className="arena">
                <div className="left" style={{ top: '30px' }}>
                    <div className="item" style={{ transform: `translateX(${heroPosition}px)`, transition: 'transform 0.2s linear' }}>
                        <HealthBar initHp={tokenId * 100} hp={heroHp} pa={tokenId * 50} />
                        <img style={{ transform: heroHp <= 0 ? 'rotate(-90deg)' : '', marginBottom: '20px', zIndex: '99999 !important' }} className={` ${heroShaking ? 'shake' : ''}`} src={herosDatas[tokenId - 1].src} alt="" width={300} />
                        <span className='name' style={{ top: '210px' }}>{herosDatas[tokenId - 1].name}</span>
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
                        <span className='name' style={{ top: '205px' }}>杨 戬</span>
                    </div>
                </div>
            </div>

            <div className='btns' style={{ textAlign: 'center' }}>
                <button onClick={approved? heal:approve}>{approved?'🥛 Heal':'👨‍⚖️ Heal'}</button>
                <button onClick={attack} >🤺 attack</button>
            </div>

        </React.Fragment>
    )
}

export default Arena;