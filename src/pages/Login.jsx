import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, ResetPswdAPI } from "../services/allApi";
import Spinner from "react-bootstrap/Spinner";
import Header from "../Components/Header";
import { adminAuthorisedContext, authorisationContext } from "../Contextapi/ContextApi";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login({ insideLogin }) {
    const [viewPswd,setViewPswd]=useState(true)
    const [userReset,setUserReset]=useState({email:"",password:"",passwordConfirm:""})
    // console.log(userReset);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { setisAdmin } = useContext(adminAuthorisedContext);
    const [userData, setUserData] = useState({ email: "", password: "" });
    //  console.log(userData);

    const [isLogin, setisLogin] = useState(false);
    const navigate = useNavigate();
    const { setisAuthorisation } = useContext(authorisationContext);

    const handleLogin = async () => {
        const { email, password } = userData;
        if (email && password) {
            const before_email = email.slice(0, -10);
            try {
                if (email.toLowerCase().includes("@gmail.com") && !before_email == "") {
                    const response = await loginAPI(userData);
                    console.log(response);
                    if (response.status == 200) {
                        //  console.log(response.data.user.role);
                        setisAuthorisation(true);
                        setisLogin(true);
                        setTimeout(() => {
                            sessionStorage.setItem("user", JSON.stringify(response.data.user));
                            sessionStorage.setItem("token", response.data.token);
                            setUserData({ username: "", email: "", password: "" });
                            if (response.data.user.role == "admin") {
                                setisAdmin(true);
                                navigate("/admin");
                            } else {
                                navigate("/home");
                                setisAdmin(false);
                                toast.success(`Welcome ${response.data.user.username}`);
                            }
                        }, 2000);
                    }else{
                        toast.error(response.response.data)
                    }
                } else {
                    toast.error("Enter Valid Email Address");
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("Please Enter Email and Password");
        }
    };

    const handleResetPswd=async()=>{
        const {email,password,passwordConfirm}=userReset
        if(email,password,passwordConfirm){
            if(password==passwordConfirm){
                try {
                    const resetUser=await ResetPswdAPI({email,password})
                    console.log(resetUser);
                    
                } catch (error) {
                    console.log(error);
                    
                }
            }else{
                toast.error('Password missmatch')
            }
        }else{
             toast.error('Enter All Details')
        }
    }

    const handleViewPswd=()=>{
        setViewPswd(true)
      }
      const handleNotViewPswd=()=>{
        setViewPswd(false)
      }
    return (
        <div>
            <Header insideLogin={insideLogin} />
            <div className="d-flex align-items-center justify-content-evenly " style={{ marginTop: "200px" }}>
                {/* <img
                  className=" rounded-5"
                  width={"600px"}
                  src="https://slidebazaar.com/wp-content/uploads/2022/05/Welcome-Furniture-Presentation-PowerPoint-template-SB02191-jpg.webp"
                  alt=""
              /> */}

                <div className="border rounded-5 w-25 p-4 " style={{ height: "400px" }}>
                    <InputGroup size="lg" className=" mb-3 mt-5">
                        <Form.Control
                            type="email"
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            value={userData.email}
                            placeholder="Enter Email"
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                        />
                    </InputGroup>
                    {!userData.email.includes("@gmail.com") && !userData.email == "" && (
                        <div className="ms-3 mt-2 mb-2 ">
                            <h5 className="fw-bold" style={{ color: "red" }}>
                                Invalid Email
                            </h5>
                        </div>
                    )}

                    <InputGroup size="lg">
                        <Form.Control
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            value={userData.password}
                            placeholder="Enter Password"
                            aria-label="Large"
                            aria-describedby="inputGroup-sizing-sm"
                            type={viewPswd?"password":"text"}
                            style={{position:'relative',zIndex:'1'}}
                        />
                        {!viewPswd&&
                       
                        <img onClick={handleViewPswd} style={{position:'relative', right:'50px',zIndex:'1'}}  src="https://www.svgrepo.com/show/348139/eye-crossed.svg" width={'30px'} alt="" />
                       }
                        

                        {viewPswd&&
                   
                        <img onClick={handleNotViewPswd} style={{position:'relative', right:'50px',zIndex:'1'}} src="https://icons.veryicon.com/png/o/miscellaneous/simple-linetype-icon/eye-43.png" width={'30px'} alt="" />
                  
                      }
                    </InputGroup>

                    <button
                        onClick={handleLogin}
                        className="btn btn-primary fw-bold fs-5 ps-5 pe-5"
                        style={{ marginLeft: "130px", marginTop: "70px" }}
                    >
                        Login
                        {isLogin && <Spinner animation="grow" variant="light" />}
                    </button>

                    <p className="text-black">
                        Don't have an account?{" "}
                        <Link className="fw-bold text-black" to={"/register"}>
                            SignUp
                        </Link>
                    </p>
                    <p>
                        Forgot Password?{" "}
                        <Link className="fw-bold text-black" onClick={handleShow}>
                            Reset
                        </Link>
                    </p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input onChange={(e)=>setUserReset({...userReset,email:e.target.value})} type="text" className="form-control" placeholder="Enter your Email"/><br />
                    <span className="fw-bold ">New Password </span>
                    <input onChange={(e)=>setUserReset({...userReset,password:e.target.value})} type="password" className="form-control" placeholder="Password"/>
                     <span className="fw-bold ">Confirm Password </span>
                     <input onChange={(e)=>setUserReset({...userReset,passwordConfirm:e.target.value})} type="password" className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleResetPswd}>Reset Password</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
