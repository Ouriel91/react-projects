import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../Context'

function Header() {

  const {cartItems} = useContext(Context)
  const cartClassName = cartItems.length > 0 ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"

  return (
    <header>
        <h2><Link to='/' style={{ textDecoration: 'none' }}>Pic Some</Link></h2>
        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <i className={`${cartClassName} ri-fw ri-2x`}></i>
        </Link>
    </header>
  )
}

export default Header