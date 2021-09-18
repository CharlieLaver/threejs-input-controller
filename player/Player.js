import { THREE, FBXLoader } from '../config.js';
import BasicCharacterControllerInput from './PlayerController.js';
import { loadingManager } from '../ux/loadingManager.js';

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
      return this._position;;
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


  export default BasicCharacterController;
  