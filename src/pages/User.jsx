import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { getAllProductsAPI, getUserProfileAPI, updateProfileAPI } from '../services/allApi'
import { toast } from 'react-toastify'


function User() {
   const regex=/^[0-9]*$/
  const [userDetails,setuserDetails]=useState({username:"",email:"",address:"",phonenumber:"",password:""})
  // console.log(userDetails);
  const [isEmail,setisEmail]=useState(true)
  const [isPhonenumber,setisPhonenumber]=useState(true)

  useEffect(() => {
    GetProfile() 
  }, [])
  

  const GetProfile=async()=>{
    const token=(sessionStorage.getItem('token'))
    if(token){
       const reqheader={
        "Content-Type":"application/json",
        "authorization":`Bearer ${token}`
       }

       try {
        const result=await getUserProfileAPI(reqheader)
        console.log(result);
        setuserDetails(result.data)
       } catch (error) {
        console.log(error);
        
       }
    }
    
    
  }
  
  const updateInformation=async(e,userId)=>{
    e.preventDefault()
     const token=sessionStorage.getItem('token')
     if(token){
       const reqheader={
        "Content-Type":"application/json",
        "authorization":`Bearer ${token}`
       }
     
       const{username,email,password,address,phonenumber}=userDetails
       console.log(username,email,password,address,phonenumber);
      
         const regex=/^[0-9]*$/
         
        
       
        
       try {
        if(email.includes('@gmail.com' )){
          
           if(regex.test(phonenumber)){
                const result=await updateProfileAPI(userDetails,reqheader)
                console.log(result);
                if(result.status==200){
                  toast.success('Profile Updated Successfully')
                }
               
               
           }else{
                
                toast.error('Enter a valid Phone number')
           }
               
        }else{
         
          toast.error('Enter a valid Email or Phone number')
          
        }
        
         
       } catch (error) {
        console.log(error);
        
       }
       
     }
      
  }
  return (
    <div>
      <Header/>
      <div className='d-flex justify-content-center ' style={{marginTop:'150px'}}>
       { userDetails&&
         
          <div style={{width:'600px'}} className='' >
            <div className='mb-4'>
                <span className='fw-bold fs-5'>Name :</span>
                <input className='form-control p-2' value={userDetails?.username} onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})} type="text" placeholder='name'/>
            </div>
             
             <div className='mb-4'>
                  <span className='fw-bold fs-5'>Email :</span>
                  <input className='form-control p-2' value={userDetails?.email}  onChange={(e)=>setuserDetails({...userDetails,email:e.target.value})} type="text" placeholder='email'/>
                  {!userDetails.email.includes('@gmail.com')&& <h6 className='' style={{color:'red'}}> Invalid Email</h6>}
             </div>
            
           
            <div className='mb-4'>
                <span className='fw-bold fs-5'>Phone Number :</span>
                <input onChange={(e)=>setuserDetails({...userDetails,phonenumber:e.target.value})} type="text" placeholder='Phone Number' className='form-control' value={userDetails?.phonenumber} />
                {!regex.test(userDetails.phonenumber)&&<h6 className='' style={{color:'red'}}>Enter a valid Phone number</h6>}
            </div>
            
            <div className='mb-4'>
               <span className='fw-bold fs-5'>Address :</span>
               <input onChange={(e)=>setuserDetails({...userDetails,address:e.target.value})} className='form-control p-3' type="text" placeholder='address' value={userDetails?.address} /> 
            </div>
            

            <button className='btn border bg-success text-white fw-bold' onClick={(e)=>updateInformation(e,userDetails._id)}>Update My Profile</button>
          </div>
         
        }
      </div>
      
    </div>
  )
}

export default User