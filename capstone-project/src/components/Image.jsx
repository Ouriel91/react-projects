import {useState, useContext} from 'react'
import {Context} from '../Context'
import PropTypes from 'prop-types';

function Image({img, className}) { 

    const [hovered, setHovered] = useState(false)
    const {toggleFavorite} = useContext(Context)

    const heartIcon = () => {
        if(img.isFavorite){
            return <i onClick={() => toggleFavorite(img.id)} className="ri-heart-fill favorite"></i> 
        }
        else if(hovered){
            return <i onClick={() => toggleFavorite(img.id)} className="ri-heart-line favorite"></i>
        }
    }

    const cartIcon = hovered && <i className="ri-add-circle-line cart"></i>

    return (
        <div 
            className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} >
            <img 
                className="image-grid" 
                src={img.url} 
                alt={img.id}/>
            {heartIcon()}
            {cartIcon}   
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
