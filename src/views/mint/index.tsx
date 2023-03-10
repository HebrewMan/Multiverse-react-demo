import React, { ReactElement, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers, Signer } from 'ethers';
import { ERC721 ,Game} from '../../contracts'
import "../../css/button.css"
import Hero from "./hero";
import Loading from '../../components/loading';
interface Props { }

interface HeroType {
    tokenId: number;
    name: string;
    pa: number;
    hp: number;
    src: string;
}

const Init: React.FC<Props> = (props) => {

    const nav = useNavigate()

    const [currentId, setCurrentId] = useState(2);

    const herosDatas: HeroType[] = [
        { tokenId: 1, name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/zhan2.gif`) },
        { tokenId: 2, name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/zhan2.gif`) },
        { tokenId: 3, name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/zhan2.gif`) },
    ]

    const changeId = (id: number) => setCurrentId(id);
    

    const heroHtmls: ReactElement[] = herosDatas.map((item: HeroType, index: number) => (
        <Hero  key={index} change={changeId} heroData={item} currentId={currentId} />
    ));


    const mint = async() => {
        //mint 之后 直接初始化。然后跳转战斗页面 



        try {

            const tx = await ERC721((window as any).provider ).safeMint(localStorage.account,{ value: ethers.utils.parseEther(currentId+'') });
            await tx.wait();
            const tx2 = await Game((window as any).provider ).initBattleTeam(currentId);
            await tx2.wait();

            nav(`/arena/${currentId}`)
        } catch (error) {

            console.log(error)
            
        }

        //判断当前id 是否被mint。如果被Mint 修改按钮文字 直接去战斗 else mint 
    }

    return (
        <React.Fragment>
            <h1 className="neonText">
            💂‍♂️ 点 将 大 会 
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