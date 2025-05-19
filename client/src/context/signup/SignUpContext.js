import { createContext, useState } from "react"

export const FormContext = createContext()

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmpassword: '',
        prefix: '',
        telephone: '',
        country: '',
        addressone: '',
        addresstwo: '',
        city: '',
        postalcode: '',
        specifications: '',
        coordinates:{
            latitude: null,
            longitude: null
        },
        termsconfirm: {
            terms: false,
            privacy: false,
            cookies: false,
            marketing: false
        },
        socialSignUp: {
            googleid: '',
            facebookid: '',
            microsoftid: ''
        }
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};