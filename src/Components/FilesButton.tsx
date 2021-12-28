import React from 'react';

const FilesButton = () => {
    return (
        <div className="mui-container mui-panel">
            <form className="mui-form">
                <legend>Cargar fuente de datos</legend><br />
                <input type="file" />
            </form>
        </div>
    );
};

export default FilesButton;