import {useContext} from "react";
import {AppBar, Button, Typography} from "@mui/material";

type HeaderProps = {
    logOut: () => void,
    userName : string | null
}

function Header({logOut, userName} : HeaderProps ){
    return (
        <AppBar position="static" sx={{display: "inline-flex"}}>
            <Typography variant="h6">{userName !== null? userName : "Guest"}</Typography>
            <Button color="inherit" onClick={() => logOut()}>
                Log out
            </Button>
        </AppBar>
    )
}

export default Header;