
updateAge();
skillsHover();
profileImageInteractivity();
toogleExperienceDescription();


//-------------------------------------------------------------------------------------------------------
//Updates Age in years, months and days
function updateAge(){
  var birthDate=new Date("December 7, 1988"); //my birthday
  var yearMonthDays=calculateAgeInYMD(birthDate); //array with number of years months days
  $(".years").text(yearMonthDays[0]);
  $(".months").text(yearMonthDays[1]);
  $(".days").text(yearMonthDays[2]);
}

//Calculates age in years, months and days
function calculateAgeInYMD(dateString) {

    var nomOfDays=0;
    var nomOfMonths=0;
    var nomOfYears=0;

    var yearsMonthsDays = new Array();

  // get current date
    var currentDate=new Date();

  //get birthdate
    var birthDate=new Date(dateString);

  //find differences
    nomOfDays = currentDate.getDate() - birthDate.getDate();
    nomOfMonths = currentDate.getMonth() - birthDate.getMonth();
    nomOfYears = currentDate.getFullYear() - birthDate.getFullYear();

    if (nomOfDays < 0){
      nomOfDays += daysInMonth(currentDate.getMonth()+1, currentDate.getFullYear());
      nomOfMonths--;
    }

    if (nomOfMonths < 0){
      nomOfMonths += 12;
      nomOfYears--;
    }

    yearsMonthsDays=[nomOfYears, nomOfMonths, nomOfDays];
    return yearsMonthsDays;

  }

//Calculates number of days in a month of an specific year
function daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
  }


//-------------------------------------------------------------------------------------------------------
//Skills section behaviour: change background color when mouse passes over the skills
function skillsHover() {
  $("ul.no-bullets li").mouseenter(function(){
    $( this ).fadeOut( 500 );
    $( this ).fadeIn( 0 );
    $( this ).css("background-color", "#66bfbf3d");
  });
  $("ul.no-bullets li").mouseleave(function(){
    $( this ).css("background-color", "inherit");
  });
}


//-------------------------------------------------------------------------------------------------------
// Profile Buttons on click behaviour: change image when button is clicked
  function profileImageInteractivity(){
    $(".profile-button").on("click", function(event) {

    var buttonPressed=$(event.currentTarget);//get the pressed button
    var buttonClass=this.classList;

    if(buttonPressed.hasClass("pressed")){
      $(".profile-img").attr("src", "images/Yo_formal.jpg");
      resetButtons();
    }

    else {
      resetButtons();
      buttonPressed.addClass("pressed");
      setImage(buttonClass);
    }
  });
  }

  function resetButtons(){
    $(".profile-button").removeClass("pressed");//removes class "pressed" from all buttons of class "profile-button"
  }

  function setImage(buttonClass){
    if (buttonClass[2]=="pressed"){$(".profile-img").attr("src", "images/Yo_formal.jpg");}
    //switch on the second class in the class list
    switch(buttonClass[1]){
      case "vr":
        $(".profile-img").attr("src", "images/vr.jpg");
      break;

      case "cycling":
        $(".profile-img").attr("src", "images/cycling_square.jpg");
      break;

      case "hiking":
        $(".profile-img").attr("src", "images/hiking.jpg");
      break;

      case "scuba":
        $(".profile-img").attr("src", "images/scuba.jpg");
      break;

      default: $(".profile-img").attr("src", "images/Yo_formal.jpg");
    }
  }


//-------------------------------------------------------------------------------------------------------
//scrollspy behaviour
$("body").scrollspy({
    target: "#navbar-example",
    offset:50
});


//Navbar Sticky behaviour
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar-example");
var videoWindow=$("div.video-window");
var sticky = navbar.offsetTop;


function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    videoWindow.addClass("sticky");
  } else {
    navbar.classList.remove("sticky");
    videoWindow.removeClass("sticky");
  }
}

///Nav behaviour
applyNavigationFixForPhone();
function applyNavigationFixForPhone()
{
	$('.navbar li a').click(function(event)
	{
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}


//-------------------------------------------------------------------------------------------------------
//Video Player behaviour.
$("a.project").on("click", function(){
    var aClassList=$(this).prop("classList");
    var videoName=aClassList[1];
    console.log(videoName);
    showVideo(videoName);
});

function showVideo(videoName){
 ///Assign video source
  switch(videoName){
    case "vrdiver":
    //set video source
      $("div.video-window video").attr("src", "videos/" + videoName + ".mp4");
    //add video caption
      var caption="Extract from the scuba diving vr game prototype (Oculus Rift) developed as part of my Masters dissertation." +
       " The player can control buoyancy while checking his dive computer, swim by waving his hands up and down, and grab objects. The prototype was tested by divers.";
      $("div.video-window p").text(caption);
    break;

    case "ghoulieman":
    //set video source
      $("div.video-window video").attr("src", "videos/" + videoName + ".mp4");
      //add video caption
      var caption="hola";
      $("div.video-window p").text(caption);
    break;
  }

//show video window
  $("div.video-window").removeClass("hidden");
//load video
  $("div.video-window video").get(0).load();
//mute video
  $("div.video-window video").prop("muted", true);
}

//video window Close button behaviour
$("div.video-window button").on("click", function(){
  $("div.video-window video").get(0).pause();//pause video
  $("div.video-window").addClass("hidden");
});


//-------------------------------------------------------------------------------------------------------
//Experiences section-Buttons behaviour: show detail description
  function toogleExperienceDescription(){
    $("#experiences .col-md-8").on("click", function() {
      var objectToHide=$(this).find("span.title-experience");//find nested span with class title-experience
      var button=$(this).find("button img");
      objectToHide.toggle();
      changeButtonImage(button,objectToHide);
    });
  }

  function changeButtonImage(aButton,objectToHide){
    if(objectToHide.css("display")=="none"){
      $(aButton).attr("src", "https://img.icons8.com/material-rounded/16/000000/chevron-down.png");
    }
    else{
      $(aButton).attr("src", "https://img.icons8.com/material-rounded/16/000000/chevron-up.png");
    }
  }


//Reveal description on hover // Note: Not confortable to read with long texts, since page jumps when text hides.
// $("#experiences .col-md-8").hover(
//   function() {
//     var selected=$(this).find("span.title-experience")
//     console.log(selected);
//     $(selected).toggle();
//
//   }, function() {
//     var selected=$(this).find("span.title-experience")
//     $(selected).toggle();
//   }
// );

// Experiences section Buttons on click behaviour: collapse text description of a complete subsection, ex. education (for buttons on subsection headers; REMOVED. )
  // var btnUp_edu=false;
  // var btnUp_cert=false;
  // var btnUp_work=false;
  // $("div.education button").on("click", function(event){
  //   $("div.education .title-experience").toggle();
  //   btnUp_edu=!btnUp_edu;
  //   changeButtonImage("div.education button img", btnUp_edu);
  // });
  //
  // $("div.certification button").on("click", function(event){
  //   $("div.certification .title-experience").toggle();
  //   btnUp_cert=!btnUp_cert;
  //   changeButtonImage("div.certification button img", btnUp_cert);
  // });
  //
  // $("div.workexperience button").on("click", function(event){
  //   $("div.workexperience .title-experience").toggle();
  //   btnUp_work=!btnUp_work;
  //   changeButtonImage("div.workexperience button img", btnUp_work);
  // });
  //
  // function changeButtonImage(aClass, botonState){
  //   if(botonState){
  //     $(aClass).attr("src", "https://img.icons8.com/material-rounded/16/000000/chevron-up.png");
  //   }
  //   else{
  //     $(aClass).attr("src", "https://img.icons8.com/material-rounded/16/000000/chevron-down.png");
  //   }
  // }
