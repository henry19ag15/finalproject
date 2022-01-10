import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './Header.css'

const Header = () =>{
    return(
        <div className='Header'>
            <Link to='/'><img src={logo} className='img' alt='logo'/></Link> 
            <h1 className='logo'>ShareIT</h1>
        </div>
    )
}

export default Header