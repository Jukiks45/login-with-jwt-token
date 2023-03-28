import jwt from "jsonwebtoken";
import users from "../models/UserModel.js";

export const refreshToken = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {return res.sendStatus(401);}
        const user = await users.findAll({
            where : {
                refresh_token : refreshToken
            }
        });
        if (!user[0]) {return res.sendStatus(403)}
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err ,decode) =>{
            if (err) {return res.sendStatus(403)}
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId,name,email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'30s'
            });
            res.json({accessToken});
        })
    } catch (error) {
        console.log(error);
    }
}