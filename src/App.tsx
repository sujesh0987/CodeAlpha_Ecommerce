import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import ProductDetailsView from './components/ProductDetailsView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import CartView from './components/CartView';
import WishlistView from './components/WishlistView';
import CheckoutView from './components/CheckoutView';
import OrderConfirmationView from './components/OrderConfirmationView';
import AdminPanelView from './components/AdminPanelView';
import AuthModal from './components/AuthModal';

import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, Order, Review, User, Coupon } from './types';

export default function App() {
  // 1. Core States (Synchronized with localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('walkin_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('walkin_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('walkin_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('walkin_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('walkin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 2. Navigation & Page View states
  const [currentView, setView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  
  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // 3. Sync States to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem('walkin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('walkin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('walkin_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('walkin_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('walkin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('walkin_user');
    }
  }, [user]);

  // Page tracking helper
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentView]);

  // 4. State Handlers
  
  // Cart Actions
  const handleAddToCart = (product: Product, size: number, color: string, colorName: string) => {
    const cartItemId = `${product.id}-${size}-${color.replace('#', '')}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            quantity: 1,
            selectedSize: size,
            selectedColor: color,
            selectedColorName: colorName,
          },
        ];
      }
    });
  };

  const handleUpdateQty = (cartItemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.product.stock) }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Auth Statuses
  const handleLoginSuccess = (profile: User) => {
    setUser(profile);
  };

  const handleLogout = () => {
    setUser(null);
    setAppliedCoupon(null);
    // If on admin view, send back to home
    if (currentView === 'admin') {
      setView('home');
    }
  };

  // Add customer reviews directly to the product catalog state
  const handleAddReview = (productId: string, review: Review) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [review, ...prod.reviews];
          const newAvgRating = parseFloat(
            ((prod.rating * prod.reviewsCount + review.rating) / (prod.reviewsCount + 1)).toFixed(1)
          );
          return {
            ...prod,
            reviewsCount: prod.reviewsCount + 1,
            rating: newAvgRating,
            reviews: updatedReviews,
          };
        }
        return prod;
      })
    );
  };

  // Checkout placement action
  const handlePlaceOrder = (newOrder: Order) => {
    // 1. Add order to order list
    setOrders((prev) => [newOrder, ...prev]);
    
    // 2. Adjust products stock levels based on cart items
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItemMatch = cart.find((item) => item.productId === prod.id);
        if (cartItemMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartItemMatch.quantity),
          };
        }
        return prod;
      })
    );

    // 3. Reset shopping cart and coupon
    setCart([]);
    setAppliedCoupon(null);

    // 4. Save to last order reference and navigate to confirmation screen
    setLastPlacedOrder(newOrder);
    setView('confirmation');
  };

  // Admin Catalog Modification Handlers
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === updatedProduct.id ? updatedProduct : prod))
    );
    // If current details view is looking at this product, refresh details object
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== productId));
    // If viewing this product, send back to shop
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(null);
      setView('shop');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // 5. Render active view route mapper
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            products={products}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        );
      case 'shop':
        return (
          <ShopView
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        );
      case 'details':
        if (!selectedProduct) {
          setView('shop');
          return null;
        }
        return (
          <ProductDetailsView
            product={selectedProduct}
            products={products}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddReview={handleAddReview}
          />
        );
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'cart':
        return (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            setView={setView}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
          />
        );
      case 'wishlist':
        return (
          <WishlistView
            wishlist={wishlist}
            products={products}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case 'checkout':
        if (cart.length === 0) {
          setView('shop');
          return null;
        }
        return (
          <CheckoutView
            cart={cart}
            appliedCoupon={appliedCoupon}
            setView={setView}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case 'confirmation':
        if (!lastPlacedOrder) {
          setView('home');
          return null;
        }
        return <OrderConfirmationView order={lastPlacedOrder} setView={setView} />;
      case 'admin':
        if (!user || !user.isAdmin) {
          setView('home');
          return null;
        }
        return (
          <AdminPanelView
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            setView={setView}
          />
        );
      default:
        return (
          <HomeView
            products={products}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans flex flex-col justify-between selection:bg-orange-500 selection:text-black">
      
      {/* 1. Universal Top Header Navigation */}
      <Navbar
        currentView={currentView}
        setView={setView}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSearch={(query) => {
          setSearchQuery(query);
          setView('shop');
        }}
      />

      {/* 2. Primary Dynamic View Content */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* 3. Universal Footer Branding */}
      <Footer setView={setView} />

      {/* 4. Login and Signup Dialog box */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
