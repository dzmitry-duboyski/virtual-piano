
const keyNote = {
   68 :'c',
   82 :'c♯',
   70 :'d',
   84 :'d♯',
   71 :'e',
   72 :'f',
   85 :'f♯',
   74 :'g',
   73 :'g♯',
   75 :'a',
   79 :'a♯',
   76 :'b',
  }

let instrument = 'piano';

const setPressedKey = (event, note) => {
  if(event) {
    const elem = event.target;
    const isMouseDownBlackKey = event.target.classList.contains('piano__black-key')
    const isMouseDownWhiteKey = event.target.classList.contains('piano__white-key')
    resetPressedKey()
    if(isMouseDownBlackKey) {
      elem.classList.add('piano__black-key_pressed');
      // elem.querySelector('.piano__white-text').classList.add('piano__white-text_active')
    }
    if(isMouseDownWhiteKey) {
      elem.classList.add('piano__white-key_pressed');
      // elem.querySelector('.piano__black-text').classList.add('piano__black-text_active');
    }
  } else {
    const elem = document.querySelector(`[data-note = ${note}]`)
    const isKeyboardDownBlackKey = elem.classList.contains('piano__black-key');
    const isKeyboardDownWhiteKey = elem.classList.contains('piano__white-key');
    if(isKeyboardDownBlackKey) {
      elem.classList.add('piano__black-key_pressed')
      // elem.querySelector('.piano__white-text').classList.add('piano__white-text_active')
    }
    if(isKeyboardDownWhiteKey) {
      elem.classList.add('piano__white-key_pressed');
      // elem.querySelector('.piano__black-text').classList.add('piano__black-text_active');
    }
  }
}

const resetPressedKey = () => {
  document.querySelectorAll('.piano__black-key').forEach(el => { 
    el.classList.remove('piano__black-key_pressed');
    // el.querySelector('.piano__white-text').classList.remove('piano__white-text_active');

  })
  document.querySelectorAll('.piano__white-key').forEach(el => {
    el.classList.remove('piano__white-key_pressed');
    // el.querySelector('.piano__black-text').classList.remove('piano__black-text_active')
  })
}

const playAudio = ( playNote , instrument ) => {
    if(playNote) {
    const audio = new Audio();
    audio.src = `./assets/audio/${instrument}/audio_${playNote}.mp3`;
    audio.autoplay = true;
  }
}

const startAudioMouse = (event) => {
   setPressedKey(event);
   const note = event.target.dataset.note;
   playAudio(note, instrument);
}

const handlerMouseDown = (event) => {
  if(event.target.classList.contains('piano__black-key') || event.target.classList.contains('piano__white-key') ){
    startAudioMouse(event)
    document.querySelector('.piano').addEventListener('mouseover', startAudioMouse)
  }
}

const handlerMouseUp = (event) => {
  resetPressedKey();
  document.querySelector('.piano').removeEventListener('mouseover', startAudioMouse)
}

const handlerKeyDown = (event) => {
  if(event.repeat) return
  const keyCode = event.keyCode;
  const note = keyNote[keyCode]
  if(!note) return;
  playAudio(note, instrument);
  setPressedKey(null,note)
}

const handlerKeyUp = (event) => {
  resetPressedKey();
}

const changeBTN = (event) => {
  const elem = event.target;
  let tempInstrument = 'other';
  let note = 'button_click';
  const setMod = elem.dataset.mod;


  if(elem.classList.contains('btn-settings')){
    instrument = event.target.dataset.instrument
    document.querySelectorAll('.btn-settings').forEach(el => el.classList.remove('btn-settings_active'));
    elem.classList.add('btn-settings_active');
    playAudio(note, tempInstrument);
  }

  const isChangeMod = elem.classList.contains('btn__display-mod')
  if(isChangeMod) {
    const isLetterMod = elem.dataset.mod == 'letter';

    if(isLetterMod) {
      document.querySelectorAll('.piano__white-key').forEach((el) => el.classList.add('letter'))
      document.querySelectorAll('.piano__black-key').forEach((el) => el.classList.add('letter'))
    } else {
      document.querySelectorAll('.piano__white-key').forEach((el) => el.classList.remove('letter'))
      document.querySelectorAll('.piano__black-key').forEach((el) => el.classList.remove('letter'))
    }
    document.querySelectorAll('.btn__display-mod').forEach(el => el.classList.remove('btn__display-mod_active'));
    elem.classList.add('btn__display-mod_active');
    playAudio(note, tempInstrument);
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.querySelector('.container').requestFullscreen();
      document.querySelector('.container').classList.add('background-gradient')
      document.querySelector('.fullscreen-btn').classList.add('fullscreen-btn_out')
      
  } else {
    if (document.exitFullscreen) {
      document.querySelector('.container').classList.remove('background-gradient')
      document.exitFullscreen();
      document.querySelector('.fullscreen-btn').classList.remove('fullscreen-btn_out')
    }
  }
}


document.querySelector('.piano').ondragstart = function() { return false };
document.querySelector('.piano').addEventListener('mousedown',handlerMouseDown)
document.addEventListener('mouseup',handlerMouseUp)
document.addEventListener('keydown', handlerKeyDown)
document.addEventListener('keyup', handlerKeyUp)
document.querySelector('.piano-settings').addEventListener('click', changeBTN)

const fullscreenElement = document.querySelector('.container');
document.querySelector('.fullscreen-btn').addEventListener("click", toggleFullScreen)

