import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';

@Component({
  selector: 'app-animate-background',
  templateUrl: './animate-background.component.html',
  styleUrls: ['./animate-background.component.scss'],
})
export class AnimateBackgroundComponent {
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 300);

    const directionalLight = new THREE.DirectionalLight('#fff', 4);
    directionalLight.position.set(20, 50, -20);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight('#ffffff', 5);
    ambientLight.position.set(0, 20, 20);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = true;

    const loader = new THREE.TextureLoader();
    const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    const textureStar = loader.load('https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png');
    const texture1 = loader.load('https://i.ibb.co/F8by6wW/p2-b3gnym.png');
    const texture2 = loader.load('https://i.ibb.co/yYS2yx5/p3-ttfn70.png');
    const texture4 = loader.load('https://i.ibb.co/yWfKkHh/p4-avirap.png');

    /*  Nucleus  */
    texturenucleus.anisotropy = 60;
    const icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    const lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    const nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);

    /*    Sphere  Background   */
    textureSphereBg.anisotropy = 40;
    const geometrySphereBg = new THREE.SphereGeometry(250, 40, 40);
    const materialSphereBg = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: textureSphereBg,
    });
    const sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    sphereBg.geometry.attributes['position'].needsUpdate = true;
    scene.add(sphereBg);

    /* Fixed Stars */
    function createStars(texture: any, size: any, total: any) {
      const positions = new Float32Array(total * 3);

      // Moving Stars
      const starsGeometry = new THREE.BufferGeometry();
      const velocities = new Float32Array(50);
      const startPositions = new Float32Array(50 * 3);

      for (let i = 0; i < 50; i++) {
        const particleStar = randomPointSphere(150);

        const velocity = THREE.MathUtils.randInt(50, 200);

        particleStar.toArray(positions, i * 3);
        velocities[i] = velocity;
        particleStar.toArray(startPositions, i * 3);
      }

      const starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: '#ffffff',
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: THREE.AdditiveBlending,
      });

      starsMaterial.depthWrite = false;

      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 2));
      starsGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
      starsGeometry.setAttribute('startPosition', new THREE.BufferAttribute(startPositions, 1));

      function updateStarsAnimation() {
        const positions = starsGeometry.getAttribute('position');
        const velocities = starsGeometry.getAttribute('velocity');
        const startPositions = starsGeometry.getAttribute('startPosition');

        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = positions.getZ(i);

          const velocity = velocities.getX(i);

          positions.setX(i, x + (0 - x) / velocity);
          positions.setY(i, y + (0 - y) / velocity);
          positions.setZ(i, z + (0 - z) / velocity);

          velocities.setX(i, velocity - 0.3);

          if (x <= 5 && x >= -5 && z <= 5 && z >= -5) {
            positions.setXYZ(i, startPositions.getX(i), startPositions.getY(i), startPositions.getZ(i));

            velocities.setX(i, THREE.MathUtils.randInt(50, 200));
          }
        }

        positions.needsUpdate = true;
        velocities.needsUpdate = true;
      }

      return stars;
    }

    const stars = createStars(texture1, 15, 20);
    const stars2 = createStars(texture2, 5, 5);
    const stars3 = createStars(texture4, 7, 5);
    stars2.position.set(100, 0, 0);
    stars3.position.set(-100, 0, 0);
    scene.add(stars, stars2, stars3);

    function randomPointSphere(radius: any) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const dx = radius * Math.sin(phi) * Math.cos(theta); // Removed unnecessary '+ 0'
      const dy = radius * Math.sin(phi) * Math.sin(theta); // Removed unnecessary '+ 0'
      const dz = radius * Math.cos(phi); // Removed unnecessary '+ 0'
      return new THREE.Vector3(dx, dy, dz);
    }

    const animate = function () {
      requestAnimationFrame(animate);

      //nucleus.geometry.normalsNeedUpdate = true;
      nucleus.geometry.computeVertexNormals();
      nucleus.rotation.y += 0.002;

      //Sphere Background Animation
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      sphereBg.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();
    onWindowResize();
  }
}
