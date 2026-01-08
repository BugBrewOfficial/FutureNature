import React, { useState } from 'react';
import Image from 'next/image';

interface PaymentProps {
  onClose?: () => void;
  onContinue?: () => void;
}

const Payment: React.FC<PaymentProps> = ({ onClose, onContinue }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '40px 20px'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        position: 'relative'
      }}>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              padding: '5px 10px',
              lineHeight: '1'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            ×
          </button>
        )}

        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#fbbf24',
          marginBottom: '40px',
          textAlign: 'center',
          textTransform: 'uppercase'
        }}>PAYMENT</h2>

        <div style={{
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '30px'
          }}>How would you like to pay?</h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0'
          }}>
            {/* Google Pay Option */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  name="payment"
                  value="googlepay"
                  checked={selectedPayment === 'googlepay'}
                  onChange={() => setSelectedPayment('googlepay')}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827'
                }}>Google pay</span>
              </div>
              <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.5023 11.7081C39.6693 8.91824 33.4892 10.576 30.6963 15.4091L23.656 27.605C21.6188 31.1268 24.2413 32.3574 27.1657 34.1108L33.9402 38.0208C36.2343 39.3441 39.1646 38.5585 40.4878 36.2674L47.7254 23.7339C50.1568 19.5222 48.714 14.1396 44.5023 11.7081Z" fill="#EA4335"/>
                <path d="M36.5364 16.756L29.7619 12.8461C26.0222 10.7701 23.9044 10.6327 22.369 13.0731L12.3775 30.377C9.58755 35.207 11.2484 41.3842 16.0784 44.1681C20.29 46.5995 25.6727 45.1567 28.1041 40.945L38.2869 23.3066C39.6161 21.0126 38.8305 18.0793 36.5364 16.756Z" fill="#FBBC04"/>
                <path d="M37.8405 7.8608L33.0821 5.11274C27.819 2.07494 21.0893 3.87611 18.0515 9.13924L8.99184 24.83C7.65366 27.145 8.44821 30.1081 10.7632 31.4433L16.0921 34.52C18.7235 36.0404 22.0869 35.1383 23.6074 32.5067L33.9574 14.5816C36.1021 10.8687 40.8484 9.59626 44.5613 11.7409L37.8405 7.8608Z" fill="#34A853"/>
                <path d="M19.3384 13.6286L14.1948 10.6655C11.9007 9.34522 8.97046 10.1278 7.64721 12.4159L1.47603 23.0796C-1.56178 28.3277 0.239394 35.0426 5.50253 38.0715L9.41852 40.3266L14.1679 43.0627L16.2289 44.2486C12.5698 41.7993 11.4079 36.8916 13.6451 33.0263L15.2432 30.2663L21.0948 20.1552C22.415 17.8732 21.6295 14.9489 19.3384 13.6286Z" fill="#4285F4"/>
              </svg>
            </label>

            {/* UPI Option */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  name="payment"
                  value="upi"
                  checked={selectedPayment === 'upi'}
                  onChange={() => setSelectedPayment('upi')}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827'
                }}>UPI</span>
              </div>
              <Image 
                src="/Assets/upi.png" 
                alt="UPI" 
                width={89} 
                height={47}
                style={{ objectFit: 'contain' }}
              />
            </label>

            {/* Paytm Option */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  name="payment"
                  value="paytm"
                  checked={selectedPayment === 'paytm'}
                  onChange={() => setSelectedPayment('paytm')}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827'
                }}>Paytm</span>
              </div>
              <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M83.7127 36.6001C82.9471 34.4196 80.8692 32.8543 78.4358 32.8543H78.3811C76.7953 32.8543 75.3667 33.5173 74.3483 34.5768C73.8273 34.0321 73.2014 33.5986 72.5082 33.3026C71.8151 33.0065 71.0691 32.854 70.3154 32.8543H70.2676C68.8732 32.8543 67.595 33.3669 66.6175 34.2077V33.7839C66.5833 33.3533 66.2347 33.0183 65.7973 33.0183H62.0515C61.5935 33.0183 61.2244 33.3875 61.2244 33.8454V54.1737C61.2244 54.6317 61.5935 55.0008 62.0515 55.0008H65.7973C65.9959 55.0009 66.1879 54.9289 66.3375 54.7982C66.4871 54.6674 66.5842 54.4868 66.6107 54.2899V39.6965C66.6107 39.6418 66.6107 39.6008 66.6175 39.5529C66.679 38.9036 67.1575 38.3636 67.9094 38.3021H68.5998C68.9142 38.3294 69.1808 38.4388 69.3858 38.6097C69.7139 38.8694 69.8916 39.2658 69.8916 39.7033L69.9053 54.2216C69.9053 54.6795 70.2744 55.0555 70.7324 55.0555H74.4782C74.6899 55.0557 74.8935 54.974 75.0464 54.8275C75.1993 54.6809 75.2896 54.481 75.2984 54.2694V39.6896C75.2984 39.2112 75.5171 38.7737 75.9067 38.5208C76.0981 38.3978 76.3305 38.3157 76.5971 38.2884H77.2875C78.1009 38.3567 78.5862 38.9719 78.5862 39.6896L78.5999 54.1942C78.5999 54.6522 78.969 55.0213 79.4269 55.0213H83.1727C83.6102 55.0213 83.9724 54.6795 83.9998 54.2489V38.3431C83.9793 37.4476 83.8631 37.0307 83.7127 36.6001ZM58.3672 33.073H56.2278V29.587C56.2274 29.4756 56.2024 29.3656 56.1545 29.265C56.1066 29.1644 56.037 29.0756 55.9508 29.0051C55.8645 28.9345 55.7638 28.8839 55.6557 28.8569C55.5476 28.8299 55.4348 28.8271 55.3255 28.8488C52.9537 29.4981 53.4253 32.7859 49.0917 33.0662H48.6747C48.6132 33.0662 48.5517 33.073 48.4902 33.0867C48.1279 33.1756 47.8477 33.5037 47.8477 33.9001V37.6459C47.8477 38.1038 48.2168 38.4729 48.6747 38.4729H50.9304L50.9236 54.3446C50.9236 54.7957 51.2927 55.1649 51.7438 55.1649H55.4486C55.8997 55.1649 56.2688 54.7957 56.2688 54.3446V38.4729H58.3672C58.8184 38.4729 59.1943 38.097 59.1943 37.6459V33.9001C59.1943 33.4421 58.8252 33.073 58.3672 33.073Z" fill="#4285F4"/>
                <path d="M44.9014 33.0731H41.1556C40.7045 33.0731 40.3285 33.4422 40.3285 33.9001V41.6446C40.3217 42.1231 39.9321 42.5058 39.4536 42.5058H37.8883C37.403 42.5058 37.0065 42.1162 37.0065 41.6309L36.9929 33.9001C36.9929 33.4422 36.6238 33.0731 36.1658 33.0731H32.42C31.9621 33.0731 31.593 33.4422 31.593 33.9001V42.3828C31.593 45.6022 33.8896 47.9058 37.1159 47.9058C37.1159 47.9058 39.5356 47.9058 39.6108 47.9194C40.0483 47.9673 40.3832 48.3364 40.3832 48.7875C40.3832 49.2318 40.0551 49.6009 39.6176 49.6556C39.5971 49.6556 39.5766 49.6624 39.5561 49.6693L34.081 49.6898C33.6231 49.6898 33.2539 50.0589 33.2539 50.5169V54.2558C33.2539 54.7138 33.6231 55.0829 34.081 55.0829H40.1987C43.4249 55.0829 45.7216 52.7862 45.7216 49.5667V33.9001C45.7284 33.4422 45.3593 33.0731 44.9014 33.0731ZM23.6024 33.0936H18.4076C17.9496 33.0936 17.5737 33.4422 17.5737 33.866V37.3793C17.5737 37.8305 17.9701 38.2064 18.4554 38.2064H23.4042C23.7938 38.2679 24.1014 38.555 24.1493 38.9993V39.4846C24.1083 39.9084 23.8007 40.216 23.4247 40.2502H20.9777C17.7172 40.2502 15.4 42.417 15.4 45.4519V49.806C15.4 52.8272 17.3959 54.9735 20.6291 54.9735H27.4166C28.6333 54.9735 29.6244 54.0507 29.6244 52.9161V38.7122C29.6244 35.2672 27.8472 33.0936 23.6024 33.0936ZM24.1971 48.7192V49.307C24.1971 49.3548 24.1903 49.4027 24.1834 49.4437C24.1766 49.4847 24.1629 49.5257 24.1493 49.5667C24.0331 49.8948 23.705 50.1341 23.3154 50.1341H21.7569C21.2716 50.1341 20.8751 49.765 20.8751 49.307V46.1012C20.8751 45.6501 21.2716 45.281 21.7569 45.281H23.3154C23.8007 45.281 24.1971 45.6501 24.1971 46.1081V48.7192ZM8.99531 33.0662H0.813406C0.362273 33.0662 0 33.4353 0 33.8796V54.2216C0 54.6727 0.334932 55.0419 0.758723 55.0487H4.57284C5.03081 55.0487 5.39992 54.6796 5.39992 54.2216L5.41359 48.5346H8.99531C11.9892 48.5346 14.0808 46.4567 14.0808 43.4423V38.1654C14.0808 35.1578 11.9892 33.0662 8.99531 33.0662ZM8.66721 39.9289V42.2393C8.66721 42.7246 8.2776 43.121 7.79229 43.121H5.42043V38.4935H7.79229C8.2776 38.4935 8.66721 38.8831 8.66721 39.3684V39.9289Z" fill="#4285F4"/>
              </svg>
            </label>
          </div>
        </div>

        <button 
          onClick={handleContinue}
          style={{
            width: '100%',
            maxWidth: '300px',
            display: 'block',
            margin: '30px auto 0',
            backgroundColor: '#fbbf24',
            color: '#000',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fbbf24';
            e.currentTarget.style.color = '#000';
          }}
        >
          Click to Continue
        </button>
      </div>
    </div>
  );
};

export default Payment;
