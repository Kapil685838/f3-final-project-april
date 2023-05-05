const userIP = GetUserIP();
const accessToken = 'e9a017b02abb0a';
const getDataBtn = document.getElementById('get-data');
const getData = document.getElementById('get-data');

let lat = document.getElementById('lat');
let city = document.getElementById('city');
let organisation = document.getElementById('Organisation');
let long = document.getElementById('Long');
let region = document.getElementById('Region');

const map = document.getElementById('map');

const timeZone = document.getElementById('time-zone');
const dateTime = document.getElementById('date-time');
const pincode = document.getElementById('pincode');
const message = document.getElementById('message');

const postOfficesList = document.getElementById('post-offices-list');

document.getElementById('ip').innerHTML = userIP;

function GetUserIP(){
    var ret_ip;
    $.ajaxSetup({async: false});
    $.get('http://jsonip.com/', function(r){ 
        ret_ip = r.ip; 
    });
    return ret_ip;
}

getDataBtn.addEventListener('click', fetchData);
function fetchData() {
    fetch(`https://ipinfo.io/${userIP}/json?token=${accessToken}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        lat.innerHTML = `Lat : ${data.loc.split(',')[0]}`;
        long.innerHTML = `Long : ${data.loc.split(',')[1]}`;
        city.innerHTML = `City : ${data.city}`;
        organisation.innerHTML = `Organisation : ${data.org}`;
        region.innerHTML = `Region : ${data.region}`;
        map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.loc.split(',')[0]}, ${data.loc.split(',')[1]}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;

        timeZone.innerHTML = data.timezone;
        const today = new Date();
        dateTime.innerHTML = today.toISOString().split('T')[0] + " & " + today.toISOString().split('T')[1];
        pincode.innerHTML = data.postal;
        
        return data.postal;
    })
    .then((pincode) => {
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then((postalRes) => postalRes.json())
            .then((postalData) => {
                console.log(postalData);
                message.innerHTML = postalData[0].Message;
                const postOffices = postalData[0].PostOffice;
                console.log(postOffices);
                postOffices.forEach((post) => {
                    postOfficesList.innerHTML += `<div class="post-office">
                    <div class="post-office-name">Name : ${post.Name}</div>
                    <div class="branch-type">Branch Type : ${post.BranchType}</div>
                    <div class="delivery-status">Delivery Status : ${post.DeliveryStatus}</div>
                    <div class="district">District : ${post.District}</div>
                    <div class="division">Division : ${post.Division}</div>
                </div>`
                })
            })
            .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

fetchData();

function updatePostOffices() {
    
}