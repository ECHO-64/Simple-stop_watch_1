// _________________ Helper Functions _________________
function getValidNumber(el) {
  let val = el.val(),
    variable;
  if (val === "") {
    variable = "00";
  } else if (val < 10) {
    if (val === "00") {
      variable = "00";
    } else {
      variable = "0" + val;
    }
  } else {
    variable = val;
  }
  return variable;
}

function showMsg(typeOfMsg, msg) {
  if (typeOfMsg === "success") {
    $(":root").css("--msg-main-color", "#198754"),
      $(".Alert-box .state").attr("class", "").addClass("fas fa-check state"),
      $(".Alert .Alert-content p:first").text("Success"),
      $(".Alert .Alert-content p:last").text(msg);
  } else if (typeOfMsg === "error") {
    $(":root").css("--msg-main-color", "#dc3545"),
      $(".Alert-box .state").attr("class", "").addClass("fas fa-xmark state"),
      $(".Alert .Alert-content p:first").text("Error"),
      $(".Alert .Alert-content p:last").text(msg);
  }
  $(".Alert").addClass("show");
  hideMsg = setTimeout(() => {
    $(".Alert").removeClass("show");
  }, 3000);
}

// close-msg
$(".close-msg").click(() => {
  $(".Alert").removeClass("show");
  clearTimeout(hideMsg);
});

// _________________ Open stop watch and setings _________________
$(".dots").click(() => {
  $(".menu").toggleClass("show");
});

$(".menu ul li").on("click", (e) => {
  let iD = $(e.target).attr("id");
  if (iD === "st") {
    $(".menu").removeClass("show"),
      $(".stop-watch").removeClass("show"),
      $(".settings").addClass("show");
  } else if (iD === "sw") {
    $(".menu").removeClass("show"),
      $(".stop-watch").addClass("show"),
      $(".settings").removeClass("show");
  }
});

// _________________ Stop watch and Alert _________________
let mil = (sec = min = "0" + 0),
  Alert;

$(".start").click(() => {
  $(".start").attr("disabled", "");
  sw_int = setInterval(() => {
    mil++;
    mil = mil < 10 ? "0" + mil : mil;
    if (mil == 100) {
      mil = "0" + 0;
      sec++;
      sec = sec < 10 ? "0" + sec : sec;
    }
    if (sec == 60) {
      sec = "0" + 0;
      min++;
      min = min < 10 ? "0" + min : min;
    }
    $(".sw-mil").text(`${mil}`),
      $(".sw-sec").text(`${sec}`),
      $(".sw-min").text(`${min}`);

    if (`${min}:${sec}:${mil}` === Alert) {
      clearInterval(sw_int);
      document.querySelector("audio").play();
      $(".start").removeAttr("disabled");
    }
  }, 10);
});

// Stop btn
$(".stop").click(() => {
  clearInterval(sw_int),
    $(".start").removeAttr("disabled"),
    document.querySelector("audio").pause();
});

// Reset btn
$(".reset").click(() => {
  $(".sw-mil").text("00"),
    $(".sw-sec").text("00"),
    $(".sw-min").text("00"),
    (mil = sec = min = "0" + 0);
  if ($("audio").attr("src") !== "ringtone/Rington.mp3") {
    let song = $("audio").attr("src");
    $("audio").attr("src", "").attr("src", `${song}`);
  }
});

// Menu delete alert btn
$("#ra").click(() => {
  if (Alert === undefined || Alert === "00:00:00") {
    showMsg("error", "No alert added.");
  } else {
    $("audio").attr("src", "ringtone/Rington.mp3");
    (Alert = "00:00:00"), showMsg("success", "Has been deleted.");
  }
  $(".menu").removeClass("show");
});

// _________________ Settings _________________
$(".settings input").on("input", (e) => {
  if ($(e.target).attr("id") === "stSec") {
    $(e.target).val($(e.target).val() > 60 ? 60 : $(e.target).val());
  }
  $(e.target).val($(e.target).val().slice(0, 2));
});

// Set Alert
$("#setBtn").click(() => {
  if (`${$("#stMin").val()}${$("#stSec").val()}` >= 1) {
    Alert = `${getValidNumber($("#stMin"))}:${getValidNumber($("#stSec"))}:00`;
    showMsg("success", `Has been set to ${Alert.substring(0, 5)}`);
    $("#stMin").val(""), $("#stSec").val("");
  } else {
    showMsg("error", "Invalid time.");
  }
});

// Change ringtone
$("#ringtone").on("change", (e) => {
  let val = $("#ringtone").val();
  if (val.match(/\w+.mp3/gi)) {
    let url = URL.createObjectURL(e.target.files[0]);
    $("audio").attr("src", url);
    showMsg("success", "Your song has been set.");
  } else {
    showMsg(
      "error",
      `${val.substr(val.lastIndexOf(".")) || "Also"} not supported`
    );
  }
});
