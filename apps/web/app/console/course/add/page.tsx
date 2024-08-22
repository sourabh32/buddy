"use client"

import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import CourseForm from "../../../../components/form/CourseForm"
import { createCourse } from '../../../../actions/course.action';
import { useRouter } from 'next/navigation';


const Page = () => {

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      courseImage: "",
      courseTitle: "",
      courseDescription: "",
      courseUrl: "",
      rentalDuration: "1 month",
      rentalPrice: "",
      category:"all",
      isLive: false,
      language: "",
      courseType: "",
    },
    validationSchema: Yup.object({
      courseImage: Yup.string().url("Invalid URL").required("Required"),
      courseTitle: Yup.string().required("Required"),
      courseDescription: Yup.string().min(20, "Minimum 20 characters").required("Required"),
      courseUrl: Yup.string().url("Invalid URL").required("Required"),
      rentalDuration: Yup.string().required("Required"),
      rentalPrice: Yup.number().positive("Must be a positive number").required("Required"),
      category: Yup.string().required("Required"),
      isLive: Yup.boolean().required("Required"),
      language: Yup.string().required("Required"),
      courseType: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
       const courseId = await createCourse({formData:{...values,rentalPrice:parseFloat(values.rentalPrice)}})
      router.push(`/courses/${courseId}`)
      console.log(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  

  return (
    <div className="p-2  ">
      <h1 className="sm:text-4xl text-center underline text-3xl font-bold mb-2 text-primary">post course</h1>
<CourseForm formik={formik} actionType={"create"} />
</div>
  );
}

export default Page;
