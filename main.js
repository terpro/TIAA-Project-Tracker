var inanim = false;
var sactive = false;
var userjson;

function initFunction() {
  var config = {
    apiKey: "AIzaSyC_hSeVGx_EdM1fId-Yo5bb120WRn0UDL4",
    authDomain: "auth.tiaapt.com",
    databaseURL: "https://tiaaprojecttracker.firebaseio.com",
    projectId: "tiaaprojecttracker",
    storageBucket: "tiaaprojecttracker.appspot.com",
    messagingSenderId: "521465993348"
  };
  firebase.initializeApp(config);
  readyFunction();
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

		  gid("username").disabled = false;
	gid("username").value = "";
	gid("password").value = "";
	
	firebase.database().ref("users/"+firebase.auth().currentUser.uid).once('value').then(function(snapshot) { {userjson = snapshot.val(); if (userjson != null) {} else {
userjson = new Array();
} afterLogin(); document.getElementById("everything_loader").style.display = "none";}})
	
	
  } else {
document.getElementById("everything_loader").style.display = "none";
    gid("login_normal").style.display = "block";
    gid("controlpanel").style.display = "none";
  gid("login_enter").style.display = "block";
gid("login_load").style.display = "none";

gid("username").disabled = false;
gid("ra_title").innerHTML = "TIAAPT Admin";
gid("ra_title_2").innerHTML = "TIAAPT Admin";
gid("log_text").innerHTML = "Log In";

if (location.hash == "#register") {
signUp();
}
  }
});


}

function loginWithGoogle() {
gid("login_load_normal").style.display = "block";
gid("login_enter_normal").style.display = "none";
gid("create_account_admin").style.display = "none";
	
var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'hd': 'apps4pps.net'
});
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().signInWithRedirect(provider);
}

function readyFunction() {
document.getElementById("everything").style.display = "block";
}

function adminLogin() {
gid("login").style.display = "block";
gid("login_normal").style.display = "none";
}

function studentLogin() {
gid("login").style.display = "none";
gid("login_normal").style.display = "block";
}


function logOut() {	
firebase.auth().signOut().then(function() {
gid("create_account").style.display = "block";
localStorage.setItem("1_beta",false);
if (isMobile) {
toggleSidebar();
}
}).catch(function(error) {
  showAlert("Error","Error code: "+error.code)
});
	
}

function signUp() {
secretsignup = true;
gid("ra_title").innerHTML = "TIAAPT Admin";
gid("ra_title_2").innerHTML = "TIAAPT Admin";
gid("login_error").innerHTML = "";
gid("username").disabled = false;
gid("username").value = "";
gid("password").value = "";
gid('username').focus();
gid("log_text").innerHTML = "Register";
gid("create_account").style.display = "none";
}

function logIn() {
	
gid("login_enter").style.display = "none";
gid("login_load").style.display = "block";
gid("login_error").innerHTML = "";
gid('username').blur();
gid('password').blur();
gid("create_account").style.display = "none"
	  firebase.auth().signInWithEmailAndPassword(gid("username").value, gid("password").value).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error.code)
  console.log(error.message)

  gid("login_error").innerHTML = error.code.replace("auth/invalid-email","Invalid email").replace("auth/wrong-password","Password incorrect").replace("auth/user-not-found","Account not found").replace("auth/user-disabled","Account frozen");
  gid("login_enter").style.display = "block";
gid("login_load").style.display = "none";
if (error.code.indexOf("password") > 1) {
gid('password').focus();
} else {
gid('username').focus();
}
  
  });
	
}

function toggleSidebar() {
if (inanim == false) {
if (sactive == false) {
sactive = true;
inanim = true;
gid("sidebar").style.display = "block"
gid("dk_bk").style.display = "block"
gid("sidebar").classList.add("slideIn");
gid("dk_bk").classList.add("fadeIn");
gid("sidebar").classList.remove("slideOut");
gid("dk_bk").classList.remove("fadeOut");
setTimeout(function() {
inanim = false;
}, 200);
} else {
sactive = false;
inanim = true;
gid("sidebar").classList.add("slideOut");
gid("dk_bk").classList.add("fadeOut");
setTimeout(function() {
gid("sidebar").style.display = "none"
gid("dk_bk").style.display = "none"
inanim = false;
}, 200);
gid("sidebar").classList.remove("slideIn");
gid("dk_bk").classList.remove("fadeIn");
}
}
}

gid = function(id) {return document.getElementById(id)};

function afterLogin() {

location.hash = "#home";
openHome();

gid("home_button").style.display = "none";
gid("points_button").style.display = "none";
gid("groups_button").style.display = "none";
gid("queue_button").style.display = "none";

gid("controlpanel").style.display = "block";
gid("login").style.display = "none";
gid("login_normal").style.display = "none";
var string = String(firebase.auth().currentUser.email);
gid("profile_photo").style.display = "none";
if (firebase.auth().currentUser.emailVerified) {
var string = String(firebase.auth().currentUser.displayName)
gid("prof_name").innerHTML = htmlescape(string);
gid("prof_school").innerHTML = userjson.school;
gid("profile_photo").src = firebase.auth().currentUser.photoURL;
gid("profile_photo_2").src = firebase.auth().currentUser.photoURL;
gid("profile_photo").style.display = "block";
gid("home_button").style.display = "block";
gid("points_button").style.display = "block";
} else {
gid("groups_button").style.display = "block";
gid("queue_button").style.display = "block";
location.hash = "#queue";
}

gid("settings_button").style.display = "block";
gid("welcome_button").style.display = "none";
if (userjson.verified !== true && userjson.admin !== "admin") {
gid("home_button").style.display = "none";
gid("points_button").style.display = "none";
gid("groups_button").style.display = "none";
gid("queue_button").style.display = "none";
gid("settings_button").style.display = "none";
gid("welcome_button").style.display = "block";
	location.hash = "#welcome";
	loadSetup();
}

gid("c_username").innerHTML = string;
if (gid(location.hash.split("#")[1]+"_content")) {
switchSection(location.hash.split("#")[1])
} else {
switchSection("home")
}

if (firebase.auth().currentUser.email.indexOf("@apps4pps.net") == -1 && userjson.admin !== "admin" && false) {
	gid("welcome_button").style.display = "none";
	gid("welcome_content").style.display = "none";
	showAlert("Invalid email address","The TIAA Project Tracker is only accessible to apps4pps.net domain users","tryagain",function() {logOut()});
}

}

function openHome() {
	

}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function switchSection(tab) {
if (isMobile && sactive) {
toggleSidebar();
}
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("option");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    gid(tab+"_content").style.display = "block";
	gid(tab+"_button").className += " active";
history.replaceState(undefined, undefined, "#"+tab);
if (tab == "home") {
gid("navtitle").innerHTML = "Projects"
gid("content_title").innerHTML = "Projects"
loadHome();
}
if (tab == "points") {
gid("navtitle").innerHTML = "Points"
gid("content_title").innerHTML = "Points"
loadPoints();
}
if (tab == "groups") {
gid("navtitle").innerHTML = "Groups & Users"
gid("content_title").innerHTML = "Groups & Users"
loadGroups();
}
if (tab == "queue") {
gid("navtitle").innerHTML = "Approval Queue"
gid("content_title").innerHTML = "Approval Queue"
loadQueue();
}
if (tab == "settings") {
gid("navtitle").innerHTML = "Profile & Settings"
gid("content_title").innerHTML = "Profile & Settings"
loadSettings();
}
if (tab == "welcome") {
gid("navtitle").innerHTML = "Account Setup"
gid("content_title").innerHTML = "Account Setup"
loadSetup();
}
gid("content").scrollTop = 0;
}

function formatPhone(phone) {
if (phone) {
  var x = phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ' - ' + x[3] : '');
} else {
	return undefined;
}
}

function rawPhone(phone) {
	return phone;
}

function loadSettings() {
	
gid("ac_uid").innerHTML = "Account ID: "+firebase.auth().currentUser.uid;
if (firebase.auth().currentUser.emailVerified) {
	gid("account_settings").style.display = "none";
	gid("phone_settings").style.display = "block";
	gid("profile_info").style.display = "block";
	gid("group_settings").style.display = "block";
	gid("phone_box").innerHTML = formatPhone(userjson.phone) || "<i>Unknown</i>";
	gid("group_settings").innerHTML = real_spinner;
	
	if (userjson.group) {
	firebase.database().ref("groups").once('value').then(function(snapshot) {
	
	groups = snapshot.val();
	
	if (groups != null && groups[userjson.group] != null) {
	
	gid("group_settings").innerHTML = '<div class="profile_group_name">Group: '+htmlescape(groups[userjson.group].name)+'</div>'+real_spinner;
	
	for (var i = 0; i < groups[userjson.group].members.length; i++) {
		
	if (groups[userjson.group].members[i] != firebase.auth().currentUser.uid) {
	var c_userid = groups[userjson.group].members[i];
	firebase.database().ref("users/"+c_userid).once('value').then(function(snapshot) {
		
	gotUserInfo(c_userid,snapshot.val());
		
	}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	}
		
	}
	if (groups[userjson.group].members.length == 1) {
		renderUsers();
	}
	
	var usersingroup = {};
	
	function gotUserInfo(userid,useridjson) {
		usersingroup[userid] = useridjson;
		if (Object.keys(usersingroup).length == groups[userjson.group].members.length-1) {
			renderUsers();
		}
	}
	
	function renderUsers() {
		
	var pendhtml = '<div class="user"><div><img src="'+firebase.auth().currentUser.photoURL.split("/mo/").join("/s84/")+'"></div><div>'+firebase.auth().currentUser.displayName+'</div><div></div></div>';
	
	for (var e = 0; e < Object.keys(usersingroup).length; e++) {
		
		var cingroup = usersingroup[Object.keys(usersingroup)[e]];
		
		pendhtml += '<div class="user"><div><img src="'+cingroup.picture.split("/mo/").join("/s84/")+'"></div><div>'+cingroup.name+'</div><div><a href="tel:/'+cingroup.phone+'"><i class="material-icons" style="padding-right: 5px;color: black;">call</i></a><a href="sms:/'+cingroup.phone+'"><i class="material-icons" style="padding-left: 7px;color: black;">chat</i></a></div></div>';
		
	}
	
	gid("group_settings").innerHTML = '<div class="profile_group_name">Group: '+htmlescape(groups[userjson.group].name)+'</div>'+pendhtml;
		
	}
	
	} else {
		gid("group_settings").style.display = "none";
	}
	
	}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	} else {
		gid("group_settings").style.display = "none";
	}
} else {
	gid("account_settings").style.display = "block";
	gid("phone_settings").style.display = "none";
	gid("profile_info").style.display = "none";
	gid("group_settings").style.display = "none";
}

}

function showAlert(title,message,type,yesfunction) {
if (type == "cancel") {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "block";
gid("p_ok").style.display = "none";
} else {
gid("p_ok").style.display = "block";
if (type == "confirm") {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "block";
gid("p_ok").innerHTML = "CONFIRM"
gid("p_ok").classList.add("red")
gid("p_ok_link").onclick = function () {yesfunction()}
} else {
gid("p_ok").classList.remove("red")


if (type == "submit") {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "block";
gid("p_ok").innerHTML = "SUBMIT"
gid("p_ok_link").onclick = function () {yesfunction()}
} else {
if (type == "done") {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "none";
gid("p_ok").innerHTML = "DONE"
gid("p_ok_link").onclick = function () {yesfunction()}
} else {
if (type == "tryagain") {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "block";
gid("p_ok").innerHTML = "TRY AGAIN"
gid("p_ok_link").onclick = function () {yesfunction()}
} else {
gid("p_ok_link").onclick = function () {hideAlert()}
if (type == "hidden") {
gid("panel-bottomA").style.display = "none";
} else {
gid("panel-bottomA").style.display = "block";
gid("p_cancel").style.display = "none";
gid("p_ok").innerHTML = "OK"
}
}
}
}


}
}
gid("panel-title").innerHTML = title;
gid("panel-content").innerHTML = message;
gid("prompt").style.display = "block";
}

function hideAlert() {
gid("prompt").style.display = "none";
}


function createPostProgress(text) {
showAlert("Please wait",text+"...<div style='margin-bottom: 10px'/>","hidden");	
}

function changePassword() {
showAlert("Change Password","<input onkeypress='if(event.keyCode==13) {gid(\"new_password\").focus();}' type='password' class='c_text' id='old_password' placeholder='Current Password'><div class='padding'><input onkeypress='if(event.keyCode==13) {gid(\"new_password2\").focus();}' type='password' class='c_text' id='new_password' placeholder='New Password'><div class='padding'><input onkeypress='if(event.keyCode==13) {confirmChangePassword();}' type='password' class='c_text' id='new_password2' placeholder='Retype New Password'>","submit",function() {confirmChangePassword()});
setTimeout(function() {
gid("old_password").focus();
},1)
}

function reverse_string(s){
    return s.split("").reverse().join("");
}

function confirmChangePassword() {
var oldpass = gid("old_password").value;
var newpass = gid("new_password").value;
if(newpass == gid("new_password2").value && oldpass.length > 0 && newpass.length > 0) {
showAlert("Are you sure you want to change your password?","You are about to change your password to: <div style='padding-bottom:10px'></div>"+newpass,"confirm",function() {doChangePassword(oldpass,newpass)});
} else {
showAlert("Error","Invalid current or new password")
}
}

function doChangePassword(oldpass,newpass) {
createPostProgress("Updating password");
var user = firebase.auth().currentUser;
var cred = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email,oldpass);
user.reauthenticateWithCredential(cred).then(function() {
user.updatePassword(newpass).then(function() {
showAlert("Password Changed","Your password was updated successfully");
}).catch(function(error) {
if (error.code == "auth/weak-password") {
showAlert("Error","The new password you entered is too weak. Your password has not been changed.");
} else {
showAlert("Error","An error occured. Your password has not been changed.</br>Error code: "+error.code);
}
});
}).catch(function(error) {
if (error.code == "auth/wrong-password") {
showAlert("Error","The password you entered is incorrect. Your password has not been changed.");
} else {
showAlert("Error","An error occured. Your password has not been changed.</br>Error code: "+error.code);
}
});
}

function closeAccount() {
showAlert("Delete Account","<input onkeypress='if(event.keyCode==13) {confirmDeleteAccount();}' type='password' class='c_text' id='my_password' placeholder='Confirm Password'>","confirm",function() {confirmDeleteAccount()});
setTimeout(function() {
gid("my_password").focus();
},1)
}

function confirmDeleteAccount() {
var oldpass = gid("my_password").value;
showAlert("Delete Account","Please type the following:</br><div style='padding-bottom:5px'></div>"+String(firebase.auth().currentUser.uid).substring(0,12).split("I").join("P").split("l").join("b")+"<div style='padding-bottom:10px'></div><input onkeypress='if(event.keyCode==13) {confirmDeleteAccount2("+oldpass+");}' type='text' class='c_text' id='del_context_password' placeholder='Confirmation Text'>","confirm",function() {confirmDeleteAccount2(oldpass)});
gid("del_context_password").focus();
}

function confirmDeleteAccount2(oldpass) {
var constring = gid("del_context_password").value;
showAlert("Are you sure you want to delete your account?","Once you do this, there's no going back!","confirm",function() {actuallyDeleteAccount(oldpass,constring)})
}

function actuallyDeleteAccount(oldpass,constring) {
createPostProgress("Deleting account");
if (constring == String(firebase.auth().currentUser.uid).substring(0,12).split("I").join("P").split("l").join("b")) {
var user = firebase.auth().currentUser;
var cred = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email,oldpass);
user.reauthenticateWithCredential(cred).then(function() {
user.delete().then(function() {
location.reload();
}).catch(function(error) {
showAlert("Error","An error occured. Your account has not been deleted.</br>Error code: "+error.code);
});
}).catch(function(error) {
if (error.code == "auth/wrong-password") {
showAlert("Error","The password you entered is incorrect. Your account has not been deleted.");
} else {
showAlert("Error","An error occured. Your account has not been deleted.</br>Error code: "+error.code);
}
});

} else {
showAlert("Error","The confirmation text you entered was incorrect. Your account has not been deleted.")
}
}

var tasks;

function loadHome() {
	
gid('tasks_list').innerHTML = real_spinner;
	
firebase.database().ref("groups/"+userjson.group+"/tasks").once('value').then(function(snapshot) {
	
tasks = snapshot.val();
var pendhtml = "";

if (tasks != null) {
for (var i = Object.keys(tasks).length-1; i > -1; i--) {
	
var ctask = tasks[Object.keys(tasks)[i]];
var taskid = Object.keys(tasks)[i];
var task_class = '';

var banner = '<div class="task_edit"><div>This is a draft</div><div onclick="submitTask(\''+taskid+'\')">Submit</div></div>';
var task_items = '';
task_class = "edit_list";

var task_sort = [];

if (ctask.items != null) {
for (var e = 0; e < Object.keys(ctask.items).length; e++) {
	
citem = ctask.items[Object.keys(ctask.items)[e]];
var itemid = Object.keys(ctask.items)[e];

var m_icon = "drag_indicator"
if (tasks[taskid].status != null) {
	m_icon = "check_box_outline_blank"
}

var text_disabled = ""
if (tasks[taskid].status != null) {
	text_disabled = 'readonly="readonly"'	
}

var c_task_item = '<div class="task_item" id="item_'+itemid+'"><i class="material-icons" id="drag_'+citem.pos+'">'+m_icon+'</i><textarea '+text_disabled+' type="text" placeholder="List item">'+citem.text+'</textarea><i onclick="removeItem(\''+itemid+'\',\''+taskid+'\')" class="material-icons">close</i></div>'
task_sort[e] = [citem.pos,c_task_item];

}
}

function taskSort(a,b) {
	return a[0] - b[0];
}
task_sort = task_sort.sort(taskSort);

for (var r = 0; r < task_sort.length; r++) {
	
	task_items += task_sort[r][1];
	
}

if (tasks[taskid].status == "pending") {
	banner = '<div class="task_edit"><div>Waiting for approval...</div><div onclick="cancelTask(\''+taskid+'\')">Cancel</div></div>';
}

var task_add = '<div class="task_item add_item" onclick="addItem(\''+taskid+'\')"><i class="material-icons">add</i><div>Add item</div></div>';

if (tasks[taskid].status != null) {
	task_add = "";
	task_class = "";
}
	
pendhtml += '<div class="task" id="task_'+taskid+'"><div class="task_top"><div>'+ctask.name+'</div><div><i onclick="taskMenu(\''+taskid+'\')" class="material-icons">more_vert</i></div></div>'+banner+'<div class="task_items '+task_class+'">'+task_items+task_add+'</div></div>'
	
}
}

var none = false;

if (pendhtml.length == 0) {
pendhtml = '<div class="error_gray"><center><i class="material-icons">list_alt</i></center>No tasks were found</div>';
none = true;
}

tasks_list.innerHTML = pendhtml;

if (none != true) {
for (var i = 0; i < tasks_list.children.length; i++) {
	
var cctask = tasks_list.children[i];

for (var e = 0; e < cctask.querySelector(".task_items").children.length; e++) {
	
var ccitem = cctask.querySelector(".task_items").children[e];

if (!ccitem.classList.contains("add_item") && ccitem.querySelector("textarea")) {
	
var textarea = tasks_list.children[i].querySelector(".task_items").children[e].querySelector("textarea");
	
initTextarea(textarea,cctask.id.split("task_")[1],textarea.readOnly);
	
}	
}	
}
}

var taskRef = firebase.database().ref("groups/"+userjson.group+"/tasks");
taskRef.on('value', function(snapshot) {
  updateTasksAndLists(snapshot.val());
});

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function initTextarea(textarea,cctaskid,skipall) {
  textarea.style.height = ""; /* Reset the height*/
  textarea.style.height = textarea.scrollHeight + "px";
  
if (skipall !== true) {
	
textarea.oninput = function() {
  textarea.style.height = ""; /* Reset the height*/
  textarea.style.height = textarea.scrollHeight + "px";
  firebase.database().ref("groups/"+userjson.group+"/tasks/"+cctaskid+"/items/"+textarea.parentElement.id.split("item_")[1]+"/text").set(textarea.value).catch(function(error) {showAlert("Error","Error code: "+error.code)});
  tasks[cctaskid].items[textarea.parentElement.id.split("item_")[1]].text = textarea.value;
};

textarea.onkeydown = function(event) {
	
if (event.keyCode==13) {
	event.preventDefault();
	
	var newval = "";
	if (textarea.selectionStart != textarea.value.length) {
		newval = textarea.value.substring(textarea.selectionStart,textarea.value.length);
		textarea.value = textarea.value.substring(0,textarea.selectionStart);
		textarea.oninput();
	}
	
	var next = textarea.parentElement.nextSibling;
if (next.classList.contains("add_item")) {
	var additem = addItem(cctaskid);
	if (additem != false) {
	var newbox = additem.querySelector("textarea");
	newbox.value = newval;
	newbox.selectionStart = 0;
	newbox.selectionEnd = 0;
	newbox.focus();
	newbox.oninput();
	}
} else {
	var additem = addItem(cctaskid,Number(textarea.previousElementSibling.id.split("drag_")[1])+1);
	if (additem != false) {
	var newbox = additem.querySelector("textarea");
	newbox.value = newval;
	newbox.selectionStart = 0;
	newbox.selectionEnd = 0;
	newbox.focus();
	newbox.oninput();
	}
}


}

if (event.keyCode==8) {
	if (textarea.value.length == 0) {
		event.preventDefault();
		var newbox = false;
		if (textarea.parentElement.previousSibling) {
		newbox = textarea.parentElement.previousSibling.querySelector("textarea");
		} else {
		if (textarea.parentElement.nextSibling && textarea.parentElement.nextSibling.querySelector("textarea")) {
		newbox = textarea.parentElement.nextSibling.querySelector("textarea");
		}
		}
		removeItem(textarea.parentElement.id.split("item_")[1],cctaskid);
		if (newbox) {
		newbox.selectionStart = newbox.value.length;
		newbox.selectionEnd = newbox.value.length;
		newbox.focus();
		}
	} else {
	if (textarea.selectionStart == 0 && textarea.selectionEnd == 0 && textarea.parentElement.previousSibling) {
		event.preventDefault();
		var newbox = textarea.parentElement.previousSibling.querySelector("textarea");
		var orig_length = newbox.value.length;
		newbox.value += textarea.value;
		newbox.selectionStart = orig_length;
		newbox.selectionEnd = orig_length;
		newbox.oninput();
		removeItem(textarea.parentElement.id.split("item_")[1],cctaskid);
		newbox.focus();
	}
	}
}
	
}

textarea.previousElementSibling.addEventListener("touchstart", function(e) {itemDragStart(e)}, false);

}
}

var item_startDragOffset = false;
var item_startDragPos = false;
var item_emptySpacePos = false;
var item_startPixelOffset = false;
var initemdrag = false;
var itemCurrentWho = false;
var inDragTask = "";

function itemDragStart(event) {
event.preventDefault();
event.stopPropagation();

if (initemdrag !== false) {
	return itemDragEnd();
}

event.target.nextSibling.blur();

inDragTask = event.target.parentElement.parentElement.parentElement.id.split("task_")[1];

who = Number(event.target.id.split("drag_")[1]);

itemCurrentWho = who;

initemdrag = who;

var empty = document.createElement('div');
empty.classList.add("item_space");
item_emptySpacePos = who;

gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.parentNode.insertBefore(empty, gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.nextSibling);

gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.classList.add("item_in_drag");

gid("task_"+inDragTask).querySelector("#drag_"+who).addEventListener('touchmove', handleTouchMove);
gid("task_"+inDragTask).querySelector("#drag_"+who).addEventListener('touchend', handleTouchEnd);
gid("task_"+inDragTask).querySelector("#drag_"+who).addEventListener('touchcancel', handleTouchEnd);

item_startDragOffset = gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.offsetTop;
item_startDragPos = who;

gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.style.top = (item_startDragOffset-gid("content").scrollTop)+"px";

item_startPixelOffset = (event.targetTouches[0].pageY-item_startDragOffset)-21;
}

function itemDragMove(who,event) {
if (initemdrag !== false) {

event.preventDefault();
event.stopPropagation();
	
var dragPos = event.targetTouches[0].pageY-item_startPixelOffset;
var dragPosAdj = dragPos - gid("content").scrollTop;

var maxTopDrag = item_startDragOffset-(42*item_startDragPos);
var maxBottomDrag = item_startDragOffset+(42*(Object.keys(tasks[inDragTask].items).length-item_startDragPos));

if (dragPos < maxTopDrag+18) {
	
	dragPosAdj = maxTopDrag+18 - ((maxTopDrag+18-dragPos)/3)/2.5 - gid("content").scrollTop;
	dragPos = maxTopDrag+19;
	
};

if (dragPos > maxBottomDrag-18) {
	dragPosAdj = maxBottomDrag-18 + ((dragPos+18-maxBottomDrag)/3)/2.5 - gid("content").scrollTop;
	dragPos = maxBottomDrag-19;

}

for (var i = 0; i < Object.keys(tasks[inDragTask].items).length; i++) {
if (dragPos > maxTopDrag+(i*42) && dragPos < maxBottomDrag-((Object.keys(tasks[inDragTask].items).length-i-1)*42)) {
	if (i !== item_emptySpacePos) {
		document.querySelector(".item_space").outerHTML = "";
		var gets = gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.parentElement.querySelectorAll(".task_item:not(.item_in_drag):not(.add_item)");
		for (var e = 0; e < gets.length+1; e++) {
			if (i == e) {
				var empty = document.createElement('div');
				empty.classList.add("item_space");
				item_emptySpacePos = e;
				
				if (e == Object.keys(tasks[inDragTask].items).length - 1) {
					gets[0].parentNode.insertBefore(empty, gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.parentElement.querySelector(".add_item"));
				} else {
				if (e == 0) {
					gets[0].parentNode.insertBefore(empty, gets[0]);
				} else {
					gets[0].parentNode.insertBefore(empty, gets[e-1].nextSibling);
				}
				}
			}
		}
	}
}
}

gid("task_"+inDragTask).querySelector("#drag_"+who).parentElement.style.top = (dragPosAdj-21)+"px";
	
}
}

function handleTouchMove(event) {
	itemDragMove(who,event);
}

function handleTouchEnd(event) {
	itemDragEnd();
}

function itemDragEnd(dontsave) {
if (initemdrag !== false) {

if (initemdrag !== true && inDragTask) {
gid("task_"+inDragTask).querySelector("#drag_"+initemdrag).removeEventListener('touchmove', handleTouchMove);
gid("task_"+inDragTask).querySelector("#drag_"+initemdrag).removeEventListener('touchend', handleTouchEnd);
gid("task_"+inDragTask).querySelector("#drag_"+initemdrag).removeEventListener('touchcancel', handleTouchEnd);
}

initemdrag = false;

gid("task_"+inDragTask).querySelector(".task_items").insertBefore(gid("task_"+inDragTask).querySelector(".item_in_drag"),gid("task_"+inDragTask).querySelector(".item_space"));
gid("task_"+inDragTask).querySelector(".item_in_drag").style.top = "";
gid("task_"+inDragTask).querySelector(".item_in_drag").classList.remove("item_in_drag");
document.querySelector(".item_space").outerHTML = "";
var childs = gid("task_"+inDragTask).querySelector(".task_items").children;
var newposarray = {};
for (var i = 0; i < childs.length; i++) {
if (!childs[i].classList.contains("add_item")) {
	childs[i].querySelector("i").id = "drag_"+i;
	tasks[inDragTask].items[childs[i].id.split("item_")[1]].pos = i;
	newposarray[childs[i].id.split("item_")[1]] = {};
	newposarray[childs[i].id.split("item_")[1]].pos = i;
}
}
if (dontsave != true) {
firebase.database().ref("groups/"+userjson.group+"/tasks/"+inDragTask+"/items").update(tasks[inDragTask].items).then(function(snapshot) {

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
}
}
}


function addItem(taskid,index) {
	
if (tasks[taskid].items && Object.keys(tasks[taskid].items).length > 9) {
	return false;
}
	
if (index) {
for (var i = 0; i < Object.keys(tasks[taskid].items).length; i++) {
if (tasks[taskid].items[Object.keys(tasks[taskid].items)[i]].pos > index-1) {
	tasks[taskid].items[Object.keys(tasks[taskid].items)[i]].pos += 1;
}
}
}
	
var new_item_id = firebase.database().ref().child("groups/"+userjson.group+"/tasks/"+taskid+"/items").push().key;
	
var new_item = document.createElement("div");
new_item.classList.add("task_item");
new_item.id = "item_"+new_item_id;
new_item.innerHTML = '<i class="material-icons">drag_indicator</i><textarea type="text" value="" placeholder="List item"></textarea><i onclick="removeItem(\''+new_item_id+'\',\''+taskid+'\')" class="material-icons">close</i>';

if (index != null) {
gid("task_"+taskid).querySelector(".task_items").insertBefore(new_item,gid("task_"+taskid).querySelector(".task_items").children[index+1]);
} else {
gid("task_"+taskid).querySelector(".task_items").insertBefore(new_item,gid("task_"+taskid).querySelector(".add_item"));
}

var textarea = new_item.querySelector("textarea");

initTextarea(textarea,taskid)

textarea.previousElementSibling.id = "drag_"+(index || Object.keys(tasks[taskid].items || {}).length);

if (!tasks[taskid].items) {
	tasks[taskid].items = {};
}

tasks[taskid].items[new_item_id] = {};
tasks[taskid].items[new_item_id].text = "";
tasks[taskid].items[new_item_id].pos = index || Object.keys(tasks[taskid].items).length-1;

redrawJustOrder(taskid);

if (index != null) {
} else {
	gid("item_"+new_item_id).querySelector("textarea").focus();
}

firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid+"/items/").set(tasks[taskid].items).then(function(snapshot) {

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});

return new_item;
}

function removeItem(itemid, taskid) {
	
if (gid("item_"+itemid).nextElementSibling && gid("item_"+itemid).nextElementSibling.querySelector("textarea")) {
	gid("item_"+itemid).nextElementSibling.querySelector("textarea").focus();
} else {
if (gid("item_"+itemid).previousElementSibling && gid("item_"+itemid).previousElementSibling.querySelector("textarea")) {
	gid("item_"+itemid).previousElementSibling.querySelector("textarea").focus();
}
}
	
gid("item_"+itemid).parentElement.removeChild(gid("item_"+itemid));

var deleted_item_pos = tasks[taskid].items[itemid].pos;

for (var i = 0; i < Object.keys(tasks[taskid].items).length; i++) {
	
var thisitem = tasks[taskid].items[Object.keys(tasks[taskid].items)[i]];

if (thisitem.pos > deleted_item_pos) {
	tasks[taskid].items[Object.keys(tasks[taskid].items)[i]].pos -= 1;
}
	
}

delete tasks[taskid].items[itemid];

redrawJustOrder(taskid);

firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid+"/items").set(tasks[taskid].items).then(function(snapshot) {

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function updateTasksAndLists(newtasks) {

if (newtasks != null) {
for (var e = 0; e < Object.keys(newtasks).length; e++) {
	
var ctask = newtasks[Object.keys(newtasks)[e]];
var ctaskid = Object.keys(newtasks)[e];

if (!tasks || !tasks[ctaskid]) {//brand new task

return loadHome();
	
} else {

if (tasks[ctaskid].name != ctask.name) {//update name
	
gid("task_"+ctaskid).querySelector(".task_top").querySelector("div").innerHTML = htmlescape(ctask.name);
tasks[ctaskid].name = ctask.name;
	
}

if (tasks[ctaskid].status != ctask.status) {//update status

return loadHome();
	
}

if (ctask.items != null) {
for (var i = 0; i < Object.keys(ctask.items).length; i++) {
	
var citem = ctask.items[Object.keys(ctask.items)[i]];
var citemid = Object.keys(ctask.items)[i];

if (!tasks[ctaskid].items || !tasks[ctaskid].items[citemid]) {//brand new item

itemDragEnd(true)

var new_item = document.createElement("div");
new_item.classList.add("task_item");
new_item.id = "item_"+citemid;
new_item.innerHTML = '<i class="material-icons">drag_indicator</i><textarea type="text" value="" placeholder="List item"></textarea><i onclick="removeItem(\''+citemid+'\',\''+ctaskid+'\')" class="material-icons">close</i>';

gid("task_"+ctaskid).querySelector(".task_items").insertBefore(new_item,gid("task_"+ctaskid).querySelector(".add_item"));

var textarea = new_item.querySelector("textarea");

initTextarea(textarea,ctaskid);

textarea.previousElementSibling.id = "drag_"+(citem.pos);

if (!tasks[ctaskid].items) {
	tasks[ctaskid].items = {};
}
tasks[ctaskid].items[citemid] = {text: citem.text, pos: citem.pos};

redrawJustOrder(ctaskid);
	
} else {

if (tasks[ctaskid].items[citemid].text != citem.text) {//update text
	
gid("item_"+citemid).querySelector("textarea").value = citem.text;
tasks[ctaskid].items[citemid].text = citem.text;
	
}

if (tasks[ctaskid].items[citemid].pos != citem.pos) {//update position

itemDragEnd(true)
	
tasks[ctaskid].items[citemid].pos = citem.pos;

redrawJustOrder(ctaskid);
	
}

}
	
}
}
}
}
}

if (tasks != null) {
for (var e = 0; e < Object.keys(tasks).length; e++) {
	
var ctask = tasks[Object.keys(tasks)[e]];
var ctaskid = Object.keys(tasks)[e];

if (!newtasks || !newtasks[ctaskid]) {//task deleted

itemDragEnd(true)
	
gid("task_"+ctaskid).outerHTML = "";
delete tasks[ctaskid];

if (tasks_list.children.length == 0) {
	tasks_list.innerHTML = '<div class="error_gray"><center><i class="material-icons">list_alt</i></center>No tasks were found</div>';
}
	
} else {

if (ctask.items != null) {
for (var i = 0; i < Object.keys(ctask.items).length; i++) {
	
var citem = ctask.items[Object.keys(ctask.items)[i]];
var citemid = Object.keys(ctask.items)[i];

if (!newtasks[ctaskid].items || !newtasks[ctaskid].items[citemid]) {//item deleted

itemDragEnd(true)
	
gid("item_"+citemid).outerHTML = "";
delete tasks[ctaskid].items[citemid];
redrawJustOrder(ctaskid)
	
}

}
} else {

delete tasks[ctaskid].items;
var childs = gid("task_"+ctaskid).querySelector(".task_items").children;
for (var i = 0; i < childs.length; i++) {
	if (!childs[i].classList.contains("add_item")) {
		childs[i].outerHTML = "";
	}
}
	
}

}
}
}
}

function redrawJustOrder(ctaskid) {
	
var task_sort = [];

var titems = tasks[ctaskid].items;

for (var i = 0; i < Object.keys(titems).length; i++) {
	
var thisitem = titems[Object.keys(titems)[i]];

task_sort[i] = [thisitem.pos,Object.keys(titems)[i]]
	
}

function taskSort(a,b) {
	return a[0] - b[0];
}
task_sort = task_sort.sort(taskSort);

for (var i = 0; i < task_sort.length; i++) {

gid("item_"+task_sort[i][1]).querySelector("i").id = "drag_"+i;
gid("task_"+ctaskid).querySelector(".task_items").insertBefore(gid("item_"+task_sort[i][1]),gid("task_"+ctaskid).querySelector(".add_item"));
	
}
	
}

function createTask() {
	
showAlert("Create a new task",'<input onkeypress="if(event.keyCode==13) {valNewTask()}" class="c_text" id="taskname" placeholder="Task name"><div style="color: red; font-size: 18px; padding-top: 3px; margin-bottom: -2px" id="group_error_text"></div>',"submit",valNewTask);

taskname.focus();
	
}

function valNewTask() {
	
var gn = taskname.value;

if (gn.length > 0) {
	
createPostProgress("Creating task")
	
firebase.database().ref("groups/"+userjson.group+"/tasks").push({
    name : gn
}).then(
function (snap) {

hideAlert();
loadHome();

}
).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
} else {
	group_error_text.innerHTML = "Please enter a task name";
}
	
}

function updateProfile() {
showAlert("Update Profile","<div style='font-size: 20px'>Name:<div style='padding-top: 5px'></div><input type='text' class='c_text' id='edit1' placeholder='First Last'></br><div style='padding-top: 10px'></div>Grade:<div style='padding-top: 5px'></div><select style='font-size: 20px;' id='edit2'><option value='Freshman'>Freshman</option><option value='Sophomore'>Sophomore</option><option value='Junior'>Junior</option><option value='Senior'>Senior</option><option value='Teacher'>Teacher</option></select><div style='padding-top: 10px'></div>Phone:<div style='padding-top: 5px'></div><select style='font-size: 20px;' id='edit3'><option value='Android'>Android</option><option value='iOS'>iOS</option></select></div>","submit",function() {saveProfile()});
gid("edit1").focus();
gid("edit1").value = userjson[firebase.auth().currentUser.uid].name || "";
gid("edit2").value = userjson[firebase.auth().currentUser.uid].grade || "Freshman";
gid("edit3").value = userjson[firebase.auth().currentUser.uid].device || "Android";
}

function saveProfile() {
var newname = gid("edit1").value.trim();
var newgrade = gid("edit2").value;
var newdevice = gid("edit3").value;
createPostProgress("Updating profile");
firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({
    name: newname,
	grade: newgrade,
	device: newdevice
}).then(function () {
	
if (userjson != null) {} else {
userjson = new Array();
}

if (userjson[firebase.auth().currentUser.uid] != null) {} else {
userjson[firebase.auth().currentUser.uid] = new Array();
}
	
userjson.name = newname;
userjson.grade = newgrade;
userjson.device = newdevice;
	
hideAlert();
loadSettings();
openHome();

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
}

function htmlescape(str) {
if (str == undefined) {
return str;
}
str = String(str);
return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
} 


function editPhone(setup) {
showAlert("Edit Phone Number","<input type='phone' class='c_text' id='edit1' placeholder='Phone number'><div id='p_error' style='display: none'></div>","submit",function() {savePhone(setup)});
gid("edit1").focus();
gid("edit1").value = userjson.phone || "";
}

function savePhone(setup) {
var newphone = gid("edit1").value;
if (String(newphone) !== String(Number(newphone)) && newphone.length > 0) {
	gid("p_error").style.display = "block"
	gid("edit1").focus();
	return gid("p_error").innerHTML = "Error: Phone number contains invalid characters"
}
if (String(newphone).length !== 10) {
	gid("p_error").style.display = "block"
	gid("edit1").focus();
	return gid("p_error").innerHTML = "Error: Invalid phone number"
}
createPostProgress("Updating phone number");
firebase.database().ref('users/'+firebase.auth().currentUser.uid+"/phone").set(newphone).then(function () {

userjson.phone = newphone;

if (setup) {
	
gid("setup_phone").innerHTML = formatPhone(userjson.phone) || "<i>Enter phone number</i>";
gid("phone_continue").classList.remove("gray");
	
}
	
hideAlert();
loadSettings();

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
}

function loadSetup() {
	
gid("school_continue").classList.add("gray");

for (var i = 0; i < gid("school_container").children.length; i++) {
	gid("school_container").children[i].classList.remove("school_selected");
}

gid("setup_1").style.display = "block";
gid("setup_2").style.display = "none";
gid("setup_3").style.display = "none";

if (userjson.school) {
	
	
gid("setup_1").style.display = "none";
gid("setup_3").style.display = "block";
}
	
}

var selected_school = false;
var schools = ["Roosevelt","Lincoln"];

function selectSchool(schoolid) {
	
selected_school = schools[schoolid];

for (var i = 0; i < gid("school_container").children.length; i++) {
	gid("school_container").children[i].classList.remove("school_selected");
}

gid("school_"+schoolid).classList.add("school_selected");
gid("school_continue").classList.remove("gray");
	
}

function setup_step(stepid) {
	
if (stepid == 1 && selected_school) {
	
gid("setup_1").style.display = "none";
gid("setup_2").style.display = "block";

gid("setup_phone").innerHTML = formatPhone(userjson.phone) || "<i>Enter phone number</i>";
if (!userjson.phone) {
	gid("phone_continue").classList.add("gray");
}
	
}

if (stepid == 2 && userjson.phone) {
	
confirmProfile();
	
}
	
}

function setup_step_back(stepid) {
	
if (stepid == 2) {
	
gid("setup_1").style.display = "block";
gid("setup_2").style.display = "none";
	
}

if (stepid == 3) {
	
gid("setup_2").style.display = "block";
gid("setup_3").style.display = "none";
	
}
	
}

function setupPhoneNumber() {
	editPhone(true);
}

function confirmProfile() {
	
showAlert("Submit account for approval?","Please verify that the following information is correct:<br><br>School: "+selected_school+"<br>Phone: "+formatPhone(userjson.phone),"confirm",function() {
	
createPostProgress("Submitting");
firebase.database().ref('users/'+firebase.auth().currentUser.uid+"/school").set(selected_school).then(function () {
	
userjson.school = selected_school;

gid("setup_2").style.display = "none";
gid("setup_3").style.display = "block";
hideAlert();

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});

})
	
}

function loadGroups() {
	
gid("users_list").style.display = "block";
gid("groups_list").style.display = "none";

user_list_content.innerHTML = real_spinner;

firebase.database().ref("groups").once('value').then(function(snapshot) {
groups = snapshot.val();
firebase.database().ref("users").once('value').then(function(snapshot) {
	
users = snapshot.val();
var pendhtml = "";

if (groups != null) {
for (var i = 0; i < Object.keys(groups).length; i++) {
var cgroup = groups[Object.keys(groups)[i]];
if (cgroup != null && cgroup.members != null && cgroup.members.length > 0) {
pendhtml += "<div class='group_title'>"+htmlescape(cgroup.name)+"</div>";
for (var e = 0; e < cgroup.members.length; e++) {
var cuser = users[cgroup.members[e]];
pendhtml += "<div class='user'><div><img src='"+cuser.picture.split("/mo/").join("/s84/")+"'></img></div><div>"+htmlescape(cuser.name)+"</div><div>0<i class='material-icons'>stars</i></div></div>";
users[cgroup.members[e]].ingroup = true;
}
}
}
}

var nogrouphtml = "";
if (users != null) {
for (var i = 0; i < Object.keys(users).length; i++) {
var cuser = users[Object.keys(users)[i]];
if (cuser.ingroup !== true && cuser.admin != "admin" && cuser.verified == true) {
	nogrouphtml += "<div class='user'><div><img src='"+cuser.picture.split("/mo/").join("/s84/")+"'></img></div><div>"+htmlescape(cuser.name)+"</div><div class='assign' onclick='assignUser("+i+")'>Assign</div></div>";
}
}
}
if (nogrouphtml != "") {
	nogrouphtml = "<div class='group_title'>Unassigned</div>"+nogrouphtml;
	pendhtml = nogrouphtml+pendhtml;
}

gid("user_list_content").innerHTML = pendhtml;

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function assignUser(id) {
	
var cuser = users[Object.keys(users)[id]];
var pendhtml = "<div style='overflow: hidden; margin-bottom: -10px;'>";

for (var i = 0; i < Object.keys(groups).length; i++) {
var cgroup = groups[Object.keys(groups)[i]];

var userstring = " (0 members)"
if (cgroup.members != null && cgroup.members.length > 0) {
if (cgroup.members.length > 1) {
userstring = " (1 member)"
} else {
userstring = " ("+cgroup.members.length+" members)"
}
}

pendhtml += '<div class="post_attach" onclick="confirmAssign('+id+','+i+')"><div class="pa_left"><i class="material-icons">group</i></div><div class="pa_right">'+htmlescape(cgroup.name)+userstring+'</div></div>'
	
}

pendhtml += "</div>"

showAlert('Choose group for "'+htmlescape(cuser.name)+'"',pendhtml,"cancel",function() {});
	
}

function confirmAssign(userid,groupid) {
	
showAlert('Assign user "'+htmlescape(users[Object.keys(users)[userid]].name)+'" to group "'+htmlescape(groups[Object.keys(groups)[groupid]].name)+'"?',"","confirm",function(){actualAssign(userid,groupid)});
	
}

function actualAssign(userid,groupid) {

createPostProgress("Assigning user")

firebase.database().ref("users/"+Object.keys(users)[userid]+"/group").set(Object.keys(groups)[groupid]).then(function() {
	
var mem_array = groups[Object.keys(groups)[groupid]].members;
if (mem_array != null) {
	mem_array.push(Object.keys(users)[userid]);
} else {
	mem_array = [Object.keys(users)[userid]];
}
	
firebase.database().ref("groups/"+Object.keys(groups)[groupid]+"/members").set(mem_array).then(function() {
	
hideAlert();
loadGroups();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});

}

var groups;

var real_spinner = '<div class="real_spinner"><svg class="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="10" stroke-linecap="butt" cx="50" cy="50" r="40"></circle></svg></div>';

function manageGroups() {
	
gid("users_list").style.display = "none";
gid("groups_list").style.display = "block";

group_list_content.innerHTML = real_spinner;

firebase.database().ref("groups").once('value').then(function(snapshot) {
	
groups = snapshot.val();
var pendhtml = "";

if (groups != null) {
for (var i = 0; i < Object.keys(groups).length; i++) {
	
var group = groups[Object.keys(groups)[i]];
var group_s = "";

if (group.members && group.members.length > 0) {
if (group.members.length > 1) {
	group_s = group.members.length+" group members"
} else {
	group_s = "1 group member"
}
} else {
	group_s = "No group members"
}
	
pendhtml += '<div class="post_item"><div class="item_left"><div style="font-size: 25px;" class="ell">'+htmlescape(group.name)+'</div><div style="font-size: 17px; padding-top: 3px;" class="ell">'+group_s+'</div></div><div class="item_right"><a title="Edit groups" onclick="editGroup('+i+')"><div class="item_icon item_icon_inv"><i class="material-icons">edit</i></div></a><a title="Delete group" onclick="deleteGroup('+i+')"><div class="item_icon item_icon_inv"><i class="material-icons">delete</i></div></a></div></div>';
	
}
}

if (pendhtml.length > 0) {
group_list_content.innerHTML = pendhtml;
} else {
group_list_content.innerHTML = '<div style="text-align: -webkit-center;font-size: 76px;color: gray;"><i class="material-icons">error_outline</i></div><div style="text-align: -webkit-center;font-size: 22px;color:gray;">No groups found</div><div class="padding"></div>';
}

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function editGroup(id) {
	
showAlert("Edit group",'<input onkeypress="if(event.keyCode==13) {valEditGroup('+id+')}" class="c_text" id="groupname" placeholder="New group name"><div style="color: red; font-size: 18px; padding-top: 3px; margin-bottom: -2px" id="group_error_text"></div>',"submit",function() {valEditGroup(id)});

groupname.focus();
groupname.value = groups[Object.keys(groups)[id]].name;
	
}

function valEditGroup(id) {
	
var gn = groupname.value;

if (gn.length > 0) {
	
createPostProgress("Updating group");
	
firebase.database().ref("groups/"+Object.keys(groups)[id]+"/name").set(gn).then(function(snap) {
	
hideAlert();
manageGroups();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
} else {
	group_error_text.innerHTML = "Please enter a group name";
}
	
}

function deleteGroup(id) {
	
showAlert('Delete "'+htmlescape(groups[Object.keys(groups)[id]].name)+'" group?',"This action cannot be undone<div style='padding-top: 10px'></div>All group tasks and lists will be deleted. Group members, their points, and their pictures will not be deleted","confirm",function(){confirmDeleteGroup(id)});
	
}

function confirmDeleteGroup(id) {
	
firebase.database().ref("groups/"+Object.keys(groups)[id]).set(null).then(function(snap) {
	
hideAlert();
manageGroups();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function createGroup() {
	
showAlert("Create new group",'<input onkeypress="if(event.keyCode==13) {valNewGroup()}" class="c_text" id="groupname" placeholder="Group name"><div style="color: red; font-size: 18px; padding-top: 3px; margin-bottom: -2px" id="group_error_text"></div>',"submit",valNewGroup);

groupname.focus();
	
}

function valNewGroup() {
	
var gn = groupname.value;

if (gn.length > 0) {
	
createPostProgress("Creating group")
	
firebase.database().ref("groups").push({
    name : gn
}).then(
function (snap) {

hideAlert();
manageGroups();

}
).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
} else {
	group_error_text.innerHTML = "Please enter a group name";
}
	
}

function groupsBack() {
	
gid("users_list").style.display = "block";
gid("groups_list").style.display = "none";
loadGroups();
	
}

var users;

function loadQueue() {
	
queue_content.innerHTML = real_spinner;
	
firebase.database().ref("users").once('value').then(function(snapshot) {
	
users = snapshot.val();
var pendhtml = "";

if (users != null) {
for (var i = 0; i < Object.keys(users).length; i++) {
	
var cuser = users[Object.keys(users)[i]];

if (cuser.name != null && cuser.school != null && cuser.admin !== "admin" && cuser.verified !== true && cuser['delete'] !== true) {
	
pendhtml += '<div class="approval_card" id="user_'+Object.keys(users)[i]+'" onclick="approveCard(\'user\',\''+Object.keys(users)[i]+'\')"><div class="unexp"><div class="app_left"><i class="material-icons">account_circle</i></div><div class="app_right"><div class="app_title truncate">Account needs approval</div><div class="app_desc truncate">'+htmlescape(cuser.name)+'</div></div></div><div class="expand_content"><div class="prof_top"><img src="'+cuser.picture+'"></img><div>'+htmlescape(cuser.name)+'</div></div><center><div class="prof_details"><div class="prof_detail truncate"><i class="material-icons">email</i>'+htmlescape(cuser.email)+'</div><div class="prof_detail truncate"><i class="material-icons">phone</i>'+formatPhone(cuser.phone)+'</div><div class="prof_detail truncate"><i class="material-icons">account_balance</i>'+htmlescape(cuser.school)+'</div></div></center><div class="actionbar"><div onclick="appDeleteUser(\''+Object.keys(users)[i]+'\')" class="actionbar_item ac_red"><i class="material-icons">close</i>Delete</div><div class="actionbar_item ac_green" onclick="appApproveUser(\''+Object.keys(users)[i]+'\')"><i class="material-icons">check</i>Approve</div></div></div></div>'
	
}
	
}
}

queue_content.innerHTML = pendhtml;

expanded_cards = [];
suspended_cards = false;

if (auto_expand && gid('queue_content').children.length > 0) {
	
approveCard(gid('queue_content').children[0].id.split("_")[0],gid('queue_content').children[0].id.split("_")[1]);
	
}
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

var expanded_cards = [];
var suspended_cards = false;
var auto_expand = true;

function approveCard(type,id,skip) {

if (suspended_cards) {
	return true;
}

if (expanded_cards.length > 0 && !skip && expanded_cards[0] !== type+"_"+id) {
	approveCard(expanded_cards[0].split("_")[0],expanded_cards[0].split("_")[1],true);
}

if (expanded_cards.indexOf(type+"_"+id) > -1) {
	
expanded_cards.splice(expanded_cards.indexOf(type+"_"+id),1);

gid(type+"_"+id).querySelector(".unexp").style.opacity = 1;
gid(type+"_"+id).querySelector(".expand_content").style.opacity = 0;

gid(type+"_"+id).style.height = "49px";
	
} else {
	
expanded_cards.push(type+"_"+id);

gid(type+"_"+id).querySelector(".unexp").style.opacity = 0;
gid(type+"_"+id).querySelector(".expand_content").style.height = 'unset';
gid(type+"_"+id).querySelector(".expand_content").style.opacity = 1;

gid(type+"_"+id).style.height = Number(gid(type+"_"+id).querySelector(".expand_content").clientHeight-12)+"px";

}
	
}

function dismissCard(type,id) {

if (expanded_cards.indexOf(type+"_"+id) > -1) {
expanded_cards.splice(expanded_cards.indexOf(type+"_"+id),1);
}
suspended_cards = false;
gid(type+"_"+id).style.height = "0px";
gid(type+"_"+id).style.marginTop = "-12px";
gid(type+"_"+id).style.opacity = 0;
gid(type+"_"+id).classList.add("dismissed");

if (auto_expand) {
	
var elem = gid(type+"_"+id);
var expanded_yet = false;

while(true) {
	
if (elem.nextSibling) {
if (!elem.nextSibling.classList.contains("dismissed")) {
	approveCard(elem.nextSibling.id.split("_")[0],elem.nextSibling.id.split("_")[1]);
	expanded_yet = true;
	break;
} else {
	elem = elem.nextSibling;
}
} else {
	break;
}
	
}

if (!expanded_yet) {
	
var elem = gid(type+"_"+id);
	
while(true) {
	
if (elem.previousSibling) {
if (!elem.previousSibling.classList.contains("dismissed")) {
	approveCard(elem.previousSibling.id.split("_")[0],elem.previousSibling.id.split("_")[1]);
	expanded_yet = true;
	break;
} else {
	elem = elem.previousSibling;
}
} else {
	break;
}
	
}
	
}

}
	
}

function disableCard(type,id) {

suspended_cards = true;
gid(type+"_"+id).querySelector(".actionbar").classList.add("actionbar_disabled");
	
}

function appApproveUser(uid) {
	
disableCard("user",uid);
	
//createPostProgress("Approving account");
firebase.database().ref('users/'+uid+"/verified").set(true).then(function () {

dismissCard("user",uid);
//hideAlert();

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function appDeleteUser(uid) {
disableCard("user",uid);
	
//createPostProgress("Approving account");
firebase.database().ref('users/'+uid+"/delete").set(true).then(function () {

dismissCard("user",uid);
//hideAlert();

}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function taskMenu(taskid) {
	
var pendhtml = '<div style="overflow: hidden; margin-bottom: -10px;"><div class="post_attach" onclick="renameTask(\''+taskid+'\')"><div class="pa_left"><i class="material-icons">edit</i></div><div class="pa_right">Edit name</div></div><div class="post_attach" onclick="deleteTask(\''+taskid+'\')"><div class="pa_left"><i class="material-icons">delete</i></div><div class="pa_right">Delete draft</div></div><div class="post_attach" onclick="submitTask(\''+taskid+'\')"><div class="pa_left"><i class="material-icons">send</i></div><div class="pa_right">Submit for approval</div></div></div>'
	
if (tasks[taskid].status == "pending") {
	
var pendhtml = '<div style="overflow: hidden; margin-bottom: -10px;"><div class="post_attach" onclick="cancelTask(\''+taskid+'\')"><div class="pa_left"><i class="material-icons">close</i></div><div class="pa_right">Cancel approval request</div></div></div>'
	
}

showAlert('Task options',pendhtml,"cancel",function() {});
	
	
}

function deleteTask(taskid) {
	
showAlert('Are you sure you want to delete this task draft?',"This action cannot be undone<div style='padding-top: 10px'></div>This will also delete the task for all teammates","confirm",function(){confirmDeleteTask(taskid)});
	
}

function confirmDeleteTask(taskid) {
	
createPostProgress("Deleting task")
	
gid("task_"+taskid).outerHTML = "";
delete tasks[taskid];

if (tasks_list.children.length == 0) {
	tasks_list.innerHTML = '<div class="error_gray"><center><i class="material-icons">list_alt</i></center>No tasks were found</div>';
}
	
firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid).set(null).then(function(snap) {
	
hideAlert();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function renameTask(taskid) {
	
showAlert("Rename this task",'<input onkeypress="if(event.keyCode==13) {valNewTaskName(\''+taskid+'\')}" class="c_text" id="taskname" placeholder="Task name"><div style="color: red; font-size: 18px; padding-top: 3px; margin-bottom: -2px" id="group_error_text"></div>',"submit",function() {valNewTaskName(taskid)});

taskname.focus();
taskname.value = tasks[taskid].name;
	
}

function valNewTaskName(taskid) {
	
var gn = taskname.value;

if (gn.length > 0) {
	
createPostProgress("Renaming task")
	
firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid+"/name").set(gn).then(
function (snap) {

hideAlert();

}
).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
} else {
	group_error_text.innerHTML = "Please enter a task name";
}
	
}

function submitTask(taskid) {
	
showAlert('Submit this task for approval?',"No changes can be made after this task is submitted","confirm",function(){confirmSubmitTask(taskid)});
	
}

function confirmSubmitTask(taskid) {
	
createPostProgress("Submitting task")

firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid+"/status").set("pending").then(function(snap) {
	
hideAlert();
loadHome();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}

function cancelTask(taskid) {
	
showAlert('Cancel task approval request?',"This will enable you to make changes to this task","confirm",function(){confirmCancelTask(taskid)});
	
}

function confirmCancelTask(taskid) {
	
createPostProgress("Cancelling approval request")

firebase.database().ref("groups/"+userjson.group+"/tasks/"+taskid+"/status").set(null).then(function(snap) {
	
hideAlert();
loadHome();
	
}).catch(function(error) {showAlert("Error","Error code: "+error.code)});
	
}