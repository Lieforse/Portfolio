const escapeKey = 27;
document.addEventListener("DOMContentLoaded", function() {
  let modalButtons = document.querySelectorAll(".js-open-modal"),
    mask = document.querySelector(".js-mask-modal"),
    closeButtons = document.querySelectorAll(".js-modal-close"),
    overlay = document.querySelector(".js-overlay-modal");

  modalButtons.forEach(function(item) {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      let modalId = this.getAttribute("data-modal"),
        modalElem = document.querySelector('.js-modal[data-modal="' + modalId + '"]');

      modalElem.classList.add("active");
      mask.classList.add("active");
      overlay.classList.add("active");
    }); //  /click
  }); //  /foreach

  closeButtons.forEach(function(item) {
    item.addEventListener("click", function(e) {
      let parentModal = this.closest(".modal");
      parentModal.classList.remove("active");
      mask.classList.remove("active");
      overlay.classList.remove("active");
    });
  }); //  /cross close

  mask.addEventListener("click", function() {
    document.querySelector(".js-modal.active").classList.remove("active");
    document.querySelector(".js-overlay-modal.active").classList.remove("active");
    this.classList.remove("active");
  }); //  /overlay close

  document.body.addEventListener(
    "keyup",
    function(e) {
      let key = e.keyCode;

      if (key == escapeKey) {
        document.querySelector(".js-modal.active").classList.remove("active");
        document.querySelector(".js-overlay-modal.active").classList.remove("active");
        document.querySelector(".js-mask-modal.active").classList.remove("active");
      }
    },
    false
  ); //  /keyup close
}); //  /ready

document.addEventListener("DOMContentLoaded", function() {
  let navButtons = document.querySelector(".js-menu-button"),
    navBar = document.querySelector(".js-nav-bar");
  navButtons.addEventListener("click", function() {
    navBar.classList.toggle("active");
  });
});

$(function() {
  function highlightLink(anchor) {
    $(".js-highlight .active").removeClass("active");
    $(".js-highlight")
      .find('[href="' + anchor + '"]')
      .addClass("active");
  }

  jQuery.ready(
    $(window).on("scroll", function() {
      let pos = $(window).scrollTop();
      let pos2 = pos + 50;
      if (pos2 >= $("#home").offset().top) {
        highlightLink("#home");
      }
      if (pos2 > $("#about").offset().top) {
        highlightLink("#about");
      }
      if (pos2 > $("#portfolio").offset().top) {
        highlightLink("#portfolio");
      }
      if (pos2 > $("#contact").offset().top || pos + $(window).height() === $(document).height()) {
        highlightLink("#contact");
      }
    })
  );
  $("#contact-form").submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: "https://formspree.io/xwkqbrlk",
      method: "POST",
      data: { message: $("form").serialize() },
      dataType: "json"
    }).done(function(response) {
      $(".success-container").addClass("expand");
      $("#contact-form")
        .find("input[type=text], input[type=email], textarea")
        .val("");
      setTimeout(function() {
        $(".success-container").removeClass("expand");
      }, 10000);
    });
  });

  $("#close").click(function() {
    $(".success-container").removeClass("expand");
  });

  /* $(function(){
    if(setTimeout(2000)){
      $(".success-container").removeClass("expand");
    }else {
      $("#close").click(function() {
        $(".success-container").removeClass("expand");
      });
    }
  }) */
});
