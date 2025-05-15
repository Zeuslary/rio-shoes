const styleStatus = (status) =>
    status === 'active'
        ? 'green-color'
        : status === 'inactive'
        ? 'orange-color'
        : status === 'banned'
        ? 'red-color'
        : 'blue-color';

export default styleStatus;
