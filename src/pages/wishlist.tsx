import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { wishlistApi } from "@/api/wishlistApi";
import Link from "next/link";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";

interface Product {
    id: string;
    product_name: string;
    product_name_tamil: string;
    imageUrl: string[];
    overall_rating: number;
    review_count: number;
    price: string;
    selling_price: string;
    variants: {
        id: string;
        attribute_name: string;
        selling_price: string;
        price: string;
    }[];
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const response = await wishlistApi.getWishlist();
            if (response.data.status) {
                setWishlist(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            const response = await wishlistApi.toggleWishlist(productId);
            if (response.data.status) {
                toast.success("Removed from wishlist");
                setWishlist((prev) => prev.filter((item) => item.id !== productId));
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove from wishlist");
        }
    };

    return (
        <>
            <Head>
                <title>My Wishlist - FutureNature</title>
            </Head>

            <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
                <Navbar />

                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '120px 24px 80px'
                }}>
                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        color: '#111827',
                        marginBottom: '40px',
                        textAlign: 'center'
                    }}>
                        MY WISHLIST
                    </h1>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="loader">Loading...</div>
                        </div>
                    ) : wishlist.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '100px 20px',
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>❤️</div>
                            <h2 style={{ fontSize: '24px', color: '#374151', marginBottom: '16px' }}>
                                Your wishlist is empty
                            </h2>
                            <p style={{ color: '#6b7280', marginBottom: '32px' }}>
                                Save items you love to find them easily later.
                            </p>
                            <Link href="/products">
                                <button style={{
                                    backgroundColor: '#fbbf24',
                                    color: '#111827',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '16px 32px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}>
                                    Browse Products
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '30px'
                        }}>
                            {wishlist.map((product) => (
                                <div
                                    key={product.id}
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        position: 'relative',
                                        transition: 'transform 0.3s'
                                    }}
                                >
                                    <button
                                        onClick={() => handleRemoveFromWishlist(product.id)}
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
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            zIndex: 2,
                                            color: '#ef4444'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                    </button>

                                    <Link href={`/details/${product.id}`}>
                                        <div style={{ height: '250px', position: 'relative', overflow: 'hidden' }}>
                                            <Image
                                                src={product.imageUrl[0] || "/Assets/Products/15.png"}
                                                alt={product.product_name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    </Link>

                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                                            {product.product_name}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                                            {product.product_name_tamil}
                                        </p>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                            <Rating initialValue={product.overall_rating} readonly size={16} allowFraction />
                                            <span style={{ fontSize: '14px', color: '#6b7280' }}>
                                                ({product.review_count})
                                            </span>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                                                ₹{product.selling_price}
                                            </span>
                                            <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' }}>
                                                ₹{product.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
