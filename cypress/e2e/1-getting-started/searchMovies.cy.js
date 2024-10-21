describe('Live Search Movies', () => {
    it('Caso 1: Acessar a página inicial e verificar se carregou', () => {
        cy.visit('/');
        cy.get('input[placeholder="Buscar filme..."]').should('be.visible');
        cy.get('table').should('be.visible');
    });

    it('Caso 2: Acessar a página com todos os filmes e verificar se carregou', () => {
        cy.visit('/Movies');
        cy.get('.input-live-search').should('be.visible');
        cy.get('.live-search').should('be.visible');
    });

    it('Caso 3: Pesquisar por Star Wars e favoritar o primeiro item', () => {
        cy.visit('/Movies');
        cy.get('input.input-live-search').type('Star Wars');
        cy.wait(3000);
        cy.get('.list .favorite').first().click();
        cy.wait(3000);
        cy.visit('/');
        cy.get('tbody tr td').should('contain', 'Star Wars');
    });

    it('Caso 4: Pesquisar por Space e favoritar os 20 primeiros itens e verificar a paginação da tela inicial', () => {
        cy.visit('/Movies');
        cy.get('input.input-live-search').type('Space');
        cy.wait(3000);

        for (let i = 0; i < 20; i++) {
            cy.get('.list .favorite').eq(i).click();
            cy.wait(200);
        }

        cy.visit('/');
        cy.wait(500);
        cy.get('#qtd-label').should('contain', 'Mostrando 10 de 20 itens');
        cy.wait(1000);
        cy.get('tbody').scrollTo('bottom');
        cy.wait(1000);
        cy.get('#qtd-label').should('contain', 'Mostrando 20 de 20 itens');
    });

    it('Caso 5: Usar as setas esquerda e direita para usar sugestões de busca', () => {
        cy.visit('/Movies');
        cy.get('input.input-live-search').type('Star ');
        cy.wait(3000);
        cy.get('input.input-live-search').type('{rightarrow}');
        cy.wait(500);
        cy.get('input.input-live-search').should('have.value', 'Star Wars');
        cy.get('input.input-live-search').type('{leftarrow}');
        cy.wait(500);
        cy.get('input.input-live-search').should('not.have.value', 'Star Wars');
        cy.get('input.input-live-search').should('have.value', 'Star ');
    });

    it('Caso 6: Usar a seta para navegar entre os itens favoritar o primeiro usando tecla espaço e clique do mouse', () => {
        cy.visit('/Movies');
        cy.get('input.input-live-search').type('Star ');
        cy.wait(3000);
        cy.get('input.input-live-search').type('{downarrow}');
        cy.wait(500);
        cy.get('input.input-live-search').type(' ');
        cy.get('.list .favorite-on').first().should('exist');
        cy.get('input.input-live-search').type(' ');
        cy.get('.list .favorite-off').first().should('exist');
        cy.get('.list .favorite').first().click();
        cy.get('.list .favorite-on').first().should('exist');
        cy.get('.list .favorite').first().click();
        cy.get('.list .favorite-off').first().should('exist');
    });
});
