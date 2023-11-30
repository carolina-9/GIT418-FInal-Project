"use strict";
// swiper library initializer

const swiper = new Swiper('.swiper', {

  direction: 'horizontal',
  loop: true,
  // slidesPerView: 4,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


});


// seatgeek api

// secret: 702c3e8f9210f69de7604be2008cb61e75320a6f916fbecbe103b5e7ad887365
// Client ID: MTU3MzU4MTh8MTcwMTMxODczOS40OTkzOTYz


  // ajax call to seatgeek api

  $(function() {

      // where api is being displayed

      let searchBar = $('#search');

      let apiSecret=`702c3e8f9210f69de7604be2008cb61e75320a6f916fbecbe103b5e7ad887365`;
      let clientId = ` MTU3MzU4MTh8MTcwMTMxODczOS40OTkzOTYz`;
      // let endPoint = ``;
    

      // $.ajax({
      //   url: `https://api.seatgeek.com/2/client_id=${clientId}&client_secret=${apiSecret}`,
      //   dataType: 'json',
      // }).done(function(data) {
      //   console.log(data);
      // }).fail(function(jqXHR) {
      //   console.error(jqXHR.responseJSON.status_message);
      // });
  // });

  // api works!
  // connect api to search bar


  //  example from jquery ui documentation/changed to seatgeek api
  searchBar.autocomplete({
    source: function( request, response ) {
      $.ajax({
        // only gets events - have to figure out how to include performers adn venues

        // encodeURI used to format user imput into the url
        // request = user input / term = matchers user input to info available
        url: `https://api.seatgeek.com/2/events?q=${encodeURIComponent(request.term)}&client_id=${clientId}&client_secret=${apiSecret}`,
        dataType: "json",
        // get values from api (map)
        success: function(data) {
          response($.map(data.events, function(item){
            return {
            label:item.title,
            value:item.id,
            }
          }));
        }


      }).fail(function(jqXHR) {
          console.error(jqXHR.responseJSON.status_message);
        });
    },
    minLength: 2,
    select: function( event, ui ) {
      console.log( "Selected: " + ui.item.value + " is " + ui.item.id);

      // api info for cards

      $.ajax({
        url:`https://api.seatgeek.com/2/events/${ui.item.value}?client_id=${clientId}&client_secret=${apiSecret}`,
        dataType: "json",
        success: function(event) {
          cardList(event);
        }
      });

      event.preventDefault();

    }
  } );
  });


  //  function to add card from search bar to your list
  function cardList(event) {
    var card = `
        <div class="swiper-slide flex space-x-4">
            <div class="card-content border-2 w-80">
                <img src="${event.performers[0].image}" alt="${event.title}" class="w-80 h-54 rounded-lg">
                <div class="card-text m-5">
                    <h5>${event.title}</h5>
                    <p>${event.venue.name}</p>
                </div>
            </div>
        </div>`;

 
    $('.swiper-wrapper').append(card);


  }

