import mongoose from "mongoose";
import bycrypt from 'bcrypt';
const verificationTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24,
  },
});
verificationTokenSchema.pre('save',function(next){
  if(this.isModified('token')){
    const genSalt = bycrypt.genSaltSync(10);
    this.token = bycrypt.hashSync(this.token,genSalt);
  }
  next();
});

verificationTokenSchema.methods.compare = function(token){
 return bycrypt.compareSync(token,this.token);
}

const VerificationTokenModel = mongoose.model(
  "verificationToken",
  verificationTokenSchema
);

export default VerificationTokenModel;