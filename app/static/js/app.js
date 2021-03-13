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

function connect(username){
    let promise = new Promise((resolve, reject) => {
        // get token from the backend
        fetch('/login', {
            method: 'POST',
            body: JSON.stringify({'username': username})
        }).then(res => res.json()).then(data => {
            // join video call
            return Twilio.Video.connect(data.token);
        }).then(_room => {
            room = _room;
            room.participants.forEach(participantConnected);
            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);
            connected = true;
            updateParticipantCount();
            resolve();
        }).catch(() => {
            reject();
        });
    });
    return promise;
};

function updateParticipantCount(){
    if (!connected)
        count.innerHTML = 'Disconnected';
    else
        count.innerHTML = (room.participants.size + 1) + 'participants online.';
};

function participantConnected(participant){
    let participantDiv = document.createElement('div');
    participantDiv.setAttribute('id', participant.sid);
    participantDiv.setAttribute('class', 'participant');

    let tracksDiv = document.createElement('div');
    participantDiv.appendChild(tracksDiv);

    let labelDiv = document.createElement('div');
    labelDiv.innerHTML = participant.identity;
    participantDiv.appendChild(labelDiv);

    container.appendChild(participantDiv);

    participant.tracks.forEach(publication => {
        if (publication.isSubscribed)
            trackSubscribed(tracksDiv, publication.track);
    });
    participant.on('trackSubscribed', track => trackSubscribed(tracksDiv, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);

    updateParticipantCount();
};



function trackSubscribed(div, track){
    div.appendChild(track.attach());
};

function trackUnsubscribed(track){
    track.detach().forEach(element => element.remove());
};

addLocalVideo();
button.addEventListener('click', connectButtonHandler);