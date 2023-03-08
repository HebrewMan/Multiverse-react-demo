import React, { ReactElement, useState, useImperativeHandle, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import HealthBar from "../../components/HealthBar";
import "./index.scss"
import healMp3 from '../../assets/mp3/heal.mp3';
interface HeroType {
    tokenId?: number;
    name: string;
    pa: number;
    hp: number;
    src: string;
    status?: string,
}

const Arena = () => {


    const herosDatas: HeroType[] = [
        { tokenId: 1, name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/zhan2.gif`) },
        { tokenId: 2, name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/zhan2.gif`) },
        { tokenId: 3, name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/zhan2.gif`) },
    ]

    let tokenId = Number(window.location.href[window.location.href.length - 1]);

    const healAudioRef = useRef<HTMLAudioElement>(null);

    const [heroPosition, setHeroPosition] = useState(0);
    const [heroStatus, setHeroStatus] = useState('zhan');
    const [heroShaking, setHeroShaking] = useState(false);
    let [heroHp, setHeroHp] = useState(herosDatas[tokenId - 1].hp);

    const [healed, setHealed] = useState(false);


    const [enemyStatus, setEnemyStatus] = useState('zhan');
    const [enemyShaking, setEnemyShaking] = useState(false);
    const [enemyHp, setEnemyHp] = useState(300);



    const [enemyInfo, setEnemyInfo] = useState<HeroType>({
        name: '杨 戬',
        pa: 100,
        hp: 300,
        status: 'zhan',
        src: ''
    });

    const Heal = () => {
        //医治动画 音效
        heroHp += 100;
        healAudioRef.current?.play();
      
        setHeroHp(heroHp);
        setHealed(true);
        setHeroPosition(0);
        setTimeout(() => {
            setHealed(false)
            
        }, 1000);
    }

    const handleAttack2 = () => {
        setHeroHp(heroHp - 50);
    };


    const attack = () => {
        handleAttack()
        //攻击动画 音效
    }
    const handleAttack = async () => {

        //1 hero 攻击
        setHeroStatus("run");
        setHeroPosition(heroPosition + 650);
        setTimeout(() => setHeroStatus("gongji"), 500);
        //2 enemy 受伤
        setTimeout(() => {
            setEnemyShaking(true);//挨打
            setEnemyHp(enemyHp - herosDatas[tokenId - 1].pa);//敌人受伤
        }, 1000);
        //3 enemy 攻击
        setTimeout(() => {
            setEnemyShaking(false);
            setHeroStatus("zhan");//英雄准备挨打
            setEnemyStatus("gongji");//敌人攻击      
        }, 2000);

        //3 hero 受伤

        //释放法术
        setTimeout(() => {
            setHeroShaking(true);
            heroHp -= enemyInfo.pa;
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


        // setTimeout(() => {
        //     setHeroShaking(false);
        //     setEnemyShaking(false);
        //     setHeroPosition(heroPosition);//回去
        // }, 6000);
    }




    //获取英雄血量
    //获取敌人血量

    return (
        <React.Fragment>
            <h1 className="neonText">大 闹 天 宫</h1>
            <div className="arena">
                <div className="left" style={{ top: '30px' }}>
                    <div className="item" style={{ transform: `translateX(${heroPosition}px)`, transition: 'transform 0.2s linear' }}>
                        <HealthBar initHp={tokenId * 100} hp={heroHp} pa={tokenId * 50} />
                        <img style={{ transform: heroHp <= 0 ? 'rotate(-90deg)' : '', marginBottom: '20px',zIndex:'99999 !important' }} className={` ${heroShaking ? 'shake' : ''}`} src={require(`../../assets/longtaizi/${heroStatus}.gif`)} alt="" width={300} />
                        <span className='name' style={{ top: '186px' }}>{herosDatas[tokenId].name}</span>
                    </div>

                    <div className="skill" style={{ display: healed ? 'block' : 'none' }}>
                        <audio ref={healAudioRef} src={healMp3} />
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