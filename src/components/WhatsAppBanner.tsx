import React from 'react';

export default function WhatsAppBanner() {
  return (
    <div className="banner-wrapper">
      <div className="banner-card">
        
        {/* --- Background Texture (Organic Curves) --- */}
        <div className="bg-curves">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>

        <div className="content-container">
          
          {/* --- Left: Text --- */}
          <div className="text-group">
            <h2 className="banner-title">
              Order via <span className="highlight">WhatsApp</span>
            </h2>
            <p className="banner-sub">
              Skip the queue! Chat directly with us to get fresh honey delivered to your doorstep.
            </p>
          </div>

          {/* --- Center: Animated Icon --- */}
          <div className="icon-group">
            <div className="pulse-ring"></div>
            <div className="icon-circle">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
          </div>

          {/* --- Right: CTA Button --- */}
          <div className="action-group">
            <button 
              className="chat-btn"
              onClick={() => {
                window.open('https://api.whatsapp.com/send/?phone=917418187578&text&type=phone_number&app_absent=0', '_blank');
              }}
            >
              Start Chatting
              <span className="arrow-icon">→</span>
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .banner-wrapper {
          --forest-green: #064e3b;
          --emerald-green: #10b981;
          --brand-gold: #f59e0b;
          
          padding: 60px 24px;
          display: flex;
          justify-content: center;
          width: 100%;
          background-color: #fff;
        }

        .banner-card {
          width: 100%;
          max-width: 1200px;
          /* The Green Gradient you asked for */
          background: linear-gradient(135deg, var(--forest-green) 0%, var(--emerald-green) 100%);
          border-radius: 24px;
          padding: 40px 60px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(6, 78, 59, 0.25);
          color: white;
        }

        .bg-curves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.6;
          pointer-events: none;
        }
        .bg-curves svg {
          width: 100%;
          height: 100%;
        }

        .content-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          gap: 40px;
        }

        /* --- TEXT --- */
        .text-group {
          flex: 1;
        }

        .banner-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .highlight {
          color: var(--brand-gold);
          font-style: italic;
        }

        .banner-sub {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
          max-width: 450px;
          line-height: 1.6;
        }

        /* --- ICON ANIMATION --- */
        .icon-group {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle {
          width: 64px;
          height: 64px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* --- BUTTON --- */
        .chat-btn {
          background: #fff;
          color: var(--forest-green);
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          white-space: nowrap;
        }

        .chat-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          background: var(--brand-gold); /* Gold hover effect */
          color: #fff;
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .chat-btn:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* ================= MOBILE RESPONSIVE ================= */
        @media (max-width: 960px) {
          .banner-wrapper {
            padding: 30px 16px;
          }

          .banner-card {
            padding: 40px 24px;
            text-align: center;
          }

          .content-container {
            flex-direction: column; /* Stack Elements */
            gap: 32px;
          }

          .text-group {
            order: 2; /* Move text below icon */
          }

          .icon-group {
            order: 1; /* Icon on top */
            margin-bottom: -10px;
          }

          .action-group {
            order: 3;
            width: 100%;
          }

          .banner-title {
            font-size: 32px;
          }

          .banner-sub {
            font-size: 15px;
            margin: 0 auto; /* Center text */
          }

          .chat-btn {
            width: 100%; /* Full width button */
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}