window.addEventListener("DOMContentLoaded", async() => {
    const conferenceURL = 'http://localhost:8000/api/conferences/';
    const conferenceSelect = document.getElementById("conference");
    const conferenceResponse = await fetch(conferenceURL)
    if(conferenceResponse.ok){
        const data = await conferenceResponse.json();
        for(const conference of data.conferences){
            const option = document.createElement('option');
            option.innerHTML = conference.name;
            option.value = conference.href;
            conferenceSelect.appendChild(option);
        }
    }
    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event =>{
        event.preventDefault();
        const formData = new FormData(formTag);
        const dataObject = Object.fromEntries(formData);
        const fetchOptions = {
            method:'post',
            body:JSON.stringify(dataObject),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const presentationUrl = `http://localhost:8000${dataObject.conference}presentations/`
        const newPresentationResponse = await fetch(presentationUrl, fetchOptions);
        if(newPresentationResponse.ok){
            formTag.reset();
        }
    })
});
