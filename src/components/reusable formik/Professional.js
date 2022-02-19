import React, { useState, useRef } from "react";
import { FormikControl } from "./FormikControl";
import { ResumeUpload } from "./ResumeUpload";
import { FieldArray, Field } from "formik";

export const Professional = () => {
  return (
    <div>
      <label htmlFor="company" className="mb-3">
        Current Company
      </label>
      <div id="company" className="row">
        <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="currentCompanyName"
            placeholder="Company Name"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="currentDesignation"
            placeholder="Designation"
          />
        </div>
      </div>
      <label className="mb-3">Skills</label>
      <div>
        <FieldArray name="skills">
          {(props) => {
            // prettier-ignore
            const { push, remove, form:{values:{skills},errors,touched}} = props;
            // console.log(props);
            return (
              <>
                {skills.map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="px-3 row gap-3">
                      <Field
                        className="form-control col"
                        name={`skills[${index}].skill`}
                        placeholder="Skill"
                      />
                      <Field
                        type="number"
                        className="form-control col"
                        name={`skills[${index}].experience`}
                        placeholder="Experience"
                      />
                      <button
                        style={{ opacity: index ? "1" : "0" }}
                        disabled={!index && true}
                        className="btn btn-secondary col-auto"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        x
                      </button>
                    </div>
                    {errors.skills?.[index] &&
                      touched.skills?.[index]?.skill &&
                      touched.skills?.[index]?.experience && (
                        <div className="text-danger ">
                          Please fill in both fields!
                        </div>
                      )}
                  </div>
                ))}
                <button
                  className="btn btn-light border border-dark mb-3"
                  type="button"
                  onClick={() =>
                    push({
                      skill: "",
                      experience: "",
                    })
                  }
                >
                  Add Skill
                </button>
              </>
            );
          }}
        </FieldArray>
      </div>
      <div className="row g-3">
        <div className="col-auto pt-2">
          <label>Total Experience</label>
        </div>
        <div className="col-auto">
          <FormikControl
            control="input"
            type="number"
            name="totalExperience"
            placeholder="Total Experience"
          />
        </div>
      </div>
      <div className="w-50">
        <FormikControl
          control="input"
          type="text"
          name="additionalCourses"
          label="Additional Courses or Certification"
          placeholder="Courses / Certification"
        />
      </div>
      <div className="w-50">
        <FormikControl
          control="textarea"
          name="summary"
          label="Profile Summary"
          placeholder="Summary"
          type="text"
        />
      </div>
      <ResumeUpload />
    </div>
  );
};
