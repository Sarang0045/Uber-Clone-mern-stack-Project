import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            localStorage.removeItem('token')
            navigate('/login')
        }).catch((error) => {
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [navigate, token])

    return (
        <div>
            Logging out...
        </div>
    )
}

export default UserLogout