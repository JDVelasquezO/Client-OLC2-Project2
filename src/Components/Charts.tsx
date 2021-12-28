import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const Charts = () => {

    return (
        <div className={"mui-container mui-panel"}>
            <Scatter options={options} data={data} />;
        </div>
    );
};

export const data = {
    datasets: [
        {
            label: 'A dataset',
            data: Array.from({ length: 100 }, () => ({
                x: faker.datatype.number({ min: -100, max: 100 }),
                y: faker.datatype.number({ min: -100, max: 100 }),
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};

export default Charts;