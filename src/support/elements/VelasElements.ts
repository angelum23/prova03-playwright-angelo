import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class VelasElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('#inputNome');
  }

  getCampoSobrenome(): Locator {
    return this.page.locator('#inputSNome');
  }

  getCampoCidade(): Locator {
    return this.page.locator('#inputCidade');
  }

  getCampoEmail(): Locator {
    return this.page.locator('#inputEmail');
  }

  getCampoMensagem(): Locator {
    return this.page.locator('#inputMensagem');
  }

  getBotaoAcender(): Locator {
    return this.page.locator('input[type="submit"][value=" Acender Vela "]');
  }

  getMensagemSucesso(): Locator {
    return this.page.locator('text=Vela acesa com sucesso!');
  }

  getMensagemErroNome(): Locator {
    return this.page.locator('text=Informe o seu Nome');
  }

  getMensagemErroMensagem(): Locator {
    return this.page.locator('text=Por favor, informe sua(s) Intenção(ões).');
  }
}
