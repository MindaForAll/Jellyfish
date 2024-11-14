import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Words!!!</h1>
            <p>Even more words! AND A</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/addiction-category">Go to LINK</Link>
                    </li>
                    <li>
                        <Link to="/about-us">LINK</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
