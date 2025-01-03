
export const  generateAuthLink = (req,res)=>{
    console.log(req.body.email);

    const emailValidation = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

    if(emailValidation.test(req.body.email)){
        res.json({
            "data":"hello"
        });
    }
    else{
        res.json({
            "data":"fuckoff"
        });
    }
   
};