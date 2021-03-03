(function () {
  'use strict';
  function animateOnScroll() {
    if (jQuery("[class*='do-anim']").length > 0) {
      jQuery("[class*='do-anim']")
        .not('.animated')
        .filter(function (i, d) {
          return jQuery(d).visible(!0);
        })
        .each(function (i) {
          var thisItem = jQuery(this);
          var delayMulti = 200;
          if (thisItem.hasClass('do-anim-modern')) {
            delayMulti = 100;
          }
          var delay = i * delayMulti + 100;
          thisItem.delay(delay).queue(function () {
            thisItem.addClass('animated');
          });
        });
    }
    var area =
      (jQuery('header #logo').height() + parseInt(jQuery('header #logo').css('top'), 10)) / 2;
    var bgArea = !1;
    jQuery('.fullwidth-section.text-light, .isotope-grid.text-light, footer.text-light').each(
      function () {
        if (jQuery(this).visible(!0, !1, area)) {
          bgArea = 'dark';
        }
      }
    );
    if (bgArea) {
      jQuery('header #logo:not(.disable-switch)').addClass('bg-' + bgArea);
    } else {
      jQuery('header #logo:not(.disable-switch)').removeClass('bg-dark').removeClass('bg-light');
    }
    if (jQuery().isotope) {
      jQuery(".load-isotope:not(.loading):not(.disabled) > a[data-method='infiniteload']")
        .filter(function (i, d) {
          return jQuery(d).visible();
        })
        .each(function () {
          jQuery(this).trigger('click');
        });
    }
  }
  function headerFeatures() {
    var selector = '#hero';
    if (jQuery('header').hasClass('hero-side')) {
      selector = '#hero-and-body';
    }
    if (jQuery(window).scrollTop() + 30 > jQuery(selector).height()) {
      jQuery('header.onhero').addClass('hero-invisible');
      if (jQuery(selector).find('.mute-video:not(.unmute)').length) {
        jQuery(selector).find('.mute-video:not(.unmute)').trigger('click');
      }
    } else {
      jQuery('header.onhero').removeClass('hero-invisible');
    }
    if (jQuery(window).scrollTop() > jQuery(window).height()) {
      jQuery('header .header-totop').addClass('visible');
    } else {
      jQuery('header .header-totop').removeClass('visible');
    }
  }
  function resizeAdapt() {
    if (jQuery('.hero-full #page-title').length > 0 || jQuery('.hero-big #page-title').length > 0) {
      var hero = jQuery('#hero');
      var pageTitle = jQuery('#hero #page-title');
      var pageTitleHeight = pageTitle.outerHeight();
      if (pageTitleHeight > hero.outerHeight()) {
        hero.css('height', pageTitleHeight - 2 + 'px');
      } else {
        hero.css('height', 'auto');
      }
    }
    if (jQuery().stick_in_parent && jQuery(window).width() < 769) {
      jQuery('.col-sticky').trigger('sticky_kit:detach');
    }
  }
  function isotopeLoadMore(grid, el, url, datas) {
    el.parent('.load-isotope').addClass('loading');
    if (url === '#' || !url) {
      url = srvars.ajaxurl;
    }
    var addData = '';
    if (datas) {
      addData = { action: 'sr_load_more', o: datas };
    }
    jQuery.ajax({
      type: 'POST',
      url: url,
      data: addData,
      dataType: 'html',
      error: function () {
        el.parent('.load-isotope').addClass('disabled');
      },
      success: function (response) {
        if (response) {
          if (jQuery("#hero.sticky_bottom[class*='side-']").length) {
            var position = jQuery('#hero').position();
            var parentHeight = jQuery('#hero').parent().outerHeight();
            var scroll = jQuery(document).scrollTop();
            var addOffset = jQuery(window).height() - (parentHeight - scroll);
            jQuery('#hero').css({ bottom: 'auto', top: position.top + addOffset + 'px' });
          }
          setTimeout(function () {
            var items = jQuery(
              jQuery(response)
                .find('#' + grid.attr('id'))
                .html()
            );
            items.imagesLoaded(function () {
              grid.append(items).isotope('appended', items);
              animateOnScroll(!1);
              if (jQuery().phatVideoBg) {
                grid.find('.videobg-section').phatVideoBg();
              }
            });
            setTimeout(function () {
              el.parent('.load-isotope').removeClass('loading');
            }, 1000);
          }, 500);
        } else {
          el.parent('.load-isotope').addClass('disabled');
        }
      },
    });
  }
  function reorganizeIsotope() {
    jQuery('.isotope-grid[data-ratio]').each(function () {
      var $container = jQuery(this);
      var width = $container.find('.isotope-item:not(.double-width)').width();
      var ratio = $container.data('ratio').split(':');
      ratio = ratio[1] / ratio[0];
      if (!ratio) {
        ratio = 0.8;
      }
      var spacing = 0;
      if ($container.hasClass('isotope-spaced') || $container.hasClass('isotope-spaced-big')) {
        spacing = parseInt($container.find('.isotope-item').css('marginRight'), 10);
      }
      var height = parseInt(width * ratio, 10);
      if (!$container.find('.isotope-item img:not(.hover)').parent('.ratio-wrapper').length) {
        $container.find('.isotope-item img:not(.hover)').wrap('<div class="ratio-wrapper"></div>');
      }
      $container.find('.isotope-item .ratio-wrapper').css({ height: height + 'px' });
      if (jQuery(window).width() > 1024) {
        $container
          .find('.isotope-item.double-height .ratio-wrapper')
          .css({ height: height * 2 + spacing + 'px' });
      }
      $container.isotope('layout');
    });
  }
  $(window).on('load', function () {
    if (
      (jQuery('#logo').hasClass('logo-right') &&
        (jQuery('#hero').hasClass('side-left') || jQuery('#hero').hasClass('side-left-small'))) ||
      (jQuery('#logo').hasClass('logo-left') &&
        (jQuery('#hero').hasClass('side-right') || jQuery('#hero').hasClass('side-right-small')))
    ) {
    } else {
      jQuery('header').addClass('onhero');
      if (jQuery('#hero').attr('class') && jQuery('#hero').attr('class').indexOf('side') >= 0) {
        jQuery('header').addClass('hero-side');
        jQuery('#logo').addClass('disable-switch');
      }
    }
    if (jQuery('#logo').hasClass('logo-right')) {
      jQuery('header').addClass('logo-is-right');
    }
    jQuery('body').addClass('loaded');
    setTimeout(function () {
      setTimeout(function () {
        animateOnScroll(!0);
        AOS.init();

        // Micromodal

        
      }, 500);
      headerFeatures();
    }, 500);
    setTimeout(function () {
      jQuery('body').addClass('loading-end');
      if (window.location.hash) {
        var filter = window.location.hash.substr(1);
        if (jQuery('.grid-filter li a[data-slug=' + filter + ']').length > 0) {
          jQuery('.grid-filter li a[data-slug=' + filter + ']').trigger('click');
        }
      }
    }, 1500);
    jQuery('header').on('click', '.menu-toggle', function () {
      jQuery('#header').toggleClass('menu-is-open');
      return !1;
    });
    jQuery('#main-nav').on('click', 'li > a', function () {
      var thisItem = jQuery(this);
      var thisParent = jQuery(this).parent('li');
      if (thisItem.siblings('ul').length > 0 && thisItem.siblings('ul').css('display') === 'none') {
        thisItem.siblings('ul').slideDown(400, 'easeInOutCubic');
        thisParent.siblings('li').children('ul').slideUp(400, 'easeInOutCubic');
        return !1;
      }
    });
    jQuery('header').on('click', '.open-action', function () {
      jQuery('#header')
        .addClass('action-is-active ' + jQuery(this).data('action'))
        .removeClass('menu-is-open');
      return !1;
    });
    jQuery('header').on('click', '.header-close', function () {
      jQuery('header .open-action').each(function () {
        jQuery('#header').removeClass(jQuery(this).data('action'));
      });
      jQuery('#header').removeClass('action-is-active').removeClass('menu-is-open');
      return !1;
    });
    if (jQuery().unveil && jQuery('img.lazy').length > 0) {
      jQuery('img.lazy').unveil(800);
    }
    if (jQuery().isotope) {
      jQuery('.isotope-grid').each(function () {
        var $container = jQuery(this);
        var layout = 'masonry';
        if ($container.hasClass('fitrows')) {
          layout = 'fitRows';
        }
        $container.imagesLoaded(function () {
          $container.isotope({
            layoutMode: layout,
            itemSelector: '.isotope-item',
            masonry: { columnWidth: '.isotope-item:not(.double-width)' },
          });
        });
        setTimeout(function () {
          $container.isotope('layout');
          reorganizeIsotope();
        }, 500);
      });
      jQuery('.grid-filter').on('click', 'li a', function () {
        var thisItem = jQuery(this);
        var parentul = thisItem.parents('ul.grid-filter').data('related-grid');
        if (!parentul) {
          alert('Please specify the dala-related-grid');
        } else {
          thisItem.parents('ul.grid-filter').find('li').removeClass('active');
          thisItem.parent('li').addClass('active');
          var selector = thisItem.attr('data-filter');
          jQuery('#' + parentul).isotope({ filter: selector });
          jQuery('#' + parentul + ' .isotope-item .item-inner')
            .not(selector)
            .removeClass('animated');
          setTimeout(function () {
            jQuery('#' + parentul + ' .isotope-item' + selector + ' .item-inner').addClass(
              'animated'
            );
          }, 200);
          var slug = thisItem.data('slug');
          if (slug) {
            window.location.hash = slug;
          } else {
            history.pushState(
              '',
              document.title,
              window.location.pathname + window.location.search
            );
          }
        }
        return !1;
      });
      jQuery('header').on('click', '.open-action.action-filter', function () {
        var relGrid = jQuery('#header .action-overlay.filter-overlay ul.grid-filter').data(
          'related-grid'
        );
        setTimeout(function () {
          jQuery('html,body').animate(
            { scrollTop: jQuery('#' + relGrid).offset().top },
            1000,
            'easeInOutQuart'
          );
        }, 300);
        return !1;
      });
      var loadMore = jQuery('.load-isotope:not(.disabled) a');
      loadMore.click(function () {
        var el = jQuery(this);
        if (el.data('loadpage') === undefined) {
          el.data('loadpage', '2');
        } else {
          el.data('loadpage', parseInt(el.data('loadpage'), 10) + 1);
        }
        var related = el.data('related-grid');
        var href = el.attr('href').replace('/2', '/' + el.data('loadpage'));
        href = href.replace('2', el.data('loadpage'));
        var datas = '';
        if (el.data('options') !== undefined && el.data('options')) {
          datas = el.data('options').replace('paged=2', 'paged=' + el.data('loadpage'));
        }
        isotopeLoadMore(jQuery('#' + related), el, href, datas);
        return !1;
      });
    }
    if (jQuery().lightcase) {
      jQuery('a[data-rel^=lightcase]').lightcase({
        showSequenceInfo: !1,
        swipe: !0,
        showCaption: !0,
        overlayOpacity: 0.9,
        maxWidth: 1300,
        maxHeight: 1100,
        shrinkFactor: 1,
        liveResize: !0,
        fullScreenModeForMobile: !0,
        video: { width: 854, height: 480 },
        iframe: { width: 854, height: 480, allowfullscreen: 1 },
      });
      jQuery('a[data-rel^="lightcase:"]').each(function (index) {
        var el = jQuery(this);
        if (
          !el.hasClass('lc-trigger') &&
          !el.parents('.isotope-item').hasClass('sr-gallery-item')
        ) {
          var rel = el.data('rel');
          var href = el.attr('href');
          var count = jQuery('a[href="' + href + '"][data-rel="' + rel + '"]').length;
          if (count > 1) {
            jQuery('a[href="' + href + '"][data-rel="' + rel + '"]')
              .not(this)
              .addClass('lc-trigger')
              .attr('data-trigger', index)
              .attr('data-rel', '');
            el.addClass('lc-trigger-' + index);
          }
        }
      });
      jQuery('a.lc-trigger').on('click', function () {
        jQuery('.lc-trigger-' + jQuery(this).data('trigger')).trigger('click');
        return !1;
      });
      jQuery('a[data-rel^=lightcase]').on('click', function () {
        if (jQuery('.phatvideo-bg .mute-video:not(.unmute)').length) {
          jQuery('.phatvideo-bg .mute-video:not(.unmute)').each(function () {
            jQuery(this).trigger('click');
          });
        }
      });
    }
    jQuery('body').on('click', '.inline-video', function () {
      var el = jQuery(this);
      var type = el.data('type');
      var video = el.data('videoid');
      if (type === 'youtube') {
        var iframe =
          '<iframe src="https://www.youtube.com/embed/' +
          video +
          '?autoplay=1" width="100%" height="100%" frameborder="0" allowfullscreen ></iframe>';
      } else if (type === 'vimeo') {
        var iframe =
          '<iframe src="https://player.vimeo.com/video/' +
          video +
          '?autoplay=1" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>';
      }
      el.append('<div class="inline-iframe-container"></div>');
      el.find('.inline-iframe-container').html(iframe + '<div class="close-inline-video"></div>');
      setTimeout(function () {
        el.addClass('active');
      }, 1000);
      return !1;
    });
    jQuery('body').on('click', '.close-inline-video', function () {
      var thisItem = jQuery(this);
      thisItem.parents('.inline-video').removeClass('active');
      thisItem.parent('.inline-iframe-container').remove();
      return !1;
    });
    if (jQuery().revolution) {
      jQuery('.revolution-slider').revolution({
        sliderType: 'standard',
        sliderLayout: 'fullscreen',
        fullScreenAutoWidth: 'on',
        fullScreenOffsetContainer: '#pseudo-header',
        delay: 7000,
        disableProgressBar: 'on',
        navigation: {
          arrows: {
            enable: !1,
            style: 'noha-nav',
            left: { h_offset: 40 },
            right: { h_offset: 40 },
          },
          bullets: {
            enable: !0,
            style: 'noha-bullets',
            h_align: 'right',
            v_align: 'bottom',
            h_offset: 40,
            v_offset: 40,
            space: 7,
          },
          touch: {
            touchenabled: 'on',
            swipe_treshold: 75,
            swipe_min_touches: 1,
            drag_block_vertical: !1,
            swipe_direction: 'horizontal',
          },
        },
        responsiveLevels: [1440, 1160, 700, 500],
        gridwidth: [1000, 640, 500, 280],
        gridheight: [700, 550, 550, 450],
        lazyType: 'smart',
      });
      jQuery('#hero .revolution-slider').bind('revolution.slide.onchange', function (e, data) {
        if (data.currentslide.hasClass('text-light')) {
          jQuery('#logo').addClass('text-light');
          jQuery('#hero #scrolldown').addClass('text-light');
          jQuery('#hero .revolution-slider .noha-nav')
            .addClass('noha-light')
            .removeClass('noha-dark');
          jQuery('#hero .revolution-slider .noha-bullets')
            .addClass('noha-light')
            .removeClass('noha-dark');
        } else {
          jQuery('#logo').removeClass('text-light');
          jQuery('#hero #scrolldown').removeClass('text-light');
          jQuery('#hero .revolution-slider .noha-nav')
            .addClass('noha-dark')
            .removeClass('noha-light');
          jQuery('#hero .revolution-slider .noha-bullets')
            .addClass('noha-dark')
            .removeClass('noha-light');
        }
      });
    }
    if (jQuery().owlCarousel) {
      jQuery('.owl-slider').owlCarousel({
        items: 1,
        nav: !1,
        navText: !1,
        dots: !0,
        smartSpeed: 600,
        singleItem: !0,
        autoHeight: !0,
        loop: !1,
        autoplay: !1,
        autoplayHoverPause: !0,
        navRewind: !1,
      });
      jQuery('.owl-carousel').owlCarousel({
        items: 4,
        itemsDesktop: !1,
        responsive: { 480: { items: 1 }, 768: { items: 2 } },
        autoplay: !1,
        autoHeight: !0,
        nav: !0,
        navText: !1,
        dots: !0,
        loop: !1,
      });
    }
    if (jQuery().parallax) {
      jQuery('.parallax-section').parallax({ speed: 0.6 });
    }
    if (jQuery().fitVids) {
      jQuery('body').fitVids();
    }
    if (jQuery().phatVideoBg) {
      jQuery('.videobg-section').phatVideoBg();
    }
    if (jQuery().mediaelementplayer) {
      jQuery('audio,video:not(.video-background)').mediaelementplayer();
    }
    if (jQuery().stick_in_parent) {
      jQuery("#hero[class*='side-']").stick_in_parent({ spacer: !1 });
      if (jQuery(window).width() < 769) {
        jQuery("#hero[class*='side-']").trigger('sticky_kit:detach');
      }
    }
    jQuery('.tabs:not(.wc-tabs):not(.woocommerce-tabs)').each(function () {
      var thisItem = jQuery(this);
      thisItem.find('.tab-content').removeClass('active').css('display', 'none');
      var rel = thisItem.find('.active a').attr('href');
      thisItem.find('.' + rel).addClass('active');
    });
    jQuery('.tab-nav:not(.wc-tabs)').on('click', 'a', function () {
      var thisItem = jQuery(this);
      var parentdiv = thisItem.parents('li').parent('ul').parent('div');
      var rel = thisItem.attr('href');
      jQuery(parentdiv).find('.tab-nav li').removeClass('active');
      thisItem.parents('li').addClass('active');
      jQuery(parentdiv).find('.tab-container .tab-content').hide().removeClass('active');
      jQuery(parentdiv)
        .find('.tab-container .' + rel)
        .fadeIn(500)
        .addClass('active');
      return !1;
    });
    jQuery('.toggle-item').each(function () {
      if (!jQuery(this).find('.toggle-active').length) {
        jQuery(this).find('.toggle-inner').slideUp(300);
      }
      jQuery(this)
        .find('.toggle-active')
        .parent('.toggle-item')
        .siblings('.toggle-item')
        .find('.toggle-inner')
        .slideUp(300);
      jQuery(this).find('.toggle-active').siblings('.toggle-inner').slideDown(300);
    });
    jQuery('.toggle-item').on('click', '.toggle-title', function () {
      var thisItem = jQuery(this);
      var parentdiv = thisItem.parent('div').parent('div');
      var active = thisItem.parent('div').find('.toggle-inner').css('display');
      if (jQuery(parentdiv).attr('class') === 'accordion') {
        if (active !== 'none') {
          jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
          thisItem.toggleClass('toggle-active');
        } else {
          jQuery(parentdiv).find('.toggle-item .toggle-inner').slideUp(300);
          jQuery(parentdiv).find('.toggle-item .toggle-title').removeClass('toggle-active');
          thisItem.toggleClass('toggle-active');
          thisItem.siblings('.toggle-inner').slideDown(300);
        }
      } else {
        thisItem.toggleClass('toggle-active');
        thisItem.siblings('.toggle-inner').slideToggle(300);
      }
      return !1;
    });
    jQuery('body').on('click', '.totop,#scrolldown', function () {
      var topPos = 0;
      if (jQuery(this).attr('id') === 'scrolldown') {
        topPos = jQuery('#page-body').offset().top;
      }
      jQuery('html,body').animate({ scrollTop: topPos }, 1000, 'easeInOutQuart');
      return !1;
    });
    jQuery('body').on('click', '.share-icon', function () {
      jQuery('header').toggleClass('share-active');
      return !1;
    });
    resizeAdapt();
  });
  jQuery(window).scroll(function () {
    animateOnScroll(!1);
    headerFeatures();
  });
  jQuery(window).resize(function () {
    reorganizeIsotope();
    resizeAdapt();
  });

  //   $('.navbar-body-content nav ul li a:not(:only-child)').click(function (e) {
  //     $(this).siblings('.nav-dropdown').toggle();

  //     $(this).find('i').not($(this)).toggleClass('fa-rotate-180');

  //     $('.nav-dropdown').not($(this).siblings()).hide();
  //     e.stopPropagation();
  //   });

  //   $('.navbar-body-content nav ul li a:not(:only-child)').on({
  //     click: function (e) {
  //       $(this).siblings('.nav-dropdown').toggle();
  //       $('.nav-dropdown').not($(this).siblings()).hide();
  //       $('.dropdown-nav-item i').not($(this)).removeClass('fa-rotate-180');
  //       $(this).children('i').toggleClass('fa-rotate-180');
  //       e.stopPropagation();
  //     },
  //   });

  $('.navbar-body-content .dropdown-nav-item')
    .on('click', function (e) {
      e.preventDefault();

      $(this).siblings('.nav-dropdown').slideToggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      $(this).children('i').toggleClass('fa-rotate-180');
      e.stopPropagation();
    })
    .on('mouseleave', function (e) {
      if (e.relatedTarget != $(this).siblings('.nav-dropdown').find('li a')[0]) {
        if ($(this).siblings('.nav-dropdown').css('display') === 'block') {
          $(this).siblings('.nav-dropdown').slideToggle();
        }
        $(this).children('i').removeClass('fa-rotate-180');
      }
      e.stopPropagation();
    });

  $('.nav-dropdown').on('mouseleave', function () {
    $(this).slideToggle();

    $(this).prev('.dropdown-nav-item').children('i').removeClass('fa-rotate-180');
  });

  // ############### DEMO OPTION ################# //
  // ############### DEMO OPTION ################# //
})(jQuery);

/*
* Tentang Kami
=> Profil Perusahaan
=> Dewan Pengawas
=> Direksi
=> Struktur Organisasi
=> Peruri Group
=> PSrE
=> Obyek Vital Nasional
=> Sertifikasi

* Korporasi
=> Tata Kelola Perusahaan
=> Legal Repository
=> Whistleblowing System
=> Informasi
=> Keterbukaan Informasi Publik

* Produk
=> Uang Kertas & Uang Logam
=> Kertas Berharga Non Uang
=> Logam Non Uang
=> Digital Business Solution

* Hubungan Investor
=> Laporan Tahunan
=> Laporan Keberlanjutan
=> Laporan Keungan
=> Laporan PKBL

* PKBL
=> Program Kemitraan
=> Program Bina Lingkungan

*/
