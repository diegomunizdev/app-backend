import * as yup from 'yup';

export const ValidatePromotion = yup.object().shape({
    title: yup.string().required('Inform the title'),
    subtitle: yup.string().required('Inform the subtitle'),
    value: yup.number().required('Inform the value'),
    dateStart: yup.string().required('Inform the date start'),
    dateEnd: yup.string(),
    userId: yup.string()
});