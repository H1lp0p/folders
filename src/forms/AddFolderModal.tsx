import {Button, FormControl, Input, InputLabel, Modal, Paper} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect} from "react";
import {FileContext, ModalStates} from "../components/DirectoryHandler";

interface IFormInput {
    newName: string | null,
    newParentId: string,
}

function AddFolder(){


    const {focusElement, changeFocusElement,
        modalState, setModalState, addFolder } = useContext(FileContext);

    const {register, handleSubmit, formState} = useForm<IFormInput>();

    useEffect(() => {

    }, [focusElement]);

    const getData : SubmitHandler<IFormInput> = (formData) => {
        if (formData.newName != ""){
            addFolder(formData.newName!);
            closeModel();
        }
    }

    const closeModel = () => {
        setModalState(ModalStates.none);
    }


    return (
        <Modal
            open={modalState === ModalStates.add}
    onClose={closeModel}
    style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Paper elevation={2}
            style={{display: "block", alignItems: "center", justifyItems: "center", padding: "16px"}}>
                <form onSubmit={handleSubmit(getData)} style={{display:"flex", flexDirection: "column"}}>
                    <FormControl required={true}>
                        <InputLabel>Название</InputLabel>
                        <Input {...register("newName")}></Input>
                    </FormControl>
                    <FormControl>
                        <Input id="formSubmit" type="submit" value="Add"></Input>
                    </FormControl>
                </form>
            </Paper>
        </Modal>
);
}

export default AddFolder;