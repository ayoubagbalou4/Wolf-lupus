
import React, { useState } from 'react'
import Layout from './layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddCategory = () => {

    const [imageIfExist, setImageIfExist] = useState();
    const navigate = useNavigate()
    const [loadingAddCategory, setLoadingAddCategory] = useState(false)
    const [categoriesData, setCategoriesData] = useState({})
    const handleCategory = (e) => {
        setCategoriesData({ ...categoriesData, [e.target.name]: e.target.value })
    }

    const addCategory = async (e) => {
        e.preventDefault()
        setLoadingAddCategory(true)
        try {
            let uploadedImageUrl = '';
            if (imageIfExist) {
                const formData = new FormData();
                formData.append('image', imageIfExist);

                const imgUploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=dd221145c4c2e3c325de99c28cdbcf0c`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: false,
                    }
                );

                if (imgUploadRes.data) {
                    uploadedImageUrl = imgUploadRes.data.data.url;
                }
            }

            const updatedCategoriesData = {
                ...categoriesData,
                image_url: uploadedImageUrl,
            };
            const response = await axios.post('/categories', updatedCategoriesData)
            setLoadingAddCategory(false)
            navigate('/admin/categories')
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add category With Success",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error)
            setLoadingAddCategory(false)
        }
    }

    return (
        <Layout categories="active" header="categories" content={
            <>
                <div class="formAdmin">
                    <h2>Add Category</h2>
                    <form onSubmit={addCategory}>
                        <div>
                            <p>name</p>
                            <input onChange={handleCategory} name='name' type="text" placeholder="Name" required />
                        </div>
                        <div>
                            <p>description</p>
                            <input onChange={handleCategory} name='description' type="text" placeholder="Description" required />
                        </div>
                        <div>
                            <p>Image</p>
                            <input
                                onChange={(e) => setImageIfExist(e.target.files[0])}
                                type="file"
                                name="image_url"
                                required
                            />
                        </div>

                        {
                            !loadingAddCategory &&
                            <button>Add Category</button>
                        }
                    </form>
                    {loadingAddCategory && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default AddCategory

