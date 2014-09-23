function loaded() {
  var output;
  output = document.getElementById('output')

  // encrypt: function (password, plaintext, params, rp)
  enc = sjcl.encrypt('12345', 'Hello World ABCadadsfadfasfasdfasdfasfdasdfadfsasfadfasdfasdf');

  output.innerHTML = enc;
}