
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

  export default BasicCharacterControllerInput;
  