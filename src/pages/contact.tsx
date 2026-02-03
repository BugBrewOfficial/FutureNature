import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
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
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Validation functions (Kept identical to your logic)
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
    const mobileRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.replace(/\s/g, ""))) {
      return "Invalid Indian mobile number.";
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
      case "name": error = validateName(value); break;
      case "email": error = validateEmail(value); break;
      case "mobile": error = validateMobile(value); break;
      case "message": error = validateMessage(value); break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== undefined)) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", mobile: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Try again later.",
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

      <div className="page-wrapper">
        <Navbar />

        <div className="container">
          {/* Header Section */}
          <div className="header-section">
            <h1 className="main-title">Get in Touch</h1>
            <p className="subtitle">Have questions about our honey products? We're here to help.</p>
          </div>

          <div className="content-grid">
            {/* Left Column: Contact Info Card */}
            <div className="info-card">
              <div className="info-content">
                <h2 className="info-title">Contact Information</h2>
                <p className="info-subtitle">Reach out to us directly or fill out the form.</p>

                <div className="info-items">
                  <div className="info-item">
                    <div className="icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h3>Visit Us</h3>
                      <p>1226, Karumapuram (p.o), Tiruchengode,<br />Namakkal, Tamilnadu-637302.</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <h3>Call Us</h3>
                      <p>+91 74181 87578</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                      <h3>Email Us</h3>
                      <p>futurenatureofficial@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="social-section">
                  <h3>Follow Us</h3>
                  <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                    <a href="https://whatsapp.com" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>
                  </div>
                </div>
              </div>
              <div className="info-decoration"></div>
            </div>

            {/* Right Column: Form */}
            <div className="form-card">
              <h2 className="form-title">Send a Message</h2>
              
              {submitStatus.type && (
                <div className={`status-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="form-layout">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="input-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+91 99999 99999"
                    className={errors.mobile ? "error" : ""}
                  />
                  {errors.mobile && <span className="error-text">{errors.mobile}</span>}
                </div>

                <div className="input-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="How can we help you?"
                    rows={5}
                    className={errors.message ? "error" : ""}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={!isFormValid() || isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background-color: #f9fafb;
          padding-bottom: 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .header-section {
          text-align: center;
          padding: 60px 0;
        }
        .main-title {
          font-size: 48px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .subtitle {
          font-size: 18px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Grid Layout */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 32px;
          align-items: stretch;
        }

        /* Left Info Card */
        .info-card {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          color: #111827;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(245, 158, 11, 0.15), 0 10px 10px -5px rgba(245, 158, 11, 0.1);
          display: flex;
          flex-direction: column;
        }

        .info-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .info-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .info-subtitle {
          font-size: 16px;
          opacity: 0.8;
          margin-bottom: 40px;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 32px;
          flex-grow: 1;
        }

        .info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .icon-box {
          background: rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-item h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 4px;
        }

        .info-item p {
          font-size: 15px;
          margin: 0;
          line-height: 1.5;
          opacity: 0.9;
        }

        .social-section {
          margin-top: 40px;
        }

        .social-section h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .social-icons {
          display: flex;
          gap: 16px;
        }

        .social-icons a {
          color: #111827;
          transition: transform 0.2s;
          background: rgba(255,255,255,0.2);
          padding: 8px;
          border-radius: 50%;
          display: flex;
        }

        .social-icons a:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.4);
        }

        .info-decoration {
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          z-index: 1;
        }

        /* Right Form Card */
        .form-card {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #f3f4f6;
        }

        .form-title {
          font-size: 24px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 32px;
        }

        .form-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .input-group input,
        .input-group textarea {
          padding: 12px 16px;
          border-radius: 12px;
          border: 2px solid #e5e7eb;
          font-size: 15px;
          transition: all 0.3s ease;
          outline: none;
          color: #111827;
          background: #f9fafb;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          border-color: #fbbf24;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.1);
        }

        .input-group input.error,
        .input-group textarea.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .error-text {
          font-size: 13px;
          color: #ef4444;
          font-weight: 500;
        }

        .submit-btn {
          background-color: #111827;
          color: white;
          padding: 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #fbbf24;
          color: #111827;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .submit-btn:disabled {
          background-color: #d1d5db;
          cursor: not-allowed;
        }

        .status-message {
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 14px;
          font-weight: 600;
        }

        .status-message.success {
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #10b981;
        }

        .status-message.error {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }

        /* Mobile Responsive */
        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }

          .header-section {
            padding: 40px 0;
            text-align: left;
          }

          .main-title {
            font-size: 36px;
          }

          .info-card {
            padding: 32px;
            order: 2; /* Puts info below form on mobile if preferred, remove to keep on top */
          }
          
          .form-card {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}