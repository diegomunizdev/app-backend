import * as yup from 'yup';

export const ValidateAddress = yup.object().shape({
    zipCode: yup.string().required('Inform the zip code'),
    street: yup.string(),
    complement: yup.string(),
    number: yup.string().required('Inform the number'),
    district: yup.string(),
    city: yup.string(),
    state: yup.string(),
    userId: yup.string().required('Inform the user')
});