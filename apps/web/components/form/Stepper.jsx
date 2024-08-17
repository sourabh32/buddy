import Link from 'next/link'
import React from 'react'

const Stepper = ({tablist,active}) => {
  return (
    <div role="tablist" className="flex gap-5">
        {
            tablist.map(item =>(<Link  href={item.target}  >
                <span   role="tab" className="tab">{item.title}</span>
                </Link>))
        }
</div>
  )
}

export default Stepper