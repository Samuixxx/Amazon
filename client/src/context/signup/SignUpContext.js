import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        uname: '',
        surname: '',
        mail: '',
        psw: '',
        cpsw: '',
        prefix: '',
        telephone: '',
        country: '',
        addressone: '',
        addresstwo: '',
        city: '',
        postalcode: '',
        specifications: '',
        coordinates:{
            latiditude: null,
            longitude: null
        },
        termsconfirm: {
            terms: false,
            privacy: false,
            cookies: false,
            marketing: false
        }
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};