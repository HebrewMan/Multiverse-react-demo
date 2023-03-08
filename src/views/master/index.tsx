import React, { useEffect ,useState,} from 'react';
import "../../css/hero.scss"
import HealthBar from "../../components/HealthBar";
interface HeroType {
    tokenId:number,
    name: string;
    pa: number;
    hp: number;
    src: string;
}
function Master(props: any){

    const selectHero = (id:number) => props.change(id)

    return (
        <div>
             <h1 className="neonText">
                一 代 宗 师
            </h1>
        <div className="master" style={{marginTop: '60px'}}>
            <div  className= 'hero-cur hero master'>
                <div style={{height: '490px'}}>
                    <p className='pa' style={{ color: '#fef900' }}>攻击力 ⚔ : {1}</p>
                    <p className='hp' style={{ color: '#ff4c4c' }}>防御力 🛡 : 100000000000000000</p>
                    <p className='hp' style={{ color: '#ff4c4c' }}>零售价 💰 : ❌❌❌</p>

                    {/* <HealthBar hp={200} /> */}
                    <img src={require(`../../assets/master/master.gif`)} alt="" width={300} style={{marginTop: '80px',marginBottom:'20px'}} />
                    {/* <p className='name'>马 保 国</p> */}
                </div>
            </div>
        </div>
        </div>
    )
}
export default Master;
