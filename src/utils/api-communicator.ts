import axios from 'axios';

export const login = async (username:string,password:string,captchaToken:string) => {
    try{
        console.log("inn");
        const res = await axios.post("http://localhost:5000/api/auth/login",{
            username:username,
            password:password,
            captchaToken:captchaToken
        });
        if(res.status!==200){
            throw new Error("Invalid credentials");
        }
        const data = await res.data;
        console.log(data);
        return data;
    }catch(err){
        return null;
    }
}