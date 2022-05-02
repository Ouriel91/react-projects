import React, {useContext} from 'react'
import PropTypes from "prop-types"
import {Context} from '../Context'
import useHover from '../hooks/useHover'

function CartItem({item}) {

    const {removeImageFromCart} = useContext(Context)
    const [hovered, ref] = useHover()
    
    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"
    
    return (
        <div className="cart-item">
            <i
                ref={ref}
                onClick={() => removeImageFromCart(item.id)} className={iconClassName}></i>
            <img src={item.url} alt={item.id} width="130px"/>
            <p>$5.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem