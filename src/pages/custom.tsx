import { ChangeEvent, useState } from "react";
import Captcha from "../components/captcha";
import { loginCustom } from "../utils/api-communicator";
import { Button, Container, TextField } from "@mui/material";

const Custom = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [captcha,setCaptcha] = useState("");

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!captcha) {
            setError("Please complete captcha");
        } else {
            const data = await loginCustom(username, password, captcha);
            console.log(data);
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField label="Password" id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Captcha handleCaptchaChange={setCaptcha}/>
                <Button variant="contained" type='submit'>Submit</Button>
                {error && <p>{error}</p>}
            </form>
        </Container>
    );
}

export default Custom;