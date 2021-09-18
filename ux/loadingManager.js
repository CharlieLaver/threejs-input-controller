import { THREE } from '../config.js';

var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
    box: new THREE.Mesh(
      new THREE.BoxGeometry(0.5,0.5,0.5),
      new THREE.MeshBasicMaterial({ color: 0xF8F8FF })
    ),
  
  };
  
  var RESOURCES_LOADED = false;
  
  loadingScreen.scene.background = new THREE.Color( '#1E90FF' );
  
  
  loadingScreen.box.position.set(0,0,5);
  loadingScreen.camera.lookAt(loadingScreen.box.position);
  loadingScreen.scene.add(loadingScreen.box);
  
  var loadingManager = new THREE.LoadingManager();
  
  loadingManager.onLoad = function() {
    RESOURCES_LOADED = true;
  }

  export { loadingScreen, loadingManager, RESOURCES_LOADED};