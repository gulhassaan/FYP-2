import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../public/uploads`);
    },
    filename: (req, file, cb) => {
        let lastIndex = file.originalname.lastIndexOf(".");
        // get the original extension of the file
        let extension = file.originalname.substring(lastIndex);
        // Create the file on the server
        cb(null, `img-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage });

export default upload;
