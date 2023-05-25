window.addEventListener('DOMContentLoaded', async () => {
  const selectTag = document.getElementById('conference');

  const url = 'http://localhost:8000/api/conferences/';
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement('option');
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }
  }

  document.getElementById('loading-conference-spinner').classList.add("d-none");
  document.getElementById('conference').classList.remove("d-none");

  const formTag = document.getElementById('create-attendee-form');
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

      const attendeeUrl = `http://localhost:8001/api/attendees/`;
      const newAttendeeResponse = await fetch(attendeeUrl, fetchOptions);
      if(newAttendeeResponse.ok){
          formTag.reset();
      }
      formTag.classList.add("d-none");
      document.getElementById('success-message').classList.remove("d-none");
})
});
