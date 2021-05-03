import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios'

const AccountScreen = (props) => {
    useEffect(() => {
        
        (async () => {
            console.log('Access protected route')
            const responseData = await axios.get(`http://localhost:1337/api/users/me`, { withCredentials: true })
            .then(response => {
                console.log(response)
                
            }).catch(error => {
                console.log(error)
            })
        })()
    },[])

    return <div className="AccountScreen">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="mt-4 mb-4">Bienvenue .</h1>
                </div>
            </div>
        </div>
    </div>
}

export default AccountScreen;
