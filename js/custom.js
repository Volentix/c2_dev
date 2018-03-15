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

var SEPARATION = 50, AMOUNTX = 100, AMOUNTY = 50;
var container, stats;
var camera, scene, renderer;
var particles, particle, count = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.getElementById('volentix-bg');
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();

  planet1 = new THREE.Group();
	scene.add( planet1 );

  // earth
	var loader = new THREE.TextureLoader();
	loader.load( 'textures/land_ocean_ice_cloud_2048.png', function ( texture ) {
		var geometry = new THREE.SphereGeometry( 600, 20, 20 );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		var mesh = new THREE.Mesh( geometry, material );
		planet1.add( mesh );
	} );

  var planeGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0x1d2430, side: THREE.DoubleSide});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.position.set(0, 0, 0);

  scene.add(plane);

  var geo = new THREE.WireframeGeometry( plane.geometry );
  var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3 } );
  var wireframe = new THREE.LineSegments( geo, mat );
  plane.add( wireframe );

  renderer = new THREE.WebGLRenderer( { alpha: true } );

  renderer.setClearColor( 0x000000, 0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {

  //Render Camers
  camera.position.x = 0;
  camera.position.y = 90;
  camera.position.z = 100;
  camera.lookAt( scene.position );

  //Render Planet
  planet1.position.z = -1000;
  planet1.position.x = 1000;

  //Rotate Planet
  scene.traverse( function( planet1 ) {
		if ( planet1.isMesh === true ) {
			planet1.rotation.x -= 0.0001;
			planet1.rotation.y -= 0.0001;
		}
	});

  renderer.render( scene, camera );
}
