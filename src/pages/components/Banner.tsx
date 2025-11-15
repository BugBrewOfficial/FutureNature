import { useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "LIMITED-TIME",
      subtitle: "BUZZ!",
      productName: "FOREST HONEY",
      productNameTamil: "(முலை தேன்)",
      weight: "250gms",
      price: "₹500/-",
      image: "/Assets/Products/1.png"
    }
  ];

  const totalSlides = 7;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1400px',
      margin: '30px auto',
      padding: '0 24px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        borderRadius: '24px',
        padding: '40px 60px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Honeycomb Pattern Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'52\' viewBox=\'0 0 60 52\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l15 8.66v17.32L30 34.64 15 25.98V8.66L30 0zm0 51.96l15-8.66V25.98L30 17.32l-15 8.66v17.32l15 8.66z\' fill=\'%23fde68a\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>

        {/* Left Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1
        }}>

          {/* Text Content */}
          <div>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#78350f',
              marginBottom: '0',
              lineHeight: '1.2',
              letterSpacing: '2px'
            }}>
              LIMITED-TIME
            </h2>
            <h1 style={{
              fontSize: '80px',
              fontWeight: '900',
              color: '#78350f',
              margin: '0',
              lineHeight: '1',
              letterSpacing: '3px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              BUZZ!
            </h1>
            
            <button style={{
              marginTop: '30px',
              backgroundColor: '#78350f',
              color: '#fef3c7',
              border: 'none',
              borderRadius: '30px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}>
              Taste the Savings
            </button>
          </div>
        </div>

        {/* Center Product Info */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: '#78350f',
            borderRadius: '50% 50% 50% 0',
            padding: '30px 40px',
            transform: 'rotate(-5deg)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{
              color: '#fef3c7',
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 5px 0',
              letterSpacing: '1px'
            }}>
              FOREST HONEY
            </h3>
            <p style={{
              color: '#fde68a',
              fontSize: '16px',
              margin: '0 0 15px 0'
            }}>
              {slides[0].productNameTamil}
            </p>
            <p style={{
              color: '#fef3c7',
              fontSize: '20px',
              fontWeight: '600',
              margin: '0'
            }}>
              {slides[0].weight}
            </p>
          </div>
          
          <div style={{
            marginTop: '20px',
            backgroundColor: '#059669',
            color: 'white',
            padding: '10px 25px',
            borderRadius: '8px',
            fontSize: '28px',
            fontWeight: '800',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)'
          }}>
            {slides[0].price}
          </div>
        </div>

        {/* Right Product Image */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <div style={{
            position: 'relative',
            width: '280px',
            height: '280px'
          }}>
            <Image
              src={slides[0].image}
              alt="Forest Honey"
              width={280}
              height={280}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
              }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s',
            zIndex: 2
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="3">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.2s',
            zIndex: 2
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="3">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2
        }}>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: index === currentSlide ? '#78350f' : 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
