const z = require("zod");

// User input schema
const userSchema = z.object({
    firstname: z.string().max(30),
    lastname: z.string().max(30),
    username: z.string().min(3).max(30),
    password: z.string().min(6)
})

// credential schema

const credentialSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6)
})




// input validation function

function inputValidation(req,res,next){
    
    const user = req.body;

    const validData = userSchema.safeParse(user);
    
    if(!validData.success){
        res.json({
            message: "Enter the correct data"
        })
        return;
    }
    
    next();
}

function credentialValidation(req,res,next){

    const validData = credentialSchema.safeParse(req.body);

    if(!validData.success){
        res.json({
            message: "Enter the correct data"
        })
        return;
    }

    next();
}


module.exports = {
    inputValidation,
    credentialValidation,
};