import {Button, FormControl, Input, InputLabel, MenuItem, Modal, Paper, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {FileContext, ModalStates} from "../components/DirectoryHandler";

interface IFormInput {
    newName: string | null,
    newParentId: string,
}

function FolderEdit(prop : {availableFolders : {folderId: string, folderName: string}[]}){

    var {availableFolders} = prop;

    const {focusElement, changeFocusElement,
        modalState, setModalState, editFolder, nowDirId } = useContext(FileContext);

    const {register, handleSubmit} = useForm<IFormInput>();

    useEffect(() => {
        if (focusElement != null){
            availableFolders = availableFolders.filter(folder => {return folder.folderId !== focusElement!.element.id})
        }
    }, []);

    useEffect(() => {
        if (focusElement != null){
            availableFolders = availableFolders.filter(folder => {return folder.folderId !== focusElement!.element.id})
        }
    }, [focusElement]);

    const getData : SubmitHandler<IFormInput> = (formData) => {

        const defaultName = (focusElement?.element.type === "folder" ? focusElement.element.name! : "new Folder");
        console.log("forEditGot");
        if (formData.newName != "" || formData.newParentId != nowDirId){
            console.log("formData ", formData.newParentId);
            console.log("availableFolders", availableFolders);
            editFolder(focusElement!.element.id, (formData.newName! != "" ? formData.newName! : defaultName), formData!.newParentId);
            closeModel();
        }
    }

    const closeModel = () => {
        setModalState(ModalStates.none);
    }

    const [selectValue, setSelectValue] = useState<string>(availableFolders[availableFolders.length - 1].folderId);


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
                            <InputLabel>Название</InputLabel>
                            <Input {...register("newName")}></Input>
                        </FormControl>
                        <FormControl style={{marginTop: "8px"}}>
                            <InputLabel id={"selectLabel"}>move to</InputLabel>
                            <Select
                                {...register("newParentId")}
                                labelId={"selectLabel"}
                            >
                                {availableFolders.map((el, ind) => {
                                    if (el.folderId != focusElement?.element.id){
                                        return (
                                            <MenuItem key={ind} value={el.folderId}>{el.folderName}</MenuItem>
                                        );
                                    }
                                    else{
                                        return null;
                                    }
                                })}
                            </Select>
                        </FormControl>
                        <Input id="formSubmit" type="submit"></Input>
                </form>
            </Paper>
        </Modal>
    );
}

export default FolderEdit;