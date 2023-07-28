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
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.set(0, 0, 300);

    const directionalLight = new THREE.DirectionalLight('#fff', 2);
    directionalLight.position.set(0, 50, -20);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight('#ffffff', 3);
    ambientLight.position.set(0, 20, 20);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2;
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
    texturenucleus.anisotropy = 26;
    const icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    const lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    const nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);

    /*    Sphere  Background   */
    textureSphereBg.anisotropy = 20;
    const geometrySphereBg = new THREE.SphereGeometry(250, 40, 40);
    const materialSphereBg = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      map: textureSphereBg,
    });
    const sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    sphereBg.geometry.attributes['position'].needsUpdate = true;
    scene.add(sphereBg);

    const animate = function () {
      requestAnimationFrame(animate);

      //nucleus.geometry.normalsNeedUpdate = true;
      nucleus.geometry.computeVertexNormals();
      //nucleus.geometry.computeFaceNormals();
      nucleus.rotation.y += 0.002;

      //Sphere Background Animation
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      sphereBg.rotation.z += 0.002;

      renderer.render(scene, camera);
    };
    controls.update();
    //stars.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
    animate();
    requestAnimationFrame(animate);
  }
}
