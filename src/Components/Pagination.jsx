import React from 'react'

function Pagination({allProducts,productsPerPage,setCurrentPage,currentPage}) {
    let TotalPages=allProducts.length/productsPerPage
    let pages=[]
    for(let i=1;i<=Math.ceil(TotalPages);i++){
       pages.push(i)
    }
  return (
    <div>
         <div className='d-flex '>
        { pages.map(page=>
        <button className='btn border ' style={{}} onClick={()=>setCurrentPage(page)} >{page}</button>
        )
        }
        </div>
    </div>
  )
}

export default Pagination