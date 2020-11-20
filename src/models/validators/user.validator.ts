import { UserType } from '../user.data/user.model'
import * as yup from 'yup'

/**
 * Yup validation field's
 * https://github.com/jquense/yup
 */

export const ValidateUser = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required().min(8),
    cpf: yup.string().required(),
    date_of_birth: yup.string().required(),
    type: yup.string().oneOf(Object.values(UserType)).required(), // admin, client or personal_trainer
    phone: yup.string(),
    genre: yup.string()
})
