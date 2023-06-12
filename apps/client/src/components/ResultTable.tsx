import React, { useEffect, useState } from 'react';
import { TableData } from '../types';
import { getServerData } from '../utils/serverData';

export default function ResultTable() {
    const [data, setData] = useState<TableData[]>([]);

    useEffect(() => {
        getServerData<TableData[]>(
            `${import.meta.env.VITE_SERVER_HOSTNAME}/api/result`,
            (res) => setData(res),
        );
    }, []);

    return (
        <div>
            <table>
                <thead className="table-header">
                    <tr className="table-row">
                        <td>Name</td>
                        <td>Attempts</td>
                        <td>Earn Points</td>
                        <td>Result</td>
                    </tr>
                </thead>

                <tbody>
                    {data && data.length > 0 ? (
                        data.map((v, i) => (
                            <tr className="table-body" key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achieved || ''}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className="table-body">
                            <td colSpan={4}>No data found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
