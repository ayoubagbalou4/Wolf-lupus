import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const Products = () => {

    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState([])
    const getProducts = async () => {
        setLoadingProducts(true)
        try {
            const response = await axios.get('/products')
            setProducts(response.data)
            setLoadingProducts(false)
        } catch (error) {
            console.log(error)
            setLoadingProducts(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])


    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`/products/${id}`)
            getProducts()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProductConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This Product?",
            showDenyButton: true,
            confirmButtonText: "delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteProduct(id)
            }
        });
    }



    return (
        <Layout products="active" header="products" content={
            <>
                <div class="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-product'}><button>Add Product</button></Link>
                </div>

                {
                    loadingProducts ?
                        <Loader />
                        :
                        <table className='table'>
                            <tr>
                                <th>name</th>
                                <th>description</th>
                                <th>price</th>
                                <th>stock quantity</th>
                                <th>category</th>
                                <th>actions</th>
                            </tr>
                            {
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            {product.sizes?.map((sizeObj, i) => (
                                                <p key={i}>
                                                    {sizeObj.size}ml → ${sizeObj.price.toFixed(2)}
                                                </p>
                                            ))}
                                        </td>
                                        <td>{product.stock_quantity}</td>
                                        <td>{product.category_id?.name}</td>

                                        <td className='actionTable'>
                                            <button onClick={() => deleteProductConfirm(product._id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-product/${product._id}`}><button className='update'>Update</button></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                }
            </>
        } />
    )
}

export default Products
