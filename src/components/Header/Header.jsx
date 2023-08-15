import React from 'react'
import  './Header.css';

function Header() {
  return (
    <div className='header-conteiner'>
        <div className='logo-content'>
            <p className='logo'>Weather</p>
            <div className='logo-img'>
                <img className='photo-logo'></img>
            </div>
        </div>
        <div className='language-content'>
            <p className='text-language'>EN</p>
        </div>
    </div>
  )
}

export default Header;