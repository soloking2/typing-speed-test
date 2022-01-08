describe('Typing Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct message', () => {
    cy.contains('Welcome To Typing Speed Test');
  });

  it('has a starting paragraph', () => {
    cy.get('p').first().contains('Click on Start');
  });
  it('has mistake paragraph', () => {
    cy.get('#mistake').first().contains('Mistakes');
  });
  it('Should contain message text', () => {
    cy.get("[data-test='message']").invoke('show');
  });
  it('Should contain textarea to copy into', () => {
    cy.get("#cp").invoke('show');
  });
  it('Should select 60m button', () => {
    cy.get("[data-test='1m']").click();
  });
  it('Should select 120m button', () => {
    cy.get("[data-test='2m']").click();
  });
  it('Should select 300m button', () => {
    cy.get("[data-test='5m']").click();
  });

  it('Play and End Game', () => {
    cy.get("[data-test='startBtn']").first().should('have.text', 'Start');
    cy.get("[data-test='startBtn']").first().click();
    cy.clock();
    cy.get('#timer').should('have.text', 60);
    cy.tick(1000);
    cy.get('#timer').should('have.text', 59);
    cy.clock().invoke('restore')
    cy.get("[data-test='typedWords']")
      .first()
      .type('my name is solomon, i am a front-end developer');
    cy.get("[data-test='startBtn']").invoke('hide');
    cy.get("[data-test='endBtn']").invoke('show');
    cy.get("[data-test='endBtn']").click();

    cy.get('#result').invoke('show');
  });

  // it('Type and End Game', () => {});
});
