import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - FutureNature</title>
        <meta name="description" content="Learn about FutureNature and our beekeeping practices" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        {/* Hero Banner */}
        <div style={{
          maxWidth: '1400px',
          margin: '60px auto 80px',
          padding: '0 24px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
            borderRadius: '80px',
            padding: '50px 80px',
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Left Circle Image */}
            <div style={{
              flex: '0 0 280px',
              position: 'relative'
            }}>
              <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                backgroundColor: 'white',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                border: '8px solid #f59e0b'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Honeycomb pattern */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'35\' viewBox=\'0 0 40 35\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0l10 5.77v11.54L20 23.09 10 17.31V5.77L20 0z\' fill=\'%23f59e0b\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
                    opacity: 0.3
                  }}></div>
                  <div style={{
                    fontSize: '80px',
                    zIndex: 1
                  }}>🍯</div>
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    fontSize: '40px'
                  }}>🌼</div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                color: 'white',
                margin: '0',
                lineHeight: '1.1',
                textShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                letterSpacing: '2px'
              }}>
                ALL
              </h1>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '900',
                color: '#000',
                margin: '10px 0 0 0',
                lineHeight: '1',
                letterSpacing: '2px'
              }}>
                ABOUT US
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 80px',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '350px 1fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Left Section - Beekeeper Image */}
            <div style={{
              width: '100%',
              height: '350px',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '180px'
              }}>👩‍🌾</div>
            </div>

            {/* Right Section - Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}>
              {/* Beekeeper Info */}
              <div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  MEET THE BEEKEEPER BEHIND FUTURE NATURE
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Hi, I'm Vidhya sri, the passionate beekeeper behind future nature. My journey into beekeeping started with a deep appreciation for nature and a curiosity about the incredible world of bees. What began as a small venture soon turned into a lifelong passion, caring for bees, harvesting pure honey, and promoting sustainability.
                </p>
              </div>

              {/* Two Column Layout for Practices and Certificate */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px'
              }}>
                {/* Beekeeping Practices */}
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#f59e0b',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    OUR BOOKKEEPING PRACTICES:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    At FUTURE NATURE, we believe that healthy bees make the finest honey. That's why we follow the most ethical, sustainable beekeeping practices to ensure the well-being of our bees while delivering 100% pure, raw honey to you.
                  </p>
                </div>

                {/* Certificate Section */}
                <div>
                  <div style={{
                    backgroundColor: '#fef3c7',
                    borderRadius: '16px',
                    padding: '30px',
                    textAlign: 'center',
                    border: '3px solid #fbbf24',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '16px 32px',
                      display: 'inline-block',
                      marginBottom: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{
                        fontSize: '42px',
                        fontWeight: '700',
                        color: '#2563eb',
                        fontStyle: 'italic',
                        fontFamily: 'cursive'
                      }}>
                        fssai
                      </div>
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#000',
                      letterSpacing: '0.5px'
                    }}>
                      Certificate number
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
