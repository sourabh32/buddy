"use client"
import React from 'react'
import { signIn,signOut } from 'next-auth/react'
const AuthButton = ({type,text}) => {

    if(type === 'login'){
        return (
            <button className='btn btn-sm btn-primary ' onClick={()=>signIn('google')}>
            {text}
            </button>
          )
    }
  return (
    <button className='btn btn-sm btn-primary ' onClick={()=>signOut()}>
    {text}
    </button>
  )
}

export default AuthButton