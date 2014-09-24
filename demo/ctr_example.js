function h2a(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

function runCircuit(evnt) {
  var messageBlocks, prfs, ciphertextBlocks, getRowElements, setupRow, msg;

  if(typeof evnt !== 'string') {
    msg = event.currentTarget.value;
  } else {
    msg = evnt;
  }

  getRowElements = function(_class) {
    return document.getElementsByClassName(_class)[0].children;
  }

  fillRowElements = function(elements, arr) {
    for(var i=0; i < elements.length; i++) {
      var elem = elements[i];
      if(arr[i] !== undefined) {
        elem.innerHTML = '<p>' + arr[i] + '</p>';
        elem.classList.remove('empty');
      } else {
        elem.innerHTML = '<p>empty...</p>';
        elem.classList.add('empty');
      }
    }
  }
  // debugger

  setupRow = function (_class, arr) {
    // debugger
    var elements, hex;
    elements = getRowElements(_class);
    for(var i=0; i < arr.length; i++) {
      if(typeof arr[i] === 'object') {
        hexx = sjcl.codec.hex.fromBits(arr[i]);
        arr[i] = h2a(hexx);
      }
    }
    fillRowElements(elements, arr);
  }

  enc = sjcl.encrypt('12345', msg, {salt: ''});

  messageBlocks = setupRow('message-blocks', sjcl.overlord.messageBlocks);
  prfs = setupRow('prfs', sjcl.overlord.iVs);
  prfOutpus = setupRow('prf-outputs', sjcl.overlord.prfOutputs);
  ciphertextBlocks = setupRow('ciphertext-blocks', sjcl.overlord.cipherBlocks);
}

function bindEvents() {
  var messageForm, inputEvent;
  messageForm = document.getElementById('messageInput');
  messageForm.oninput = runCircuit;
  runCircuit(messageForm.value);
}

function loaded() {
  bindEvents();
}



