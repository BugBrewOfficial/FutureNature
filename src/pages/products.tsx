import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { productApi } from "@/api/productApi";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import { wishlistApi } from "@/api/wishlistApi";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface Product {
    id: string;
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
    reviewCount?: number;
    variantId: string;
}

interface BackendProduct {
    id: string;
    product_name: string;
    product_name_tamil: string;
    imageUrl: string[];
    overall_rating?: number;
    review_count?: number;
    variants: {
        id: string;
        attribute_name: string;
    }[];
    selling_price: string;
    price: string;
    description: string;
    description_tamil: string;
    discounted_amount: string;
}

export default function Products({ products = [] }: { products: Product[] }) {
    const { cart, addToCart, updateQuantity } = useCart();
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [pendingWishlistId, setPendingWishlistId] = useState<string | null>(null);

    // --- Wishlist Logic ---
    useEffect(() => {
        const fetchWishlist = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const response = await wishlistApi.getWishlist();
                    if (response.data.status) {
                        setWishlistIds(response.data.data.map((p: { id: string }) => p.id));
                    }
                } catch (error) {
                    console.error("Error fetching wishlist:", error);
                }
            }
        };
        fetchWishlist();
    }, []);

    const handleToggleWishlist = useCallback(async (productId: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const token = Cookies.get("token");
        if (!token) {
            toast.error("Please login to add to wishlist");
            return;
        }
        try {
            const response = await wishlistApi.toggleWishlist(productId);
            if (response.data.status) {
                if (response.data.action === "added") {
                    setWishlistIds((prev) => [...prev, productId]);
                    toast.success("Added to wishlist");
                } else {
                    setWishlistIds((prev) => prev.filter((id) => id !== productId));
                    toast.success("Removed from wishlist");
                }
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            toast.error("Failed to update wishlist");
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token && pendingWishlistId) {
            const timer = setTimeout(() => {
                handleToggleWishlist(pendingWishlistId);
                setPendingWishlistId(null);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [pendingWishlistId, handleToggleWishlist]);

    // --- Cart Logic ---
    const handleQuantityChange = (productId: string, variantId: string, change: number) => {
        const currentQty = quantities[variantId] || 1;
        const newQty = currentQty + change;

        if (newQty === 0) {
            setQuantities(prev => ({ ...prev, [variantId]: 1 }));
            updateQuantity(productId, variantId, 0);
        } else {
            setQuantities(prev => ({ ...prev, [variantId]: newQty }));
            updateQuantity(productId, variantId, newQty);
        }
    };

    const handleAddToCart = (product: Product) => {
        setQuantities(prev => ({ ...prev, [product.variantId]: 1 }));
        addToCart(product.id, product.variantId, 1, {
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight
        });
        toast.success("Added to cart");
    };

    return (
        <>
            <Head>
                <title>Our Collection - FutureNature</title>
                <meta name="description" content="Browse our natural honey products" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            </Head>

            <div className="page-wrapper">
                <Navbar />

                {/* Hero / Header Section */}
                <header className="page-header">
                    <div className="header-content">
                        <span className="eyebrow">THE HARVEST</span>
                        <h1 className="page-title">
                            Pure, Raw & <br/><em>Unfiltered.</em>
                        </h1>
                        <p className="page-desc">
                            Direct from our hives to your home. No processing, no additives—just nature's liquid gold.
                        </p>
                    </div>
                    <div className="header-decoration"></div>
                </header>

                {/* Products Grid Section */}
                <section className="catalog-section">
                    <div className="container">
                        
                        {/* Products Grid */}
                        <div className="products-grid">
                            {products?.map((product, index) => (
                                <Link
                                    href={`/details/${product.id}`}
                                    key={product.id || index}
                                    className="product-card"
                                >
                                    {/* Image Area */}
                                    <div className="card-image-wrap">
                                        <Image
                                            src={product.image || '/Assets/Products/15.png'}
                                            alt={product.name}
                                            width={400}
                                            height={320}
                                            className="product-img"
                                        />
                                        
                                        {/* Wishlist Fab */}
                                        <button
                                            onClick={(e) => handleToggleWishlist(product.id.toString(), e)}
                                            className={`wishlist-fab ${wishlistIds.includes(product.id.toString()) ? 'active' : ''}`}
                                            aria-label="Add to wishlist"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistIds.includes(product.id.toString()) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </button>

                                        {/* Discount Tag */}
                                        {product.discount && product.discount > 0 && (
                                            <div className="discount-tag">
                                                -{Math.round(product.discount)}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="card-content">
                                        <div className="content-top">
                                            <h3 className="card-title">{product.name}</h3>
                                            {product.nameTamil && <span className="card-subtitle">{product.nameTamil}</span>}
                                        </div>

                                        <div className="card-meta">
                                            <div className="rating-box">
                                                <Rating initialValue={product.rating} readonly size={14} allowFraction fillColor="#d97706" />
                                                <span className="rating-num">({product.reviewCount || 0})</span>
                                            </div>
                                            <span className="weight-badge">{product.weight}</span>
                                        </div>

                                        <div className="card-footer">
                                            <div className="price-box">
                                                <span className="price-curr">₹{product.price}</span>
                                                {product.originalPrice > product.price && (
                                                    <span className="price-old">₹{product.originalPrice}</span>
                                                )}
                                            </div>

                                            {/* Cart Actions */}
                                            {!cart.find(item => item.variantId === product.variantId) ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleAddToCart(product);
                                                    }}
                                                    className="btn-primary"
                                                >
                                                    Add
                                                </button>
                                            ) : (
                                                <div
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    className="qty-selector"
                                                >
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleQuantityChange(product.id, product.variantId, -1);
                                                        }}
                                                        className="qty-btn"
                                                    >−</button>
                                                    <span className="qty-val">
                                                        {cart.find(item => item.variantId === product.variantId)?.quantity || 1}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleQuantityChange(product.id, product.variantId, 1);
                                                        }}
                                                        className="qty-btn"
                                                    >+</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />

            <style jsx>{`
                /* --- VARIABLES --- */
                .page-wrapper {
                    --gold: #d97706;
                    --gold-light: #fbbf24;
                    --cream: #fffbeb;
                    --dark: #1c1917;
                    --gray: #6b7280;
                    --border: #e5e7eb;
                    
                    font-family: 'Inter', sans-serif;
                    background: #ffffff;
                    min-height: 100vh;
                }

                h1, h2, h3, em {
                    font-family: 'Playfair Display', serif;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* --- HEADER --- */
                .page-header {
                    background-color: var(--cream);
                    padding: 80px 24px 60px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .header-content {
                    position: relative;
                    z-index: 2;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    color: var(--gold);
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 16px;
                }

                .page-title {
                    font-size: 56px;
                    color: var(--dark);
                    line-height: 1.1;
                    margin-bottom: 20px;
                }

                .page-title em {
                    color: var(--gold);
                    font-style: italic;
                }

                .page-desc {
                    font-size: 18px;
                    color: var(--gray);
                    line-height: 1.6;
                    max-width: 500px;
                    margin: 0 auto;
                }

                /* --- CATALOG GRID --- */
                .catalog-section {
                    padding: 60px 0 100px;
                }

                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }

                /* --- PRODUCT CARD --- */
                .product-card {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                    text-decoration: none;
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    border-color: var(--gold-light);
                }

                .card-image-wrap {
                    position: relative;
                    background: #fdfbf7;
                    height: 300px;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .product-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .product-card:hover .product-img {
                    transform: scale(1.05);
                }

                /* Wishlist FAB */
                .wishlist-fab {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.9);
                    backdrop-filter: blur(4px);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #9ca3af;
                    transition: all 0.2s;
                    z-index: 5;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }

                .wishlist-fab:hover {
                    transform: scale(1.1);
                    color: #ef4444;
                }

                .wishlist-fab.active {
                    color: #ef4444;
                    background: #fee2e2;
                }

                /* Discount Tag */
                .discount-tag {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: var(--dark);
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 4px;
                    z-index: 5;
                }

                /* Content */
                .card-content {
                    padding: 24px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .content-top {
                    margin-bottom: 12px;
                }

                .card-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--dark);
                    margin: 0 0 4px;
                }

                .card-subtitle {
                    font-size: 13px;
                    color: var(--gray);
                }

                .card-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .rating-box {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .rating-num {
                    font-size: 12px;
                    color: var(--gray);
                }

                .weight-badge {
                    font-size: 11px;
                    font-weight: 600;
                    background: var(--cream);
                    color: var(--gold);
                    padding: 4px 10px;
                    border-radius: 20px;
                    text-transform: uppercase;
                }

                /* Footer & Price */
                .card-footer {
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    border-top: 1px solid #f3f4f6;
                    padding-top: 16px;
                }

                .price-box {
                    display: flex;
                    flex-direction: column;
                }

                .price-curr {
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--dark);
                }

                .price-old {
                    font-size: 13px;
                    color: #9ca3af;
                    text-decoration: line-through;
                }

                /* Buttons */
                .btn-primary {
                    background: var(--dark);
                    color: #fff;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-primary:hover {
                    background: var(--gold);
                }

                .qty-selector {
                    display: flex;
                    align-items: center;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    overflow: hidden;
                }

                .qty-btn {
                    background: transparent;
                    border: none;
                    width: 32px;
                    height: 36px;
                    font-size: 16px;
                    cursor: pointer;
                    color: var(--dark);
                    transition: background 0.2s;
                }

                .qty-btn:hover {
                    background: #f3f4f6;
                }

                .qty-val {
                    width: 32px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 600;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .products-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .products-grid {
                        grid-template-columns: 1fr;
                        max-width: 400px;
                        margin: 0 auto;
                    }

                    .page-title {
                        font-size: 42px;
                    }
                }
            `}</style>
        </>
    );
}

// FIX: Robust getServerSideProps with NaN protection
export const getServerSideProps = async () => {
    try {
        const response = await productApi.getAllProducts();
        const data = response.data;
        let products: Product[] = [];
        
        if (data && data.status && Array.isArray(data.data)) {
            const safeParseFloat = (val: any) => {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? 0 : parsed;
            };

            products = data.data.map((item: BackendProduct) => ({
                id: item.id?.toString() || "", 
                name: item.product_name || "Unknown Product",
                nameTamil: item.product_name_tamil || "",
                image: Array.isArray(item.imageUrl) && item.imageUrl.length > 0 
                    ? item.imageUrl[0] 
                    : "/Assets/Products/15.png",
                rating: item.overall_rating || 0,
                reviewCount: item.review_count || 0,
                weight: Array.isArray(item.variants) && item.variants.length > 0 
                    ? item.variants[0].attribute_name 
                    : "Standard",
                variantId: Array.isArray(item.variants) && item.variants.length > 0 
                    ? item.variants[0].id 
                    : `fallback-${item.id}`,
                price: safeParseFloat(item.selling_price),
                originalPrice: safeParseFloat(item.price),
                description: item.description || "",
                descriptionTamil: item.description_tamil || "",
                benefits: [],
                benefitsTamil: [],
                discount: safeParseFloat(item.discounted_amount),
                isBestSeller: false
            }));
        }
        return { props: { products } };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return { props: { products: [] } };
    }
}