import { createContext, useState, useEffect } from 'react';
const Context = createContext();

const url = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'

function ContextProvider({children}) {

    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        fetchAndSetPhotos()
    },[])

    const fetchAndSetPhotos = async () => {
        const response = await fetch(url)
        const photos = await response.json()

        setAllPhotos(photos)
    }

    const toggleFavorite = (id) => {

        
        /* const newPhotos = allPhotos.map(photo => {
            if (photo.id === id) {
                console.log("clicked")
                console.log(!photo.isFavorite)
                return {
                    ...photo,
                    isFavorite: !photo.isFavorite
                }
            }

            return photo
        })

        setAllPhotos(newPhotos) */

        let newPhotos = [...allPhotos]
        newPhotos[id - 1].isFavorite = !newPhotos[id - 1].isFavorite
        setAllPhotos(newPhotos)
    }

    return (
        <Context.Provider value={{allPhotos, toggleFavorite}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}

