import Zooming from 'zooming'
import md5 from 'js-md5'

const $ = window.jQuery
require('slick-carousel')

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

$(() => {
  // console.debug(md5('hello, world'))
  $('article a.c-tag').each(function () {
    var hash = md5($(this).text())
    var h = hash.split('').map(c => c.charCodeAt(0)).reduce((acc, cur) => acc + cur) % 360
    $(this).attr('data-hue', h)
  })

  // $('.c-tag').each(function () {
  //   const hue = $(this).data('hue')
  //   set_color($(this), hue, 75, 90)
  // })

  $('.c-tag').on('mouseover', function () {
    const hue = $(this).data('hue')
    setColor($(this), hue, 30)
  })

  $('.c-tag').on('mouseleave', function () {
    const hue = $(this).data('hue')
    setColor($(this), hue, 75)
  })

  $('.c-tag').trigger('mouseleave')

  function setColor ($target, h, l) {
    console.debug(`hsl(${h}, 85%, ${l}%)`)
    $target.css('color', `hsl(${h}, 85%, ${l}%)`)
    // $target.css('background-color', `hsl(${h + (360 / 2)}, 85%, ${bgl}%)`)
  }
})
