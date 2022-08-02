import Controller from '../interfaces/controller.interface';
import { Router, Request, Response, NextFunction } from 'express';
import FileStorage from '../multer';
import { GridFile, GridFsStorage } from 'multer-gridfs-storage';
import ImageNotFoundException from '../exceptions/ImageNotFoundException';
import mongoose from 'mongoose';

class ImageController implements Controller {
    public path = '/api/images';
    public router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/:id', this.get);
    }

    private async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            FileStorage.gfsBucket.find({ filename: id }).toArray((error, files) => {
                if (!files || !files[0]) {
                    return next(new ImageNotFoundException());
                }
                const image = files[0];

                const stream = FileStorage.gfsBucket.openDownloadStreamByName(id);
                if (image.contentType) {
                    res.contentType(image.contentType);
                }
                stream.pipe(res);
            });
            // const image = mongoose.connection('images').findOne({ filename: id });
        } catch (error) {
            next(error);
        }
    }
}

export default ImageController;
