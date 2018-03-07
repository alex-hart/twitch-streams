$(function() {
  var channels = [
    "freecodecamp",
    "b0aty",
    "saltyteemo",
    "imaqtpie",
    "grimmmz",
    "cohhcarnage",
    "sacriel",
    "dyrus",
    "summit1g",
    "lobosjr",
    "wowhobbs",
    "dansgaming",
    "adrive",
    "c9sneaky",
    "nl_kripp",
    "riotgames"
  ];

  var $infoBox = $("#info-box");
  function updatePage(streamData, channelData) {
    var name, status, game, icon, viewers, channelURL;
    name = channelData.display_name;
    icon = channelData.logo;
    channelURL = "https://www.twitch.tv/" + channelData.name;
    if (streamData.stream === null) {
      game = "Offline";
      $infoBox.append(
        "<a class='stream-link' href='" +
          channelURL +
          "' target='_blank'> <div class='streamer-div'> <img src='" +
          icon +
          "' class='icon offline' /> <p><b>" +
          name +
          "</b></p> <p>" +
          game +
          "</p> </div> </a>"
      );
    } else {
      viewers = streamData.stream.viewers;
      game = streamData.stream.game;
      $infoBox.prepend(
        "<a class='stream-link' href='" + channelURL +
        "' target='_blank'> <div class='streamer-div'> <img src='" + icon +
        "' class='icon' /> <i class='fa fa-circle status-online' aria-hidden = 'true'></i> <p id='viewers'>"
        + viewers + "</p> <p><b>" + name + "</b></p> <p>Playing: " + game +
        "</p> </div> </a>"
      );
    }
  }

  function getStreamInfo(channel) {
    $.getJSON(
      "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?",
      {}
    ).done(function(streamData) {
      $.getJSON(
        "https://wind-bow.gomix.me/twitch-api/channels/" +
          channel +
          "?callback=?",
        {}
      ).done(function(channelData) {
        updatePage(streamData, channelData);
      });
    });
  }

  for (var i in channels) {
    getStreamInfo(channels[i]);
  }
});
