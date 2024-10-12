import {object, string} from 'yup'

export const loginSchema = object ({
    password: string()
    .required('Se requiere un password')
    .min(8, 'Se requiere un minimo de 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Debe contener al menos una mayúscula, una minúscula y un número'
),
    email: string()
    .required('El mail es requerido')
    .email("No es un email válido")
})