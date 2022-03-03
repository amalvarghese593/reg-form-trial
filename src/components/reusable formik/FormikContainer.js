import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import { Form1 } from "./Form";
// import { locations } from "./locations";
import { Personal } from "./Personal";
import { Education } from "./Education";
import { Professional } from "./Professional";
import axios from "axios";

function FormikContainer() {
  const [pageNumber, setPageNumber] = useState(0);
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: null,
    gender: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
    primaryEmailId: "",
    secondaryEmailId: "",
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    currentLocation: "",
    preferredLocation: "",
    currentAddress: "",
    permanentAddress: "",
    masters: "",
    mastersSpecialisation: "",
    mastersYOP: "",
    mastersPercentage: "",
    mastersUniName: "",
    mastersCollegeName: "",
    graduation: "",
    gradSpecialisation: "",
    gradYOP: "",
    gradPercentage: "",
    gradUniName: "",
    gradCollegeName: "",
    puc: "",
    pucSpecialisation: "",
    pucYOP: "",
    pucPercentage: "",
    pucUniName: "",
    pucSchoolName: "",
    tenth: "",
    tenthYOP: "",
    tenthPercentage: "",
    tenthUniName: "",
    tenthSchoolName: "",
    isFresher: "",
    currentCompanyName: "",
    currentDesignation: "",
    skills: [
      {
        skill: "",
        experience: "",
      },
    ],
    totalExperience: "",
    additionalCourses: "",
    summary: "",
    resumeFile: null,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Required"),
    dob: Yup.date().required("Required").nullable(),
    gender: Yup.string().required("Required"),
    primaryContactNumber: Yup.number()
      .max(9999999999, "Maximum 10 digits allowed")
      .min(1000000000, "10 digits required")
      .typeError("Must be a Number")
      .required("Required"),
    secondaryContactNumber: Yup.number()
      .max(9999999999, "Max 10 digits allowed")
      .min(1000000000, "10 digits required")
      .typeError("Must be a Number")
      .test(
        "secondaryContactNumber",
        "Use another number",
        (val) =>
          !(
            Yup.ref("primaryContactNumber") &&
            val === Yup.ref("primaryContactNumber")
          )
      ),
    // .notOneOf([Yup.ref("primaryContactNumber")], "Use another number"),
    primaryEmailId: Yup.string().email("Invalid Email").required("Required"),
    secondaryEmailId: Yup.string()
      .email("Invalid Email")
      .test(
        "secondaryEmailId",
        "Use another Email",
        (val) =>
          !(Yup.ref("primaryEmailId") && val === Yup.ref("primaryEmailId"))
      ),
    // .notOneOf([Yup.ref("primaryEmailId")], "Use another Email"),
    fatherFirstName: Yup.string().required("Required"),
    fatherMiddleName: Yup.string(),
    fatherLastName: Yup.string().required("Required"),
    motherFirstName: Yup.string().required("Required"),
    motherMiddleName: Yup.string(),
    motherLastName: Yup.string().required("Required"),
    currentLocation: Yup.string().required("Required"),
    preferredLocation: Yup.string().required("Required"),
    currentAddress: Yup.string()
      .min(10, "Min 10 characters required")
      .required("Required"),
    permanentAddress: Yup.string()
      .min(10, "Min 10 characters required")
      .required("Required"),
    masters: Yup.string() /*.required("Required") */,
    mastersSpecialisation: Yup.string() /*.required("Required") */,
    mastersYOP: Yup.string() /*.required("Required") */,
    mastersPercentage: Yup.number() /*.required("Required") */,
    mastersUniName: Yup.string() /*.required("Required") */,
    mastersCollegeName: Yup.string() /*.required("Required") */,
    graduation: Yup.string().required("Required"),
    gradSpecialisation: Yup.string().required("Required"),
    gradYOP: Yup.string().required("Required"),
    gradPercentage: Yup.number().required("Required"),
    gradUniName: Yup.string().required("Required"),
    gradCollegeName: Yup.string().required("Required"),
    puc: Yup.string().required("Required"),
    pucSpecialisation: Yup.string().required("Required"),
    pucYOP: Yup.string().required("Required"),
    pucPercentage: Yup.number().required("Required"),
    pucUniName: Yup.string().required("Required"),
    pucSchoolName: Yup.string().required("Required"),
    tenth: Yup.string().required("Required"),
    tenthYOP: Yup.string().required("Required"),
    tenthPercentage: Yup.number().required("Required"),
    tenthUniName: Yup.string().required("Required"),
    tenthSchoolName: Yup.string().required("Required"),
    isFresher: Yup.string().required("Required"),
    currentCompanyName: Yup.string().when("isFresher", {
      is: "no",
      then: Yup.string().required("Required"),
    }),
    currentDesignation: Yup.string().when("isFresher", {
      is: "no",
      then: Yup.string().required("Required"),
    }),
    skills: Yup.array().of(
      Yup.object({
        skill: Yup.string().required("Required"),
        experience: Yup.number().required("Required"),
      })
    ),
    totalExperience: Yup.number().when("isFresher", {
      is: "no",
      then: Yup.number().required("Required"),
    }),
    additionalCourses: Yup.string().required("Required"),
    summary: Yup.string()
      .min(20, "Min 20 characters required")
      .required("Required"),
    resumeFile: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "resumeFile",
        "File size should be less than 1 MB",
        (val) => val && val.size <= 10 ** 6
      ),
  });
  const onSubmit = (values, onSubmitProps) => {
    // console.log("Form data", values);
    alert("Form submitted successfully");
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    async function postData() {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:1337/api/form",
          data: formData,
          //   headers: { "Content-Type": "application/json" },
        });
        console.log("amal response: ", response.data);
      } catch (error) {
        console.log("amal error: ", error);
      }
    }
    postData();
    // onSubmitProps.resetForm();
    // setPageNumber(0);
  };

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {(formik) => {
        const {
          validateForm,
          setTouched,
          errors,
          touched,
          isValid,
          values,
          setFieldValue,
          setFieldTouched,
        } = formik;
        const arr = [
          <Personal
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />,
          <Education />,
          <Professional fresher={values.fresher} />,
        ];
        const nextButtonHandler = () => {
          if (pageNumber === 0) {
            setTouched({
              firstName: true,
              middleName: true,
              lastName: true,
              dob: true,
              gender: true,
              primaryContactNumber: true,
              secondaryContactNumber: true,
              primaryEmailId: true,
              secondaryEmailId: true,
              fatherFirstName: true,
              fatherMiddleName: true,
              fatherLastName: true,
              motherFirstName: true,
              motherMiddleName: true,
              motherLastName: true,
              currentLocation: true,
              preferredLocation: true,
              currentAddress: true,
              permanentAddress: true,
            });
          }
          if (pageNumber === 1) {
            setTouched({
              masters: true,
              mastersSpecialisation: true,
              mastersYOP: true,
              mastersPercentage: true,
              mastersUniName: true,
              mastersCollegeName: true,
              graduation: true,
              gradSpecialisation: true,
              gradYOP: true,
              gradPercentage: true,
              gradUniName: true,
              gradCollegeName: true,
              puc: true,
              pucSpecialisation: true,
              pucYOP: true,
              pucPercentage: true,
              pucUniName: true,
              pucSchoolName: true,
              tenth: true,
              tenthYOP: true,
              tenthPercentage: true,
              tenthUniName: true,
              tenthSchoolName: true,
            });
          }
          validateForm();
          // console.log("touched", touched);
          // console.log("err", errors);
          const touchedArr = Object.keys(touched);
          const errorsArr = Object.keys(errors);
          let isEnable;
          let enableButton = () => {
            if (!(touchedArr.length && errorsArr.length)) {
              return false;
            }
            for (let i = 0; i < touchedArr.length; i++) {
              for (let j = 0; j < errorsArr.length; j++) {
                if (touchedArr[i] === errorsArr[j]) {
                  return false;
                }
              }
            }
            return true;
          };
          isEnable = enableButton();
          if (isEnable) {
            setPageNumber((prev) => prev + 1);
          }
        };
        return (
          <Form className="container p-3 my-5 rounded border w-50 text-start">
            {arr[pageNumber]}
            <div className="text-end">
              {pageNumber !== 0 && (
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setPageNumber((prev) => prev - 1)}
                >
                  Prev
                </button>
              )}
              {pageNumber !== arr.length - 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={nextButtonHandler}
                >
                  Next
                </button>
                // ) : (
                //   <button
                //     type="submit"
                //     className="btn btn-primary"
                //     onMouseDown={() => console.log("submit downed")}
                //     onClick={() => console.log("submit clicked")}
                //   >
                //     Submit
                //   </button>
                //
              )}
              {pageNumber === arr.length - 1 && (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </div>
            {/* <FormikControl
              control="select"
              name="locations"
              id="locationContainer"
              label="Locations"
              options={locations}
            /> */}

            {/* <Form1.input type="text" placeholder="Name" label="Name" />
            <Form1.input type="email" placeholder="Email" label="Email" />
            <Form1.input
              type="password"
              placeholder="Password"
              label="Password"
            />
            <Form1.input
              type="text"
              placeholder="Phone Number"
              label="Phone Number"
            />
            <Form1.textarea placeholder="Address" label="Address" /> */}
          </Form>
        );
      }}
    </Formik>
  );
}

export { FormikContainer };
