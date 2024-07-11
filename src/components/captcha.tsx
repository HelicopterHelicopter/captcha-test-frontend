import { ChangeEvent, useEffect, useState } from "react";
import { getCaptcha } from "../utils/api-communicator";


const Captcha = (handleCaptchaChange:any) => {
    
    const [captchaImage,setCaptchaImage] = useState("");
    const [captchaText,setCaptchaText] = useState("");

    const fetchCaptcha = async () => {
        try{
            const data = await getCaptcha();
            if(data.status){
                setCaptchaImage(data.data.svgData);
                setCaptchaText("");
            }
        }catch(err){

        }
    }

    useEffect(()=>{
        fetchCaptcha();
    },[]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCaptchaText(e.target.value);
        handleCaptchaChange(e.target.value);
    }

    return (
        <div>
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`}/>
            <input type="text" value={captchaText} onChange={handleChange}/>
            <button type="button" onClick={fetchCaptcha}>Refresh</button>
        </div>
    );
}

export default Captcha;