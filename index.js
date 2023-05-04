const loading = document.getElementById("loading")
const launchName = document.getElementById("nextLaunchName")
const launchDescription = document.getElementById("nextLaunchDescription")
const launchDate = document.getElementById("nextLaunchDate")
const launchCountdown = document.getElementById("countdown")

let currentNextLaunch = null
let upcomingLaunches = null

loadData()

setInterval(() => {
    
}, (1000 * 60) * 10);

async function loadData(){
    const data = await window.API.loadData()
    document.title = "SpaceTracker"

    currentNextLaunch = data.result[0]
    upcomingLaunches = data.result
    
    launchName.innerHTML = currentNextLaunch.name;
    launchDescription.innerHTML = `Description: ${currentNextLaunch.misson_description != null ? currentNextLaunch.misson_description : currentNextLaunch.launch_description}`
    launchDate.innerHTML = `Scheduled for: ${currentNextLaunch.date_str}`

    upcomingLaunches.forEach(launch => {
        console.log(launch.name)
    });

    loading.style.display = "none"
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