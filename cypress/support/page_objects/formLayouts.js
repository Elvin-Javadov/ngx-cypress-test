class FormLayouts{
    //INLINE FORM
    submitInlineForm(fullName, email) {
        cy.contains('nb-card', 'Inline form')
        .find('form')
        .then(form => {
            cy.wrap(form)
              .find('input[placeholder="Jane Doe"]')
              .type(fullName);

            cy.wrap(form)
            .find('input[placeholder="Email"]')
            .type(email);

            cy.wrap(form).find('[type="checkbox"]').check({force: true});
            cy.wrap(form).submit();
        })
    }


    // BASIC FROM
    submitBasicForm(email, password) {
        cy.contains('nb-card', 'Basic form')
        .find('form')
        .then(form => {
            cy.wrap(form)
              .find('input[placeholder="Email"]')
              .type(email);

            cy.wrap(form)
            .find('input[placeholder="Password"]')
            .type(password);

            cy.wrap(form).find('[type="checkbox"]').check({force: true});
            cy.wrap(form).submit();
        })
    }

}

export const formLayoutsPage = new FormLayouts();