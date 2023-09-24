export function contextoDinheiro(input, Xid) {
  // Input Hidden
  let outputHidden = input.replace('R$ ', '').replace(',', '').replace('.', '');
  outputHidden = parseFloat(outputHidden) / 100;
  document.querySelector('#' + Xid + '-hidden').value = outputHidden;

  if (document.querySelector('#' + Xid + '-hidden').value == 'NaN') {
    document.querySelector('#' + Xid + '-hidden').value = 0;
  }

  // Input Front
  let output = input.replace(/\D/g, ''); // Exclui tudo que não for número
  output = (parseInt(output) / 100).toFixed(2);
  output = `R$ ${output.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return output;
}