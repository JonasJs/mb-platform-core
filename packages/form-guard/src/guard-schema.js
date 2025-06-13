import { extractErrors } from './extract-errors.js'

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
    const schemaPropertyType =
      schemaFields[property]?.type ?? schemaFields[property]
    const propertyValue = data[property]

    const hasParamRequired =
      typeof schemaFields[property]?.required === 'boolean'
    const isRequired = hasParamRequired && schemaFields[property].required

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
      Array.isArray(schemaFields[property].enum) &&
      !schemaFields[property].enum.includes(propertyValue)
    ) {
      validationErrors[property] = `${property} has an invalid value.`
      continue
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
