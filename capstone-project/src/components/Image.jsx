import {useContext} from 'react'
import {Context} from '../Context'
import PropTypes from 'prop-types';
import useHover from '../hooks/useHover'

function Image({img, className}) { 

    const [hovered, ref] = useHover()
    const {toggleFavorite, addImageToCart, cartItems, removeImageFromCart} = useContext(Context)

    const heartIcon = () => {
        if(img.isFavorite){
            return <i onClick={() => toggleFavorite(img.id)}  className="ri-heart-fill favorite"></i> 
        }

        if(hovered){
            return <i onClick={() => toggleFavorite(img.id)} className="ri-heart-line favorite"></i>
        }
    }

    const cartIcon = () => {

        const alreadyInCart = cartItems.some(item => item.id === img.id)

        if(alreadyInCart){
            return <i onClick={() => removeImageFromCart(img.id)} className="ri-shopping-cart-fill cart"></i>
        }
        if(hovered){
            return <i onClick={() => addImageToCart(img)} className="ri-add-circle-line cart"></i>
        }
    }
    
    return (
        <div 
            className={`${className} image-container`}
            ref={ref} >
            <img 
                className="image-grid" 
                src={img.url} 
                alt={img.id}/>
            {heartIcon()}
            {cartIcon()}   
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,

    img: PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default Image
