import { useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "Fresh Harvest",
      title: "Forest Honey",
      tamilTitle: "மலை தேன்",
      description: "100% Raw & Unprocessed.",
      weight: "250gms",
      price: "₹1500",
      image: "/Assets/Products/1.png"
    }
  ];

  const totalSlides = 1; 
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="banner-wrapper">
      <div className="banner-card">
        
        {/* --- Background Pattern --- */}
        <div className="bg-pattern"></div>

        {/* --- NAVIGATION ARROWS --- */}
        <button onClick={prevSlide} className="nav-arrow prev" aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        
        <button onClick={nextSlide} className="nav-arrow next" aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <div className="banner-content">
          
          {/* --- LEFT: Text Content --- */}
          <div className="text-col">
            <div className="tag-row">
              <span className="badge">{slides[0].tag}</span>
            </div>

            <h1 className="title">
              {slides[0].title}
              <span className="tamil"> / {slides[0].tamilTitle}</span>
            </h1>

            <p className="desc">{slides[0].description}</p>

            <div className="price-row">
              <span className="price">{slides[0].price}</span>
              <span className="divider">|</span>
              <span className="weight">{slides[0].weight}</span>
            </div>

            <div className="btn-row">
              <button className="shop-btn">Add to Cart</button>
            </div>
          </div>

          {/* --- RIGHT: Image with Organic Shape --- */}
          <div className="image-col">
            <div className="image-stack">
              <div className="organic-blob"></div>
              
              <div className="img-container">
                <Image
                  src={slides[0].image}
                  alt={slides[0].title}
                  width={280}
                  height={320}
                  className="product-img"
                  priority
                />
              </div>
              
              <div className="discount-pill">-10%</div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .banner-wrapper {
          --brand: #f59e0b;
          --brand-light: #fef3c7;
          --brand-dark: #b45309;
          --text-main: #1c1917;
          --text-gray: #57534e;
          
          width: 100%;
          padding: 40px 24px;
          display: flex;
          justify-content: center;
          background-color: #fff;
        }

        .banner-card {
          width: 100%;
          max-width: 1100px;
          background-color: #fff;
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 1px solid #f3f4f6;
        }

        .bg-pattern {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, var(--brand-light) 100%);
          opacity: 0.6;
          z-index: 0;
        }

        /* Arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #e5e7eb;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .nav-arrow:hover {
          background: var(--brand);
          color: #fff;
          border-color: var(--brand);
        }
        .prev { left: 20px; }
        .next { right: 20px; }

        .banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          padding: 50px 80px; 
          gap: 40px;
        }

        /* Text Column */
        .text-col {
          flex: 1;
          max-width: 500px;
        }

        .badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--brand);
          background: #fff;
          border: 1px solid var(--brand-light);
          padding: 6px 14px;
          border-radius: 50px;
          margin-bottom: 20px;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          line-height: 1.1;
          color: var(--text-main);
          margin: 0 0 16px 0;
          font-weight: 700;
        }

        .tamil {
          font-family: sans-serif;
          font-size: 24px;
          font-weight: 400;
          color: var(--text-gray);
        }

        .desc {
          font-size: 16px;
          color: var(--text-gray);
          margin-bottom: 30px;
        }

        .price-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
          font-family: 'Playfair Display', serif;
        }

        .price {
          font-size: 32px;
          font-weight: 700;
          color: var(--brand);
        }

        .divider {
          color: #d1d5db;
          font-size: 24px;
          font-weight: 300;
        }

        .weight {
          font-size: 18px;
          color: var(--text-main);
          font-weight: 600;
        }

        .shop-btn {
          background-color: var(--brand);
          color: #fff;
          border: none;
          padding: 14px 40px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.25);
        }

        .shop-btn:hover {
          background-color: var(--brand-dark);
          transform: translateY(-2px);
        }

        /* Image Column */
        .image-col {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .image-stack {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .organic-blob {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #fff7ed;
          border-radius: 48% 52% 68% 32% / 42% 28% 72% 58%;
          z-index: 1;
          animation: morph 8s ease-in-out infinite;
        }

        @keyframes morph {
          0% { border-radius: 48% 52% 68% 32% / 42% 28% 72% 58%; }
          50% { border-radius: 35% 65% 45% 55% / 35% 45% 55% 65%; }
          100% { border-radius: 48% 52% 68% 32% / 42% 28% 72% 58%; }
        }

        .img-container {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 4s ease-in-out infinite;
          padding: 20px; 
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        :global(.product-img) {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 32px; 
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.15));
        }

        .discount-pill {
          position: absolute;
          top: 0;
          right: 20px;
          background: var(--text-main);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
          z-index: 3;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* ================= MOBILE & TABLET RESPONSIVE ================= */
        @media (max-width: 960px) {
          .banner-wrapper {
            padding: 16px 12px;
          }

          .banner-card {
            border-radius: 20px;
          }

          /* Force Side-by-Side Layout */
          .banner-content {
            flex-direction: row; /* Keep Row */
            padding: 20px 30px; /* Reduced padding, keeping room for arrows */
            gap: 10px;
            align-items: center;
          }

          /* Adjust Arrows position for small screens */
          .nav-arrow {
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.9);
          }
          .prev { left: 2px; }
          .next { right: 2px; }

          /* TEXT SIDE SCALING */
          .text-col {
            flex: 1.2; /* Give text slightly more space */
            text-align: left;
            align-items: flex-start;
          }

          .badge {
            font-size: 9px;
            padding: 4px 8px;
            margin-bottom: 8px;
          }

          .title {
            font-size: 22px; /* Much smaller font */
            margin-bottom: 4px;
          }

          .tamil {
            font-size: 14px;
            display: inline;
          }

          .desc {
            font-size: 11px;
            margin-bottom: 12px;
            line-height: 1.4;
            /* Clamp description to 2 lines to save space */
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .price-row {
            gap: 8px;
            margin-bottom: 12px;
          }

          .price {
            font-size: 20px;
          }

          .divider { font-size: 16px; }
          .weight { font-size: 13px; }

          .shop-btn {
            padding: 8px 16px;
            font-size: 12px;
            border-radius: 8px;
          }

          /* IMAGE SIDE SCALING */
          .image-col {
            flex: 0.8; /* Image takes slightly less space */
            display: flex;
            justify-content: center;
          }

          .image-stack {
            width: 130px; /* Force image stack to be small */
            height: 130px;
          }

          .img-container {
            padding: 10px;
          }

          .discount-pill {
            font-size: 9px;
            padding: 4px 8px;
            right: 0;
            top: -5px;
          }
        }
      `}</style>
    </div>
  );
}