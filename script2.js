// console.log("hello!");

//loading the airtable library
var Airtable = require("airtable");
// console.log(Airtable);

//API key
var base = new Airtable({ apiKey: "key3nWA9CZwUNk6l5"}).base("appIuBjIpRL9ij2YD");

//  getting the collection base, select all the records
//specify functions that will recieve data
base("ink_splashes").select({}).eachPage(gotPageOfSplashes, gotAllSplashes);
// base("ink_splashes").select({ maxRecords: maxSplashes, view: "18" }).eachPage(gotPageOfSplashes, gotAllSplashes);

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
    splashes.forEach((splash) => {

      //creating a div to add the images in individual divs.
        let card = document.createElement("div");
        card.classList.add(".card-face");
        document.querySelector(".game").appendChild(card);
      
        //adding the images to the divs.
        var splashImage = document.createElement("img");
        splashImage.classList.add("front");
        card.classList.add("open");
        splashImage.src = splash.fields.images[0].url;
        card.appendChild(splashImage);
    });
  }

  //adding a click event to scale up and down the images on the thumbnail page.
  document.querySelector('.game').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        event.target.classList.toggle('scale-up');
    }
});