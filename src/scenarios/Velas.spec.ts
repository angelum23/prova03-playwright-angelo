import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import CadVelaVerdePage from '../support/pages/VelasPage';

test.describe('Testes Funcionais - Acender Vela Verde', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let cadVelaVerdePage: CadVelaVerdePage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.padreMarceloVelaVerde')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    cadVelaVerdePage = new CadVelaVerdePage(page);
    await page.goto(BASE_URL);
  });

  test('Deve acender a Vela Verde com sucesso', async () => {
    await cadVelaVerdePage.preencherFormularioSucesso();
    await cadVelaVerdePage.enviarFormularioSucesso();
    await cadVelaVerdePage.validarEnvioComSucesso();
  });

  test('Deve exibir alerta de erro para campos obrigatórios', async ({
    page
  }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Por favor, informe seu Nome');
      await dialog.dismiss();
    });

    await cadVelaVerdePage.enviarFormulario();
  });
});
