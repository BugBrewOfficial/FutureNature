import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShippingScreen from "@/components/ShippingScreen";
import { useCart, CartItem } from "@/components/CartContext";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Cart.module.scss";

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

      <div className={styles.cartLayout}>
        <Navbar />

        {/* Cart Container */}
        <div className={styles.cartContainer}>
          {cart.length === 0 ? (
            /* Empty Cart State */
            <div className={styles.emptyCartState}>
              {/* Empty Cart Illustration */}
              <div className={styles.emptyCartIllustration}>
                <Image
                  src="/Assets/cart.png"
                  alt="Empty Cart"
                  width={400}
                  height={400}
                  className={styles.illustrationImg}
                />
              </div>

              {/* Empty Cart Message */}
              <div className={styles.emptyCartMessage}>
                <h2 className={styles.emptyTitle}>
                  Your cart is empty
                </h2>
                <p className={styles.emptyDesc}>
                  Looks like you haven&apos;t added any honey products yet. Start shopping and add your favorite items!
                </p>

                {/* Continue Shopping Button */}
                <Link href="/products" className={styles.continueShoppingBtn}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Cart with Items */
            <div className={styles.cartContent}>
              {/* Cart Items Section */}
              <div>
                <h2 className={styles.sectionTitle}>
                  Your Cart Items ({cart.length})
                </h2>

                {/* Cart Table */}
                <div className={styles.cartTableWrapper}>
                  <table className={styles.cartTable}>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th style={{ textAlign: 'right' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item: CartItem, index: number) => {
                        const itemTotal = (item.price || 0) * item.quantity;

                        return (
                          <tr key={item.variantId || index}>
                            <td data-label="Item">
                              <div className={styles.itemInfo}>
                                <div className={styles.itemImageWrapper}>
                                  <Image
                                    src={item.image || "/Assets/Products/15.png"}
                                    alt={item.name || "Product"}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                                <div className={styles.itemDetails}>
                                  <span className={styles.itemName}>
                                    {item.name}
                                  </span>
                                  <span className={styles.itemWeight}>
                                    {item.weight}
                                  </span>
                                  <button
                                    onClick={() => removeFromCart(item.id, item.variantId, item.cartItemId)}
                                    className={styles.removeBtn}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td data-label="Price" className={styles.priceCell}>
                              ₹{item.price}
                            </td>
                            <td data-label="Quantity">
                              <div className={styles.quantityControl}>
                                <button
                                  onClick={() => updateQuantity(item.id, item.variantId, item.quantity - 1)}
                                  className={styles.qtyBtn}
                                >
                                  −
                                </button>
                                <span className={styles.qtyValue}>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.variantId, item.quantity + 1)}
                                  className={styles.qtyBtn}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td data-label="Total" className={styles.totalCell}>
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
              <div className={styles.cartSummary}>
                {/* Empty left column */}
                <div></div>

                {/* Right side summary box */}
                <div className={styles.summaryBox}>
                  {/* Subtotal */}
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>
                      Subtotal
                    </span>
                    <span className={styles.summaryValue}>
                      ₹{subtotal}
                    </span>
                  </div>

                  {/* Sales Tax */}
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>
                      Sales Tax
                    </span>
                    <span className={styles.summaryValue}>
                      ₹{salesTax}
                    </span>
                  </div>

                  {/* Grand Total */}
                  <div className={styles.grandTotalRow}>
                    <span className={styles.grandTotalLabel}>
                      Grand total
                    </span>
                    <span className={styles.grandTotalValue}>
                      ₹{total}
                    </span>
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => {
                      console.log('Order now clicked');
                      setShowShipping(true);
                    }}
                    className={styles.orderBtn}
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
