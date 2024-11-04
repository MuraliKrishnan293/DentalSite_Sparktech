const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const Grid = require('gridfs-stream');

const mongoDBURL = "mongodb+srv://MuraliKrishnan412:MuraliKrishnan412@cluster0.d0ek1az.mongodb.net/DentalSite?retryWrites=true&w=majority";

// Create MongoDB connection
const conn = mongoose.createConnection(mongoDBURL, { useNewUrlParser: true });

let gfs;

// Initialize GridFS
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Set the collection name for GridFS
});

// Multer Storage for GridFS
const storage = new GridFsStorage({
    url: mongoDBURL,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        if (!file) {
            throw new Error("No file received.");
        }
        return {
            filename: `${Date.now()}-${file.originalname}`,
            bucketName: 'uploads' // Use the same collection name here
        };
    }
});

const upload = multer({ storage });

// Export upload and gfs
module.exports = { upload, gfs };