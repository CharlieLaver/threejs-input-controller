import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { CanvasUI } from './resources/canvasUI/CanvasUI.js';


var loadingScreen = {
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
  box: new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.5,0.5),
    new THREE.MeshBasicMaterial({ color: 0xF8F8FF })
  ),

};

var audio = new Audio('./resources/sound/background-music.mp3');
audio.loop = true;
audio.play();

var RESOURCES_LOADED = false;

loadingScreen.scene.background = new THREE.Color( '#1E90FF' );


loadingScreen.box.position.set(0,0,5);
loadingScreen.camera.lookAt(loadingScreen.box.position);
loadingScreen.scene.add(loadingScreen.box);

var loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = function() {
  RESOURCES_LOADED = true;
}

let zoneObj = {
  zone1: false,
  zone2: false,
  zone3: false,
  zone4: false,
  zone5: false,
  zone6: false,
  zone7: false,
  zone8: false,
}


class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};

class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3();

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();
  }

  _LoadModels() {
    const loader = new FBXLoader(loadingManager);
    //loads the model file
    loader.setPath('./resources/user/');
    loader.load('user.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      //loads the animations
      loader.setPath('./resources/user/');
      loader.load('run.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('runBack.fbx', (a) => { _OnLoad('walkBack', a); });
    });
  }  


  //the players position
  get Position() {

    let currentPosition = this._position;
    let currZ = Math.round(currentPosition.z);
    let currX = Math.round(currentPosition.x)

    //github btn
    if((currZ > 30 && currZ < 65) && (currX > 70 && currX < 105)) {
        zoneObj.zone1 = true;   
    } else {
      zoneObj.zone1 = false;           
    }

    //youtube btn
    if((currZ > 140 && currZ < 180) && (currX > 180 && currX < 220)) {
      zoneObj.zone2 = true;
    } else {
      zoneObj.zone2 = false;
    }

    //contact btn
    if((currZ > -110 && currZ < -70) && (currX > 120 && currX < 160)) {
      zoneObj.zone3 = true;
    } else {
      zoneObj.zone3 = false;
    }

    //repo1 btn
    if((currZ > -290 && currZ < -250) && (currX > 120 && currX < 160)) {
      zoneObj.zone4 = true;
    } else {
      zoneObj.zone4 = false;
    }

    //repo2 btn
    if((currZ > -170 && currZ < -130) && (currX > -20 && currX < 20)) {
      zoneObj.zone5 = true;
    } else {
      zoneObj.zone5 = false;
    }

    //repo3 btn
    if((currZ > -220 && currZ < -180) && (currX > -140 && currX < -100)) {
      zoneObj.zone6 = true;
    } else {
      zoneObj.zone6 = false;
    }

    //react btn
    if((currZ > -80 && currZ < -40) && (currX > -100 && currX < -60)) {
      zoneObj.zone7 = true;
    } else {
      zoneObj.zone7 = false;
    }

    //games btn
    if((currZ > 70 && currZ < 110) && (currX > -195 && currX < -155)) {
      zoneObj.zone8 = true;
    } else {
      zoneObj.zone8 = false;
    }

    return currentPosition;
  }

  get Rotation() {
    if (!this._target) {
      return new THREE.Quaternion();
    }
    return this._target.quaternion;
  }

  Update(timeInSeconds) {
    if (!this._stateMachine._currentState) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();

      // should open a new three js scene but for now just opens my site

      if(zoneObj.zone1) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      } 

      if(zoneObj.zone2) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone3) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone4) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone5) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone6) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone7) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }

      if(zoneObj.zone8) {
        if(this._input._keys.enter) {
          this._input._keys.enter = false;
            window.open("https://charlielaver.com/");
          }
      }
    

    //set user speed here
    if (this._input._keys.forward) {
      acc.multiplyScalar(3.0);
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      acc.multiplyScalar(3.0);
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    this._position.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};


//listerns for keyboard and button input
class BasicCharacterControllerInput {
  constructor() {
    this._Init();
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      enter: false,
    };
    //listerns to key up & down events
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);

    //listerns for btn events
    document.getElementById('forward').addEventListener('touchstart', () => this._forwardDown(), false);
    document.getElementById('forward').addEventListener('touchend', () => this._forwardUp(), false);
    document.getElementById('backward').addEventListener('touchstart', () => this._backwardDown(), false);
    document.getElementById('backward').addEventListener('touchend', () => this._backwardUp(), false);
    document.getElementById('left').addEventListener('touchstart', () => this._leftDown(), false);
    document.getElementById('left').addEventListener('touchend', () => this._leftUp(), false);
    document.getElementById('right').addEventListener('touchstart', () => this._rightDown(), false);
    document.getElementById('right').addEventListener('touchend', () => this._rightUp(), false);
    document.getElementById('enter').addEventListener('touchstart', () => this._enterDown(), false);
    document.getElementById('enter').addEventListener('touchend', () => this._enterUp(), false);

  }

  //mobile navigation
  _forwardDown() {
    this._keys.forward = true;    
  }

  _forwardUp() {
    this._keys.forward = false;
  }

  _backwardDown() {
    this._keys.backward = true;
  }

  _backwardUp() {
    this._keys.backward = false;
  }

  _leftDown() {
    this._keys.left = true;
  }

  _leftUp() {
    this._keys.left = false;
  }

  _rightDown() {
    this._keys.right = true;
  }

  _rightUp() {
    this._keys.right = false;
  }

  _enterDown() {
    this._keys.enter = true;
  }

  _enterUp() {
    this._keys.enter = false;
  }

  //keyboard navigation
  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 38: // arrow up
        this._keys.forward = true;
        break;

      case 65: // a
        this._keys.left = true;
        break;
      case 37: // arrow left
        this._keys.left = true;
        break;

      case 83: // s
        this._keys.backward = true;
        break;
      case 40: // arrow down
        this._keys.backward = true;
        break;

      case 68: // d
        this._keys.right = true;
        break;
      case 39: // arrow right
        this._keys.right = true;
        break;

      case 13: // ENTER
        this._keys.enter = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 38: // arrow up
        this._keys.forward = false;
        break;

      case 65: // a
        this._keys.left = false;
        break;
      case 37: // arrow left
        this._keys.left = false;
        break;

      case 83: // s
        this._keys.backward = false;
        break;
      case 40: // arrow down
        this._keys.backward = false;
        break;

      case 68: // d
        this._keys.right = false;
        break;
      case 39: // arrow right
        this._keys.right = false;
        break;

      case 13: // ENTER
        this._keys.enter = false;
        break;
    }
  }
};

class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  //creates a key value pair for the _states JSON
  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;

    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      //calling the Exit method from State
      prevState.Exit();
    }
    //creating new instance of a state class
    const state = new this._states[name](this);

    this._currentState = state;
    //calling the Enter method from State
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      //calling Update method from State
      this._currentState.Update(timeElapsed, input);
    }
  }
};

//child of FiniteStateMachine
class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  //adds states to the _states JSON in FiniteStateMachine
  _Init() {       //name    type
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('walkBack', WalkBackState);
  }
};

//base class
class State {
  constructor(parent) {
    this._parent = parent;
  }
  //methods that the subclass's inherit
  Enter() {}
  Exit() {}
  Update() {}
};



//walking animation state
class WalkState extends State {
  constructor(parent) {
    super(parent); //call the constructor of the parent class
  }

  //getter for the name this instance of class
  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

   
      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }
  
  Update(timeElapsed, input) {
    if (input._keys.forward) {
      return;
    }

    this._parent.SetState('idle');
  }
};

//walking backwards animation state
class WalkBackState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walkBack';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walkBack'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.backward) {
      return;
    }

    this._parent.SetState('idle');
  }
};


//idle animation state
class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }
  //you have to update state from the last
  Update(_, input) {
    if (input._keys.forward) {
      this._parent.SetState('walk');
    } else if(input._keys.backward) {
      this._parent.SetState('walkBack');
    } 
  }
};

/******************************************* camera *********************************************************/

class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._camera = params.camera;

    this._currentPosition = new THREE.Vector3();
    this._currentLookat = new THREE.Vector3();
  }

  _CalculateIdealOffset() {
    //position of camera
    const idealOffset = new THREE.Vector3(0, 40, -60);
    idealOffset.applyQuaternion(this._params.target.Rotation);
    idealOffset.add(this._params.target.Position);
    return idealOffset;
  }

  _CalculateIdealLookat() {
    const idealLookat = new THREE.Vector3(0, 10, 50);
    idealLookat.applyQuaternion(this._params.target.Rotation);
    idealLookat.add(this._params.target.Position);
    return idealLookat;
  }

  Update(timeElapsed) {
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();

    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);

    this._camera.position.copy(this._currentPosition);
    this._camera.lookAt(this._currentLookat);

  }
}


class ThirdPersonCameraDemo {
  constructor() {
    this._Initialize();
  }

  /********************************************* render *************************************************/
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
    this._LoadBtns();
    this._RAF();
  }

  
  //loads and adds fbx animated npc models to the scene
  _LoadNpcModel() {
    const loader = new FBXLoader(loadingManager);

    //model start
    loader.setPath('./resources/gameObjects/npc/');
    loader.load('npc1.fbx', (fbx) => {
      fbx.scale.setScalar(0.15); //sets scale
      fbx.position.set(-50,0,-130); //sets position
      fbx.traverse(c => {
        c.castShadow = true;
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

    //model start
    loader.setPath('./resources/gameObjects/npc/');
    loader.load('npc2.fbx', (fbx) => {
      fbx.scale.setScalar(0.15); //sets scale
      fbx.position.set(0,0,90); //sets position
      fbx.rotation.set(0,3,0);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const anim = new FBXLoader(loadingManager);
      anim.setPath('./resources/gameObjects/npc/');
      anim.load('dance5.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
    //model end

    //model start
    loader.setPath('./resources/gameObjects/npc/');
    loader.load('npc1.fbx', (fbx) => {
      fbx.scale.setScalar(0.15); //sets scale
      fbx.position.set(-140,0,0); //sets position
      fbx.rotation.set(0,2,0);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const anim = new FBXLoader(loadingManager);
      anim.setPath('./resources/gameObjects/npc/');
      anim.load('dance3.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
    //model end

    //model start
    loader.setPath('./resources/gameObjects/npc/');
    loader.load('npc2.fbx', (fbx) => {
      fbx.scale.setScalar(0.15); //sets scale
      fbx.position.set(0,0,-220); //sets position
      fbx.rotation.set(0,0,0);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const anim = new FBXLoader(loadingManager);
      anim.setPath('./resources/gameObjects/npc/');
      anim.load('dance4.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
    });
    //model end

    //model start
    loader.setPath('./resources/gameObjects/npc/');
    loader.load('npc1.fbx', (fbx) => {
      fbx.scale.setScalar(0.15); //sets scale
      fbx.position.set(140,0,0); //sets position
      fbx.rotation.set(0,4,0);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const anim = new FBXLoader(loadingManager);
      anim.setPath('./resources/gameObjects/npc/');
      anim.load('dance2.fbx', (anim) => {
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
        c.position.set(20,0,40);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(-32,0,50);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(90,0,0);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree1/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(-70,0,10);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree1/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(40,0,-50);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(-30,0,-40);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree2/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(22,0,-10);
        c.rotation.set(0,0,0);
        c.scale.set(0.7,0.7,0.7); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree3/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(7,1.5,2);
        c.rotation.set(0,0,0);
        c.scale.set(1.4,1.4,1.4); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree3/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(-6,1.5,-2);
        c.rotation.set(0,0,0);
        c.scale.set(1.4,1.4,1.4); 
      });
      this._scene.add(gltf.scene);
    });

    loader.load('./resources/gameObjects/props/tree3/scene.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = false;
        c.position.set(2,1.5,-8);
        c.rotation.set(0,0,0);
        c.scale.set(1.4,1.4,1.4); 
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
    image: { type: "img", position: { left: 100, top: 10 }, width: 300, height: 300 },

}
const content = {
    header: "USE ARROW KEYS TO MOVE",
    main: "PRESS ENTER WHEN ON A RED MAT TO CHANGE ZONE",
    image: "./resources/images/keys.png",
}

    const ui = new CanvasUI( content, css );
    ui.mesh.position.set(0, 40, 200);
	  ui.mesh.scale.set(90,90,90);
  	ui.mesh.rotation.set(0,22,0);
    ui.update();
    this._scene.add(ui.mesh);

  }

  _LoadBtns() {

    const btn1 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn1.position.set(90,0,48);
    btn1.castShadow = false;
    btn1.receiveShadow = true;
    btn1.rotation.x = -Math.PI / 2;
    this._scene.add(btn1);

    const btn2 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn2.position.set(200,0,160);
    btn2.castShadow = false;
    btn2.receiveShadow = true;
    btn2.rotation.x = -Math.PI / 2;
    this._scene.add(btn2);

    const btn3 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn3.position.set(140,0,-90);
    btn3.castShadow = false;
    btn3.receiveShadow = true;
    btn3.rotation.x = -Math.PI / 2;
    this._scene.add(btn3);

    const btn4 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn4.position.set(140,0,-270);
    btn4.castShadow = false;
    btn4.receiveShadow = true;
    btn4.rotation.x = -Math.PI / 2;
    this._scene.add(btn4);

    const btn5 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn5.position.set(0,0,-150);
    btn5.castShadow = false;
    btn5.receiveShadow = true;
    btn5.rotation.x = -Math.PI / 2;
    this._scene.add(btn5);

    const btn6 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn6.position.set(-120,0,-200);
    btn6.castShadow = false;
    btn6.receiveShadow = true;
    btn6.rotation.x = -Math.PI / 2;
    this._scene.add(btn6);

    const btn7 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn7.position.set(-80,0,-60);
    btn7.castShadow = false;
    btn7.receiveShadow = true;
    btn7.rotation.x = -Math.PI / 2;
    this._scene.add(btn7);

    const btn8 = new THREE.Mesh(
      new THREE.BoxGeometry(40,40),
      new THREE.MeshStandardMaterial({
          color: 0xDC143C, //ground colour
        }));
    btn8.position.set(-175,0,90);
    btn8.castShadow = false;
    btn8.receiveShadow = true;
    btn8.rotation.x = -Math.PI / 2;
    this._scene.add(btn8);

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
        document.getElementById('enter').classList.add('hidden');

        loadingScreen.box.rotation.y += 0.01;
        loadingScreen.box.rotation.z += 0.01;
       this._threejs.render(loadingScreen.scene, loadingScreen.camera);
       return;
      } else {

        document.getElementById('forward').classList.remove('hidden');
        document.getElementById('backward').classList.remove('hidden');
        document.getElementById('left').classList.remove('hidden');
        document.getElementById('right').classList.remove('hidden');
        document.getElementById('enter').classList.remove('hidden');

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


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new ThirdPersonCameraDemo();
});


function _LerpOverFrames(frames, t) {
  const s = new THREE.Vector3(0, 0, 0);
  const e = new THREE.Vector3(100, 0, 0);
  const c = s.clone();

  for (let i = 0; i < frames; i++) {
    c.lerp(e, t);
  }
  return c;
}

//just for test
function _TestLerp(t1, t2) {
  const v1 = _LerpOverFrames(100, t1);
  const v2 = _LerpOverFrames(50, t2);
  //console.log(v1.x + ' | ' + v2.x);
}

_TestLerp(0.01, 0.01);
_TestLerp(1.0 / 100.0, 1.0 / 50.0);
_TestLerp(1.0 - Math.pow(0.3, 1.0 / 100.0), 
          1.0 - Math.pow(0.3, 1.0 / 50.0));







