// Relate to api
export * from './api.js';

export { default as backEndApi } from './backendApi.js';
export { default as tokenUtils } from './tokenUtils.js';
export { default as provincesApi } from './provinces.js';

// Relate to Token
export * from './handleTokenExpired.js';

// Relate normal JS
export { default as flatObject } from './flatObject.js';
export { default as nestObject } from './nestObject.js';
export { default as removeDuplicateOfObject } from './removeDuplicateOfObject.js';
export { default as isSameValueObject } from './isSameValueObject.js';
export { default as uniqueObjectFromArray } from './uniqueObjectFromArray.js';
export { default as isDateString } from './isDateString.js';
export { default as removeDuplicateOfArray } from './removeDuplicateOfArray.js';

// Util format data
export { default as formatCurrencyVN } from './formatCurrency.js';
export { default as convertAddress } from './convertAddress.js';
export { default as styleStatus } from './styleStatus.js';
export { default as upperCaseFirstLetter } from './upperCaseFirstLetter.js';
export { default as displayAddress } from './displayAddress.js';

// Relate to storage
export { default as storage } from './storage.js';

// Relate to file
export { default as deleteFileDiskStorage } from './deleteFileDiskStorage.js';

// Other
export * from './toast.js';
export { default as patternValidate } from './patternValidate.js';
