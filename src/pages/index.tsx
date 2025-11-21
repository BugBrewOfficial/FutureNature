import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import DailyDeals from "./components/DailyDeals";
import WhatsAppBanner from "./components/WhatsAppBanner";
import Footer from "./components/Footer";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processes = [
    {
      title: "Honey Treatment",
      description: "Honey treatment enhances texture, removes impurities, preserves its golden essence.",
      icon: "🍯"
    },
    {
      title: "Bee Keeping",
      description: "Beekeeping is the art of nurturing bees to create nature's purest honey.",
      icon: "🏺"
    },
    {
      title: "Honey Shop",
      description: "A honey shop is where nature's sweetness meets pure craftsmanship.",
      icon: "🛒"
    },
    {
      title: "Flower Produce",
      description: "Flowers produce nectar, the natural source of sweetness for bees and honey.",
      icon: "🌸"
    },
    {
      title: "Home Delivery",
      description: "Enjoy the sweetness of nature with our fast and safe home delivery.",
      icon: "🏠"
    },
    {
      title: "Honey Production",
      description: "Bees craft honey inside the hive, turning nature's nectar into liquid gold.",
      icon: "🍯"
    }
  ];

  return (
    <>
      <Head>
        <title>FutureNature - Home</title>
        <meta name="description" content="Welcome to FutureNature" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />
        <Banner />
        <DailyDeals />
        <WhatsAppBanner />
        
        {/* Honey Products Showcase Section */}
        <div style={{
          padding: '80px 20px',
          backgroundColor: '#f9fafb',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Section Title */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 12px 0',
              letterSpacing: '0.5px'
            }}>
              Honey Created In The Laps Of Nature
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#9ca3af',
              margin: 0,
              fontStyle: 'italic'
            }}>
              (From Beehive To Bottle)
            </p>
          </div>

          {/* Tile Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            gridAutoRows: 'minmax(200px, auto)'
          }}>
            {/* Column 1 - Tall Image */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              gridRow: 'span 2'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T1.jpg"
                alt="Honey Product"
                width={400}
                height={600}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Tile 2 - Regular */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T2.jpg"
                alt="Honey Product"
                width={400}
                height={280}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Tile 3 - Regular */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T3.jpg"
                alt="Honey Product"
                width={400}
                height={280}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Tile 4 - Regular */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T4.jpg"
                alt="Honey Product"
                width={400}
                height={280}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Tile 5 - Small (below tall image) */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T5.jpg"
                alt="Honey Product"
                width={400}
                height={280}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Tile 6 - Regular */}
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}>
              <Image
                src="/Assets/Tile/T6.jpg"
                alt="Honey Product"
                width={400}
                height={280}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '70px',
            height: '70px',
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            backgroundColor: '#FFB400',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(255, 180, 0, 0.4)',
            transition: 'background-color 0.3s ease',
            zIndex: 1000,
            transform: 'rotate(90deg)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFB400';
          }}
        >
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transform: 'rotate(-90deg)' }}
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </>
  );
}
