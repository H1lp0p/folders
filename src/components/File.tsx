import {Paper} from "@mui/material";


export type Element = {
    id: string,
    type: string,
    name: string | null,
    file: {name: string, filepath: string} | null,

}

export type elementProps = {
    element: Element,
    parentId: string,
}

function Element(prop : elementProps) {

    const {element, parentId} = prop

    console.log(element);

    return (
        <h1>element</h1>
    );
}

export default File;