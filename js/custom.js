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

      animateEl.addClass(direction, setTimeout(function(){
        animateEl.removeClass(direction)
        animateEl.siblings().removeClass(direction)
      },510));

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

    });
  });
});

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,
	window.innerWidth/window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({ alpha: true } );
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('volentix-bg').appendChild(renderer.domElement);
var mouse = new THREE.Vector3();

var planeGeometry = new THREE.PlaneGeometry(600, 250, 60, 56);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0x1d2430, side: THREE.DoubleSide});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

var geo = new THREE.WireframeGeometry( plane.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3 } );
var wireframe = new THREE.LineSegments( geo, mat );
plane.add( wireframe );

plane.geometry.dynamic = true;
plane.position.set(-80, 0, 80);
plane.rotation.x = -0.5 * Math.PI;
plane.rotation.z = -0.2;
camera.position.set(0, 90, 100);
camera.lookAt(scene.position);

var raycaster = new THREE.Raycaster();
var center = new THREE.Vector3(-300, 250, 0);
var anim = function(ts) {
  requestAnimationFrame(anim);
  var vLength = plane.geometry.vertices.length;
  for (var i = 0; i < vLength; i++) {
    var v = plane.geometry.vertices[i];
    var dist = new THREE.Vector3(v.x, v.y, v.z).sub(center);
    var size = 5.0;
    var magnitude = 5;
    v.z = Math.sin(dist.length()/-size + (ts/250)) * magnitude;
  }
  plane.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}
anim();

var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};
render();
