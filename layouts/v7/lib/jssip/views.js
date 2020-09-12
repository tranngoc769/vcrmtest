var ViewController = ViewController || {};
var CallModalController = (function() {
            function CallModalController() {
                this.trans = { contactid: "Contact ID", contact_no: "Contact Number", accountid: "Account ID", salutation: "Salutation", email: "Email", phone: "Phone", mobile: "Mobile Phone", title: "Tile", department: "Department", fax: "Fax", reportsto: "Reports To", training: "Training", usertype: "User type", contacttype: "Contact Type", otheremail: "Other Email", secondaryemail: "Secondary Email", donotcall: "Do not call", emailoptout: "Email OTP out", imagename: "Image Name", reference: "Reference", notify_owner: "Notify Owner", isconvertedfromlead: "Is convert from lead", tags: "Tags", contactaddressid: "Contact Address ID", mailingcity: "Mailing City", mailingstreet: "Mailing Street", mailingcountry: "Mailing Country", othercountry: "Other Country", mailingstate: "Mailing State", mailingpobox: "Mailing Pobox", othercity: "Other City", otherstate: "Other State", mailingzip: "Mailing Zip", otherzip: "Other Zip", otherstreet: "Other Street", otherpobox: "Other Pobox", contactsubscriptionid: "Contact subscription ID", homephone: "Home Phone", otherphone: "Other Phone", assistant: "Assistant", assistantphone: "Assistant Phone", birthday: "Birthday", laststayintouchrequest: "Last stay intouch request", laststayintouchsavedate: "Last stay intouch save date", leadsource: "Lead source" };
                this.basic = ['firstname', 'lastname', 'phone', 'account_id', 'title', 'department', 'birthday', 'assigned_user_id', 'createdtime', 'notify_owner', 'modifiedtime'];
                this.contact = ['contact_no', 'mobile', 'homephone', 'otherphone', 'fax', 'secondaryemail', 'emailoptout', 'email', 'assistantphone', 'assistant'];
                this.moreInfo = ['reference', 'contact_id', 'description', 'portal', 'support_start_date', 'support_end_date', 'isconvertedfromlead', 'source', 'donotcall', 'leadsource'];
                this.address = ['mailingstreet', 'otherstreet', 'mailingpobox', 'otherpobox', 'mailingcity', 'othercity', 'mailingstate', 'otherstate', 'mailingzip', 'otherzip', 'mailingcountry', 'othercountry'];
                this.totalSeconds = 0;
                this.timerRunning = false;
                this.call_control_panel = $("#call-control-panel");
                this.modal = $('#call-modal');
                this.timer;
            }

            CallModalController.prototype.setRecordingSrc = function(recordingUrl) {
                document.getElementById("recording-player").src = recordingUrl;
            }
            CallModalController.prototype.changeModal = function(type) {
                // type = 1 --> Calling Modal
                // type = 2 --> Incomming Call Modal
                // type = 3 --> Play Recording Modal
                if (type == 1) {
                    this.call_control_panel = $("#call-control-panel");
                    this.modal = $('#call-modal');
                    this.call_title = $('#call-body');
                } else if (type == 2) {
                    var element = document.getElementById("incomming-modal");
                    if (typeof(element) != 'undefined' && element != null) {
                        element.remove();
                    }
                    var modal = document.createElement('div');
                    document.body.appendChild(modal);
                    // modal.setAttribute("id", "incomming-modal");
                    modal.setAttribute("class", "main-body");
                    modal.innerHTML =
                        `
                <div class="call-min-panel"></div>
                <div id="incomming-modal" class="modal">
                    
                </div>
                   `;
                    this.modal = $('#incomming-modal');
                } else {
                    var element = document.getElementById("playRecording-modal");
                    if (typeof(element) != 'undefined' && element != null) {
                        element.remove();
                    }
                    var modal = document.createElement('div');
                    document.body.appendChild(modal);
                    modal.setAttribute("id", "playRecording-modal");
                    modal.setAttribute("class", "modal fade");
                    modal.setAttribute("tabindex", "-1");
                    modal.setAttribute("role", "dialog");
                    modal.innerHTML = `
            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                    <div class="modal-header">
                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                      aria-hidden="true">&times;</span></button>
                                          <h4 class="modal-title">Play Recording</h4>
                                    </div>
                                    <div class="modal-body">
                                          <div class="container-fluid">
                                            <audio controls id="recording-player" style="width: -webkit-fill-available;" autoplay="true">
                                                <source type="audio/mpeg">
                                            </audio>                                            
                                          </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
            `
                    this.modal = $('#playRecording-modal');
                    this.modal.on("hidden.bs.modal", function() {
                        document.getElementById("recording-player").src = "";
                    });
                }
            }
            CallModalController.prototype.vtranslate = function(key) {
                return this.trans[`${key}`];
            }
            CallModalController.prototype.showModal = function() {
                this.modal.modal({ backdrop: false, keyboard: false });
            }
            CallModalController.prototype.connecting = function(number) {
                $('#calling_title').text('Calling : ');
                $('#calling_number').text(`${number}`);
                this.call_control_panel.empty();
                this.call_control_panel.append(`
			<button class="callingCtlBtn"  onclick="mute(this);">
				<img src="./layouts/v7/lib/jssip/icon/unmute.png" title="Mute"/>
			</button>
			<button class="callingCtlBtn" onclick="terminate();">
				<img src="./layouts/v7/lib/jssip/icon/hangup.png" title="Hangup"/>
			</button>
        `)
            }
            CallModalController.prototype.incomming = function(json) {
                    var keys = Object.keys(json);
                    var basicBlock = "",
                        addressBlock = "",
                        contactBlock = "",
                        moreinfoBlock = "";
                    for (var i = 0; i < keys.length; i++) {
                        var value = json[`${keys[i]}`];
                        if (json[`${keys[i]}`] == null || json[`${keys[i]}`] == "") {
                            json[`${keys[i]}`] = "None";
                        } else if (json[`${keys[i]}`] == 0) {
                            json[`${keys[i]}`] = "No";
                        } else if (json[`${keys[i]}`] == 1) {
                            json[`${keys[i]}`] = "Yes"
                        }
                        if (this.basic.includes(keys[i])) {
                            basicBlock += `
                <div class="col-md-6">
                <div class="detail-info">
                    <label class="detail-header">${this.trans[`${keys[i]}`]}</label>
                    <label class="detail-value">${ json[`${keys[i]}`]}
                    </label>
                </div>
                </div>`
            }
            if (this.address.includes(keys[i]))
            {
                addressBlock += `
                <div class="col-md-6">
                <div class="detail-info">
                <label class="detail-header">${this.trans[`${keys[i]}`]}</label>
                    <label class="detail-value">${ json[`${keys[i]}`]}
                    </label>
                </div>
                </div>`
            }
            if (this.moreInfo.includes(keys[i]))
            {
                moreinfoBlock += `
                <div class="col-md-6">
                <div class="detail-info">
                <label class="detail-header">${this.trans[`${keys[i]}`]}</label>
                    <label class="detail-value">${ json[`${keys[i]}`]}
                    </label>
                </div>
                </div>`
            }
            if (this.contact.includes(keys[i]))
            {
                contactBlock += `
                <div class="col-md-6">
                <div class="detail-info">
                <label class="detail-header">${this.trans[`${keys[i]}`]}</label>
                    <label class="detail-value">${ json[`${keys[i]}`]}
                    </label>
                </div>
                </div>`
            }
        }
        var body = 
        `
        <div class="container customer-info">
                        <div class="modal-control">
                            <p id = "ibcalling_title" class="item left"></p>
                            <p id = "ibcalling_number" class="item callnumber"></p>
                            <img id="closeButton" class="item" src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/close.png">
                            <img id="ibminimizeButton" class="item minimize" src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/min.png">
                        </div>
                        <div class="call-row">
                            <div class="col-md-3 call-keypad">
                                <div class="numpad">
                                        <div class="keypad-row">
                                        <img src="http://113.164.246.27/vtigercrm/layouts/v7/lib/jssip/icon/logo.png" alt="TEL4VN">
                                        </div>
                                        <div class="keypad-row">
                                            <input class="numpad-input" id="numpad-input"></input>
                                        </div>
                                        <div class="keypad-row">
                                            <a class="number effect-shine" href="#">1</a>
                                            <a class="number effect-shine" href="#">2</a>
                                            <a class="number effect-shine" href="#">3</a>
                                        </div>
                                        <div class="keypad-row">
                                            <a class="number effect-shine" href="#">4</a>
                                            <a class="number effect-shine" href="#">5</a>
                                            <a class="number effect-shine" href="#">6</a>
                                        </div>
                                        <div class="keypad-row">
                                            <a class="number effect-shine" href="#">7</a>
                                            <a class="number effect-shine" href="#">8</a>
                                            <a class="number effect-shine" href="#">9</a>
                                        </div>
                                        <div class="keypad-row">
                                            <a class="number effect-shine" href="#">*</a>
                                            <a class="number effect-shine" href="#">0</a>
                                            <a class="number effect-shine" href="#">#</a>
                                        </div>
                                        <div class="keypad-row">
                                            <div class="number call effect-shine" id="ib-time-value">
                                                00:00:00
                                            </div>
                                        </div>
                                    </div>
                            </div>
                                <div class="col-md-9 customer-information">
                                    <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#basic-information" role="tab" aria-controls="home" aria-selected="true">Basic</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#contact-information" role="tab" aria-controls="profile" aria-selected="false">Contact</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#address-detail" role="tab" aria-controls="profile" aria-selected="false">Address</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#des-detail" role="tab" aria-controls="profile" aria-selected="false">More</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane fade show active" id="basic-information" role="tabpanel" aria-labelledby="home-tab">
                                            <h3 class="customer-info-heading">Basic Infomation</h3>
                                            <div class="call-row info-panel">
                                                    ${basicBlock}
                                            </div>
                                        </div>
                                        <div class="tab-pane fade show" id="contact-information" role="tabpanel" aria-labelledby="profile-tab">
                                            <h3 class="customer-info-heading">More Information</h3>
                                            <div class="call-row info-panel">
                                                 ${moreinfoBlock}
                                            </div>
                                        </div>
                                        <div class="tab-pane fade show" id="address-detail" role="tabpanel" aria-labelledby="profile-tab">
                                            <h3 class="customer-info-heading">Portal Detail</h3>
                                            <div class="call-row info-panel">
                                                ${contactBlock}
                                            </div>
                                        </div>
                                        <div class="tab-pane fade show" id="des-detail" role="tabpanel" aria-labelledby="profile-tab">
                                            <h3 class="customer-info-heading">Customer Address</h3>
                                            <div class="call-row info-panel">
                                            ${addressBlock}
                                            </div>
                                        </div>
                                        <div class="call-control-panel" id = "incomming-control-panel">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        // this.call_title.append(`<label class="call-body-label">${json}</label>`);
        this.call_control_panel = $("#incomming-control-panel");
        $("#incomming-modal").append(body);
        this.call_control_panel.empty();
        this.call_control_panel.append(`
			<button class="callingCtlBtn" onclick="answer();">
				<img src="./layouts/v7/lib/jssip/icon/call.png" title="Mute"/>
			</button>
			<button class="callingCtlBtn" onclick="terminate();">
				<img src="./layouts/v7/lib/jssip/icon/hangup.png" title="Hangup"/>
			</button>
        `)
    }
    CallModalController.prototype.accepted = function () {
        this.call_control_panel.empty();
        this.call_control_panel.append(`
			<button class="callingCtlBtn">
				<img src="./layouts/v7/lib/jssip/icon/speaker.png" />
            </button>
			<button class="callingCtlBtn" onclick="terminate();">
				<img src="./layouts/v7/lib/jssip/icon/hangup.png" title="Hang up"/>
            </button>
			<button class="callingCtlBtn" onclick = "hold(this)">
				<img src="./layouts/v7/lib/jssip/icon/hold.png" title="Hold" />
            </button>
			<button class="callingCtlBtn" onclick="mute(this);">
				<img src="./layouts/v7/lib/jssip/icon/unmute.png" title="Mute"/>
			</button>
        `)
    }
    CallModalController.prototype.failed = function (guest, type) {
        var today = new Date();
        var y = today.getFullYear();
        var mt = (today.getMonth() + 1);
        var d = today.getDate();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        if (mt < 10) mt = "0" + mt;
        if (d < 10) d = "0" + d;
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;
        var dateTime = d + "/" + mt + "/" + y + " " + h + ":" + m + ":" + s;
        if (type == 1) {
            this.call_title.append(`<label class="call-body-label">Missed call from ${guest}.<label class="timer-label" >${dateTime}</label></label>`);
        }
        else if (type == 2) {
            this.call_title.append(`<label class="call-body-label">Canceled call to ${guest}.<label class="timer-label" >${dateTime}</label></label>`);
        }
        this.call_control_panel.empty();
        this.call_control_panel.append(`
        <button class="callingCtlBtn" onclick="closeModal();">
            <img src="./layouts/v7/lib/jssip/icon/closecall.png"  title="Close"/>
        </button>
        <button class="callingCtlBtn" onclick="recall(${guest});">
            <img src="./layouts/v7/lib/jssip/icon/call.png" title="Redial"/>
        </button>
        `)
    }
    CallModalController.prototype.showProgress = function (string) {
        this.call_title.text(`${string}`);
    }
    CallModalController.prototype.callend = function (totalSeconds, guest) {
        var s = viewController.Pad(totalSeconds % 60);
        var m = viewController.Pad(parseInt(totalSeconds / 60));
        var h = viewController.Pad(parseInt(totalSeconds / 3600));
        // this.call_title.append(`<label class="call-body-label" id="time-value">The calling was ended.<label class="timer-label" >${h}:${m}:${s}</label></label>`);
        this.call_control_panel.empty();
        this.call_control_panel.append(`
        <button class="callingCtlBtn" onclick="closeModal();">
            <img src="./layouts/v7/lib/jssip/icon/closecall.png"  title="Close"/>
        </button>
        <button class="callingCtlBtn" onclick="recall(${guest});">
            <img src="./layouts/v7/lib/jssip/icon/call.png" title="Redial"/>
        </button>
        `)
    }
    CallModalController.prototype.timerLabel = function (direction, string) {
        if (direction==='incomming')
        {
        }
        else
        {
            $('#ob-time-value').text(`${string}`);
        }
        // this.call_title.children()[0].innerHTML = `<label class="call-body-label" id="time-value"></label>`;
        //     
        // console.log(this.totalSeconds);
        // this.timer = setInterval(function () {
        //     console.log(this.totalSeconds);
        //     if (this.timerRunning) {
        //         this.totalSeconds = this.totalSeconds + 1;
        //         var s = this.Pad(this.totalSeconds % 60);
        //         var m = this.Pad(parseInt(this.totalSeconds / 60));
        //         var h = this.Pad(parseInt(this.totalSeconds / 3600));
        //         this.call_title.children()[0].innerHTML = `<label class="call-body-label" id="time-value">${h}:${m}:${s}</label>`;
        //     }
        // }, 1000);
    }
    CallModalController.prototype.Pad = function (val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
    CallModalController.prototype.getTotalTime = function () {
        return this.totalSeconds;
    }
    return CallModalController;
})();
ViewController.CallModalController = CallModalController;