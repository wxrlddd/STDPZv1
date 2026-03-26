export function useForm({ initialValues, validate, onSubmit }) {
    const values = { ...initialValues };
    const errors = {};
    const touched = {};
    const refs = {};

    function register(name) {
        return {
            name,
            defaultValue: values[name],
            onInput: (e) => {
                values[name] = e.target.type === 'number'
                    ? Number(e.target.value)
                    : e.target.value;

                if (touched[name]) {
                    validateField(name);
                }
            },
            onBlur: () => {
                touched[name] = true;
                validateField(name);
            },
            ref: (element) => {
                refs[name] = element;
            }
        };
    }

    function validateField(name) {
        const validationErrors = validate(values);

        if (validationErrors[name]) {
            errors[name] = validationErrors[name];
            showError(name, errors[name]);
        } else {
            delete errors[name];
            clearError(name);
        }
    }

    function showError(name, message) {
        const field = refs[name];
        if (!field || !field.parentElement) return;

        let errorElement = field.parentElement.querySelector(`.error-msg-${name}`);

        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = `error-msg-${name}`;
            errorElement.style.color = 'salmon';
            errorElement.style.display = 'block';
            errorElement.style.marginTop = '4px';
            field.parentElement.append(errorElement);
        }

        errorElement.textContent = message;
        field.style.borderColor = 'salmon';
    }

    function clearError(name) {
        const field = refs[name];
        if (!field || !field.parentElement) return;

        const errorElement = field.parentElement.querySelector(`.error-msg-${name}`);
        if (errorElement) {
            errorElement.remove();
        }

        field.style.borderColor = '';
    }

    function handleSubmit(e) {
        if (e) e.preventDefault();

        const validationErrors = validate(values);

        Object.keys(refs).forEach((name) => {
            touched[name] = true;

            if (validationErrors[name]) {
                errors[name] = validationErrors[name];
                showError(name, validationErrors[name]);
            } else {
                delete errors[name];
                clearError(name);
            }
        });

        if (Object.keys(validationErrors).length === 0) {
            onSubmit({ ...values });
        }
    }

    return {
        register,
        handleSubmit,
        values,
        errors
    };
}