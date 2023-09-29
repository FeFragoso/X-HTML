export default class X_Select extends HTMLElement {

  static get observedAttributes() {
    return [
      'x-id',
      'x-class',
      'x-placeholder',
      'x-opcoes',
      'x-opcoesStyle',
      'x-opcoesClass',
      'x-opcaoClass'
    ];  // A lista de atributos que queremos observar
  }

  constructor() {
    super(); // É sempre necessário chamar o super() primeiro em elementos customizados

    this._Xid          = this.getAttribute('x-id')          || '';
    this._XClass       = this.getAttribute('x-class')       || '';
    this._Xplaceholder = this.getAttribute('x-placeholder') || 'Selecione';
    this._Xopcoes      = this.getAttribute('x-opcoes')      || '';
    this._XopcoesStyle = this.getAttribute('x-opcoesStyle') || '';
    this._XopcoesClass = this.getAttribute('x-opcoesClass') || '';
    this._XopcaoClass  = this.getAttribute('x-opcaoClass')  || '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'x-id':          this._Xid          = newValue; break;
      case 'x-class':       this._Xclass       = newValue; break;
      case 'x-placeholder': this._Xplaceholder = newValue; break;
      case 'x-opcoes':      this._Xopcoes      = newValue; break;
      case 'x-opcoesStyle': this._XopcoesStyle = newValue; break;
      case 'x-opcoesClass': this._XopcoesClass = newValue; break;
      case 'x-opcaoClass':  this._XopcaoClass  = newValue; break;
    }

    let opcoes = this._Xopcoes.split('/?/');

    this.opcoesHTML = '';

    for (let x=0; x<opcoes.length; x++) {
      this.opcoesHTML += `<li class="${this._Xid}-opcao ${this._XopcaoClass}">${opcoes[x]}</li>`;
    }

    this.render(); // Re-renderiza sempre que qualquer atributo muda
  }

  connectedCallback() {
    this.render(); // Este método é chamado quando o elemento é inserido no DOM

    document.querySelector('#' + 'x-' + this._Xid).addEventListener('click', () => {
      this.querySelector('#' + this._Xid + '-opcoes').style.display = 'block';
    });
      
    document.addEventListener('click', (e) => {
      if (!document.querySelector('#' + 'x-' + this._Xid).contains(e.target)) {
        this.querySelector('#' + this._Xid + '-opcoes').style.display = 'none';
      }
    });
      
    this.querySelector('#' + this._Xid).addEventListener('input', e => this.filtro(e.target));
  
    this.querySelectorAll('.' + this._Xid + '-opcao').forEach( opcao => {
      opcao.addEventListener('click', e => this.contextoSelect(e.target));
    });

    // Tratativas ao deletar valores
    this.querySelector('#' + this._Xid).addEventListener('keydown', (event) => {
      if (event.keyCode === 8 || event.keyCode === 46) {
        this.querySelector('#' + this._Xid + '-hidden').value = null;
      }
    })

  }
  
  filtro(filtroElement) {
    
    const opcoesX = this.querySelector('#' + this._Xid + '-opcoes');
    const opcoesY = opcoesX.querySelectorAll('li');
  
    if (filtroElement.value == '') {
      for (const opcao of opcoesY) {
        opcao.style.display = 'block';
      }
    }
    else {
      for (const opcao of opcoesY) {
        opcao.style.display = 'none';
  
        if (opcao.textContent.toUpperCase().includes(filtroElement.value.toUpperCase())) {
          opcao.style.display = 'block';
        }
      }
    }
      
  }
  
  contextoSelect(opcaoSelecionada) {
    this.querySelector('#' + this._Xid).value = opcaoSelecionada.textContent;
    this.querySelector('#' + this._Xid + '-hidden').value = opcaoSelecionada.textContent;
  }
  
  render() {
    this.id = 'x-' + this._Xid;
    this.innerHTML = `
      <input
        id="${this._Xid}"
        class="${this._Xclass}"
        placeholder="${this._Xplaceholder}"
      />
      
      <input
        id="${this._Xid}-hidden"
        type="hidden"
      />

      <div>
          
        <lu
          id="${this._Xid}-opcoes"
          class="${this._XopcoesClass}"
          style="
            list-style-type: none;
            cursor: pointer;
            display: none;
            position: absolute;
            width: ${this.offsetWidth}px;
            ${this._XopcoesStyle}
          "
        >
          
          ${this.opcoesHTML}
          
        </lu>

      </div>
    `;
  }

}

customElements.define('x-select', X_Select);