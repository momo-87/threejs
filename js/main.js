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
      let geometry = new THREE.BoxGeometry(1, 1, 1);

      // create a material, color or image textute
      let material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

      // create a mesh containing the geometry and material
      let cube = new THREE.Mesh(geometry, material);

      // add the mesh to the scene
      scene.add(cube);

      // position the camera
      camera.position.z = 3;

      // game logic
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