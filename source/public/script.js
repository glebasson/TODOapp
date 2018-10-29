// delete task from list
function deletetask() {
    row = this.parentElement.parentElement;
    id = row.id.split('_')[1];
    $.ajax({
        url: "api",
        method: 'DELETE',
        data: {task_id: id},
    }).done(row.remove());
}


// Add new str to html
function addtask(template, data) {
    row = $(template).appendTo("#TODO-container");
    row.attr('id', 'task_' + data.id);
    $(row).find(".col-8").text(data.text);
    $(row).find(".form-check-input").prop("checked", data.status);
    $(row).find(".delete_button").on("click", deletetask);
}


// Load tasks from db
$(document).ready(function () {
    // Get row template firstly
    $.get("/static/template.html", function(template){
        //PUT method overriding
        $("#inputform").submit(function (e) {
            val = $("#todoinput")[0].value;
            if (val !== "") {
                $.ajax({
                    url: '/api',
                    type: 'PUT',
                    data: "tasktext=" + val,
                }).done(function (data) {
                    addtask(template, {
                        "text": val,
                        "status": false
                    })
                });
            }
            return (false);
        });
        // Formate page
        $.ajax({
        url: '/api',
        contentType: 'application/json',
        }).done(function (data) {
            // get data from db and fill template
            json = JSON.parse(data);
            json.forEach(function (task) {
                addtask(template, task)
            })
        })
    });
});






