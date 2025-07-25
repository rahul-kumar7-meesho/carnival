import React,{useEffect,useState} from "react";
import PixelNavigation from "../PixelNavigation/PixelNavigation";
import PixelShelf from "../PixelShelf/PixelShelf";
import meeraAgentImg from "../../../assets/images/meera_agent.png";
import styles from "./PixelShopLayout.module.css";
import { getFirstPrompt } from "../../utils/common.utils";

interface ShelfData {
  title: string;
  position: { x: number; y: number };
  shelfType: "wall" | "floor" | "corner";
}

interface PixelShopLayoutProps {
  shopTitle: string;
  shopIcon: string;
  shelves: ShelfData[];
  shopID: number;
  shopkeeperName?: string;
  backgroundGradient?: string;
  coins?: number;
  onShopkeeperClick?: (prompt: string) => void;
}

const PixelShopLayout: React.FC<PixelShopLayoutProps> = ({ 
  shopTitle, 
  shopIcon, 
  shopID,
  shelves, 
  shopkeeperName = "Meera",
  backgroundGradient,
  coins = 1250,
  onShopkeeperClick
}) => {

  const [firstPrompt, setFirstPrompt] = useState<string>("");
  useEffect(() => {
    const result = getFirstPrompt(shopID);
    setFirstPrompt(result);
  }, []);

  return (
    <div className={styles.gameShop} style={backgroundGradient ? { background: backgroundGradient } : {}}>
      <PixelNavigation 
        shopTitle={shopTitle} 
        shopIcon={shopIcon} 
        coins={coins}
      />

      <div className={styles.shopFloor}>
        {/* Pixel Shelves */}
        {shelves.map((shelf, index) => (
          <PixelShelf
            key={index}
            title={shelf.title}
            position={shelf.position}
            shelfType={shelf.shelfType}
          />
        ))}

        {/* Shopkeeper - Always Meera */}
        <div 
          className={styles.shopkeeper} 
          style={{ left: '50%', top: '80%', transform: 'translateX(-50%)' }}
          onClick={() => onShopkeeperClick(firstPrompt)}
        >
          <div className={styles.npcSprite}>
            <img src={meeraAgentImg} alt={shopkeeperName} className={styles.shopkeeperImage} />
          </div>
          <div className={styles.npcName}>{shopkeeperName}</div>
        </div>
      </div>
    </div>
  );
};

export default PixelShopLayout; 