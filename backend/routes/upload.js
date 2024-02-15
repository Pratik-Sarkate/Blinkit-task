const express = require("express");
const { memoryStorage } = require("multer");
const multer = require("multer");
const uuid = require("uuid");
const {uploadFile, publicUrl} = require("../supabaseBucket");

const router = express.Router();

const storage = memoryStorage();
const upload = multer({storage});

// upload api endpoint
// headers{authorization: "Bearer ...."}

router.post("/", upload.single("image"), async (req,res) => {
    // console.log("Req body is", req.file);
    const userId = req.userId;
    const path = `${userId}/${uuid.v1()}`;
    const {data, error} = await uploadFile(path, req.file);
    
    // console.log("data is",data);
    if(error){
        console.log("error is", error);
        res.status(404).json({
            message: "Something went wrong in uploading the file"
        })
        return;
    }

    const {data: imgPublicUrl} = await publicUrl(data.path);
    res.json({
        data: {...data, url: imgPublicUrl.publicUrl},
        message: "Done uploading"
    })
})

module.exports = router;