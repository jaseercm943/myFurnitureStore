import commonAPI  from "./commonApi";
import SERVER_URL from "./serverurl";

// getting home product 
export const getAllProductsAPI=async()=>{
    return await commonAPI('GET',`${SERVER_URL}/all-products`,'','')
}

// Product getting based on searchkey 
export const getProductsBasedOnSearchAPI=async(serachKey)=>{
    return await commonAPI('GET',`${SERVER_URL}/all/products?search=${serachKey}`,'','')
}

//register
export const registerAPI=async(userData)=>{
    return await commonAPI('POST',`${SERVER_URL}/register`,userData,{})
}

//login
export const loginAPI=async(userData)=>{
    return await commonAPI('POST',`${SERVER_URL}/login`,userData,'')
}

//for authorised product getting by search
// export const getadminProductsAPI=async(searchkey)=>{
//     return await commonAPI('GET',`${SERVER_URL}/get-products?search=${searchkey}`,'','')
// }

//admin product adding
export const addProductAPI=async(reqbody,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/add-product`,reqbody,reqheader)
}

//admin product deleting
export const deleteProductAPI=async(productId,reqheader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/delete/product/${productId}`,{},reqheader)
}

//admin product updating
export const updateProductAPI=async(productId,reqbody,reqheader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/product/edit/${productId}`,reqbody,reqheader)
}

//adding to wishlist
export const addToWishListAPI=async(productId,reqbody,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/product/add/wishlist/${productId}`,reqbody,reqheader)
}

//getting wishlist of authorized user
export const getWishListAPI=async(reqheader)=>{
    return await commonAPI('GET',`${SERVER_URL}/get/wishlist`,'',reqheader)
}

//deleting of each wishlist 
export const deleteEachWishListAPI=async(productId,reqheader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/delete/wishlist/${productId}`,{},reqheader)
}

export const addToCartAPI=async(productId,reqbody,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/add/cart/${productId}`,reqbody,reqheader)
}

export const getCartAPI=async(reqheader)=>{
    return await commonAPI('GET',`${SERVER_URL}/get/cartitems`,'',reqheader)
}

export const deleteCartItemAPI=async(productId,reqheader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/delete/cart/item/${productId}`,{},reqheader)
}

export const incrementCartQuantityAPI=async(productId,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/increment/cart/quantity/${productId}`,{},reqheader)
}

export const decrementCartQuantityAPI=async(productId,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/decrement/cart/quantity/${productId}`,{},reqheader)
}

export const createOrderAPI= async(reqbody,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/createorder`,reqbody,reqheader)
}

export const getKeyAPI= async(reqheader)=>{
    return await commonAPI('GET',`${SERVER_URL}/getkey`,'',reqheader)
}

export const verifyOrderAPI= async(reqbody,reqheader)=>{
    return await commonAPI('POST',`${SERVER_URL}/verifypayment`,reqbody,reqheader)
}

export const emptyCartAPI=async(reqheader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/empty/cart`,{},reqheader)
}

export const updateProfileAPI=async(reqbody,reqheader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/edit/profile`,reqbody,reqheader)
}

export const getUserProfileAPI=async(reqheader)=>{
    return await commonAPI('GET',`${SERVER_URL}/get/user/profile`,'',reqheader)
}

export const getAllUsersAPI=async()=>{
    return await commonAPI('GET',`${SERVER_URL}/get-allusers`,'','')
}

export const ResetPswdAPI= async(reqbody)=>{
    return await commonAPI('POST',`${SERVER_URL}/user/reset/pswd`,reqbody,'')
}