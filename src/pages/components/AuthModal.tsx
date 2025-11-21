import { useState } from "react";
import Image from "next/image";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [signupOtp, setSignupOtp] = useState(['', '', '', '']);
  const [showSignupOtp, setShowSignupOtp] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: ''
  });

  if (!isOpen) return null;

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSignupOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...signupOtp];
      newOtp[index] = value;
      setSignupOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`signup-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSignupKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !signupOtp[index] && index > 0) {
      const prevInput = document.getElementById(`signup-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { phoneNumber, otp: otp.join('') });
    // Close modal and return to home screen
    onClose();
    // Reset form state
    setPhoneNumber('');
    setOtp(['', '', '', '']);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showSignupOtp) {
      // First submission - show OTP screen
      setShowSignupOtp(true);
    } else {
      // Second submission - verify OTP and complete signup
      console.log('Signup submitted:', signupData, 'OTP:', signupOtp.join(''));
      // Close modal and return to home screen
      onClose();
      // Reset form state
      setShowSignupOtp(false);
      setSignupOtp(['', '', '', '']);
      setSignupData({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: ''
      });
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-in-out'
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: isLogin ? '30px 40px 35px' : '25px 35px 30px',
        width: '90%',
        maxWidth: isLogin ? '580px' : '920px',
        maxHeight: 'auto',
        overflowY: 'visible',
        zIndex: 9999,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.3s ease-in-out',
        transition: 'max-width 0.3s ease'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            color: '#999',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.color = '#000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#999';
          }}
        >
          ×
        </button>

        {/* Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: isLogin ? '20px' : '15px'
        }}>
          <Image 
            src="/Assets/logo.png" 
            alt="FutureNature Logo" 
            width={isLogin ? 130 : 120} 
            height={isLogin ? 65 : 60}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: isLogin ? '28px' : '26px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: isLogin ? '20px' : '16px',
          textAlign: 'center'
        }}>
          {isLogin ? 'Login' : 'Sign up'}
        </h2>

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            {/* Phone Number */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder=""
                required
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#1f2937',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* OTP */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
              }}>
                Enter OTP
              </label>
              <div style={{
                display: 'flex',
                gap: '14px',
                justifyContent: 'flex-start'
              }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    style={{
                      width: '65px',
                      height: '65px',
                      fontSize: '22px',
                      fontWeight: '600',
                      textAlign: 'center',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      color: '#1f2937',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '17px',
                fontWeight: '700',
                color: '#1f2937',
                backgroundColor: '#FFB400',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(255, 180, 0, 0.3)',
                marginBottom: '18px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#FFB400';
                e.currentTarget.style.color = '#1f2937';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 180, 0, 0.3)';
              }}
            >
              Login
            </button>

            {/* Switch to Signup */}
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFB400',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontSize: '14px'
                }}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          /* Signup Form */
          <form onSubmit={handleSignupSubmit}>
            {!showSignupOtp ? (
              <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px',
              marginBottom: '16px'
            }}>
              {/* First Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Last Name */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Address */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={signupData.address}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Apartment */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Apartment
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={signupData.apartment}
                  onChange={handleSignupChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* City */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={signupData.city}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* State */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={signupData.state}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Zip Code */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={signupData.zipCode}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '5px'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={signupData.phoneNumber}
                  onChange={handleSignupChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '14px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#1f2937',
                backgroundColor: '#FFB400',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(255, 180, 0, 0.3)',
                marginBottom: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#FFB400';
                e.currentTarget.style.color = '#1f2937';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 180, 0, 0.3)';
              }}
            >
              Send OTP
            </button>

            {/* Switch to Login */}
            <p style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setShowSignupOtp(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFB400',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontSize: '14px'
                }}
              >
                Login
              </button>
            </p>
            </>
            ) : (
              /* Signup OTP Screen */
              <>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Enter OTP
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '14px',
                    justifyContent: 'flex-start'
                  }}>
                    {signupOtp.map((digit, index) => (
                      <input
                        key={index}
                        id={`signup-otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleSignupOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleSignupKeyDown(index, e)}
                        maxLength={1}
                        style={{
                          width: '65px',
                          height: '65px',
                          fontSize: '22px',
                          fontWeight: '600',
                          textAlign: 'center',
                          border: '2px solid #e5e7eb',
                          borderRadius: '12px',
                          backgroundColor: 'white',
                          color: '#1f2937',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#FFB400'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit OTP Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    backgroundColor: '#FFB400',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(255, 180, 0, 0.3)',
                    marginBottom: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFB400';
                    e.currentTarget.style.color = '#1f2937';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 180, 0, 0.3)';
                  }}
                >
                  Sign up
                </button>

                {/* Back to Form */}
                <p style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowSignupOtp(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFB400',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0,
                      fontSize: '14px'
                    }}
                  >
                    Back to form
                  </button>
                </p>
              </>
            )}
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}





