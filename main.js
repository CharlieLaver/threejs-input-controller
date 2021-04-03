import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {CSS3DRenderer,CSS3DObject} from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { CanvasUI } from './resources/canvasUI/CanvasUI.js';

let zoneObj = {
  zone1: false,
  zone2: false,
  zone3: false,
  zone4: false,
  zone5: false,
  zone6: false,
  zone7: false,
  zone8: false,
  zone9: false,
}


/*******************************user navigation and animation **************************/

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
    const loader = new FBXLoader();
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
      loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
      loader.load('walkBack.fbx', (a) => { _OnLoad('walkBack', a); });
      loader.load('runBack.fbx', (a) => { _OnLoad('runBack', a); });
    });
  }  


  //the players position
  get Position() {

    let currentPosition = this._position;
    let currZ = Math.round(currentPosition.z);
    let currX = Math.round(currentPosition.x)
    
    let row1 = false;
    let row2 = false;
    let row3 = false;

    let col1 = false;
    let col2 = false;
    let col3 = false;

    //find what row
    if(currZ > 25 && currZ < 75) {
      row1 = true;
      row2 = false;
      row3 = false;
    } else if(currZ > -25 && currZ < 25) {
      row1 = false;
      row2 = true;
      row3 = false;
    } else if(currZ > -75 && currZ < -25) {
      row1 = false;
      row2 = false;
      row3 = true;
    }

    //find what col 
    if(currX > 25 && currX < 75) {
      col1 = true;
      col2 = false;
      col3 = false;
    } else if(currX > -25 && currX < 25) {
      col1 = false;
      col2 = true;
      col3 = false;
    } else if(currX > -75 && currX < -25) {
      col1 = false;
      col2 = false;
      col3 = true;
    }

    //in zone 1
    if(row1 == true && col1 == true) {
      zoneObj.zone1 = true;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 2
    if(row1 == true && col2 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = true;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 3
    if(row1 == true && col3 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = true;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 4
    if(row2 == true && col1 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = true;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 5
    if(row2 == true && col2 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = true;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 6
    if(row2 == true && col3 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = true;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 7
    if(row3 == true && col1 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = true;
      zoneObj.zone8 = false;
      zoneObj.zone9 = false;
    } //in zone 8
    if(row3 == true && col2 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = true;
      zoneObj.zone9 = false;
    } //in zone 9
    if(row3 == true && col3 == true) {
      zoneObj.zone1 = false;
      zoneObj.zone2 = false;
      zoneObj.zone3 = false;
      zoneObj.zone4 = false;
      zoneObj.zone5 = false;
      zoneObj.zone6 = false;
      zoneObj.zone7 = false;
      zoneObj.zone8 = false;
      zoneObj.zone9 = true;
    }

    if(zoneObj.zone1 == true) {
      console.log('in zone1'); 
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
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
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

//listerns for keyboard input
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
      space: false,
      shift: false,
    };
    //listerns to key up & down events
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
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

      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
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
        
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
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
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
    this._AddState('walkBack', WalkBackState);
    this._AddState('runBack', RunBackState);
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

//dance animation state
class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
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

      //deals with transitioning between run and walk  
      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

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
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
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

      //deals with transitioning between run and walk  
      if (prevState.Name == 'runBack') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

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
      if (input._keys.shift) {
        this._parent.SetState('runBack');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


//run animation state
class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

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
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};

//run backwards animation state
class RunBackState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'runBack';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['runBack'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walkBack') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

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
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
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
    } else if (input._keys.space) {
      this._parent.SetState('dance');
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

    //scenes
    this._scene = new THREE.Scene();
    this._UIScene = new THREE.Scene();

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
    
    //zone1
    const z1 = new THREE.Mesh(
        new THREE.BoxGeometry(50,50),
        new THREE.MeshStandardMaterial({
            color: 0x03fc49, //ground colour
          }));
    z1.position.set(50,0,50);
    z1.castShadow = false;
    z1.receiveShadow = true;
    z1.rotation.x = -Math.PI / 2;
    this._scene.add(z1);

    //zone2
    const z2 = new THREE.Mesh(
      new THREE.BoxGeometry(50,50),
      new THREE.MeshStandardMaterial({
          color: 0x7FFF00, //ground colour
        }));
  z2.position.set(0,0,50);
  z2.castShadow = false;
  z2.receiveShadow = true;
  z2.rotation.x = -Math.PI / 2;
  this._scene.add(z2);

  //zone3
  const z3 = new THREE.Mesh(
    new THREE.BoxGeometry(50,50),
    new THREE.MeshStandardMaterial({
        color: 0xDC143C, //ground colour
      }));
z3.position.set(-50,0,50);
z3.castShadow = false;
z3.receiveShadow = true;
z3.rotation.x = -Math.PI / 2;
this._scene.add(z3);

//zone4
const z4 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0xFF7F50, //ground colour
    }));
z4.position.set(50,0,0);
z4.castShadow = false;
z4.receiveShadow = true;
z4.rotation.x = -Math.PI / 2;
this._scene.add(z4);

//zone5
const z5 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0x5F9EA0, //ground colour
    }));
z5.position.set(0,0,0);
z5.castShadow = false;
z5.receiveShadow = true;
z5.rotation.x = -Math.PI / 2;
this._scene.add(z5);

//zone6
const z6 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0xD2691E, //ground colour
    }));
z6.position.set(-50,0,0);
z6.castShadow = false;
z6.receiveShadow = true;
z6.rotation.x = -Math.PI / 2;
this._scene.add(z6);

//zone7
const z7 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0x8B008B, //ground colour
    }));
z7.position.set(50,0,-50);
z7.castShadow = false;
z7.receiveShadow = true;
z7.rotation.x = -Math.PI / 2;
this._scene.add(z7);

//zone8
const z8 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0xFF8C00, //ground colour
    }));
z8.position.set(0,0,-50);
z8.castShadow = false;
z8.receiveShadow = true;
z8.rotation.x = -Math.PI / 2;
this._scene.add(z8);

//zone9
const z9 = new THREE.Mesh(
  new THREE.BoxGeometry(50,50),
  new THREE.MeshStandardMaterial({
      color: 0x00FA9A, //ground colour
    }));
z9.position.set(-50,0,-50);
z9.castShadow = false;
z9.receiveShadow = true;
z9.rotation.x = -Math.PI / 2;
this._scene.add(z9);

    
    this._mixers = [];
    this._previousRAF = null;

    //calls all the loader methods
    this._LoadAnimatedModel();
    this._LoadGUI();
    this._RAF();
  }

  
  //loads 2d UI elements ************fix
  _LoadGUI() {
    const ui = new CanvasUI(  );
    ui.mesh.position.set(0, -0.5, -1);
    ui.updateElement("body", "Hello World" );
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



