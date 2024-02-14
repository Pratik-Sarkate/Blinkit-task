const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function uploadFile(path, file){
    // console.log(file);
    const { data, error } = await supabase.storage.from("images").upload(path, file.buffer, {
        contentType: 'image/jpeg'
    });

    return {data, error};
}

module.exports = uploadFile