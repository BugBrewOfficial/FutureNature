import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Banner.module.scss";

export default function Banner() {
  const product = {
    title: "FOREST HONEY",
    tamilTitle: "(மலை தேன்)",
    weight: "250gms",
    price: "1500/-",
    image: "/Assets/Products/1.png" 
  };

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerCard}>
        
        {/* --- Background Pattern --- */}
        <div className={styles.hexPattern}></div>

        {/* --- LEFT SIDE: Text Only --- */}
        <div className={styles.leftContent}>
          <h2 className={styles.subHeading}>LIMITED-TIME</h2>
          <h1 className={styles.mainHeading}>BUZZ!</h1>
          <div className={styles.ctaBadge}>
            TASTE THE SAVINGS
          </div>
        </div>

        {/* --- CENTER: The Flying Bee --- */}
        {/* Placed in the center empty space */}
        <div className={styles.flyingBee}>
          <div className={styles.beeContainer}>
            {/* Dashed Flight Path Trail */}
            <div className={styles.flightTrail}></div>
            
            <svg viewBox="0 0 100 100" className={styles.beeSvg}>
              {/* Wings (Back) - Fluttering */}
              <g className={styles.wingBack}>
                <ellipse cx="65" cy="35" rx="15" ry="25" fill="#E0F7FA" opacity="0.8" transform="rotate(-30 65 35)" />
              </g>
              
              {/* Body */}
              <ellipse cx="50" cy="50" rx="30" ry="22" fill="#FFD700" /> {/* Yellow Body */}
              
              {/* Stripes */}
              <path d="M40 30 Q45 50 40 70" stroke="#333" strokeWidth="6" fill="none" />
              <path d="M60 30 Q65 50 60 70" stroke="#333" strokeWidth="6" fill="none" />
              
              {/* Stinger */}
              <path d="M20 50 L10 55 L20 60 Z" fill="#333" />

              {/* Face */}
              <circle cx="70" cy="45" r="3" fill="#333" /> {/* Eye */}
              <path d="M72 55 Q75 58 78 55" stroke="#333" strokeWidth="2" fill="none" /> {/* Smile */}
              <path d="M65 28 L55 10" stroke="#333" strokeWidth="2" /> {/* Antenna 1 */}
              <path d="M75 28 L85 10" stroke="#333" strokeWidth="2" /> {/* Antenna 2 */}

              {/* Wings (Front) - Fluttering */}
              <g className={styles.wingFront}>
                <ellipse cx="55" cy="35" rx="15" ry="25" fill="#B3E5FC" opacity="0.9" transform="rotate(-10 55 35)" />
              </g>
            </svg>
          </div>
        </div>

        {/* --- RIGHT SIDE: Product Pod --- */}
        <div className={styles.productPod}>
          <div className={styles.podContent}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <span className={styles.tamilTitle}>{product.tamilTitle}</span>
            <span className={styles.weight}>{product.weight}</span>
          </div>

          <div className={styles.priceTag}>
            <span className={styles.rupee}>₹</span>{product.price}
          </div>

          <div className={styles.imageCircle}>
            <Image 
              src={product.image} 
              alt="Honey" 
              width={200} 
              height={200} 
              className={styles.realImg}
            />
          </div>
        </div>

        {/* --- PAGINATION DOTS --- */}
        <div className={styles.pagination}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={`${styles.dot} ${styles.active}`}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
        </div>

      </div>
    </div>
  );
}