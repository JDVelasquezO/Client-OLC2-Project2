import React, {SyntheticEvent, useState} from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {Scatter} from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const FilesButton = () => {
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ dataArray, setDataArray ] = useState([])

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
        const new_arr = JSON.parse(content.replace(/'/g, '"'))
        await setDataArray(new_arr)
    }

    // const setNewArray = async (data: []) => {
    //     setDataArray(data);
    //     console.log(dataArray);
    // }

    const data = {
        datasets: [
            {
                label: 'A dataset',
                data: dataArray,
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return (
        <div className="mui-container mui-panel">
            <form className="mui-form" onSubmit={ handleSubmit }>
                <legend>Cargar fuente de datos</legend><br />
                {/* @ts-ignore */}
                <input type="file" onChange={ e => setSelectedFile( e.target.files[0] ) }
                /> <br />
                <button type="submit" className="mui-btn mui-btn--raised mui-btn--primary">Cargar</button>
            </form><br />

            <div className={"mui-container mui-panel"}>
                <Scatter options={options} data={data} />;
            </div>
        </div>
    );
};


export default FilesButton;