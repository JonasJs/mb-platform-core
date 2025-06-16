export function isValidEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
}

export function isNotEmpty(value) {
  return value !== ''
}

export function isCpf(cpf) {
  if (typeof cpf !== 'string') return false

  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i)
  }
  let firstDigit = (sum * 10) % 11
  if (firstDigit === 10 || firstDigit === 11) firstDigit = 0
  if (firstDigit !== parseInt(cpf[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i)
  }

  let secondDigit = (sum * 10) % 11
  if (secondDigit === 10 || secondDigit === 11) secondDigit = 0
  if (secondDigit !== parseInt(cpf[10])) return false

  return true
}

export function isCnpj(cnpj) {
  if (typeof cnpj !== 'string') return false

  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj.length !== 14) return false

  if (/^(\d)\1+$/.test(cnpj)) return false

  const calcCheckDigit = (cnpjSlice, weights) => {
    const sum = cnpjSlice
      .split('')
      .reduce((acc, digit, idx) => acc + parseInt(digit) * weights[idx], 0)

    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const base = cnpj.slice(0, 12)
  const digit1 = calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const digit2 = calcCheckDigit(
    base + digit1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  )

  return cnpj === base + digit1 + digit2
}
