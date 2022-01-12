import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo3.png'
import './Header.css'

const Header = () =>{
    return(
        <div className='Header'>
            <Link to='/' alt='logo'><img src={logo} className='img' alt='img'/></Link> 
        </div>
    )
}

export default Header