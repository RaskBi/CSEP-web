import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});
    const [selectedImage, setSelectedImage] = useState(null); // Agregamos el estado para la imagen seleccionada

    useEffect(() => {
        createValidators();
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onInputChangeMultiselect = (e) => {
        const options = [...e.target.selectedOptions];
        const values = options.map(option => option.value);
        
        const { name } = e.target;
        setFormState({
            ...formState,
            [name]: values
        });
    }

    const onInputSelect = (e, name) => {
        if (e.value==null){
            e=null
        }
        setFormState({
            ...formState,
            [name]: e
        });
    }
    const onInputChangeImage = ({ target }) => {
        const { name, files } = target;
        if (files.length > 0) {
          const reader = new FileReader();
          const extension = files[0].name.split('.');
          reader.readAsDataURL(files[0]);
          reader.onload = function () {
            var base64 = reader.result;
            var point = base64.search('base64,');
            var trans = base64.slice(point + 7);
            setFormState({
              ...formState,
              [name]: { change: true, b64: trans, ext: extension[extension.length - 1] },
            });
            setSelectedImage(trans); // Actualizamos el estado de la imagen seleccionada
          };
        } else {
          setFormState({
            ...formState,
            [name]: { change: false, b64: '', ext: '' },
          });
          setSelectedImage(null); // Borramos el estado de la imagen seleccionada
        }
      };

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onInputChangeImage,
        onInputChangeMultiselect,
        onInputSelect,
        onResetForm,
        selectedImage,
        ...formValidation,
        isFormValid
    }
}