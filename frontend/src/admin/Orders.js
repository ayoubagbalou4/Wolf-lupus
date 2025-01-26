import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import Swal from 'sweetalert2';
import Loader from '../components/Loader';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({}); // Track selected status for each order

    const getOrders = async () => {
        setLoadingOrders(true);
        try {
            const response = await axios.get('/orders');
            setOrders(response.data);
            setLoadingOrders(false);
        } catch (error) {
            console.log(error);
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const deleteOrder = async (id) => {
        try {
            const response = await axios.delete(`/orders/${id}`);
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrderConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This Order?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteOrder(id);
            }
        });
    };

    const updateOrderStatus = async (id, newStatus) => {
        try {
            await axios.put(`/orders/${id}`, { status: newStatus });
            getOrders();
            Swal.fire('Status updated!', '', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error!', 'Failed to update status.', 'error');
        }
    };

    const handleStatusChange = (id, event) => {
        const newStatus = event.target.value;
        setSelectedStatus(prevState => ({
            ...prevState,
            [id]: newStatus
        }));
    };

    const handleUpdateStatus = (id) => {
        const newStatus = selectedStatus[id];
        if (newStatus) {
            updateOrderStatus(id, newStatus);
        }
    };

    return (
        <Layout orders="active" header="orders" content={
            <>
                <div className="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-order'}><button>Add Order</button></Link>
                </div>

                {
                    loadingOrders ? 
                        <Loader /> 
                        :
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>customerName</th>
                                    <th>customerPhone</th>
                                    <th>customerAddress</th>
                                    <th>totalAmount</th>
                                    <th>status</th>
                                    <th>items</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.customerName}</td>
                                            <td>{order.customerPhone}</td>
                                            <td>{order.customerAddress}</td>
                                            <td>{order.totalAmount} $</td>
                                            <td>
                                                <select 
                                                    value={selectedStatus[order._id] || order.status} 
                                                    onChange={(event) => handleStatusChange(order._id, event)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="shipped">Shipped</option>
                                                </select>
                                            </td>
                                            <td><Link to={`/admin/order-details/${order._id}`} >View</Link></td>
                                            <td className='actionTable'>
                                                <button onClick={() => handleUpdateStatus(order._id)} className='update'>Update Status</button>
                                                <button onClick={() => deleteOrderConfirm(order._id)} className='delete'>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </>
        } />
    );
};

export default Orders;
