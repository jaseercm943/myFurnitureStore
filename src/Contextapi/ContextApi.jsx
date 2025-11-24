import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const adminheaderContext = createContext(); //created context
export const authorisationContext = createContext();
export const adminAuthorisedContext = createContext();
export const editedProductResponse= createContext();
export const productAddedResponseContext=createContext()

export const wishlistCountResponseContext = createContext();
export const deletedCartItemsResponseContext = createContext();
export const addedToCartResponseContext = createContext();

export const showArrowCartContext = createContext();
export const showArrowWishListContext=createContext()

function ContextApi({ children }) {
    const [productAddedResponse,setproductAddedResponse]=useState({})
    const [showArrowWishList,setshowArrowWishList]=useState(false)
    const [showCartArrow, setshowCartArrow] = useState(false);
    const [adminHeader, setadminHeader] = useState("");
    const [isAuthorisation, setisAuthorisation] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [editedResponse, seteditedResponse] = useState({});
    const [wishlistCountResponse, setwishlistCountResponse] = useState([]);

    const [deletedCartItemsResponse, setdeletedCartItemsResponse] = useState({});
    const [addedToCartResponse, setaddedToCartResponse] = useState({});

    useEffect(() => {
        if (sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("user")).role == "admin") {
            setisAuthorisation(false);
            setisAdmin(true);
        } else if (sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("user")).role == "user") {
            setisAuthorisation(true);
            setisAdmin(false);
        }
    }, [isAuthorisation]);

    return (
        <div>
            <productAddedResponseContext.Provider value={{productAddedResponse,setproductAddedResponse}}>
            <showArrowWishListContext.Provider value={{showArrowWishList,setshowArrowWishList}}>
            <showArrowCartContext.Provider value={{ showCartArrow, setshowCartArrow }}>
                <addedToCartResponseContext.Provider value={{ addedToCartResponse, setaddedToCartResponse }}>
                    <deletedCartItemsResponseContext.Provider
                        value={{ deletedCartItemsResponse, setdeletedCartItemsResponse }}
                    >
                        <wishlistCountResponseContext.Provider
                            value={{ wishlistCountResponse, setwishlistCountResponse }}
                        >
                            <editedProductResponse.Provider value={{ editedResponse, seteditedResponse }}>
                                <adminAuthorisedContext.Provider value={{ isAdmin, setisAdmin }}>
                                    <adminheaderContext.Provider value={{ adminHeader, setadminHeader }}>
                                        <authorisationContext.Provider value={{ isAuthorisation, setisAuthorisation }}>
                                            {children}
                                        </authorisationContext.Provider>
                                    </adminheaderContext.Provider>
                                </adminAuthorisedContext.Provider>
                            </editedProductResponse.Provider>
                        </wishlistCountResponseContext.Provider>
                    </deletedCartItemsResponseContext.Provider>
                </addedToCartResponseContext.Provider>
            </showArrowCartContext.Provider>
            </showArrowWishListContext.Provider>
            </productAddedResponseContext.Provider>
        </div>
    );
}

export default ContextApi;
