import React from 'react'
import {getClass} from '../utils'
import {useContext} from 'react'
import {Context} from '../Context'
import Image from '../components/Image'

function Photos() {

  const {allPhotos} = useContext(Context)

  const photosRender = allPhotos.map((img, index) => (
    <Image key={img.id} img={img} className={getClass(index)}/>
  )) 

  return (
    <main className="photos">
        {photosRender}
    </main>
  )
}

export default Photos