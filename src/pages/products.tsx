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

export default function Products({ products }: { products: Product[] }) {
    const { cart, addToCart, updateQuantity } = useCart();
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [wishlistIds, setWishlistIds] = useState<string[]>([]);
    const [pendingWishlistId, setPendingWishlistId] = useState<string | null>(null);

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

    const handleQuantityChange = (productId: string, variantId: string, change: number) => {
        const currentQty = quantities[variantId] || 1;
        const newQty = currentQty + change;

        if (newQty === 0) {
            setQuantities(prev => ({
                ...prev,
                [variantId]: 1
            }));
            updateQuantity(productId, variantId, 0);
        } else {
            setQuantities(prev => ({
                ...prev,
                [variantId]: newQty
            }));
            updateQuantity(productId, variantId, newQty);
        }
    };

    const handleAddToCart = (product: Product) => {
        setQuantities(prev => ({
            ...prev,
            [product.variantId]: 1
        }));
        addToCart(product.id, product.variantId, 1, {
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight
        });
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
                    <div className="products-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '30px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {products?.map((product) => (
                            <Link
                                href={`/details/${product.id}`}
                                key={product.id}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
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
                                        src={'https://res.cloudinary.com/dibccigcp/image/upload/v1768056837/3_wyiiij.webp'}
                                        alt={product.name}
                                        width={400}
                                        height={320}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />
                                    <button
                                        onClick={(e) => handleToggleWishlist(product.id.toString(), e)}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            backgroundColor: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            zIndex: 2,
                                            color: wishlistIds.includes(product.id.toString()) ? '#ef4444' : '#d1d5db',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistIds.includes(product.id.toString()) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>
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
                                            <Rating initialValue={product.rating} readonly size={16} allowFraction />
                                            <span style={{
                                                fontSize: '14px',
                                                color: '#6b7280',
                                                marginLeft: '4px'
                                            }}>
                                                {product.rating} ({product.reviewCount || 0})
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

                                    {/* Add to Cart Button / Quantity Controls */}
                                    {!cart.find(item => item.variantId === product.variantId) ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleAddToCart(product);
                                            }}
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
                                    ) : (
                                        <div
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
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
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleQuantityChange(product.id, product.variantId, -1);
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
                                                {cart.find(item => item.variantId === product.variantId)?.quantity || 1}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleQuantityChange(product.id, product.variantId, 1);
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
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}



export const getServerSideProps = async () => {
    try {
        const response = await productApi.getAllProducts();
        const data = response.data;
        let products: Product[] = [];
        if (data.status) {
            products = data.data.map((item: BackendProduct) => ({
                id: item.id,
                name: item.product_name,
                nameTamil: item.product_name_tamil,
                image: item.imageUrl && item.imageUrl.length > 0 ? item.imageUrl[0] : "/Assets/Products/15.png",
                rating: item.overall_rating || 0,
                reviewCount: item.review_count || 0,
                weight: item.variants && item.variants.length > 0 ? item.variants[0].attribute_name : "Standard",
                variantId: item.variants && item.variants.length > 0 ? item.variants[0].id : "",
                price: parseFloat(item.selling_price),
                originalPrice: parseFloat(item.price),
                description: item.description,
                descriptionTamil: item.description_tamil,
                benefits: [],
                benefitsTamil: [],
                discount: parseFloat(item.discounted_amount),
                isBestSeller: false
            }));
        }
        return { props: { products } };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return { props: { products: [] } };
    }
}