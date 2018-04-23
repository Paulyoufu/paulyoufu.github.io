var datatable = null;
var db = openDatabase("myTel", "1.0", "test db", 1024 * 100); //数据库名 版本 数据库描述 大小

function init() {
  //初始化工作
  datatable = document.getElementById("datatable");
  showAllData();
}

function showData(row) {
  //显示数据
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.innerHTML = row.name;
  var td2 = document.createElement("td");
  td2.innerHTML = row.tel;
  tr.appendChild(td1);
  tr.appendChild(td2);
  datatable.appendChild(tr);
}
function showAllData() {
  //显示所有数据

  db.transaction(function(tx) {
    tx.executeSql(
      "create table if not exists TelData(name TEXT,tel TEXT)",
      [],
      function(tx, res) {},
      function(tx, err) {
        alert(err.message);
      }
    );

    tx.executeSql("select * from TelData", [], function(tx, result) {
      removeAllData();
      for (var i = 0; i < result.rows.length; i++) {
        showData(result.rows.item(i));
      }
    });
  });
}
function saveData() {
  //保存数据
  var name = document.getElementById("name").value;
  var tel = document.getElementById("tel").value;
  addData(name, tel);
  showAllData();
}
function addData(name, tel) {
  //添加数据
  db.transaction(function(tx) {
    tx.executeSql(
      "insert into TelData values(?,?)",
      [name, tel],
      function(tx, rs) {
        alert("yes");
      },
      function(tx, err) {
        alert(err.source + "====" + err.message);
      }
    );
  });
}
