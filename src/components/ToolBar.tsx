import {ElementType, useContext, useEffect, useState} from "react";
import {blue, red} from "@mui/material/colors";
import AddFileComponent from "./addFileComponent";
import {Box, Button} from "@mui/material";
import {FileContext} from "./DirectoryHandler";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function ToolBar({children} : any) {

    const {focusElement, deleteFile, deleteFolder} = useContext(FileContext);

    useEffect(() => {
        console.log("toolBar");
    }, []);

    return (
        <FileContext.Consumer>
            {(value) => {
                return <Box
                    color={blue[50]}
                    sx={{
                        padding: "4px",
                        margin: "16px",
                        background: "@mui-gray",
                        borderRadius: "16px",
                        border: "1px solid @mui-gray",
                        width: "90wv",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    {children}
                    {value.focusElement != null && (
                        <div>
                            { (value.focusElement!.type==="folder") && <Button>Edit</Button>}
                            <Button
                                variant={"outlined"}
                                onClick={() => {value.focusElement?.type === "file" ? deleteFile(value.focusElement!.id) : deleteFolder(value.focusElement!.id)}}
                                endIcon={<DeleteForeverIcon/>} size="large">
                                Delete
                            </Button>
                        </div>)
                    }

                </Box>
            }}
        </FileContext.Consumer>

    );
}

export default ToolBar;