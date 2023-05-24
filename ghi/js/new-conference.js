window.addEventListener("DOMContentLoaded", async() => {
    const locationURL = 'http://localhost:8000/api/locations/';

    const locationSelect = document.getElementById("location");
    const locationResponse = await fetch(locationURL)
    if(locationResponse.ok){
        const data = await locationResponse.json();

        for(const location of data.locations){
            const option = document.createElement('option');
            option.innerHTML = location.name;
            option.value = location.id;
            locationSelect.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event =>{
        event.preventDefault();

        const formData = new FormData(formTag);
        const dataObject = Object.fromEntries(formData);
        let dataChecker = ""

        const fetchOptions = {
            method:'post',
            body:JSON.stringify(dataObject),
            headers:{
                'Content-Type':'application/json'
            }
        }

        const conferenceUrl = "http://localhost:8000/api/conferences/"
        const newConferenceResponse = await fetch(conferenceUrl, fetchOptions);
        if(newConferenceResponse.ok){
            formTag.reset();
        }
    })
});
