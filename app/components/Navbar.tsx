
import { useEffect } from "react";


export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="/">Minishop</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className=" navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Catalog</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown04">
                                    <a className="dropdown-item" href="/product">Shop</a>
                                    <a className="dropdown-item" href="#">Single Product</a>
                                    <a className="dropdown-item" href="/cart">Cart</a>
                                    <a className="dropdown-item" href="/checkout">Checkout</a>
                                </div>
                            </li>
                            <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
                            <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
                            <li className="nav-item cta cta-colored"><a href="/cart" className="nav-link"><span className="icon-shopping_cart"></span>[0]</a></li>
                        </ul>
                    </div>

                </div>
                    <div className="mx-3">
                        <span>Login</span>
                    </div>
            </nav>
        </>
    )
}