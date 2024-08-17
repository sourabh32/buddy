"use client"
import Link from 'next/link'
import React from 'react'

const NavLink = ({to,text}:{to:string,text:string}) => {
  return (
    <Link href={to}>
    <span className="btn btn-ghost text-lg">{text}</span>
    </Link>
  )
}

export default NavLink