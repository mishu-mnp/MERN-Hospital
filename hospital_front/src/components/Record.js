import React from 'react';
import './record.css';

const Record = (props) => {

    const { name, affectedDate, recoveredDate, notes } = props;

    return (
        <div className='record'>
            <div className="card" style={{ width: '18rem' }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span>Disease Name :</span>  {name}</li>
                    <li className="list-group-item"><span>Affected Date :</span>  {affectedDate}</li>
                    <li className="list-group-item"><span>Recovered Date :</span>  {recoveredDate}</li>
                    <li className="list-group-item"><span>Notes :</span>  {notes}</li>
                </ul>
            </div>
        </div>
    )
}

export default Record