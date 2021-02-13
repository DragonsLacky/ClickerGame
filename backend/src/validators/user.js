import * as yup from 'yup';

const username = yup.string()
    .required("Username field empty.")
    .min(4, 'Minimum length 4 characters')
    .max(20,'Maximum size is 20 characters.')
    .matches(/^\w+$/, 'Alphanumerical');

const password = yup.string()
    .required("Password field empty")
    .min(6,'minimum legnt is 6')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,'minimum 5 characters, 1 lower case letter, 1 uppercase letter, 1 number, 1 special character');


const email = yup.string()
    .required('Email field empty.')
    .matches(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,'Email does not mach regex');

const firstName = yup.string()
    .required('Name field empty')
    .max(30,'Maximum length reached')

const lastName = yup.string()
    .required('Name field empty')
    .max(30,'Maximum length reached')
    
export const UserRegistrationRules = yup.object().shape({
    username,
    password,
    email,
    firstName,
    lastName
})

export const UserAuthenticationRules = yup.object().shape({
    username,
    password
})