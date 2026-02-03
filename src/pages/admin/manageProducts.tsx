import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { productApi } from "@/api/productApi";
import { isAdminUser } from "@/utils/authUtils";
import Cookies from "js-cookie";
import styles from "@/styles/ManageProducts.module.scss";

interface Product {
    id: string;
    product_name: string;
    product_name_tamil: string;
    imageUrl: string[];
    selling_price: string;
}

export default function ManageProducts() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || !isAdminUser(token)) {
            toast.error("Unauthorized access");
            router.push("/");
            return;
        }
        fetchProducts();
    }, [router]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productApi.getAllProducts();
            if (response.data.status) {
                setProducts(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/admin/addProduct?id=${id}`);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await productApi.deleteProduct(id);
                if (response.data.status) {
                    toast.success("Product deleted successfully");
                    fetchProducts();
                } else {
                    toast.error(response.data.message || "Failed to delete product");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <Toaster />
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <button onClick={() => router.push("/")} className={styles.backBtn}>
                            &larr; Back to Home
                        </button>
                        <h1 className={styles.title}>Manage Products</h1>
                    </div>
                    <button
                        onClick={() => router.push("/admin/addProduct")}
                        className={styles.addBtn}
                    >
                        + Add New Product
                    </button>
                </div>

                {loading ? (
                    <div className={styles.loadingState}>Loading products...</div>
                ) : products.length === 0 ? (
                    <div className={styles.emptyState}>No products found.</div>
                ) : (
                    <div className={styles.productGrid}>
                        {products.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.imageArea}>
                                    <Image
                                        src={product.imageUrl?.[0] || "/Assets/Products/15.png"}
                                        alt={product.product_name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h2 className={styles.productTitle}>{product.product_name}</h2>
                                    <p className={styles.tamilTitle}>{product.product_name_tamil}</p>
                                    <span className={styles.price}>₹{product.selling_price}</span>
                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className={styles.editBtn}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
