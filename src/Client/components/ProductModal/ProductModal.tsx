import React from "react";
import styles from "./ProductModal.module.css";

interface Product {
  id: string | number;
  image_url: string;
  product_name: string;
  product_price: string | number;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img src={product.image_url} alt={product.product_name} />
          </div>
          <div className={styles.productDetails}>
            <h2>{product.product_name}</h2>
            <p className={styles.price}>${product.product_price}</p>
            <div className={styles.actionButtons}>
              <button className={styles.addToCartBtn}>Add to Cart</button>
              <button className={styles.buyNowBtn}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 