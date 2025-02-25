import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductsDetails = () => {
    const params = useParams()
    const [product ,setProducts]  = useState({})
    const [relatedProducts , setRelatedProducts] = useState([])

    // initial details
    useEffect(()=>{
      if(params?.slug)  getProduct()
    },[params?.slug])


    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProducts(data?.product)
            getSimilarProducts(data?.product._id , data?.product.category?._id)
        }
        catch (error) {
            console.log(error)
        }
    }

    //get similar products--
    const getSimilarProducts = async(pid,cid)=>{
        try{
     const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
     setRelatedProducts(data?.products)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <Layout> 
            {/* <h1>Product Details</h1> */}
            {/* {JSON.stringify(product , null ,4)} */}
            <div className='row container mt-2'>
                <div className='col-md-6'>
                    <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className='card-img-top' height={400} width={350}/>
                </div>
                <div className='col-md-6 '>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product.category?.name}</h6>
                    {/* <h6>Name : {product.name}</h6> */}
                    <button href='#' className='btn btn-secondary ms-1'>Add To Cart</button>

                </div>
            </div>
            <hr/>
            <div className='row container mt-2'>
                <h6>Similar Products</h6>
                {relatedProducts.length <1 && <p className='text-center'>No Similar Products Found</p>}
                <div className="d-flex flex-wrap">
                            {relatedProducts?.map((p) => (
                             
                                <div className="card m-2" style={{ width: "18rem" }}>
                                  <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                  />
                                  <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                        <button href='#' className='btn btn-secondary ms-1'>Add To Cart</button>

                                  </div>
                                </div>
                              
                            ))}
                          </div>
            </div>
        </Layout>
    )
}

export default ProductsDetails