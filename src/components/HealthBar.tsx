import React, { useState ,useEffect} from 'react';
import "../css/healthBar.css";

function HealthBar(props:any) {
  const [health, setHealth] = useState(200);



  const handleAttack = () => {
    setHealth(health - 50);
  };

  return (
    <div className="health-bar">
      <div className="health-bar-progress" style={{ width: `${health}px` }}></div>
    </div>
  );
}

export default HealthBar;