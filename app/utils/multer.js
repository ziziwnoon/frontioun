const path = require('path');
const fs = require('fs')
const multer = require('multer');
const createHttpError = require('http-errors');
function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString()
    const month =( date.getMonth()+1).toString()
    const day = date.getDate().toString()
    const directory = path.join(__dirname , '..' , '..' , 'public' , 'uploads' , 'blogs' , year , month , day);
    req.body.fileUploadPath =(path.join('uploads' , 'blogs' , year , month , day)).replace(/\\/g , "/")
    fs.mkdirSync(directory , {recursive : true})
    return directory
}
const storage = multer.diskStorage({
    destination :(req , file , cb) => {
        if(file?.originalname){
            const filePath = createRoute(req);
            cb(null , filePath)
        }
        cb(null , null)
    } ,
    filename : (req, file , cb) =>{
        if(file?.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext)
            req.body.filename = fileName
            cb(null , fileName)
        }
        cb(null, null)
    }
})

function fileFilter(req , file , cb){
    const ext = path.extname(file.originalname);
    const mimeTypes = [".jpg" , ".jpeg" , ".png" , ".webp" , ".gif"]
    if(mimeTypes.includes(ext)){
        return cb(null , true)
    }
    else return cb(createHttpError.BadRequest("فرمت تصویر وارد شده غیرمجاز است"))
}

const maxSize = 1 * 1000 * 1000
const fileUpload = multer({storage , fileFilter , limits : maxSize});

module.exports = {
    fileUpload
}