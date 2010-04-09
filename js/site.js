var Site = {
  enableToolTipBehavior: function() {
    $("#rss_link").tooltip({
        tip: "#rss_tooltip",
        offset: [65, 0]
    });
    $("#twitter_link").tooltip({
        tip: "#twitter_tooltip",
        offset: [65, 0]
    });
    $("#github_link").tooltip({
        tip: "#github_tooltip",
        offset: [65, 0]
    });
    $("#facebook_link").tooltip({
        tip: "#facebook_tooltip",
        offset: [65, 0]
    });
    $("#flickr_link").tooltip({
        tip: "#flickr_tooltip",
        offset: [65, 0]
    });
    $("#delicious_link").tooltip({
        tip: "#delicious_tooltip",
        offset: [65, 0]
    });
    $("#lastfm_link").tooltip({
        tip: "#lastfm_tooltip",
        offset: [65, 0]
    });
    $("#linkedin_link").tooltip({
        tip: "#linkedin_tooltip",
        offset: [65, 0]
    });
    $("#tumblr_link").tooltip({
        tip: "#tumblr_tooltip",
        offset: [65, 0]
    });
  },

  addTweets: function () {
    $("#twitter_feed").tweet({
      username: "andrewa2",
      count: 8,
      join_text: null,
      loading_text: "loading tweets..."
    });
  }
}


$(document).ready(function() {
  Site.enableToolTipBehavior();
  Site.addTweets();
});