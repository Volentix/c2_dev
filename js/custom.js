$(function(){
  $('#vtx-wheel .wheel-dot').each(function(){
    $(this).click(function(){
      $node = '#' + $(this).attr('mydata:node');
      $('#vtx-wheel .wheel-dot').children('circle').css('fill', '#ffffff');
      $(this).children('circle').css('fill', '#cf7532');

      $('.nodes').removeClass('active').css('fill', '#ffffff');
      $($node).toggleClass('active');
      $($node).find('a').hide();

      function typeWriter(el, text, n) {
        if (n < (text.length)) {
          $(el).html(text.substring(0, n+1));
          n++;
          setTimeout(function() {
            typeWriter(el, text, n)
          }, 10);
        } else {
          setTimeout(function() {
            $($node).find('.read-more').show().css('opacity', '1');
          }, 50);
        }
      }

      var el = $($node).find('p');
      var text = el.data('text');
      typeWriter(el, text, 0);
    });
  });
});
