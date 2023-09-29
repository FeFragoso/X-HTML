export function contextoInteiro(input, Xid) {
  // Input Hidden
  document.querySelector('#' + Xid + '-hidden').value = input.replace(/\D/g, ''); // Exclui tudo que não for número;

  // Input Front
  return input.replace(/\D/g, ''); // Exclui tudo que não for número;
}