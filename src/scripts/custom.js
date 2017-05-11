$(document).ready(function(){

    $("p").click(function(){
        $(this).hide();
    });

    var moment_date = $('.moment_date');

    moment_date.text(moment(moment_date.text()).format('MMMM Do YYYY, h:mm:ss a'));

    var a = 1;
    var b = 2;
    var c = a+b+d;
    console.log(c);

});