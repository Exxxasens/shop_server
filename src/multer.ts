import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
import { GridFSBucket } from 'mongodb';

class FileStorage {
    static collectionName: string = 'images';
    static instance: InstanceType<typeof FileStorage>;
    static multer: multer.Multer;
    static storage: InstanceType<typeof GridFsStorage>;
    static gfsBucket: GridFSBucket;

    static init(connection: ReturnType<typeof mongoose.connect>) {
        this.storage = new GridFsStorage({ db: connection, file: FileStorage.imageHandler });
        this.multer = multer({ storage: this.storage });
        mongoose.connection.once('open', () => {
            this.gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: this.collectionName
            });
        });
    }

    static imageHandler = (req: Request, file: any) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buffer) => {
                if (err) reject(err);

                const filename = buffer.toString('hex') + path.extname(file.originalname);
                const bucketName = this.collectionName;
                resolve({
                    filename,
                    bucketName
                });
            });
        });
    };
}

export default FileStorage;
