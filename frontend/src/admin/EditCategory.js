
import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditCategory = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [loadingGetSingleCategory,setLoadingGetSingleCategory] = useState(false)
  const [categoriesData,setCategoriesData] = useState({})
  const handleCategory = (e) => {
      setCategoriesData({...categoriesData,[e.target.name] : e.target.value})
  }

  const getSingleCategory = async () => {
      setLoadingGetSingleCategory(true)
      try {
          const response = await axios.get(`/categories/${id}`)
          setCategoriesData(response.data)
          setLoadingGetSingleCategory(false)
      } catch (error) {
          console.log(error)
          setLoadingGetSingleCategory(false)
      }
  }
  useEffect(()=>{
      getSingleCategory()
  },[])

  const [loadingEditCategory,setLoadingEditCategory] = useState(false)
  const editCategory = async (e) => {
      e.preventDefault()
      setLoadingEditCategory(true)
      try {
          const response = await axios.put(`/categories/${id}`,categoriesData)
          setLoadingEditCategory(false)
          navigate('/admin/categories')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Edit category With Success",
            showConfirmButton: false,
            timer: 1500
        });
      } catch (error) {
          console.log(error)
          setLoadingEditCategory(false)
      }
  }

    return (
        <Layout categories="active" header="categories" content={
            <>
            <div class="formAdmin">
                <h2>Edit Category</h2>
                {loadingGetSingleCategory ? <div className="loader1"></div> :
                <form onSubmit={editCategory}>
                            <div>
                                <p>name</p>
                                <input value={categoriesData.name} onChange={handleCategory} name='name' type="text" placeholder="Name"required/>
                                </div>
                                <div>
                                <p>description</p>
                                <input value={categoriesData.description} onChange={handleCategory} name='description' type="text" placeholder="Description"required/>
                                </div>
                                
                            {
                              !loadingEditCategory && 
                                <button>Edit Category</button>
                            }
                            </form>
                        }
                        {loadingEditCategory && <center><div class="loader2"></div></center>}
                </div>
            </>
        } />
    )
}

export default EditCategory

  