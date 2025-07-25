import React, { useState, useEffect } from "react";
import Classes from "./HomeScreen.module.css";
import { useNavigate } from "react-router-dom";
import gameParlourImg from "../../../assets/images/game_parlour.png";
import westernImg from "../../../assets/images/western.png";
import ethinicImg from "../../../assets/images/ethinic.png";
import homeDecorImg from "../../../assets/images/home_decor.png";
import billBoardImg from "../../../assets/images/billBoard.png";
import treeImg from "../../../assets/images/tree.png";
import bushImg from "../../../assets/images/bush_main.png";
import playerImg from "../../../assets/images/player.png";
import lampImg from "../../../assets/images/street_light.png";
import lampImg2 from "../../../assets/images/street_light_flipped.png";
import benchImg from "../../../assets/images/bench.png";

const HomeScreen = () => {
  const navigate = useNavigate();
  
  // Agent position state - Start on crossroad (center of screen)
  const [agentPosition, setAgentPosition] = useState({ 
    x: (window.innerWidth / 2) - 30, // Center horizontally, minus half agent width
    y: (window.innerHeight / 2) - 20  // Center vertically, minus half agent height
  });
  
  // Store hover state
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);
  
  // Movement speed
  const moveSpeed = 20;
  
  // Store bounds for collision detection - Responsive to screen size
  const getStoreBounds = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    return {
      'game-parlour': { 
        x: screenWidth * 0.05, 
        y: screenHeight * 0.2, 
        width: screenWidth * 0.25, 
        height: screenHeight * 0.3 
      },
      'western-store': { 
        x: screenWidth * 0.4, 
        y: screenHeight * 0.15, 
        width: screenWidth * 0.2, 
        height: screenHeight * 0.15 
      },
      'ethinic-store': { 
        x: screenWidth * 0.4, 
        y: screenHeight * 0.32, 
        width: screenWidth * 0.2, 
        height: screenHeight * 0.15 
      },
      'home-decor': { 
        x: screenWidth * 0.7, 
        y: screenHeight * 0.55, 
        width: screenWidth * 0.25, 
        height: screenHeight * 0.25 
      }
    };
  };
  
  // Collision detection function
  const checkStoreCollision = (agentX: number, agentY: number) => {
    const agentWidth = 60;
    const agentHeight = 40;
    const storeBounds = getStoreBounds();
    
    // Add buffer to prevent accidental triggers on mobile
    const buffer = window.innerWidth < 768 ? 20 : 10;
    
    for (const [storeId, bounds] of Object.entries(storeBounds)) {
      if (
        agentX + buffer < bounds.x + bounds.width - buffer &&
        agentX + agentWidth - buffer > bounds.x + buffer &&
        agentY + buffer < bounds.y + bounds.height - buffer &&
        agentY + agentHeight - buffer > bounds.y + buffer
      ) {
        return storeId;
      }
    }
    return null;
  };

  // Movement functions
  const moveAgent = (direction: 'up' | 'down' | 'left' | 'right') => {
    setAgentPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'up':
          newY = Math.max(50, prev.y - moveSpeed);
          break;
        case 'down':
          newY = Math.min(window.innerHeight - 100, prev.y + moveSpeed);
          break;
        case 'left':
          newX = Math.max(50, prev.x - moveSpeed);
          break;
        case 'right':
          newX = Math.min(window.innerWidth - 100, prev.x + moveSpeed);
          break;
      }
      
      // Check for store collision
      const hoveredStoreId = checkStoreCollision(newX, newY);
      setHoveredStore(hoveredStoreId);
      
      return { x: newX, y: newY };
    });
  };
  
  // Handle CTA click
  const handleEnterStore = () => {
    if (hoveredStore) {
      switch (hoveredStore) {
        case 'game-parlour':
          navigate("/game-parlour");
          break;
        case 'western-store':
          navigate("/western-store");
          break;
        case 'ethinic-store':
          navigate("/ethinic-store");
          break;
        case 'home-decor':
          navigate("/home-decor");
          break;
      }
    }
  };

  // Initialize collision detection on mount and handle window resize
  useEffect(() => {
    const updateCollision = () => {
      const hoveredStore = checkStoreCollision(agentPosition.x, agentPosition.y);
      setHoveredStore(hoveredStore);
    };
    
    // Initial check
    updateCollision();
    
    // Add resize listener to recalculate bounds on screen size change
    window.addEventListener('resize', updateCollision);
    window.addEventListener('orientationchange', updateCollision);
    
    return () => {
      window.removeEventListener('resize', updateCollision);
      window.removeEventListener('orientationchange', updateCollision);
    };
  }, [agentPosition.x, agentPosition.y]);
  
  // Generate tree positions dynamically
  const treePositions = Array.from({ length: 10 }, (_, index) => ({
    top: -260 + (index * 40), // Start at -260px, increment by 30px
    left: -190 , // Vary left position slightly for natural look
    scale: 0.18 + (index % 4) * 0.01 // Vary scale between 0.18-0.21
  }));

  const bottomRightTreePositions = Array.from({ length: 10 }, (_, index) => ({
    top: 230 + (index * 40), // Start at -260px, increment by 30px
    left: 190 , // Vary left position slightly for natural look
    scale: 0.18 + (index % 4) * 0.01 // Vary scale between 0.18-0.21
  }));

     const bottomLeftTreePositions = Array.from({ length: 10 }, (_, index) => ({
     top: 230 + (index * 40), // Start at -260px, increment by 30px
     left: -190 , // Vary left position slightly for natural look
     scale: 0.18 + (index % 4) * 0.01 // Vary scale between 0.18-0.21
   }));

   // Generate bush positions dynamically
   const bushPositions = Array.from({ length: 5 }, (_, index) => ({
     top: -230, // Static top position
     left: 100 + (index * -30), // Start at 100px, decrement by 30px
     scale: 0.1 // Static scale
   }));


  
  return (
    <div>
         <div className={Classes.backdropWrapper}></div>
         <div className={Classes.treeContainer}>
            <div className={Classes.BottomLeftGroup}>
              {treePositions.map((position, index) => (
                <img 
                  key={index}
                  src={treeImg} 
                  alt="Tree" 
                  style={{
                    position: 'absolute', 
                    top: `${position.top}px`, 
                    left: `${position.left}px`, 
                    transform: `scale(${position.scale})`, 
                    zIndex: 1
                  }} 
                />
              ))}
            </div>
            <div className={Classes.BottomLeftGroup} style={{backgroundColor: 'red'}}>
              {bottomRightTreePositions.map((position, index) => (
                <img 
                  key={index}
                  src={treeImg} 
                  alt="Tree" 
                  style={{
                    position: 'absolute', 
                    top: `${position.top}px`, 
                    left: `${position.left}px`, 
                    transform: `scale(${position.scale})`, 
                    zIndex: 1
                  }} 
                />
              ))}
            </div>
            <div className={Classes.BottomLeftGroup} style={{backgroundColor: 'red'}}>
              {bottomLeftTreePositions.map((position, index) => (
                <img 
                  key={index}
                  src={treeImg} 
                  alt="Tree" 
                  style={{
                    position: 'absolute', 
                    top: `${position.top}px`, 
                    left: `${position.left}px`, 
                    transform: `scale(${position.scale})`, 
                    zIndex: 1
                  }} 
                />
              ))}
            </div>
                   </div>
          <div className={Classes.bushContainer}>
            {bushPositions.map((position, index) => (
              <img 
                key={index}
                src={bushImg} 
                alt="bush" 
                style={{
                  position: 'absolute', 
                  top: `${position.top}px`, 
                  left: `${position.left}px`, 
                  transform: `scale(${position.scale})`, 
                  zIndex: 1
                }} 
              />
            ))}
          </div>
          <div className={Classes.Lamp}>
            <img src={lampImg} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "100px", 
                    left: "60px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "-100px", 
                    left: "60px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "300px", 
                    left: "60px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "500px", 
                    left: "60px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                  <img src={lampImg2} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "-150px", 
                    left: "80px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg2} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "-1px", 
                    left: "80px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg2} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "200px", 
                    left: "80px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={lampImg2} alt="Lamp"  style={{
                    position: 'absolute', 
                    top: "400px", 
                    left: "80px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />



          </div>
          <div className={Classes.bench}>
          <img src={benchImg} alt="bench"  style={{
                    position: 'absolute', 
                    top: "275px", 
                    left: "100px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                  <img src={benchImg} alt="bench"  style={{
                    position: 'absolute', 
                    top: "275px", 
                    right: "150px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                   <img src={benchImg} alt="bench"  style={{
                    position: 'absolute', 
                    top: "275px", 
                    left: "100px", 
                    transform: `scale(0.2)`, 
                    zIndex: 1
                  }} />
                  <img src={benchImg} alt="bench"  style={{
                    position: 'absolute', 
                    top: "400px", 
                    left: "60px", 
                    transform: `scale(0.2) rotate(90deg)`, 
                    zIndex: 1
                  }} />
          </div>
    <div className={Classes.sceenWrapper}>
        
      <div className={Classes.flex}>
        <div className={Classes.gameParlour}>
          <img src={gameParlourImg} alt="game Parlour 🎳" onClick={() => navigate("/game-parlour")} style={{height: '150px', width: 'auto'}} />
        </div>
        <div className={Classes.stallArea}>
          <div className={Classes.westernStore}>
            <img src={westernImg} alt="Western Store" onClick={() => navigate("/western-store")} style={{height: '150px', width: 'auto'}} />
          </div>
          <div className={Classes.ethinicStore}>
            <img src={ethinicImg} alt="Ethinic Store" onClick={() => navigate("/ethinic-store")} style={{height: '150px', width: 'auto'}} />
          </div>
        </div>
      </div>
      <div className={Classes.flex}>
        <div className={Classes.park}>
          <img src={billBoardImg} alt="Billboard" style={{transform: 'scale(0.25) translate(-15px, -600px)'}} />
        </div>
        <div className={Classes.homeDecor}>
          <img src={homeDecorImg} alt="Home Decor Store" onClick={() => navigate("/home-decor")} style={{height: '150px', width: 'auto'}} />
        </div>
        <MetaScreen />
      </div>
    </div>
    
    {/* Movable Agent */}
    <div 
      className={Classes.agent}
      style={{
        position: 'absolute',
        left: `${agentPosition.x}px`,
        top: `${agentPosition.y}px`,
        zIndex: 10,
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <img 
        src={playerImg} 
        alt="Player Agent" 
        style={{ width: '60px', height: '40px' }} 
      />
    </div>
    
    {/* Enter CTA - Shows when hovering over stores */}
    {hoveredStore && (
      <div 
        className={Classes.enterCTA}
        style={{
          position: 'absolute',
          left: `${agentPosition.x + 70}px`,
          top: `${agentPosition.y - 10}px`,
          zIndex: 15
        }}
      >
        <button 
          className={Classes.enterButton}
          onClick={handleEnterStore}
        >
          ENTER
        </button>
      </div>
    )}

    {/* D-Pad Overlay */}
    <div className={Classes.dpadOverlay}>
      <div className={Classes.dpad}>
        {/* Up Button */}
        <button 
          className={`${Classes.dpadButton} ${Classes.dpadUp}`}
          onMouseDown={() => moveAgent('up')}
          onTouchStart={() => moveAgent('up')}
        >
          ▲
        </button>
        
        {/* Left Button */}
        <button 
          className={`${Classes.dpadButton} ${Classes.dpadLeft}`}
          onMouseDown={() => moveAgent('left')}
          onTouchStart={() => moveAgent('left')}
        >
          ◀
        </button>
        
        {/* Center (inactive) */}
        <div className={Classes.dpadCenter}></div>
        
        {/* Right Button */}
        <button 
          className={`${Classes.dpadButton} ${Classes.dpadRight}`}
          onMouseDown={() => moveAgent('right')}
          onTouchStart={() => moveAgent('right')}
        >
          ▶
        </button>
        
        {/* Down Button */}
        <button 
          className={`${Classes.dpadButton} ${Classes.dpadDown}`}
          onMouseDown={() => moveAgent('down')}
          onTouchStart={() => moveAgent('down')}
        >
          ▼
        </button>
      </div>
    </div>
    </div>
  );

};

const MetaScreen = () => {
  return (
    <>
   
      <div className={Classes.metaScreen}>
        <div className={Classes.roadHorizontal}></div>
        <div className={Classes.roadVertical}></div>
      </div>
      <div className={Classes.metaScreen2}>
        <div className={Classes.crossRoad}>

        </div>
      </div>
    </>
  );
};

export default HomeScreen;
