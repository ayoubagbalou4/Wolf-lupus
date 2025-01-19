import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Register = () => {

    const navigate = useNavigate()
    const [loadingSignup, setLoadingSignup] = useState(false)
    const [errorSignup, setErrorSignup] = useState('')
    const [error, setError] = useState('')
    const [signupData, setSignupData] = useState({})

    const handleSignupData = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        if (signupData.password != signupData.confirme_password) {
            setErrorSignup('Password Does Not Match!')
        } else {
            setLoadingSignup(true)
            try {
                const response = await axios.post('/signup', signupData)
                if(response.data.error){
                    setError(response.data.error)
                    return
                }
                console.log(response.data)
                setLoadingSignup(false)
                navigate('/')
            } catch (error) {
                console.log(error)
                setLoadingSignup(false)
            }
        }
    }

    return (
        <>
            <div class="container_form" id="container">
                <div class="form-container">
                    <h1>Create Account</h1>
                    <form onSubmit={handleSignup}>
                        {error && <div className='input_error'>{error}</div>}
                        <input onChange={handleSignupData} type="text" name="username" placeholder="Username" required />
                        <input onChange={handleSignupData} type="email" name="email" placeholder="Email" required />
                        <input onChange={handleSignupData} type="password" name="password" placeholder="Password" required />
                        {errorSignup && <div className='input_error'>{errorSignup}</div>}
                        <input onChange={handleSignupData} type="password" name="confirme_password" placeholder="Confirm Password" required />
                        <button type="submit">Sign Up</button>
                        <p>Do You Have an Acount ? <Link to="/">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}
