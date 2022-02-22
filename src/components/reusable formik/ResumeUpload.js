import { ErrorMessage, Field } from "formik";
import React, { useState, useRef } from "react";
import TextError from "./TextError";

export const ResumeUpload = () => {
  const [isDisplayMessage, setIsDisplayMessage] = useState(false);
  const inputRef = useRef();

  return (
    <div>
      <label htmlFor="resume" className="mb-2">
        Resume
      </label>
      <div id="resume">
        <Field name="resumeFile">
          {(fieldProps) => {
            // console.log("fieldProps", fieldProps);
            //prettier-ignore
            const {form} = fieldProps;
            return (
              <input
                // name="resumeFile"
                ref={inputRef}
                style={{ display: "none" }}
                // hidden
                onChange={(e) => {
                  // console.log("files: ", e.target.files);
                  // const fileSize = e.target.files[0].size;
                  // fileSize > 10 ** 6
                  //   ? setIsDisplayMessage(1)
                  //   : (setFieldValue("resumeField", e.target.files[0]),
                  //     setIsDisplayMessage(2));
                  form.setTouched({ ...form.touched, resumeFile: true });
                  form.setFieldValue("resumeFile", e.target.files[0]);
                  e.target.files[0] && e.target.files[0]?.size <= 10 ** 6
                    ? setIsDisplayMessage(true)
                    : setIsDisplayMessage(false);

                  // if (fileSize > 10 ** 6) {
                  //   setIsDisplayMessage(1);
                  // } else {
                  //   setFieldValue("resumeFile", e.target.files[0]);
                  //   setIsDisplayMessage(2);
                  // }
                }}
                className="border p-3"
                type="file"
                accept=".pdf, application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
            );
          }}
        </Field>
        <button
          type="button"
          className="btn btn-light border border-dark"
          onClick={() => inputRef.current.click()}
        >
          Upload Resume
        </button>
        <ErrorMessage name="resumeFile" component={TextError} />

        {/* {isDisplayMessage === 1 && (
          <div className="text-danger">File size should be less than 1 MB</div>
        )} */}
        {isDisplayMessage && (
          <div className="text-success">Resume uploaded successfully</div>
        )}
      </div>
    </div>
  );
};
