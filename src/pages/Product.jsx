import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { addToCartAPI, addToWishListAPI, getAllProductsAPI } from "../services/allApi";
import Header from "../Components/Header";
import SERVER_URL from "../services/serverurl";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { addedToCartResponseContext, showArrowCartContext, showArrowWishListContext, wishlistCountResponseContext } from "../Contextapi/ContextApi";
import { toast } from "react-toastify";



function Product() {
    const {setshowArrowWishList}=useContext(showArrowWishListContext)
    const {setshowCartArrow}=useContext(showArrowCartContext)
    const {setaddedToCartResponse}=useContext(addedToCartResponseContext)
    const [product, setProduct] = useState({}); //state for holding the choosed product
    console.log(product);
    const{setwishlistCountResponse}=useContext(wishlistCountResponseContext)
    const { productid } = useParams(); //to get the path parameter
    console.log(productid);

    useEffect(() => {
        //renders the product when component renders
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const productsFromHome = await getAllProductsAPI();
            console.log(productsFromHome);
            const SelectedProduct = productsFromHome.data.find((product) => product._id == productid);
            console.log(SelectedProduct);
            setProduct(SelectedProduct); //the choosed product stored in state
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddtoWishList = async (productid) => {
        // const userId=JSON.parse(sessionStorage.getItem('user'))._id

        const token = sessionStorage.getItem("token"); //token accesing
        if (token) {
            const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            };
            const {name,image,price,offers}=product
            
            
            try {
                const res=await addToWishListAPI(productid,{name,image,price,offers},reqheader)
                console.log(res);

                if(res.status==200){
                    setTimeout(() => {
                        setshowArrowWishList(false)
                    }, 4000);
                    toast.success('Added to Wishlist')
                    setwishlistCountResponse(res.data)
                    setshowArrowWishList(true)
                }else{
                    toast.error(res.response.data)
                }
                
            } catch (error) {
                console.log(error);
                
            }
            
        }else{
            toast.error('Please Login')
        }
    };

    const handleAddtoCart=async(productId)=>{
       const {name,image,price,offers}=product
       
       
       const token=sessionStorage.getItem('token')
       if(token){
          const reqheader = {
                //for token verification in server
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            };

            try {
                const res=await addToCartAPI(productId,{name,image,price,offers},reqheader)
                console.log(res);
                
                if(res.status==200){
                   
                    setTimeout(() => {
                         setshowCartArrow (false)
                    }, 4000);
                    setaddedToCartResponse(res.data)
                    
                    toast.success('Added to Cart')
                    setshowCartArrow(true)
                }
                
            } catch (error) {
                console.log(error);
                
            }
       }else{
        toast.error('Please Login')
       }
       
    }

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-evenly  " style={{marginTop:'200px'}}>
                <div>
                    <Card style={{ width: "20rem" }} className="">
                        <Card.Img variant="top" src={`${SERVER_URL}/uploads/${product?.image}`} height={"350px"} />
                        <Card.Body
                            className="d-flex justify-content-between "
                            style={{ height: "70px", paddingTop: "" }}
                        >
                            {/* cart button */}
                            {["bottom"].map((placement) => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Add To Cart <strong></strong>.
                                        </Tooltip>
                                    }
                                >
                                    <button variant="" className="btn" onClick={() => handleAddtoCart(product._id)}>
                                        <i className="fa-solid fa-cart-shopping fa-xl" style={{ color: "#0a0a0a" }}></i>{" "}
                                    </button>
                                </OverlayTrigger>
                            ))}

                            {/* wishlist button */}
                            {["bottom"].map((placement) => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            Add To Wishlist<strong></strong>
                                        </Tooltip>
                                    }
                                >
                                    <button variant="" className="btn" onClick={() => handleAddtoWishList(product._id)}>
                                        {" "}
                                        <i className="fa-solid fa-heart fa-xl" style={{ color: " #0f0f0f" }}></i>
                                    </button>
                                </OverlayTrigger>
                            ))}

                           
                        </Card.Body>
                    </Card>
                </div>

                <div>
                    <h1 style={{fontFamily:'Bebas Neue'}} className="fw-bold">{product?.name}</h1>
                    <h3>
                        <i className="fa-solid fa-indian-rupee-sign fa-sm" style={{ color: "#0a0a0aff" }}></i>
                        <span className="fw-bold">{product?.price}/-</span>
                    </h3>
                    <h3>
                        <span>
                            category: <span className="fw-bold">{product?.category}</span>
                        </span>
                    </h3>
                    <h3>
                        {product?.description}
                    </h3>
                    <h4>
                      {product?.material}
                    </h4>
                </div>
            </div>
        </div>
    );
}

export default Product;
