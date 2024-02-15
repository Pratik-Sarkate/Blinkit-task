const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function uploadFile(path, file){
    // console.log(file);
    const { data, error } = await supabase.storage.from("images").upload(path, file.buffer, {
        contentType: file.mimetype
    });

    return {data, error};
}

async function publicUrl(path){
    const {data, error} = await supabase.storage.from('images').getPublicUrl(path);
    return {data, error};
}

async function getFiles(path){
    // console.log(file);
    const { data:imgList, error } = await supabase.storage.from('images').list(path);
    
    const files = imgList.map( file => ({id: file.id, name: file.name}));

    const filePublicUrls = await Promise.all(files.map(async file => {
        const { data, error } = await publicUrl(path+file.name);
        return {id: file.id, url: data.publicUrl};
    }))
    // console.log(filePublicUrls);

    return {filePublicUrls, error};
}

module.exports = {
    uploadFile,
    getFiles,
    publicUrl
}