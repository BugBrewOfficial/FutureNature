import Image from "next/image";
import { useState } from "react";
import { useCart } from "./CartContext";
import { Rating } from "react-simple-star-rating";
import styles from "@/styles/DailyDeals.module.scss"; // Adjust path if needed

export default function DailyDeals() {
    const { addToCart, updateQuantity } = useCart();
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [showQuantityControls, setShowQuantityControls] = useState<{ [key: number]: boolean }>({});

    const products = [
        {
            id: 1,
            name: "Naming Ceremony Honey",
            nameTamil: "(மலை தேன்)",
            image: "/Assets/Products/1.png",
            rating: 4.5,
            weight: "250 gms",
            price: 2500,
            originalPrice: 3000,
            badge: "Daily Deals"
        },
        {
            id: 2,
            name: "Forest Honey",
            nameTamil: "(மலை தேன்)",
            image: "/Assets/Products/15.png",
            rating: 3.5,
            weight: "350 gms",
            price: 1800,
            originalPrice: 1200,
            badge: "Daily Deals"
        },
        {
            id: 3,
            name: "Moringa Atta",
            nameTamil: "(மலை தேன்)",
            image: "/Assets/Products/9.png",
            rating: 3.3,
            weight: "150 gms",
            price: 80,
            originalPrice: 70,
            badge: "Daily Deals"
        }
    ];

    return (
        <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionTitle}>DAILY DEALS</h2>

            {/* Grid Layout is handled entirely by SCSS */}
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <div key={product.id} className={styles.card}>
                        
                        {/* Badge */}
                        <div className={styles.badge}>{product.badge}</div>

                        {/* Image */}
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={350}
                                height={350}
                                className={styles.productImg}
                            />
                        </div>

                        {/* Details */}
                        <div className={styles.details}>
                            <div className={styles.productName}>
                                <h3>{product.name}</h3>
                                <p>{product.nameTamil}</p>
                            </div>

                            <div className={styles.metaRow}>
                                <div className={styles.ratingBox}>
                                    <Rating initialValue={product.rating} readonly size={14} allowFraction />
                                    <span>{product.rating}</span>
                                </div>
                                <span className={styles.weightTag}>{product.weight}</span>
                            </div>

                            <div className={styles.actionRow}>
                                <div className={styles.priceBlock}>
                                    <div className={styles.currentPrice}>₹ {product.price}</div>
                                    <div className={styles.oldPrice}>₹{product.originalPrice}</div>
                                </div>

                                {!showQuantityControls[product.id] ? (
                                    <button
                                        className={styles.addBtn}
                                        onClick={() => {
                                            setShowQuantityControls(prev => ({ ...prev, [product.id]: true }));
                                            addToCart(product.id.toString(), product.id.toString(), 1);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className={styles.qtyControl}>
                                        <button onClick={() => {
                                            const newQty = (quantities[product.id] || 1) - 1;
                                            if (newQty === 0) {
                                                setShowQuantityControls(prev => ({ ...prev, [product.id]: false }));
                                                setQuantities(prev => ({ ...prev, [product.id]: 1 }));
                                                updateQuantity(product.id.toString(), product.id.toString(), 0);
                                            } else {
                                                setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                                                updateQuantity(product.id.toString(), product.id.toString(), newQty);
                                            }
                                        }}>−</button>
                                        
                                        <div className={styles.qtyValue}>{quantities[product.id] || 1}</div>
                                        
                                        <button onClick={() => {
                                            const newQty = (quantities[product.id] || 1) + 1;
                                            setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                                            updateQuantity(product.id.toString(), product.id.toString(), newQty);
                                        }}>+</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}