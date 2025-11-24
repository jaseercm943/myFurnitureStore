import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SERVER_URL from "../services/serverurl";
import { updateProductAPI } from "../services/allApi";
import { editedProductResponse } from "../Contextapi/ContextApi";


function Edit({products}) {
    const [productDetails, setproductDetails] = useState({
        name: products.name,
        image: "",
        price: products.price,
        category: products.category,
        offers: products.offers,
        description:products.description,
        material:products.material
    });
    // console.log(productDetails);

    const [preview, setPreview] = useState("");

    const [show, setShow] = useState(false);

    const {seteditedResponse}=useContext(editedProductResponse)

    useEffect(() => {
        const Image = productDetails?.image;
        if (Image) {
            setPreview(URL.createObjectURL(productDetails?.image));
        } else {
            setPreview("");
        }
    }, [productDetails?.image]);

    const handleClose = () => {
        setShow(false);
        setproductDetails({
            name: products.name,
            image: "",
            price: products.price,
            category: products.category,
            offers: products.offers,
            description:products.description,
            material:products.material
        });
    };
    const handleShow = () => {
        setShow(true);
        setproductDetails({
            name: products.name,
            image: "",
            price: products.price,
            category: products.category,
            offers: products.offers,
            description:products.description,
            material:products.material
        });
    };

    const handleUpdate = async () => {
        const { name, price, image, category, offers,description,material } = productDetails;
        const reqBody = new FormData();//request body
        reqBody.append("name", name);
        reqBody.append("price", price);
        reqBody.append("category", category);
        reqBody.append("offers", offers);
        reqBody.append("description",description);
        reqBody.append("material",material)
        preview ? reqBody.append("image", image) : reqBody.append("image", products?.image);

        try {
            const token = sessionStorage.getItem("token");
            if (token) {
                const reqheader = {//request header
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                };
                const res = await updateProductAPI(products?._id, reqBody, reqheader);//api call for update
                console.log(res);
                if (res.status == 200) {
                    handleClose();
                    seteditedResponse(res.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            
                <button onClick={() => handleShow()} className="btn btn-light shadow">
                       <i
                       className="fa-solid fa-pen-to-square fa-flip fa-xl"
                       style={{ color: " #19a706" }}
                       
                       ></i>
                </button>
               
           

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-evenly">
                    <label>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => setproductDetails({ ...productDetails, image: e.target.files[0] })}
                        />
                        <img
                            src={preview ? preview : `${SERVER_URL}/uploads/${products?.image}`}
                            width={"290px"}
                            alt=""
                        />
                    </label>
                    <div className="w-50">
                        <input
                            value={productDetails?.name}
                            onChange={(e) => setproductDetails({ ...productDetails, name: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="name"
                        />
                        <input
                            value={productDetails?.price}
                            onChange={(e) => setproductDetails({ ...productDetails, price: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="price"
                        />
                        <input
                            value={productDetails?.category}
                            onChange={(e) => setproductDetails({ ...productDetails, category: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="category"
                        />
                        <input
                            value={productDetails?.offers}
                            onChange={(e) => setproductDetails({ ...productDetails, offers: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="offer"
                        />
                        <input
                            value={productDetails?.description}
                            onChange={(e) => setproductDetails({ ...productDetails, description: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="description"
                        />
                        <input
                            value={productDetails?.material}
                            onChange={(e) => setproductDetails({ ...productDetails, material: e.target.value })}
                            type="text"
                            className="form-control mb-4"
                            placeholder="material"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Edit;
