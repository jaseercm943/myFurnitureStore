import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";


function Verified({userContact}) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
     const navigate=useNavigate()
    const handleClose=()=>{
        
      navigate('/home')
    }

    return (
        <div>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Order Placed to your Address <br />
                    {} Successfully
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}

            <div style={{margin:'200px 100px 0px 700px'}} className="border w-25 ps-5 pt-3 pb-3 rounded-5 border-5 bg-body-secondary">
                <h2>Payment Successfull</h2>
                <h4>Order Placed to your Address</h4>
                <h4>{userContact.address}</h4>
                <button className="btn btn-success ps-5 pt-2 fw-bold fs-5  pe-5 mt-3" style={{marginLeft:'50px'}} onClick={handleClose}>OK</button>
            </div>
        </div>
    );
}

export default Verified;
