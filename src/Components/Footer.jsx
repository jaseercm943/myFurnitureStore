import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <div className="row  p-2" style={{ margin: "100px 100px 10px 60px", color: "" }}>
                <div className="col-3 ps-5">
                    <h4 className="fw-bold text-dark fs-3">DECOR</h4>
                    <p style={{ color: "" }} className="mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aliquid natus doloremque
                        quibusdam eos sed voluptates corporis, commodi nulla esse temporibus voluptatum libero
                        accusantium eligendi, id molestiae eum est possimus!
                    </p>
                    <p style={{ color: "" }}>Lincensed by Luminar Technolab</p>
                </div>
                <div className="col-3" style={{ paddingLeft: "200px" }}>
                    {/* <h5 className='fw-bold' style={{paddingLeft:'32px'}}>Links</h5> */}

                    <ul style={{ listStyleType: "none", lineHeight: "2rem" }}>
                        <li className="fw-bold text-dark fs-4">Links</li>
                        <li className="mt-3">
                            <Link to={"/home"} style={{ textDecoration: "none", color: "black" }} className="fw-bold text-decoration-underline">
                                Home
                            </Link>
                        </li>
                        {/* <li>
                            {" "}
                            <Link to={"/home"} style={{ textDecoration: "none", color: "white" }}>
                                Home
                            </Link>
                        </li> */}
                        {!sessionStorage.getItem('token')&&
                        <li>
                            <Link to={"/login"} style={{ textDecoration: "none", color: "black" }} className="fw-bold text-decoration-underline">
                                Login
                            </Link>
                        </li>}
                        {!sessionStorage.getItem('token')&&
                        <li>
                            <Link
                                to={"/register"}
                                style={{ textDecoration: "none", color: "black" }}
                                className="fw-bold text-decoration-underline"
                            >
                                Register
                            </Link>
                        </li>}
                        {sessionStorage.getItem('token')&&
                        <li>
                            <Link to={"/user"} style={{ textDecoration: "", color: "black" }} className="fw-bold">
                                My Profile
                            </Link>
                        </li>}
                        { sessionStorage.getItem('token')&&
                        <li>
                            <Link to={"/cart"} style={{ textDecoration: "", color: "black" }} className="fw-bold">
                                My Cart
                            </Link>
                        </li>}
                         {sessionStorage.getItem('token')&&
                         <li>
                            <Link to={"/wishlist"} style={{ textDecoration: "", color: "black" }} className="fw-bold">
                                My Wishlist
                            </Link>
                        </li>}
                    </ul>
                </div>
                <div className="col-3">
                    {/* <h5 className='fw-bold'>Guides</h5> */}
                    {/* <ul style={{ listStyleType: "none", lineHeight: "2rem" }}>
                        <li className="fw-bold text-dark fs-4">Guides</li>
                        <li className="text-white mt-3">React</li>
                        <li className="text-white">React Bootstrap</li>
                        <li className="text-white">Router</li>
                    </ul> */}
                    {/* <h6>React</h6>
            <h6>React Bootstrap</h6>
            <h6>Router</h6> */}
                </div>
                <div className="col-3">
                    <h5 className="fw-bold mb-3 text-dark fs-4">Contact us</h5>
                    {/* <input type="text" className="border rounded-3 w-50" style={{ height: "40px" }} />
                    &nbsp; &nbsp;
                    <button className="btn btn-warning">
                        <i className="fa-solid fa-arrow-right fa-xl" style={{ color: "black" }}></i>
                    </button> */}
                    <div className="mt-4">
                        <div className="mb-2">
                            <Link className="text-decoration-none ">
                                <i className="fa-solid fa-mobile-button fa-xl " style={{ color: "#141415" }}></i>
                                <span className="text-dark">9746808962 </span>
                            </Link>
                        </div>
                        <Link className="text-decoration-none">
                            <i className="fa-solid fa-mobile-button fa-xl " style={{ color: "#141415" }}></i>
                            <span className="text-dark">9567237884</span>
                        </Link>
                        {/* <Link><i class="fa-brands fa-github fa-2xl" style={{ color: "white" }}></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link><i class="fa-brands fa-square-instagram fa-2xl" style={{ color: "white" }}></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link><i class="fa-brands fa-twitter fa-2xl" style={{ color: "white" }}></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link><i class="fa-brands fa-facebook-f fa-2xl" style={{ color: "white" }}></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link><i class="fa-brands fa-linkedin-in fa-2xl" style={{ color: "white" }}></i></Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
