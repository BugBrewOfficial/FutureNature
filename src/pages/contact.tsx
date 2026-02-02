import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 3) return "Name must be at least 3 characters long";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email address";
    return undefined;
  };

  const validateMobile = (mobile: string): string | undefined => {
    if (!mobile.trim()) return "Mobile number is required";
    // Indian mobile number: 10 digits, optional +91 prefix, starts with 6-9
    const mobileRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\s/g, ''))) {
      return "Invalid Indian mobile number. Must be 10 digits starting with 6-9";
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return "Message is required";
    return undefined;
  };

  const validateField = (name: keyof FormData, value: string) => {
    let error: string | undefined;

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'mobile':
        error = validateMobile(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change
    validateField(name as keyof FormData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof FormData, value);
  };

  const isFormValid = (): boolean => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const mobileError = validateMobile(formData.mobile);
    const messageError = validateMessage(formData.message);

    return !nameError && !emailError && !mobileError && !messageError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== undefined)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:8081/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Your message has been sent successfully!'
        });
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send your message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - FutureNature</title>
        <meta name="description" content="Get in touch with FutureNature" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Navbar />

        {/* Hero Banner */}
        <div style={{
          maxWidth: '100%',
          margin: '40px auto 60px',
          padding: '0 24px'
        }}>
          <div className="contact-hero-banner" style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '60px',
            padding: '30px 50px',
            display: 'flex',
            alignItems: 'center',
            gap: '50px',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '1200px',
            margin: '40px auto 60px'
          }}>
            {/* Left Circle Image */}
            <div style={{
              flex: '0 0 220px',
              position: 'relative'
            }}>
              <div className="contact-hero-image-circle" style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                backgroundColor: 'white',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                border: '10px solid #fbbf24'
              }}>
                <Image
                  src="/Assets/About us.png"
                  alt="Honey jar with bees"
                  width={196}
                  height={196}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Right Text */}
            <div style={{ flex: 1 }}>
              <h1 className="contact-hero-title" style={{
                fontSize: '72px',
                fontWeight: '900',
                color: '#000',
                margin: '0',
                lineHeight: '1',
                letterSpacing: '3px'
              }}>
                CONTACT US
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 60px',
          padding: '0 24px'
        }}>
          <div className="contact-form-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 4px 1fr',
            gap: '40px',
            alignItems: 'flex-start'
          }}>
            {/* Left Section - Form */}
            <div className="contact-form-section">
              {/* Leave Reply Header */}
              <div style={{
                display: 'inline-block',
                backgroundColor: '#fbbf24',
                padding: '12px 28px',
                borderRadius: '0 30px 30px 0',
                marginBottom: '30px',
                marginLeft: '-24px'
              }}>
                <h2 className="contact-form-title" style={{
                  fontSize: '18px',
                  fontWeight: '900',
                  color: '#000',
                  margin: '0',
                  letterSpacing: '1px'
                }}>
                  LEAVE REPLY
                </h2>
              </div>

              {/* Success/Error Message */}
              {submitStatus.type && (
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  backgroundColor: submitStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
                  border: `2px solid ${submitStatus.type === 'success' ? '#10b981' : '#ef4444'}`,
                  color: submitStatus.type === 'success' ? '#065f46' : '#991b1b',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  {submitStatus.message}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Name Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Name: <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    className="form-input"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: `2px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '14px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: '#fff',
                      color: '#000',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.name && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '6px',
                      marginBottom: '0'
                    }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Email Address: <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    className="form-input"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: `2px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '14px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: '#fff',
                      color: '#000',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.email && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '6px',
                      marginBottom: '0'
                    }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Mobile Number: <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter 10-digit mobile number"
                    className="form-input"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: `2px solid ${errors.mobile ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '14px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: '#fff',
                      color: '#000',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.mobile && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '6px',
                      marginBottom: '0'
                    }}>
                      {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Write a message: <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your message"
                    rows={6}
                    className="form-textarea"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      border: `2px solid ${errors.message ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '14px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      backgroundColor: '#fff',
                      color: '#000',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.3s'
                    }}
                  />
                  {errors.message && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: '12px',
                      marginTop: '6px',
                      marginBottom: '0'
                    }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="form-button"
                  style={{
                    backgroundColor: (!isFormValid() || isSubmitting) ? '#d1d5db' : '#fbbf24',
                    color: (!isFormValid() || isSubmitting) ? '#9ca3af' : '#000',
                    padding: '14px 26px',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: (!isFormValid() || isSubmitting) ? 'not-allowed' : 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'all 0.2s',
                    marginBottom: '40px',
                    opacity: (!isFormValid() || isSubmitting) ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid() && !isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid() && !isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#fbbf24';
                      e.currentTarget.style.color = '#000';
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Vertical Divider */}
            <div className="contact-divider" style={{
              width: '4px',
              backgroundColor: '#fbbf24',
              minHeight: '90%',
              borderRadius: '2px'
            }}></div>

            {/* Right Section - Contact Info */}
            <div className="contact-info-section">
              <div style={{
                backgroundColor: '#fff',
                border: '2px solid #e5e7eb',
                borderRadius: '20px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
              }}>
                {/* Address */}
                <div className="contact-info-item">
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0'
                  }}>
                    Address:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#000',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    1226, karumapuram (p.o), Tiruchengode (taluk), Namakkal(district), Tamilnadu-637302.
                  </p>
                </div>

                {/* Telephone */}
                <div className="contact-info-item">
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0'
                  }}>
                    Telephone:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#000',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    +91 7418187578
                  </p>
                </div>

                {/* Email */}
                <div className="contact-info-item">
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0'
                  }}>
                    Email:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#000',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    futurenatureofficial@gmail.com
                  </p>
                </div>

                {/* Social Media */}
                <div className="contact-info-item">
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 16px 0'
                  }}>
                    Social media:
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'inline-block'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fbbf24';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'inline-block'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fbbf24';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'inline-block'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fbbf24';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" style={{
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'inline-block'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fbbf24';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </a>
                    <a href="mailto:futurenatureofficial@gmail.com" style={{
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      display: 'inline-block'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = '#fbbf24';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                      </svg>
                    </a>
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
