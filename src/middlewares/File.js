import formidable from "formidable";

export const fileParser =async(req,res,next)=>{
    const form = formidable();
    const [fields,files]=await form.parse(req);
    console.log("fields",req.body);
    console.log('files',req.files);
    if(!req.body){
        req.bpdy = {};
    }
    if(!req.files){
        req.files ={};
    }
    console.log("fields",fields);
    console.log('files',files);
    next();
}