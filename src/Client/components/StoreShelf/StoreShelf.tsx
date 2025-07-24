import React from "react";
import styles from "./StoreShelf.module.css";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

interface Product {
  id: string | number;
  image_url: string;
  product_name: string;
  product_price: string | number;
}

interface StoreShelfProps {
  title: string;
  products: Product[];
  shelfColor?: string;
}

const StoreShelf: React.FC<StoreShelfProps> = ({ 
  title, 
  products, 
  shelfColor = "#8B4513" 
}) => {
  return (
    <div className={styles.shelfContainer}>
      <div className={styles.shelfHeader}>
        <h2 className={styles.shelfTitle}>{title}</h2>
      </div>
      <div 
        className={styles.shelfBoard} 
        style={{ backgroundColor: shelfColor }}
      >
        <div className={styles.shelfEdge}></div>
      </div>
      <div className={styles.productsArea}>
        {products.length > 0 ? (
          <ProductCarousel products={products} />
        ) : (
          <div className={styles.emptyShelf}>
            <p>No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreShelf; 