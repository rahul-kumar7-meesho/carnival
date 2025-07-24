import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PixelNavigation.module.css";

interface PixelNavigationProps {
  shopTitle: string;
  shopIcon: string;
  coins?: number;
}

const PixelNavigation: React.FC<PixelNavigationProps> = ({ 
  shopTitle, 
  shopIcon, 
  coins = 1250 
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.pixelNavbar}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        <span className={styles.backIcon}>◀</span>
        <span className={styles.backText}>HOME</span>
      </button>
      <div className={styles.shopTitle}>
        <span className={styles.shopIcon}>{shopIcon}</span>
        <span>{shopTitle}</span>
      </div>
      <div className={styles.navStats}>
        <span className={styles.statIcon}>💰</span>
        <span>{coins}</span>
      </div>
    </div>
  );
};

export default PixelNavigation; 