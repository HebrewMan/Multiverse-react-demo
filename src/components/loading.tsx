import '../css/loading.scss';
import {useState} from 'react';
import { Progress } from 'antd';


function Loading(props:any) {

    let [percent,setPercent] = useState(0);

    setTimeout(()=>{setPercent(70)},2000)

    return (
        <div className={`overlay ${props.status === 'Success' ? ' shake' : ''}`} style={{display:props.status? "":"none"}}>
            <div className="box">
                <div className="progess">
                <p>{props.status}...</p>
                    
                    <Progress percent={ props.status.toLowerCase() === 'fail'? 0 :  props.status.toLowerCase() === 'loading'? 70:100  } strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}  status="active"/>
                </div>
                <img src={require(`../assets/loading.gif`)} alt="" width={300}/>
            </div>
        </div>
    )
}
export default Loading;
