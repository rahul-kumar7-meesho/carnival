import React from "react";
import Classes from "./HomeScreen.module.css";
import { useNavigate } from "react-router-dom";
import gameParlourImg from "../../../assets/images/game_parlour.png";
import westernImg from "../../../assets/images/western.png";
import ethinicImg from "../../../assets/images/ethinic.png";
import homeDecorImg from "../../../assets/images/home_decor.png";
import billBoardImg from "../../../assets/images/billBoard.png";
import treeImg from "../../../assets/images/tree.png";
import bushImg from "../../../assets/images/bush_main.png";

const HomeScreen = () => {
  const navigate = useNavigate();
  
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
