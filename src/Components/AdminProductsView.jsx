import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import SERVER_URL from "../services/serverurl";
import { Form, InputGroup } from "react-bootstrap";
import { deleteProductAPI, getAllProductsAPI, getProductsBasedOnSearchAPI } from "../services/allApi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Edit from "./Edit";
import { editedProductResponse, productAddedResponseContext } from "../Contextapi/ContextApi";
import Add from "./Add";

function AdminProductsView() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { productAddedResponse } = useContext(productAddedResponseContext);
    const { editedResponse } = useContext(editedProductResponse);
    const [allProducts, setallProducts] = useState([]);
    console.log(allProducts);
    const [searchKey, setSearchKey] = useState("");
    // console.log(searchKey);

    useEffect(() => {
        Getallproducts();
    }, [searchKey, editedResponse, productAddedResponse]);

    //getting all products in admin page
    const Getallproducts = async () => {
        // const token = sessionStorage.getItem("token");
        // if (token) {
        //     const reqheader = {
        //         //for verification in server
        //         "Content-Type": "application/json",
        //         authorization: `Bearer ${token}`,
        //     };
        try {
            const res = await getProductsBasedOnSearchAPI(searchKey);
            // console.log(res.data);

            setallProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        // }
    };

    const handleRemove = async (productId) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqheader = {
                //for verification in server
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            };

            try {
                const res = await deleteProductAPI(productId, reqheader);
                Getallproducts();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <div className=" p-2" style={{ marginLeft: "100px" }}>
                <span className="fs-4 fw-bold">Product Count : </span>
                <span className="text-primary fw-bold fs-3 gallery_font fs-1">{allProducts.length}</span>
            </div>
            <Add />

            {/* Search Input */}
            <div className="w-25 mt-5" style={{ marginLeft: "700px" }}>
                <InputGroup size="lg" className="mb-5">
                    <Form.Control
                        onChange={(e) => setSearchKey(e.target.value)}
                        className=""
                        placeholder="Enter the Product Name"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </InputGroup>
            </div>

            <div>
                <div className="row">
                    {
                    allProducts?.length > 0 &&
                        allProducts?.map(
                            (products) => (
                                <div className="col-3 p-4">
                                    {/* Cards Display */}
                                    <Card style={{ width: "23rem" }} className="shadow ms-5">
                                        <Card.Img
                                            variant="top"
                                            src={`${SERVER_URL}/uploads/${products.image}`}
                                            height={"300px"}
                                        />
                                        <Card.Body>
                                            <Card.Title className="">
                                                {products.name}
                                                <br />₹{products.price}
                                            </Card.Title>

                                            <div className="d-flex justify-content-between">
                                                {/* <button className="btn shadow"> */}
                                                <Edit products={products} />
                                                {/* </button> */}
                                                <button
                                                    className="btn shadow"
                                                    onClick={() => handleShow()}
                                                >
                                                    <i
                                                        className="fa-solid fa-trash fa-bounce fa-lg"
                                                        style={{ color: "#e90101" }}
                                                    ></i>
                                                </button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Modal show={show} onHide={handleClose} style={{marginTop:"300px"}}>
                                        <Modal.Body className="fw-bold fs-4 ms-5">Delete the Product?</Modal.Body>
                                        <Modal.Footer className="" style={{marginRight:"100px"}}>
                                            <Button variant="" className="btn btn-primary ps-5 pe-5 fw-bold" onClick={handleClose}>
                                                No
                                            </Button>
                                            <Button variant="" className="btn btn-success ps-5 pe-5 fw-bold" onClick={() => handleRemove(products._id)}>
                                                Yes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            )

                            // {/* ) : (
                            // <div className="text-danger fs-5 fw-bolder ms-5"> </div> */}
                        )}
                </div>
               
            </div>
        </div>
    );
}

export default AdminProductsView;
