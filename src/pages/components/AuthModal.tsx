import { useState } from "react";
import Image from "next/image";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    acceptTerms: false
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your signup logic here
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        backgroundColor: '#f5f5f0',
        borderRadius: '24px',
        padding: '50px 60px',
        width: '90%',
        maxWidth: '650px',
        maxHeight: '90vh',
        overflowY: 'auto',
        zIndex: 9999,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.3s ease-in-out',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23f5f5f0\'/%3E%3Cpath d=\'M20 20h20v20H20z M60 20h20v20H60z M20 60h20v20H20z M60 60h20v20H60z\' fill=\'%23e8e8dc\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")',
        backgroundSize: '50px 50px'
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
            color: '#666',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e5e5';
            e.currentTarget.style.color = '#000';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#666';
          }}
        >
          ×
        </button>

        {/* Logo */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '30px'
        }}>
          <Image 
            src="/Assets/logo.png" 
            alt="FutureNature Logo" 
            width={140} 
            height={70}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Sign up Title */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Sign up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Email Address */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />

            {/* First Name */}
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />

            {/* Last Name */}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />

            {/* Address */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              style={{
                padding: '14px 18px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                backgroundColor: 'white',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
            />
          </div>

          {/* Additional Field (Full Width) */}
          <input
            type="text"
            name="additionalInfo"
            placeholder="Additional Information (Optional)"
            style={{
              width: '100%',
              padding: '14px 18px',
              fontSize: '15px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              backgroundColor: 'white',
              outline: 'none',
              marginBottom: '25px',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#84cc16'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          />

          {/* Terms & Conditions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '30px'
          }}>
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              required
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#84cc16'
              }}
            />
            <label 
              htmlFor="acceptTerms"
              style={{
                fontSize: '15px',
                color: '#1f2937',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              Accept Terms & Conditions
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.acceptTerms}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '17px',
              fontWeight: '600',
              color: 'white',
              backgroundColor: formData.acceptTerms ? '#84cc16' : '#d1d5db',
              border: 'none',
              borderRadius: '12px',
              cursor: formData.acceptTerms ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: formData.acceptTerms ? '0 4px 12px rgba(132, 204, 22, 0.3)' : 'none'
            }}
            onMouseOver={(e) => {
              if (formData.acceptTerms) {
                e.currentTarget.style.backgroundColor = '#65a30d';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(132, 204, 22, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (formData.acceptTerms) {
                e.currentTarget.style.backgroundColor = '#84cc16';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(132, 204, 22, 0.3)';
              }
            }}
          >
            Sign Up
          </button>

          {/* Login Link */}
          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '15px',
            color: '#6b7280'
          }}>
            Already have an account?{' '}
            <a 
              href="#"
              style={{
                color: '#84cc16',
                fontWeight: '600',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Login
            </a>
          </p>
        </form>
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
