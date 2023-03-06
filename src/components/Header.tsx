import {useState} from 'react';
import '../css/header.css';
import "../css/button.css"
const Header:any = (props:any) => {
    const [path, setPath] = useState<any>('mint');

    const changePath = (item: string) => setPath(item);

    return (
        <div className='account' style={{ marginTop: 20 + 'px' }}>
            <p className="nav-item">
                <span onClick={e => changePath('mint')}  className={path === 'mint' ? 'cur' : ''}>Mint</span>
                <span onClick={e => changePath('arena')}  className={path === 'arena' ? 'cur' : ''} >Arena</span>
                <span onClick={e => changePath('vault')} className={path === 'vault' ? 'cur' : ''}>Vault</span>
            </p>
            <p className="nav-item2">
                <span>👨‍⚖️ {props.account}</span>
                <span>💰 {Number(props.balance).toFixed(4)}</span>
            </p>
        </div>
    )
}
export default Header;
