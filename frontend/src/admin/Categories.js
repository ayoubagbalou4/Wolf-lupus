import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const Categories = () => {

    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState([])
    const getCategories = async () => {
        setLoadingCategories(true)
        try {
            const response = await axios.get('/categories')
            setCategories(response.data)
            setLoadingCategories(false)
        } catch (error) {
            console.log(error)
            setLoadingCategories(false)
        }
    }
    useEffect(() => {
        getCategories()
    }, [])


    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`/categories/${id}`)
            getCategories()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategoryConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This Category?",
            showDenyButton: true,
            confirmButtonText: "delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteCategory(id)
            }
        });
    }



    return (
        <Layout categories="active" header="categories" content={
            <>
                <div class="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-category'}><button>Add Category</button></Link>
                </div>

                {
                    loadingCategories ?
                        <Loader />
                        :
                        <table className='table'>
                            <tr>
                                <th>name</th>
                                <th>description</th>
                                <th>actions</th>
                            </tr>
                            {
                                categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>

                                        <td className='actionTable'>
                                            <button onClick={() => deleteCategoryConfirm(category._id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-category/${category.id}`}><button className='update'>Update</button></Link>
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

export default Categories
