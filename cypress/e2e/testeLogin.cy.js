describe('Testar Login', () => {
  it('Deve recusar login com email e senha incorretos', () => {

    // Mockar chamada para o supabase
    cy.intercept({
      url: /.*?supabase\.co.*/,
      method: 'POST'
    }, { body: {"code":"invalid_credentials","message":"Invalid login credentials"}, statusCode: 400 })

    // Entrar na página de login
    cy.visit('http://localhost:8081');

    // Digitar o email e a senha errados
    cy.get('[placeholder="Email"]').type("emailerrado@gmail.com");
    cy.get('[placeholder="Senha"]').type("senhaerrada");

    // Clicar no botão de login
    cy.get('.css-view-175oi2r.r-borderRadius-y47klf > .css-view-175oi2r > .css-text-146c3p1').click();

    // Deve mostrar que o usuário e a senha estão incorretos
    cy.get('.r-margin-jgcjvd > .css-text-146c3p1').should("contain.text", "Usuário ou Senha Incorretos")
  })

  it('Deve recusar login com email e senha incorretos', () => {

    cy.fixture('loginCorreto.json').then(data => {
      // Mockar chamada para o supabase
      cy.intercept({
        url: /.*?supabase\.co.*/,
        method: 'POST'
      }, { body: data, statusCode: 200 })
    })

    // Entrar na página de login
    cy.visit('http://localhost:8081');

    // Digitar o email e a senha errados
    cy.get('[placeholder="Email"]').type("email@gmail.com");
    cy.get('[placeholder="Senha"]').type("senhacerta");

    // Clicar no botão de login
    cy.get('.css-view-175oi2r.r-borderRadius-y47klf > .css-view-175oi2r > .css-text-146c3p1').click();

    // Deve aparece a tela home com o título Bem-Vindo(a)
    cy.get('.r-fontSize-1i10wst').should("contain.text", "Bem-Vindo(a)")
  })


})