import React, {SyntheticEvent, useState} from 'react';

const FilesButton = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile, selectedFile.name );
        const res = await fetch("http://localhost:8000/uploadfile", {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const content = await res.json();

        if ( content === 200 ) {
            alert("Cargado Correctamente");
        }
    }

    return (
        <div className="mui-container mui-panel">
            <form className="mui-form" onSubmit={ handleSubmit }>
                <legend>Cargar fuente de datos</legend><br />
                {/* @ts-ignore */}
                <input type="file" onChange={ e => setSelectedFile( e.target.files[0] ) }
                /> <br />
                <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Cargar</button>
            </form>
        </div>
    );
};

export default FilesButton;