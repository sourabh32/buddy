import React, { useState } from 'react';
import { UploadDropzone } from '../../lib/uploadthing'; 
import { FormikProps } from 'formik';
interface InputProps {
  label: string;
  icon?: React.ReactNode; // Assuming the icon is a React component or element
  formError?: string;
  value: string;
  name: string;
  formik: FormikProps<any>;
}
const ImageUpload = ({ label,icon,formError,value,name ,formik}:InputProps) => {
  const [error, setError] = useState<string|null>(formError ||null);
  const [imageUrl, setImageUrl] = useState(value);

  return (
    <div className="mb-4 w-full" data-theme={"dim"}>
          <label className={` text-md font-medium bg-primary px-3 py-1 rounded-full text-neutral max-w-fit flex gap-2  mb-5  items-center `} >
                {label}
                {icon} {/* Example icon */}
            </label>


      {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
      {imageUrl ? (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-full  rounded-lg max-h-52 bg-cover shadow-md" />
        </div>
      ):(      <UploadDropzone
      
        className={`  ${error ? "border border-error" : ""}`}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const uploadedImageUrl = res?.[0]?.url || '';
          formik.setFieldValue(name, uploadedImageUrl);
          setImageUrl(uploadedImageUrl)
          setError(null);
          console.log("Files: ", res);
          alert("Uplaoad Completed");
        }}
        onUploadError={(error) => {
          // Handle the error
          alert(`ERROR! ${error.message}`);
          setError(error.message);
        }}
      />)}
    </div>
  );
};

export default ImageUpload;
