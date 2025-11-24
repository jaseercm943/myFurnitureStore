import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../Components/Header";
import {
    decrementCartQuantityAPI,
    deleteCartItemAPI,
    getAllProductsAPI,
    getCartAPI,
    incrementCartQuantityAPI,
} from "../services/allApi";
import SERVER_URL from "../services/serverurl";
import { deletedCartItemsResponseContext, showArrowCartContext } from "../Contextapi/ContextApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



function Cart() {
    const {setshowCartArrow}=useContext(showArrowCartContext)
    const [cart, setCart] = useState([]);
    const { setdeletedCartItemsResponse } = useContext(deletedCartItemsResponseContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    console.log(totalDiscount);

    useEffect(() => {
        GetCart();
    }, []);

    const GetCart = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            try {
                const res = await getCartAPI(reqheader);
                console.log(res.data);
                setCart(res.data);
                setTotalPrice(res.data.reduce((sum, c) => sum + c.TotalPrice, 0));
                console.log(res.data.reduce((sum,p)=>p.offers*p.quantity+sum,0));
                
                setTotalDiscount(res.data.reduce((sum,p)=>p.offers*p.quantity+sum,0));
            } catch (error) {
                console.log(error);
            }
        }
    };

    // const Totalprice=()=>{

    // }

    const handleRemoveFromCart = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            try {
                const response = await deleteCartItemAPI(productId, reqheader);
                console.log(response);
                if(response.status==200){
                   toast.error( 'Item Removed From Cart')
                   GetCart();
                   setdeletedCartItemsResponse(response);
                   setTimeout(() => {
                    setshowCartArrow(false)
                   }, 2000);
                   setshowCartArrow(true)
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleQuantityAddition = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            const result = await incrementCartQuantityAPI(productId, reqheader);
            console.log(result);
            if (result.status == 200) {
               
                GetCart();
            }
        }
    };

    const handleQuantitysubtraction = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            const result = await decrementCartQuantityAPI(productId, reqheader);
            console.log(result);
            if (result.status == 200) {
                if (result.data.quantity <= 0) {
                    const response = await deleteCartItemAPI(productId, reqheader);
                    console.log(response);
                    toast.error('Removed From Cart')
                    setdeletedCartItemsResponse(response)
                    setTimeout(() => {
                         setshowCartArrow(false)
                    }, 2000);
                    setshowCartArrow(true)
                }
            }

            GetCart();
        }
    };

    const checkout = (cart) => {};
    return (
        <div>
            <Header />
            <Row className="mt-5 ms-5">
                {cart?.length > 0 ? (
                    <Col lg={"6"} sm={"12"} className="mt-5 ">
                        <table className="table mt-5">
                            <thead>
                                <tr className="text-center fw-bold">
                                    {/* <th>sl.no</th> */}

                                    <th></th>
                                    <th>price</th>
                                    <th>quantity</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.map((items, index) => (
                                    <tr className="text-center ">
                                        {/* <td>{index+1}</td> */}

                                        <td>
                                            <img
                                                src={`${SERVER_URL}/uploads/${items.image}`}
                                                width={"150px"}
                                                height={"150px"}
                                                alt=""
                                            /> <br />
                                            
                                            <span className="fw-bold">{items.name}</span>
                                        </td>
                                        <td className="fw-bold">₹&nbsp;{items.price}</td>
                                        <td>
                                            <button
                                                className="me-3 btn btn-light"
                                                onClick={() => handleQuantityAddition(items?.productId)}
                                            >
                                                +
                                            </button>
                                            {items.quantity}
                                            <button
                                                className="ms-3 btn btn-light fs-6"
                                                onClick={() => handleQuantitysubtraction(items?.productId)}
                                            >
                                                −
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn"
                                                onClick={() => handleRemoveFromCart(items.productId)}
                                            >
                                                <i
                                                    className="fa-solid fa-trash fa-xl"
                                                    style={{ color: " #f20202" }}
                                                ></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                ) : (
                    <div className="" style={{margin:'200px 20px 10px 700px'}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png" width={'300px'} alt="" />
                        <h1 className="fw-bold text-warning ms-5">EMPTY CART!</h1>
                    </div>
                )}

                {cart?.length > 0 && (
                    <Col
                        lg={"6"}
                        sm={"12"}
                        className=""
                        style={{ padding: "30px 40px 0px 200px", position: "fixed", left: "1000px", top: "200px" }}
                    >
                        {/* <h1 className="fw-bold fs-1">Total Items</h1>
                        <h1 className="fw-bold fs-1">Total Price</h1> */}
                        <div className="w-75">
                              <table className="table ">
                            <tbody>
                                <tr >
                                    <td className="fw-bold">Total Amount :</td>
                                    <td className="fw-bold">- ₹{totalPrice}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Discount :</td>
                                    <td className="fw-bold">- ₹{totalDiscount}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Amount Payable :</td>
                                    <td className="fw-bold">- ₹{totalPrice-totalDiscount}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        
                        {/* <h3><span style={{marginRight:'200px'}}>Total Amount</span>- ₹{totalPrice}</h3>
                        <h3><span style={{marginRight:'262px'}}>Discount</span>- ₹{totalDiscount}</h3>
                        <h3><span className="fw-bold" style={{marginRight:'165px'}}>Amount Payable</span>- ₹{totalPrice-totalDiscount}</h3> */}
                        
                            <Link className="text-decoration-none me-5" to={'/payment'}>
                            <button
                            style={{ margin: "50px 0px 0px 350px" }}
                            className="btn border fw-bold text-black ps-4 pe-4 pt-2 pb-2 fs-4"
                            onClick={() => checkout(cart)}
                            > CheckOut</button>
                            </Link>
                        
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Cart;
