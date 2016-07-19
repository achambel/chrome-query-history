// set font size from range
document.querySelector('#font').addEventListener('input', function(){
	setUserConfig();
	applyUserConfig();
});

// set clicked effect
document.querySelector('#saveOption').addEventListener('click', function(){
	this.classList.toggle('active');
	setUserConfig();

	if(this.classList.contains('active')) {
		saveQuery();
	}

});

// set text-transform style
document.querySelectorAll('.text-transform').addEventListener('click', function(){
	setTextTransform(this);
});

// implements in storage.js
document.querySelector('#btnExecutar').addEventListener('click', isSaveQuery);

// show/hide datatable
document.querySelector('#toggle-table').addEventListener('click', toggleTable);

// no submit form search history
document.querySelector('#submit-search').addEventListener('submit', function(e) {
	e.preventDefault();
	getQueries();
});

// export as dml insert
document.querySelector('#exportar-insert').addEventListener('click', exportInsert);

// upload json button
document.querySelector('#local-storage-upload').addEventListener('click', function(){
	document.querySelector('#upload').click();
});

// start upload action after file selection
document.querySelector('#upload').addEventListener('change', uploadFile);

document.querySelector('#flash-messages').addEventListener('click', function() { this.classList.add('hide') });

window.addEventListener('resize', function () {
  if((window.outerHeight - window.innerHeight) > 100) {
    	welcomeDev();
   }
});

function setTextTransform(ele) {

	if(ele.id === 'capitalize') {
			editor.getDoc().setValue(editor.getDoc().getValue().capitalize());
	} else if(ele.id === 'uppercase') {
			editor.getDoc().setValue(editor.getDoc().getValue().toUpperCase());
	} else if(ele.id === 'lowercase') {
			editor.getDoc().setValue(editor.getDoc().getValue().toLowerCase());
	}

};


function toggleTable(options = {}) {
	var target = document.querySelector('#result-history table');
	target.classList.toggle('hidden');
 	document.querySelector('#history').focus();

	if(options.removeNodes) {
		target.removeAttribute('class');
		target.querySelector('tbody').innerHTML = ''; // reset all data tables
	}
};

// submit query when pressed <ctrl>+<enter>
document.addEventListener('keydown', function(e){
	if(e.ctrlKey && e.keyCode == 13) {
		document.querySelector('#btnExecutar').click();
	}
});

document.querySelector('#clickBtnExecutar').addEventListener('click', function() {
	document.querySelector('#btnExecutar').click();
});


document.querySelectorAll('a.vertical-grid').addEventListener('click', function() {
	var th = document.querySelectorAll('#GridResultado th');
  var modalTable = document.querySelector('#verticalGridModalTable tbody');
  modalTable.innerHTML = '';

  for(let i = 0; i < th.length; i++) {
    var tr = document.createElement('tr');

    var columnName = document.createElement('td');
    columnName.innerHTML = `<strong>${th[i].textContent}</strong>`;

    tr.appendChild(columnName);

    var columnValue = document.createElement('td');
    columnValue.textContent = this.parentElement.parentElement.children[i].textContent;

    tr.appendChild(columnValue);

    modalTable.appendChild(tr);
  }
});

document.querySelector('#form1').addEventListener('submit', function() {
  chrome.runtime.sendMessage({action: "querysubmit"});
});
