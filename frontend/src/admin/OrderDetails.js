import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from './layout/Layout'
import Loader from '../components/Loader'

const OrderDetails = () => {
    const {id} = useParams()
    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState([])
    const getOrders = async () => {
        setLoadingOrders(true)
        try {
            const response = await axios.get(`/orders/${id}`)
            setOrders(response.data.items)
            setLoadingOrders(false)
        } catch (error) {
            console.log(error)
            setLoadingOrders(false)
        }
    }
    useEffect(() => {
        getOrders()
    }, [])




    return (
        <Layout orders="active" header="orders" content={
            <>
                <div class="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                </div>

                {
                    loadingOrders ?
                        <Loader />
                        :
                        <table className='table'>
                            <tr>
                                <th>productId</th>
                                <th>productName</th>
                                <th>selectedSize</th>
                                <th>price</th>
                                <th>quantity</th>
                            </tr>
                            {
                                orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.productId}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.selectedSize} ml</td>
                                        <td>{order.price}</td>
                                        <td>{order.quantity}</td>
                                    </tr>
                                ))
                            }
                        </table>
                }
            </>
        } />
    )
}

export default OrderDetails