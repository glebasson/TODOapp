// Add new str to html
function addtask(template, data) {
    row = $(template).appendTo("#TODO-container");
    row.attr('id', 'task_' + data.id);
    $(row).find(".col-8").text(data.text);
    $(row).find(".form-check-input").prop("checked", data.status);
}

// Load tasks from db
$(document).ready(function () {
    // Get row template firstly
    $.get("/static/template.html", function(template){
        console.log(template);
        //PUT method overriding
        $("#inputform").submit(function (e) {
            $.ajax({
                url: '/api',
                type: 'PUT',
                data: "tasktext=" + $("#todoinput")[0].value,
            }).done(function (data) {
               addtask(template, {"text": $("#todoinput")[0].value,"status": false})
            });
            return(false);
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





