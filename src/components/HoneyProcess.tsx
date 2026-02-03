import Image from "next/image";

export default function HoneyProcess() {
  const processes = [
    {
      id: 1,
      title: "Foraging & Collection",
      subtitle: "Nectar Gathering",
      tamilTitle: "பூக்களை உற்பத்தி செய்யும் தேன்",
      description: "Our bees tirelessly visit vibrant wildflowers from dawn until dusk. They gather the finest nectar, nature's sweet essence, beginning the journey from bloom to hive.",
      tamilDesc: "தேனீக்கள் காலை முதல் இரவு வரை மெதுவாக வேலை செய்து பிரகாசமான பூக்களிலிருந்து தேனைச் சேகரிக்கின்றன.",
      image: "/Assets/Svg/1.svg",
    },
    {
      id: 2,
      title: "The Hive Alchemy",
      subtitle: "Enzymatic Transformation",
      tamilTitle: "தேன் கூட்டிற்குள் மாற்றம்",
      description: "Deep inside the honeycomb, enzymes are added and moisture is reduced. This natural alchemy transforms thin nectar into rich, golden honey.",
      tamilDesc: "தேனீக்கள் பூக்களின் ஆழத்தில் தேனைச் சோதிக்கின்றன, இயற்கையின் அறையில் இனிமையை மாற்றுகின்றன.",
      image: "/Assets/Svg/2.svg",
    },
    {
      id: 3,
      title: "Harvesting Gold",
      subtitle: "Pure Extraction",
      tamilTitle: "தேன் நிறைவைச் சேகரித்தல்",
      description: "Once the honey reaches perfection, the bees seal the cells with wax. We harvest this liquid gold with care, ensuring every drop retains its medicinal value.",
      tamilDesc: "தேனீக்கள் பூக்களிலிருந்து அமிர்தத்தை மிக நுணுக்கமாகச் சேகரிக்கின்றன, அதைத் தங்க நிறமாக மாற்றுகின்றன.",
      image: "/Assets/Svg/3.svg",
    },
  ];

  return (
    <div className="process-section">
      
      {/* Header */}
      <div className="section-header">
        <span className="eyebrow">OUR PROCESS</span>
        <h2 className="title">From <span className="highlight">Hive</span> to Home</h2>
        <p className="sub-title">A journey of purity, patience, and passion.</p>
      </div>

      <div className="timeline-container">
        
        {/* The Central Line */}
        <div className="timeline-track"></div>

        {processes.map((item, index) => {
          const isEven = index % 2 !== 0; 
          
          return (
            <div key={item.id} className={`timeline-row ${isEven ? 'reverse' : ''}`}>
              
              {/* --- CONTENT SIDE --- */}
              <div className="content-col">
                <div className="process-card">
                  <span className="step-count">Step 0{item.id}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-subtitle">{item.subtitle}</span>
                  
                  {/* Divider */}
                  <div className="card-divider"></div>
                  
                  <p className="card-desc">{item.description}</p>
                  
                  <div className="tamil-block">
                    <p className="tamil-title">{item.tamilTitle}</p>
                    <p className="tamil-desc">{item.tamilDesc}</p>
                  </div>
                </div>
              </div>

              {/* --- CENTER MARKER --- */}
              <div className="marker-col">
                <div className="honey-marker">
                  <div className="marker-inner">{item.id}</div>
                </div>
              </div>

              {/* --- IMAGE SIDE --- */}
              <div className="image-col">
                <div className="img-frame">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={400} 
                    height={400} 
                    className="process-img"
                  />
                </div>
              </div>

            </div>
          );
        })}

      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .process-section {
          --gold: #f59e0b;
          --gold-light: #fcd34d;
          --cream: #fffbeb;
          --dark: #1c1917;
          --gray: #57534e;
          
          padding: 80px 24px;
          background-color: #fff;
          overflow: hidden;
        }

        /* --- HEADER --- */
        .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 80px;
        }

        .eyebrow {
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--gold);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: var(--dark);
          margin: 0 0 16px;
          line-height: 1.1;
        }

        .highlight {
          color: var(--gold);
          font-style: italic;
        }

        .sub-title {
          font-size: 18px;
          color: var(--gray);
        }

        /* --- TIMELINE CONTAINER --- */
        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .timeline-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--gold-light), var(--gold));
          transform: translateX(-50%);
          z-index: 0;
        }

        /* --- ROW LAYOUT (DESKTOP) --- */
        .timeline-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 100px;
          position: relative;
          z-index: 1;
        }

        .timeline-row.reverse {
          flex-direction: row-reverse;
        }

        .timeline-row:last-child {
          margin-bottom: 0;
        }

        /* Columns */
        .content-col, .image-col {
          width: 45%; 
        }

        .marker-col {
          width: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* --- CARD STYLING --- */
        .process-card {
          background: #fff;
          border: 1px solid #f3f4f6;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          position: relative;
        }

        .timeline-row:hover .process-card {
          transform: translateY(-5px);
          border-color: var(--gold-light);
        }

        .step-count {
          font-size: 12px;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          display: block;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: var(--dark);
          margin: 0 0 4px;
        }

        .card-subtitle {
          font-size: 14px;
          font-weight: 500;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .card-divider {
          width: 40px;
          height: 2px;
          background: var(--gold);
          margin: 20px 0;
        }

        .card-desc {
          font-size: 16px;
          line-height: 1.6;
          color: var(--dark);
          margin-bottom: 24px;
        }

        .tamil-block {
          background: var(--cream);
          padding: 16px;
          border-radius: 12px;
          border-left: 3px solid var(--gold);
        }

        .tamil-title {
          font-weight: 700;
          color: var(--dark);
          font-size: 14px;
          margin: 0 0 4px;
        }

        .tamil-desc {
          font-size: 13px;
          color: var(--gray);
          margin: 0;
          line-height: 1.5;
        }

        /* --- MARKER STYLING --- */
        .honey-marker {
          width: 50px;
          height: 50px;
          background: #fff;
          border: 2px solid var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 8px #ffffff; /* Fakes spacing from line */
          z-index: 2;
        }

        .marker-inner {
          width: 36px;
          height: 36px;
          background: var(--gold);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        /* --- IMAGE STYLING --- */
        .img-frame {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .process-img {
          width: 100%;
          max-width: 350px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
          transition: transform 0.5s ease;
        }

        .timeline-row:hover .process-img {
          transform: scale(1.05) rotate(2deg);
        }

        /* ========================================= */
        /* MOBILE RESPONSIVE OPTIMIZATIONS           */
        /* ========================================= */
        @media (max-width: 900px) {
          .process-section {
            padding: 60px 16px;
          }

          .title { 
            font-size: 32px; 
          }
          
          /* Move Track to Left */
          .timeline-track {
            left: 20px; 
            transform: none;
          }

          /* Reset ZigZag to Stack */
          .timeline-row, .timeline-row.reverse {
            flex-direction: column; 
            align-items: flex-start;
            margin-bottom: 60px;
            padding-left: 50px; /* Indent content to clear the line */
            position: relative;
          }

          /* Position Marker Absolute Left */
          .marker-col {
            position: absolute;
            left: -5px; /* Center 50px marker on 20px line */
            top: 0;
            width: auto;
            height: auto;
            justify-content: flex-start;
          }

          .honey-marker {
            width: 50px;
            height: 50px;
            /* Enhance shadow to cover line cleanly */
            box-shadow: 0 0 0 6px #fff; 
          }

          /* Image First */
          .image-col {
            width: 100%;
            margin-bottom: 20px;
            order: 1; 
          }

          .img-frame {
            justify-content: flex-start;
          }

          .process-img {
            max-width: 200px; /* Don't let huge images take over mobile */
          }

          /* Text Second */
          .content-col {
            width: 100%;
            order: 2;
          }

          /* Compact Mobile Card */
          .process-card {
            padding: 24px 20px; 
            border-radius: 16px;
          }

          .card-title {
            font-size: 24px;
          }

          .card-desc {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}