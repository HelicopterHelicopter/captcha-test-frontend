import { ChangeEvent, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReCaptcha from 'react-google-recaptcha';
import { login } from './utils/api-communicator';

function App() {
  const captchaRef = useRef<ReCaptcha|null>(null);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState<string|null>(null);

  const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const captchaToken  = captchaRef.current?.getValue();
    console.log(captchaToken);
    if(!captchaToken){
      setError("Please complete captcha");
    }else{
      const data = await login(username,password,captchaToken);
      console.log(data);
    }

    captchaRef.current?.reset();
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type='text' id='username' onChange={(e)=>setUsername(e.target.value)}/>
        <label htmlFor='password'>Password: </label>
        <input id='password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
        <ReCaptcha
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        ref={captchaRef}
        />
        <button type='submit'>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default App
