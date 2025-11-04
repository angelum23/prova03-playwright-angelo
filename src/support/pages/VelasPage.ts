import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import VelasElements from '../elements/VelasElements';
import BasePage from './BasePage';

export default class VelasPage extends BasePage {
  readonly cadVelaVerdeElements: VelasElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.cadVelaVerdeElements = new VelasElements(page);
  }

  async preencherFormularioSucesso(): Promise<void> {
    await this.cadVelaVerdeElements
      .getCampoNome()
      .fill(faker.person.firstName());
    await this.cadVelaVerdeElements
      .getCampoSobrenome()
      .fill(faker.person.lastName());
    await this.cadVelaVerdeElements
      .getCampoCidade()
      .fill(faker.location.city());
    await this.cadVelaVerdeElements
      .getCampoEmail()
      .fill(faker.internet.email());
    await this.cadVelaVerdeElements
      .getCampoMensagem()
      .fill(faker.lorem.sentence());
  }

  async enviarFormulario(): Promise<void> {
    await this.cadVelaVerdeElements.getBotaoAcender().click();
  }

  async enviarFormularioSucesso(): Promise<void> {
    await this.cadVelaVerdeElements.getBotaoAcender().click();
    await this.page.waitForURL(
      'https://padremarcelorossi.com.br/ListaVelaVerde.php'
    );
  }

  async validarEnvioComSucesso(): Promise<void> {
    await expect(this.page).toHaveURL(
      'https://padremarcelorossi.com.br/ListaVelaVerde.php'
    );
  }

  async validarErroFormularioVazio(): Promise<void> {
    await expect(this.cadVelaVerdeElements.getMensagemErroNome()).toBeVisible();
    await expect(
      this.cadVelaVerdeElements.getMensagemErroMensagem()
    ).toBeVisible();
  }
}
