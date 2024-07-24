import {ElementType} from "../components/File";
import {Button, FormControl, Input, InputLabel, Modal} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useContext} from "react";
import {FileContext} from "../components/DirectoryHandler";

interface IFormInput {
    newName: string | null,
    newParentId: string,
}

function Redact(){


    const {focusElement, changeFocusElement,isModalOpen, setIsModalOpen } = useContext(FileContext);

    const {register, handleSubmit} = useForm<IFormInput>();

    const getData : SubmitHandler<IFormInput> = (formData) => {
        if (formData.newName != ""){

        }
    }

    const closeModel = () => {
        setIsModalOpen(false);
    }

    switch (focusElement?.type){
        case "folder":
            return (
                <Modal
                    open={isModalOpen}
                    onClose={closeModel}
                    style={{justifyContent: "center", alignItems: "center", display: "flex"}}
                >
                    <form>
                        <FormControl>
                            <FormControl defaultValue="Название" required={true}>
                                <InputLabel>Логин</InputLabel>
                                <Input {...register("newName")}></Input>
                            </FormControl>
                            <Input id="formSubmit" type="submit"></Input>
                        </FormControl>
                    </form>
                </Modal>
            );
        default:
            return (
                <Modal
                    open={isModalOpen}
                    onClose={closeModel}
                    style={{justifyContent: "center", alignItems: "center", display: "flex"}}
                >
                    <Button onClick={closeModel}>
                        exit
                    </Button>
                </Modal>
            );
    }
}

export default Redact;