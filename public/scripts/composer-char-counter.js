
$(document).ready(() => {
 
  console.log("loaded");
  const $tweetTextArea = $("#tweet-text");

  $tweetTextArea.on("keypress", function() {
    const maxTweetChars = 140;
    const $twtTextArea = $(this);
    const tweetText = $twtTextArea.val();
    const $tweetCounter = $("#tweet-counter"); 
    const charRemaining = maxTweetChars - tweetText.length;
    $tweetCounter.val(charRemaining);

    if ((maxTweetChars - tweetText.length) < 0) {
      $tweetCounter.css("color", "red");
    } else {
      $tweetCounter.css("color", "black");
    }

  }),false;



});
