export default function handleError(err) {
    let errors = {}, code = 400;

    if (err.name === 'LoginError') {
        errors = { [err.type]: err.message }
        code = 401
    }
    else if (err.code === 11000) {
        errors = { email: 'email is exist', detail: err.message, value: err.keyValue.email }
        code = 409;
    }
    else if (err.message.includes('customer validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors = { ...errors, [properties.path]: properties.message }
        })
    }
    else {
        errors = { error: err.name, detail: err.message }
        code = 500;
    }

    return { code, errors }
}