import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, Zap, Briefcase, ShoppingBag, MessageCircle, Sun, Moon, Search, X, Menu } from 'lucide-react';

/* ══════════════════════════════════════════════════════
    STATIC DATA
══════════════════════════════════════════════════════ */
const MENU_ITEMS = [
  { icon: <Home size={18} />,       label: 'Home',    path: '/' },
  { icon: <Zap size={18} />,        label: 'Stories', path: '/stories' },
  { icon: <Briefcase size={18} />,  label: 'Works',   path: '/portfolio' },
  { icon: <ShoppingBag size={18} />,label: 'Shop',    path: '/shop' },
  { icon: <MessageCircle size={18}/>,label: 'Contact', path: '/talk' },
];

/* ══════════════════════════════════════════════════════
    REUSABLE COMPONENTS (Optimized: Moved outside to prevent re-renders)
══════════════════════════════════════════════════════ */
const Tooltip = ({ label, position }) => (
  <span className={`
    absolute opacity-0 group-hover:opacity-100 pointer-events-none z-50
    text-[9px] font-bold uppercase tracking-widest whitespace-nowrap
    bg-orange-600 text-white px-2 py-1 rounded shadow-lg
    transition-all duration-150
    ${position === 'top'    ? 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2' : ''}
    ${position === 'left'   ? 'right-[calc(100%+8px)] top-1/2 -translate-y-1/2'   : ''}
    ${position === 'bottom' ? 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2'    : ''}
  `}>
    {label}
  </span>
);

const ThemeButton = ({ size = 18, extraClass = '', isDarkMode, toggleTheme }) => (
  <motion.button
    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
    onClick={toggleTheme}
    className={`relative group p-2.5 rounded-full text-orange-500
      hover:bg-orange-500/10 transition-colors duration-200 ${extraClass}`}
  >
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={isDarkMode ? 'sun' : 'moon'}
        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.18 }} className="block"
      >
        {isDarkMode ? <Sun size={size} /> : <Moon size={size} />}
      </motion.span>
    </AnimatePresence>
  </motion.button>
);

const SearchOverlay = ({ isOpen, onClose, inputRef, isDarkMode, glassStyle }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          key="search-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-md"
        />
        <motion.div
          key="search-box"
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[131] w-[90vw] max-w-lg"
        >
          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl
            backdrop-blur-2xl border shadow-2xl ${glassStyle}`}>
            <Search size={18} className="text-orange-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search anything…"
              className={`flex-1 bg-transparent border-none outline-none text-sm
                ${isDarkMode
                  ? 'text-white placeholder:text-neutral-500'
                  : 'text-black placeholder:text-neutral-400'}`}
            />
            <motion.button whileTap={{ scale: 0.88 }} onClick={onClose}
              className={`p-1 rounded-lg transition-colors
                ${isDarkMode ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'}`}
            >
              <X size={16} />
            </motion.button>
          </div>
          <p className={`text-center text-[10px] mt-2 tracking-wide
            ${isDarkMode ? 'text-white/30' : 'text-black/30'}`}>
            Press <kbd className="font-mono">ESC</kbd> to close
          </p>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ══════════════════════════════════════════════════════
    MAIN NAVBAR COMPONENT
══════════════════════════════════════════════════════ */
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navMode, setNavMode] = useState('dock');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);

  const { scrollY } = useScroll();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const isHomePage = location.pathname === '/';

  // Reset on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHeroScrolled(false);
  }, [location.pathname]);

  // Responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll behaviour
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isHomePage) {
      setHeroScrolled(latest > 40);
    } else if (!isMobile) {
      setNavMode(latest > 80 ? 'side' : 'dock');
    }
  });

  // Dark mode toggle effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Auto-focus search
  useEffect(() => {
    if (isSearchOpen) {
      const timeoutId = setTimeout(() => searchInputRef.current?.focus(), 150);
      return () => clearTimeout(timeoutId);
    }
  }, [isSearchOpen]);

  // ESC key handler
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') { 
        setIsSearchOpen(false); 
        setMobileMenuOpen(false); 
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleTheme = () => setIsDarkMode((v) => !v);

  // Styles & States
  const isDock = navMode === 'dock';
  const glassStyle = isDarkMode
    ? 'bg-neutral-950/85 border-white/10 text-white'
    : 'bg-white/85 border-black/8 text-black';

  const iconActive = 'text-orange-500 bg-orange-500/12';
  const iconIdle   = isDarkMode
    ? 'text-neutral-400 hover:text-white hover:bg-white/8'
    : 'text-neutral-500 hover:text-black hover:bg-black/6';

  /* Dock Nav Item Component */
  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path}>
        <motion.div
          whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
          className={`relative group p-3 rounded-full cursor-pointer transition-colors duration-200
            ${isActive ? iconActive : iconIdle}`}
        >
          {item.icon}
          <Tooltip label={item.label} position={isDock ? 'top' : 'left'} />
        </motion.div>
      </Link>
    );
  };

  /* ════════════════════════════════════════════════════
      HOME PAGE → Simple Top Navbar
  ════════════════════════════════════════════════════ */
  if (isHomePage) {
    return (
      <>
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
            ${heroScrolled
              ? isDarkMode
                ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-white/8 shadow-xl'
                : 'bg-white/90 backdrop-blur-xl border-b border-black/6 shadow-md'
              : 'bg-transparent'
            }`}
        >
          <div className="max-w-[1800px] mx-auto my-7 px-5 md:px-10 h-16 md:h-[68px] flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                  font-black text-base shadow-md transition-colors duration-300
                  ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  C.
                </div>
                <div className={`flex flex-col ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  <span className="text-[11px] font-bold tracking-widest uppercase leading-none">
                    Corely
                  </span>
                  <span className="text-[9px] opacity-40 uppercase tracking-wider mt-0.5">
                    Creative Direction
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop center links */}
            <nav className="hidden md:flex items-center gap-0.5">
              {MENU_ITEMS.filter(i => i.path !== '/').map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium
                        tracking-wide transition-colors duration-200 cursor-pointer
                        ${isActive
                          ? 'text-orange-500'
                          : isDarkMode
                            ? 'text-neutral-400 hover:text-white'
                            : 'text-neutral-500 hover:text-black'}`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span layoutId="heroActiveDot"
                          className="absolute bottom-1.5 left-1/2 -translate-x-1/2
                            w-1 h-1 rounded-full bg-orange-500"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
                onClick={() => setIsSearchOpen(true)}
                className={`relative group p-2.5 rounded-full transition-colors duration-200
                  ${isDarkMode
                    ? 'text-neutral-400 hover:text-white hover:bg-white/8'
                    : 'text-neutral-500 hover:text-black hover:bg-black/6'}`}
              >
                <Search size={18} />
                <Tooltip label="Search" position="bottom" />
              </motion.button>

              {/* Theme */}
              <ThemeButton size={18} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

              {/* Mobile hamburger */}
              {isMobile && (
                <motion.button whileTap={{ scale: 0.88 }}
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  className={`p-2.5 rounded-full transition-colors duration-200
                    ${isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-white/8'
                      : 'text-neutral-500 hover:text-black hover:bg-black/6'}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileMenuOpen ? (
                      <motion.span key="x"
                        initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X size={20} />
                      </motion.span>
                    ) : (
                      <motion.span key="m"
                        initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu size={20} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}
            </div>
          </div>
        </motion.header>

        {/* Mobile drop-down (hero page) */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <>
              <motion.div key="hero-bd"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-[108] bg-black/40 backdrop-blur-sm"
              />
              <motion.div key="hero-panel"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={`fixed top-[72px] left-4 right-4 z-[109] rounded-2xl
                  border backdrop-blur-2xl shadow-2xl p-3 ${glassStyle}`}
              >
                {MENU_ITEMS.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div key={item.path}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link to={item.path}>
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl
                          transition-colors duration-150 cursor-pointer
                          ${isActive ? iconActive : iconIdle}`}
                        >
                          <span className={isActive ? 'text-orange-500' : ''}>{item.icon}</span>
                          <span className={`text-sm font-semibold ${isActive ? 'text-orange-500' : ''}`}>
                            {item.label}
                          </span>
                          {isActive && (
                            <motion.span layoutId="heroMobileDot"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}
          inputRef={searchInputRef} isDarkMode={isDarkMode} glassStyle={glassStyle} />
      </>
    );
  }

  /* ════════════════════════════════════════════════════
      ALL OTHER PAGES → Dock / Side Nav
  ════════════════════════════════════════════════════ */
  return (
    <>
      {/* Logo */}
      <div className="fixed  top-5 left-5 md:top-7 md:left-7 z-[110]">
        <Link to="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 cursor-pointer">
            <div className={`w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center
              font-black text-lg shadow-lg transition-colors duration-300
              ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>C.</div>
            <div className={`hidden md:flex flex-col ${isDarkMode ? 'text-black' : ''}`}>
              <span className="text-[11px] font-bold tracking-widest uppercase">Corely</span>
              <span className="text-[9px] opacity-50 uppercase tracking-wider">Creative Direction</span>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Mobile hamburger */}
      {isMobile && (
        <div className="fixed top-5 right-5 z-[120]">
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className={`w-10 h-10 rounded-full flex items-center justify-center
              backdrop-blur-xl border shadow-lg transition-colors duration-300 ${glassStyle}`}>
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span key="close"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="open"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}

      {/* Mobile slide-up panel */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            <motion.div key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[108] bg-black/40 backdrop-blur-sm" />
            <motion.div key="panel"
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`fixed bottom-0 left-0 right-0 z-[109] rounded-t-3xl
                border-t backdrop-blur-2xl shadow-2xl p-6 pb-10 ${glassStyle}`}>
              <div className={`w-10 h-1 rounded-full mx-auto mb-6
                ${isDarkMode ? 'bg-white/20' : 'bg-black/15'}`} />
              <nav className="flex flex-col gap-1">
                {MENU_ITEMS.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div key={item.path}
                      initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}>
                      <Link to={item.path}>
                        <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl
                          transition-colors duration-150 cursor-pointer
                          ${isActive ? iconActive : iconIdle}`}>
                          <span className={isActive ? 'text-orange-500' : ''}>{item.icon}</span>
                          <span className={`text-sm font-semibold tracking-wide
                            ${isActive ? 'text-orange-500' : ''}`}>{item.label}</span>
                          {isActive && (
                            <motion.span layoutId="mobileActiveDot"
                              className="ml-auto w-2 h-2 rounded-full bg-orange-500" />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className={`flex items-center justify-between mt-6 pt-5
                border-t ${isDarkMode ? 'border-white/10' : 'border-black/8'}`}>
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsSearchOpen(true); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full
                    text-sm font-medium transition-colors ${iconIdle}`}>
                  <Search size={16} /><span>Search</span>
                </button>
                <ThemeButton size={20} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Dock / Side */}
      {!isMobile && (
        <div className={`fixed inset-0 pointer-events-none z-[100] flex
          transition-all duration-500 ease-in-out
          ${isDock ? 'items-end justify-center pb-7' : 'items-center justify-end pr-6'}`}>
          <motion.nav layout initial={false}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className={`pointer-events-auto flex p-2 backdrop-blur-2xl border shadow-2xl
              ${isDock ? 'flex-row rounded-[2rem]' : 'flex-col rounded-[2.5rem]'}
              ${glassStyle}`}>
            <motion.div layout
              className={`flex ${isDock ? 'flex-row items-center' : 'flex-col'} gap-1`}>
              {MENU_ITEMS.map((item) => <NavItem key={item.path} item={item} />)}
              <div className={`${isDock ? 'w-px h-5 mx-1' : 'h-px w-5 my-1'} self-center
                ${isDarkMode ? 'bg-white/15' : 'bg-black/12'}`} />
              
              {/* Theme */}
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
                onClick={toggleTheme}
                className={`relative group p-3 rounded-full transition-colors duration-200 text-orange-500
                  ${isDarkMode ? 'hover:bg-orange-500/10' : 'hover:bg-orange-500/8'}`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={isDarkMode ? 'sun' : 'moon'}
                    initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }} className="block">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.span>
                </AnimatePresence>
                <Tooltip label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  position={isDock ? 'top' : 'left'} />
              </motion.button>
              
              {/* Search */}
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.88 }}
                onClick={() => setIsSearchOpen(true)}
                className={`relative group p-3 rounded-full transition-colors duration-200 text-orange-500
                  ${isDarkMode ? 'hover:bg-orange-500/10' : 'hover:bg-orange-500/8'}`}>
                <Search size={20} />
                <Tooltip label="Search" position={isDock ? 'top' : 'left'} />
              </motion.button>
            </motion.div>
          </motion.nav>
        </div>
      )}

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}
        inputRef={searchInputRef} isDarkMode={isDarkMode} glassStyle={glassStyle} />
    </>
  );
};

export default Navbar;