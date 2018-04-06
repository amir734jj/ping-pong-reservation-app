$('.clockpicker').clockpicker();


String.prototype.toFullDate = function() {
    let time = this;
    let today_date = new Date();
    today_date.setHours.apply(today_date, time.split(':'));
    return today_date.toLocaleString();
};


$("form").submit(event => {
    event.preventDefault();

    let payload = {
        name: $("form").find("[name='name']").val(),
        start_time: $("form").find("[name='start_time']").val().toFullDate(),
        end_time: $("form").find("[name='end_time']").val().toFullDate(0)
    };

    $.ajax({
        data: payload,
        type: "POST",
        url: "/user",
        success: _ => location.reload(),
        error: _ => alert("Failed to create a new schedule, probably overlap or invalid datetime!")
    });
});

$(".delete-schedule").click(e => {
   if (window.confirm("Are you sure to delete schedule?")) {
       $.ajax({
            type: 'DELETE',
            url: `user/${$(e.target).data("id")}`,
            success: _ => location.reload()
       });
    }
});