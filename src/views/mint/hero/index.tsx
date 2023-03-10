
import "./hero.scss"

function Hero(props: any){

    const selectHero = (id:number) => props.change(id)

    return (
        <div onClick={()=>selectHero(props.heroData.tokenId)}  className={props.heroData.tokenId == props.currentId? 'hero-cur hero':'hero'}>
            <div>
                <p  style={{ color: '#ff4c4c' }}>🛡 : {props.heroData.hp} HP</p>
                <p  style={{ color: '#fef900' }}>🗡  : {props.heroData.pa} PA</p>
                <p  style={{ color: '#ff4c4c' }}>💰 : {props.heroData.tokenId} Ether</p>
                <img src={props.heroData.src} alt="" width={300} height={300} />
                <p className='name'>No.{props.heroData.tokenId} {props.heroData.name}</p>
            </div>
        </div>
    )
}
export default Hero;