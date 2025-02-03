import { json } from "@remix-run/node";
import { getCart } from "../../services/session.server"
import { useLoaderData } from "@remix-run/react";


export async function loader({ request }) {
    const cart = await getCart(request);
    return json(cart);
}

export default function Cart() {

    const listCart = useLoaderData();
    let subtotal = listCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let delivery = subtotal > 50 ? 0 : 5; // Miễn phí nếu > 50$
    let discount = subtotal >= 20 ? 3 : 0; // Giảm 3$ nếu > 20$
    let total = subtotal + delivery - discount;

    return (
        <>
            <div class="hero-wrap hero-bread" style={{ backgroundImage: "url('/images/bg_6.jpg')" }}>
                <div class="container">
                    <div class="row no-gutters slider-text align-items-center justify-content-center">
                        <div class="col-md-9 ftco-animate text-center">
                            <p class="breadcrumbs"><span class="mr-2"><a href="index.html">Home</a></span> <span>Cart</span></p>
                            <h1 class="mb-0 bread">My Cart</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section class="ftco-section ftco-cart">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 ftco-animate">
                            <div class="cart-list">
                                <table class="table">
                                    <thead class="thead-primary">
                                        <tr class="text-center">
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listCart && listCart.length > 0 && listCart.map((item) => {
                                            return (
                                                <tr class="text-center">
                                                    <td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td>

                                                    <td class="image-prod"><div class="img" style={{ backgroundImage: `url(${item.productImg})` }}></div></td>

                                                    <td class="product-name">
                                                        <h3>{item.name}</h3>
                                                        <p>Far far away, behind the word mountains, far from the countries</p>
                                                    </td>

                                                    <td class="price">$ {item.price}</td>

                                                    <td class="quantity">
                                                        <div class="input-group mb-3">
                                                            <input type="text" name="quantity" class="quantity form-control input-number" value={item.quantity} min="1" max="100" />
                                                        </div>
                                                    </td>

                                                    <td class="total">$ {item.quantity * item.price}</td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-start">
                        <div class="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate">
                            
                            <div class="cart-total mb-3">
                                <h3>Cart Totals</h3>
                                <p class="d-flex">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </p>
                                <p class="d-flex">
                                    <span>Delivery</span>
                                    <span>${delivery.toFixed(2)}</span>
                                </p>
                                <p class="d-flex">
                                    <span>Discount</span>
                                    <span>${discount.toFixed(2)}</span>
                                </p>
                                <hr />
                                <p class="d-flex total-price">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </p>
                            </div>
                            <p class="text-center"><a href="/checkout" class="btn btn-primary py-3 px-4">Proceed to Checkout</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}