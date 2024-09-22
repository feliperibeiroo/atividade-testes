describe('Testar DataFetch', () => {

  beforeEach('Logar no sistema', () => {

    // Entrar na página de login
    cy.visit('http://localhost:8081');

    // Digitar o email e a senha errados
    cy.get('[placeholder="Email"]').type("atendente01@ufca.teste.com");
    cy.get('[placeholder="Senha"]').type("12345");

    // Clicar no botão de login
    cy.get('.css-view-175oi2r.r-borderRadius-y47klf > .css-view-175oi2r > .css-text-146c3p1').click();

    // Deve aparece a tela home com o título Bem-Vindo(a)
    cy.get('.r-fontSize-1i10wst').should("contain.text", "Bem-Vindo(a)")
  })

  it('Deve mostrar as consultas cadastradas', () => {

    // Clicar na opção consultas
    cy.get('.r-WebkitOverflowScrolling-150rngu > .r-flex-13awgt0 > :nth-child(1)').click();

    // Verificar se há pelo menos uma consulta na lista (1 + 1 linha co cabeçalho)
    cy.get('.r-WebkitOverflowScrolling-150rngu > .r-flex-13awgt0').children().should("have.length.at.least", 2);

  })

  it('Deve mostrar os pacientes cadastrados', () => {

    // Clicar na opção pacientes
    cy.get('.r-WebkitOverflowScrolling-150rngu > .r-flex-13awgt0 > :nth-child(2)').click();

    // Verificar se há pelo menos dois pacientes na lista (2 + 1 linha do cabeçalho)
    cy.get('.r-marginTop-6ity3w').children().should("have.length.at.least", 3);

  })

  it('Deve mostrar os médicos cadastrados', () => {

    // Clicar na opção médicos
    cy.get('.r-WebkitOverflowScrolling-150rngu > .r-flex-13awgt0 > :nth-child(3)').click();

    // Verificar se há pelo menos dois médicos na lista (2 + 1 linha do cabeçalho)
    cy.get('.r-padding-1pcd2l5 > .css-view-175oi2r.r-backgroundColor-14lw9ot').children().should("have.length.at.least", 3);

  });

})