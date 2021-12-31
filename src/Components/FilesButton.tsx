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
import Predictions from "./Predictions";

ChartJS.register(
    CategoryScale,
    Title,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const FilesButton = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ dataArray, setDataArray ] = useState([])
    const [ dataPredicts, setDataPredicts ] = useState([])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let formData = new FormData();
        // @ts-ignore
        formData.append("file", selectedFile, selectedFile.name );
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
        labels,
        datasets: [
            {
                type: 'scatter' as const,
                label: 'DataSet1',
                data: dataArray,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                type: 'line' as const,
                label: 'Dataset 1',
                data: dataPredicts,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div className="mui-container">
            <div className="mui-row">
                <div className="mui-col-md-6">
                    <div className={'mui-panel'}>
                        <form className="mui-form" onSubmit={ handleSubmit }>
                            <legend>Cargar fuente de datos</legend><br />
                            {/* @ts-ignore */}
                            <input type="file" onChange={ e => setSelectedFile( e.target.files[0] ) }
                            /> <br />
                            <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Cargar</button>
                        </form><br />
                    </div>
                </div>

                <div className="mui-col-md-6">
                    <Predictions />
                </div>
            </div>

            <div className="mui-row">
                <div className="mui-col-md-6">
                    <div className={"mui-container mui-panel"}>
                        <Chart type={'scatter'} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default FilesButton;