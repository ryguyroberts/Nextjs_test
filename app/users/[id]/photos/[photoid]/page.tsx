import React from 'react'

interface Props {
  params: { 
    id: number ;
    photoid: number;
  }
}

const PhotoDetailPage = ({params: { id, photoid } } : Props) => {
  return (
    <div>PhotoDetailPage {id} {photoid} </div>
  )
}

export default PhotoDetailPage