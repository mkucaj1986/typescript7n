export default interface IFormState {
  name: string;
  address: string;
  phone: string;
  email: string;
  formValid: boolean | null;
  validationForm: boolean;
  selectedOption: any;
  errors: any;
}
