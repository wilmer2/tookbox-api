import csv from 'csv-parser'

export class StreamService {
  processCSVStream = (stream) => {
    return new Promise((resolve, reject) => {
      const data = []
      stream.pipe(csv())
        .on('data', (row) => {
          data.push(row)
        })
        .on('end', () => resolve(data))
        .on('err', (error) => {
          reject(error)
        })
    })
  }
}
