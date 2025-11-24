import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    addedToCartResponseContext,
    authorisationContext,
    deletedCartItemsResponseContext,
    showArrowCartContext,
    showArrowWishListContext,
    wishlistCountResponseContext,
} from "../Contextapi/ContextApi";
import { getCartAPI, getWishListAPI } from "../services/allApi";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Badge } from "react-bootstrap";

function Header({ insideLanding, insideHome, insideLogin, insideRegister }) {
    const { showArrowWishList } = useContext(showArrowWishListContext);
    const { showCartArrow } = useContext(showArrowCartContext);
    // console.log(showCartArrow ? true : false);
    //modal for logout
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { addedToCartResponse } = useContext(addedToCartResponseContext);
    const { deletedCartItemsResponse } = useContext(deletedCartItemsResponseContext);
    const { wishlistCountResponse } = useContext(wishlistCountResponseContext);
    const [wishlistCount, setwishlistCount] = useState(0);
    const [cartCount, setcartCount] = useState(0);
    const navigate = useNavigate();
    const [user, setuser] = useState({}); //to hold the username
    // console.log(user);
    const { setisAuthorisation } = useContext(authorisationContext);
    // console.log(userName);

    useEffect(() => {
        //renders when component renders
        setuser(JSON.parse(sessionStorage.getItem("user")));
    }, []);

    useEffect(() => {
        ForWishlistCount();
    }, [wishlistCountResponse]);

    useEffect(() => {
        forCartCount();
    }, [deletedCartItemsResponse, addedToCartResponse]);

    const renderTooltip = (oop) => (
        <Tooltip id="button-tooltip_1" {...oop} className="fw-bold ">
            My WishList
        </Tooltip>
    );
    const renderTooltip1 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            My Cart
        </Tooltip>
    );

    const renderTooltip2 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            Login
        </Tooltip>
    );
     const renderTooltip3 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            My Profile
        </Tooltip>
    );
    const renderTooltip4 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            Register
        </Tooltip>
    );
    const renderTooltip5 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            LogOut
        </Tooltip>
    );
    const renderTooltip6 = (oop) => (
        <Tooltip id="button-tooltip1" {...oop} className="fw-bold">
            Home
        </Tooltip>
    );

    //Logout function def.
    const handleLogout = () => {
        setisAuthorisation(false);
        sessionStorage.clear(); //clearing sessionstorage data
        toast.error("Logged out Successfully");
        navigate("/home"); //redirecting to home page
        handleClose();
    };

    const ForWishlistCount = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            try {
                const res = await getWishListAPI(reqheader);
                console.log(res.data);
                setwishlistCount(res.data.length);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const forCartCount = async () => {
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
                setcartCount(res.data.length);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <div
                className=" d-flex justify-content-around align-items-center ps-5 pe-5 pt-3 pb-2  border"
                // style={
                //     insideLanding
                //         ? { position: "fixed",backgroundColor: "" }
                //         : {  position: "fixed", width: "100%", top: "10px", zIndex: "2" }
                // }
            >
                <h1 className="fw-bold text-light fs-1">
                    <Link
                        to={"/"}
                        className="text-decoration-none decor_font"
                        style={{ color: "green", fontSize: "50px" }}
                    >
                        DECORA
                    </Link>
                </h1>

                {/*  */}
                <div className="d-flex justify-content-between align-items-center " style={{ marginLeft: "100px" }}>
                    {!insideHome && (
                        <Link
                            to={"/home"}
                            className="fs-4 text-decoration-none me-5 fw-bold"
                            style={{ marginLeft: "160px", color: "black" }}
                        >
                        <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 0, hide: 400 }}
                                        overlay={renderTooltip6}
                        >
                        <img src="https://images.vexels.com/media/users/3/140527/isolated/preview/449b95d58f554656b159dd3ca21ab123-home-round-icon.png" width={'60px'} alt="" />
                        
                        </OverlayTrigger>
                        
                        </Link>
                    )}

                    {/* SHOWING ADMIN DASHBOARD */}
                    {user == null ? (
                        <div></div>
                    ) : (
                        user.role == "admin" && (
                            <Link to={"/admin"} className="fs-4">
                                My Dasboard
                            </Link>
                        )
                    )}

                    {JSON.parse(sessionStorage.getItem("user")) && (
                        <div className="ms-5">
                            {/* WISHLIST */}
                            {JSON.parse(sessionStorage.getItem("user")).role == "user" && (
                                <Link
                                    to={"/wishlist"}
                                    className="fs-4 text-decoration-none  fw-bold"
                                    style={{ marginLeft: "60px" }}
                                >
                                    {showArrowWishList && (
                                        // <span>
                                        //     <i
                                        //         className="fa-solid fa-arrow-right fa-xl"
                                        //         style={{ color: "#0c0d0d;" }}
                                        //     ></i>
                                        // </span>
                                         <img src="https://media.lordicon.com/icons/wired/gradient/230-arrow-big-right.gif" width={'50px'} alt="" />
                                    )}
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 0, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        {/* <Button variant="" className="btn">
                                            <i className="fa-solid fa-heart  fa-lg" style={{ color: "#f5051d;" }}></i>
                                        </Button> */}
                                        <img src="https://thumbs.dreamstime.com/b/wishlist-icon-line-style-love-letter-like-document-vector-illustration-favorite-list-business-concept-wishlist-icon-line-384059486.jpg" width={'80px'} alt="" />
                                    </OverlayTrigger>

                                    <span
                                        className="text-decoration-none fs-4  border rounded-circle fw-bolder "
                                        
                                    >
                                        
                                        <Badge bg="" style={{ backgroundColor: "white" }} className="text-dark rounded-circle">
                                            {wishlistCount}
                                        </Badge>
                                    </span>
                                   
                                    
                                </Link>
                            )}

                            {/* CART */}
                            {JSON.parse(sessionStorage.getItem("user")).role == "user" && (
                                <Link
                                    to={"/cart"}
                                    className="fs-4 text-decoration-none  fw-bold"
                                    style={{ marginLeft: "60px" }}
                                >
                                    {showCartArrow && (
                                        // <span>
                                        //     <i
                                        //         className="fa-solid fa-arrow-right fa-xl"
                                        //         style={{ color: "#0c0d0d;" }}
                                        //     ></i>
                                        // </span>
                                        <img src="https://media.lordicon.com/icons/wired/gradient/230-arrow-big-right.gif" width={'50px'} alt="" />
                                    )}
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 0, hide: 400 }}
                                        overlay={renderTooltip1}
                                    >
                                        <Button variant="" className="btn">
                                            
                                            <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" width={'50px'} alt="" />
                                        </Button>
                                    </OverlayTrigger>

                                    <span className="text-decoration-none fs-4 border rounded-5 fw-bolder ms-1" >
                                        <Badge bg="" style={{ backgroundColor: "white",color:"black" }} className="rounded-circle">
                                            {cartCount}
                                        </Badge>
                                    </span>
                                </Link>
                            )}
                            {/* <Link className="text-decoration-none" to={(user.role=="user")?"/user":"/adminprofile"} style={{marginLeft:'200px'}} > */}

                            {/* User Segment */}
                            <Link className="text-decoration-none" to={"/user"} style={{ marginLeft: "400px" }}>
                                <span className=" fw-bold fs-3 ms-5 " style={{ color: "green" }}>
                                    {user.username}
                                </span>
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 0, hide: 400 }}
                                    overlay={renderTooltip3}
                                >
                                <img
                                            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                                            className="mb-3 ms-"
                                            width={"50px"}
                                            alt=""
                                />
                                </OverlayTrigger>
                            </Link>

                            <Link
                                onClick={handleShow}
                                style={{ textDecoration: "", marginLeft: "20px", color: "" }}
                                className="  fs-4 fw-bold text-decoration-none"
                            >
                                {/* LogOuT */}
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 30, hide: 400 }}
                                    overlay={renderTooltip5}
                                >
                               <img src="https://cdn.creazilla.com/icons/3217213/sign-out-icon-lg.png" width={'40px'} alt="" className="mb-2"/>
                                </OverlayTrigger>
                                
                                {/* <span style={{ color: " #109904ff;" }}>
                                    <i className="fa-solid fa-arrow-right-from-bracket fa-sm fa-flip"></i>
                                </span> */}
                            </Link>
                        </div>
                    )}

                    {/* Login */}
                    {!insideLogin && !sessionStorage.getItem("user") && (
                        <Link
                            to={"/login"}
                            style={{ color: "" }}
                            className="text-decoration-none border-shadow  text-success fs-4 fw-bold me-5"
                        >
                             <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 30, hide: 400 }}
                                    overlay={renderTooltip2}
                                >
                            <img
                                src="https://cdn-icons-gif.flaticon.com/7932/7932438.gif"
                                width={"60px"}
                                alt="Login"
                            />
                             </OverlayTrigger>
                           
                        </Link>
                    )}


                     {/* Register  */}
                    {!JSON.parse(sessionStorage.getItem("user")) && !insideRegister && (
                        <Link to={"/register"} className="text-decoration-none text-success fw-bold fs-4 ">
                           <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 0, hide: 400 }}
                                    overlay={renderTooltip4}
                           >
                            <img
                                src="https://cdn-icons-png.flaticon.com/256/16939/16939342.png"
                                width={"40px"}
                                alt="register"
                            />
                           </OverlayTrigger>
                            
                        </Link>
                    )}
                </div>
            </div>

            {/* logout confirmation modal */}
            <Modal show={show} onHide={handleClose} className="" style={{ marginTop: "100px" }}>
                
                <Modal.Body className="fw-bold mb-5 mt-4 fs-3" style={{ marginLeft: "85px" }}>
                    You want to Logout?
                </Modal.Body>
                
                <div className="pb-4">
                    <Button
                        variant=""
                        style={{ backgroundColor: "red", marginLeft: "120px", paddingBottom: "0px" }}
                        onClick={handleClose}
                        className="pe-4 ps-4"
                    >
                        <h4 className="fw-bold text-white">No</h4>
                    </Button>

                    <Button
                        variant=""
                        style={{ backgroundColor: "green", marginLeft: "70px", paddingBottom: "0px" }}
                        className="pe-4 ps-4 "
                        onClick={handleLogout}
                    >
                        <h4 className="fw-bold text-white">Yes</h4>
                    </Button>
                </div>

                {/* </Modal.Footer> */}
            </Modal>
        </div>
    );
}

export default Header;
