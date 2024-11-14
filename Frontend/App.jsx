import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, AddictionCategory, AboutUs } from './Components';
import './App.css';

function App() {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScroll > lastScrollTop && currentScroll > 50) {
                setIsHidden(true);
            } else if (currentScroll < lastScrollTop || currentScroll <= 50) {
                setIsHidden(false);
            }
            setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const toggleMenu = () => {
        setDropdownActive(!dropdownActive);
    };

    return (
        <Router>
            <div className="App">
                <nav id="navbar" className={`navbar ${isHidden ? 'hidden' : ''}`}>
                    <div className="container">
                        <div className="logo">My Logo</div>
                        <button className={`toggle-menu ${dropdownActive ? 'active' : ''}`} onClick={toggleMenu}>
                            <img src="/Symptoms-vomiting.jpg" className="menu-logo" />
                        </button>
                        <div className={`dropdown-menu ${dropdownActive ? 'active' : ''}`}>
                            <Link to="/">Home</Link>
                            <Link to="/addiction-category">Addiction Category</Link>
                            <Link to="/about-us">About Us</Link>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/addiction-category" element={<AddictionCategory />} />
                    <Route path="/about-us" element={<AboutUs />} />
                </Routes>
                <div className="long-box"></div>
            </div>
        </Router>
    );
}

export default App;
