import { ChangeEvent, useEffect, useState } from "react";
import { getCaptcha } from "../utils/api-communicator";
import { Box, Button, TextField } from "@mui/material";

interface CaptchaProps {
    handleCaptchaChange: (captcha: string) => void;
}

const Captcha = ({ handleCaptchaChange }: CaptchaProps) => {

    const [captchaImage, setCaptchaImage] = useState("");
    const [captchaText, setCaptchaText] = useState("");

    const fetchCaptcha = async () => {
        try {
            const data = await getCaptcha();
            if (data.status) {
                setCaptchaImage(data.data.svgData);
                setCaptchaText("");
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setCaptchaText(e.target.value);
        handleCaptchaChange(e.target.value);
    }

    return (
        <Box sx={{ display: "flex", gap: 2, mt: 1, border: "1px solid white", p: 2, flexDirection: "column" }}>
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`} />
            <Box sx={{ display: "flex",gap:2,justifyContent:"center" }}>
                <TextField label="Captcha" type="text" value={captchaText} onChange={handleChange} />
                <Button variant="contained" type="button" onClick={fetchCaptcha}>Refresh</Button>
            </Box>

        </Box>
    );
}

export default Captcha;