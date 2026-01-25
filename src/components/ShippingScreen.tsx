import React, { useState } from 'react';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

interface ShippingScreenProps {
  onContinue?: (formData: ShippingFormData) => void;
  onClose?: () => void;
}

const ShippingScreen: React.FC<ShippingScreenProps> = ({ onContinue, onClose }) => {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const { apartment: _, ...requiredFields } = formData;
    return Object.values(requiredFields).every(value => value.trim() !== '');
  };

  const handleContinue = () => {
    if (isFormValid() && onContinue) {
      onContinue(formData);
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
        maxWidth: '1000px',
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
          fontSize: '24px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '30px',
          textAlign: 'center'
        }}>SHIPPING DETAILS</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '30px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="firstName" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>First Name: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="lastName" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>Last Name: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="address" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>Address: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="apartment" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>Apartment: <span style={{ color: '#6b7280', fontSize: '13px' }}>(optional)</span></label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="city" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>City: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="state" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>State: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="zipCode" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>Zip code: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="phoneNumber" style={{ fontWeight: '500', color: '#374151', fontSize: '14px' }}>Phone Number: <span style={{ color: '#ef4444' }}>*</span></label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder=""
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid()}
          style={{
            width: '100%',
            backgroundColor: isFormValid() ? '#fbbf24' : '#d1d5db',
            color: isFormValid() ? '#000' : '#9ca3af',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: isFormValid() ? 'pointer' : 'not-allowed',
            marginTop: '30px',
            transition: 'all 0.2s',
            opacity: isFormValid() ? 1 : 0.6
          }}
          onMouseEnter={(e) => {
            if (isFormValid()) {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid()) {
              e.currentTarget.style.backgroundColor = '#fbbf24';
              e.currentTarget.style.color = '#000';
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ShippingScreen;
