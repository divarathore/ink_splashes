// console.log("hello!");

//loading the airtable library
var Airtable = require("airtable");
// console.log(Airtable);
//setting the max record so that it loads faster and doesnt load all images when its not needed.
// var max = 10; 
//API key
var base = new Airtable({ apiKey: "key3nWA9CZwUNk6l5"}).base("appIuBjIpRL9ij2YD");

//  getting the collection base, select all the records
//specify functions that will recieve data
// base("ink_splashes").select({}).eachPage(gotPageOfSplashes, gotAllSplashes);
base("ink_splashes").select({}).eachPage(gotPageOfSplashes, gotAllSplashes);

//an empty array to hold our data
 var splashes = [];

// callback function that recieves our data
function gotPageOfSplashes(records, fetchNextPage) {
    console.log("gotPageOfSplashes()");
    // add the records from this page to our array
    splashes.push(...records);
    // request more pages
    fetchNextPage();
  }

  // call back function that is called when all pages are loaded
function gotAllSplashes(err) {
    console.log("gotAllSplashes()");
  
    // report an error, you'd want to do something better than this in production
    if (err) {
      console.log("error loading data");
      console.error(err);
      return;
    }
  
    // call functions to log and show the books
    consoleLogSplashes();
    showSplashes();
  }

// just loop through the books and console.log them
function consoleLogSplashes() {
    console.log("consoleLogSplashes()");
    splashes.forEach((splash) => {
      console.log("Splash:", splash);
    });
  }

// loop through our airtable data, create elements (getting all the images on the page!)
function showSplashes() {
    console.log("showSplashes()");
    const randomStartPosition = Math.round(Math.random() * (splashes.length - 10));
    const slicedSplashes = splashes.slice(randomStartPosition, randomStartPosition + 9);

    slicedSplashes.forEach((splash) => {
      
      // <div class="card">
      //       <div class="card-back card-face">

      //       </div>
      //       <div class="card-front card-face">
      //           <div class="back"></div>
      //       </div>
      //   </div>

        let card = document.createElement("div");
        card.classList.add("card");
        card.style.order = `${Math.round(Math.random() * (splashes.length - 1))}`;
        document.querySelector(".game").appendChild(card);

        let card2 = document.createElement("div");
        card2.classList.add("card");
        document.querySelector(".game").appendChild(card2);

        let cardBack = document.createElement("div");
        cardBack.classList.add("card-back");
        cardBack.classList.add("card-face");
        card.appendChild(cardBack);

        let cardBack2 = document.createElement("div");
        cardBack2.classList.add("card-back");
        cardBack2.classList.add("card-face");
        card2.appendChild(cardBack2);
        
        let cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        cardFront.classList.add("card-face");
        card.appendChild(cardFront);

        let cardFront2 = document.createElement("div");
        cardFront2.classList.add("card-front");
        cardFront2.classList.add("card-face");
        card2.appendChild(cardFront2);
        
        let splashImage = document.createElement("img");
        splashImage.classList.add("front");
        splashImage.src = splash.fields.images[0].url;
        cardBack.appendChild(splashImage);
        cardBack2.appendChild(splashImage.cloneNode(true));
      });

      let card1 = document.querySelectorAll(".card");
      card1.forEach((item) => {
      item.addEventListener( 'click', function() {
      item.classList.toggle('is-flipped'); 
      item.classList.toggle('state-flipped'); // programmatically determined state

      const flippedCards = document.querySelectorAll('.state-flipped');
      if (flippedCards.length >= 2) {
        if (flippedCards[0].querySelector('img').src === flippedCards[1].querySelector('img').src) {
          console.log('you win');
              // var horizontalCenter=document.querySelector('.game').getBoundingClientRect().left + 625;
              //   var verticalCenter=document.querySelector('.game').getBoundingClientRect().top + 310;
              let game=document.querySelector('.game').getBoundingClientRect();
              var horizontalCenter=game.left + game.width/2;
                var verticalCenter=game.top +game.height/2;
                if(window.matchMedia("(max-width:480px)").matches){
                    var halfWidth=100;
                    var halfHeight=300;
                    }else{
                    var halfWidth=625;
                    var halfHeight=310;
                    }
                    console.log(horizontalCenter)
                    console.log(verticalCenter)
  
                    flippedCards.forEach((card,i) => {
                      var top=card.getBoundingClientRect().top;
                      var left=card.getBoundingClientRect().left;
                      console.log("top:",top,"left:",left);
                      var horizontalDistance=horizontalCenter - left;
                      var verticalDistance=verticalCenter - top;
                      console.log("horizontal:",horizontalDistance,"verical:",horizontalDistance);
                      card.style.setProperty('--top', `${verticalDistance}px`);
                      card.style.setProperty('--left', `${horizontalDistance}px`);
                       card.classList.add("shift-to-center");
                       if(i==0){
                        card.classList.add("shift-left")
                        }
                      });
                      setTimeout(() => {
                        flippedCards.forEach((card) => {
                          card.style.opacity = '0';
                        });
                      }, 2000);
                
        } else {
          console.log('you lose');
        }

        flippedCards.forEach((card) => {
          card.classList.toggle('state-flipped');
        });

        // animation
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.classList.toggle('is-flipped');
          });
        }, 1000);
        
      }
    });
  });
}