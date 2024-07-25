import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import AddFileComponent from "./addFileComponent";
import {Grid, Box, Button} from "@mui/material";
import Object, {ElementType, elementProps} from "./File"
import {blue} from "@mui/material/colors";
import {AuthContext} from "./AuthorizationHandler";
import {unstable_batchedUpdates} from "react-dom";
import Redact from "../forms/FolderEdit";
import Tools from "./ToolBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddFolder from "../forms/AddFolderModal";
import DeleteSubmit from "../forms/DeleteSubmit";
import AddFileModal from "../forms/AddFileModal";
import FolderEdit from "../forms/FolderEdit";

export type FileContext = {
    nowDirId: string,
    setNowDirId: Dispatch<React.SetStateAction<string>>,
    addFile: (file: File) => void,
    addFolder: (folderName: string) => void,
    editFolder: (folderId: string, newName: string, newParentId: string) => void,
    deleteFolder: (folderId: string) => void,
    deleteFile: (fileId: string) => void,
    goTo: (folderId: string) => void,
    goUp: () => void,
    focusElement: El | null,
    changeFocusElement: (el: El) => void,
    modalState: ModalStates,
    setModalState: Dispatch<SetStateAction<ModalStates>>,
    availableFolders: {folderId: string, folderName: string}[]
}

export enum ModalStates {
    none = "none",
    edit = "edit",
    delete = "delete",
    add = "add",
    addFile = "addFile"
}

interface El{
    element: ElementType,
    parentId: string
}

function FilesArray(){
    const [nowDirId, setNowDirId] = useState<string>('root');
    const [rerender, setRerender] = useState<boolean>(false);
    const [focusElement, changeFocusElement ] = useState<El|null>(null);
    const [modalState, setModalState] = useState<ModalStates>(ModalStates.none);
    var additionalKey = useRef(0);

    const {token} = useContext(AuthContext);

    var path : string[] = localStorage.getItem("path")!.split('/');

    const requestHeader = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
    }

    const config = {
        headers: requestHeader,
    }

    useEffect(() => {
        console.log("----------", localStorage.getItem("path"))
        console.log(data);
    }, []);

    useEffect(() => {
        changeFocusElement(null);
    }, [rerender]);

    useEffect(() => {
        path = localStorage.getItem("path")!.split('/');
        changeFocusElement(null);
    }, [nowDirId]);


    const folderPath = localStorage.getItem("apiUrl") + "drive/folder";

    const filePath = localStorage.getItem("apiUrl") + "drive/files";


    var {isLoading, data, error} = useQuery({
        queryKey: ['getFolder', nowDirId, additionalKey.current],
        queryFn: async () => {
            const {data} = await axios.get(folderPath + `/${nowDirId}`, config);
            return data.data },
    });
    function goTo(folderId : string){
        localStorage.setItem("path", localStorage.getItem("path") + `/${folderId}`);
        console.log("goto", localStorage.getItem("path"))
        setNowDirId(folderId);

    }
    function goUp(){
        if (localStorage.getItem("path") != "root"){
            console.log(localStorage.getItem("path"));
            const nowPath = localStorage.getItem("path")!.split('/');
            nowPath.pop();
            console.log(nowPath);
            localStorage.setItem("path", nowPath.join("/"));
            setNowDirId(nowPath[nowPath.length - 1]);
        }

    }

    function addFile(file : File){
        const fData = new FormData()
        fData.append("folderId", data.id);
        fData.append("file", file);

        const request = axios.post(filePath, fData, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).catch((error) => {
            console.log("addFile", error, requestHeader);
        }).then(() => {
            additionalKey.current++;
            setRerender(!rerender);
        });

    }

    function addFolder(folderName : string = "newFolder") {
        const data = {
            "parentId" : nowDirId,
            "name" : folderName,
        }
        const request = axios.post(folderPath, data, config)
        request.then((response) => {
            //setElements([...elements, {id: newFolder.id, type: "folder", name: newFolder.name}])
        }).catch((error) => {
            console.log("addFolder", error, requestHeader);
        }).then(() => {
            additionalKey.current ++;
            setRerender(!rerender);
        });

    }

    function editFolder(folderId: string, newName: string, newParentId: string) {
        console.log("editFolderFunc got")
        const data = {
            parentId: newParentId,
            name: newName,
        };
        const response = axios.patch(folderPath + `/${folderId}`, data, config)
            .catch((error) => {
            console.log("editFolder", error, requestHeader);
        }).then(() => {
                additionalKey.current ++;
                setRerender(!rerender);
            });

    }

    function deleteFolder(folderId: string){
        const response = axios.delete(folderPath + `/${folderId}`, config).catch((error) => {
            console.log("deleteFolder", error, requestHeader);
        }).then((response) => {
            console.log(response);
            additionalKey.current++;
            setRerender(!rerender);
        });

    }

    function deleteFile(fileId: string) {
        const presonse = axios.delete(filePath + `/${fileId}`, config).catch((error) => {
            console.log("deleteFile", error, requestHeader);
        });
        additionalKey.current++;
        setRerender(!rerender);

    }

    var availableFolders : {folderId: string, folderName: string}[] = [];
    var parrentFolder = {
        folderName: "...",
        folderId: localStorage.getItem("path")!.split('/').length > 1?
            localStorage.getItem("path")!.split('/')[localStorage.getItem("path")!.split('/').length-2] :
            "root"}

    const value = {
        nowDirId,
        setNowDirId,
        addFile,
        addFolder,
        editFolder,
        deleteFolder,
        deleteFile,
        goTo,
        goUp,
        focusElement,
        changeFocusElement,
        modalState,
        setModalState,
        availableFolders
    }

    if(!isLoading){
        const children = data.children as {}[];
        availableFolders = children.filter((el : {}) => {return (el as ElementType).type==="folder"})
            .map((el) => {return {folderId: (el as ElementType).id, folderName: (el as ElementType).name!}})
        if (nowDirId !== "root") {
            availableFolders.push(parrentFolder);
        }
        availableFolders.push({folderId: data.id, folderName: data.name});
        return (
            <FileContext.Provider value={value}>
                <FolderEdit availableFolders={availableFolders}/>
                <AddFolder/>
                <AddFileModal/>
                <DeleteSubmit/>
                <Tools>
                    <Button onClick={goUp}> back </Button>
                    {focusElement != null ? (
                        <div>
                            {(focusElement!.element.type === "folder") && (
                                <Button onClick={() => {
                                    setModalState(ModalStates.edit)
                                }}>
                                    Edit
                                </Button>
                            )}
                            <Button
                                variant={"outlined"}
                                onClick={() => {setModalState(ModalStates.delete)}}
                                endIcon={<DeleteForeverIcon/>} size="large">
                                Delete
                            </Button>
                        </div>) : null
                    }

                </Tools>
                <AddFileComponent addFile={() => {setModalState(ModalStates.addFile)}}
                                  addFolder={() => {setModalState(ModalStates.add)}}/>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "8px",
                        justifyContent: "center",
                        alignItems: "center"
                }}
                >

                    {children.map((el: {}, ind) => {
                        return (
                            <div key={(el as ElementType).id} style={{margin: "16px"}}>
                                <Object element={el as ElementType} parentId={nowDirId}/>
                            </div>);
                    })}
                </Box>

                <h1
                    style={{
                        userSelect: "none",
                        opacity: "10%",
                        fontSize: "600%",
                        position: "fixed",
                        bottom: "1vh",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    {data.name}
                </h1>
            </FileContext.Provider>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

export const FileContext = createContext<FileContext>({
    nowDirId: "root",
    setNowDirId: () => {},
    addFile: (file : File) => {},
    addFolder: (folderName: string) => {},
    editFolder: (folderId: string, newName: string, newParentId: string) => {},
    deleteFolder: (folderId: string) => {},
    deleteFile: (fileId: string) => {},
    goTo: (folderId: string) => {},
    goUp: () => {},
    focusElement: null,
    changeFocusElement: (el: El) => {},
    modalState: ModalStates.none,
    setModalState: () => {},
    availableFolders: []
});

export default FilesArray;