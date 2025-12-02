import Image from "next/image";

export default function WhatsAppBanner() {
  return (
    <div style={{ 
      padding: '60px 20px',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#0d9488',
        borderRadius: '12px',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(13, 148, 136, 0.3)'
      }}>
        {/* Left Hexagon Pattern */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ 
              display: 'flex', 
              gap: '8px',
              marginLeft: rowIndex === 1 ? '24px' : '0'
            }}>
              {[...Array(2)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: '32px',
                    height: '36px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Right Hexagon Pattern */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} style={{ 
              display: 'flex', 
              gap: '8px',
              marginLeft: rowIndex === 1 ? '24px' : '0'
            }}>
              {[...Array(2)].map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: '32px',
                    height: '36px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flex: 1,
          justifyContent: 'center',
          zIndex: 1
        }}>
          {/* Text Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#ffffff',
                margin: 0,
                lineHeight: '1.2',
                letterSpacing: '1px'
              }}>
                LOVE
              </h2>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#10b981',
                margin: 0,
                lineHeight: '1.2',
                letterSpacing: '1px'
              }}>
                OUR
              </h2>
              <h2 style={{
                fontSize: '42px',
                fontWeight: '700',
                color: '#10b981',
                margin: 0,
                lineHeight: '1.2',
                letterSpacing: '1px'
              }}>
                HONEY?
              </h2>
            </div>

            {/* WhatsApp Icon and Message */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginLeft: '20px'
            }}>
              <div style={{
                backgroundColor: '#25D366',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="white"
                  style={{ marginLeft: '2px' }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p style={{
                  color: '#ffffff',
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '1.4'
                }}>
                  Now ordering is even easier!
                </p>
                <p style={{
                  color: '#ffffff',
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '1.4'
                }}>
                  Message us on WhatsApp and
                </p>
                <p style={{
                  color: '#ffffff',
                  margin: 0,
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '1.4'
                }}>
                  get your fresh honey products anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Click Here Button */}
          <button style={{
            backgroundColor: '#10b981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            marginLeft: 'auto',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#059669';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}
          onClick={() => {
            window.open('https://api.whatsapp.com/send/?phone=917418187578&text&type=phone_number&app_absent=0', '_blank');
          }}
          >
            Click here
          </button>
        </div>
      </div>
    </div>
  );
}
