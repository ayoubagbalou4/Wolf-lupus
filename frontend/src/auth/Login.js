import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Login = () => {

    const navigate = useNavigate()
    const [signinData, setSigninData] = useState({})
    const [erroSigninData, setErroSigninData] = useState('')
    const handleSigninData = (e) => {
        setErroSigninData('')
        setSigninData({ ...signinData, [e.target.name]: e.target.value })
    }

    const [loadingSignin, setLoadingSignin] = useState(false)
    const handleSignin = async (e) => {
        e.preventDefault()
        if(signinData.username == 'admin' && signinData.password == '123'){
            localStorage.setItem('userPerfum',JSON.stringify('admin'))
            navigate('/admin/dashboard')
        }else{
            setErroSigninData('Incorrect Info')
        }
    }
    return (
        <>
            <div className="loginContainer">
                <div className="loginSide">
                    <h2>Login </h2>
                    <form onSubmit={handleSignin}>
                        {erroSigninData && <div className='error'>{erroSigninData}</div>}
                        <input onChange={handleSigninData} type="text" name="username" placeholder="Username" />
                        <input onChange={handleSigninData} type="password" name="password" placeholder="Password" />
                        <button type="submit">Login </button>
                    </form>
                </div>
            </div>
        </>
    );
};
