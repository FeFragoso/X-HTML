export function contextoHorario(input, Xid) {
  // Input Hidden
  document.querySelector('#' + Xid + '-hidden').value = input;
  
  // Input Front
  let output = input.replace(/[^0-9:]/g, ''); // Exclui tudo que não for número
  
  let x = '';

  // AB:CD

  // A
  if (output.length > 0) { x += output[0]; }

  // B
  if (output.length > 1) { x += output[1] + ':'; }

  // c
  if (output.length > 2) {
    if (output[3] <= 5) { x += output[3]; }
  }

  // D
  if (output.length > 4) { x += output[4]; }

  output = x;
  
  return output;
}