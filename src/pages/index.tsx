import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import DailyDeals from "./components/DailyDeals";
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
        
        {/* Process Section */}
        <div style={{
          maxWidth: '1400px',
          margin: '80px auto',
          padding: '60px 24px',
          backgroundColor: '#fafaf8'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#f59e0b',
              marginBottom: '10px',
              letterSpacing: '1px'
            }}>
              🐝 Process 🐝
            </h3>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#000',
              margin: 0,
              letterSpacing: '0.5px'
            }}>
              Honey Created In The Laps Of Nature
            </h2>
          </div>

          {/* Process Content */}
          <div style={{
            position: 'relative',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: '550px'
          }}>
            {/* Center Bee Image */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}>
              <Image
                src="/Assets/bee.png"
                alt="Bee"
                width={280}
                height={280}
                style={{
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Process Items Grid */}
            <div style={{
              position: 'relative',
              zIndex: 2
            }}>
              {/* Top Left - Honey Treatment */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '300px',
                textAlign: 'right',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Honey Treatment
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Honey treatment enhances texture, removes impurities, preserves its golden essence.
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🍯
                </div>
              </div>

              {/* Middle Left - Honey Shop */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '300px',
                textAlign: 'right',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Honey Shop
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    A honey shop is where nature's sweetness meets pure craftsmanship.
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🛒
                </div>
              </div>

              {/* Bottom Left - Home Delivery */}
              <div style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '300px',
                textAlign: 'right',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Home Delivery
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Enjoy the sweetness of nature with our fast and safe home delivery.
                  </p>
                </div>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🏠
                </div>
              </div>

              {/* Top Right - Bee Keeping */}
              <div style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: '300px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🏺
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Bee Keeping
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Beekeeping is the art of nurturing bees to create nature's purest honey.
                  </p>
                </div>
              </div>

              {/* Middle Right - Flower Produce */}
              <div style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '300px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🌸
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Flower Produce
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Flowers produce nectar, the natural source of sweetness for bees and honey.
                  </p>
                </div>
              </div>

              {/* Bottom Right - Honey Production */}
              <div style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: '300px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  backgroundColor: '#fbbf24',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '32px',
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                }}>
                  🍯
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#000',
                    margin: '0 0 10px 0'
                  }}>
                    Honey Production
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    Bees craft honey inside the hive, turning nature's nectar into liquid gold.
                  </p>
                </div>
              </div>
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
