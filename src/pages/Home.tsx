import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {

    return(
        <Container>
            <Box>
                <Typography variant="h1">Captcha POC</Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"center",gap:4}}>
                <Link to="/google">
                    <Button variant="outlined">Google</Button>
                </Link>
                <Link to="/custom">
                    <Button variant="outlined">Custom</Button>
                </Link>
                <Link to="/aws">
                    <Button variant="outlined">AWS</Button>
                </Link>
            </Box>
        </Container>
    );
}

export default Home;