// Delete task from list
function deletetask() {
    row = $(this).closest(".row")[0];
    id = row.id.split('_')[1];
    $.ajax({
        url: "api",
        method: 'DELETE',
        data: {task_id: id},
    }).done(row.remove());
}


// Update task status
function updatetask() {
    row = $(this).closest(".row")[0];
    id = row.id.split('_')[1];
    status = $(row).find(".form-check-input")[0].checked;
    $.ajax({
        url: "api",
        method: 'UPDATE',
        data: {
                task_id: id,
                status: status,
              },
    }).done(function () {
        updatebackground(JSON.parse(status), $(row));
    });
}


// Add new str to html
function addtask(template, data) {
    row = $(template).appendTo("#TODO-container");
    row.attr('id', 'task_' + data.id);
    $(row).find(".textholder").text(data.text);
    $(row).find(".form-check-input").prop("checked", data.status);
    $(row).find(".btn").on("click", deletetask);
    $(row).find(".form-check-input").change(updatetask);
    updatebackground(data.status, row);
}


// PUT method overriding
function puttask(template) {
    $("#inputform").submit(function (e) {
        val = $("#todoinput")[0].value;
        if (val !== "") {
            $.ajax({
                url: '/api',
                type: 'PUT',
                data: "tasktext=" + val,
            }).done(function (data) {
                k = data;
                data = JSON.parse(data);
                addtask(template, data);
                $("#todoinput")[0].value = "";
            });
        }
        return (false);
    });
}


// Load tasks from db
$(document).ready(function () {
    // Get row template firstly
    $.get("/static/template.html", function(template){
        // PUT method overriding
        puttask(template);
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

function updatebackground(status, el) {
    if (status) {
        el.css("background-color", "lawngreen")
    }else {
        el.css("background-color", "#e9ecef")
    }
}





