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
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./../assets/images/react.png'), side: THREE.DoubleSide }), //RIGHT
        new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/ruby.png'), side: THREE.DoubleSide }), //TOP
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./../assets/images/node.png'), side: THREE.DoubleSide }), //BOTTOM
        new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load('./../assets/images/tailwind.png'), side: THREE.DoubleSide }), //FRONT
        new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/html.png'), side: THREE.DoubleSide }) //BACK
      ];

      // creates textured walls (floor, ceiling, left, and right) surrounding the cube.
      let floorGeometry = new THREE.BoxGeometry(10, 0.5, 10);
      let floorMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/floor.png'), side: THREE.DoubleSide });
      let floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -5;
      scene.add(floor);

      let ceilingGeometry = new THREE.BoxGeometry(10, 0.5, 10);
      let ceilingMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/ceiling.png'), side: THREE.DoubleSide });
      let ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
      ceiling.position.y = 5;
      scene.add(ceiling);

      let leftGeometry = new THREE.BoxGeometry(0.5, 10, 10);
      let leftMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/left-right.png'), side: THREE.DoubleSide });
      let left = new THREE.Mesh(leftGeometry, leftMaterial);
      left.position.x = -5;
      scene.add(left);

      let rightGeometry = new THREE.BoxGeometry(0.5, 10, 10);
      let rightMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./../assets/images/left-right.png'), side: THREE.DoubleSide });
      let right = new THREE.Mesh(rightGeometry, rightMaterial);
      right.position.x = 5;
      scene.add(right);

      // create a material, color, and set the  material wireframe state
      // let material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });

      // create a mesh containing the geometry and material properties
      let cube = new THREE.Mesh(geometry, cubeMaterials);

      // add the mesh to the scene
      scene.add(cube);

      // position the camera
      camera.position.z = 3;

      // add ambient light to the scene
      let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.8);
      scene.add(ambientLight);

      // add point light source
      let light1 = new THREE.PointLight(0xFF0040, 4, 50);
      scene.add(light1);


      let light2 = new THREE.PointLight(0x0040FF, 2, 50);
      scene.add(light2);

      let light3 = new THREE.PointLight(0x80FF80, 4, 50);
      scene.add(light3);
      

      // implement permanent rotation
      let update = () => {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.005;

        // update light1 position
        let time = Date.now() * 0.0005;

        light1.position.x = Math.sin(time * 0.7) * 3;
        light1.position.y = Math.cos(time * 0.5) * 4;
        light1.position.z = Math.cos(time * 0.3) * 3;

        // update light2 position
        light2.position.x = Math.cos(time * 0.3) * 3;
        light2.position.y = Math.sin(time * 0.5) * 4;
        light2.position.z = Math.sin(time * 0.7) * 3;

        // update light3 position
        light3.position.x = Math.sin(time * 0.7) * 3;
        light3.position.y = Math.cos(time * 0.3) * 4;
        light3.position.z = Math.sin(time * 0.5) * 3;
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