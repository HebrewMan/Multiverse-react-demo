import React, { ReactElement, useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers,  } from 'ethers';
import { ERC721 ,Game, Signer_} from '../../contracts'
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

const Mint: React.FC<Props> = (props) => {

    const nav = useNavigate()

    const [loadingStatus,setLoadingStatus] = useState('');

    const closeLoading = ()=>setTimeout(()=>setLoadingStatus(''),3000);

    let [currentId, setCurrentId] = useState(0);

    useEffect(()=>{
            getCurrentTokenId()
    },[])

    const getCurrentTokenId =async ()=>{
        const signer = await Signer_();
        let nfts = (await ERC721(signer).balanceOf(localStorage.account))*1;
       
        setCurrentId(nfts)
    }

    const herosDatas: HeroType[] = [
        { tokenId: 1, name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/zhan2.gif`) },
        { tokenId: 2, name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/zhan2.gif`) },
        { tokenId: 3, name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/zhan2.gif`) },
    ]

    const changeId = (id: number) => id;
    

    const mint = async() => {
        //如果当前id 是3 就显示去战斗 fighting
        if(currentId==3){
            nav(`/train`);
            return;
        }
        try {
            setLoadingStatus('loading');
            const ether = currentId==0? '1' : currentId+'';
            const tx = await ERC721((window as any).provider ).safeMint(localStorage.account,{ value: ethers.utils.parseEther(ether)});
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                closeLoading()
            }).catch(()=>{
                setLoadingStatus('fail');
                closeLoading()
            })
            setCurrentId(currentId+1);
            
            // nav(`/arena/${currentId}`)
        } catch (error) {
            setLoadingStatus('fail');
            console.log(error)
            closeLoading()
        }
    }

    return (
        <React.Fragment>
           <Loading status={loadingStatus} />
            <h1 className="neonText">💂‍♂️ 点 将 大 会 </h1>
            <div className="text" style={{display:currentId==3?'':'none'}}>
             <h5>你已经拥有3个英雄去</h5>
             <h5>快消灭敌人吧~</h5>
            </div>
            <div className='mints' style={{display:currentId==3?'none':''}}>
                <Hero change={changeId} heroData={currentId==3? herosDatas[2]:herosDatas[currentId]} currentId={888} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={mint}>{currentId==3?'Fight':'mint' }</button>
            </div>
        </React.Fragment>
    );
}

export default Mint;