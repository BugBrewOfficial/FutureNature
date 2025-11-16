import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Products() {
  const [quantities, setQuantities] = useState<{[key: number]: number}>({
    1: 1,
    2: 1,
    3: 1
  });

  const [cart, setCart] = useState<{[key: number]: number}>({});

  const products = [
    {
      id: 1,
      name: "Moringa Atta",
      nameTamil: "(முருங்கை கீரை)",
      image: "/Assets/Products/3.png",
      rating: 4.5,
      weight: "100 gms",
      price: 800,
      originalPrice: 1000
    },
    {
      id: 2,
      name: "Moringa Atta",
      nameTamil: "(முருங்கை கீரை)",
      image: "/Assets/Products/3.png",
      rating: 3.3,
      weight: "100 gms",
      price: 800,
      originalPrice: 1000
    },
    {
      id: 3,
      name: "Moringa Atta",
      nameTamil: "(முருங்கை கீரை)",
      image: "/Assets/Products/3.png",
      rating: 3.5,
      weight: "100 gms",
      price: 800,
      originalPrice: 1000
    }
  ];

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(0, (prev[productId] || 1) + change);
      
      // If quantity reaches 0, remove from cart
      if (newQuantity === 0) {
        setCart(prevCart => {
          const newCart = { ...prevCart };
          delete newCart[productId];
          return newCart;
        });
      }
      
      return {
        ...prev,
        [productId]: newQuantity === 0 ? 1 : newQuantity
      };
    });
  };

  const handleAddToCart = (productId: number) => {
    const quantity = quantities[productId] || 1;
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
    
    // Reset quantity to 1 after adding
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  const isInCart = (productId: number) => {
    return cart[productId] && cart[productId] > 0;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: '16px' }}>★</span>
      );
    }

    return stars;
  };

  return (
    <>
      <Head>
        <title>Products - FutureNature</title>
        <meta name="description" content="Browse our natural honey products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        {/* Hero Section */}
        <div style={{
          backgroundImage: 'url(/Assets/product.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
          padding: '160px 84px',
          marginTop: '0px',
          marginBottom: '80px',
          width: '100%',
          height: '600px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: '700px' }}>
              <h1 style={{
                fontSize: '64px',
                fontWeight: '900',
                color: 'white',
                margin: '0',
                lineHeight: '1.1',
                textShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                letterSpacing: '2px'
              }}>
                RAW HONEY &<br />HAND CRAFTED
              </h1>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '800',
              color: '#f59e0b',
              marginBottom: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              OUR PRODUCTS
            </h2>
          </div>

          {/* Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}
              >
                {/* Product Image */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '320px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={320}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                {/* Product Details */}
                <div style={{
                  padding: '24px'
                }}>
                  {/* Product Name */}
                  <div style={{ marginBottom: '12px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {product.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {product.nameTamil}
                    </p>
                  </div>

                  {/* Rating and Weight */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {renderStars(product.rating)}
                      <span style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginLeft: '4px'
                      }}>
                        {product.rating}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {product.weight}
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      ₹ {product.price}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      ₹ {product.originalPrice}
                    </div>
                  </div>

                  {/* Quantity Selector or Add to Cart */}
                  {isInCart(product.id) ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        style={{
                          backgroundColor: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#374151',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        -
                      </button>
                      <div style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#111827',
                        backgroundColor: '#f9fafb',
                        borderLeft: '1px solid #e5e7eb',
                        borderRight: '1px solid #e5e7eb',
                        minWidth: '60px',
                        textAlign: 'center'
                      }}>
                        {quantities[product.id]}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        style={{
                          backgroundColor: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#374151',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                          flex: 1
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      style={{
                        width: '100%',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '14px 24px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f59e0b';
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
