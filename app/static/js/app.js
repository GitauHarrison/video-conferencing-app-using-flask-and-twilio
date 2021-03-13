let connected = false;
const usernameInput = document.getElementById('username');
const button = document.getElementById('join');
const leave_call = document.getElementById('leave');
const container = document.getElementById('video_container');
const count = document.getElementById('count');
let room;

function addLocalVideo(){
    Twilio.Video.createLocalVideoTrack().then(track => {
        let video = document.getElementById('local').firstChild;
        video.appendChild(track.attach());
    });
};

function connectButtonHandler(event){
    event.preventDefault();
    if (!connected) {
        let username = usernameInput.value;
        if (!username){
            alert('Enter your username before connecting');
            return;
        }
        button.disabled = true;
        button.innerHTML = 'Connecting...';
        window.location='/home';
        connect(username).then(() => {
            leave_call.innerHTML = 'Leave Call';
            button.disabled = false;
        }).catch(() => {
            alert('Connection failed. Is the backend working?');
            button.innerHTML = 'Join Call';
            button.disabled = false;
            window.location='/join';
        });
    }
    else{
        disconnect();
        button.innerHTML = 'Join Call';
        window.location='/join';
        connected = false;
    }
};

addLocalVideo();
button.addEventListener('click', connectButtonHandler);