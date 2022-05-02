import { createContext, useState, useEffect } from 'react';
const Context = createContext();

const url = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'

function ContextProvider({children}) {

    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetchAndSetPhotos()
    },[])

    const fetchAndSetPhotos = async () => {
        const response = await fetch(url)
        const photos = await response.json()

        setAllPhotos(photos)
    }

    const toggleFavorite = (id) => {   
        let newPhotos = [...allPhotos]
        newPhotos[id - 1].isFavorite = !newPhotos[id - 1].isFavorite
        setAllPhotos(newPhotos)
    }

    const addImageToCart = (image) => {
        setCartItems(prevItems => [...prevItems, image])
    }

    const removeImageFromCart = (id) => {   
        setCartItems(prevItems => prevItems.filter(oldImage => oldImage.id !== id))
    }

    const emptyCart = () => {
        setCartItems([])
    }

    return (
        <Context.Provider value={{allPhotos, toggleFavorite, addImageToCart, cartItems, emptyCart, removeImageFromCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

