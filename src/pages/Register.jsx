import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../Components/Header';
import { toast } from 'react-toastify';


function Register({insideRegister}) {
      const [viewPswd,setViewPswd]=useState(true)
    //   console.log(viewPswd);
      
      const [userData, setUserData] = useState({ username: "", email: "", password: "",address:"",phonenumber:"" });
    //   console.log(userData);
      const navigate=useNavigate()

      const handleRegister = async () => {
          const { username, email, password,address,phonenumber} = userData;
          const before_email = email.slice(0, -10);
          if (username && email && password) {
          if(email.toLocaleLowerCase().includes('@gmail.com') && !before_email=="" ){
                    try {
                        const response = await registerAPI(userData);
                        console.log(response);
                        if(response.status==200){
                            // alert("Registration Successfull");
                            toast.success("Registration Successfull")
                            setUserData({ username: "", email: "", password: "" });
                            navigate('/login');
                        }else{
                            toast.error('User Already Registered')
                            
                        }
                     } catch (error) {
                        console.log(error);
                    }
            }else{
                toast.error('Enter Valid email')
            }
              
          } else {
              toast.error("Please Enter all Details to Register");
          }
      };

      const handleViewPswd=()=>{
        setViewPswd(true)
      }
      const handleNotViewPswd=()=>{
        setViewPswd(false)
      }
  return (
      <>
          <Header insideRegister={insideRegister}/>
          <div className="d-flex align-items-center justify-content-evenly " style={{marginTop:'200px'}}>
              {/* <img
                  className="border rounded-5"
                  width={"600px"}
                  src="https://www.omnicybersecurity.com/wp-content/uploads/2024/03/Authentication.png"
                  alt=""
              /> */}

              <div className="border rounded-5 w-25 p-5 bg-" style={{ height: "400px" }}>
                  {/* {insideRegister && ( */}
                      <InputGroup size="lg" className="">
                          <Form.Control
                              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                              value={userData.username}
                              className=""
                              placeholder="Enter Username"
                              aria-label="Large"
                              aria-describedby="inputGroup-sizing-sm"
                          />
                      </InputGroup>
                  {/* )} */}

                  {/* <InputGroup size="lg" className='mb-5 '>
            
                <Form.Control
                onChange={(e)=>setUserData({...userData,email:e.target.value})}
                value={userData.email}
                placeholder='Enter Email'
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                />
             </InputGroup> */}

                  <InputGroup size="lg" className=" mb-3 mt-3">
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
                      <div className="ms-3 mt-2 mb-2 fw-bold" style={{color:'red'}}>invalid Email</div>
                  )}

                  <InputGroup size="lg" >
                      <Form.Control
                      style={{position:'relative'}}
                          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                          value={userData.password}
                          placeholder="Enter Password"
                          aria-label="Large"
                          aria-describedby="inputGroup-sizing-sm"
                          type={viewPswd?"password":"text"}
                      />
                      {!viewPswd&&
                      <button className='btn border' onClick={handleViewPswd}>
                        <img   src="https://www.svgrepo.com/show/348139/eye-crossed.svg" width={'30px'} alt="" /></button>}

                      {viewPswd&&
                      <button className='btn border' onClick={handleNotViewPswd}>
                        <img   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFAeO1MydFS0blCxKLC9XcqrfWdeVvPOfoA&s" width={'30px'} alt="" />
                      </button>
                      }
                  </InputGroup>
                  {/* {insideRegister ? ( */}
                      <button
                          onClick={handleRegister}
                          className="btn btn-primary fw-bold fs-5 ps-5 pe-5 "
                          style={{ marginLeft: "100px", marginTop: "50px" }}
                      >
                          Register
                      </button>
                  {/* ) : ( */}
                      {/* <button
                          onClick={handleLogin}
                          className="btn btn-primary fw-bold fs-5"
                          style={{ marginLeft: "130px", marginTop: "70px" }}
                      >
                          Login
                          {isLogin && <Spinner animation="grow" variant="light" />}
                      </button> */}
                  {/* )} */}
                  {/* {!insideRegister ? ( */}
                      
                  {/* ) : ( */}
                      <p className="text-black mt-3">
                          Already have an account?{" "}
                          <Link className="fw-bold text-black" to={"/login"}>
                              LogIn
                          </Link>
                      </p>
                  {/* )} */}
              </div>
          </div>
      </>
  );
}

export default Register