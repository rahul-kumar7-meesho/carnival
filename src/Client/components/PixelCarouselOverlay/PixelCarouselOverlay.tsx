import React from "react";
import styles from "./PixelCarouselOverlay.module.css";
import ProductCarousel from "../ProductCarousel/ProductCarousel";

interface Product {
  id: string | number;
  image_url: string;
  product_name: string;
  product_price: string | number;
}

interface PixelCarouselOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  products: Product[];
}

const PixelCarouselOverlay: React.FC<PixelCarouselOverlayProps> = ({
  isOpen,
  onClose,
  title,
  products
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.overlayContent}>
        {/* 8-bit Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.shopIcon}>🏪</span>
            <h2>{title}</h2>
            <div className={styles.productCounter}>
              Items: {products.length}
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusItem}>
            <span className={styles.statusIcon}>💰</span>
            <span>Shopping Mode</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusIcon}>🎮</span>
            <span>Browse & Buy</span>
          </div>
        </div>

        {/* Product Carousel Container */}
        <div className={styles.carouselContainer}>
          <div className={styles.carouselFrame}>
            {products.length > 0 ? (
              <ProductCarousel products={products} />
            ) : (
              <div className={styles.emptyShelf}>
                <div className={styles.emptyIcon}>📦</div>
                <h3>Shelf Empty!</h3>
                <p>This shelf is currently being restocked.</p>
                <p>Check back later for new items!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className={styles.footer}>
          <div className={styles.controls}>
            <button className={styles.controlButton}>
              <span>⬅️ Prev Shelf</span>
            </button>
            <button className={styles.controlButton} onClick={onClose}>
              <span>🚪 Exit Shop</span>
            </button>
            <button className={styles.controlButton}>
              <span>Next Shelf ➡️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelCarouselOverlay; 