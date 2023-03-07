import React, { useState ,useEffect} from 'react';
import "../css/healthBar.css";

function HealthBar(props:any) {
  const [health, setHealth] = useState(150);


  const handleAttack = () => {
    setHealth(health - 50);
  };

  return (
    <div>
     
      <div className="health-bar" style={{ width: `${health+8}px` }}>
        <div className="health-bar-progress font" style={{ width: `${health}px` }}>Hp 🛡</div>
      </div>

      <div className="health-bar2" style={{ width: `${health+8}px` }}>
       <div className="health-bar-progress2 font" style={{ width: `${health}px` }}>PA ⚔</div>
      </div>
    </div>
  );
}

export default HealthBar;