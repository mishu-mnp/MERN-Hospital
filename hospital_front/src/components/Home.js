import React from 'react';
import './home.css';
import Record from './Record';

const Home = (props) => {

    const { title, records, token, getRecordData, logout } = props;

    return (
        <div className='home'>
            <div className="home-container">
                <h1>{title}</h1>
                <button className="btn btn-primary" onClick={() => getRecordData(token)} >Show All Records</button>
            </div>
            {!logout && <div className="record-container">
                {records.map((record) => (
                    <Record key={record.name}
                        name={record.name}
                        affectedDate={record.affectedDate}
                        recoveredDate={record.recoveredDate}
                        notes={record.notes}
                    />
                ))}
            </div>
            }
        </div>
    )
}

export default Home