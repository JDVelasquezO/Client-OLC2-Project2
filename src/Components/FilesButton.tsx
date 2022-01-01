import React, {SyntheticEvent, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import {Chart} from "react-chartjs-2";
import prediction from "../res/predictions";

ChartJS.register(
    CategoryScale,
    Title,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const FilesButton = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ dataArray, setDataArray ] = useState([]);
    const [ dataPredicts, setDataPredicts ] = useState([]);
    const [ category, setCategory ] = useState("");
    const [ param1, setParam1 ] = useState("");
    const [ param2, setParam2 ] = useState("");
    const [ param3, setParam3 ] = useState("");

    const handleFile = (e: SyntheticEvent) => {
        e.preventDefault();
        alert("Cargado Correctamente");
    }

    const handleCategory = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(category)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile, selectedFile.name );

        let params = [ param1, param2, param3 ]
        let str_params = JSON.stringify(params);
        formData.append("params", String(str_params));

        formData.append("report", category);

        const res = await fetch("http://localhost:8000/uploadfile", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content': 'multipart/form-data'
            },
            body: formData
        });

        const content = await res.json();
        console.log(content)
        await setDataArray(content.vals)
        await setDataPredicts(content.predicts)
    }

    const data = {
        datasets: [
            {
                type: 'scatter' as const,
                label: 'DataSet1',
                data: dataArray, // [ {'x':0, 'y':10}, {'x':2, 'y':20} ]
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                type: 'line' as const,
                label: 'Dataset 1',
                data: dataPredicts,
                borderColor: 'rgba(0,41,250,0.5)',
                backgroundColor: 'rgba(0,41,250,0.5)',
            }
        ],
    };

    return (
        <div className="mui-container">
            <div className="mui-row">
                <div className="mui-col-md-6">
                    <div className={'mui-panel'}>
                        <form className="mui-form" onSubmit={ handleFile }>
                            <legend>Cargar fuente de datos</legend><br />
                            {/* @ts-ignore */}
                            <input type="file" onChange={ e => setSelectedFile( e.target.files[0] ) }
                            /> <br />
                            <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Cargar</button>
                        </form><br />
                    </div>
                </div>

                <div className="mui-col-md-6 mui-panel">
                    <form className="mui-form" onSubmit={handleCategory}>
                        <legend>Tipo de Predicción</legend>
                        <div className="mui-select">
                            <select onChange={e => setCategory(e.target.value) }>
                                <option selected disabled>Escoge una</option>
                                {
                                    prediction.map(o => {
                                        return (
                                            <option key={o.key} value={o.key}>{ o.value }</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Categorías</label>
                        </div>
                        <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Seleccionar</button>
                    </form>
                </div>
            </div>

            <div className="mui-row">
                <div className="mui-col-md-6">
                    <div className={"mui-panel"} >
                        <div className="mui--text-title">Parametrizar Variables</div>
                        <form className="mui-form" onSubmit={ handleSubmit }>
                            <div className="mui--text-caption">Parámetros</div>
                            <div className="mui-text-field">
                                <input type="text" placeholder="Nombre país"
                                onChange={ e => setParam1(e.target.value) }/>
                            </div><br />

                            <div className="mui-text-field">
                                <input type="text" placeholder="Encabezado de país"
                                       onChange={ e => setParam2(e.target.value) }/>
                            </div><br />

                            <div className="mui-text-field">
                                <input type="text" placeholder="Encabezado de Infectados"
                                       onChange={ e => setParam3(e.target.value) }/>
                            </div><br />
                            <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Analizar</button>
                        </form>
                    </div>
                </div>

                <div className="mui-col-md-12">
                    <div className={"mui-container mui-panel"}>
                        <Chart type={'scatter'} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FilesButton;