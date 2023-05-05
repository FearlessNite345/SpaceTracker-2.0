const loading = document.getElementById("loading")
const launchName = document.getElementById("nextLaunchName")
const launchDescription = document.getElementById("nextLaunchDescription")
const launchDate = document.getElementById("nextLaunchDate")
const launchCountdown = document.getElementById("countdown")

let currentNextLaunch = null
let upcomingLaunches = null

loadData()

setInterval(() => {
    console.log('10min passed')
}, (1000 * 60) * 10);

async function loadData(){
    const data = await window.API.loadAPIData()
    document.title = "SpaceTracker"

    currentNextLaunch = data.result[0]
    upcomingLaunches = data.result
    
    launchName.innerHTML = currentNextLaunch.name;
    launchDescription.innerHTML = `Description: ${currentNextLaunch.misson_description != null ? currentNextLaunch.misson_description : currentNextLaunch.launch_description}`
    launchDate.innerHTML = `Scheduled for: ${currentNextLaunch.date_str}`

    upcomingLaunches.forEach(launch => {
      if(launch.name == currentNextLaunch.name) return;
      createLaunchCard(launch)
    });

    loading.style.display = "none"
}

function createLaunchCard(launch) {
  const upcomingLaunchesList = document.getElementById("upcomingList")

  const col = document.createElement("div")
  col.classList.add(['col'])
  const card = document.createElement("div")
  card.classList.add('card', 'h-100', 'text-light')
  card.style.backgroundColor = '#131517'
  col.appendChild(card)
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  card.appendChild(cardBody)

  const name = document.createElement('h5')
  name.classList.add('card-title')
  name.innerHTML = launch.name
  cardBody.appendChild(name)

  const date = document.createElement('p')
  date.classList.add('card-text')
  date.innerHTML = `Scheduled for: ${launch.date_str}`
  cardBody.appendChild(date)

  /*launch.tags.forEach(tag => {    
    const badge = document.createElement('span')
    badge.classList.add('badge', 'bg-primary')
    badge.innerHTML = tag.text
    cardBody.appendChild(badge)
  });*/

  const moreInfoBtn = document.createElement('button')
  moreInfoBtn.classList.add('btn', 'btn-primary')
  moreInfoBtn.type = 'button'
  moreInfoBtn.innerHTML = 'More Info'
  moreInfoBtn.onclick = showMoreInfo
  cardBody.appendChild(moreInfoBtn)

  upcomingLaunchesList.appendChild(col)
}

function showMoreInfo() {
  const modal = document.getElementById('ModelInfo')
  
}

setInterval(() => {
    countdownTimer(currentNextLaunch.t0)
}, 1000)

function countdownTimer(t0) {
    const difference = +new Date(t0) - +new Date();
    let remaining = "Liftoff!";
  
    if (difference > 0) {
      const parts = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      remaining = Object.keys(parts).map(part => {
      return `${parts[part]} ${part}`;  
      }).join(" ");
    }
  
    document.getElementById("countdown").innerHTML = remaining;
}