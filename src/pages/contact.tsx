import Head from "next/head";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nickName: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    setFormData({ nickName: "", email: "", message: "" });
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
          <div style={{
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
              <div style={{
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
              <h1 style={{
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'flex-start'
          }}>
            {/* Left Section - Form */}
            <div>
              {/* Leave Reply Header */}
              <div style={{
                display: 'inline-block',
                backgroundColor: '#fbbf24',
                padding: '8px 20px',
                borderRadius: '20px',
                marginBottom: '30px'
              }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '900',
                  color: '#000',
                  margin: '0',
                  letterSpacing: '0.5px'
                }}>
                  LEAVE REPLY
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Nick Name Field */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Nick name:
                  </label>
                  <input
                    type="text"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
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
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                  />
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
                    Write a message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=""
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.3s'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#000',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                    transition: 'background-color 0.3s',
                    letterSpacing: '0.5px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Section - Contact Info */}
            <div>
              <div style={{
                backgroundColor: '#f9fafb',
                borderLeft: '4px solid #fbbf24',
                borderRadius: '12px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
              }}>
                {/* Address */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0',
                    textTransform: 'capitalize'
                  }}>
                    Address:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    1226, karumapuram (p.o), Tiruchangode (taluk), Namakkal(district), Tamilnadu-637302.
                  </p>
                </div>

                {/* Telephone */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0',
                    textTransform: 'capitalize'
                  }}>
                    Telephone:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    +91 7410187578
                  </p>
                </div>

                {/* Email */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 12px 0',
                    textTransform: 'capitalize'
                  }}>
                    Email:
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    futurenatureofficial@gmail.com
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#fbbf24',
                    margin: '0 0 16px 0',
                    textTransform: 'capitalize'
                  }}>
                    Social media:
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '16px'
                  }}>
                    <a href="#" style={{
                      fontSize: '20px',
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#000'}>
                      f
                    </a>
                    <a href="#" style={{
                      fontSize: '20px',
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#000'}>
                      ▶
                    </a>
                    <a href="#" style={{
                      fontSize: '20px',
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#000'}>
                      📷
                    </a>
                    <a href="#" style={{
                      fontSize: '20px',
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#000'}>
                      💬
                    </a>
                    <a href="#" style={{
                      fontSize: '20px',
                      color: '#000',
                      textDecoration: 'none',
                      transition: 'color 0.3s'
                    }} onMouseOver={(e) => e.currentTarget.style.color = '#fbbf24'} onMouseOut={(e) => e.currentTarget.style.color = '#000'}>
                      @
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
