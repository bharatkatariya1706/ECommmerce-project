import React ,{useState , useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [auth , setAuth] = useAuth()
 
  const getOrders = async()=>{
    try{
        const {data} = await axios.get('/api/v1/auth/orders')
        console.log(data);
        setOrders(data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
      if(auth?.token) getOrders()
  },[auth?.token])

  return (
    <Layout title={'Your Orders'}>
        <div className='container-fluid p-3 m-3'>

    <div className='row'>
       <div className='col-md-3'>
        <UserMenu/></div> 
       <div className='col-md-9'>
        <h1 className='text-center'>All Orders</h1>
            {
              orders?.map((o, i) => {
                return (
                <div  className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i+1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className='container'>
                      {o?.products?.map((p,i) => (
                        <div className="row card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100%"
                              height={"130px"}
                            />
                          </div>
                          <div className="col-md-4">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                          
                        </div>
                      ))}
                  </div>
                </div>
              );
})
            }

        
        </div> 
    </div>


        </div>


    </Layout>
  )
}

export default Orders