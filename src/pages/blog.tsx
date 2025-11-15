import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - FutureNature</title>
        <meta name="description" content="Learn about natural honey and wellness" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        {/* Hero Section */}
        <div style={{
          backgroundImage: 'url(/Assets/blog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px',
          marginBottom: '0'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '300px'
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: '600px' }}>
              <h1 style={{
                fontSize: '42px',
                fontWeight: '900',
                color: '#78350f',
                margin: '0',
                lineHeight: '1.3',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                FUTURE NATURE'S<br />
                MISSION IS CUSTOMERS<br />
                HEALTH AND BEAUTY
              </h1>
            </div>

            {/* Right Image - Honey Jars */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
            </div>
          </div>
        </div>

        {/* Content Section 1 */}
        <div style={{
          backgroundColor: 'white',
          padding: '80px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              HONEY & HERBS: NATURE'S REMEDY FOR EVERYDAY WELLNESS
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.8',
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              In today's fast-paced world, reconnecting with nature's rhythms brings a sense of deep healing. More people are embracing simple, natural ways to care for both body and mind. Natural Honey Products and herbal medicine offer a timeless approach to wellness that starts right in your kitchen.
            </p>
          </div>
        </div>

        {/* Content Section 2 */}
        <div style={{
          backgroundColor: '#fafaf8',
          padding: '80px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              HONEY PRODUCTS FROM THE NATURE: NATURE'S SWEETEST REMEDIES
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              lineHeight: '1.8',
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              Bringing nature into your daily self-care routine doesn't have to be complicated. At True Nature, we offer a handcrafted collection of Natural honey products infused with carefully chosen herbs. Each one is designed to support your well-being from the inside out. Below, you'll find some of our most-loved honey blends and the powerful benefits they provide.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
