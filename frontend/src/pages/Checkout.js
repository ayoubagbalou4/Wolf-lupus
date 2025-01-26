import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from '../Context';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Message({ content }) {
    return <p className="message">{content}</p>;
}

const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useContext(CartContext);

    const initialOptions = {
        "client-id": "AVsOb5MxgoEvLuqz_qsc2V3-3IOwexFoCkkwxPHNEOdBWWU3gSff-QA0CnfqWII-04WRlm7HG9Q4xakN",
        "enable-funding": "venmo",
        "disable-funding": "",
        "buyer-country": "US",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    const [message, setMessage] = useState("");

    const handleOrder = async () => {
        try {
            const response = await axios.post("/api/orders", {
                cart: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                })),
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const orderData = response.data;
            return orderData.id;
        } catch (error) {
            console.error(error);
            setMessage(`Could not initiate PayPal Checkout...${error}`);
        }
    };

    const handleApprove = async (data, actions) => {
        try {
            const response = await axios.post(`/api/orders/${data.orderID}/capture`, {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const orderData = response.data;

            if (orderData?.details?.[0]?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (orderData?.details?.[0]) {
                throw new Error(`${orderData.details[0].description} (${orderData.debug_id})`);
            } else {
                const transaction = orderData.purchase_units[0].payments.captures[0];
                setMessage(`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`);
                console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
            }
        } catch (error) {
            console.error(error);
            setMessage(`Sorry, your transaction could not be processed...${error}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="checkout-page">
                <div className="checkout-container">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{ shape: "rect", layout: "vertical", color: "gold", label: "paypal" }}
                            createOrder={handleOrder}
                            onApprove={handleApprove}
                        />
                    </PayPalScriptProvider>
                    <Message content={message} />
                </div>
            </div>
        </>
    );
};

export default Checkout;
