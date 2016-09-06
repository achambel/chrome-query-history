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

document.querySelector('#exportar-update').addEventListener('click', () => {
  var th = document.querySelectorAll('#GridResultado th');

  var columns = document.querySelector('#columns');
  columns.innerHTML = null;

  var conditions = document.querySelector('#conditions');
  conditions.innerHTML = null;

  th.forEach( (element) => {
    var option = `<option value="${element.textContent}">${element.textContent}</option>`;
    columns.innerHTML += option;
    conditions.innerHTML += option;
  });

  document.querySelector('#tableName').value = '';
  document.querySelector('#previewDml').value = '';

});

document.querySelector('#previewDmlBtn').addEventListener('click', () => {
  var tableName = document.querySelector('#tableName').value || '<nome da tabela>';
  var columns = [].map.call(document.querySelector('#columns').selectedOptions, (obj) => `${obj.value} = ?`);
  var conditions = [].map.call(document.querySelector('#conditions').selectedOptions, (obj) => `${obj.value} = ?`);
  var preview = document.querySelector('#previewDml');

  preview.value = `UPDATE ${tableName}
  SET ${columns.join(', ')}

  WHERE ${conditions.join(' AND ')};`;

});

document.querySelector('#saveDmlBtn').addEventListener('click', (e) => {
  var tableName = document.querySelector('#tableName').value;
  var columns = [].map.call(document.querySelector('#columns').selectedOptions, obj => obj.value);
  var conditions = [].map.call(document.querySelector('#conditions').selectedOptions, obj => obj.value);

  if(!tableName.trim() || !columns.length || !conditions.length) {
    alert('Nome da tabela, colunas e condições devem ser informados!');
    return;
  }

  var tbody = [].map.call(document.querySelectorAll('#GridResultado thead tr th'), item => item.textContent);
  var trs = [].slice.call(document.querySelectorAll('#GridResultado tbody tr')).slice(0); // index 0 have column names
  var toSave = [];

  trs.forEach( (tr) => {
    var dmlCol = [];
    var dmlConditions = [];

    [].forEach.call(tr.children, (item, index) => {
      var value = toSqlType(item.textContent);

      if(columns.includes(tbody[index])) {
        dmlCol.push(`${tbody[index]} = ${value}`);
      }

      if(conditions.includes(tbody[index])) {
        dmlConditions.push(`${tbody[index]} = ${value}`);
      }

    });

    toSave.push(`UPDATE ${tableName} SET ${dmlCol.join(', ')} WHERE ${dmlConditions.join(' AND ')};`);
  });

  var blob = new Blob([toSave.join("\r\n")], {type: 'text/sql'});
  e.target.download = `query_simples_update_${tableName}_${Date.now()}.sql`;
  e.target.href = window.URL.createObjectURL(blob);
});

document.querySelector('#form1').addEventListener('submit', function() {
  editor.setValue(editor.getValue().replace(/;$/,''));
  chrome.runtime.sendMessage({action: "querysubmit"});
});

document.querySelectorAll('#GridResultado tbody > tr > td').addEventListener('mouseover', (e) => {
  e.target.title = e.target.title || getColumnName(e.target);
});

document.querySelectorAll('#GridResultado tbody > tr').addEventListener('mouseover', (e) => {
  var details = document.querySelector('#details');
  var tr = e.target.getBoundingClientRect();
  var scrollTop = window.pageYOffset;
  var scrollLeft = window.pageXOffset;

  details.setAttribute('style', `top:${tr.top+scrollTop}px;left:${tr.left + scrollLeft - details.clientWidth}px;position:absolute;opacity:0.3;`);
  details.classList.add('show');

});


document.querySelectorAll('#details').addEventListener('click', (e) => {
  var td = document.elementsFromPoint(e.clientX + e.target.clientWidth, e.clientY)[0];

  if(td.tagName == 'TD') {
    setVerticalGridModal(td.parentElement.children);
  }

});
