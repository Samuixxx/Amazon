import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        uname: '',
        surname: '',
        mail: '',
        psw: '',
        cpsw: '',
        telephone: '',
        state: '',
        address: '',
        city: '',
        region: '',
        cap: '',
        termsaccepted: false
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};