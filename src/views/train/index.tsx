import React, { ReactElement, useState ,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import "../../css/button.css"
import Hero from "../mint/hero";
import {Game,ERC721,Signer_} from '../../contracts'
import {MyContext} from '../../components/store';
import Loading from '../../components/loading';
interface Props { }

interface HeroType {
    tokenId: number;
    name: string;
    pa: number;
    hp: number;
    src: string;
}

const Train: React.FC<Props> = (props) => {

    const nav = useNavigate()

    const {setPath} = useContext(MyContext);
    
    const [currentId, setCurrentId] = useState(2);

    const [nfts,setNfts] = useState(0);
    const [btnText,setBtnText] = useState('train');

    const [loadingStatus,setLoadingStatus] = useState('');
    const closeLoading = ()=> setTimeout(()=>setLoadingStatus(''),3000)

    const [activated1,setActivated1] = useState(false);
    const [activated2,setActivated2] = useState(false);
    const [activated3,setActivated3] = useState(false);

    useEffect(()=>{
        getCurrentTokenId()
    },[])

    const getCurrentTokenId =async ()=>{
        const signer = await Signer_();
        let nfts = (await ERC721(signer).balanceOf(localStorage.account))*1;
        setBtnText('mint');
        setNfts(nfts);
    }

    const getActivateds=async()=>{
        const signer = await Signer_();
        const a1 = await Game(signer).activated(1);
        const a2 = await Game(signer).activated(2);
        const a3 = await Game(signer).activated(3);
        setActivated1(a1);
        setActivated2(a2);
        setActivated3(a3);
        checkActivated(currentId)
        console.log(a1,a2,a3)
    }
    useEffect(()=>{
        getActivateds();
    })
 

    const herosDatas: HeroType[] = [
        { tokenId: 1, name: "剑 侠 客", pa: 50, hp: 100, src: require(`../../assets/jianxiake/gongji.gif`) },
        { tokenId: 2, name: "龙 太 子", pa: 100, hp: 200, src: require(`../../assets/longtaizi/gongji.gif`) },
        { tokenId: 3, name: "神 天 兵", pa: 150, hp: 300, src: require(`../../assets/shentianbing/gongji.gif`) },
    ]

    const changeId = async(id: number) =>{
        checkActivated(id)
        setCurrentId(id)
    };

    const checkActivated = (id:number)=>{
        if(nfts!==3){
            setBtnText('mint')
            return;
        }
        if(id===1)activated1?setBtnText('fight'): setBtnText('train');
        if(id===2)activated2?setBtnText('fight'): setBtnText('train');
        if(id===3)activated3?setBtnText('fight'): setBtnText('train');
    }
    
    const heroHtmls: ReactElement[] = herosDatas.map((item: HeroType, index: number) => (
        <Hero  key={index} change={changeId} heroData={item} currentId={currentId} />
    ));

    const train = async() => {
        //init 之后 直接初始化。然后跳转战斗页面 

        if(nfts!==3){
            nav(`/mint`);
            setPath('mint')
            return;
        }
       
        try {

            if(btnText === 'fight'){
                // setMp3('arena')
                nav(`/arena/${currentId}`)
                setPath('arena')
                return;
            }
            setLoadingStatus('loading');

            const tx = await Game((window as any).provider).initBattleTeam(currentId);
            tx.wait().then(()=>{
                setLoadingStatus('Success');
                if(nfts!==3)setNfts(nfts+1);
                setBtnText('fight')
                closeLoading()
            }).catch(()=>{
                setLoadingStatus('fail');
                closeLoading()
            })
           
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
            <h1 className="neonText">
            🎖 誓 师 大 会
            </h1>
            <div className="text" style={{display:nfts!==3?'':'none'}}>
             <h5>当前拥有的英雄不足3名</h5>
             <h5>快去MINT英雄吧~</h5>
            </div>
            <div className='heros' style={{display:nfts===3?'':'none'}}>
                {heroHtmls}
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={train}>{ btnText} </button>
            </div>
        </React.Fragment>
    );
}

export default Train;