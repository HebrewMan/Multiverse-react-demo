import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { ethers, Signer } from 'ethers';
import "../../css/button.css"
import Hero from "../../components/Hero";
import bgMusic from '../../assets/mp3/bk.mp3';
interface Props { }

interface HeroType {
    tokenId: number;
    name: string;
    pa: number;
    hp: number;
    src: string;
}

const Init: React.FC<Props> = (props) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [currentId, setCurrentId] = useState(2);

    const herosDatas: HeroType[] = [
        { tokenId: 1, name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/zhan2.gif`) },
        { tokenId: 2, name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/zhan2.gif`) },
        { tokenId: 3, name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/zhan2.gif`) },
    ]

    const changeId = (id: number) => {
        setCurrentId(id);
        audioRef.current?.play();
        setIsPlaying(true);
    } // 设置播放状态


    const heroHtmls: ReactElement[] = herosDatas.map((item: HeroType, index: number) => (
        <Hero className='hero' key={index} change={changeId} heroData={item} currentId={currentId} />
    ));


    const mint = () => {
        //mint 之后 直接初始化。然后跳转战斗页面
    }

    return (
        <React.Fragment>
            <audio ref={audioRef} src={bgMusic} />
            <h1 className="neonText">
                点 将 大 会
            </h1>
            <div className='heros'>
                {heroHtmls}
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={mint}>Mint</button>
            </div>
        </React.Fragment>
    );
}

export default Init;