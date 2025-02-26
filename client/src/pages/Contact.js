import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend  ,BiPhoneCall ,BiSupport } from "react-icons/bi";

const contact = () => {
  return (
    <Layout title="Contact-us">
      <div className='row contactus'>
        <div className='col-md-6'>
          <img src="/images/contact.jpeg" alt='' style={{width:"100%"}}
          />
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about product feel free to call anytime. We are 24x7 available.
          </p>
          <p className='mt-3'>
            <BiMailSend/> : www.help@ecommerceapp.com
          </p>
          <p className='mt-3'>
       <BiPhoneCall/> : 102-123456
          </p>
          <p className='mt-3'>
        <BiSupport/> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default contact