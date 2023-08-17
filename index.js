let spoofPanel =  `<style>
	/* Styling for the panel container */
	.panel-container {
		width: 250px;
		border: 2px solid rgb(138, 22, 255, 1);
		padding: 0px;
		margin: 0 auto;
		background-color: rgb(26, 28, 28, 1);
		color: white;
		font-family: Arial;
		border-radius: 10px;
		position: absolute;
	}

	/* Styling for the header */
	.panel-header {
		text-align: center;
	}

	/* Styling for the buttons container */
	.buttons-container {
		text-align: center;
		border: 2px solid rgb(138, 22, 255, 1);
		padding: 5px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	/* Styling for the buttons */
	.panel-button {
		display: block;
		margin-bottom: 5px;
		margin-top: 5px;
		padding: 10px 20px;
		border: 2px solid rgb(138, 22, 255, 1);
		color: white;
		cursor: pointer;
		width: 100%;
		transition: background-color 0.1s ease, box-shadow 0.1s ease;
		font-weight: bold;
		border-radius: 10px;
	}

	.panel-button:hover {
		/* Adjust the values to control the glow */
		box-shadow: 0 0 10px 2px rgb(71, 9, 133, 1);
	}

	.panel-button:active {
		background-color: rgba(0, 0, 0, 0.7);
	}

	/* Remove default button styling */
	button {
		background: none;
		border: none;
		outline: none;
	}
	
</style>

<div class="panel-container" draggable="true">
	<div class="panel-header">
		<h2>Spoofem</h2>
	</div>
	<div class="buttons-container">
		<button onclick="description()" class="panel-button">💬 Set Description</button>
		<button onclick="displayname()" class="panel-button">💬 Set Display Name</button>
		<button onclick="action()" class="panel-button">❌ Destroy Action Buttons</button>
		<button onclick="panel()" class="panel-button">❌ Destroy Panel</button>
	</div>
</div>
`

document.body.insertAdjacentHTML('beforeend', spoofPanel);

/* Dragging Panel */
const panelContainer = document.querySelector('.panel-container');
const panelHeader = document.querySelector('.panel-header');

panelContainer.addEventListener('dragstart', (event) => {
	event.dataTransfer.setData('text/plain', 'panel');
});

document.addEventListener('dragover', (event) => {
	event.preventDefault();
});

document.addEventListener('drop', (event) => {
	event.preventDefault();
	if (event.dataTransfer.getData('text/plain') === 'panel') {
		panelContainer.style.left = (event.clientX - panelContainer.offsetWidth / 2) + 'px';
		panelContainer.style.top = (event.clientY - panelContainer.offsetHeight / 10) + 'px';
	}
});

/* Spoofing functions */

/* INITIALIZING VARIABLES WITH HTML */

editTextBox = `
<div class="form-group form-has-feedback description-container" ng-class="{'form-has-error': $ctrl.layout.descriptionError }">
<textarea class="form-control input-field personal-field-description ng-valid ng-valid-maxlength ng-touched ng-dirty ng-not-empty" id="descriptionTextBox" placeholder="Tell the Roblox community about what you like to make, build, and explore..." rows="4" ng-model="$ctrl.data.description" maxlength="1000"></textarea>
<div class="description-event">
    <span class="small text ng-binding" ng-bind="'Description.AboutWarning' | translate">Keep yourself safe, do not share personal details online.</span> 
    <!-- ngIf: $ctrl.layout.descriptionError --> <!-- ngIf: !$ctrl.layout.descriptionError -->
    <p ng-if="!$ctrl.layout.descriptionError" class="form-control-label ng-binding ng-scope" ng-bind="$ctrl.data.description.length | formatCharacterCount: $ctrl.layout.maxDescriptionLength">3/1000</p>
    <!-- end ngIf: !$ctrl.layout.descriptionError --> 
</div>

<div class="description-buttons"> 
    <button id="CancelInfoSettings" class="btn-control-md btn-min-width acct-settings-btn ng-binding" ng-click="$ctrl.updateDescription(false)" ng-bind="'Action.Cancel' | translate" onclick="cancelDescription()">Cancel</button> 
    <button id="SaveInfoSettings" class="btn-control-md btn-min-width acct-settings-btn ng-binding" ng-click="$ctrl.updateDescription(true)" ng-bind="'Action.Save' | translate" onclick="saveDescription()">Save</button> 
</div>
</div>
`

setDescription = `
<!--Default profile about section with status intact, remove ! to hide-->
<div class="profile-about-content toggle-target">
<!--Use ng-show here so the Read More binding callback can work (Reference/widget.js)-->
<pre id="profile-about-text" class="text profile-about-text">                    
    <span class="profile-about-content-text linkify" ng-non-bindable="">$replaceMe</span>    
</pre>
<span class="toggle-content text-link cursor-pointer" data-container-id="profile-about-text" data-show-label="Read More" data-hide-label="Show Less" style="display: none;">Read More</span>
</div>
`

aboutHeader = `<h2>About</h2>`

let originalDescription;

/* 
-Setting Up Main Functions (Edit, Cancel, Save) 
-Adding Change Description Button
*/

function editDescription() {
	originalDescription = document.getElementsByClassName("profile-about-content-text linkify")[0].textContent
	document.getElementsByClassName("section-content remove-panel")[0].innerHTML = editTextBox
	document.getElementById("descriptionTextBox").value = originalDescription
	
	document.getElementsByClassName("container-header")[0].innerHTML = aboutHeader
}

function saveDescription() {
	let description = document.getElementById("descriptionTextBox").value;
	document.getElementsByClassName("section-content remove-panel")[0].innerHTML = setDescription.replace("$replaceMe", description)
	document.getElementsByClassName("container-header")[0].innerHTML = editButton
}

function cancelDescription() {
	document.getElementsByClassName("section-content remove-panel")[0].innerHTML = setDescription.replace("$replaceMe", originalDescription)
	document.getElementsByClassName("container-header")[0].innerHTML = editButton
}

function description() {
	document.getElementsByClassName("container-header")[0].innerHTML = editButton
}

editButton = `
<h2 ng-bind="'Heading.AboutTab' | translate" class="ng-binding">About</h2>

<!-- ngIf: $ctrl.layout.canEdit -->

<div ng-if="$ctrl.layout.canEdit" ng-hide="$ctrl.layout.showEditBox" class="ng-scope"> 
    <button class="btn-generic-edit-sm" ng-click="$ctrl.openEditBox()" onclick="editDescription()"> 
	<span class="icon-edit"></span> 
    </button> 
</div>

<!-- end ngIf: $ctrl.layout.canEdit --> 
`

function displayname() {
	document.getElementsByClassName("profile-name text-overflow")[0].contentEditable = true
	document.getElementsByClassName("profile-name text-overflow")[0].spellcheck = false
	document.getElementsByClassName("profile-name text-overflow")[0].textContent = "Edit Me"
}

function action() {
	document.getElementsByClassName("details-actions desktop-action")[0].remove()
	document.getElementsByClassName("user-tag-header")[0].remove()
}

function panel() {
	document.getElementsByClassName("panel-container")[0].remove()
}
