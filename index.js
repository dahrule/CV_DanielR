//Profile Age Update
  //Update Age in years, months and days
  var birthDate=new Date("December 7, 1987"); //my birthday
  var yearMonthDays=calculateAgeInYMD(birthDate); //array with number of years months days
  $(".years").text(yearMonthDays[0]);
  $(".months").text(yearMonthDays[1]);
  $(".days").text(yearMonthDays[2]);

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






// Profile Buttons on click behaviour
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
