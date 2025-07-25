import React from "react";
import styles from "./TryOnResult.module.css";

interface TryOnResultProps {
  originalImage: string;
  productName: string;
  onBack: () => void;
  onTryAgain: () => void;
}

const TryOnResult: React.FC<TryOnResultProps> = ({ 
  originalImage, 
  productName, 
  onBack, 
  onTryAgain 
}) => {
  return (
    <div className={styles.tryOnResult}>
      <div className={styles.header}>
        <h2>Try-On Result</h2>
        <p>Here's how {productName} looks on you!</p>
      </div>

      <div className={styles.resultContainer}>
        <div className={styles.imageComparison}>
          {/* Original Image */}
          <div className={styles.imageSection}>
            <h3>Your Photo</h3>
            <div className={styles.imageWrapper}>
              <img 
                src={originalImage} 
                alt="Your uploaded photo" 
                className={styles.resultImage}
              />
            </div>
          </div>

          {/* Try-On Result - Placeholder for now */}
          <div className={styles.imageSection}>
            <h3>Try-On Result</h3>
            <div className={styles.imageWrapper}>
              <div className={styles.placeholderResult}>
                <div className={styles.placeholderIcon}>✨</div>
                <h4>AI Processing...</h4>
                <p>Your try-on result will appear here</p>
                <div className={styles.processingAnimation}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.resultActions}>
          <button 
            className={styles.backButton} 
            onClick={onBack}
          >
            ← Back to Product
          </button>
          <button 
            className={styles.tryAgainButton} 
            onClick={onTryAgain}
          >
            🔄 Try Different Photo
          </button>
          <button 
            className={styles.downloadButton}
            disabled
          >
            📥 Download Result
          </button>
        </div>

        <div className={styles.resultInfo}>
          <div className={styles.infoCard}>
            <h4>🤖 AI-Powered Try-On</h4>
            <p>Our advanced AI technology analyzes your photo and virtually applies the selected product for a realistic preview.</p>
          </div>
          <div className={styles.infoCard}>
            <h4>📱 Share & Save</h4>
            <p>Love the result? Download the image or share it with friends to get their opinion!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnResult; 