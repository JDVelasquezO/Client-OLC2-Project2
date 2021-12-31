import React from 'react';

const ParameterInput = () => {
    return (
        <div className={"mui-panel"} >
            <div className="mui--text-title">Parametrizar Variables</div>
            <form className="mui-form">
                <div className="mui-row">
                    <div className="mui--text-caption">Parámetros Existentes</div>
                    <div className="mui-text-field">
                        <input type="text" placeholder="Muertes, Edad, etc" />
                    </div><br />

                    <div className="mui--text-caption">Parámetros Venideros</div>
                    <div className="mui-text-field">
                        <input type="text" placeholder="muertes, edad, etc" />
                    </div><br />
                </div>

                <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Analizar</button>
            </form>
        </div>
    );
};

export default ParameterInput;