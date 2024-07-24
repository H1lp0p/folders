import {Button, styled} from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import {useContext} from "react";
import {FileContext, ModalStates} from "./DirectoryHandler";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function addFileComponent({addFile, addFolder} : any) {
    return (
        <div>
            <Button
                onClick={() => {addFile()}}
                component="label"
                variant="outlined"
                endIcon={<NoteAddIcon/>} size="large"
                sx={{marginRight: "8px"}}
            >
                Add
            </Button>
            <Button
                onClick={(e) => {addFolder()}}
                component="label"
                variant="outlined"
                endIcon={<CreateNewFolderIcon/>} size="large"
            >
                Add
            </Button>
        </div>
    )
}

export default addFileComponent;