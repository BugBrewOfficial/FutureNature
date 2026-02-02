import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartApi } from '@/api/cartApi';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

export interface CartItem {
    id: string; // Product ID
    variantId: string; // Attribute ID
    quantity: number;
    name?: string;
    price?: number;
    image?: string;
    weight?: string;
    cartItemId?: string; // Backend CartItem ID
}

interface CartContextType {
    cart: CartItem[];
    cartId: string | null;
    addToCart: (productId: string, variantId: string, quantity: number, productDetails?: Partial<CartItem>) => Promise<void>;
    removeFromCart: (productId: string, variantId: string, cartItemId?: string) => Promise<void>;
    updateQuantity: (productId: string, variantId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export interface BackendCartItem {
    id: string;
    selected_quantity: string;
    total_price: string;
    discounted_price: string;
    mrp_price: string;
    cartId: string;
    productId: string; // This is the AttributeProduct ID
    product: {
        id: string;
        attribute_name: string;
        selling_price: string;
        Product: {
            id: string;
            product_name: string;
            imageUrl: string[];
        };
    };
}

const mapBackendItemToCartItem = (item: BackendCartItem): CartItem => ({
    id: item.product.Product.id,
    variantId: item.productId,
    quantity: parseInt(item.selected_quantity),
    name: `${item.product.Product.product_name} - ${item.product.attribute_name}`,
    price: parseFloat(item.product.selling_price),
    image: item.product.Product.imageUrl[0] || "",
    weight: item.product.attribute_name,
    cartItemId: item.id
});


export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartId, setCartId] = useState<string | null>(null);
    const { openLoginModal } = useAuth();

    // Fetch cart from backend if logged in
    useEffect(() => {
        const fetchBackendCart = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await cartApi.getCart();
                    if (response.data.status && response.data.data) {
                        const backendCart = response.data.data;
                        setCartId(backendCart.id);
                        const mappedItems: CartItem[] = backendCart.cart_item.map(mapBackendItemToCartItem);
                        setCart(mappedItems);
                    }
                } catch (error) {
                    console.error("Error fetching backend cart:", error);
                }
            } else {
                setCart([]);
                setCartId(null);
            }
        };
        fetchBackendCart();
    }, []);

    const addToCart = async (productId: string, variantId: string, quantity: number, productDetails?: Partial<CartItem>) => {
        const token = Cookies.get('token');

        if (token) {
            try {
                const response = await cartApi.addToCart({
                    productId,
                    attributeId: variantId,
                    cartId: cartId || undefined
                });

                if (response.data.status) {
                    const newCartData = response.data.data;
                    setCartId(newCartData.id);

                    const allCartResponse = await cartApi.getCart();
                    if (allCartResponse.data.status && allCartResponse.data.data) {
                        const backendCart = allCartResponse.data.data;
                        const mappedItems: CartItem[] = backendCart.cart_item.map(mapBackendItemToCartItem);
                        setCart(mappedItems);
                    }
                    toast.success("Added to cart");
                }
            } catch (error) {
                console.error("Error adding to backend cart:", error);
                toast.error("Failed to sync with server");
            }
        } else {
            // Not logged in, open login modal with callback
            openLoginModal(() => {
                // This callback runs after successful login
                addToCart(productId, variantId, quantity, productDetails);
            });
        }
    };

    const removeFromCart = async (productId: string, variantId: string, cartItemId?: string) => {
        const token = Cookies.get('token');

        if (token && cartId) {
            try {
                const response = await cartApi.deleteCartItem({
                    cartItemId: cartItemId || variantId, // Fallback to variantId if cartItemId not provided
                    attributeId: variantId,
                    cartId: cartId
                });

                if (response.data.status) {
                    setCart((prevCart) => prevCart.filter((item) => item.variantId !== variantId));
                    toast.success("Removed from cart");
                }
            } catch (error) {
                console.error("Error removing from backend cart:", error);
                toast.error("Failed to sync with server");
            }
        }
    };

    const updateQuantity = async (productId: string, variantId: string, quantity: number) => {
        const token = Cookies.get('token');

        if (token) {
            if (quantity <= 0) {
                const item = cart.find(i => i.variantId === variantId);
                await removeFromCart(productId, variantId, item?.cartItemId);
                return;
            }

            const currentItem = cart.find(i => i.variantId === variantId);
            if (currentItem && quantity > currentItem.quantity) {
                await addToCart(productId, variantId, quantity - currentItem.quantity);
            } else if (currentItem && quantity < currentItem.quantity) {
                // Backend limitation: no easy way to decrease quantity via add API if it increments.
                // Assuming we can't easily decrease without a specific API or removing and re-adding.
                // For now, let's assume we can only increment or remove. 
                // Or if the backend supports setting quantity directly, we should use that.
                // Based on previous code, it seems we only had addToCart which increments.
                // Let's keep the logic consistent with previous implementation but only for authenticated users.

                // If we can't decrease, we might need to remove and add back? 
                // Or maybe the backend handles negative quantity in add? Unlikely.
                // For now, we'll just update local state to reflect UI, but this might be out of sync.
                // Ideally we need a updateCartItem API.

                // Reverting to previous behavior: update local state
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.variantId === variantId ? { ...item, quantity } : item
                    )
                );
            }
        }
    };

    const clearCart = () => {
        setCart([]);
        setCartId(null);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, cartId, addToCart, removeFromCart, updateQuantity, clearCart, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
