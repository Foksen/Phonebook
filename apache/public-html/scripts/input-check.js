const input_name = document.getElementById("input-name");
const input_phone = document.getElementById("input-phone");
const submit_add = document.getElementById("submit-add");
const input_id = document.getElementById("input-id");
const submit_delete = document.getElementById("submit-delete");

function check_submit_add() {
    submit_add.disabled = !(input_name.value && input_phone.matches(":valid"));
}

function check_submit_delete() {
    submit_delete.disabled = !(input_id.matches(":valid"));
}

input_name.addEventListener("input", () => {
    if (input_name.value) {
        input_name.classList.remove("invalid");
    }
    else {
        input_name.classList.add("invalid");
    }
    check_submit_add();
});

input_phone.addEventListener("input", () => {
    if (input_phone.matches(":valid")) {
        input_phone.classList.remove("invalid");
    }
    else {
        input_phone.classList.add("invalid");
    }
    check_submit_add();
});

input_id.addEventListener("input", () => {
    if (input_id.matches(":valid")) {
        input_id.classList.remove("invalid")
    }
    else {
        input_id.classList.add("invalid")
    }
    check_submit_delete();
})

check_submit_add();
check_submit_delete();