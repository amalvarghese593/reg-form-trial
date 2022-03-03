import React, { useState, useRef, useEffect } from "react";
import { locations } from "./reusable formik/locations";
import { Field, ErrorMessage } from "formik";
import TextError from "./reusable formik/TextError";

export const LocationDropdwon = ({ setFieldValue, setFieldTouched, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [locationArray, setLocationArray] = useState(locations);
  const focusHandler = (e) => {
    setIsOpen(true);
  };
  const valueHandler = (e) => {
    const typedValue = e.target.value;
    setFieldValue(name, typedValue);
    setLocationArray(() => {
      return locations.filter((location) => {
        const regexp = new RegExp(typedValue, "i");
        return regexp.test(location);
      });
    });
  };
  const itemHandler = (e) => {
    setIsOpen(false);
    setFieldValue(name, e.target.dataset.location);
  };
  const addLocationHandler = () => {
    setIsOpen(false);
  };
  const dropdownRef = useRef();
  const handleClick = (e) => {
    if (!dropdownRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const blurHandler = () => {
    setFieldTouched(name);
  };
  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={dropdownRef} className="row">
      <Field name={name}>
        {(props) => {
          return (
            <>
              <input
                type="text"
                placeholder="Select Location"
                className="form-control"
                onChange={valueHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
                value={props.form.values?.[name]}
              />
            </>
          );
        }}
      </Field>
      {isOpen && (
        <ul className="list-group">
          {locationArray.map((item, index) => (
            <React.Fragment key={index}>
              <li
                data-location={item}
                className="list-group-item"
                onClick={itemHandler}
              >
                {item}
              </li>
            </React.Fragment>
          ))}
          {locationArray.length === 0 && (
            <li className="list-group-item">
              <button onClick={addLocationHandler} className="btn btn-primary">
                Add New Location
              </button>
            </li>
          )}
        </ul>
      )}
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};
