import React from "react";
import { LocationDropdwon } from "../LocationDropdwon";
import { FormikControl } from "./FormikControl";

export const Personal = ({ setFieldValue, setFieldTouched }) => {
  const genderOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Others", value: "others" },
  ];
  return (
    <div>
      <label htmlFor="nameFields" className="mb-3">
        Name (As per Govt. ID proof)
      </label>
      <div id="nameFields" className="row">
        <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="middleName"
            placeholder="Middle Name"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <FormikControl
        control="date"
        name="dob"
        placeholder="DD/MM/YYYY"
        label="Date of Birth"
      />
      <FormikControl
        control="radio"
        name="gender"
        label="Gender"
        options={genderOptions}
      />
      <label htmlFor="contact" className="form-label">
        Contact
      </label>
      <div id="contact" className="row">
        <div className="col">
          <FormikControl
            control="input"
            name="primaryContactNumber"
            label=""
            placeholder="Primary Contact Number"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            name="secondaryContactNumber"
            label=""
            placeholder="Secondary Contact Number"
            type="text"
          />
        </div>
      </div>
      <div id="contact" className="row">
        <div className="col">
          <FormikControl
            control="input"
            name="primaryEmailId"
            label=""
            placeholder="Primary Email ID"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            name="secondaryEmailId"
            label=""
            placeholder="Secondary Email ID"
            type="text"
          />
        </div>
      </div>
      <label htmlFor="fathersName" className="form-label">
        Father's Name
      </label>
      <div id="fathersName" className="row">
        <div className="col">
          <FormikControl
            control="input"
            name="fatherFirstName"
            label=""
            placeholder="First Name"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            name="fatherMiddleName"
            label=""
            placeholder="Middle Name"
            type="text"
          />
        </div>
        {/* motherFirstName: "",
    motherMiddleName: "",
    motherLastName */}
        <div className="col">
          <FormikControl
            control="input"
            name="fatherLastName"
            label=""
            placeholder="Last Name"
            type="text"
          />
        </div>
      </div>
      <label htmlFor="mothersName" className="form-label">
        Mother's Name
      </label>
      <div id="mothersName" className="row">
        <div className="col">
          <FormikControl
            control="input"
            name="motherFirstName"
            label=""
            placeholder="First Name"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            name="motherMiddleName"
            label=""
            placeholder="Middle Name"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="input"
            name="motherLastName"
            label=""
            placeholder="Last Name"
            type="text"
          />
        </div>
      </div>
      <label htmlFor="location" className="form-label">
        Location
      </label>
      <div id="location" className="row">
        <div className="col">
          {/* <FormikControl
            control="input"
            name="currentLocation"
            label=""
            placeholder="Current Location"
            type="text"
          /> */}
          <LocationDropdwon
            name="currentLocation"
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </div>
        <div className="col">
          {/* <FormikControl
            control="input"
            name="preferredLocation"
            label=""
            placeholder="Preferred Location"
            type="text"
          /> */}
          <LocationDropdwon
            name="preferredLocation"
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </div>
      </div>
      <label htmlFor="address" className="form-label">
        Address
      </label>
      <div id="address" className="row">
        <div className="col">
          <FormikControl
            control="textarea"
            name="currentAddress"
            label=""
            placeholder="Current Address"
            type="text"
          />
        </div>
        <div className="col">
          <FormikControl
            control="textarea"
            name="permanentAddress"
            label=""
            placeholder="Permanent Address"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
