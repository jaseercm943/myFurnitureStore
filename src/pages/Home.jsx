import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getAllProductsAPI, getProductsBasedOnSearchAPI } from "../services/allApi";
import Header from "../Components/Header";
import Fade from "react-bootstrap/Fade";
import SERVER_URL from "../services/serverurl";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import Pagination from "../Components/Pagination";

// import BackImage from '../src/style.css'

function Home({ insideHome }) {
    const [price,setprice]=useState(0)//price set to initial value
    const [isLoading,setIsLoading]=useState(false)//to show loading spin
    const [open, setOpen] = useState(false); //to store for modal visibility
    const [allProducts, setallProducts] = useState([]); //to store all products
    const [categories, setcategories] = useState([]); //to store categories
    const [searchKey, setSearchKey] = useState(""); //to store searchkey of user
    const navigate = useNavigate();
    
    const [currentPage,setCurrentPage]=useState(1)
    const [productsPerPage,setproductsPerPage]=useState(6)
    // const [ProductsOnPage,setProductsOnPage]=useState([])

    let endingIndex=productsPerPage*currentPage
    let startingIndex=endingIndex-productsPerPage

    // let ProductsOnPage=allProducts.slice(startingIndex,endingIndex)
    // console.log(ProductsOnPage);
    
    
        
    useEffect(() => {
        setTimeout(() => {
            getAllProducts();
            setIsLoading(false)
        }, 500);
        setIsLoading(true)
    }, [currentPage]);

    useEffect(() => {
        productBasedOnPrice()
    }, [price])
    

    useEffect(() => {
        setTimeout(() => {
            productSearch();
             setIsLoading(false)
        }, 500);
        setIsLoading(true)
    }, [searchKey]);

    
    

    
    //category names display
    const category = async () => {
        setOpen(!open);
        let categoryArray = [];
        try {
            const res = await getAllProductsAPI();
            res.data.forEach((pro) => {
                //printing all Categories in every Products
                !categoryArray.includes(pro.category) && categoryArray.push(pro.category);
            });
        } catch (error) {
            console.log(error);
        }
        setcategories([...categoryArray]);
    };

    
    const getAllProducts = async () => {
        const res = await getAllProductsAPI();
        
        setallProducts(res.data);
        
        // setProductsOnPage(res.data.slice(startingIndex,endingIndex))
    };

    //category based search
    const productsBasedOnCategory = async (Category) => {
        try {
            const res = await getAllProductsAPI();
            const productsFiltered = res.data.filter((product) => product.category == Category);
           
            setTimeout(() => {
                 setallProducts(productsFiltered);
                 setIsLoading(false)
            }, 500);

            setIsLoading(true)
        } catch (error) {
            console.log(error);
        }
    };

    //searching by name
    const productSearch = async () => {
        try {
            const res = await getProductsBasedOnSearchAPI(searchKey);
            setallProducts(res.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    const productBasedOnPrice=async()=>{
        try {
            const allproducts=await getAllProductsAPI()
            const Products=allproducts.data.filter(pro=>pro.price-pro.offers>=price)
            setallProducts(Products)
            } catch (error) {
            console.log(error);
            
            }
    }
return (
        <div>
            <div className=''>
                <Header insideHome={insideHome} />

            <div className="w-25 mt-5" style={{ marginLeft: "700px",position:'absolute',top:'80px' }}>
                <InputGroup size="lg" className="mb-5">
                    <Form.Control
                        onChange={(e) => setSearchKey(e.target.value)}//accessing SearchKey form input field
                        className=""
                        placeholder="Enter the Product Name"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
            </div>

            <div className="  rounded-1 ps-5 row" style={{marginTop:'200px'}}>
                <div className="col-2 me-2 border rounded-4">
                    <h4 className="fw-bolder fs-3 text-decoration-underline">Filter</h4>
                    <div>
                        <button className="btn rounded-3 border fs-5 text-decoration-none fw-bold mb-2 text-primary" onClick={getAllProducts}>
                            All Products
                        </button>
                    </div>

                    <button
                        className="btn rounded-3 border text-success fs-5 fw-bold text-decoration-none"
                        onClick={category}
                        aria-controls="example-fade-text"
                        aria-expanded={open}
                    >
                        Category <i className="fa-regular fa-square-caret-down fa-lg" style={{ color: " #f20226" }}></i>
                    </button>
                    <Fade in={open}>
                        <div id="example-fade-text" className=" row  ">
                            {categories?.length > 0 ? (
                                categories?.map((cat) => (
                                   <div className="col-4">
                                    {/* <div className="col-2"> */}
                                        <Link
                                        className=" text-decoration-none me- mt-1 fw-bold "
                                        onClick={() => productsBasedOnCategory(cat)}
                                        >
                                        {cat}
                                        </Link>
                                    {/* </div> */}
                                       
                                   </div> 
                                ))
                            ) : (
                                <div className="text-danger fs-5">
                                     <Spinner animation="grow" variant="success" className="me-2"/>
                                     <Spinner animation="grow" variant="danger" className="me-2"/> 
                                </div>
                            )}
                        </div>
                    </Fade>
                </div>
           
              {/* price range */}
                <div className="col-2 border rounded-4">
                    <h2 className="fw-bold">Price</h2>
                    {/* <input type="range" /> */}
                    <Form.Label>{price}</Form.Label>
                    <Form.Range  onChange={(e)=>setprice(e.target.value*600)}/>
                </div>
            </div>

          {/* Products Display */}
            <div className="">
                {!isLoading?<Row className="p-3">
                    {allProducts?.length > 0 ? (
                       allProducts?.map((products) => (
                            <Col lg={3} md={4} sm={6} className="ms-">
                                <Card
                                    style={{ width: "25rem", fontFamily: "", backgroundColor: "white" }}
                                    className=" text-black mt-5"
                                >
                                    <Link to={`/product/${products._id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={`${SERVER_URL}/uploads/${products.image}`}//accesing Image file from server folder=>"uploads"
                                            height={"300px"}
                                        />
                                    </Link>

                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Card.Title className="fw-bold text-center">{products.name}</Card.Title>
                                            <span className="fw-bold fs-5">
                                                <i
                                                    className="fa-solid fa-indian-rupee-sign fa-sm"
                                                    style={{ color: "#f00557" }}
                                                ></i>
                                                {products.price-products.offers} <del className="fw-normal">{products.price}</del>
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div>
                            <h1 className="text-warning fw-bold"> </h1>
                        </div>
                    )}
                </Row> : 
                <div className="" style={{marginLeft:'700px'}}> 
                <Spinner animation="grow" variant="primary" className="me-2"/>
                <Spinner animation="grow" variant="secondary" className="me-2"/>
                <Spinner animation="grow" variant="success" className="me-2"/>
                <Spinner animation="grow" variant="danger" className="me-2"/>
                <Spinner animation="grow" variant="warning" className="me-2"/>
                <Spinner animation="grow" variant="info" className="me-2"/>
                <Spinner animation="grow" variant="dark" />
                </div> }
            </div>
            
            </div>
            <Pagination allProducts={allProducts} productsPerPage={productsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    );
}

export default Home;
