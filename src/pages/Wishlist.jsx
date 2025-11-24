import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { addToCartAPI, deleteEachWishListAPI, getWishListAPI } from "../services/allApi";
import { Col, Row } from "react-bootstrap";
import { ServerRouter } from "react-router-dom";
import SERVER_URL from "../services/serverurl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { addedToCartResponseContext, showArrowCartContext, showArrowWishListContext, wishlistCountResponseContext } from "../Contextapi/ContextApi";
import { toast } from "react-toastify";



function Wishlist() {
    const {setshowArrowWishList}=useContext(showArrowWishListContext)
    const {setshowCartArrow}=useContext(showArrowCartContext)
    const {setaddedToCartResponse}=useContext(addedToCartResponseContext)
    const {setwishlistCountResponse}=useContext(wishlistCountResponseContext)
    const [wishList, setwishList] = useState([]);
    const [wishlistRemoved,setwishlistRemoved]=useState({})
    console.log(wishList);

    useEffect(() => {
        GetWishList();
    }, []);

    const GetWishList = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            try {
                const res = await getWishListAPI(reqheader);
                // console.log(res);
                setwishList(res.data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleRemoveWishList = async (productId) => {
        const token = sessionStorage.getItem("token");
        console.log(token);

        if (token) {
            const reqheader = {
                //for verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
            console.log(reqheader);

            try {
                const res = await deleteEachWishListAPI(productId, reqheader);
                console.log(res);
                if(res.status==200){
                   
                     toast.error('Removed from WishList Successfully')
                     GetWishList();
                     setwishlistCountResponse(res)
                     setTimeout(() => {
                        setshowArrowWishList(false)
                     }, 2000);
                     setshowArrowWishList(true)
                }
                
               
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    const handleAddtoCart=async(products)=>{
        
        console.log(products.offers);
        
        const {name,image,price,offers}=products
        const token=sessionStorage.getItem('token')
        if(token){
              const reqheader = {
                //for verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };
        
            try {
                const res=await addToCartAPI(products?.productId,{name,image,price,offers},reqheader)
                console.log(res);
                if(res.status==200){
                     setTimeout(() => {
                         setshowCartArrow (false)
                    }, 4000);
                   setshowCartArrow(true)
                   toast.success('Added to Cart')
                   const result= await deleteEachWishListAPI(products?.productId, reqheader);
                   console.log(result);
                   GetWishList()
                   setwishlistCountResponse(result)
                   setaddedToCartResponse(result.data)
                }
                
            } catch (error) {
                console.log(error);
                
            }
        }
         
       
        
    }

    return (
        <div>
            <Header />
            <Row className=" ps-5" style={{marginTop:'200px'}}>
                {wishList?.length > 0 ? (
                    wishList?.map((products) => (
                        <Col lg={'2'} md={'6'} sm={'12'}>
                            <Card style={{ width: "20rem" }}>
                                <Card.Img
                                    variant="top"
                                    src={`${SERVER_URL}/uploads/${products?.image}`}
                                    height={"300px"}
                                />
                                <Card.Body>
                                    <Card.Title className="fw-bold">{products?.name}</Card.Title>
                                    {/* <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of the
                                        card's content.
                                    </Card.Text> */}
                                    <div className="d-flex justify-content-between">
                                        {["bottom"].map((placement) => (
                                            <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                        Add To Cart <strong></strong>
                                                    </Tooltip>
                                                }
                                            >
                                                <button variant="" className="btn" onClick={() => handleAddtoCart(products)}>
                                                    <i
                                                        className="fa-solid fa-cart-shopping fa-xl"
                                                        style={{ color: "#0a0a0a" }}
                                                    ></i>{" "}
                                                </button>
                                            </OverlayTrigger>
                                        ))}{" "}
                                        {["bottom"].map((placement) => (
                                            <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                    <Tooltip id={`tooltip-${placement}`}>
                                                        <strong>Remove</strong>
                                                    </Tooltip>
                                                }
                                            >
                                                <button
                                                    variant=""
                                                    className="btn"
                                                    onClick={() => handleRemoveWishList(products?.productId)}
                                                >
                                                    {" "}
                                                    <i
                                                        className="fa-solid fa-trash fa-xl"
                                                        style={{ color: " #f20202" }}
                                                    ></i>
                                                </button>
                                            </OverlayTrigger>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <div style={{margin:'20px 20px 10px 450px'}}>
                        <img src="https://behalacollege.in/display_board/assets/images/empty-wishlist.png" width={'800px'} alt="" />
                    </div>
                   
                )}
            </Row>
        </div>
    );
}

export default Wishlist;
