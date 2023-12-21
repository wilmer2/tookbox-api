import { expect } from 'chai';
import sinon from 'sinon';
import { FileModel } from '../../models/file-model.js';
import { FileService } from '../../services/file-service.js';
import { StreamService } from '../../services/stream-service.js';


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
      const fileNames = {files: ['file1.csv', 'file2.csv']};

      sinon.stub(FileModel, 'getList').resolves(fileNames)
      const result = await fileService.getAllFiles();

      expect(result.error).to.equal(null);
      expect(result.data).to.equal(fileNames)
    });
  })

  
})