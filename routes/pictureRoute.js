let express = require('express')
let mongoose = require('mongoose');
let router = express.Router();
let multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Picture = require('../models/PictureModel');


//post new picture

//multer config
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
}
});

/*
//cloudinary config
cloudinary.config({
    could_name: 'mejdi',
    api_key: '852945612653594',
    api_secret: 'w2948zUdmQAstKjuS3mJ9VIddKc',
});
*/

var upload = multer({ storage: storage, });

router.post('/upload', upload.single('image'), async (req, res, next) => {

    try { 
    //const url = req.protocol + '://' + req.get('host')
    const path = '/public/' + req.file.filename

    const newPicture = new Picture({
        _id: mongoose.Types.ObjectId(),
        path})

    //const newUpload = await cloudinary.uploader.upload(newPicture.path);

    const picture = await newPicture.save()
    
    res.status(201).json({
        msg: "Picture Uploaded",
        picture
    })

    } catch (error) {
        console.log('Server error:',error),
        res.status(500).json(error.message);
    }  
})


//get picture of a user
router.get("/:userId", async (req, res)=> {
    try {
        const picture = await Picture.find({
            owner: req.params.userId
        })
        res.status(200).json(picture)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete picture
router.delete('/delete/:picturepath', async (req, res) => {
    const  _path  = req.params.picturepath;
    try {
    const picture = await Picture.findOneAndDelete({ _path });
    res.json({ msg: "picture deleted", picture });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
