import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 



 let scene = new THREE.Scene(); // initialize scene with default values
      let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // resize canvas on resize window
      window.addEventListener("resize", () => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        renderer.setSize(windowWidth, windowHeight);
        camera.aspect = windowHeight / windowWidth;
        camera.updateProjectionMatrix();
      });

      const controls = new OrbitControls(camera, renderer.domElement);


      // create the shape
      let geometry = new THREE.BoxGeometry(2, 2, 2);

      // create a material, color or image textute for each of the faces of the cube
      let cubeMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }), //LEFT side with white color face
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/react.png'), side: THREE.DoubleSide }), //RIGHT
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/ruby.png'), side: THREE.DoubleSide }), //TOP
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/node.png'), side: THREE.DoubleSide }), //BOTTOM
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/tailwind.png'), side: THREE.DoubleSide }), //FRONT
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/html.png'), side: THREE.DoubleSide }) //BACK
      ];

      // create a material, color, and set the  material wireframe state
      // let material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

      // create a mesh containing the geometry and material properties
      let cube = new THREE.Mesh(geometry, cubeMaterials);

      // add the mesh to the scene
      scene.add(cube);

      // position the camera
      camera.position.z = 5;

      // iplement permanent rotation
      let update = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.005;
      };

      // draw scene
      let render = () => {
        renderer.render(scene, camera);
      };

      // run game loop (update, render, repeat)
      let GameLoop = () => {
        requestAnimationFrame(GameLoop);

        update();
        render();
      };

      GameLoop();