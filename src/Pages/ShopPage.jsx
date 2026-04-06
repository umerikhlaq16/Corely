import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiSearch, FiX, FiPlus, FiMinus, FiTrash2, FiArrowRight } from 'react-icons/fi';

const ShopPage = () => {
  // STATES 
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Stickers', 'Posters', 'Apparel', 'Stationery'];

  const products = [
    { id: 1, name: "Cyber Glitch Pack", price: 15, category: "Stickers", image: "https://images.unsplash.com/photo-1572375927902-1c09e2d5c9d9?w=500", tag: "Best Seller" },
    { id: 2, name: "Neon Nights", price: 45, category: "Posters", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500", tag: "New Drop" },
    { id: 3, name: "Minimalist Journal", price: 25, category: "Stationery", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500", tag: "Limited" },
    { id: 4, name: "Studio Tee", price: 55, category: "Apparel", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", tag: "Eco" },
    { id: 5, name: "Abstract Set", price: 12, category: "Stickers", image: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?w=500", tag: "" },
  ];

  // LOGIC 
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true); // Open cart automatically when item added
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] font-sans selection:bg-[#FF4D00] selection:text-white">
      
      {/* CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Your Bag ({cart.length})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><FiX size={24}/></button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-6 pr-2 no-scrollbar">
                {cart.length === 0 ? (
                  <p className="text-gray-400 text-center py-20 font-medium tracking-widest uppercase text-xs">Your bag is empty.</p>
                ) : cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} className="w-20 h-24 object-cover rounded-xl bg-gray-100" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs font-black text-[#FF4D00]">${item.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 border rounded-full flex items-center justify-center hover:bg-gray-100"><FiMinus size={10}/></button>
                        <span className="text-xs font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 border rounded-full flex items-center justify-center hover:bg-gray-100"><FiPlus size={10}/></button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><FiTrash2 size={18}/></button>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 mt-auto">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Amount</span>
                  <span className="text-3xl font-black">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full h-16 bg-[#121212] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#FF4D00] transition-all">Checkout Now</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/*  SEARCH OVERLAY- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-white z-[150] p-10 md:p-20">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 p-3 hover:bg-gray-100 rounded-full transition-colors"><FiX size={32}/></button>
            <div className="max-w-4xl mx-auto pt-20">
              <input autoFocus type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-5xl md:text-8xl font-black tracking-tighter border-none focus:ring-0 placeholder:text-gray-100 uppercase" />
              <div className="mt-10 flex gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <span>Results found: {filteredProducts.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*  HEADER  */}
      <header className="px-8 md:px-20 pt-24 pb-12 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">STORE<span className="text-[#FF4D00]">.</span></h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.4em]">Exclusive Collective</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="p-3 hover:bg-gray-100 rounded-full transition-colors"><FiSearch size={22} /></button>
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-[#121212] text-white rounded-full hover:bg-[#FF4D00] transition-all group">
              <FiShoppingBag size={22} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#FF4D00] text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFDFD]">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* CATEGORY BAR  */}
      <nav className="sticky top-0 z-40 bg-[#FDFDFD]/80 backdrop-blur-md px-8 md:px-20 py-6 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto flex gap-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap pb-1 transition-all relative ${activeCategory === cat ? 'text-[#FF4D00]' : 'text-gray-400 hover:text-[#121212]'}`}>
              {cat}
              {activeCategory === cat && <motion.div layoutId="shop-underline" className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#FF4D00]" />}
            </button>
          ))}
        </div>
      </nav>

      {/* PRODUCT GRID  */}
      <main className="px-8 md:px-20 py-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div layout key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group flex flex-col space-y-6">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50">
                  <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} src={product.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => addToCart(product)} className="translate-y-4 group-hover:translate-y-0 bg-white text-[#121212] px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:bg-[#FF4D00] hover:text-white flex items-center gap-2">
                      <FiPlus size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start px-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-xl font-bold tracking-tight">{product.name}</h3>
                  </div>
                  <p className="text-xl font-black text-[#121212]">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-40 text-center space-y-4">
              <p className="text-gray-300 text-6xl font-black uppercase tracking-tighter">No items found</p>
              <button onClick={() => {setSearchQuery(''); setActiveCategory('All')}} className="text-[#FF4D00] text-xs font-black uppercase tracking-widest underline decoration-2 underline-offset-8">Clear filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
