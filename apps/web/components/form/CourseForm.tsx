import React from 'react'
import Input from './Input'
import { Atom, BookA, ImageDown, IndianRupee, Languages, Link2, Radio, Save, Shapes, SortDesc, Timer, TypeIcon, UploadCloud } from 'lucide-react'
import ImageUpload from './ImageUplaod'
import Textarea from './Textarea'
import Select from './Select'
import CheckBox from './CheckBox'

const CourseForm = ({formik,actionType}) => {
  return (
    <div className='flex flex-col gap-5  mx-auto py-10   rounded-lg shadow-md'>
    <form className="p-5 flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-5">
      <Input
      icon={<BookA />}
        label="course titile"
        name="courseTitle"
        placeholder="Enter course title"
        error={formik.errors.courseTitle}
        value={formik.values.courseTitle}
        onChange={formik.handleChange}
      />
       <Input
      icon={<Link2 />}
        label="Course URL"
        name="courseUrl"
        placeholder="https://example.com/course"
        error={formik.errors.courseUrl}
        value={formik.values.courseUrl}
        onChange={formik.handleChange}
      />
      
     

      </div>
      <div className="flex flex-col sm:flex-row gap-5">
      <div className="w-full">

     <ImageUpload name={"courseImage"} formik={formik} value={formik.values.courseImage}
         formError={formik.errors.courseImage} icon={<ImageDown />} label={'course image'} />
    </div>
           <div className="w-full">
           <Textarea
           icon={<SortDesc />}
      description={"rndom"}
        label="course description"
        name="courseDescription"
        placeholder="Enter course description"
        error={formik.errors.courseDescription}
        value={formik.values.courseDescription}
        onChange={formik.handleChange}
      />

           </div>
     

      </div>
      <div className="flex flex-col sm:flex-row  gap-5">
      <Select
      icon={<Timer />}
       description={"random"}
        label="Rental Duration"
        name="rentalDuration"
        options={[
          { label: '1 month', value: '1 month' },
          { label: 'Lifetime', value: 'lifetime' },
        ]}
        error={formik.errors.rentalDuration}
        value={formik.values.rentalDuration}
        onChange={formik.handleChange}
      />
      <Input
      icon={<IndianRupee />}
        type="number"
        label="Rental Price"
        name="rentalPrice"
        placeholder="Enter rental price"
        error={formik.errors.rentalPrice}
        value={formik.values.rentalPrice}
        onChange={formik.handleChange}
      />
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
      <Select
      icon={<TypeIcon />}
       description={"random"}
        label="course categroy"
        name="category"
        options={[
          { label: 'all', value: 'all' },
          { label: 'web devlopment', value: 'web devlopment' },
          { label: 'project', value: 'project' },
          { label: 'programming language', value: 'programming language' },
          { label: 'interview prepration', value: 'interview prepration' },
          
          { label: 'dsa', value: 'dsa' },
          { label: 'blockchain development', value: 'blockchain development' },
          { label: 'machine learning', value: 'machine learning' },
          { label: 'mobile development', value: 'mobile development' },
          { label: 'data science', value: 'data science' },
          
        ]}
        error={formik.errors.category}
        value={formik.values.category}
        onChange={formik.handleChange}
      />
      <div className='w-full flex-col sm:flex-row align-bottom'>
      <CheckBox
  name="isLive"
  type="checkbox"

  label="is course live?"
  icon={<Radio />} // Replace with an actual icon component
  error={formik.errors.isLive}
  checked={formik.values.isLive}
  onChange={formik.handleChange}
/>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-5">
      <Select
      icon={<Atom />}
       description={"random"}
        label="course type"
        name="courseType"
        options={[
          { label: 'self-paced', value: 'self-paced' },
          { label: 'instructor-led', value: 'instructor-led' },
          { label: 'bootcamp', value: 'bootcamp' },
         
          
        ]}
        error={formik.errors.courseType}
        value={formik.values.courseType}
        onChange={formik.handleChange}
      />
     
     <Select
      icon={<Languages />}
       
        label="course language"
        name="language"
        options={[
          { label: 'hindi', value: 'hindi' },
          { label: 'english', value: 'english' },
          { label: 'hinglish', value: 'hinglish' },
          
      
          
        ]}
        error={formik.errors.language}
        value={formik.values.language}
        onChange={formik.handleChange}
      />
</div>


        <div className="flex justify-end">
            <button
                type="submit"
                className="btn flex btn-sm btn-primary btn-solid"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? (
                    <span>Loading...</span>
                ) : (
                    <span>{actionType === 'create' ? 'Create' : 'Update'}</span>
                )}
            </button>
          {/*    <span className='flex items-center gap-2'>Save <Save/></span>) : (*/}
            {/*    <span className='flex items-center gap-2'>update <UploadCloud/></span>)}</button>*/}
        </div>

    </form>
    </div>
  )
}

export default CourseForm
