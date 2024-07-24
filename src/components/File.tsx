import {Box, Card, CardActionArea, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Add, Image} from "@mui/icons-material";
import {ReactNode, useContext, useRef, useState} from "react";
import {FileContext} from "./DirectoryHandler";


export type ElementType = {
    id: string,
    type: string,
    name: string | null,
    file: {name: string, filepath: string} | null,
}

export type elementProps = {
    element: ElementType,
    parentId: string,
}

function Object(prop : elementProps) {

    const {goTo, setIsModalOpen, changeFocusElement} = useContext(FileContext);

    const {element, parentId} = prop

    var self = useRef<ElementType>(null);

    function onFocus(){
        changeFocusElement(element);
    }

    return (
        <Card
            sx={{
                width: "100px",
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px"
            }}
        >
            <CardActionArea
                onFocus={onFocus}
                onDoubleClick={() => {goTo(element.id)}}
                onClick={(e) => {}}
            >
                <CardMedia>
                    <Box component="img"
                         width="50px"
                         height="50px"
                         src={element.type === "folder" ?
                        "https://img.icons8.com/ios/50/folder-invoices--v2.png" :
                        "https://img.icons8.com/laces/64/file.png"}
                         alt={element.type === "folder" ? `Folder ${element.name}` : `File ${element.file?.name}`}>
                    </Box>
                </CardMedia>
                <CardContent>
                    {element.type === 'folder' ? element.name : element.file!.name}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Object;