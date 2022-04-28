$("#login").click(function () {
  $(this).addClass("active");
});

$(".navbarButton a").click(function () {
  $(".navbarButton a").removeClass("active");
  $(this).addClass("active");
});

$("#getstarted").click(function () {
  $(this).addClass("active");
});

$(".btnstartsteps button").click(function () {
  $(this).addClass("active");
});

//contact form
$(".contactform input").click(function () {
  $(".contactform input").removeClass("active");
  $(this).addClass("active");
});
// $(".contactform #email").click(function () {
//   $(".contactform #email").removeClass("active");
//   $(this).addClass("active");
// });
// $(".contactform #message").click(function () {
//   $(".contactform #message").removeClass("active");
//   $(this).addClass("active");
// });
