const required = {
    value: true,
    message: 'This field is required',
};

const email = {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Email is not valid',
};

const phone = {
    value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
    message: 'Invalid phone number',
};

// Just allow letter, number, -
const alphaNumUnderscoreOnly = {
    value: /^[a-zA-Z0-9_]+$/,
    message: 'Only letters, numbers, and underscores are allowed',
};

const minLength3 = {
    value: 3,
    message: 'This field at least 3 letters',
};

const password = {
    value: 6,
    message: 'Password must be at least 6 characters',
};

const min0 = {
    value: 0,
    message: 'Value must be greater than or equal to 0',
};

const min1 = {
    value: 1,
    message: 'Value must be greater than or equal to 1',
};

const mustNumber = {
    value: true,
    message: 'This field must be number',
};

export default {
    required,
    email,
    phone,
    alphaNumUnderscoreOnly,
    password,
    minLength3,
    min0,
    min1,
    mustNumber,
};
