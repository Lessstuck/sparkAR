let phrase = [-1, 0, 1, 2, 1];
let note;

loop();

function loop () {
  if (phrase.length > 0) {
    note = phrase.pop();
    console.log(note);
    setTimeout(loop, 1000);
  }
}
