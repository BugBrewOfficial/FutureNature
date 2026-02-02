import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShippingScreen from "@/components/ShippingScreen";
import { useCart, CartItem } from "@/components/CartContext";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [showShipping, setShowShipping] = useState(false);
  const router = useRouter();

  console.log({ cart })

  // Calculate totals
  const subtotal = cart.reduce((sum: number, item: CartItem) => {
    return sum + ((item.price || 0) * item.quantity);
  }, 0);

  const salesTax = Math.round(subtotal * 0.09);
  const total = subtotal + salesTax;

  if (showShipping) {
    return (
      <>
        <Head>
          <title>Shipping & Payment - FutureNature</title>
          <meta name="description" content="Enter your shipping details" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <ShippingScreen
          onClose={() => setShowShipping(false)}
          onContinue={() => {
            setShowShipping(false);
            router.push('/'); // Redirect to home or order success page
          }}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Shopping Cart - FutureNature</title>
        <meta name="description" content="Your shopping cart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <Navbar />

        {/* Cart Container */}
        <div className="cart-container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          minHeight: 'calc(100vh - 80px - 200px)'
        }}>
          {cart.length === 0 ? (
            /* Empty Cart State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '600px',
              gap: '40px'
            }}>
              {/* Empty Cart Illustration */}
              <div style={{
                width: '100%',
                maxWidth: '400px',
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  src="/Assets/cart.png"
                  alt="Empty Cart"
                  width={400}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </div>

              {/* Empty Cart Message */}
              <div style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h2 style={{
                  fontSize: 'clamp(24px, 6vw, 36px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Your cart is empty
                </h2>
                <p style={{
                  fontSize: 'clamp(14px, 4vw, 16px)',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  Looks like you haven&apos;t added any honey products yet. Start shopping and add your favorite items!
                </p>

                {/* Continue Shopping Button */}
                <Link href="/products" style={{
                  display: 'inline-block',
                  backgroundColor: '#fbbf24',
                  color: '#000',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbbf24';
                    e.currentTarget.style.color = '#000';
                  }}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Cart with Items */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}>
              {/* Cart Items Section */}
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '30px',
                  textTransform: 'uppercase'
                }}>
                  Your Cart Items ({cart.length})
                </h2>

                {/* Cart Table */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{
                        borderBottom: '2px solid #e5e7eb',
                        backgroundColor: '#f9fafb'
                      }}>
                        <th style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '700',
                          color: '#111827',
                          fontSize: '14px'
                        }}>
                          Item
                        </th>
                        <th style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '700',
                          color: '#111827',
                          fontSize: '14px',
                          width: '120px'
                        }}>
                          Price
                        </th>
                        <th style={{
                          padding: '16px',
                          textAlign: 'left',
                          fontWeight: '700',
                          color: '#111827',
                          fontSize: '14px',
                          width: '150px'
                        }}>
                          Quantity
                        </th>
                        <th style={{
                          padding: '16px',
                          textAlign: 'right',
                          fontWeight: '700',
                          color: '#111827',
                          fontSize: '14px',
                          width: '100px'
                        }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item: CartItem, index: number) => {
                        const itemTotal = (item.price || 0) * item.quantity;

                        return (
                          <tr key={item.variantId || index} style={{
                            borderBottom: '1px solid #e5e7eb'
                          }}>
                            <td style={{
                              padding: '16px'
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                              }}>
                                <div style={{
                                  width: '60px',
                                  height: '60px',
                                  position: 'relative',
                                  borderRadius: '8px',
                                  overflow: 'hidden',
                                  backgroundColor: '#f3f4f6'
                                }}>
                                  <Image
                                    src={item.image || "/Assets/Products/15.png"}
                                    alt={item.name || "Product"}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px'
                                }}>
                                  <span style={{
                                    color: '#111827',
                                    fontWeight: '600',
                                    fontSize: '16px'
                                  }}>
                                    {item.name}
                                  </span>
                                  <span style={{
                                    color: '#6b7280',
                                    fontSize: '14px'
                                  }}>
                                    {item.weight}
                                  </span>
                                  <button
                                    onClick={() => removeFromCart(item.id, item.variantId, item.cartItemId)}
                                    style={{
                                      color: '#ef4444',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      background: 'none',
                                      border: 'none',
                                      padding: 0,
                                      cursor: 'pointer',
                                      textAlign: 'left',
                                      marginTop: '4px'
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td style={{
                              padding: '16px',
                              color: '#111827',
                              fontWeight: '600',
                              fontSize: '16px'
                            }}>
                              ₹{item.price}
                            </td>
                            <td style={{
                              padding: '16px'
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: 'fit-content'
                              }}>
                                <button
                                  onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#374151'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'white';
                                  }}
                                >
                                  −
                                </button>
                                <span style={{
                                  width: '30px',
                                  textAlign: 'center',
                                  backgroundColor: '#e5e7eb',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontWeight: '600',
                                  color: '#111827'
                                }}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#374151'
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
                            </td>
                            <td style={{
                              padding: '16px',
                              textAlign: 'right',
                              color: '#111827',
                              fontWeight: '600'
                            }}>
                              ₹{itemTotal}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cart Summary Section */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 350px',
                gap: '30px',
                width: '100%'
              }}>


                {/* Empty left column */}
                <div></div>

                {/* Right side summary box */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  {/* Subtotal */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      Subtotal
                    </span>
                    <span style={{
                      fontWeight: '700',
                      color: '#111827',
                      fontSize: '14px'
                    }}>
                      ₹{subtotal}
                    </span>
                  </div>

                  {/* Sales Tax */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      Sales Tax
                    </span>
                    <span style={{
                      fontWeight: '700',
                      color: '#111827',
                      fontSize: '14px'
                    }}>
                      ₹{salesTax}
                    </span>
                  </div>

                  {/* Grand Total */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px'
                  }}>
                    <span style={{
                      color: '#f59e0b',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      Grand total
                    </span>
                    <span style={{
                      fontWeight: '700',
                      color: '#f59e0b',
                      fontSize: '16px'
                    }}>
                      ₹{total}
                    </span>
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => {
                      console.log('Order now clicked');
                      setShowShipping(true);
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: '#f59e0b',
                      color: '#000',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d97706';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f59e0b';
                    }}
                  >
                    Order now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
