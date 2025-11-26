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

  const totalSlides = 3;

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
      maxWidth: '1500px',
      margin: '30px auto',
      padding: '0 24px'
    }}>
      <div style={{
        background: '#F9D371',
        borderRadius: '30px',
        padding: '50px 60px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)'
      }}>
        {/* Animated Bee with Dotted Trail */}
        <div style={{
          position: 'absolute',
          top: '45px',
          left: '47%',
          zIndex: 2
        }}>
          {/* Dotted curved path */}
          <svg style={{
            position: 'absolute',
            top: '15px',
            left: '-100px',
            width: '200px',
            height: '80px',
            zIndex: 1
          }}>
            <path 
              d="M 0 40 Q 40 10, 80 40 T 160 40" 
              stroke="#B8860B" 
              strokeWidth="2.5" 
              strokeDasharray="5,8" 
              fill="none" 
              opacity="0.5"
            />
          </svg>
          
          {/* Bee SVG */}
          <svg width="50" height="50" viewBox="0 0 55 55" fill="none" style={{
            animation: 'float 3s ease-in-out infinite',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.12))'
          }}>
            {/* Bee body - bottom segment */}
            <ellipse cx="27" cy="32" rx="9" ry="11" fill="#FDB515"/>
            {/* Bee body - middle segment */}
            <ellipse cx="27" cy="24" rx="8" ry="10" fill="#FDB515"/>
            {/* Black stripes */}
            <rect x="23" y="21" width="8" height="3" rx="1" fill="#000"/>
            <rect x="23" y="28" width="8" height="3" rx="1" fill="#000"/>
            <rect x="23" y="35" width="8" height="3" rx="1" fill="#000"/>
            {/* Head */}
            <ellipse cx="27" cy="16" rx="6" ry="6" fill="#000"/>
            {/* Eyes */}
            <circle cx="24.5" cy="15" r="2" fill="#fff"/>
            <circle cx="29.5" cy="15" r="2" fill="#fff"/>
            <circle cx="24.5" cy="15" r="1" fill="#000"/>
            <circle cx="29.5" cy="15" r="1" fill="#000"/>
            {/* Wings - left */}
            <ellipse cx="20" cy="22" rx="8" ry="12" fill="#B8D4E8" opacity="0.65" transform="rotate(-25 20 22)"/>
            <ellipse cx="18" cy="26" rx="6" ry="10" fill="#B8D4E8" opacity="0.45" transform="rotate(-30 18 26)"/>
            {/* Wings - right */}
            <ellipse cx="34" cy="22" rx="8" ry="12" fill="#B8D4E8" opacity="0.65" transform="rotate(25 34 22)"/>
            <ellipse cx="36" cy="26" rx="6" ry="10" fill="#B8D4E8" opacity="0.45" transform="rotate(30 36 26)"/>
            {/* Antennae */}
            <line x1="27" y1="13" x2="23" y2="8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="27" y1="13" x2="31" y2="8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="23" cy="8" r="1.5" fill="#000"/>
            <circle cx="31" cy="8" r="1.5" fill="#000"/>
          </svg>
        </div>

        {/* Left Content - Honey Jars Illustration */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: '0 0 150px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingLeft: '10px'
        }}>
          <div style={{
            position: 'relative',
            width: '150px',
            height: '220px'
          }}>
            {/* Back jar - SVG from assets */}
            <Image 
              src="/Assets/Svg/HoneyBanner.svg"
              alt="Honey Jar"
              width={260}
              height={300}
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '-70px'
              }}
            />
          </div>
        </div>

        {/* Center Text Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          paddingLeft: '30px',
          paddingRight: '20px'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '800',
            color: '#734300',
            marginBottom: '0',
            lineHeight: '1.1',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            LIMITED-TIME
          </h2>
          <h1 style={{
            fontSize: '100px',
            fontWeight: '900',
            color: '#734300',
            margin: '0 0 22px 0',
            lineHeight: '0.85',
            letterSpacing: '5px',
            textTransform: 'uppercase'
          }}>
            BUZZ!
          </h1>
          
          <div style={{
            backgroundColor: '#734300',
            color: '#FFF8DC',
            border: 'none',
            borderRadius: '28px',
            padding: '16px 46px',
            fontSize: '18px',
            fontWeight: '800',
            cursor: 'pointer',
            letterSpacing: '1.8px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
          >
            Taste the Savings
          </div>
        </div>

        {/* Right Side - Product Info with Circular Image */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          paddingRight: '10px'
        }}>
          {/* Product Info Card - Blob Shape */}
          <div style={{
            position: 'relative',
            backgroundColor: '#734300',
            borderRadius: '150px 80px 80px 150px',
            padding: '45px 200px 45px 50px',
            boxShadow: '0 8px 25px rgba(93, 64, 55, 0.4)',
            textAlign: 'center',
            zIndex: 2
          }}>
            <h3 style={{
              color: '#FFFFFF',
              fontSize: '30px',
              fontWeight: '900',
              margin: '0 0 8px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: '1.1'
            }}>
              FOREST HONEY
            </h3>
            <p style={{
              color: '#F9D371',
              fontSize: '19px',
              margin: '0 0 16px 0',
              fontWeight: '600'
            }}>
              {slides[0].productNameTamil}
            </p>
            <p style={{
              color: '#FFFFFF',
              fontSize: '23px',
              fontWeight: '700',
              margin: '0 0 18px 0'
            }}>
              {slides[0].weight}
            </p>
            
            {/* Price Tag - Inside Card */}
            <div style={{
              backgroundColor: '#04A55C',
              color: 'white',
              padding: '12px 34px',
              borderRadius: '10px',
              fontSize: '30px',
              fontWeight: '900',
              display: 'inline-block',
              letterSpacing: '0.5px'
            }}>
              {slides[0].price}
            </div>
          </div>

          {/* Circular Product Image - Overlapping */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
            backgroundColor: '#E8D5C4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '-160px',
            zIndex: 3
          }}>
            <Image
              src={slides[0].image}
              alt="Forest Honey"
              width={240}
              height={240}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        {/* Left Arrow - Hidden on first slide */}
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              border: 'none',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#734300';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
              e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#fff');
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#734300');
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#734300" strokeWidth="3" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Right Arrow - Always visible */}
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: 'none',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#734300';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.06)';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#fff');
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.querySelector('svg')!.setAttribute('stroke', '#734300');
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#734300" strokeWidth="3" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
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
                width: index === currentSlide ? '32px' : '11px',
                height: '11px',
                borderRadius: '5.5px',
                border: 'none',
                backgroundColor: index === currentSlide ? '#734300' : 'rgba(255, 255, 255, 0.55)',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
                boxShadow: index === currentSlide ? '0 2px 8px rgba(93, 64, 55, 0.4)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-7px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
          75% {
            transform: translateY(-7px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
