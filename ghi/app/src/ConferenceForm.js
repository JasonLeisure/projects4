import React, { useEffect, useState } from 'react';

function ConferenceForm() {
    const [name, setName] = useState('');
    const [starts, setStartDate] = useState('');
    const [ends, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [max_presentations, setPre] = useState('');
    const [max_attendees, setAtt] = useState('');
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStartDateChange = (event) => {
        const value = event.target.value;
        setStartDate(value);
    }
    const handleEndDateChange = (event) => {
        const value = event.target.value;
        setEndDate(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const handlePresentationsChange = (event) => {
        const value = event.target.value;
        setPre(value);
    }
    const handleAttendeesChange = (event) => {
        const value = event.target.value;
        setAtt(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            // setLocations(
            //     data.locations.map(loc => ({ "id": loc.id, "name": loc.name }))
            // )
            setLocation(data.locations)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty JSON object
        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description
        data.max_presentations = max_presentations;
        data.max_attendees = max_attendees;
        data.location = location;

        console.log(location);
        console.log(data);
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConf = await response.json();
            console.log(newConf);

            setAtt('');
            setPre('');
            setDescription('');
            setEndDate('');
            setLocation('');
            setName('');
        }
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input placeholder="Name" onChange={handleNameChange} required value={name} type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating date mb-3">
                            <input placeholder="Starts" onChange={handleStartDateChange} required value={starts} type="date" id="starts" name="starts" className="form-control" />
                            <label htmlFor="starts">Starts</label>
                        </div>
                        <div className="form-floating date mb-3">
                            <input placeholder="Ends" onChange={handleEndDateChange} required value={ends} type="date" id="ends" name="ends" className="form-control" />
                            <label htmlFor="ends">Ends</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea placeholder="Description" onChange={handleDescriptionChange} value={description} required type="text" id="description" name="description"
                                className="form-control">
                            </textarea>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Maximum presentations" onChange={handlePresentationsChange} value={max_presentations} required type="number" name="max_presentations"
                                id="max_presentations" className="form-control" />
                            <label htmlFor="maximum_presentations">Maximum presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Maximum attendees" onChange={handleAttendeesChange} required value={max_attendees} type="number" name="max_attendees"
                                id="max_presentations" className="form-control" />
                            <label htmlFor="maximum_attendees">Maxmium attendees</label>
                        </div>
                        <div className="mb-3">
                            <select required onChange={handleLocationChange} value={location} name="location" id="location" className="form-select">
                            <option value="">Choose a location</option>
                                {locations.map(loc => {
                                    return (
                                        <option key={loc.id} value={loc.id}>
                                            {loc.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConferenceForm;
