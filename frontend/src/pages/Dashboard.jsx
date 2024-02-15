import { useEffect, useState } from "react";
import axios from "axios"
import { Image } from "../components/Image";
import { Navbar } from "../components/Navbar";

function Dashboard(){

    const [error, setError] = useState("");
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const fileTypes = ["image/jpg", "image/png", "image/jpeg"];

    useEffect(()=>{

        axios.get("http://localhost:3000/api/v1/user/images",  {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setFiles([...res.data.filePublicUrls]);
        })

    }, [refresh]);

    
    function selectImage(e){
        const file = e.target.files[0];
        
        if(!fileTypes.find( type => type === file.type)){
            setError("Invalid filetype");
            return;
        }
        
        setCurrentFile(file);
    }
    

    function handleUpload(){
        const form = new FormData();
        form.append('image', currentFile);

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/api/v1/user/upload", form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setFiles(e => [...e, {id: res.data.id, url: res.data.url}]);
            setRefresh(e => 1-e);
        })
        // setFiles(e => [...e, {id: "123", url: "hehehe.com"}]);
    }


    return (
        <div className="h-screen bg-[#e7ebee]">
            <div className="sticky">
                <Navbar/>
            </div>


            <div className="flex flex-col justify-center items-center">
                <div className="bg-white">
                    <input type="file" onChange={selectImage}/>
                    <button className="bg-[#0a7cfe] text-white p-2 rounded-md" onClick={handleUpload}>Upload image</button>
                    {error && <div>{error}</div>}
                </div>

                <div className="grid grid-cols-3 p-2">
                    {files.map(file => <Image key={file.id} url={file.url}/>)}
                </div>

            </div>
        </div>
    )
}



export default Dashboard