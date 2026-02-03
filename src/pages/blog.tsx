import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Data
const WELLNESS_BLENDS = [
  {
    id: 1,
    name: "GINGER HONEY",
    tagline: "The Energizer",
    description: "This blend is perfect for soothing sore throats, improving digestion, and warming the body. The bold combination of ginger and raw honey provides an energizing start to the day.",
    image: "/Assets/Tile/T1.jpg",
  },
  {
    id: 2,
    name: "GULKAND HONEY",
    tagline: "The Cooling Ritual",
    description: "A gentle fusion of rose petal preserve and raw honey. Gulkand naturally cools the system and supports digestion. Savor it as a calming evening ritual to promote tranquility.",
    image: "/Assets/Tile/T2.jpg",
  },
  {
    id: 3,
    name: "CAVITY HONEY",
    tagline: "Oral Defense",
    description: "Supports oral hygiene through selected ingredients. Perfect for oil pulling or daily use, promoting gum health and helping prevent tooth decay naturally.",
    image: "/Assets/Tile/T3.jpg",
  },
  {
    id: 4,
    name: "LEMON HONEY",
    tagline: "Immunity Spark",
    description: "Combining the freshness of lemon with the richness of raw honey. Perfect for boosting immunity and providing natural energy. A citrus twist for your morning tea.",
    image: "/Assets/Tile/T4.jpg",
  },
  {
    id: 5,
    name: "TURMERIC HONEY",
    tagline: "Golden Healer",
    description: "Known for its anti-inflammatory properties, turmeric honey is perfect for joint health and overall wellness. A perfect natural remedy for your body's defense system.",
    image: "/Assets/Tile/T5.jpg",
  },
  {
    id: 6,
    name: "BLACK SEED HONEY",
    tagline: "Respiratory Support",
    description: "Enriched with black seeds, this blend supports respiratory health and boosts immunity. Powerful natural wellness support with traditional herbs.",
    image: "/Assets/Tile/T6.jpg",
  },
  {
    id: 7,
    name: "CINNAMON HONEY",
    tagline: "Metabolic Balance",
    description: "Warm and aromatic, cinnamon honey helps with blood sugar balance and adds a delightful spice to your daily wellness routine.",
    image: "/Assets/Tile/T1.jpg",
  },
  {
    id: 8,
    name: "ASHWAGANDHA HONEY",
    tagline: "Stress Relief",
    description: "A powerful adaptogenic blend that helps manage stress and promotes mental clarity. Perfect for evening routines or whenever you need natural balance.",
    image: "/Assets/Tile/T2.jpg",
  },
  {
    id: 9,
    name: "BASIL HONEY",
    tagline: "Holy Vitality",
    description: "Holy basil infused honey promotes respiratory health and supports digestion. A sacred blend for holistic wellness and natural vitality.",
    image: "/Assets/Tile/T3.jpg",
  },
  {
    id: 10,
    name: "MULTIFLORAL HONEY",
    tagline: "Nature's Bouquet",
    description: "A blend of multiple flower nectars, offering diverse nutritional benefits. Perfect for those who want comprehensive wellness support from nature's bounty.",
    image: "/Assets/Tile/T4.jpg",
  },
  {
    id: 11,
    name: "EUCALYPTUS HONEY",
    tagline: "Breath of Life",
    description: "Perfect for respiratory support and clear breathing. This soothing blend is ideal for seasonal wellness and maintaining healthy airways naturally.",
    image: "/Assets/Tile/T5.jpg",
  },
  {
    id: 12,
    name: "HIBISCUS HONEY",
    tagline: "Heart Health",
    description: "Vibrant and energizing, hibiscus honey supports heart health and provides natural antioxidants. A delicious way to care for your cardiovascular wellness.",
    image: "/Assets/Tile/T6.jpg",
  },
  {
    id: 13,
    name: "APPLE CIDER HONEY",
    tagline: "Detox Blend",
    description: "Combining apple cider vinegar with raw honey, this blend supports digestion and detoxification. A powerful wellness tonic for daily use.",
    image: "/Assets/Tile/T1.jpg",
  },
  {
    id: 14,
    name: "BRAHMI HONEY",
    tagline: "Mind & Focus",
    description: "An ancient herb combined with honey for enhanced cognitive function and mental clarity. Perfect for students and professionals.",
    image: "/Assets/Tile/T2.jpg",
  },
  {
    id: 15,
    name: "SAFFRON HONEY",
    tagline: "Royal Glow",
    description: "A luxurious blend infused with the finest saffron threads. Known for promoting skin health, improving mood, and providing premium wellness support.",
    image: "/Assets/Tile/T3.jpg",
  },
  {
    id: 16,
    name: "FLORAL BLEND",
    tagline: "Pure Essence",
    description: "A premium selection of the finest floral honeys combined for ultimate wellness benefits. Perfect for those seeking the best of nature's offerings.",
    image: "/Assets/Tile/T4.jpg",
  },
];

export default function Blog() {
  return (
    <>
      <Head>
        <title>The Wellness Journal - FutureNature</title>
        <meta name="description" content="Discover the healing benefits of our herbal honey blends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="page-wrapper">
        <Navbar />

        {/* --- 1. COMPACT HEADER --- */}
        <header className="page-header">
          <div className="container">
            <span className="eyebrow">THE WELLNESS JOURNAL</span>
            <h1 className="main-title">Nature’s Apothecary</h1>
            <p className="main-desc">Pure, handcrafted blends for modern wellness.</p>
          </div>
        </header>

        {/* --- 2. COMPACT CARD GRID --- */}
        <section className="catalog-section">
          <div className="container">
            <div className="card-list">
              
              {WELLNESS_BLENDS.map((item, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <div key={item.id} className={`product-card ${isEven ? 'normal' : 'reverse'}`}>
                    
                    {/* Image Side */}
                    <div className="card-media">
                      <div className="img-container">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="cover-img"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    </div>

                    {/* Text Side */}
                    <div className="card-body">
                      <div className="card-content">
                        <div className="tag-row">
                          <span className="id-badge">#{item.id}</span>
                          <span className="category-tag">{item.tagline}</span>
                        </div>
                        
                        <h2 className="card-title">{item.name}</h2>
                        <p className="card-desc">{item.description}</p>
                        
                        <div className="card-footer">
                          <button className="shop-link">
                            View Details 
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* --- 3. FOOTER CTA --- */}
        <section className="footer-cta">
          <div className="container">
            <h2 className="cta-title">Start your journey to better health.</h2>
            <a href="/products" className="shop-btn">Visit The Shop</a>
          </div>
        </section>

      </div>
      <Footer />

      <style jsx>{`
        /* --- VARIABLES --- */
        .page-wrapper {
          --gold: #d97706;
          --cream: #fffbeb;
          --sand: #fafaf9;
          --dark: #1c1917;
          --gray: #57534e;
          
          font-family: 'Inter', sans-serif;
          background-color: #ffffff;
          color: var(--dark);
        }

        h1, h2 { font-family: 'Playfair Display', serif; }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* --- HEADER --- */
        .page-header {
          padding: 100px 0 60px;
          text-align: center;
          background: linear-gradient(to bottom, var(--cream), #fff);
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 2px;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .main-title {
          font-size: 48px;
          color: var(--dark);
          margin: 0 0 16px;
        }

        .main-desc {
          font-size: 16px;
          color: var(--gray);
        }

        /* --- CARD LIST --- */
        .catalog-section {
          padding-bottom: 100px;
        }

        .card-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* --- PRODUCT CARD --- */
        .product-card {
          display: flex;
          background: #fff;
          border: 1px solid #e7e5e4;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 320px;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          border-color: var(--gold);
        }

        .product-card.reverse {
          flex-direction: row-reverse;
        }

        /* --- IMAGE SIDE --- */
        .card-media {
          flex: 0 0 40%;
          position: relative;
          background-color: var(--sand);
        }

        .img-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* --- IMAGE ALIGNMENT FIX --- */
        :global(.cover-img) {
          object-fit: cover;
          /* Add object-position: top to prioritize the top of the image */
          object-position: top center; 
          transition: transform 0.5s ease;
        }

        .product-card:hover :global(.cover-img) {
          transform: scale(1.05);
        }

        /* --- BODY SIDE --- */
        .card-body {
          flex: 1;
          padding: 40px;
          display: flex;
          align-items: center;
        }

        .card-content {
          width: 100%;
        }

        .tag-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .id-badge {
          font-size: 12px;
          font-weight: 700;
          color: #d6d3d1;
        }

        .category-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gold);
          background: rgba(217, 119, 6, 0.08);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .card-title {
          font-size: 32px;
          margin: 0 0 16px;
          color: var(--dark);
          line-height: 1.1;
        }

        .card-desc {
          font-size: 15px;
          line-height: 1.6;
          color: var(--gray);
          margin-bottom: 24px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shop-link {
          background: none;
          border: none;
          padding: 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--dark);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: gap 0.3s;
        }

        .shop-link:hover {
          gap: 12px;
          color: var(--gold);
        }

        /* --- FOOTER CTA --- */
        .footer-cta {
          text-align: center;
          padding: 80px 24px;
          background: var(--sand);
        }
        
        .cta-title {
          font-size: 36px;
          margin-bottom: 24px;
        }

        .shop-btn {
          display: inline-block;
          background: var(--dark);
          color: #fff;
          padding: 16px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s;
        }
        
        .shop-btn:hover {
          background: var(--gold);
        }

        /* ========================================= */
        /* MOBILE RESPONSIVE                         */
        /* ========================================= */
        @media (max-width: 768px) {
          .product-card, .product-card.reverse {
            flex-direction: column;
            min-height: auto;
          }

          .card-media {
            height: 250px;
            flex: none;
            width: 100%;
          }

          .card-body {
            padding: 24px;
          }

          .card-title {
            font-size: 24px;
          }

          .card-desc {
            -webkit-line-clamp: 4;
          }
          
          .main-title {
             font-size: 36px;
          }
        }
      `}</style>
    </>
  );
}