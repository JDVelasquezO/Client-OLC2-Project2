import React from 'react';

const ParameterInput = () => {
    return (
        <div className={"mui-container mui-panel"}>
            <form className="mui-form">
                <legend>Parámetros</legend>
                <div className="mui-text-field">
                    <input type="text" placeholder="muertes, edad, etc" />
                </div><br />
                <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Buscar</button>
            </form>
        </div>
    );
};

export default ParameterInput;