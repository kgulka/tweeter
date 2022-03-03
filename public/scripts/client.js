/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createTweetElement = function(tweetData) { 

    const $tweet = $(`
      <article>
        <header class="tweet">
          <p><img src="${tweetData.user.avatars}">${tweetData.user.name}</p>
          <p>${tweetData.user.handle}</p>
        </header>
        <p class="past-tweet-text">${escape(tweetData.content.text)}</p>
        <footer>
          <p>${timeago.format(tweetData.created_at)}</p>
          <p><i class="fa-solid fa-flag"></i>&nbsp;&nbsp;<i class="fa-solid   fa-retweet"></i>&nbsp;&nbsp;<i class="fa-solid fa-heart"> </i></p>
        </footer>
      </article>
    `);
    return $tweet;
  };

  const renderTweets = function (arrTweetData) {
    for (let tweetData of arrTweetData) {
      const $tweet = createTweetElement(tweetData);
      $('#all-tweets').append($tweet);
    }
    return;
  }
  const loadTweets = function() {
    //http://localhost:8080
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetsText) {
      console.log('Success: ', tweetsText);
      renderTweets(tweetsText);
      // renderTweets(JSON.parse(tweetsText));
    });
  }
const tweetDataIsValid = function(textString) {
  
  if (!textString) {
    $("#error-msg").text("Error: The tweet contains no message.");
    $("#error-msg").slideDown();
    return false;
  }
    if (textString.length > 140) {
  
    $("#error-msg").text("Error: The tweet message is too long.");
    $("#error-msg").slideDown();
    return false; 
  }
  $("#error-msg").hide();
  return true;
}

  $(function() {
    let  request = null;
    const $form = $('form');
  
    $form.submit(function (event) {
      event.preventDefault();
      $("#error-msg").slideUp();
      const textValue = $("textarea#tweet-text").val();
      let queryStr = $form.find("button, textarea");
      if (!tweetDataIsValid(textValue)) {
        return;
      }
      let $inputs = $form.find("button, textarea");
      $inputs.prop("disabled", true);
      request= $.ajax({ url: "/tweets", method: "POST", data: queryStr});
      // Callback handler that will be called on success
      request.done(function (response, status, jqXHR){
        console.log("Tweet POST successful.");
        $("textarea#tweet-text").val("");
        $("output#tweet-counter").text("140");
        loadTweets();
      });
      // Callback handler that will be called on failure
      request.fail(function (jqXHR, status, error){
        //if there was a failure
        console.error("The tweet POST failed. Error: " + status, error);
      });
      // Callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
        $inputs.prop("disabled", false);
      });
    });
  });  
  
  $("#error-msg").hide();
  loadTweets();
  
});
/*
  //temporary data set.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  */
