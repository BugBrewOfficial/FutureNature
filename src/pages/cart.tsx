import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  return (
    <>
      <Head>
        <title>Shopping Cart - FutureNature</title>
        <meta name="description" content="Your shopping cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Navbar />

        {/* Cart Container */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          minHeight: 'calc(100vh - 80px - 200px)'
        }}>
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '600px',
              gap: '40px'
            }}>
              {/* Empty Cart Illustration */}
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg
                  viewBox="0 0 400 300"
                  style={{
                    width: '100%',
                    height: 'auto'
                  }}
                >
                  {/* Background boxes */}
                  <rect x="120" y="100" width="60" height="60" fill="#fef3c7" rx="4" />
                  <rect x="200" y="80" width="70" height="70" fill="#fef3c7" rx="4" />
                  <rect x="130" y="180" width="50" height="50" fill="#fef3c7" rx="4" />
                  <rect x="210" y="190" width="60" height="40" fill="#fef3c7" rx="4" />

                  {/* Large box in center */}
                  <rect x="140" y="120" width="120" height="140" fill="#fbbf24" rx="6" stroke="#f59e0b" strokeWidth="3" />

                  {/* Woman illustration */}
                  <circle cx="200" cy="100" r="12" fill="#000" />
                  <rect x="190" y="115" width="20" height="30" fill="#fff" stroke="#000" strokeWidth="1.5" />
                  <circle cx="185" cy="125" r="5" fill="#000" />
                  <circle cx="215" cy="125" r="5" fill="#000" />
                  <rect x="190" y="150" width="20" height="25" fill="#1f2937" rx="2" />

                  {/* Woman's hand reaching for box */}
                  <path d="M 170 130 Q 160 120 155 115" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="155" cy="115" r="4" fill="#000" />

                  {/* Shelving/warehouse background */}
                  <rect x="90" y="110" width="250" height="2" fill="#d4a574" />
                  <rect x="90" y="140" width="250" height="2" fill="#d4a574" />
                  <rect x="90" y="170" width="250" height="2" fill="#d4a574" />

                  {/* Sun/light rays */}
                  <circle cx="80" cy="50" r="15" fill="#fbbf24" />
                  <line x1="80" y1="20" x2="80" y2="10" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="80" y1="80" x2="80" y2="90" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="50" x2="38" y2="50" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  <line x1="110" y1="50" x2="122" y2="50" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Empty Cart Message */}
              <div style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h2 style={{
                  fontSize: 'clamp(24px, 6vw, 36px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Your cart is empty
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  Looks like you haven't added any honey products yet. Start shopping and add your favorite items!
                </p>

                {/* Continue Shopping Button */}
                <Link href="/products" style={{
                  display: 'inline-block',
                  backgroundColor: '#fbbf24',
                  color: '#000',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fbbf24';
                  e.currentTarget.style.color = '#000';
                }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Cart with Items */
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 350px',
              gap: '30px',
              alignItems: 'start'
            }}>
              {/* Cart Items Section */}
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Shopping Cart ({cartItems.length})
                </h2>
                {/* Items will be displayed here */}
              </div>

              {/* Cart Summary Section */}
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                height: 'fit-content',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Order Summary
                </h3>
                {/* Summary content will be displayed here */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
