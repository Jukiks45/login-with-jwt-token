import users  from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req,res) => {
    try {
        const Users = await users.findAll({
            attributes:['id','name','email']
        });
        res.json(Users);
    } catch (error) {
        console.error(error.response.data.msg);
    }
}

export const Register = async(req, res) =>{
    const {name, email, password, confirmpassword} = req.body;
    if(password !== confirmpassword){return res.status(400).json({msg:"password and confirm password are not the same"})};
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);
    try {
        await users.create({
            name: name,
            email: email,
            password: hashpassword
        });
        res.json({msg: "Data Successfuly created"});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req,res)=>{
    try {
        const user = await users.findAll({
            where:{
                email: req.body.email
            }
        });
        console.log(user);
        const matching = await bcrypt.compare(req.body.password, user[0].password);
        if (!matching) {
            return res.status(404).json({msg:"Password Wrong"})
        }
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId,name,email},
            process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30s'
        });
        const refreshToken = jwt.sign({userId, name, email},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'
        });
        await users.update({refresh_token : refreshToken},{
            where:{
                id:userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge : 24 * 60 * 60 * 1000,   
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg:"Email not registered"})
    }
}

export const Logout = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await users.findAll({
        where:{
            refresh_token : refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}