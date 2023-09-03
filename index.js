class X_Input extends HTMLElement {

  static get observedAttributes() {
    return ['contexto', 'x-name', 'x-id', 'x-class', 'x-placeholder'];  // A lista de atributos que queremos observar
  }

  constructor() {
    super(); // É sempre necessário chamar o super() primeiro em elementos customizados

    this._contexto     = this.getAttribute('contexto')      || '';
    this._Xname        = this.getAttribute('x-name')        || '';
    this._Xid          = this.getAttribute('x-id')          || '';
    this._XClass       = this.getAttribute('x-class')       || '';
    this._Xplaceholder = this.getAttribute('x-placeholder') || '';
  }

  connectedCallback() {
    this.render(); // Este método é chamado quando o elemento é inserido no DOM

    this.querySelector('#' + this._Xid).addEventListener('input', e => this.contexto(e.target));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'contexto':      this._contexto     = newValue; break;
      case 'x-name':        this._Xname        = newValue; break;
      case 'x-id':          this._Xid          = newValue; break;
      case 'x-class':       this._Xclass       = newValue; break;
      case 'x-placeholder': this._Xplaceholder = newValue; break;
    }

    this.render(); // Re-renderiza sempre que qualquer atributo muda
  }

  contexto(inputElement) {
    switch (this._contexto) {
      case 'dinheiro':
        inputElement.value = this.contextoDinheiro(inputElement.value);
        break;
      case 'horario':
        inputElement.value = this.contextoHorario(inputElement.value);
        break;
    }
  }

  contextoDinheiro(input) {
    // Input Hidden
    let outputHidden = input.replace('R$ ', '').replace(',', '').replace('.', '');
    outputHidden = parseFloat(outputHidden) / 100;
    this.querySelector('#' + this._Xid + '-hidden').value = outputHidden;

    if (this.querySelector('#' + this._Xid + '-hidden').value == 'NaN') {
      this.querySelector('#' + this._Xid + '-hidden').value = 0;
    }

    // Input Front
    let output = input.replace(/\D/g, ''); // Exclui tudo que não for número
    output = (parseInt(output) / 100).toFixed(2);
    output = `R$ ${output.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

    return output;
  }

  contextoHorario(input) {
    // Input Hidden
    this.querySelector('#' + this._Xid + '-hidden').value = input;
    
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

  render() {
    this.id = 'x-' + this._Xid;
    this.innerHTML = `
      <input
        type="text"
        id="${this._Xid}"
        class="${this._Xclass}"
        placeholder="${this._Xplaceholder}"
      >
      <input
        type="hidden"
        name="${this._Xname}"
        id="${this._Xid}-hidden"
        value
      >
    `;
  }

}

customElements.define('x-input', X_Input);