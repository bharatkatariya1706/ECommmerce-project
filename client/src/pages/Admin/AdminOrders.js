import React ,{ useState , useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import {Select} from 'antd'
// const {Options} = Select()

export const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [changeStatus , setChangeStatus] = useState('')
    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders')
            console.log(data);
            setOrders(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

const handleChange = async(orderId ,value)=>{
    try{
            const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}` ,{status:value})
            getOrders();
    }
    catch(error){
        console.log(error)
    }
}

  return (
    <Layout title={'All orders data'}>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
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
                                    <td>
                                                    <Select bordered={false} onChange={(value) => handleChange(o._id , value)} defaultValue={o?.status}>
                                                        {status.map((s, i) => (
                                                            <Select.Option key={i} value={s}>{s}</Select.Option>
                                                        ))}
                                                    </Select>
                                    </td>
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
    </Layout>
  )
}
