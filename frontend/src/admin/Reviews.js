import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const Reviews = () => {

    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState([])
    const getReviews = async () => {
        setLoadingReviews(true)
        try {
            const response = await axios.get('/reviews')
            setReviews(response.data)
            setLoadingReviews(false)
        } catch (error) {
            console.log(error)
            setLoadingReviews(false)
        }
    }
    useEffect(() => {
        getReviews()
    }, [])


    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(`/reviews/${id}`)
            getReviews()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteReviewConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete This Review?",
            showDenyButton: true,
            confirmButtonText: "delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success");
                deleteReview(id)
            }
        });
    }



    return (
        <Layout reviews="active" header="reviews" content={
            <>
                <div class="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                    <Link to={'/admin/add-review'}><button>Add Review</button></Link>
                </div>

                {
                    loadingReviews ?
                        <Loader />
                        :
                        <table className='table'>
                            <tr>
                                <th>product</th>
                                <th>comment</th>
                                <th>status</th>
                                <th>actions</th>
                            </tr>
                            {
                                reviews.map((review, index) => (
                                    <tr key={index}>
                                        <td>{review.product_id.name}</td>
                                        <td>{review.comment}</td>
                                        <td>{review.status ? 'true' : 'false' }</td>
                                        <td className='actionTable'>
                                            <button onClick={() => deleteReviewConfirm(review._id)} className='delete'>Delete</button>
                                            <Link to={`/admin/edit-review/${review._id}`}><button className='update'>Update</button></Link>
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

export default Reviews
