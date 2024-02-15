const express = require("express");
const {getFiles} = require("../supabaseBucket");

const router = express.Router();

// get  api endpoint
// headers{authorization: "Bearer ...."}

router.get("/",  async (req,res) => {
    // console.log("Req body is", req.file);

    const userId = req.userId || "undefined";
    const path = `${userId}/`;
    const {filePublicUrls, error} = await getFiles(path);  // to get the public url

    if(error){
        console.log("error is", error);
        res.status(404).json({
            message: "Something went wrong in fetching the file names"
        })
        return;
    }

    res.json({
        filePublicUrls,
        message: "Fetched files"
    })
})

module.exports = router;