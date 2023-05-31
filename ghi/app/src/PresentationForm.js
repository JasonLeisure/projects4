import React, { useEffect, useState } from 'react';

function PresentationForm(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [company , setCompany] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [conference, setConference] = useState('')

  const [conferences, setConferences] = useState([])
  const fetchData = async () => {
    const url = 'http://localhost:8000/api/conferences/';

		const response = await fetch(url);

		if (response.ok) {
      const data = await response.json();
			setConferences(data.conferences);
      console.log("conferences", conferences)
		}
	};

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
  }
  const handleCompanyChange = (e) => {
    const value = e.target.value
    setCompany(value)
  }
  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value)
  }
  const handleSynopsisChange = (e) => {
    const value = e.target.value
    setSynopsis(value)
  }
  const handleConferenceChange = (e) => {
    const value = e.target.value
    setConference(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.presenter_name = name;
    data.company_name = company;
    data.presenter_email = email
    data.synopsis = synopsis
    data.title = title;
    data.conference = conference;
    console.log(data);

	const presentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
	const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(presentationUrl, fetchConfig);
  if (response.ok) {
    const newPresentation = await response.json();
    setName('');
    setEmail('');
    setCompany('');
    setTitle('');
    setSynopsis('');
    setConference('');

    console.log('Conference', newPresentation);
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
						<h1>Create a new presentation</h1>
						<form onSubmit={handleSubmit} id="create-presentation-form">
							<div className="form-floating mb-3">
								<input
                onChange={handleNameChange}
                value={name}
									placeholder="Presenter name"
									required
									type="text"
									name="presenter_name"
									id="presenter_name"
									className="form-control"
								/>
								<label htmlFor="presenter_name">Presenter name</label>
							</div>
							<div className="form-floating mb-3">
								<input
                onChange={handleEmailChange}
                value={email}
									placeholder="Presenter email"
									required
									type="email"
									name="presenter_email"
									id="presenter_email"
									className="form-control"
								/>
								<label htmlFor="presenter_email">Presenter email</label>
							</div>
							<div className="form-floating mb-3">
								<input
                onChange={handleCompanyChange}
                value={company}
									placeholder="Company name"
									type="text"
									name="company_name"
									id="company_name"
									className="form-control"
								/>
								<label htmlFor="company_name">Company name</label>
							</div>
							<div className="form-floating mb-3">
								<input
                onChange={handleTitleChange}
                value={title}
									placeholder="Title"
									required
									type="text"
									name="title"
									id="title"
									className="form-control"
								/>
								<label htmlFor="title">Title</label>
							</div>
							<div className="mb-3">
								<label htmlFor="synopsis">Synopsis</label>
								<textarea
                onChange={handleSynopsisChange}
                value={synopsis}
									id="synopsis"
									rows="3"
									name="synopsis"
									className="form-control"
								></textarea>
							</div>
							<div className="mb-3">
								<select
									onChange={handleConferenceChange}
									value={conference.id}
									name="conference"
									id="conference"
									className="form-select"
									required
								>
									<option value="">Choose a conference</option>
									{conferences.map((conference) => {
										return (
											<option key={conference.id} value={conference.id}>
												{conference.name}
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

export default PresentationForm;
