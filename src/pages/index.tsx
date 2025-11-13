import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>FutureNature - Home</title>
        <meta name="description" content="Welcome to FutureNature" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Navigation Header */}
        <nav style={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            maxWidth: '1400px', 
            margin: '0 auto', 
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px'
          }}>
            {/* Logo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: '900', 
                color: '#111827',
                lineHeight: '1',
                textAlign: 'center'
              }}>
                <div>FUTURE</div>
                <div style={{ fontSize: '12px', margin: '2px 0' }}>NATURE</div>
              </div>
            </div>

            {/* Login and Cart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/login" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#111827',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Login</span>
              </Link>
              
              <span style={{ color: '#d1d5db' }}>|</span>
              
              <Link href="#" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                color: '#111827',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Cart</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '48px 24px'
        }}>
          {/* Content will go here */}
        </div>
      </div>
    </>
  );
}
