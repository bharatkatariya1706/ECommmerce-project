import React , {useState , useEffect} from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router-dom'

const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category , setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
if(params?.slug) getProductByCategory()
    },[params?.slug])

    const getProductByCategory=async()=>{
      try{
          
            const {data} = await axios.get(`/api/v1/product/product-category/${params?.slug}`)
            // console.log(data.products)
            setProducts(data?.products)
            setCategory(data?.category)
      }
      catch(error){
        console.log(error)
      }
    }

  return (
    <Layout >  
          <div className='container mt-3'>
          {/* <h1>helllooooo</h1> */}
        <h1 className='text-center'>Category -{category?.name}</h1>
        <h1 className='text-center'>{products?.length} results found</h1>
        <div className='row'>
          <div className='col-md-9 offset-1'>
            {/* {JSON.stringify(radio, null, 4)} */}
            {/* <h1 className='text-center'>All Products</h1> */}
            <div className='d-flex flex-wrap'>

              {products?.map((p) => (

                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0, 35)}</p>
                    <p className="card-text">{p.price}</p>
                    <button href='#' className='btn btn-primary ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                    <button href='#' className='btn btn-secondary ms-1'>Add To Cart</button>

                  </div>
                </div>

              ))}
            </div>
            {/* <div className='m-2 p-3'>
              {products && products.length < total && (
                <button className='btn btn-warning'
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(page + 1)
                  }}>
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </div> */}
          </div>
        </div>
        {/* <h1>yooooo</h1> */}
    </div>
    </Layout>

  )
}

export default CategoryProduct