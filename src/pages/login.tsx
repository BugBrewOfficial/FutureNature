import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Login - FutureNature</title>
        <meta name="description" content="Login to FutureNature" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #ecfdf5, #dbeafe)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px'
      }}>
        <div style={{ maxWidth: '448px', width: '100%' }}>
          {/* Logo/Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link href="/" style={{ display: 'inline-block', textDecoration: 'none' }}>
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#059669' }}>FutureNature</h1>
            </Link>
            <h2 style={{ marginTop: '24px', fontSize: '30px', fontWeight: '800', color: '#111827' }}>
              Welcome back
            </h2>
          </div>

          {/* Login Form */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '32px'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#059669',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '16px'
                }}
              >
                Sign in
              </button>
            </form>
          </div>

          {/* Back to Home Link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/" style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'none' }}>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
