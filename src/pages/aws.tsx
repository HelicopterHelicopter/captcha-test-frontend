// @ts-nocheck

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import axios from "axios";

const AWS = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const captchaContainerRef = useRef(null);

    const captchaVerify = async () => {
        const token = await AwsWafIntegration.getToken();
        const result = await AwsWafIntegration.fetch("https://recaptcha.poc.farmart.farm/api/auth/login-aws",{
            method:"POST",
            headers:{
                "X-Aws-Waf-Token":token
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
         });

         if(result.status===405){
            AwsWafCaptcha.renderCaptcha(captchaContainerRef.current,{
                apiKey:import.meta.env.VITE_AWS_API_KEY,
                onSuccess:()=>{
                    captchaVerify();
                    console.log("Success");
                },
                onError:()=>{
                    console.log("Error");
                }
            });
         }

         return result;
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const result = await window.AwsWafIntegration.fetch("https://recaptcha.poc.farmart.farm/api/auth/login-aws",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password})
        });
        console.log(result);

    }

    const fetchCaptcha = () => {
        window.AwsWafCaptcha.renderCaptcha(captchaContainerRef.current,{
            apiKey:import.meta.env.VITE_AWS_API_KEY,
            onSuccess: (token:string)=>{
                console.log(token);
                AwsWafIntegration.fetch("https://recaptcha.poc.farmart.farm/api/auth/login-aws",{
                    method:"GET",
                    credentials:"include"
                })
                AwsWafIntegration.fetch("https://recaptcha.poc.farmart.farm/api/auth/login-aws",{
                    method:"POST",
                    credentials:"include",
                    body:JSON.stringify({username,password})
                })
                console.log("Success");
            },
            onError:()=>{
                console.log("Error");
            }
        })
    }

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:4}}>
                <TextField label='Username' type='text' id='username' onChange={(e) => setUsername(e.target.value)} />
                <TextField label='Password' id='password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <Button type="button" onClick={fetchCaptcha} variant="contained">Render Captcha</Button>
                <div id="captcha-container" ref={captchaContainerRef}>
                </div>
                <Button type='submit' variant="contained">Submit</Button>
                {error && <p>{error}</p>}
                
            </form>
        </Container>
    );
}

export default AWS;