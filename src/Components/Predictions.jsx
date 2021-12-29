import React, {useState} from 'react';
import prediction from "../res/predictions.js";

const Predictions = () => {
    const [ lists, setLists ] = useState();
    const opts = [ 'una', 'dos', 'tres' ];

    return (
        <div className="mui-container mui-panel">
            <form className="mui-form">
                <legend>Tipo de Predicción</legend>
                <div className="mui-select">
                    <select>
                        <option disabled>Escoge una</option>
                        {
                            prediction.map(o => {
                                return (
                                    <option key={o.key}>{ o.value }</option>
                                )
                            })
                        }
                    </select>
                    <label>Categorías</label>
                </div>
                <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Buscar</button>
            </form>
        </div>
    );
};

export default Predictions;