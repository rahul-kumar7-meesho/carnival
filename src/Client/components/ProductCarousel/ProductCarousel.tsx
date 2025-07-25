import React, { useState } from "react";
import styles from "./ProductCarousel.module.css";
import ProductModal from "../ProductModal/ProductModal";

interface Product {
  id: string | number;
  image_url: string;
  product_name: string;
  product_price: string | number;
}

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className={styles.productCarousel}>
        {products.map((product: Product) => (
          <div 
            key={product.id} 
            className={styles.productItem}
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image_url} alt={product.product_name} />
            <h3>{product.product_name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductCarousel; 