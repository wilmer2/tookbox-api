export const checkValidHexadecimal = (value) => {
  return /^[0-9a-fA-F]{32}$/.test(value)
}

export const checkValidNumber = (value) => {
  return /^\d+$/.test(value)
}
