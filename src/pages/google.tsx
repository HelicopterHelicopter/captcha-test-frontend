import { ChangeEvent, useRef, useState } from "react";
import ReCaptcha from "react-google-recaptcha";
import { login } from "../utils/api-communicator";
import { Button, Container, TextField } from "@mui/material";

const Google = () => {

    const captchaRef = useRef<ReCaptcha | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const captchaToken = captchaRef.current?.getValue();
        console.log(captchaToken);
        if (!captchaToken) {
            setError("Please complete captcha");
        } else {
            const data = await login(username, password, captchaToken);
            console.log(data);
        }

        captchaRef.current?.reset();

    }

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:4}}>
                <TextField label='Username' type='text' id='username' onChange={(e) => setUsername(e.target.value)} />
                <TextField label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <ReCaptcha
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    ref={captchaRef}
                />
                <Button type='submit' variant="contained">Submit</Button>
                {error && <p>{error}</p>}
            </form>
        </Container>
    );
}

export default Google;