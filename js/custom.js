

// new Vue({
//   el: '#vtx-wheel .wheel-dot',
//   methods:  {
//     animateWheelDot: function() {
//       alert('test');
//       wheelDot.reset();
//       wheelDot.play();
//     }
//   }
// });


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





// document.getElementById('vtx-wheel').function(){
//   forEach
// };
//
// new Vue({
//   el: '#app',
//   data: {
//     users: [],
//     active: false,
//     show: false,
//     name: '',
//     email: '',
//     caps: '',
//     response: '',
//     activeClass: 'active'
//   },
//   methods: {
//     submitForm() {
//       axios.post('//jsonplaceholder.typicode.com/posts', {
//         name: this.name,
//         email: this.email,
//         caps: this.caps
//       }).then(response => {
//         this.response = JSON.stringify(response, null, 2)
//       })
//     }
//   },
//   created () {
//     var vm = this
//     axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(function (response) {
//         vm.users = response.data
//       })
//   }
// });

var SEPARATION = 50, AMOUNTX = 100, AMOUNTY = 50;
var container, stats;
var camera, scene, renderer;
var particles, particle, count = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();
// updatePlane();

function init() {
  container = document.getElementById('volentix-bg');
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  scene = new THREE.Scene();
  // particles = new Array();
  // var PI2 = Math.PI * 2;
  // var material = new THREE.LineBasicMaterial({ color: 0xffffff });
  //
  // var geometry = new THREE.Geometry();
  // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  // geometry.vertices.push(new THREE.Vector3(20, 10, 0));
  //
  // var i = 0;
  // for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
  //   for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
  //     particle = particles[ i ++ ] = new THREE.Line(geometry, material);
  //     particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
  //     particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
  //     scene.add( particle );
  //   }
  // }

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

  renderer = new THREE.WebGLRenderer( { alpha: true } );
  renderer.setClearColor( 0x000000, 0 ); // the default
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

// function updatePlane() {
//  for (var i = 0; i < plane.geometry.vertices.length; i++)
//  {
//    plane.geometry.vertices[i].z += Math.random()*vertexHeight     -vertexHeight;
//  }
// };
//
// function animateShit(){
//  plane.geometry.vertices[1].z+=.01;
//  plane.geometry.verticesNeedUpdate=true;
// }
//
function animate() {
  requestAnimationFrame( animate );
  render();
}
function render() {

  var timer = Date.now() * 0.0001;

  camera.position.x = 600;
  camera.position.y = 400;
  camera.position.z = 1000;
  camera.lookAt( scene.position );

  // var i = 0;
  // for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
  //   for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
  //     particle = particles[ i++ ];
  //     particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
  //       ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
  //   }
  // }

  planet1.position.z = -1000;
  planet1.position.x = 1000;
  planet1.position.y = -600;

  scene.traverse( function( planet1 ) {
		if ( planet1.isMesh === true ) {
			planet1.rotation.x -= 0.0001;
			planet1.rotation.y -= 0.0001;
		}
	} );
  renderer.render( scene, camera );
  count += 0.1;
}
