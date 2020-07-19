import Zooming from 'zooming'
import md5 from 'js-md5'
import twemoji from 'twemoji'

const $ = window.jQuery
require('slick-carousel')

// twemoji
$(() => {
  if (twemoji && twemoji.parse) {
    twemoji.parse(document.body)
    // twemoji.parse(document.body, {
    //   folder: 'svg',
    //   ext: '.svg'
    // })
  }
})

$(() => {
  const zooming = new Zooming({
    scaleBase: 0.5
  })

  zooming.listen('.img-zoomable')

  $('#slider').slick({
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      }
    ]
  })
})

// add color to tag
$(() => {
  $('article a.c-tag').each(function () {
    var hash = md5($(this).text())
    var h = hash.split('').map(c => c.charCodeAt(0)).reduce((acc, cur) => acc + cur) % 360
    $(this).attr('data-hue', h)
  })

  $('.c-tag').on('mouseover', function () {
    const hue = $(this).data('hue')
    setColor($(this), hue, 30)
  })

  $('.c-tag').on('mouseleave', function () {
    const hue = $(this).data('hue')
    setColor($(this), hue, 75)
  })

  $('.c-tag').trigger('mouseleave')
  // border: rgb(137, 139, 245) 1px solid;
  // border-radius: 5px;
  function setColor ($target, h, l) {
    $target.css('color', `hsl(${h}, 85%, ${l}%)`).css('border', `hsl(${h}, 85%, ${l}%) 1px solid`)
  }
})

// add icon to external link
$(() => {
  $('a[href]').each(function () {
    var thisUrl = $(this).attr('href')
    console.debug(thisUrl)
    if ((thisUrl.startsWith('http://') && !thisUrl.startsWith(`http://${window.location.host}`)) ||
        (thisUrl.startsWith('https://') && !thisUrl.startsWith(`https://${window.location.host}`))) {
      $(this).attr('target', '_blank').attr('ref', 'nofollow')
    }
  })
})

// toggle theme
$(() => {
  const setTheme = (name) => { $('html').attr('class', name || 't-system') }
  const setLocalStorage = (k, v) => { localStorage.setItem(k, v) }
  const getLocalStorage = (k) => { return localStorage.getItem(k) }

  setTheme(getLocalStorage('theme'))

  $('.js-theme-toggle').on('click', function () {
    var themename = $(this).data('theme')
    setTheme(themename)
    setLocalStorage('theme', themename)
  })
  // $('#themeToggle').on('click', function () {
  //   setLocalStorage('theme', getLocalStorage('theme') === 't-dark' ? 't-light' : 't-dark')
  //   setTheme()
  // })
})
