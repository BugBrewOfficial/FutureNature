import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>Our Story - FutureNature</title>
        <meta name="description" content="Certified purity. The story behind FutureNature honey." />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="page-wrapper">
        <Navbar />

        {/* --- 1. HERO SECTION --- */}
        <header className="hero-section">
          <div className="hero-bg-pattern"></div>
          <div className="container">
            <div className="hero-content">
              <span className="hero-subtitle">EST. 2024 • TAMIL NADU</span>
              <h1 className="hero-title">
                Preserving <br />
                <span className="gold-text">Nature's Soul</span>
              </h1>
              <div className="hero-line"></div>
              <p className="hero-desc">
                An artisan journey from the wildflowers of the Western Ghats 
                to the sanctuary of your home.
              </p>
            </div>
          </div>
        </header>

        {/* --- 2. FOUNDER STORY (Moved Up) --- */}
        <section className="story-section">
          <div className="container">
            <div className="story-wrapper">
              
              {/* Background Image Block */}
              <div className="story-bg-img">
                <Image 
                  src="/Assets/About us.png" 
                  alt="Beekeeping Background" 
                  fill 
                  className="bg-img"
                />
                <div className="overlay"></div>
              </div>

              {/* Floating Content Card */}
              <div className="story-card">
                <span className="card-tag">THE KEEPER'S NOTE</span>
                <h2 className="card-title">Vidhya Sri</h2>
                <p className="card-role">Founder & Head Beekeeper</p>
                
                <div className="card-body">
                  <p>
                    <span className="drop-cap">H</span>oney is the only food on the planet that never spoils. 
                    It is nature's way of preserving energy. My mission isn't just to harvest it, 
                    but to protect the tiny architects who build it.
                  </p>
                  <p>
                    At FutureNature, we stepped away from industrial farming. We embraced the wild. 
                    Every jar you hold is a result of ethical patience—harvested only when the bees 
                    have stored enough for themselves.
                  </p>
                </div>

                <div className="signature">Vidhya Sri</div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. THE TRUST ANCHOR (FSSAI) - NOW ABOVE STANDARDS --- */}
        <section className="trust-anchor">
          <div className="container">
            <div className="fssai-banner">
              
              {/* Left: The Seal */}
              <div className="seal-container">
                <div className="seal-ring">
                  <div className="seal-inner">
                    <span className="fssai-logo-text">fssai</span>
                  </div>
                </div>
              </div>

              {/* Center: The Certificate Details */}
              <div className="cert-details">
                <h3 className="cert-head">GOVERNMENT CERTIFIED PURITY</h3>
                <p className="cert-sub">Food Safety & Standards Authority of India</p>
                <div className="licence-box">
                  <span className="lic-label">LICENSE NUMBER</span>
                  <span className="lic-no">22424445000161</span>
                </div>
              </div>

              {/* Right: The Promise */}
              <div className="purity-promise">
                <ul className="check-list">
                  <li>✓ 100% Antibiotic Free</li>
                  <li>✓ No Added Sugar</li>
                  <li>✓ Lab Tested Quality</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* --- 4. CORE PILLARS (Golden Standards) --- */}
        <section className="pillars-section">
          <div className="container">
            <div className="pillars-header">
              <h2>Our Golden Standards</h2>
              <p className="pillars-sub">The principles we live by, validated by our certification.</p>
            </div>
            
            <div className="pillars-grid">
              {/* Pillar 1 */}
              <div className="pillar-card">
                <div className="pillar-num">01</div>
                <h3>Raw & Unfiltered</h3>
                <p>We never heat our honey. We filter it lightly just to remove wax, keeping all the pollen and enzymes alive.</p>
              </div>

              {/* Pillar 2 */}
              <div className="pillar-card middle-card">
                <div className="pillar-num">02</div>
                <h3>Single Origin</h3>
                <p>We don't blend honeys from different sources. You taste the specific flora of a specific season in Tamil Nadu.</p>
              </div>

              {/* Pillar 3 */}
              <div className="pillar-card">
                <div className="pillar-num">03</div>
                <h3>Cruelty Free</h3>
                <p>We use smoke-free methods and never harvest during dearth periods. The bees' well-being comes before profit.</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .page-wrapper {
          --gold: #b45309;
          --gold-light: #f59e0b;
          --gold-pale: #fffbeb;
          --dark: #1c1917;
          --cream: #fdfbf7;
          --white: #ffffff;
          --gray: #57534e;
          
          font-family: 'Inter', sans-serif;
          background-color: var(--cream);
          color: var(--dark);
          overflow-x: hidden;
        }

        h1, h2, h3 { font-family: 'Playfair Display', serif; }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* --- HERO SECTION --- */
        .hero-section {
          padding: 180px 0 140px;
          text-align: center;
          position: relative;
          background-color: var(--white);
        }

        .hero-bg-pattern {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: radial-gradient(#fcd34d 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.15;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(50px, 8vw, 100px);
          line-height: 0.95;
          color: var(--dark);
          margin-bottom: 32px;
          font-weight: 400;
        }

        .gold-text {
          font-family: 'Cinzel', serif;
          color: var(--gold);
          font-style: italic;
        }

        .hero-line {
          width: 2px;
          height: 60px;
          background: var(--gold);
          margin: 0 auto 32px;
        }

        .hero-desc {
          font-size: 18px;
          color: var(--gray);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
          font-style: italic;
        }

        /* --- STORY SECTION --- */
        .story-section {
          padding: 60px 0 140px;
        }

        .story-wrapper {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
        }

        .story-bg-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 65%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
        }
        .bg-img {
          object-fit: cover;
        }
        .overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.1);
        }

        .story-card {
          position: relative;
          margin-left: auto;
          width: 45%;
          background: #fff;
          padding: 60px;
          box-shadow: -20px 20px 60px rgba(0,0,0,0.1);
          border-top: 4px solid var(--gold);
        }

        .card-tag {
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 42px;
          margin: 0 0 8px;
          color: var(--dark);
        }

        .card-role {
          font-size: 14px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #e7e5e4;
          padding-bottom: 24px;
          margin-bottom: 24px;
          display: inline-block;
        }

        .card-body p {
          font-size: 16px;
          line-height: 1.7;
          color: var(--gray);
          margin-bottom: 20px;
        }

        .drop-cap {
          font-size: 40px;
          float: left;
          line-height: 0.8;
          padding-right: 8px;
          font-family: 'Playfair Display', serif;
          color: var(--gold);
        }

        .signature {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 24px;
          color: var(--gold);
          text-align: right;
          margin-top: 20px;
        }

        /* --- TRUST ANCHOR (FSSAI) --- */
        .trust-anchor {
          margin-bottom: 40px; /* Space between FSSAI and Standards */
          position: relative;
          z-index: 10;
        }

        .fssai-banner {
          background: #1c1917;
          border: 1px solid #44403c;
          border-radius: 20px;
          padding: 40px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .fssai-banner::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #b45309, #fbbf24, #b45309);
        }

        .seal-ring {
          width: 100px; height: 100px;
          border: 2px solid #fbbf24;
          border-radius: 50%;
          padding: 4px;
          display: flex; align-items: center; justify-content: center;
        }
        .seal-inner {
          width: 100%; height: 100%;
          background: #fbbf24;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #1c1917;
        }
        .fssai-logo-text {
          font-family: serif;
          font-style: italic;
          font-weight: 900;
          font-size: 28px;
          letter-spacing: -1px;
        }

        .cert-details {
          flex: 1;
          padding: 0 40px;
          border-right: 1px solid #44403c;
        }
        .cert-head {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          color: #fbbf24;
          margin: 0 0 4px;
          letter-spacing: 1px;
        }
        .cert-sub {
          font-size: 14px;
          color: #a8a29e;
          margin-bottom: 16px;
        }
        .licence-box {
          display: inline-block;
          background: rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .lic-label {
          display: block;
          font-size: 10px;
          letter-spacing: 1px;
          color: #a8a29e;
          margin-bottom: 2px;
        }
        .lic-no {
          font-family: monospace;
          font-size: 18px;
          letter-spacing: 2px;
          color: #fff;
        }

        .purity-promise {
          padding-left: 40px;
        }
        .check-list {
          list-style: none;
          padding: 0; margin: 0;
        }
        .check-list li {
          font-size: 15px;
          color: #e5e5e5;
          margin-bottom: 8px;
          font-family: 'Inter', sans-serif;
        }

        /* --- PILLARS SECTION --- */
        .pillars-section {
          padding: 60px 0 120px;
          background-color: var(--cream);
        }

        .pillars-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .pillars-header h2 {
          font-size: 42px;
          color: var(--dark);
          margin-bottom: 12px;
        }
        .pillars-sub {
          color: var(--gray);
          font-size: 16px;
          font-style: italic;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0; 
        }

        .pillar-card {
          padding: 40px;
          border-top: 1px solid #e7e5e4;
          border-bottom: 1px solid #e7e5e4;
          text-align: center;
          transition: background 0.3s;
        }
        .pillar-card:hover {
          background: #fff;
        }

        .middle-card {
          border-left: 1px solid #e7e5e4;
          border-right: 1px solid #e7e5e4;
        }

        .pillar-num {
          font-size: 12px;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 16px;
          display: block;
        }

        .pillar-card h3 {
          font-size: 22px;
          margin-bottom: 12px;
          color: var(--dark);
        }

        .pillar-card p {
          font-size: 15px;
          line-height: 1.6;
          color: var(--gray);
        }

        /* ================= MOBILE ================= */
        @media (max-width: 900px) {
          .story-wrapper {
            flex-direction: column;
            height: auto;
          }
          .story-bg-img {
            position: relative;
            width: 100%;
            height: 400px;
          }
          .story-card {
            width: 90%;
            margin: -60px auto 0;
            padding: 40px 24px;
          }

          .fssai-banner {
            flex-direction: column;
            text-align: center;
            padding: 40px 24px;
            gap: 32px;
          }
          .cert-details {
            border-right: none;
            border-top: 1px solid #44403c;
            border-bottom: 1px solid #44403c;
            padding: 24px 0;
            margin: 0;
          }
          .purity-promise {
            padding-left: 0;
          }

          .pillars-grid {
            grid-template-columns: 1fr;
          }
          .middle-card {
            border-left: none;
            border-right: none;
          }
          
          .hero-title {
            font-size: 42px;
          }
        }
      `}</style>
    </>
  );
}