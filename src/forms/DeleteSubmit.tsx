import {Button, FormControl, Input, InputLabel, Modal, Paper, styled} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {FileContext, ModalStates} from "../components/DirectoryHandler";

interface IFormInput {
    newName: string | null,
    newParentId: string,
}

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

function DeleteSubmit(){


    const {focusElement, changeFocusElement, deleteFile, deleteFolder,
        modalState, setModalState, addFolder } = useContext(FileContext);

    const {register, handleSubmit, formState} = useForm<IFormInput>();

    useEffect(() => {

    }, [focusElement]);

    const getData : SubmitHandler<IFormInput> = (formData) => {
        if (focusElement != null){
            if (focusElement.element.type === "file"){
                deleteFile(focusElement.element.id);
            }
            else{
                deleteFolder(focusElement.element.id);
            }
            closeModel();
        }
    }

    const closeModel = () => {
        setModalState(ModalStates.none);
    }


    return (
        <Modal
            open={modalState === ModalStates.delete}
            onClose={closeModel}
            style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Paper elevation={2}
                   style={{display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", padding: "16px"}}>
                <form onSubmit={handleSubmit(getData)} style={{display: "flex", flexDirection: "column"}}>
                    <label>Are you sure?</label>
                    <Button onClick={() => {
                        document.getElementById("deleteSubmit")!.click();
                    }}
                            sx={{marginTop: "8px"}}
                    >
                        yes
                    </Button>
                    <VisuallyHiddenInput id="deleteSubmit" type="submit"></VisuallyHiddenInput>
                </form>
                <Button onClick={closeModel} sx={{marginTop: "8px"}}>
                    No
                </Button>
            </Paper>
        </Modal>
    );
}

export default DeleteSubmit;