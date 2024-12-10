'use client';
import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'


const UploadPage = () => {

  // States
  const [publicId, setPublicId] = useState('');

  return (
    <CldUploadWidget
      uploadPreset='uploadtest'>
      {({ open }) => <button 
      className='btn btn-primary'
      onClick={() => open()}>Upload</button>}
    </CldUploadWidget>
  )
}

export default UploadPage