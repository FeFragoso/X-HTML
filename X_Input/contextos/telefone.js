export function contextoTelefone(input, Xid) {
  // Input Hidden
  let outputHidden = input.replace(/\D/g, ''); // Exclui tudo que não for número
  document.querySelector('#' + Xid + '-hidden').value = outputHidden;

  // Tratativas ao deletar valores
  document.querySelector('#' + Xid).addEventListener('keydown', (event) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      document.querySelector('#' + Xid).value = null;
      document.querySelector('#' + Xid + '-hidden').value = null;
    }
  });

  // Input Front
  let output = input.replace(/\D/g, ''); // Exclui tudo que não for número
  
  if (output.length >= 2) {
    // Formata o valor como (XX) XXXX-XXXX
    const ddd = output.slice(0, 2);
    const parte1 = output.slice(2, 6);
    const parte2 = output.slice(6, 10);
    output = `(${ddd}) ${parte1}-${parte2}`;
  }

  return output;
}