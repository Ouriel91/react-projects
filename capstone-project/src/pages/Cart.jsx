import React, {useContext, useState} from 'react'
import {Context} from '../Context'
import CartItem from '../components/CartItem'

const COST_ITEM = 5.99

function Cart() {

  const {cartItems, emptyCart} = useContext(Context)
  const [btnText, setBtnText] = useState("Place Order")

  const totalCost = cartItems.length * COST_ITEM
  const renderTotalCost = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})

  const renderCartItems = cartItems.map(item => (
    <CartItem key={item.id} item={item} />
  ))

  const changeBtnText = () => {
    setBtnText("Ordering...")
    

    setTimeout(() => {
      console.log(`order ${cartItems.length} items, total cost ${renderTotalCost}`)
      setBtnText("Place Order")
      emptyCart()
    },3000)
  }

  return (
    <main className="cart-page">
        <h1>Check out</h1>
        {renderCartItems}
        <p className="total-cost">
          Total: {renderTotalCost}</p>
        {cartItems.length > 0 ?
          <div className="order-button">
            <button onClick={changeBtnText}>{btnText}</button>
          </div>
        : <p>Empty cart</p>
      }
    </main>
  )
}

export default Cart