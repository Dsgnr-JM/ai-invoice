 import multer from "multer"
 import express from "express"
 import dotenv from "dotenv"
 import { addImageForConvertToJson } from "./index.js"

 dotenv.config()

 const app = express()

const upload = multer()
app.post("/upload",upload.single("singleImage"),async function(req,res){
    const file = req.file.buffer
    const result = await addImageForConvertToJson(file)
    return res.json(result)
})

// Server Listening
app.listen(process.env.PORT ?? 3000, () => {
    console.log('Server is running at port 3000');
});