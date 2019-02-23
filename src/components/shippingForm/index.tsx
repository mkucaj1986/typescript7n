import IFormState from 'interfaces/IFormState';
import React, { SetStateAction, useState } from 'react';
import Select from 'react-select';
import styles from './styles.css';

const state: IFormState = {
  name: '',
  address: '',
  phone: '',
  email: '',
  formValid: null,
  validationForm: false,
  selectedOption: null,
  errors: {}
};

interface IProps {
  totalPrice: number;
}

// Email Pattern
const emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Phone Pattern
const phonePattern: RegExp = /^-{0,1}\d+$/;

const selectOptions = [
  { value: 0, label: 'ninjPost' },
  { value: 1, label: 'D7L - additional 15.99 pln' },
  { value: 2, label: '7post - additional 7.99 pln' }
];

const colourStyles = {
  control: (controlStyles: any) => ({
    ...controlStyles,
    width: '150px',
    cursor: 'pointer',
    backgroundColor: 'white'
  }),
  option: (optionsStyles: any) => {
    return {
      ...optionsStyles,
      color: '#000'
    };
  }
};

const shippingForm = (props: IProps) => {
  const [name, setName] = useState(state.name);
  const [address, setAddress] = useState(state.address);
  const [selectedOption, setSelectedOption] = useState(state.selectedOption);
  const [phone, setPhone] = useState(state.phone);
  const [email, setEmail] = useState(state.email);
  const [validationForm, setValidationForm] = useState(state.validationForm);
  const [formValid, setFormValid] = useState(state.formValid);
  const [errors, setErrors] = useState(state.errors);
  const form: any = React.createRef();

  const handleSelectChange: any = (option: any) => {
    setSelectedOption(option);
  };

  const handleChangeName: any = (e: any) => {
    const value: SetStateAction<string> = e.target.value;
    setName(value);
  };

  const handleChangeAddress: any = (e: any) => {
    const value: SetStateAction<string> = e.target.value;
    setAddress(value);
  };

  const handleChangeEmail: any = (e: any) => {
    const value: SetStateAction<string> = e.target.value;
    setEmail(value);
  };

  const handleChangePhone: any = (e: any) => {
    let value: SetStateAction<any> = e.target.value;
    value = value.slice(0, 9);
    setPhone(value);
  };

  const validateForm: any = (event: any): void => {
    event.preventDefault();
    // Hold form errors
    const formErrors: any = {};

    // Set form is validating
    setValidationForm(true);

    // Check email is valid
    const isEmail = emailPattern.test(email);

    // Validation form fields rules
    if (name.length === 0) {
      const err: SetStateAction<any> = 'Field Required';
      formErrors.name = err;
    }

    if (address.length === 0) {
      const err: SetStateAction<any> = 'Field Required';
      formErrors.address = err;
    }

    if (email.length === 0) {
      const err: SetStateAction<any> = 'Field Required';
      formErrors.email = err;
    }

    if (!isEmail) {
      const err: SetStateAction<any> = 'Fill email in correct format';
      formErrors.email = err;
    }

    if (name.length > 0 && name.length < 3) {
      const err: SetStateAction<any> = 'Min length should be 3 char';
      formErrors.name = err;
    }

    setErrors(formErrors);
    // Check form has any errors
    const noFormErrors =
      Object.entries(formErrors).length === 0 &&
      formErrors.constructor === Object;

    // Set form is valid/invalid
    noFormErrors ? setFormValid(true) : setFormValid(false);
  };

  const onKeyPress = (event: any): void => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isNumber = phonePattern.test(keyValue);
    if (!isNumber) {
      setPhone('');
    }
  };

  const handleOnFocus = (event: any): void => {
    event.preventDefault();
  };

  const handleOnBlur = (event: any): void => {
    event.preventDefault();
    validateForm(event);
  };

  return (
    <form ref={form} className={styles.shippingForm}>
      <div>
        <label>
          Name:
          <input
            id="name"
            required={true}
            className={styles.inputField}
            name="name"
            min="3"
            placeholder="Name"
            type="text"
            value={name}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onChange={handleChangeName}
          />
          <span className={styles.inputErrors}>{errors.name}</span>
        </label>
      </div>
      <div>
        <label>
          Address:
          <input
            id="address"
            required={true}
            className={styles.inputField}
            name="address"
            placeholder="Address"
            type="text"
            value={address}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onChange={handleChangeAddress}
          />
          <span className={styles.inputErrors}>{errors.address}</span>
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            id="phone"
            className={styles.inputField}
            name="number"
            type="text"
            minLength={9}
            maxLength={9}
            placeholder="Phone: 888 888 8888"
            value={phone}
            pattern="[0-9]*"
            onBlur={handleOnBlur}
            onChange={handleChangePhone}
            onFocus={handleOnFocus}
            onKeyPress={onKeyPress}
          />
          <span className={styles.inputErrors}>{errors.phone}</span>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            id="email"
            required={true}
            className={styles.inputField}
            name="email"
            type="email"
            placeholder="Email: sample@gmail.com"
            value={email}
            minLength={3}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleChangeEmail}
          />
          <span className={styles.inputErrors}>{errors.email}</span>
        </label>
      </div>
      <div>
        <label>
          Shipping options:
          <Select
            value={selectedOption}
            onChange={e => handleSelectChange(e)}
            styles={colourStyles}
            options={selectOptions}
          />
        </label>
      </div>
      {props.totalPrice > 200 ? (
        <span>Free shipping</span>
      ) : (
        <span>Choice shipping option</span>
      )}
      {validationForm ? (
        <div className={styles.formValid}>
          {formValid ? <span>Form valid</span> : <span>Form invalid</span>}
        </div>
      ) : (
        ''
      )}
      <button
        onClick={validateForm}
        className={styles.formBtn}
        disabled={!formValid && validationForm}
      >
        PAY
      </button>
    </form>
  );
};

export default shippingForm;
