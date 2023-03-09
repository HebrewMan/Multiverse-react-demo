import '../css/loading.scss';
import {useState,useEffect} from 'react';
import { Progress, Space } from 'antd';


interface propsType {
    status?:string;
}
function Loading(props:propsType) {
    const [heroShaking, setHeroShaking] = useState(true);
    let [percent,setPercent] = useState(0);

    setTimeout(()=>{setPercent(80)},1000)

    return (
        <div className={`overlay ${heroShaking ? ' shake' : ''}`}>
            <div className="box">
                <div className="progess">
                <p>{props.status == 'loading'? 'loading ...':'Success'}</p>
                    <Progress percent={percent} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}  status="active"/>
                </div>
                <img src={require(`../assets/loading.gif`)} alt="" width={300}/>
            </div>
        </div>
    )
}
export default Loading;
