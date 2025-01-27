import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Swal from 'sweetalert2'
import Loader from '../components/Loader'

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(false)

    const getReviews = async () => {
        setLoadingReviews(true)
        try {
            const response = await axios.get('/reviews')
            setReviews(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingReviews(false)
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    const deleteReview = async (id) => {
        try {
            await axios.delete(`/reviews/${id}`)
            getReviews()
        } catch (error) {
            console.log(error)
        }
    }

    const updateStatus = async (id,stat) => {
        try {
            await axios.put(`/reviews/${id}`, { status: stat })
            Swal.fire("Updated!", `"The review status has been updated to ${stat}.`, "success")
            getReviews()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteReviewConfirm = (id) => {
        Swal.fire({
            title: "Do you want to delete this review?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Don't delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success")
                deleteReview(id)
            }
        })
    }

    return (
        <Layout reviews="active" header="reviews" content={
            <>
                <div className="searchAdd">
                    <input type="text" placeholder="Search For Any Item" />
                </div>

                {
                    loadingReviews ?
                        <Loader />
                        :
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Comment</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reviews.map((review, index) => (
                                        <tr key={index}>
                                            <td>{review.product_id?.name}</td>
                                            <td>{review.comment}</td>
                                            <td>{review.status ? 'True' : 'False'}</td>
                                            <td className='actionTable'>
                                                <button onClick={() => deleteReviewConfirm(review._id)} className='delete'>Delete</button>
                                                <button onClick={() => updateStatus(review._id,!review.status)} className='update'>Mark as {!review.status ? 'True' : 'False'}</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </>
        } />
    )
}

export default Reviews
