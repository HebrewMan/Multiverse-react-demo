import "../css/healthBar.css";

function HealthBar(props:any) {
  return (
    <div>
     <span className="hp"> HP 🛡 {props.hp} </span>
     <span className="pa"> PA ⚔ {props.pa} </span>
      <div className="health-bar" style={{ width: `${props.initHp+7}px` }}>
        <div className="health-bar-progress font" style={{ width: `${props.hp<=0?0:props.hp}px` }}></div>
      </div>
     
      <div className="health-bar2" style={{ width: `${props.pa+7}px` }}>
       <div className="health-bar-progress2 font" style={{ width: `${props.pa}px` }}></div>
      </div>
    
    </div>
  );
}

export default HealthBar;