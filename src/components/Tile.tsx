import Image from "next/image";
import React from "react";

const Tile = () => {
  return (
    <div className="tile-section">
      
      <div className="tile-header">
        <h2 className="section-title">Our <span className="highlight">Gallery</span></h2>
      </div>

      <div className="tile-grid">
        
        {/* --- 1. TALL LEFT IMAGE (Spans 2 Rows) --- */}
        <div className="tile-item tall-item">
          <Image
            src="/Assets/Tile/T1.jpg"
            alt="Honey Product"
            width={400}
            height={800}
            className="tile-img"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

        {/* --- 2. SMALL MID TOP LEFT --- */}
        <div className="tile-item">
          <Image
            src="/Assets/Tile/T2.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className="tile-img"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

        {/* --- 3. SMALL MID TOP RIGHT --- */}
        <div className="tile-item">
          <Image
            src="/Assets/Tile/T3.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className="tile-img"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

        {/* --- 4. TOP RIGHT IMAGE --- */}
        <div className="tile-item">
          <Image
            src="/Assets/Tile/T6.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className="tile-img"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

        {/* --- 5. WIDE MIDDLE BOTTOM (Spans 2 Columns) --- */}
        <div className="tile-item wide-item">
          <Image
            src="/Assets/Tile/T5.jpg"
            alt="Honey Product"
            width={600}
            height={300}
            className="tile-img"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

        {/* --- 6. BOTTOM RIGHT IMAGE --- */}
        <div className="tile-item">
          <Image
            src="/Assets/Tile/T4.jpg"
            alt="Honey Product"
            width={300}
            height={300}
            className="tile-img"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="overlay"><span className="plus">+</span></div>
        </div>

      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .tile-section {
          --brand-gold: #f59e0b;
          --cream-bg: #fffbeb;
          --gap: 20px;
          
          width: 100%;
          padding: 60px 24px;
          background-color: var(--cream-bg);
        }

        .tile-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          color: #1c1917;
          margin: 0;
        }

        .highlight {
          color: var(--brand-gold);
          font-style: italic;
        }

        /* --- THE BENTO GRID --- */
        .tile-grid {
          display: grid;
          /* Desktop: 4 Equal Columns */
          grid-template-columns: repeat(4, 1fr);
          /* Fixed row height guarantees alignment */
          grid-auto-rows: 320px; 
          gap: var(--gap);
          max-width: 1400px;
          margin: 0 auto;
        }

        /* --- GRID SPANS (The Puzzle Logic) --- */
        
        /* Default item spans 1 col, 1 row */
        .tile-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        /* Tall Item: Spans 2 Rows (Left) */
        .tall-item {
          grid-row: span 2;
        }

        /* Wide Item: Spans 2 Columns (Center Bottom) */
        .wide-item {
          grid-column: span 2;
        }

        /* --- IMAGE STYLING --- */
        /* Forces image to fill the grid cell perfectly */
        :global(.tile-img) {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Crucial for gapless layout */
          display: block;
          transition: transform 0.6s ease;
        }

        /* --- HOVER EFFECTS --- */
        .tile-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
          border-color: var(--brand-gold);
          z-index: 2;
        }

        .tile-item:hover :global(.tile-img) {
          transform: scale(1.08);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tile-item:hover .overlay {
          opacity: 1;
        }

        .plus {
          color: white;
          font-size: 40px;
          font-weight: 300;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        /* ========================================= */
        /* RESPONSIVE BREAKPOINTS                    */
        /* ========================================= */

        /* Tablet (iPad): Switch to 2 Columns */
        @media (max-width: 1024px) {
          .tile-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 300px;
          }

          /* Reset desktop spans */
          .tall-item {
            grid-row: span 2; /* Keep tall */
          }
          
          .wide-item {
            grid-column: span 2; /* Full width on tablet */
          }
        }

        /* Mobile: 1 Column */
        @media (max-width: 600px) {
          .tile-section {
            padding: 40px 16px;
          }

          .tile-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 350px; /* Taller rows for mobile impact */
            gap: 16px;
          }

          /* Reset all spans for vertical stack */
          .tall-item, .wide-item {
            grid-row: span 1;
            grid-column: span 1;
          }
          
          .section-title {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Tile;