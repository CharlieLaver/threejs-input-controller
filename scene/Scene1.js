import { THREE, GLTFLoader, FBXLoader } from '../config.js';
import BasicCharacterController from '../player/Player.js';
import ThirdPersonCamera from '../ux/ThirdPersonCamera.js';
import { loadingScreen, loadingManager, RESOURCES_LOADED } from '../ux/loadingManager.js';
import { CanvasUI } from '../config.js';

class scene1 {
    constructor() {
      this._Initialize();
    }
  
    _Initialize() {
      this._threejs = new THREE.WebGLRenderer({
        antialias: true,
      });
      this._threejs.outputEncoding = THREE.sRGBEncoding;
      this._threejs.shadowMap.enabled = true;
      this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
      this._threejs.setPixelRatio(window.devicePixelRatio);
      this._threejs.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this._threejs.domElement);
  
     
      window.addEventListener('resize', () => {
        this._OnWindowResize();
      }, false);
  
      const fov = 60;
      const aspect = 1920 / 1080;
      const near = 1.0;
      const far = 1000.0;
      this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this._camera.position.set(25, 10, 25);
  
      this._scene = new THREE.Scene();
  
      //scene background colour
      this._scene.background = new THREE.Color( '#1E90FF' );
  
  
      let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
      light.position.set(-100, 100, 100);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      light.shadow.bias = -0.001;
      light.shadow.mapSize.width = 4096;
      light.shadow.mapSize.height = 4096;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 500.0;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 500.0;
      light.shadow.camera.left = 50;
      light.shadow.camera.right = -50;
      light.shadow.camera.top = 50;
      light.shadow.camera.bottom = -50;
      this._scene.add(light);
  
      light = new THREE.AmbientLight(0xFFFFFF, 0.25);
      this._scene.add(light);
      
      //ground
      const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(1000,1000),
          new THREE.MeshStandardMaterial({
              color: 0xfff, //ground colour
            }));
      ground.position.set(0,0,0);
      ground.castShadow = true;
      ground.receiveShadow = true;
      ground.rotation.x = -Math.PI / 2;
      this._scene.add(ground);
  
      
      this._mixers = [];
      this._previousRAF = null;
  
      //calls all the loader methods
      this._LoadAnimatedModel();
      this._LoadModel();
      this._LoadNpcModel();
      this._LoadGUI();
      this._RAF();
    }
  
    
    //loads and adds fbx animated npc models to the scene
    _LoadNpcModel() {
      const loader = new FBXLoader(loadingManager);
  
      //model start
      loader.setPath('./resources/gameObjects/npc/');
      loader.load('npc.fbx', (fbx) => {
        fbx.scale.setScalar(0.15); //sets scale
        fbx.position.set(0,0,90); //sets position
        fbx.rotation.set(0,3,0);
        fbx.traverse(c => {
          c.castShadow = false;
        });
  
        const anim = new FBXLoader(loadingManager);
        anim.setPath('./resources/gameObjects/npc/');
        anim.load('dance1.fbx', (anim) => {
          const m = new THREE.AnimationMixer(fbx);
          this._mixers.push(m);
          const idle = m.clipAction(anim.animations[0]);
          idle.play();
        });
        this._scene.add(fbx);
      });
      //model end
  
    }
  
    _LoadModel() {
      const loader = new GLTFLoader(loadingManager);
      //needs both the .bin and gltf files
      loader.load('./resources/gameObjects/props/tree1/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(90,0,100);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
      loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(-40,0,80);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
      loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(140,0,-10);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
      loader.load('./resources/gameObjects/props/tree1/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(-100,0,5);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
      loader.load('./resources/gameObjects/props/tree1/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(60,0,-80);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
      loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
        gltf.scene.traverse(c => {
          c.castShadow = false;
          c.position.set(-110,0,-100);
          c.rotation.set(0,0,0);
          c.scale.set(0.7,0.7,0.7); 
        });
        this._scene.add(gltf.scene);
      });
  
    }
  
    
    //loads 2d UI elements
    _LoadGUI() {
    const css = {
      header:{
          type: "text",
          position:{ top:0 },
          paddingTop: 30,
          paddingLeft: 50,
          height: 70,
          backgroundColor: "#000",
          fontColor: '#bbb'
      },
      main:{
          type: "text",
          position:{ top:300, left: 0 },
          height: 372, // default height is 512 so this is 512 - header height:70 - footer height:70
          backgroundColor: "#000",
          fontColor: "#bbb",
      },
      image: { type: "img", position: { left: 100, top: 50 }, width: 300, height: 300 },
  
  }
  const content = {
      header: "USE ARROW KEYS TO MOVE",
      // main: "By Charlie Laver",
      image: "./resources/images/keys.png",
  }
  
      const ui = new CanvasUI( content, css );
      ui.mesh.position.set(0, 40, 200);
        ui.mesh.scale.set(90,90,90);
        ui.mesh.rotation.set(0,22,0);
      ui.update();
      this._scene.add(ui.mesh);
  
    }
    
    _LoadAnimatedModel() {
      const params = {
        camera: this._camera,
        scene: this._scene,
      }
      this._controls = new BasicCharacterController(params);
  
      this._thirdPersonCamera = new ThirdPersonCamera({
        camera: this._camera,
        target: this._controls,
      });
    }
  
    
    _OnWindowResize() {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      
      this._threejs.setSize(window.innerWidth, window.innerHeight);
    }
  
    _RAF() {
      requestAnimationFrame((t) => {
        if (this._previousRAF === null) {
          this._previousRAF = t;
        }
  
        this._RAF();
        //render
  
        //loading screen
        if(RESOURCES_LOADED == false) {
  
          document.getElementById('forward').classList.add('hidden');
          document.getElementById('backward').classList.add('hidden');
          document.getElementById('left').classList.add('hidden');
          document.getElementById('right').classList.add('hidden');
  
          loadingScreen.box.rotation.y += 0.01;
          loadingScreen.box.rotation.z += 0.01;
         this._threejs.render(loadingScreen.scene, loadingScreen.camera);
         return;
        } else {
  
          document.getElementById('forward').classList.remove('hidden');
          document.getElementById('backward').classList.remove('hidden');
          document.getElementById('left').classList.remove('hidden');
          document.getElementById('right').classList.remove('hidden');
  
          document.getElementById('loading').classList.add('hidden');
  
        }
  
       this._threejs.render(this._scene, this._camera);
        this._Step(t - this._previousRAF);
        this._previousRAF = t;
      });
    }
  
    _Step(timeElapsed) {
      const timeElapsedS = timeElapsed * 0.001;
      if (this._mixers) {
        this._mixers.map(m => m.update(timeElapsedS));
      }
  
      if (this._controls) {
        this._controls.Update(timeElapsedS);
      }
  
      this._thirdPersonCamera.Update(timeElapsedS);
    }
  }

  export default scene1;