import * as yup from 'yup'

export const ValidateMeasure = yup.object().shape({
    weight: yup.number(),
    height: yup.number(),
    chest: yup.number(),
    waist: yup.number(),
    upperAbdomen: yup.number(),
    lowerAbdormen: yup.number(),
    hip: yup.number(),
    rightArm: yup.number(),
    leftArm: yup.number(),
    beforeRightArm: yup.number(),
    beforeLeftArm: yup.number(),
    upperRightRhigh: yup.number(),
    upperLeftThigh: yup.number(),
    mediumRightThigh: yup.number(),
    middleLeftThigh: yup.number(),
    rightCalf: yup.number(),
    leftCalf: yup.number(),
    userId: yup.string().required('Inform the user')
})