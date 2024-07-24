import {useContext, useEffect} from "react";
import {blue} from "@mui/material/colors";
import {Box, Button} from "@mui/material";
import {FileContext, ModalStates} from "./DirectoryHandler";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Tools({children} : any) {

    const {focusElement, deleteFile, deleteFolder, setModalState} = useContext(FileContext);

    useEffect(() => {
    }, [focusElement]);

    return (
         <Box
            color={blue[50]}
            sx={{
                padding: "4px",
                margin: "16px",
                background: "@mui-gray",
                borderRadius: "16px",
                border: "1px solid @mui-gray",
                width: "90wv",
                display: "flex",
                justifyContent: "space-between",
            }}>
            {children}
        </Box>
    );
}

export default Tools;