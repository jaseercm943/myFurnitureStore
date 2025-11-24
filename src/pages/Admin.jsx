import React, { useContext, useEffect } from "react";
import Header from "../Components/Header";
import { addProductAPI, getAllProductsAPI, getProductsBasedOnSearchAPI } from "../services/allApi";
import { useState } from "react";
import AdminProductsView from "../Components/AdminProductsView";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { editedProductResponse } from "../Contextapi/ContextApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UsersList from "../Components/UsersList";



function Admin() {

    const [isProductView,setisProductView]=useState(false)
    const [isUsersView,setisUsersView]=useState(false)
    // //state for accessed allproducts holding
    const [allProducts, setallProducts] = useState([]);
    // console.log(allProducts);
   
    useEffect(() => {
        Getallproducts();
    }, []);

   
    // //getting all products in admin page
    const Getallproducts = async () => {
        const token = sessionStorage.getItem("token");
        // if (token) {
        //     const reqheader = {
        //         //for verification in server
        //         "Content-Type": "application/json",
        //         authorization: `Bearer ${token}`,
        //     };
            try {
                const res = await  getAllProductsAPI(); 
                // console.log(res.data);

                setallProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        // }
    };

    const handleProductView=()=>{
       setisUsersView(false)
       setisProductView(true)
    }

    const handleUsersView=()=>{
       setisUsersView(true)
       setisProductView(false)
    }

    return (
        <>
            <Header />
            <div style={{ margin: "120px 100px 100px 100px" }}>
                <div className="d-flex align-items-center justify-content-center">
                   
                      

                      <button onClick={handleProductView} className="btn border shadow p- rounded-3 fw-bold fs-4 me-5">Products</button> 
                  
                    <button className="btn border shadow p- rounded-3 fw-bold fs-4 me-5" onClick={handleUsersView}>Users</button>
                    <button className="btn border shadow  p- rounded-3 fw-bold fs-4 text-black">Orders</button>
                </div>
            </div>

            
            {isProductView&&<AdminProductsView/>}
             {isUsersView&&<UsersList/>}
           
        </>
    );
}

export default Admin;
