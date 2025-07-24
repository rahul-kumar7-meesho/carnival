import React from "react";
import styles from "./PixelShelf.module.css";

interface PixelShelfProps {
  title: string;
  position: { x: number; y: number };
  shelfType: "wall" | "floor" | "corner";
}

const PixelShelf: React.FC<PixelShelfProps> = ({ 
  title, 
  position, 
  shelfType
}) => {
  // 8-bit item representations based on category
  const getItemDisplay = () => {
    switch (title) {
      // Ethnic Store Items
      case "Sarees":
        return ["👘", "👘", "👘"];
      case "Kurtas":
        return ["👔", "👔", "👕"];
      case "Wedding":
        return ["💒", "👗", "🤵"];
      case "Festive":
        return ["🎊", "👗", "🎉"];
      case "Lehengas":
        return ["👗", "👗", "💃"];
      
      // Western Store Items
      case "Jeans":
        return ["👖", "👖", "👖"];
      case "T-Shirts":
        return ["👕", "👕", "👕"];
      case "Jackets":
        return ["🧥", "🧥", "🧥"];
      case "Dresses":
        return ["👗", "👗", "👗"];
      case "Accessories":
        return ["👜", "👒", "👟"];
      
      // Home Decor Store Items
      case "Furniture":
        return ["🪑", "🛏️", "🛋️"];
      case "Lighting":
        return ["💡", "🕯️", "🏮"];
      case "Rugs":
        return ["🟫", "🟤", "🟫"];
      case "Plants":
        return ["🪴", "🌱", "🌿"];
      case "Art & Decor":
        return ["🖼️", "🏺", "🗿"];
      
      default:
        return ["📦", "📦", "📦"];
    }
  };

  return (
    <div 
      className={`${styles.pixelShelf} ${styles[shelfType]}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%` 
      }}
    >
      <div className={styles.shelfBase}>
        <div className={styles.shelfShadow}></div>
        <div className={styles.shelfBody}>
          <div className={styles.itemDisplay}>
            {getItemDisplay().map((item, index) => (
              <div key={index} className={styles.itemIcon}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={styles.shelfLabel}>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default PixelShelf; 