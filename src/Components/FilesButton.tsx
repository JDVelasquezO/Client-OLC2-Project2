import React, {SyntheticEvent, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ScatterController,
    Tooltip,
    Legend,
    Title, ChartType
} from 'chart.js';
import {Chart} from "react-chartjs-2";
import prediction from "../res/predictions";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(
    CategoryScale,
    Title,
    LinearScale,
    PointElement,
    LineElement,
    ScatterController,
    Tooltip,
    Legend
);

const FilesButton = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ dataArray, setDataArray ] = useState(null);
    const [ dataPredicts, setDataPredicts ] = useState(null);
    const [ category, setCategory ] = useState("");
    const [ param1, setParam1 ] = useState("");
    const [ param2, setParam2 ] = useState("");
    const [ param3, setParam3 ] = useState("");
    const [ param4, setParam4 ] = useState("");

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

        let params = [ param1, param2, param3, param4 ]
        let str_params = JSON.stringify(params);
        formData.append("params", String(str_params));

        formData.append("report", category);

        const res = await fetch("https://dry-tundra-86539.herokuapp.com/uploadfile", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content': 'multipart/form-data'
            },
            body: formData
        });

        const content = await res.json();
        console.log(content)
        let new_content = JSON.parse(content.replace(/'/g, '"'))
        await setDataArray(new_content.vals)
        await setDataPredicts(new_content.predicts)
    }

    const data = {
        datasets: [
            {
                type: 'scatter' as ChartType,
                label: 'DataSet1',
                data: dataArray, // [ {'x':0, 'y':10}, {'x':2, 'y':20} ]
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                type: 'line' as ChartType,
                label: 'Dataset 1',
                data: dataPredicts,
                borderColor: 'rgba(0,41,250,0.5)',
                backgroundColor: 'rgba(0,41,250,0.5)',
            }
        ],
    };

    const handleDownload = (e: SyntheticEvent) => {
        e.preventDefault();
        // let doc = new jsPDF('p', 'pt');
        //
        // doc.text('This is the first title.', 20, 20);
        //
        // doc.addFont('Helvetica.ttf', 'helvetica', 'normal')
        // doc.text('Reporte 1', 30, 60)
        // doc.text('Tendencia de la infección por Covid-19 en un Pais.', 30, 100)

        // @ts-ignore
        let input = window.document.getElementById('data_chart');
        // @ts-ignore
        html2canvas(input).then(canvas => {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "pt");
            pdf.addImage(
                img,
                "png",
                // @ts-ignore
                input.offsetLeft,
                // @ts-ignore
                input.offsetTop,
                // @ts-ignore
                input.offsetWidth,
                // @ts-ignore
                input.offsetHeight,
            );
            pdf.save("chart.pdf");
        });
    }

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

                <div className="mui-col-md-6">
                    <form className="mui-form mui-panel" onSubmit={handleCategory}>
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

                            <div className="mui-text-field">
                                <input type="text" placeholder="Encabezado de Días"
                                       onChange={ e => setParam4(e.target.value) }/>
                            </div><br />
                            <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Analizar</button>
                        </form>
                    </div>
                </div>

                <div className="mui-col-md-12">
                    <div className={"mui-container mui-panel"}>
                        <div id={'data_chart'}>
                            <Chart type={'scatter'} data={data} /><hr />
                        </div>

                        <button onClick={e => handleDownload(e)} type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Descargar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FilesButton;