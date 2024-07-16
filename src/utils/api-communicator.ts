import axios from 'axios';

axios.defaults.withCredentials=true;
axios.defaults.baseURL = 'https://recaptcha.poc.farmart.farm/api';

export const login = async (username:string,password:string,captchaToken:string) => {
    try{
        const res = await axios.post("/auth/login-google",{
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
        const res = await axios.post("/auth/login-custom",{
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
        const res = await axios.get("/captcha/");
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

export const loginAWS = async(username:string,password:string) => {
    try{
        console.log("echec");
        const res = await axios.post("/auth/login-aws",{
            username:username,
            password:password
        });
        console.log(res.status);
        if(res.status===405){
            throw new Error("Invalid credentials");
        }
        const data = await res.data;
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        return null;
    }
}

// export const loginAWSCaptcha = async(username:string,password:string) => {
//      const result = await AwsWafIntegration.fetch("https://recaptcha.poc.farmart.farm/api/auth/login-aws",{
//         method:"POST"
//      });

//      if(result.status===405){
        
//      }
//      console.log(result);
// }