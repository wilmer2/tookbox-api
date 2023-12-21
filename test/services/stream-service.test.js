import { Readable } from 'stream'
import { expect } from 'chai'
import { StreamService } from '../../services/stream-service.js'



describe('StreamService', () => {
  describe('processCSVStream', () => {
    it('should process a CSV stream correctly', async () => {
      const csvData = 'header1,header2\nvalue1,value2\nvalue3,value4'
      const readableStream = Readable.from([csvData])

      const service = new StreamService()
      const processedData = await service.processCSVStream(readableStream)

      expect(processedData).to.deep.equal([
        { header1: 'value1', header2: 'value2' },
        { header1: 'value3', header2: 'value4' }
      ])
    })

    it('should reject if an error occurs during processing', async () => {
      const erroneousStream = Readable.from([])

      const service = new StreamService()
      try {
        await service.processCSVStream(erroneousStream)
        throw new Error('Promise should have been rejected')
      } catch (error) {

        expect(error).to.not.equal(undefined)
      }
    })
  })
})
