import { extractErrors } from './extract-errors.js'
import { buildValidations } from './validations/build-validations.js'

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function validateSchema({ schema, data }) {
  if (!isObject(schema) || !isObject(data) || !schema?.fields) {
    return {
      success: false,
      errors: {
        params: 'Schema and data must be objects.',
      },
    }
  }

  const { fields: schemaFields } = schema

  const validData = {}
  const validationErrors = {}

  for (const property in schemaFields) {
    const field = schemaFields[property]
    const schemaPropertyType = field?.type ?? field
    const propertyValue = data[property]

    const hasParamRequired = typeof field?.required === 'boolean'

    const isRequired = hasParamRequired && field.required

    if (isRequired && propertyValue === undefined) {
      validationErrors[property] = `${property} is required.`
      continue
    }

    if (
      propertyValue !== undefined &&
      typeof propertyValue !== schemaPropertyType
    ) {
      validationErrors[property] = `${property} has invalid type.`
      continue
    }

    if (
      propertyValue !== undefined &&
      Array.isArray(field.enum) &&
      !field.enum.includes(propertyValue)
    ) {
      validationErrors[property] = `${property} has an invalid value.`
      continue
    }

    if (propertyValue !== undefined && field?.validation?.validate) {
      const validationsData = buildValidations()
      const validatorKey = field.validation.validate

      let validationIsValid = true

      const isValidatorFn = typeof validatorKey === 'function'
      if (isValidatorFn) {
        validationIsValid = validatorKey(propertyValue)
      }

      if (typeof validatorKey === 'string') {
        if (!validationsData[validatorKey]) {
          throw new Error(
            `${property} has an unknown validator: "${validatorKey}".`
          )
        }
        validationIsValid = validationsData[validatorKey](propertyValue)
      }

      if (!validationIsValid) {
        validationErrors[property] =
          field.validation?.message ?? `${property} failed validation`
        continue
      }
    }

    if (propertyValue !== undefined) {
      validData[property] = propertyValue
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    return {
      success: false,
      errors: validationErrors,
      formattedError: extractErrors(validationErrors),
    }
  }

  return {
    success: true,
    data: validData,
  }
}
