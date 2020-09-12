// Extension + Password get from Vtiger
//
const rootPath = "http://113.164.246.27/vtigercrm";
var viewController = new ViewController.CallModalController();
var infocall = getInfocall();
var username = infocall['username'];
var password = infocall['password'];
var domain = infocall['domain'];
var proxy = infocall['proxy'];
var port = infocall['port'];
var session, timer, number, useDialpad = false;
var pause = false,
    isRegister = false;
var ringgingAudio = new window.Audio(rootPath + "/layouts/v7/lib/jssip/sound/ringing.mp3");
var incomingCallAudio = new window.Audio(rootPath + "/layouts/v7/lib/jssip/sound/incomming.mp3");

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function reduceNumberPhone(num) {
    if (num[0] !== '0' && num[0] !== '+') { return num; }
    if (num[0] === '0') {
        num = num.substr(1);
    } else if (num[0] === '+') {
        num = num.substr(3);
    }
    return reduceNumberPhone(num);
}

incomingCallAudio.loop = true;
ringgingAudio.loop = true;
incomingCallAudio.crossOrigin = "anonymous";
ringgingAudio.crossOrigin = "anonymous";
var remoteAudio = new window.Audio();
remoteAudio.autoplay = true;
remoteAudio.crossOrigin = "anonymous";
var addEvent = function(UA) {
    UA.on('registered', function(e) {
        isRegister = true;
        console.log("EVENT : registered")
    });
    UA.on('unregistered', function(e) {
        isRegister = false;
        console.log("EVENT : unregistered")
    });
    UA.on('registrationFailed', function(e) {
        isRegister = false;
        console.log("EVENT : registrationFailed");
        console.log(e);
    });
    UA.on('registrationExpiring', function(e) {
        isRegister = false;
        console.log("EVENT : registrationExpiring")
    });
    UA.on('connecting', function(e) {});
    UA.on('connected', function(e) { console.log("EVENT : connected") });
    UA.on('disconnected', function(e) { console.log("EVENT : disconnected") });
    UA.on('newRTCSession', function(ev) {
        if (session) { // hangup any existing call
            session.terminate();
        }
        session = ev.session;
        // session = newSession;
        var completeSession = function(e) {
            session = null;
        };
        var fix40sec = null;
        session.on('icecandidate', function(candidate, ready) {
            if (fix40sec != null)
                clearTimeout(fix40sec);
            fix40sec = setTimeout(candidate.ready, 5000);
        });
        session.on('ended', function(e) {
            if (useDialpad) {
                makeToast('End call');
                console.log(totalSeconds);
                hangUpCall();
            } else {
                clearInterval(timer);
                viewController.callend(totalSeconds, number);
            }
            var uuid = session._ua._transport.calluuid;
            if (uuid != "" || uuid != null) {
                // getCDRS(uuid);
                console.log("UUID : " + uuid);
                console.log('Saving to db');
            }
            session = null;
        });
        session.on('connecting', function(e) {
            if (useDialpad) {
                makeToast("Connecting");
                return;
            }
            if (session.direction !== 'incoming') {
                ringgingAudio.play();
            } else {

                // ringgingAudio.play();
            }
            viewController.showProgress("Ringing...");
        });
        session.on('failed', function(e) {
            incomingCallAudio.pause();
            ringgingAudio.pause();
            if (!useDialpad) {
                if (session.direction === "incoming") {
                    var user = session._remote_identity._uri._user;
                    viewController.failed(user, 1);
                } else if (session.direction === "outgoing") {
                    var user = session._remote_identity._uri._user;
                    viewController.failed(user, 2);
                }
            } else {
                makeToast("End call");
                hangUpCall();
            }
            session = null;
        });
        session.on('accepted', function(e) {
            incomingCallAudio.pause();
        });
        session.on('confirmed', function(e) {
            var localStream = session.connection.getLocalStreams()[0];
            var dtmfSender = session.connection.createDTMFSender(localStream.getAudioTracks()[0])
            session.sendDTMF = function(tone) {
                dtmfSender.insertDTMF(tone);
            };
            ringgingAudio.pause();
            if (useDialpad) {
                makeToast("Connected");
                callConnected();
                return;
            }
            viewController.accepted();
            totalSeconds = 0;
            timer = setInterval(function() {
                if (!pause) {
                    ++totalSeconds;
                    var s = viewController.Pad(totalSeconds % 60);
                    var m = viewController.Pad(parseInt(totalSeconds / 60));
                    var h = viewController.Pad(parseInt(totalSeconds / 3600));
                    viewController.timerLabel(session.direction, `${h}:${m}:${s}`);
                }
            }, 1000);
        });
        // Fire when newRTC establish
        session.on('peerconnection', (e) => {
            let logError = '';
            const peerconnection = e.peerconnection;
            peerconnection.onaddstream = function(e) {
                remoteAudio.srcObject = e.stream;
                remoteAudio.play();
            };
            var remoteStream = new MediaStream();
            peerconnection.getReceivers().forEach(function(receiver) {
                remoteStream.addTrack(receiver.track);
            });
        });
        // End P2P
        // Incoming Calling
        if (session.direction === 'incoming') {
            // POPUP INCOMMING
            incomingCallAudio.play();
            viewController.changeModal(2);
            var user = session._remote_identity._uri._user;
            var incommingNumber = reduceNumberPhone(user);
            var sessionID = getCookie("PHPSESSID");
            $.post(rootPath + "/CustomerInfo.php", {
                    phonenumber: incommingNumber,
                    PHPSESSID: sessionID
                },
                function(data, status) {
                    if (status == 'success') {
                        var json_data = JSON.parse(data);
                        viewController.incomming(json_data);
                        $("#incomming-modal").modal({ backdrop: false, keyboard: false });
                        console.log("show");
                    } else {
                        alert("No found user");
                    }
                });

        } else {
            session.connection.addEventListener('addstream', function(e) {
                incomingCallAudio.pause();
                remoteAudio.srcObject = e.stream;
            });
        }
        // End Incomming Calling Event
    });
    UA.on('newMessage', function(e) { console.log("EVENT : newMessage") });
}

function getCDRS(uuid) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://pitelapi02.tel4vn.com/api/v1/cdrs/${uuid}?org_name=tel4vn.com`);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var a = JSON.parse(this.response).data;
            var sessionID = getCookie("PHPSESSID");
            $.post(rootPath + "/CDRS.php", {
                    PHPSESSID: sessionID,
                    pbxmanagerid: 4,
                    direction: a.direction,
                    callstatus: a.call_status,
                    hangup_cause: a.hangup_cause,
                    starttime: a.start_stamp,
                    endtime: a.end_stamp,
                    totalduration: a.duration,
                    billduration: a.billsec,
                    recordingurl: "https://pitel02.tel4vn.com/app/xml_cdr/download.php?id=" + uuid,
                    sourceuuid: a.uuid,
                    gateway: "gateway",
                    customer: a.caller_destination,
                    user: a.caller_id_number,
                    customernumber: a.caller_destination,
                    customertype: "None",
                    tags: "None"
                },
                function(data, status) {
                    console.log("Data: " + data + "\nStatus: " + status);
                });
        };
    };
    xhttp.send();
}
var init = function(UA) {
    if (typeof username === "undefined" || username == "") return;
    try {
        if (UA.isRegistered()) {
            UA.unregister(options);
            isRegister = false;
        }
        UA.stop();
    } catch (error) {
        console.log("Already stopped")
    }
    UA.start();
    UA.register(options);
    var a = UA.registrator();
    addEvent(UA);
}
const eventHandlers = {
    'progress': function(e) {
        ringgingAudio.pause();
        console.log("PROGRESS : " + e);
    },
    'failed': function(e) { console.log("FAILDED : " + e) },
    'started': function(e) {
        var rtcSession = e.sender;
        if (rtcSession.getLocalStreams().length > 0) {
            selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
        }
        if (rtcSession.getRemoteStreams().length > 0) {
            remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
        }
    },
    'connecting': function(e) {
        console.log('UA_LOG : CONNECTING');
    },
    'accepted': function(e) {
        console.log('UA_LOG : ACCEPT');
    },
    'ended': function(e) { console.log('UA_LOG : CONNECTING'); }
};
const options = {
    'eventHandlers': eventHandlers,
    'extraHeaders': ['X-Foo: foo', 'X-Bar: bar'],
    'mediaConstraints': { 'audio': true, 'video': false },
    pcConfig: {
        iceServers: [
            { urls: ["stun:stun.l.google.com:19302"] }
        ],
    },
};
var useAudio = true;
var UA;
var msg;
if (username != "") {
    var socket = new JsSIP.WebSocketInterface('wss://' + domain + ':' + port.toString());
    var configuration = {
        display_name: username,
        sockets: socket,
        authorization_user: username,
        uri: username + '@' + 'tel4vn.com',
        password: password,
        instance_id: null,
        pcConfig: {
            iceServers: [
                { urls: ["stun:stun.l.google.com:19302"] }
            ],
        },
        // registrar_server: 'sip:tel4vn-vn01.tel4vn.com',
        session_timers: false,
    };
    UA = new JsSIP.UA(configuration);
    // JsSIP.debug.enable('JsSIP:*');
    init(UA);
}

var call = function(dialpad, number) {
    useDialpad = dialpad;
    if (!isRegister) { alert("Cannot register!"); return; }
    if (dialpad == true) {
        console.log('calling')
        UA.call(number, options, useAudio);
        return;
    }
    number = $("#callBtn").parent().children()[0].innerText;
    viewController.changeModal(1);
    $("#call-modal").modal({ backdrop: false, keyboard: false });
    viewController.connecting(number);
    var a = UA.call(number, options, useAudio);
    viewController.showProgress("Calling : ");
}

function answer() {
    session.answer(options, useAudio);
}

var terminate = function() {
    if (session == null) return;
    session.terminate({
        'extraHeaders': ['X-Foo: foo', 'X-Bar: bar'],
        'status_code': 300,
        'reason_phrase': 'reject'
    });
}

function closeModal() {
    viewController.showModal();
}

function mute(a) {
    var isMuted = session.isMuted().audio;
    // False if not muted, True if Muted
    if (isMuted) {
        // If Muted, Unmute it
        a.children[0].setAttribute('title', "Unmute");
        a.children[0].src = "./layouts/v7/lib/jssip/icon/unmute.png"
        session.unmute(
            // { 'audio': false }
        )
    } else {
        a.children[0].setAttribute('title', "Mute");
        a.children[0].src = "./layouts/v7/lib/jssip/icon/mute.png"
        session.mute(
            // { 'audio': false }
        )
    }
}
// 
function hold(a) {
    var isHold = session.isOnHold();
    //Default : false
    // False if not muted, True if Muted
    if (isHold.local) { // (icon Play) --> icon Pause
        // If isHold, unHold it
        a.children[0].setAttribute('title', "Unhold");
        a.children[0].src = "./layouts/v7/lib/jssip/icon/hold.png"
        session.unhold()
    } else {
        a.children[0].setAttribute('title', "Hold");
        a.children[0].src = "./layouts/v7/lib/jssip/icon/unhold.png"
        session.hold()
    }
}

function recall(iNumber) {
    if (!isRegister) { alert("Cannot register!"); return; }
    viewController.connecting(iNumber);
    UA.call("0" + iNumber, options, useAudio);
    viewController.showProgress("Calling...");
}

function playRecording(url) {
    viewController.changeModal(3);
    viewController.setRecordingSrc(url);
    viewController.showModal();
}