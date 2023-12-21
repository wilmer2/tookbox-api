import { expect } from 'chai';
import sinon from 'sinon';
import { FileModel } from '../../models/file-model.js';
import { FileService } from '../../services/file-service.js';

const csvRows = [
  {
    'file': 'test2.csv',
    'text': 'aDxWNNooHF',
    'number': '68822651',
    'hex': 'c1399a3ab152329c2c1a5c4129327763'
  },
  {
    'file': 'test3.csv',
    'text': 'tuql',
    'number': '7041998326',
    'hex': '41f201d219ee9261b930e79d2885b6f8'
  }
]
const fileNames = ['test2.csv', 'test3.csv']

describe('FileService', () => {
  let fileService;

  beforeEach(() => {
    fileService = new FileService()
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('#getAllFiles', () => {
    it('should handle errors when getting all files', async () => {
      const errorResponse = {
        response: {
          status: 404,
        },
      };
  
      sinon.stub(FileModel, 'getList').rejects(errorResponse);
  
      const result = await fileService.getAllFiles();
  
      expect(result.data).to.equal(null);
      expect(result.error.statusCode).to.equal(404);
      expect(result.error.message).to.equal('No se pudo procesar la solicitud de archivos');
    });

    it('should return correct file names', async () => {
      const files = {files: fileNames};

      sinon.stub(FileModel, 'getList').resolves(files)
      const result = await fileService.getAllFiles();

      expect(result.error).to.equal(null);
      expect(result.data).to.equal(files)
    });
  })

  describe('#getCsvRows', () => {
    it('should handle successful file data retrieval', async () => {

      sinon.stub(FileModel, 'getFileData').resolves({})
      sinon.stub(fileService.streamService, 'processCSVStream').resolves(csvRows)

      const result = await fileService.getCsvRows([fileNames[0]])

      expect(result[0]).to.deep.equal(csvRows);
    })

    it('should return null values', async () => {
      sinon.stub(FileModel, 'getFileData').rejects({})
      sinon.stub(fileService.streamService, 'processCSVStream').resolves(csvRows)

      const result = await fileService.getCsvRows(fileNames)

      expect(result).to.deep.equal([null, null])
    })
  })

  
})