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
      productNameTamil: "(மலை தேன்)",
      weight: "250gms",
      price: "₹1500/-",
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
        background: 'linear-gradient(135deg, #F9D371 0%, #F4C430 50%, #F9D371 100%)',
        borderRadius: '24px',
        padding: '50px 60px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
      }}>
        {/* Honeycomb Pattern Background - Full Coverage */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'50\' height=\'43\' viewBox=\'0 0 50 43\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M25 0l12.5 7.22v14.44L25 28.88 12.5 21.66V7.22L25 0z\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'1.5\' stroke-opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundSize: '50px 43px',
          opacity: 0.6,
          zIndex: 0
        }}></div>

        {/* Animated Bee */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          animation: 'float 3s ease-in-out infinite'
        }}>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
            <ellipse cx="25" cy="28" rx="8" ry="10" fill="#FDB515"/>
            <ellipse cx="25" cy="22" rx="6" ry="8" fill="#FDB515"/>
            <rect x="22" y="20" width="6" height="3" fill="#000"/>
            <rect x="22" y="26" width="6" height="3" fill="#000"/>
            <rect x="22" y="32" width="6" height="3" fill="#000"/>
            <ellipse cx="25" cy="16" rx="5" ry="5" fill="#000"/>
            <circle cx="23" cy="15" r="1.5" fill="#fff"/>
            <circle cx="27" cy="15" r="1.5" fill="#fff"/>
            <path d="M16 20 L10 15 L12 22 Z" fill="#B8D4E8" opacity="0.7"/>
            <path d="M34 20 L40 15 L38 22 Z" fill="#B8D4E8" opacity="0.7"/>
            <line x1="25" y1="16" x2="20" y2="12" stroke="#000" strokeWidth="1"/>
            <line x1="25" y1="16" x2="30" y2="12" stroke="#000" strokeWidth="1"/>
          </svg>
        </div>

        {/* Dotted Path for Bee */}
        <svg style={{
          position: 'absolute',
          top: '70px',
          left: '45%',
          width: '150px',
          height: '80px',
          zIndex: 1
        }}>
          <path d="M 0 40 Q 30 10, 60 40 T 120 40" stroke="#B8860B" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.4"/>
        </svg>

        {/* Left Content - Honey Jars Illustration */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: '0 0 180px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: '20px'
        }}>
          <div style={{
            position: 'relative',
            width: '140px',
            height: '200px'
          }}>
            {/* Simple honey jars illustration */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '10px',
              width: '50px',
              height: '80px',
              backgroundColor: '#FDB515',
              borderRadius: '0 0 8px 8px',
              border: '2px solid #B8860B'
            }}>
              <div style={{
                width: '100%',
                height: '15px',
                backgroundColor: '#8B6914',
                borderRadius: '0 0 6px 6px',
                marginTop: '5px'
              }}></div>
            </div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '70px',
              width: '50px',
              height: '100px',
              backgroundColor: '#FDB515',
              borderRadius: '0 0 8px 8px',
              border: '2px solid #B8860B'
            }}>
              <div style={{
                width: '100%',
                height: '15px',
                backgroundColor: '#8B6914',
                borderRadius: '0 0 6px 6px',
                marginTop: '5px'
              }}></div>
            </div>
            {/* White flowers */}
            <div style={{
              position: 'absolute',
              bottom: '-5px',
              left: '20px',
              fontSize: '24px'
            }}>🌼</div>
          </div>
        </div>

        {/* Center Text Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          paddingLeft: '20px'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#5D4037',
            marginBottom: '0',
            lineHeight: '1.1',
            letterSpacing: '3px'
          }}>
            LIMITED-TIME
          </h2>
          <h1 style={{
            fontSize: '90px',
            fontWeight: '900',
            color: '#5D4037',
            margin: '0 0 20px 0',
            lineHeight: '0.9',
            letterSpacing: '4px'
          }}>
            BUZZ!
          </h1>
          
          <button style={{
            backgroundColor: '#5D4037',
            color: '#FFF8DC',
            border: 'none',
            borderRadius: '30px',
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            boxShadow: '0 6px 16px rgba(93, 64, 55, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(93, 64, 55, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(93, 64, 55, 0.4)';
          }}>
            Taste the Savings
          </button>
        </div>

        {/* Right Side - Product Info with Circular Badge */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: '0 0 450px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Product Info Blob */}
          <div style={{
            position: 'relative',
            textAlign: 'center',
            paddingRight: '20px'
          }}>
            <div style={{
              backgroundColor: '#5D4037',
              borderRadius: '100px 100px 100px 20px',
              padding: '35px 50px',
              boxShadow: '0 8px 24px rgba(93, 64, 55, 0.4)',
              position: 'relative',
              transform: 'rotate(-2deg)'
            }}>
              <h3 style={{
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: '800',
                margin: '0 0 8px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                FOREST HONEY
              </h3>
              <p style={{
                color: '#F9D371',
                fontSize: '18px',
                margin: '0 0 18px 0',
                fontWeight: '500'
              }}>
                {slides[0].productNameTamil}
              </p>
              <p style={{
                color: '#FFFFFF',
                fontSize: '22px',
                fontWeight: '700',
                margin: '0'
              }}>
                {slides[0].weight}
              </p>
            </div>
            
            <div style={{
              marginTop: '20px',
              backgroundColor: '#10B981',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '10px',
              fontSize: '32px',
              fontWeight: '900',
              display: 'inline-block',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
              transform: 'rotate(1deg)'
            }}>
              {slides[0].price}
            </div>
          </div>

          {/* Circular Product Image */}
          <div style={{
            position: 'relative',
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '8px solid #5D4037',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            backgroundColor: '#E8D5C4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={slides[0].image}
              alt="Forest Honey"
              width={200}
              height={200}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #5D4037',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#5D4037';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#fff');
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#5D4037');
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D4037" strokeWidth="3">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #5D4037',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#5D4037';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#fff');
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#5D4037');
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D4037" strokeWidth="3">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 10
        }}>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: index === currentSlide ? '#5D4037' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: index === currentSlide ? '0 2px 8px rgba(93, 64, 55, 0.4)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
