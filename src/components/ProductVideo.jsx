import React from 'react'
import videoSource from '../assets/video/1stpart.mp4'

const ProductVideo = () => {
  return (
    <video width="940" height="360" controls>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  )
}

export default ProductVideo
