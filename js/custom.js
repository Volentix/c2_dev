$(function(){
  var prevNode;
  var currNode;

  $('#vtx-wheel .wheel-dot').each(function(){
    $(this).click(function(){

      if(typeof currNode !== 'undefined') {
        prevNode = currNode;
      }

      $node = '#' + $(this).attr('mydata:node');
      currNode = $(this).attr('mydata:node');

      if(currNode == 'vtx' && prevNode != 'vchain' ) {
        animateEl = $('#vtx-wheel #top');
        direction = 'cwise';
      } else if (currNode == 'vtx' && prevNode == 'vchain' ) {
        animateEl = $('#vtx-wheel #right');
        direction = 'ccwise';

      } else if (currNode == 'vchain' && prevNode != 'vdex' ) {
        animateEl = $('#vtx-wheel #right');
        direction = 'cwise';
      } else if (currNode == 'vchain' && prevNode == 'vdex' ) {
        animateEl = $('#vtx-wheel #bottom');
        direction = 'ccwise';

      } else if (currNode == 'vdex' && prevNode != 'vesp' ) {
        animateEl = $('#vtx-wheel #bottom');
        direction = 'cwise';
      } else if (currNode == 'vdex' && prevNode == 'vesp' ) {
        animateEl = $('#vtx-wheel #left');
        direction = 'ccwise';

      } else if (currNode == 'vesp' && prevNode != 'vtx' ) {
        animateEl = $('#vtx-wheel #left');
        direction = 'cwise';
      } else if (currNode == 'vesp' && prevNode == 'vtx' ) {
        animateEl = $('#vtx-wheel #top');
        direction = 'ccwise';
      }

      if($($node).hasClass('active')) {
        $('.nodes').removeClass('active').css('fill', '#ffffff');
        $('#vtx-wheel .wheel-dot').children('circle').css('fill', '#ffffff');
      } else {
        animateEl.addClass(direction, setTimeout(function(){
          animateEl.removeClass(direction)
          animateEl.siblings().removeClass(direction)
        },610));

        $('#vtx-wheel .wheel-dot').children('circle').css('fill', '#ffffff');
        $(this).children('circle').css('fill', '#cf7532');

        $('.nodes').removeClass('active').css('fill', '#ffffff');
        $($node).toggleClass('active');
        $('#vtx-wheel').addClass('beam');
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
            $('#vtx-wheel').removeClass('beam');
          }
        }

        var el = $($node).find('p');
        var text = el.data('text');
        typeWriter(el, text, 0);

        $('.close-node').click(function(){
          $('.nodes').removeClass('active').css('fill', '#ffffff');
          $('#vtx-wheel .wheel-dot').children('circle').css('fill', '#ffffff');
        });
      }
    });
  });
});
