// Importação dos Contextos
import { contextoTexto }    from './contextos/texto.js'
import { contextoInteiro }  from './contextos/inteiro.js'
import { contextoDinheiro } from './contextos/dinheiro.js'
import { contextoHorario }  from './contextos/horario.js'
import { contextoTelefone } from './contextos/telefone.js'


export default class X_Input extends HTMLElement {

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
      case 'texto':
        inputElement.value = contextoTexto(inputElement.value, this._Xid);
        break;
      case 'inteiro':
        inputElement.value = contextoInteiro(inputElement.value, this._Xid);
        break;
      case 'dinheiro':
        inputElement.value = contextoDinheiro(inputElement.value, this._Xid);
        break;
      case 'horario':
        inputElement.value = contextoHorario(inputElement.value, this._Xid);
        break;
      case 'telefone':
        inputElement.value = contextoTelefone(inputElement.value, this._Xid);
        break;
    }
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