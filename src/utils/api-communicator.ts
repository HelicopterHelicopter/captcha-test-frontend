import axios from 'axios';

axios.defaults.withCredentials=true;

export const login = async (username:string,password:string,captchaToken:string) => {
    try{
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

export const loginCustom = async (username:string,password:string,captcha:string) => {
    try{
        const res = await axios.post("http://localhost:5000/api/auth/login-custom",{
            username:username,
            password:password,
            captcha:captcha
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

export const getCaptcha = async () => {
    try{
        const res = await axios.get("http://localhost:5000/api/captcha");
        if(res.status!==200){
            throw new Error("Error in fetching svg");
        }

        const data = await res.data;
        console.log(data);
        return data;
    }catch(err){
        return null;
    }
}