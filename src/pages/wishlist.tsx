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
  variants: any[];
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

  const handleRemove = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await wishlistApi.toggleWishlist(productId);
      if (response.data.status) {
        toast.success("Item removed");
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      }
    } catch (error) {
      toast.error("Could not remove item");
    }
  };

  return (
    <>
      <Head>
        <title>My Wishlist - FutureNature</title>
      </Head>

      <div className="page-layout">
        <Navbar />

        <main className="main-content">
          <div className="container">
            
            {/* --- PAGE HEADER --- */}
            <div className="header-section">
              <h1 className="page-title">My Wishlist</h1>
              <p className="item-count">
                You have <strong>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</strong> saved.
              </p>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : wishlist.length === 0 ? (
              
              /* --- EMPTY STATE --- */
              <div className="empty-state">
                <div className="empty-icon-circle">
                  <span className="heart-broken">💔</span>
                </div>
                <h3>Your Wishlist is Empty</h3>
                <p>Looks like you haven't found your favorites yet.</p>
                
                {/* --- PROMINENT ACTION BUTTON --- */}
                <Link href="/products" className="browse-btn">
                  <span>Start Shopping Now</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>

            ) : (
              
              /* --- WISHLIST GRID --- */
              <div className="product-grid">
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-card">
                    
                    {/* 1. Image Area */}
                    <Link href={`/details/${product.id}`} className="card-media">
                      <div className="img-wrapper">
                        <Image
                          src={product.imageUrl[0] || "/Assets/Products/15.png"}
                          alt={product.product_name}
                          fill
                          className="product-img"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleRemove(e, product.id)}
                        title="Remove from Wishlist"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </Link>

                    {/* 2. Content Area */}
                    <div className="card-info">
                      <div className="info-top">
                        <h3 className="name">
                          <Link href={`/details/${product.id}`}>{product.product_name}</Link>
                        </h3>
                        <p className="tamil-name">{product.product_name_tamil}</p>
                        
                        <div className="rating-box">
                          <Rating initialValue={product.overall_rating} readonly size={18} fillColor="#f59e0b" emptyColor="#d1d5db" allowFraction />
                          <span className="review-count">({product.review_count})</span>
                        </div>
                      </div>

                      <div className="info-bottom">
                        <div className="price-block">
                          <span className="current-price">₹{product.selling_price}</span>
                          {product.price && product.price !== product.selling_price && (
                            <span className="original-price">₹{product.price}</span>
                          )}
                        </div>

                        <Link href={`/details/${product.id}`} className="view-btn">
                          View Product
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        /* --- VARIABLES --- */
        .page-layout {
          --gold: #f59e0b;
          --gold-dark: #b45309; 
          --black: #111827;
          --dark-gray: #374151;
          --border: #e5e7eb;
          --bg-gray: #f9fafb;
          
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--bg-gray);
          font-family: 'Inter', sans-serif;
        }

        .main-content {
          flex: 1;
          width: 100%;
          padding-top: 100px;
          padding-bottom: 80px;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 50px;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: var(--black);
          font-weight: 800;
          margin: 0 0 10px;
        }

        .item-count {
          color: var(--dark-gray);
          font-size: 18px;
        }

        /* --- EMPTY STATE --- */
        .empty-state {
          background: #fff;
          border-radius: 24px;
          padding: 100px 20px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          border: 1px solid #fff;
        }

        .empty-icon-circle {
          width: 100px; height: 100px;
          background: #fef3c7; 
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 30px;
          font-size: 40px;
        }

        .empty-state h3 {
          font-size: 32px;
          font-weight: 900;
          color: var(--black);
          margin-bottom: 12px;
        }

        .empty-state p {
          color: var(--dark-gray);
          font-size: 18px;
          margin-bottom: 50px;
        }

        /* --- THE FIX: GLOBAL STYLE FOR THE BROWSE BUTTON --- */
        /* Using :global ensures Next.js Link component renders correctly */
        :global(.browse-btn) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          
          /* Strong Gradient */
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          
          color: #ffffff !important;
          font-size: 18px;
          font-weight: 800;
          padding: 22px 50px;
          border-radius: 50px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          
          /* Glow Shadow */
          box-shadow: 0 20px 40px -10px rgba(245, 158, 11, 0.6);
          
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: pulse 2s infinite;
          cursor: pointer;
        }

        :global(.browse-btn:hover) {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 25px 50px -10px rgba(245, 158, 11, 0.8);
          background: linear-gradient(135deg, #fbbf24 0%, #b45309 100%);
        }

        :global(.arrow-icon) {
          transition: transform 0.3s ease;
        }
        
        :global(.browse-btn:hover .arrow-icon) {
          transform: translateX(6px);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }

        /* --- GRID & CARDS --- */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .wishlist-card {
          background: #fff;
          border: 1px solid #d1d5db;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }
        .wishlist-card:hover {
          border-color: var(--gold);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          transform: translateY(-5px);
        }

        .card-media {
          position: relative;
          display: block;
          background-color: #ffffff;
          padding: 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1; 
        }

        :global(.product-img) {
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .wishlist-card:hover :global(.product-img) {
          transform: scale(1.08);
        }

        .delete-btn {
          position: absolute;
          top: 12px; right: 12px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #e5e7eb;
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .delete-btn:hover {
          background: #fee2e2;
          border-color: #fee2e2;
          color: #ef4444;
        }

        .card-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .name {
          font-size: 20px;
          font-weight: 700;
          color: var(--black);
          margin: 0 0 6px;
          line-height: 1.3;
        }
        .name a { text-decoration: none; color: inherit; }

        .tamil-name {
          font-size: 14px;
          color: var(--gold-dark);
          font-weight: 600;
          margin: 0 0 12px;
        }

        .rating-box {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 20px;
        }
        .review-count {
          font-size: 13px;
          color: var(--dark-gray);
          font-weight: 500;
        }

        .info-bottom { margin-top: auto; }

        .price-block {
          display: flex; align-items: baseline; gap: 10px;
          margin-bottom: 16px;
        }

        .current-price {
          font-size: 24px;
          font-weight: 800;
          color: var(--black);
        }

        .original-price {
          font-size: 16px;
          color: #6b7280;
          text-decoration: line-through;
          font-weight: 500;
        }

        .view-btn {
          display: block;
          width: 100%;
          text-align: center;
          background-color: #fff;
          color: var(--black);
          border: 2px solid var(--black);
          padding: 12px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }

        .view-btn:hover {
          background-color: var(--black);
          color: #fff;
        }

        .loader-container { display: flex; justify-content: center; padding: 60px; }
        .spinner {
          width: 40px; height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .main-content { padding-top: 80px; }
          .header-section { margin-bottom: 30px; }
          .page-title { font-size: 36px; }
          
          .product-grid { grid-template-columns: 1fr; gap: 20px; }

          .wishlist-card {
            flex-direction: row;
            height: 160px;
            align-items: center;
          }

          .card-media {
            width: 130px;
            height: 100%;
            padding: 10px;
            border-bottom: none;
            border-right: 1px solid #f3f4f6;
            flex-shrink: 0;
          }

          .card-info {
            padding: 16px;
            justify-content: center;
          }

          .name { font-size: 16px; margin-bottom: 4px; }
          .tamil-name { display: none; }
          .rating-box { margin-bottom: 8px; }
          .review-count { display: none; }
          
          .current-price { font-size: 18px; }
          .original-price { font-size: 14px; }
          
          .view-btn {
            padding: 8px;
            font-size: 13px;
            border-width: 1px;
          }
          
          /* Mobile Button Adjustment */
          :global(.browse-btn) {
            padding: 18px 30px;
            font-size: 16px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}