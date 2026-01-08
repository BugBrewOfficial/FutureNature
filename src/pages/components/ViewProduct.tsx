import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useCart } from "./CartContext";

interface Product {
  id: number;
  name: string;
  nameTamil: string;
  image: string;
  rating: number;
  weight: string;
  price: number;
  originalPrice: number;
  description: string;
  descriptionTamil: string;
  benefits: string[];
  benefitsTamil: string[];
  isBestSeller?: boolean;
  discount?: number;
}

interface ViewProductProps {
  product: Product;
  onClose: () => void;
  allProducts?: Product[];
  onProductClick?: (productId: number) => void;
}

export default function ViewProduct({ product, onClose, allProducts = [], onProductClick }: ViewProductProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("250 gms");
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Check if product is in cart
  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  // Sync quantity with cart
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  // Get all products except the current one for suggestions
  const suggestions = allProducts.length > 0 
    ? allProducts.filter(p => p.id !== product.id)
    : [
        {
          id: 13,
          name: "Moringa Atta",
          nameTamil: "முருங்கை மாவு",
          image: "/Assets/Products/9.png",
          rating: 4.4,
          weight: "250 gms",
          price: 70,
          originalPrice: 350,
          description: "",
          descriptionTamil: "",
          benefits: [],
          benefitsTamil: []
        },
        {
          id: 3,
          name: "Moringa Honey",
          nameTamil: "முருங்கை தேன்",
          image: "/Assets/Products/11.png",
          rating: 4.8,
          weight: "Half kg",
          price: 500,
          originalPrice: 850,
          description: "",
          descriptionTamil: "",
          benefits: [],
          benefitsTamil: []
        },
        {
          id: 2,
          name: "Honey Comb",
          nameTamil: "தேன் கூடு",
          image: "/Assets/Products/18.png",
          rating: 5.0,
          weight: "Half kg",
          price: 900,
          originalPrice: 1000,
          description: "",
          descriptionTamil: "",
          benefits: [],
          benefitsTamil: []
        }
      ];

  const handleQuantityChange = (change: number) => {
    const newQty = quantity + change;
    if (newQty <= 0) {
      updateQuantity(product.id, 0);
      setQuantity(1);
    } else {
      setQuantity(newQty);
      updateQuantity(product.id, newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setQuantity(1);
  };

  const handleShare = () => {
    console.log("Sharing product");
    // Add share logic here
  };

  // Auto-scroll reviews upward continuously
  useEffect(() => {
    const reviewsContainer = reviewsRef.current;
    if (!reviewsContainer) return;

    const scrollSpeed = 0.3; // Slow motion speed

    const autoScroll = () => {
      reviewsContainer.scrollTop += scrollSpeed;

      // Reset to top when reaching end of first review set for seamless loop
      const scrollableHeight = reviewsContainer.scrollHeight;
      const visibleHeight = reviewsContainer.clientHeight;
      const scrollThreshold = (scrollableHeight - visibleHeight) / 3;

      if (reviewsContainer.scrollTop >= scrollThreshold) {
        reviewsContainer.scrollTop = 0;
      }
    };

    const intervalId = setInterval(autoScroll, 20);

    return () => clearInterval(intervalId);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: '#fbbf24', fontSize: '18px' }}>★</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: '#d1d5db', fontSize: '18px' }}>★</span>
      );
    }

    return stars;
  };

  return (
    <>
      <Head>
        <title>{product.name} - FutureNature</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navbar />

        {/* Product Detail Section */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 24px 80px'
        }}>
          {/* Back Button */}
          <button
            onClick={onClose}
            style={{
              marginBottom: '30px',
              backgroundColor: '#fbbf24',
              border: '2px solid #f59e0b',
              color: '#111827',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '50px',
              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f59e0b';
              e.currentTarget.style.transform = 'translateX(-5px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(251, 191, 36, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fbbf24';
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 191, 36, 0.3)';
            }}
          >
            <span style={{ fontSize: '18px' }}>←</span>
            Back to Products
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '60px',
            backgroundColor: 'white',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0.08)'
          }}>
            {/* Left Column - Product Image */}
            <div style={{
              position: 'relative'
            }}>
              {/* Best Seller Badge */}
              {product.isBestSeller && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: '#111827',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  zIndex: 10,
                  letterSpacing: '0.5px'
                }}>
                  Most seller
                </div>
              )}

              <div style={{
                backgroundColor: '#fef3c7',
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: '500px'
              }}>
                {/* Decorative bees */}
                <div style={{
                  position: 'absolute',
                  top: '30px',
                  left: '40px',
                  fontSize: '24px'
                }}>
                  🐝
                </div>
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  right: '60px',
                  fontSize: '20px'
                }}>
                  🐝
                </div>

                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={500}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {/* Product Title */}
              <div>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 8px 0',
                  lineHeight: '1.2'
                }}>
                  {product.name}
                </h1>
                <p style={{
                  fontSize: '20px',
                  color: '#6b7280',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {product.nameTamil}
                </p>
              </div>

              {/* Weight Selection */}
              <div>
                <button
                  style={{
                    backgroundColor: '#fbbf24',
                    color: '#111827',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                  }}
                >
                  {selectedWeight}
                </button>
              </div>

              {/* Price Section */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  ₹{product.price}
                </div>
                <div style={{
                  fontSize: '20px',
                  color: '#9ca3af',
                  textDecoration: 'line-through'
                }}>
                  ₹{product.originalPrice}
                </div>
                {product.discount && (
                  <div style={{
                    color: '#10b981',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}>
                    {product.discount}% Discount
                  </div>
                )}
              </div>

              {/* Rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {renderStars(product.rating)}
                </div>
                <span style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {product.rating}
                </span>
              </div>

              {/* Description */}
              <div style={{
                paddingTop: '8px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#374151',
                  margin: '0 0 12px 0'
                }}>
                  {product.description}
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#6b7280',
                  margin: 0,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {product.descriptionTamil}
                </p>
              </div>

              {/* Benefits */}
              <div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#374151',
                  margin: '0 0 8px 0'
                }}>
                  {product.benefits.join(' ')}
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#6b7280',
                  margin: 0,
                  fontFamily: 'Arial, sans-serif'
                }}>
                  {product.benefitsTamil.join(' ')}
                </p>
              </div>

              {/* Quantity Selector */}
              {isInCart && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Quantity
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      style={{
                        backgroundColor: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
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
                      padding: '10px 28px',
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      backgroundColor: 'white',
                      borderLeft: '2px solid #e5e7eb',
                      borderRight: '2px solid #e5e7eb',
                      minWidth: '60px',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      style={{
                        backgroundColor: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
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
                </div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '8px'
              }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    backgroundColor: '#fbbf24',
                    color: '#111827',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '120px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d97706';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions Section */}
          <div style={{
            maxWidth: '1400px',
            margin: '60px auto 0',
            padding: '0 84px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: '#fbbf24',
                width: '58px',
                height: '58px',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}></div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                letterSpacing: '1px'
              }}>
                SUGGESTIONS
              </h2>
            </div>

            <div style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              paddingBottom: '16px',
              scrollbarWidth: 'thin'
            }}>
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    minWidth: '320px',
                    flex: '0 0 auto'
                  }}
                >
                  <div 
                    onClick={() => onProductClick && onProductClick(item.id)}
                    style={{
                      width: '100%',
                      height: '280px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '0 0 12px 0'
                    }}>
                      {item.nameTamil}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ 
                            color: i < Math.floor(item.rating) ? '#fbbf24' : '#e5e7eb', 
                            fontSize: '18px' 
                          }}>★</span>
                        ))}
                        <span style={{
                          fontSize: '15px',
                          color: '#111827',
                          marginLeft: '6px',
                          fontWeight: '500'
                        }}>
                          {item.rating}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '15px',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {item.weight}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#111827'
                      }}>
                        ₹ {item.price}
                      </div>
                      <div style={{
                        fontSize: '16px',
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        ₹ {item.originalPrice}
                      </div>
                    </div>

                    {!cart.find(cartItem => cartItem.id === item.id) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item.id, 1);
                        }}
                        style={{
                          width: '100%',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '14px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#d97706';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f59e0b';
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const cartItem = cart.find(c => c.id === item.id);
                            if (cartItem) {
                              updateQuantity(item.id, cartItem.quantity - 1);
                            }
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '14px 24px',
                            fontSize: '20px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            color: '#374151',
                            transition: 'all 0.2s',
                            flex: 1
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          −
                        </button>
                        <div style={{
                          backgroundColor: '#d1d5db',
                          padding: '14px 0',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          minWidth: '80px',
                          textAlign: 'center',
                          flex: 1
                        }}>
                          {cart.find(c => c.id === item.id)?.quantity || 1}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const cartItem = cart.find(c => c.id === item.id);
                            if (cartItem) {
                              updateQuantity(item.id, cartItem.quantity + 1);
                            }
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: '14px 24px',
                            fontSize: '20px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            color: '#374151',
                            transition: 'all 0.2s',
                            flex: 1
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div style={{
            maxWidth: '1400px',
            margin: '60px auto 0',
            padding: '0 84px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: '#fbbf24',
                width: '48px',
                height: '48px',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}></div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                letterSpacing: '1px'
              }}>
                REVIEWS
              </h2>
            </div>

            <div 
              ref={reviewsRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                maxHeight: '500px',
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'thin'
              }}
            >
              {/* Duplicate reviews for continuous scroll */}
              {[...Array(3)].map((_, index) => (
                <div key={index}>
                  {/* Review 1 */}
                  <div style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      Prasanth
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      5/5
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#374151',
                  margin: 0
                }}>
                  This honey is pure, rich in flavor, and has a natural golden color that reflects its quality.
                </p>
              </div>

              {/* Review 2 */}
              <div style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      Megha
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      5/5
                    </span>
                  </div>
                </div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: '#374151',
                  margin: 0
                }}>
                  It tastes fresh and authentic, perfect for daily use in tea, desserts, or skincare.
                </p>
              </div>
                </div>
              ))}
            </div>

            {/* Write a Review Section */}
            <div style={{
              marginTop: '40px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#9ca3af',
                marginBottom: '16px'
              }}>
                Write a review...
              </p>
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <textarea
                  placeholder="Can you tell us more?"
                  style={{
                    flex: 1,
                    minHeight: '100px',
                    padding: '16px',
                    fontSize: '15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                  }}
                />
                <button
                  style={{
                    backgroundColor: '#fbbf24',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
