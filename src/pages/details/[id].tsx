import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { productApi } from "@/api/productApi";
import { reviewApi } from "@/api/reviewApi";
import { GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import { wishlistApi } from "@/api/wishlistApi";
import Cookies from "js-cookie";

interface Product {
    id: string
    product_name: string
    product_name_tamil: string
    description: string
    description_tamil: string
    imageUrl: string[]
    price: string
    discounted_type: string
    discounted_amount: string
    selling_price: string
    available_quantity: number
    overall_rating: number
    review_count: number
    variants: {
        id: string;
        attribute_name: string;
        selling_price: string;
        price: string;
    }[]
    reviews: {
        id: string;
        rating: number;
        review: string;
        addedBy: {
            firstName: string;
            lastName: string;
        };
    }[]
    isBestSeller?: boolean
    benefits?: string[]
    benefitsTamil?: string[]
}

export default function ViewProduct({ product }: { product: Product }) {
    const { cart, addToCart, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(product.variants && product.variants.length > 0 ? product.variants[0] : null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const [reviews, setReviews] = useState(product.reviews || []);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [hasFetchedReviews, setHasFetchedReviews] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [pendingWishlist, setPendingWishlist] = useState(false);

    useEffect(() => {
        const checkWishlist = async () => {
            const token = Cookies.get("token");
            if (token) {
                try {
                    const response = await wishlistApi.getWishlist();
                    if (response.data.status) {
                        const isInWishlist = response.data.data.some((p: { id: string }) => p.id === product.id);
                        setIsWishlisted(isInWishlist);
                    }
                } catch (error) {
                    console.error("Error checking wishlist:", error);
                }
            }
        };
        checkWishlist();
    }, [product.id]);

    const handleToggleWishlist = useCallback(async () => {
        const token = Cookies.get("token");
        if (!token) {
            toast.error("Please login to add to wishlist");
            return;
        }

        try {
            const response = await wishlistApi.toggleWishlist(product.id);
            if (response.data.status) {
                setIsWishlisted(response.data.action === "added");
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            toast.error("Failed to update wishlist");
        }
    }, [product.id]);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token && pendingWishlist) {
            handleToggleWishlist();
            setPendingWishlist(false);
        }
    }, [pendingWishlist, handleToggleWishlist]);

    // Check if product is in cart
    const cartItem = cart.find(item => item.variantId === selectedVariant?.id);
    const isInCart = !!cartItem;

    // Sync quantity with cart
    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        } else {
            setQuantity(1);
        }
    }, [cartItem, selectedVariant]);

    const handleQuantityChange = (change: number) => {
        if (!selectedVariant) return;
        const newQty = quantity + change;
        if (newQty <= 0) {
            updateQuantity(product.id, selectedVariant.id, 0);
            setQuantity(1);
        } else {
            setQuantity(newQty);
            updateQuantity(product.id, selectedVariant.id, newQty);
        }
    };

    const handleAddToCart = () => {
        if (!selectedVariant) return;
        addToCart(product.id, selectedVariant.id, 1, {
            name: product.product_name,
            price: parseFloat(selectedVariant.selling_price),
            image: product.imageUrl[0],
            weight: selectedVariant.attribute_name
        });
        setQuantity(1);
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.product_name,
                    text: `Check out this ${product.product_name} on FutureNature!`,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    const fetchReviews = useCallback(async () => {
        if (hasFetchedReviews) return;
        try {
            const response = await reviewApi.getReviewsByProductId(product.id);
            if (response.data.status) {
                setReviews(response.data.data);
                setHasFetchedReviews(true);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }, [hasFetchedReviews, product.id]);

    const handlePostReview = async () => {
        if (!newReview.trim()) {
            toast.error("Please enter a review message");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await reviewApi.postReview(product.id, {
                message: newReview,
                rating: newRating
            });
            if (response.data.status) {
                toast.success("Review posted successfully!");
                setNewReview("");
                setNewRating(5);
                // Refresh reviews
                const updatedReviews = await reviewApi.getReviewsByProductId(product.id);
                if (updatedReviews.data.status) {
                    setReviews(updatedReviews.data.data);
                }
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { data?: { msg?: string } } } };
            console.error("Error posting review:", error);
            toast.error(err?.response?.data?.data?.msg || "Failed to post review. Please login first.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 450 && !hasFetchedReviews) {
                fetchReviews();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasFetchedReviews, fetchReviews]);

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


    return (
        <>
            <Head>
                <title>{product.product_name} - FutureNature</title>
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
                                    src={product.imageUrl[0]}
                                    alt={product.product_name}
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
                                    {product.product_name}
                                </h1>
                                <p style={{
                                    fontSize: '20px',
                                    color: '#6b7280',
                                    margin: 0,
                                    fontWeight: '500'
                                }}>
                                    {product.product_name_tamil}
                                </p>
                            </div>

                            {/* Weight Selection */}
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {product.variants?.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        style={{
                                            backgroundColor: selectedVariant?.id === variant.id ? '#fbbf24' : 'white',
                                            color: '#111827',
                                            border: selectedVariant?.id === variant.id ? 'none' : '2px solid #e5e7eb',
                                            borderRadius: '8px',
                                            padding: '10px 24px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (selectedVariant?.id !== variant.id) {
                                                e.currentTarget.style.borderColor = '#fbbf24';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (selectedVariant?.id !== variant.id) {
                                                e.currentTarget.style.borderColor = '#e5e7eb';
                                            }
                                        }}
                                    >
                                        {variant.attribute_name}
                                    </button>
                                ))}
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
                                    ₹{selectedVariant?.selling_price || product.price}
                                </div>
                                <div style={{
                                    fontSize: '20px',
                                    color: '#9ca3af',
                                    textDecoration: 'line-through'
                                }}>
                                    ₹{selectedVariant?.price || product.price}
                                </div>
                                {product.discounted_amount && (
                                    <div style={{
                                        color: '#10b981',
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    }}>
                                        {product.discounted_amount}% Discount
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
                                    <Rating initialValue={product.overall_rating} readonly size={20} allowFraction />
                                </div>
                                <span style={{
                                    fontSize: '16px',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>
                                    {product.review_count}
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
                                    {product.description_tamil}
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
                                    {product?.benefits?.join(' ')}
                                </p>
                                <p style={{
                                    fontSize: '14px',
                                    lineHeight: '1.8',
                                    color: '#6b7280',
                                    margin: 0,
                                    fontFamily: 'Arial, sans-serif'
                                }}>
                                    {product?.benefitsTamil?.join(' ')}
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
                                <button
                                    onClick={handleToggleWishlist}
                                    style={{
                                        backgroundColor: 'white',
                                        color: isWishlisted ? '#ef4444' : '#d1d5db',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '60px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#d1d5db';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
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
                            scrollbarWidth: 'thin',
                            padding: '10px'
                        }}
                    >
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={review.id || index} style={{
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
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: '600',
                                                color: '#111827'
                                            }}>
                                                {review.addedBy?.firstName} {review.addedBy?.lastName}
                                            </span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                <Rating initialValue={review.rating} readonly size={18} allowFraction />
                                            </div>
                                            <span style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                color: '#111827'
                                            }}>
                                                {review.rating}/5
                                            </span>
                                        </div>
                                    </div>
                                    <p style={{
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        color: '#374151',
                                        margin: 0
                                    }}>
                                        {review.review}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                                {hasFetchedReviews ? "No reviews yet. Be the first to review!" : "Scroll down to see reviews..."}
                            </p>
                        )}
                    </div>

                    {/* Write a Review Section */}
                    <div style={{
                        marginTop: '40px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <p style={{
                                fontSize: '16px',
                                color: '#9ca3af',
                                margin: 0
                            }}>
                                Rate this product:
                            </p>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <Rating
                                    onClick={setNewRating}
                                    initialValue={newRating}
                                    size={32}
                                    transition
                                    allowFraction
                                />
                            </div>
                        </div>
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
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
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
                                onClick={handlePostReview}
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: '#fbbf24',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: '16px 20px',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#f59e0b';
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#fbbf24';
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const fullPath = context.params?.id;
    let response;
    if (typeof fullPath === "string")
        response = await productApi.getProductById(fullPath)

    return { props: { product: response?.data?.data } }
}
