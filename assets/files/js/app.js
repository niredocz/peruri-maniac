$(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      $('.wrapper-profil').addClass('panelcust');
      $('.wrapper-profil').addClass('animate__slideInUp');
      $('#dotnya').addClass('dot-atas');
      $('#scrolldown').addClass('hide');
      // $('.wrapper-profil').fadeIn();
    } else {
      $('.wrapper-profil').removeClass('panelcust');
      $('.wrapper-profil').removeClass('animate__slideInUp');
      $('#dotnya').removeClass('dot-atas');
      $('#scrolldown').removeClass('hide');
      // $('.wrapper-profil').fadeOut();
    }
  });
  // Scroll

  jQuery(function ($) {
    var initialSrc = 'assets/images/custom/logo-light.png';
    var scrollSrc = 'assets/images/custom/logo-dark.png';
    var initialSrcBumn = 'assets/images/custom/bumn-light.png';
    var scrollSrcBumn = 'assets/images/custom/bumn-dark.png';
    var activePage = $('.dropdown-menu-child .dropdown-item.isactive');

    $('.navbar-toggler').on('click', function () {
      // alert('y')
      if ($('#navbarSupportedContent').hasClass('show')) {
        $('.my-nav-cust').removeClass('aktif-putih');
        $('.logo-nav-cust').attr('src', initialSrc);
        $('.logo-nav-cust-bumn').attr('src', initialSrcBumn);
        if ($('#navbar-top').hasClass('aktif-putih')) {
          $('.logo-nav-cust').attr('src', scrollSrc);
          $('.logo-nav-cust-bumn').attr('src', scrollSrcBumn);
        } else {
          $('.logo-nav-cust').attr('src', initialSrc);
          $('.logo-nav-cust-bumn').attr('src', initialSrcBumn);
        }
      } else {
        $('.my-nav-cust').addClass('aktif-putih');
        $('.logo-nav-cust').attr('src', scrollSrc);
        $('.logo-nav-cust-bumn').attr('src', scrollSrcBumn);
        // alert('y')
      }
    });

    $(window).scroll(function () {
      var value = $(this).scrollTop();
      if (value > 50) {
        $('.logo-nav-cust').attr('src', scrollSrc);
        $('.logo-nav-cust-bumn').attr('src', scrollSrcBumn);
        $('.my-nav-cust').addClass('aktif-putih');
      } else {
        $('.my-nav-cust').removeClass('aktif-putih');
        $('.logo-nav-cust').attr('src', initialSrc);
        $('.logo-nav-cust-bumn').attr('src', initialSrcBumn);
      }
    });

    $('.navbar-nav').hover(
      function () {
        $('.mega-dropdown-menu').animate(
          {
            height: 'show',
          },
          200
        );
        setPosSlider(activePage.offset().left);
        $('.logo-nav-cust').attr('src', scrollSrc);
        $('.logo-nav-cust-bumn').attr('src', scrollSrcBumn);
        $('.my-nav-cust').removeClass('animate__animated animate__fadeIn');
        $('.my-nav-cust').addClass('aktif-putih-top animate__animated animate__fadeIn');
      },
      function () {
        $('.mega-dropdown-menu').animate(
          {
            height: 'hide',
          },
          200
        );
        if ($('.mega-dropdown-menu').css('display') === 'block') {
          setPosSlider(activePage.offset().left);
        }
        $('.my-nav-cust').removeClass('aktif-putih-top animate__animated animate__fadeIn');
        $('.my-nav-cust').addClass('animate__animated animate__fadeIn');
        $('.logo-nav-cust').attr('src', initialSrc);
        $('.logo-nav-cust-bumn').attr('src', initialSrcBumn);

        if ($('#navbar-top').hasClass('aktif-putih')) {
          $('.logo-nav-cust').attr('src', scrollSrc);
          $('.logo-nav-cust-bumn').attr('src', scrollSrcBumn);
        } else {
          $('.logo-nav-cust').attr('src', initialSrc);
          $('.logo-nav-cust-bumn').attr('src', initialSrcBumn);
        }
      }
    );

    $(window).on('load', function () {
      $('.menu-utama-nav .nav-link').hover(function () {
        activePage = $(`.${$(this).data('hover-menu')}`);
        if (activePage.length === 0) {
          $('.slider').css('display', 'none');
        } else {
          $('.slider').css('display', 'block');
          setPosSlider(activePage.offset().left);
        }
      });
      $('.judul-drop-menu').hover(function () {
        activePage = $(this);
        $('.slider').css('display', 'block');

        setPosSlider(activePage.offset().left);
      });
    });

    $('.dropdown-menu-child .dropdown-item').hover(function () {
      var leftPos = $(this).offset().left;

      setPosSlider(leftPos - 10);
    });
    function setPosSlider(pos) {
      $('.slider').css('left', pos + 10);
    }
  });

  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $subMenu = $(this).next('.dropdown-menu');
    $subMenu.toggleClass('show');

    $(this)
      .parents('li.nav-item.dropdown.show')
      .on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass('show');
      });

    return false;
  });

  $(window).load(function () {});

  setTimeout(function () {
    if ($(window).width() < 600) {
      $('#tentang-mobile').addClass('animate__fadeInUp');
    }
    // document.body.style.background = 'red';
  }, 3000);

  $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
    }
    var $subMenu = $(this).next('.dropdown-menu');
    $subMenu.toggleClass('show');

    $(this)
      .parents('li.nav-item.dropdown.show')
      .on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass('show');
      });

    return false;
  });
});
