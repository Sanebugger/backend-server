const mongooose = require('mongoose');
const bcrypt =require('bcryptjs') ;
const jwt = require('jsonwebtoken');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
         type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
         type: String,
        required:true
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})

//hashing the password :-
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);  //converting to hash password
        this.cpassword = await bcrypt.hash(this.cpassword, 12);  //converting to hash password
    }
    next();

});
// generating token:-       (which is unique and generated just after login,for authenticating the user for other pages of website)
userSchema.methods.generateAuthToken = async function(){
    try{
        const token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens =this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

// creating collection:-       (basically in our db,which is in cloud mongodb atlas)
                              //till now ,we defined our "document structure" lyk how it gonna we look like ,and later we also did our password hashing stuffs ,also suthenticating stuffs
                               //now(below) ,its time to attatch our "document structure" to our project ,n we gonna do this with help of modals
    
const User = mongooose.model('USER',userSchema);//so hmne apne document structure ko collections me add kr diya ,so ab hmara collections me ye saare cheeje aa jayengi
    
module.exports = User;
