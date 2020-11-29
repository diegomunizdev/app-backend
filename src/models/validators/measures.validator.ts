import * as yup from 'yup'

export const ValidateMeasure = yup.object().shape({
    weight: yup.number(),
    height: yup.number(),
    chest: yup.number(),
    waist: yup.number(),
    upper_abdomen: yup.number(),
    lower_abdormen: yup.number(),
    hip: yup.number(),
    right_arm: yup.number(),
    left_arm: yup.number(),
    before_right_arm: yup.number(),
    before_left_arm: yup.number(),
    upper_right_thigh: yup.number(),
    upper_left_thigh: yup.number(),
    medium_right_thigh: yup.number(),
    middle_left_thigh: yup.number(),
    right_calf: yup.number(),
    left_calf: yup.number(),
    user_id: yup.string().required('Inform the user')
})