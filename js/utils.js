function populate(len) {
	var arr = new Array();
	var storage = localStorage.getItem(user.config.storageQueryKey);

	if(storage){
		arr = JSON.parse(storage);
	}

	for(var i = 1; i <= len; i++) {
		var obj = new Object();
		obj.date = new Date();
		obj.query = `select * from table_${Date.now()} where id = ${i}`;
		arr.push(obj);
	}
		try {
			localStorage.setItem(user.config.storageQueryKey, JSON.stringify(arr));
		}
		catch (err) {
			console.error(err);
			flash(
				{ message: `Ops, não possível salvar sua query. Libere mais espaço removendo algumas delas. Erro: ${err.message}`,
					class: 'alert alert-danger'
				}
			);
		}
};

function flash(options = {message: null, class: null}) {
	var target = document.querySelector('#flash-messages');
	target.setAttribute('class', options.class);
	target.textContent = options.message;
};

function welcomeDev() {
var welcome = `Welcome, developer! See the code of the Query History extension on github.\t\t\t\t\t
Visit https://github.com/achambel/chrome-query-history\t\t\t\t\t\t\t\t\t\t
Enjoy!!!\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t
--------------------------------------------------------------------------------------------
QueryHistory  Query  Query     Query  QueryHistory  Query         QueryHistory  QueryHistory
Q             Query  Query QUE Query  Query     ry  Query         Query         Q\t\t\t
QueryHistory  Query  Query  R  Query  QueryHistory  Query         QueryHistory  QueryHistory
           y  Query  Query  Y  Query  Query         Query         Query                    y
QueryHistory  Query  Query     Query  Query         QueryHistory  QueryHistory  QueryHistory
--------------------------------------------------------------------------------------------
`;
  console.log(`%c${welcome}`, 'background: #222; color: #4caf50;');
}

function getColumnName(tdElement) {
	var index = Array.prototype.slice.call(tdElement.parentElement.children).indexOf(tdElement);
  return document.querySelector(`#GridResultado thead > tr > th:nth-child(${++index})`).textContent;
}

function setVerticalGridModal(tds) {
	var modalTable = document.querySelector('#verticalGridModalTable tbody');
  modalTable.innerHTML = '';

  for( var td of tds ) {
  	var tr = document.createElement('tr');

    var columnName = document.createElement('td');
    columnName.innerHTML = `<strong>${getColumnName(td)}</strong>`;

    tr.appendChild(columnName);

    var columnValue = document.createElement('td');
    columnValue.textContent = td.textContent;

    tr.appendChild(columnValue);

    modalTable.appendChild(tr);
  }

}
