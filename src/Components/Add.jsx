import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { addProductAPI, getAllProductsAPI } from "../services/allApi";
import { productAddedResponseContext } from "../Contextapi/ContextApi";
import { toast } from "react-toastify";


function Add() {
    const { setproductAddedResponse } = useContext(productAddedResponseContext);
    //state for added product holding
    const [productDetails, setProductDetails] = useState({ name: "", price: "", image: "", category: "", offers: "", description:"", material:"" });
    // console.log(productDetails);

    const [preview, setPreview] = useState(""); //for user choosed image storing
    const [show, setShow] = useState(false); //for modal showing

    useEffect(() => {
        //Loads when component renders and whnever image changes
        if (productDetails.image) {
            setPreview(URL.createObjectURL(productDetails.image)); //setting url for choosing image
        } else {
            setPreview("https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-File.png");
        }
    }, [productDetails.image]);

    //showing when page loads and whenever searching occurs

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //adding new products
    const handleUpload = async () => {
        const { name, price, image, category, offers, description,material } = productDetails;

        const reqbody = new FormData();
        reqbody.append("name", name);
        reqbody.append("price", price);
        reqbody.append("image", image);
        reqbody.append("category", category);
        reqbody.append("offers", offers);
        reqbody.append("description", description);
        reqbody.append("material", material);

        const token = sessionStorage.getItem("token"); //token accessing
        const reqheader = {
            //request header setting
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
        };

        if (name && price && image && category) {
            try {
                const result = await addProductAPI(reqbody, reqheader); //request passed to server
                console.log(result);
                if (result.status == 200) {
                    const response = await getAllProductsAPI();

                    setproductAddedResponse(response.data);
                    setProductDetails({ name: "", price: "", image: "", category: "", offers: "",description:"",material:"" });
                    handleClose();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Enter all details");
        }
    };

    return (
        <div>
            <button className="btn btn-success border shadow  rounded-3 fw-bold fs-4 me-5" style={{marginLeft:'100px'}} onClick={handleShow}>
                Add Product <span className="fs-3">+</span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                {/* <Modal.Header closeButton>
                    <Modal.Title className="fw-bolder text-success">Add Product</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className="d-flex justify-content-around">
                    <div>
                        <label>
                            <img src={preview} width={"250px"} alt="" />
                            <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => setProductDetails({ ...productDetails, image: e.target.files[0] })}
                            />
                        </label>
                    </div>
                    <div>
                        <input
                            placeholder="Product Name"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                        />
                        <br />
                        <input
                            placeholder="Product Price"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, price: Number(e.target.value) })}
                        />{" "}
                        <br />
                        <input
                            placeholder="Product Category"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
                        />
                        <br />
                        <input
                            placeholder="Product Offer"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, offers: Number(e.target.value) })}
                        />
                        <br />
                        <input
                            placeholder="Product Description"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, description: Number(e.target.value) })}
                        />
                        <br />
                         <input
                            placeholder="Product Material"
                            type="text"
                            className="form-control"
                            onChange={(e) => setProductDetails({ ...productDetails, material: Number(e.target.value) })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className="me-5 fw-bold ps-4 pe-4" onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button variant="success" className="me-5 fw-bold ps-4 pe-4" onClick={handleUpload}>
                        UPLOAD
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Add;
