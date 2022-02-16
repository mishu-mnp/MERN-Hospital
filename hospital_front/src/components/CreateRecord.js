import React from 'react'

const CreateRecord = (props) => {
    const { createRec, setCreateRec, token } = props;

    let resName, resValue;
    // console.log("TOKEN >>> ", token)

    const handleInputs = (e) => {
        resName = e.target.name;
        resValue = e.target.value;

        setCreateRec({ ...createRec, [resName]: resValue })
    }

    const recordData = async (e) => {
        e.preventDefault()

        const { name, affectedDate, recoveredDate, notes } = createRec;
        // console.log("Record", createRec)

        const res = await fetch('/record', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name, affectedDate, recoveredDate, notes
            })
        })

        const data = await res.json();

        if (data.error) {
            window.alert(data.error)
        } else if (!data) {
            window.alert('Cannot Create Record')
            console.log('Cannot Create Record')
        } else {
            window.alert('Record Created successfully')
            console.log('Record CreatedRecord Created successfully')
            setCreateRec({ name: "", affectedDate: "", recoveredDate: "", notes: "" })
        }

    }

    return (
        <div className='createRecord'>
            <div className="modal fade" id="recordModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="records">Create Record</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='POST'>
                                <div className="form-group">
                                    <label htmlFor="rname">Name</label>
                                    <input type="text" className="form-control"
                                        name="name" id="rname"
                                        value={createRec.name || ""}
                                        onChange={handleInputs}
                                        placeholder="enter name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="affectedDate">Affected Date</label>
                                    <input type="text" className="form-control"
                                        name="affectedDate" id="affectedDate"
                                        value={createRec.affectedDate || ""}
                                        onChange={handleInputs}
                                        placeholder="enter affected Date" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recoveredDate">Recovered Date</label>
                                    <input type="text" className="form-control"
                                        name='recoveredDate' id="recoveredDate"
                                        value={createRec.recoveredDate || ""}
                                        onChange={handleInputs}
                                        placeholder="enter recovered Date" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="notes">Notes</label>
                                    <input type="text" className="form-control"
                                        name='notes' id="notes"
                                        value={createRec.notes || ""}
                                        onChange={handleInputs}
                                        placeholder="enter notes (if any)" />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={recordData}>Save</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRecord