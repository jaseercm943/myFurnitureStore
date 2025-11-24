import React, { useEffect, useState } from "react";
import {
    createOrderAPI,
    emptyCartAPI,
    getCartAPI,
    getKeyAPI,
    getUserProfileAPI,
    updateProfileAPI,
    verifyOrderAPI,
} from "../services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Verified from "../Components/Verified";


function Payment() {
    const [userContact, setuserContact] = useState({ address: "", phonenumber: "", username: "", email: "" });
    // console.log(userContact);
    const [isVerified,setIsverified]=useState(false)
    
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);
    const [netPrice, setNetPrice] = useState(0);
    // console.log(netPrice);

    // console.log(cartProducts);

    useEffect(() => {
        getProductDetails();
    }, []);

    useEffect(() => {
        GetUserContacts();
    }, []);

    let recieptNumber=0

    const GetUserContacts = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                "content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            try {
                const result = await getUserProfileAPI(reqheader);
                // console.log(result);
                const { address } = result.data;
                const { phonenumber } = result.data;
                const { username } = result.data;
                const { email } = result.data;
                setuserContact({ address, phonenumber, email, username });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getProductDetails = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                "content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            try {
                const response = await getCartAPI(reqheader);
                // console.log(response);

                setCartProducts(response.data);
                const TotalPrice = response.data.reduce((s, cart) => s + cart.TotalPrice, 0);
                const TotalOffers = response.data.reduce((s, cart) => s + cart.quantity * cart.offers, 0);
                setNetPrice(TotalPrice - TotalOffers);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCheckout = async (amount) => {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));
        const { username, email, phonenumber } = user;
        recieptNumber++
        // console.log(recieptNumber);
        
        
        if (token) {
            const reqheader = {
                "content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            try {
                const response = await createOrderAPI({ amount,recieptNumber,cartProducts}, reqheader);
                // console.log(response);

                const Amount = response.data.order.amount;
                const cartItems=response.data.cartProducts
                console.log(cartItems);
                

                const result = await getKeyAPI(reqheader);

                const { key } = result.data;

                const orderId = response.data.order.id;

                let recieptCount=0

                //RazorPay Section
                const options = {
                    key: key, //key
                    amount: Amount, //price data
                    currency: "INR",
                    name: "Decora Store",
                    description: "Furniture purchase",
                    order_id: orderId, //orderid
                    handler: async (response) => {
                        // console.log(response);
                        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
                        sessionStorage.setItem("razorpay", JSON.stringify(response));

                    const verify = await verifyOrderAPI({response , cartItems}, reqheader);
                        console.log(verify);
                        if (verify.status == 200) {
                            toast.success(verify.data.message);
                            await emptyCartAPI(reqheader);
                            setIsverified(true)
                            const resultingCart = await getCartAPI(reqheader);
                            setCartProducts(resultingCart.data);
                            // navigate("/home");
                        }
                    },
                    prefill: {
                        //data addon
                        name: username,
                        email: email,
                        contact: phonenumber
                    },
                    theme: {
                        color: "#F37254",
                    },
                };

                const rzp = new Razorpay(options);
                rzp.open();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const updateProfile = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                "content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            const response = await updateProfileAPI(userContact, reqheader);
            if(response.status==200){
                 toast.success('Updated Your Delivery Contact Details')
            }
            
        }
    };

    return (
        <div>

            {isVerified&&<Verified userContact={userContact}/>}
            
           
            <div className="w-75" style={{ margin: "20px 20px 0px 150px" }}>
                <table className="table border " style={{ margin: "50px" }}>
                    <tbody className="">
                        {cartProducts?.length > 0 &&
                            cartProducts?.map((cart) => (
                                <tr className="">
                                    <td>{cart.name}</td>
                                    <td>
                                        ₹<strong>{cart.price}</strong>
                                    </td>
                                    <td>
                                        <strong>{cart.quantity}</strong>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {cartProducts.length > 0 && (
                <div className=" border  rounded-5  " style={{ display: "",margin:'200px 700px 0px 500px' , height:'300px',padding:'10px,10px,20px,150px'}}>
                    <p className="fw-bold fs-4">Total Items = {cartProducts.reduce((s, cart) => s + cart.quantity, 0)}</p>
                    <p className="fw-bold fs-4">Amount = {netPrice}</p>
                    <button
                        className="btn border btn-success fw-bold fs-4 ps-4 pe-4 "
                        // onClick={() => handleCheckout(netPrice)}
                        onClick={handleShow}
                    >
                        Pay
                    </button>

                    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                        <div closeButton>

                        </div>
                        {/* <Modal.Header closeButton>
                            <Modal.Title className="fw-bold text-success">
                                CONFIRM PAYMENT <span className="text-primary fs-3">?</span>
                            </Modal.Title>
                        </Modal.Header> */}
                        <Modal.Body>
                            <h5 className="text-primary fw-bold">Name</h5>
                            <input
                                type="text"
                                className="form-control fs-4"
                                value={userContact.username}
                                onChange={(e) => setuserContact({ ...userContact, username: e.target.value })}
                            />
                            <h5 className="text-primary fw-bold">E-mail</h5>
                            <input
                                type="text"
                                className="form-control fs-4"
                                value={userContact.email}
                                onChange={(e) => setuserContact({ ...userContact, email: e.target.value })}
                            />
                            <h5 className="text-primary fw-bold">Address</h5>
                            <input
                                type="text"
                                className="form-control fs-4"
                                value={userContact.address}
                                onChange={(e) => setuserContact({ ...userContact, address: e.target.value })}
                            />
                            <h5 className="text-primary fw-bold">Phone Number</h5>
                            <input
                                type="text"
                                className="form-control fs-4"
                                value={userContact.phonenumber}
                                onChange={(e) => setuserContact({ ...userContact, phonenumber: e.target.value })}
                            />
                        </Modal.Body>

                        <Button className="w-50 fw-bold pt-2 pb-2 ps-1" style={{ marginLeft: "180px" }} onClick={updateProfile}>
                            Change Details
                        </Button>
                        <Modal.Footer className="mt-3">
                            <Button variant="primary" onClick={handleClose} className="fw-bold">
                                Cancel Payment
                            </Button>
                            <Button variant="success" className="fw-bold " style={{marginRight:'240px'}} onClick={() => handleCheckout(netPrice)}>
                                Confrim Payment
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    );
}

export default Payment;
