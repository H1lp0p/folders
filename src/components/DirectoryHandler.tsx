import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios";
import AddFileComponent from "./addFileComponent";
import {Grid, Box, Toolbar, Button} from "@mui/material";
import Object, {ElementType, elementProps} from "./File"
import {blue} from "@mui/material/colors";
import {AuthContext} from "./AuthorizationHandler";
import {unstable_batchedUpdates} from "react-dom";
import Redact from "../forms/ObjectRedactor";

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
    focusElement: ElementType | null,
    changeFocusElement: (el: ElementType) => void,
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const useFocus = () => {
    const [active, setActive] = useState(document.activeElement);
    const handleFocus = (e : Event) => {
        setActive(document.activeElement);
    }

    useEffect(() => {
        document.addEventListener("focus", handleFocus);

        return () => {
            document.removeEventListener("focus", handleFocus);
        }
    }, []);

    return active;
}

function FilesArray(){
    const [nowDirId, setNowDirId] = useState<string>('root');
    const [rerender, setRerender] = useState<boolean>(false);
    const [focusElement, changeFocusElement ] = useState<ElementType|null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        console.log('focus ', focusElement?.name)
    }, [focusElement]);

    useEffect(() => {
        path = localStorage.getItem("path")!.split('/');
        changeFocusElement(null);
    }, [nowDirId]);


    const folderPath = localStorage.getItem("apiUrl") + "drive/folder";

    const filePath = localStorage.getItem("apiUrl") + "drive/files";

    function goTo(folderId : string){
        localStorage.setItem("path", localStorage.getItem("path") + `/${folderId}`);
        setNowDirId(folderId);
    }

    function goUp(){
        if (localStorage.getItem("path") != "root"){
            const nowPath = localStorage.getItem("path")!.split('/');
            nowPath.pop();
            localStorage.setItem("path", nowPath.join("/"));
            setNowDirId(nowPath[nowPath.length - 1]);
        }
    }

    //TODO: test
    function addFile(file : File){
        const data = {
            folderId: nowDirId,
            file: file
        };
        const request = axios.post(filePath, data, config).catch((error) => {
            console.log("addFile", error, requestHeader);
        });
        setRerender(!rerender);
    }

    //TODO: test
    function addFolder(folderName: string = "newFolder") {
        console.log("addFolder", folderName);
        const data = {
            "parentId" : nowDirId,
            "name" : folderName,
        }
        const request = axios.post(folderPath, data, config)
        request.then((response) => {
            //setElements([...elements, {id: newFolder.id, type: "folder", name: newFolder.name}])
        }).catch((error) => {
            console.log("addFolder", error, requestHeader);
        });
        setRerender(!rerender);
    }

    //TODO: test
    function editFolder(folderId: string, newName: string, newParentId: string) {
        const data = {
            parentId: newParentId,
            name: newName,
        };
        const response = axios.patch(folderPath + `/${nowDirId}`, data, config).catch((error) => {
            console.log("editFolder", error, requestHeader);
        });
        //setNowDirId(nowDirId);
    }

    //TODO: test
    function deleteFolder(folderId: string){
        const response = axios.delete(folderPath + folderId, config).catch((error) => {
            console.log("deleteFolder", error, requestHeader);
        });
        //setNowDirId(nowDirId);
    }

    //TODO: test
    function deleteFile(fileId: string) {
        const presonse = axios.delete(filePath + `/${fileId}`, config).catch((error) => {
            console.log("deleteFile", error, requestHeader);
        });
        //setNowDirId(nowDirId);
    }

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
        isModalOpen,
        setIsModalOpen,
    }

    var {isLoading, data, error} = useQuery({
        queryKey: ['getFolder', nowDirId],
        queryFn: async () => {
            console.log("nowDir", nowDirId);
            console.log("last path", path[path.length - 1]);
            const {data} = await axios.get(folderPath + `/${nowDirId}`, config);
            return data.data },
    });

    if(!isLoading){
        console.log(data);
        const children = data.children as {}[];
        return (
            <FileContext.Provider value={value}>
                <Redact/>
                <Toolbar>
                    <Button onClick={goUp}> back </Button>
                    <h1>{data.name}</h1>
                    <AddFileComponent addFile={addFile} addFolder={addFolder}/>

                </Toolbar>
                <Grid
                    margin="8px"
                    container
                    spacing={0.5}
                    justifyContent="center"
                    alignItems="center"
                    gap="8px"
                >

                    {children.map((el : {}, ind) => {
                        console.log((el as ElementType).id);
                        return (
                            <Grid item xs={1} key={(el as ElementType).id}>
                                <Object element={el as ElementType} parentId={nowDirId}/>
                            </Grid>);
                    })}
                </Grid>
            </FileContext.Provider>
        )
    }
    else{
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
    changeFocusElement: (el: ElementType) => {},
    isModalOpen: false,
    setIsModalOpen: () => {}
});

export default FilesArray;