import {Button, Icon, IconButton, Paper, styled} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

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

function addFileComponent() {
    return (
            <Button
                component="label"
                variant="outlined"
                endIcon={<NoteAddIcon/>} size="large">
                Add
                <VisuallyHiddenInput type="file"/>
            </Button>
    )
}

export default addFileComponent;