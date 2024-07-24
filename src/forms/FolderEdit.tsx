import {Button, FormControl, Input, InputLabel, Modal, Paper} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {FileContext, ModalStates} from "../components/DirectoryHandler";

interface IFormInput {
    newName: string | null,
    newParentId: string,
}

function FolderEdit(){


    const {focusElement, changeFocusElement,
        modalState, setModalState, editFolder } = useContext(FileContext);

    const {register, handleSubmit} = useForm<IFormInput>();

    useEffect(() => {

    }, [focusElement]);

    const getData : SubmitHandler<IFormInput> = (formData) => {
        console.log("forEditGot");
        if (formData.newName != ""){
            editFolder(focusElement!.element.id, formData.newName!, focusElement!.parentId);
            closeModel();
        }
    }

    const closeModel = () => {
        setModalState(ModalStates.none);
    }


    return (
        <Modal
            open={modalState === ModalStates.edit && focusElement != null}
            onClose={closeModel}
            style={{justifyContent: "center", alignItems: "center", display: "flex"}}
        >
            <Paper elevation={2}
                   style={{display: "block", alignItems: "center", justifyItems: "center", padding: "16px"}}>
                <form onSubmit={handleSubmit(getData)} style={{display: "flex", flexDirection: "column"}}>
                    <FormControl>
                        <FormControl required={true}>
                            <InputLabel>Название</InputLabel>
                            <Input {...register("newName")}></Input>
                        </FormControl>
                        <Input id="formSubmit" type="submit"></Input>
                    </FormControl>
                </form>
            </Paper>
        </Modal>
    );
}

export default FolderEdit;