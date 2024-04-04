const FIELD_OPACITY_TIMEOUT = 250;
const table = document.getElementById("table");
const form_add = document.getElementById("form-add");
const form_delete = document.getElementById("form-delete");

function insert_into_table(id, name, phone, animation=false) {
    let field_id = document.createElement("th");
    field_id.innerHTML = id;
    let field_name = document.createElement("th");
    field_name.innerHTML = name;
    let field_phone = document.createElement("th");
    field_phone.innerHTML = phone;
    let row = document.createElement("tr");
    if (animation) {
        row.style.opacity = 0;
    }
    row.append(field_id, field_name, field_phone);
    setTimeout((row) => {
        row.style.opacity = 1;
    }, 1, row);
    table.append(row);
}

function remove_from_table(id, animation=false) {
    rows = table.getElementsByTagName("tr");
    Array.from(rows).forEach((row) => {
        field_id = row.getElementsByTagName("th")[0];
        if (field_id.innerHTML == id) {
            if (animation) {
                row.style.opacity = 0;
                setTimeout((row) => {
                    row.remove();
                }, FIELD_OPACITY_TIMEOUT, row);
            }
            else {
                row.remove();
            }
        }
    });
}

function request_all() {
    const url = "http://localhost:8090/demo/all";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                users = JSON.parse(this.response);
                users.forEach((user) => {
                    insert_into_table(user.id, user.name, user.phone);
                });
            }
            else {
                console.log(this.status);
                addNotification(initNotification("Ошибка при загрузке"));
            }
        }
    }
    xhr.send();
}

function request_add(data) {
    const url = "http://localhost:8090/demo/add";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                user = JSON.parse(this.response);
                insert_into_table(user.id, user.name, user.phone, true);
                addNotification(initNotification("Номер добавлен"));
            }
            else {
                console.log(this.responseText);
                addNotification(initNotification("Ошибка при добавлении"));
            }
        }
    }
    xhr.send(data);
}

function request_delete(data) {
    const url = "http://localhost:8090/demo/delete";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                id = JSON.parse(this.response).id;
                remove_from_table(id.toString(), true);
                addNotification(initNotification("Номер удалён"));
            }
            else {
                console.log(this.responseText);
                addNotification(initNotification("Ошибка при удалении"));
            }
        }
    }
    xhr.send(data);
}

form_add.addEventListener("submit", (event) => {
    event.preventDefault();
    let form_data = new FormData(form_add, submit_add);
    form_add.reset();
    request_add(form_data);
    check_submit_add();
});

form_delete.addEventListener("submit", (event) => {
    event.preventDefault();
    let form_data = new FormData(form_delete, submit_delete);
    form_delete.reset();
    request_delete(form_data);
    check_submit_delete();
})

request_all();