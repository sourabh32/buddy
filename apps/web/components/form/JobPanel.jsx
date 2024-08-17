import React from 'react'
import Stepper from './Stepper'
import ButtonGroup from './ButtonGroup'

const JobPanel = ({heading}) => {
    const tablist =[{title:'overview',target:'/dashboard/job'},{title:'overview',target:'/dashboard/job/update'},{title:'questions',target:'/dashboard/job/questions'}]
  return (
    <div className="flex justify-around">
        <div className='flex flex-col gap-3'>
        <div>{heading}</div>
        <Stepper tablist={tablist} active={true} />
    </div>
    <ButtonGroup onSave={()=>{}} onSaveDraft={()=>{}} isSubmitting={false} />

    </div>
    
  )
}

export default JobPanel