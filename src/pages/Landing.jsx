import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// import LandingImage '../src/style.css'
// import LandingImage '../src/app.css'

function Landing({ insideLanding }) {
    return (
        <div>
            <Header insideLanding={insideLanding}/>

            <div className="row ">
                <div className="col-2 " style={{ margin: "20px 0px 0px 0px" }}>
                    {/* <img
                        src="https://shop.gkwretail.com/cdn/shop/files/DivanBedSolidWoodBed1.webp?v=1691225253"
                        className="rounded-circle "
                        width={"300px"}
                        height={"300px"}
                        alt=""
                    /> */}
                    <img src="https://inmarwar.com/cdn/shop/collections/chair-939145.jpg?v=1756808813&width=540" width={'300px'} alt="" />
                </div>

                <div className="col-2" style={{ margin: "0px 50px 0px 0px" }}>
                    <img src="https://inmarwar.com/cdn/shop/collections/6-seater-dining-table-328224.jpg?v=1756834294&width=540" width={'350px'} alt="" />
                    {/* <img
                        src="https://www.royaloakindia.com/media/catalog/product/r/o/royaloak-texas-american-wooden-sofa-1s-1.jpg"
                        className="rounded-circle "
                        width={"300px"}
                        height={"300px"}
                        alt=""
                    /> */}
                </div>

                <div className="col-2" style={{ margin: "50px 20px 0px 0px" }}>
                    <img src="https://cdn.creazilla.com/icons/3431977/bed-icon-lg.png" width={'200px'} alt="" />
                    {/* <img
                        src="https://www.royaloakindia.com/media/catalog/product/c/r/cr20214003_10_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500"
                        className="rounded-circle "
                       width={"300px"}
                        height={"300px"}
                        alt=""
                    /> */}
                </div>

                <div className="col-2" style={{ margin: "0px 150px 0px 0px" }}>
                    {/* <img
                        src="https://vaidyaindustries.in/wp-content/uploads/2021/11/cupboard.jpg"
                        className="rounded-circle "
                       width={"300px"}
                        height={"300px"}
                        alt=""
                    /> */}
                </div>
            </div>
         
            {/* <div>
                <img src="" alt="" />
            </div> */}

            <Link to={'/home'} style={{margin:'20px 20px 0px 800px'}} className="text-black">
            <button className="btn fs-1 d-flex " style={{marginLeft:'700px'}}>
                <h1 className="gallery_font text-primary">GALLERY</h1>
               
                <img src="https://cdn3.iconfinder.com/data/icons/simple-arrows-essentials/48/v-50-512.png" className="ms-3 gallery_font" width={'40px'} alt="" />
                
            </button>
            </Link>
        </div>
    );
}

export default Landing;
