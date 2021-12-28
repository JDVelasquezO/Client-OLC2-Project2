import React from 'react';

const Reports = () => {
    return (
        <div className={"mui-container mui-panel"}>
            <div className="mui--text-title">Reportes</div>
            <table className="mui-table mui-table--bordered">
                <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Cell 1-1</td>
                    <td>Cell 1-2</td>
                </tr>
                <tr>
                    <td>Cell 2-1</td>
                    <td>Cell 2-2</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Reports;