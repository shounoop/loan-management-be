'use strict'

function checkRequiredFields(payload, requiredFields) {
  let isValid = true
  let element = ''
  for (let i = 0; i < requiredFields.length; i++) {
    if (!payload[requiredFields[i]]) {
        isValid = false
        element = requiredFields[i]
        break;
    }
  }
  return {
    isValid: isValid,
    element: element
  }
}

module.exports = checkRequiredFields