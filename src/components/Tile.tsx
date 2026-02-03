import Image from "next/image";
import React from "react";
import styles from "../styles/Tile.module.scss";

const Tile = () => {
  return (
    <div className={styles.tileSection}>

      <div className={styles.tileHeader}>
        <h2 className={styles.sectionTitle}>Our <span className={styles.highlight}>Gallery</span></h2>
      </div>

      <div className={styles.tileGrid}>

        {/* --- 1. TALL LEFT IMAGE (Spans 2 Rows) --- */}
        <div className={`${styles.tileItem} ${styles.tallItem}`}>
          <Image
            src="/Assets/Tile/T1.jpg"
            alt="Honey Product"
            width={400}
            height={800}
            className={styles.tileImg}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

        {/* --- 2. SMALL MID TOP LEFT --- */}
        <div className={styles.tileItem}>
          <Image
            src="/Assets/Tile/T2.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className={styles.tileImg}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

        {/* --- 3. SMALL MID TOP RIGHT --- */}
        <div className={styles.tileItem}>
          <Image
            src="/Assets/Tile/T3.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className={styles.tileImg}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

        {/* --- 4. TOP RIGHT IMAGE --- */}
        <div className={styles.tileItem}>
          <Image
            src="/Assets/Tile/T6.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className={styles.tileImg}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

        {/* --- 5. WIDE MIDDLE BOTTOM (Spans 2 Columns) --- */}
        <div className={`${styles.tileItem} ${styles.wideItem}`}>
          <Image
            src="/Assets/Tile/T5.jpg"
            alt="Honey Product"
            width={600}
            height={300}
            className={styles.tileImg}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

        {/* --- 6. BOTTOM RIGHT IMAGE --- */}
        <div className={styles.tileItem}>
          <Image
            src="/Assets/Tile/T4.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className={styles.tileImg}
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className={styles.overlay}><span className={styles.plus}>+</span></div>
        </div>

      </div>
    </div>
  );
};

export default Tile;