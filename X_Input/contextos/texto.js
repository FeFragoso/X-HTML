export function contextoTexto(input, Xid) {
  // Input Hidden
  document.querySelector('#' + Xid + '-hidden').value = input;

  // Input Front
  return input;
}