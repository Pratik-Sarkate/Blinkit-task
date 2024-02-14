const express = require("express");
const { memoryStorage } = require("multer");
const multer = require("multer");
const uuid = require("uuid");
const uploadFile = require("../supabaseBucket");

const router = express.Router();

const storage = memoryStorage();
const upload = multer({storage});


router.post("/", upload.single("image"), async (req,res) => {
    // console.log("Req body is", req.file);
    const userId = req.headers.userid;
    const path = `${userId}/${uuid.v4()}`;
    const {data, error} = uploadFile(path, req.file);
    
    if(error){
        console.log("error is", error);
        res.status(404).json({
            message: "Something went wrong in uploading the file"
        })
        return;
    }

    res.json({
        message: "Done uploading"
    })
})

module.exports = router;