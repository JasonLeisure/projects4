function createCard(name, description, pictureUrl, startDateStr, endDateStr,location) {
    return `
      <div class="card" style="box-shadow:0px 5px 5px 5px #00000030">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h5>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
        ${startDateStr} - ${endDateStr}
        </div>
      </div>
      <p></p>
    `;
  }

function raiseAlarm(message){
    return `
    <div class="alert alert-warning" role="alert">
        ${message}
    </div>
    `
}
window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try{
        const response = await fetch(url);
        if(!response.ok){
            const main = document.querySelector('main');
            main.innerHTML = raiseAlarm("Invalid response.") + main.innerHTML;

        }else{
            const data = await response.json();

            const cards = [];
            for(let conference of data.conferences){
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = new Date(details.conference.starts);
                    const endDate = new Date(details.conference.ends);
                    const startDateStr = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();
                    const endDateStr = (endDate.getMonth() + 1) + "/" + endDate.getDate() + "/" + endDate.getFullYear();
                    const location = details.conference.location.name;
                    const html = createCard(title,description,pictureUrl, startDateStr,endDateStr, location);
                    cards.push(html);
                }
            }
            // console.log(cards[0]);
            // console.log(cards[1]);
            const columns = document.querySelectorAll('.col');
            let columnnum = 0;

            for(let card in cards){
                columns[columnnum].innerHTML += cards[card];
                columnnum += 1;
                if(columnnum==columns.length){
                    columnnum=0;
                }
            }

        }
    }
    catch(e){
        const main = document.querySelector('main');
        main.innerHTML = raiseAlarm(`${e} occured.`) + main.innerHTML;
    }


});
