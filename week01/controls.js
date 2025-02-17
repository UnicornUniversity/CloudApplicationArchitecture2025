let controlsEnabled = true;

function validate(){
    const nameValue = $("#name").val();
    if (nameValue == null || nameValue.length === 0){
        alert("Please set all mandatory fields!");
    } else {
        alert("Hello, " + nameValue);

        alert("Have a good day, " + document.getElementById("name").value);
    }
}

function enable(){
    controlsEnabled = !controlsEnabled;
    $(".mandatory").prop("disabled", controlsEnabled);
}