import {createContext, Dispatch, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import AddFileComponent from "./addFileComponent";
import {Grid} from "@mui/material";
import File from "./File";
import Element from "./File"

export type FileContext = {
    nowDirId: string,
    setNowDirId: Dispatch<React.SetStateAction<string>>,
    addFile: (file: File) => void,
    addFolder: (folderName: string) => void,
    editFolder: (folderId: string, newName: string, newParentId: string) => void,
    deleteFolder: (folderId: string) => void,
    deleteFile: (fileId: string) => void,
}

function FilesArray(){
    const [nowDirId, setNowDirId] = useState<string>("");

    //TODO: you need to use this for elements render
    const [elements, setElements] = useState<Element[]>([]);

    const folderPath = localStorage.getItem("apiUrl") + "drive/folder/";
    const filePath = localStorage.getItem("apiUrl") + "drive/file/";

    useEffect(() => {
        if (localStorage.getItem("path") !== ""){
            setNowFolder(localStorage.getItem("nowFolder")!);
        }
    }, []);

    const [nowFolder, setNowFolder] = useState<string>("root");

    const getDir = folderPath + localStorage.getItem("dir");

    let nowObjects : {id: string, type: string}[] = []

    //TODO
    function addFile(file : File){}

    //TODO
    function addFolder(folderName: string) {}

    //TODO
    function editFolder(folderId: string, newName: string, newParentId: string) {}

    //TODO
    function deleteFolder(folderId: string){}

    //TODO
    function deleteFile(fileId: string) {}


    //TODO: refactor for context use
    const data = axios.get(getDir, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response: AxiosResponse) => {
        console.log(response.data.data);
        nowObjects = response.data.data;
        //return response.data.data.json;
    })

    const value = {
        nowDirId,
        setNowDirId,
        addFile,
        addFolder,
        editFolder,
        deleteFolder,
        deleteFile
    }

    return (
        <FileContext.Provider value={value}>
            <Grid
                margin="8px"
                container
                spacing={2}
                justifyContent="center"
                alignItems="center">

                {nowObjects.map((nowObject, ind) => {
                    return (
                        <Grid item xs={1}>
                            <h1 key={ind}>
                                {nowObject.id}
                                {nowObject.type}
                            </h1>
                        </Grid>
                    )
                })}
                <Grid item xs={1}>
                    <AddFileComponent/>
                </Grid>
            </Grid>
        </FileContext.Provider>

    )
}

export const FileContext = createContext<FileContext>({
    nowDirId: "root",
    setNowDirId: () => {},
    addFile: (file : File) => {},
    addFolder: (folderName: string) => {},
    editFolder: (folderId: string, newName: string, newParentId: string) => {},
    deleteFolder: (folderId: string) => {},
    deleteFile: (fileId: string) => {},
});

export default FilesArray;