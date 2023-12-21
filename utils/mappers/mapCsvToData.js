import { checkValidHexadecimal, checkValidNumber } from '../validation.js'

const filterCsvData = (rowData) => {
  const rowValues = Object.values(rowData)
  const someIsEmpty = rowValues.some(r => r === '')
  const isValidNumber = checkValidNumber(rowData.number)
  const isValidHexadecimal = checkValidHexadecimal(rowData.hex)

  if (someIsEmpty) return false
  if (!isValidNumber) return false
  if (!isValidHexadecimal) return false

  return true
}

const mapCsvToData = (csvRows) => {
  const csv = csvRows
    .flatMap(row => {
      if (!Array.isArray(row)) return []

      return row.map(({ file = '', text = '', number = '', hex = '' }) => ({ file, text, number, hex }))
    })
    .filter(data => filterCsvData(data))

  return csv
}

export default mapCsvToData
