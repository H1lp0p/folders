import {Button, FormControl, Input, InputLabel, Modal, Paper, styled, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {FileContext, ModalStates} from "../components/DirectoryHandler";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface IFormInput {
    file: FileList,
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

function AddFolder(){


    const {focusElement, changeFocusElement,
        modalState, setModalState, addFile } = useContext(FileContext);

    const {register, handleSubmit, formState} = useForm<IFormInput>();

    useEffect(() => {

    }, [focusElement]);

    const getData : SubmitHandler<IFormInput> = (formData) => {}

    const closeModel = () => {
        setModalState(ModalStates.none);
    }


    return (
        <Modal
            open={modalState === ModalStates.addFile}
            onClose={closeModel}
            style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Paper elevation={2}
                   style={{display: "block", alignItems: "center", justifyItems: "center", padding: "16px"}}>
                <form onSubmit={handleSubmit(getData)} style={{display:"flex", flexDirection: "column"}}>
                    <FormControl required={true}>
                        <Button
                            onClick={() => {
                                document.getElementById("fileInput")!.click()
                            }}
                            endIcon={<CloudUploadIcon/>}
                        >
                            Upload file
                            <VisuallyHiddenInput id={"fileInput"} {...register("file")}
                                                 type={"file"}
                            onChange={(e) => {
                                addFile(e.currentTarget.files![0]);
                                closeModel();
                            }}
                            ></VisuallyHiddenInput>
                        </Button>
                    </FormControl>
                </form>
            </Paper>
        </Modal>
    );
}

export default AddFolder;