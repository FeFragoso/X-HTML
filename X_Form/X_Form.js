export default class X_Form extends HTMLElement {

  static get observedAttributes() {
    return ['x-inputs', 'x-url', 'x-retorno', 'x-id', 'x-class', 'x-text'];  // A lista de atributos que queremos observar
  }

  constructor() {
    super(); // É sempre necessário chamar o super() primeiro em elementos customizados

    this._Xinputs  = this.getAttribute('x-inputs')  || '';
    this._Xurl     = this.getAttribute('x-url')     || '';
    this._Xretorno = this.getAttribute('x-retorno') || '';
    this._Xid      = this.getAttribute('x-id')      || '';
    this._Xclass   = this.getAttribute('x-class')   || '';
    this._Xtext    = this.getAttribute('x-text')    || '';
  }

  connectedCallback() {
    this.render(); // Este método é chamado quando o elemento é inserido no DOM

    this.querySelector('#' + this._Xid).addEventListener('click', e => this.submit(e.target));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'x-inputs':  this._Xinputs  = newValue; break;
      case 'x-url':     this._Xurl     = newValue; break;
      case 'x-retorno': this._Xretorno = newValue; break;
      case 'x-id':      this._Xid      = newValue; break;
      case 'x-class':   this._Xclass   = newValue; break;
      case 'x-text':    this._Xtext    = newValue; break;
    }

    this.render(); // Re-renderiza sempre que qualquer atributo muda
  }

  submit(e) {

    let inputs = this._Xinputs.split(' ');

    let data = {};

    for (let x=0; x<inputs.length; x++) {

      try {
        let valor = document.querySelector('#' + inputs[x] + '-hidden').value;
  
        data[inputs[x]] = valor;
      }
      catch {
        data[inputs[x]] = null;
      }
      
    }

    var AJAX = new XMLHttpRequest();

    let retorno = '';

    AJAX.onreadystatechange = function () {
      if (AJAX.readyState === 4) {
        if (AJAX.status === 200) {
          // RETORNO QUANDO DER CERTO
          retorno = 'AJAX.responseText';
        } else {
          // RETORNO QUANDO DER ERRADO
          retorno = `Erro na requisição ${this._Xid}`;
        }
      }
    };

    // RETORNO
    this.setAttribute('x-retorno', retorno);

    AJAX.open("POST", this._Xurl, true);
    
    AJAX.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    AJAX.send(JSON.stringify(data));
    
    console.log(JSON.stringify(data), retorno);
  }

  render() {
    this.id = 'x-' + this._Xid;
    this.innerHTML = `
      <button
        id="${this._Xid}"
        class="${this._Xclass}"
      >${this._Xtext}</button>
    `;
  }

}

customElements.define('x-form', X_Form);