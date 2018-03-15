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

        $('.close-node').click(function(){
          $('.nodes').removeClass('active').css('fill', '#ffffff');
          $('#vtx-wheel .wheel-dot').children('circle').css('fill', '#ffffff');
        });
      }
    });
  });
});

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75,
// 	window.innerWidth/window.innerHeight, 1, 10000);
// var renderer = new THREE.WebGLRenderer({ alpha: true } );
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('volentix-bg').appendChild(renderer.domElement);
//
// var light = new THREE.DirectionalLight();
// light.position.set(0,0,1);
// camera.add(light);
//
// scene.add(camera);
// scene.add(new THREE.AmbientLight(0x222222));
//
// planet1 = new THREE.Group();
// scene.add( planet1 );
//
// // earth
// var loader = new THREE.TextureLoader();
// loader.load( 'textures/planet.jpg', function ( texture ) {
//   var geometry = new THREE.SphereGeometry( 100, 20, 20 );
//   var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
//   var mesh = new THREE.Mesh( geometry, material );
//   planet1.add( mesh );
//   planet1.position.set(200, -150, -50);
// } );
//
// planet2 = new THREE.Group();
// scene.add( planet2 );
//
// // earth
// var loader = new THREE.TextureLoader();
// loader.load( 'textures/moon.jpg', function ( texture ) {
//   var geometry = new THREE.SphereGeometry( 5, 20, 20 );
//   var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
//   var mesh = new THREE.Mesh( geometry, material );
//   planet2.add( mesh );
//   planet2.position.set(160, -10, -20);
// } );
//
// var planeGeometry = new THREE.PlaneGeometry(600, 250, 60, 56);
//
// vertexColors = [];
// vertexColorVelocities = [];
// for (i = 0; i < planeGeometry.vertices.length; i++) {
//     var c = new THREE.Color();
//     c.setHSL( Math.random(), 0.7, 0.4 );
//     vertexColors.push(c);
//     vertexColorVelocities.push(0.001 + 0.002*Math.random());
// }
//
// faceColors = [];
// faceColorVelocities = [];
// for (i = 0; i < planeGeometry.faces.length; i++) {
//     var c = new THREE.Color();
//     c.setHSL( Math.random(), 0.7, 0.4);
//     faceColors.push(c);
//     faceColorVelocities.push(0.001 + 0.002*Math.random());
// }
//
// faceVertexColors = [];
// faceVertexColorVelocities = [];
// for (i = 0; i < planeGeometry.faces.length; i++) {
//     var colors = [];
//     var v = [];
//     for (var j = 0; j < 3; j++) {
//         var c = new THREE.Color();
//         c.setHSL( Math.random(), 0.7, 0.5 );
//         colors.push(c);
//         v.push(0.001 + 0.002*Math.random());
//     }
//     faceVertexColors.push(colors);
//     faceVertexColorVelocities.push(v);
// }
//
// material = new THREE.MeshLambertMaterial({
//     polygonOffset: true,
//     polygonOffsetUnits: 1,
//     polygonOffsetFactor: 1,
//     color: 0x1d2430,
// });
//
// for (i = 0; i < planeGeometry.faces.length; i++) {
//     planeGeometry.faces[i].color = "black";
// }
//
// var plane = new THREE.Mesh( planeGeometry, material );
//
// wireSphere = new THREE.Mesh(
//      planeGeometry,
//      new THREE.MeshBasicMaterial({ color: 0, wireframe: true })
// );
//
// scene.add(plane);
// plane.add(wireSphere);
//
// plane.geometry.dynamic = true;
// plane.position.set(-80, 0, 120);
// plane.rotation.x = -0.5 * Math.PI;
// plane.rotation.z = -0.2;
// camera.position.set(0, 90, 100);
// camera.lookAt(scene.position);
//
// var raycaster = new THREE.Raycaster();
// var center = new THREE.Vector3(-300, 250, 0);
// var anim = function(ts) {
//   requestAnimationFrame(anim);
//
//   planet1.rotation.x -= 0.0001;
//   planet1.rotation.y -= 0.0001;
//
//   var vLength = plane.geometry.vertices.length;
//   for (var i = 0; i < vLength; i++) {
//     var v = plane.geometry.vertices[i];
//     var dist = new THREE.Vector3(v.x, v.y, v.z).sub(center);
//     var size = 5.0;
//     var magnitude = 5;
//     v.z = Math.sin(dist.length()/-size + (ts/250)) * magnitude;
//   }
//   plane.geometry.verticesNeedUpdate = true;
//   renderer.render(scene, camera);
// }
// anim();
//
// var render = function() {
//   requestAnimationFrame(render);
//   renderer.render(scene, camera);
// };
// render();
