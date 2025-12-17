describe('section 3: central de atendimento ao cliente TAT',() =>{

beforeEach(() => {
  cy.visit('./src/index.html')
})

it('verificar o titulo da aplicacao', ()=>{
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
 })

it('exercicio 1: preencher os campos obrigatorios e enviar o formulario', ()=>{
  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
  cy.get('#firstName').type('Vinicius')
  cy.get('#lastName').type('Pedrini')
  cy.get('#email').type('vini@premier.com')
  cy.get('#open-text-area').type(longText, { delay: 0 })
  cy.get('button[type="submit"]').click()

  cy.get('.success').should('be.visible')
})

it('exercicio 2: exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
  cy.get('#firstName').type('vinicius')
  cy.get('#lastName').type('Pedrini')
  cy.get('#email').type('vinipremier,com')
  cy.get('#open-text-area').type('text')
  cy.get('button[type="submit"]').click()
  
  cy.get('.error').should('be.visible')
})

it('exercicio 3: validacao do telefone', ()=>{
  cy.get('#phone')
  .type('abc')
  .should('not.have.value', 'abc')
   
})
it('exercicio 4: exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',()=>{
  cy.get('#firstName').type('vinicius')
  cy.get('#lastName').type('Pedrini')
  cy.get('#email').type('vinipremier,com')
  cy.get('#open-text-area').type('text')
  cy.get('#phone-checkbox').check()
  cy.get('button[type="submit"]').click()
  
  cy.get('.error').should('be.visible')
 })

it('exercicio 6: msg erro clicando submit sem preencher nada', ()=>{
  cy.get('button[type="submit"]').click()
  
  cy.get('.error').should('be.visible')

})

it('exercicio 7.1: envia o formuário com sucesso usando um comando customizado', () => {
  const data = {
    FirstName: 'Vinicius',
    LastName: 'Pedrini',
    email: 'vinipedrini@gmail.com',
    text: 'Customizando2.0'
  }
  cy.fillMandatoryFieldsAndSubmit(data)

  cy.get('.success').should('be.visible')
})

it('exercicio 7.3 envia o formuário com sucesso usando um comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')

  })

})

describe('section 4: central de atendimento ao cliente TAT',() =>{

beforeEach(() => {
  cy.visit('./src/index.html')
})

it('seleciona um produto (YouTube) por seu texto', ()=>{
  cy.get('#product')
  .select('YouTube')
  .should('have.value', 'youtube')

  })
it('seleciona um produto (metoria) pelo value', ()=>{
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
  
  })

it('seleciona um produto (blog) por seu indice', ()=>{
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
    
  })
})

describe('section 5 (radio buttons): central de atendimento ao cliente TAT',() =>{

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

it('marca o tipo de atendimento "Feedback"', ()=>{
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')

})
it('marca cada tipo de atendimento', ()=>{
  cy.get('input[type="radio"')
  .each(typeOfService =>{
    cy.wrap(typeOfService)
    .check()
    .should('be.checked')

    })
  })
})

describe('section 6 (CHECKBOX): central de atendimento ao cliente TAT',() =>{

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]')
    .check()
    .last()
    .uncheck()
    .should('not.be.checked')

  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#phone-checkbox').check()
    cy.get('.button').click()

    cy.get('.error').should('be.visible')
  })
})

describe('section 7 (selectFile): central de atendimento ao cliente TAT',() =>{

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')

      //console.log(input)
      //console.log(input[0].files[0].name)
    })
  })
  it('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('simpleFile')
    cy.get('#file-upload')
      .selectFile('@simpleFile')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })
})
describe('section 8 (LINKS que abrem em outra pagina): central de atendimento ao cliente TAT',() =>{

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade') //foi usado contains pq era mt generico o id
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

  })

describe('section 9 (simulando dimensoes de um dispositivo movel): central de atendimento ao cliente TAT',() =>{

    beforeEach(() => {
      cy.visit('./src/index.html')
    })


  })
