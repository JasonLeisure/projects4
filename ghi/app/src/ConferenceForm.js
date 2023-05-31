import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {
	const [name, setName] = useState('');
	const [starts, setStarts] = useState('');
	const [ends, setEnds] = useState('');
	const [description, setDescription] = useState('');
	const [presentations, setPresentations] = useState('');
	const [attendees, setAttendees] = useState('');
	const [locations, setLocations] = useState([]);
    const [location , setLocation] = useState('')
	const fetchData = async () => {
		const url = 'http://localhost:8000/api/locations/';

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
            console.log(data)
		}
	};

	const handleNameChange = (e) => {
		const value = e.target.value;
		setName(value);
	};
	const handleStartsChange = (e) => {
		const value = e.target.value;
		setStarts(value);
	};

	const handleEndsChange = (e) => {
		const value = e.target.value;
		setEnds(value);
	};
	const handleDescriptionChange = (e) => {
		const value = e.target.value;
		setDescription(value);
	};

	const handlePresentationsChange = (e) => {
		const value = e.target.value;
		setPresentations(value);
	};

	const handleAttendeesChange = (e) => {
		const value = e.target.value;
		setAttendees(value);
	};

	const handleLocationChange = (e) => {
		const value = e.target.value;
		setLocation(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.name = name;
		data.description = description;
		data.max_presentations = presentations;
		data.max_attendees = attendees;
		data.starts = starts;
		data.ends = ends;
		data.location = location;
		console.log('data', data);

		const conferenceUrl = 'http://localhost:8000/api/conferences/';
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(conferenceUrl, fetchConfig);
		if (response.ok) {
			const newLocation = await response.json();
			setName('');
			setStarts('');
			setEnds('');
			setDescription('');
			console.log('new location ',newLocation);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="row">
				<div className="offset-3 col-6">
					<div className="shadow p-4 mt-4">
						<h1>Create A New Conference</h1>
						<form onSubmit={handleSubmit} id="create-location-form">
							<div className="form-floating mb-3">
								<input
									onChange={handleNameChange}
									value={name}
									name="name"
									placeholder="Name"
									required
									type="text"
									id="name"
									className="form-control"
								/>
								<label htmlFor="name">Name</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleStartsChange}
									value={starts}
									name="starts"
									placeholder="mm/dd/yyyy"
									required
									type="date"
									id="starts"
									className="form-control"
								/>
								<label htmlFor="date">Starts</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleEndsChange}
									value={ends}
									name="ends"
									placeholder="mm/dd/yyyy"
									required
									type="date"
									id="ends"
									className="form-control"
								/>
								<label htmlFor="ends">Ends</label>
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Details
								</label>
								<textarea
									onChange={handleDescriptionChange}
									value={description}
									name="description"
									className="form-control"
									id="description"
									rows="3"
								></textarea>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handlePresentationsChange}
									value={presentations}
									name="max_presentations"
									placeholder="Maximum presentations"
									required
									type="number"
									id="max_presentations"
									className="form-control"
								/>
								<label htmlFor="max_presentations">Maximum presentations</label>
							</div>
							<div className="form-floating mb-3">
								<input
									onChange={handleAttendeesChange}
									value={attendees}
									name="max_attendees"
									placeholder="Maximum attendees"
									required
									type="number"
									id="max_attendees"
									className="form-control"
								/>
								<label htmlFor="max_attendees">Maximum attendees</label>
							</div>
							<div className="mb-3">
							<select onChange={handleLocationChange} value={location.name} name="location" id="location" className="form-select">
								<option value=''>Choose a Location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.name}
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
		</>
	);
}

export default ConferenceForm;
