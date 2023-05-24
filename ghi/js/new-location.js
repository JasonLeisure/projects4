window.addEventListener("DOMContentLoaded", async() => {
    const stateURL = 'http://localhost:8000/api/states/';

    const stateSelect = document.getElementById("state");
    const stateResponse = await fetch(stateURL)
    if(stateResponse.ok){
        const data = await stateResponse.json();

        for(const state of data.states){
            const option = document.createElement('option');
            option.innerHTML = state.name;
            option.value = state.abbreviation;
            stateSelect.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event =>{
        event.preventDefault();

        const formData = new FormData(formTag);
        const dataObject = Object.fromEntries(formData);
        let dataChecker = ""
        for (const[key, value] of formData){
            dataChecker += `${key}:${value}\n`
        }

        const fetchOptions = {
            method:'post',
            body:JSON.stringify(dataObject),
            headers:{
                'Content-Type':'application/json'
            }
        }

        const locationUrl = "http://localhost:8000/api/locations/"
        const newLocationResponse = await fetch(locationUrl, fetchOptions);
        if(newLocationResponse.ok){
            formTag.reset();
            const newLocation = await newLocationResponse.json();
        }
    })
});
