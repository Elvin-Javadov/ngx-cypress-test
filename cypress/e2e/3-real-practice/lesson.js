/// <reference types="cypress" />

const { log } = require("console");

describe('First test suite', () => {

    it('Find by methods', () => {

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click()
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();

        //by TAG name
        cy.get('input');

        //by ID+
        cy.get('#inputEmail1');

        //by Class value
        cy.get('.input-full-width');

        //by Attribute
        cy.get('[fullwidth]');

        //by Attribute and value
        cy.get('[placeholder="Email"]');

        //by entire Class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]');

        //by multiple attributes
        cy.get('[placeholder="Email"][fullwidth]');

        //by tag, attribute, id & class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

        //by cypress test ID
        cy.get('[data-cy="imputEmail1"]');
    });

    it('Explanation of get, find & contains methods', () => {

        /**
         * Key Differences:
            cy.get is used for selecting elements based on CSS selectors and returns all matching elements.
            cy.find is used to search for child elements within a specific parent element that has already been selected, again using CSS selectors.
            cy.contains is used for selecting elements based on their text content.
        */

        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('Sign in');
        cy.contains('[status="warning"]', 'Sign in');
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');

    });

    it('Chain calls', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();
    });

    it('Save subject of the command', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //Duplicated code
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        //CAN'T DO THINGS LIKE BELOW
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid');
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');

        //1. Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid');
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');


        //2. Cypress then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');
        })

    });

    it('Extract text values', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        //1. Approach
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        //2. Approach
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address')
            cy.wrap(label).should('contain', 'Email address');
        });

        //3. Approach
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        });

        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');

        //4. Invoke attribute value
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        });

        //4. Invoke property (text value in the input box)
        cy.get('#exampleInputEmail1').type('example@amazon.com');
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'example@amazon.com').then(value => {
            expect(value).to.equal('example@amazon.com')
        });
    });

    it('Radio buttons', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
            cy.wrap(radioButton).eq(0).click({ force: true }).should('be.checked');
            cy.wrap(radioButton).eq(1).click({ force: true }).should('be.checked');
            cy.wrap(radioButton).eq(0).should('not.be.checked')
            cy.wrap(radioButton).eq(2).should('be.disabled')
        })

        // cy.get('[class="text"]').then(radioButton => {
        //     cy.wrap(radioButton).contains('Option 1').click({force: true});
        //     cy.wrap(radioButton).contains('Option 2').click({force: true});
        // })

    });

    it('Check boxes', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').then(cb => {
            cy.wrap(cb).eq(0).uncheck({ force: true });
            cy.wrap(cb).eq(0).should('not.be.checked')
            cy.wrap(cb).eq(1).uncheck({ force: true });
            cy.wrap(cb).eq(1).should('not.be.checked')
            cy.wrap(cb).eq(2).check({ force: true });
            cy.wrap(cb).eq(2).should('be.checked')
        })

    });


    it('Date picker', () => {

        function selectDesiredDate() {
            let date = new Date();
            date.setDate(date.getDate() + 400);
            let desiredDate = date.toString(); // Convert the date object to a string format
            let parts = desiredDate.split(" ");
            let selectedMonth = parts[1];
            let selectedDay = parseInt(parts[2]); // Convert day to number to remove leading zero
            let selectedYear = parts[3];
            let expectedDate = `${selectedMonth} ${selectedDay}, ${selectedYear}`;

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(currentValue => {
                if (!currentValue.includes(selectedMonth) || !currentValue.includes(selectedYear)) {
                    cy.get('[data-name="chevron-right"]').click();
                    selectDesiredDate();
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(selectedDay).click();
                }

            })

            return expectedDate;
        }

        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();




        cy.contains('nb-card', 'Common Datepicker').find('[placeholder="Form Picker"]').then(formPicker => {
            cy.wrap(formPicker).click();
            let expectedDate = selectDesiredDate();
            cy.wrap(formPicker).invoke('prop', 'value').should('contain', expectedDate);
            cy.wrap(formPicker).should('have.value', expectedDate);
        })
    });


    it('List & Dropdowns', () => {
        cy.visit('/');
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click();
            cy.get('ul nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();
                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemText);
                if (index < 3) {
                    cy.wrap(dropDown).click();
                }
            })
        })
    });

    it('Tables & Date', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // Get row by text
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('22');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).should('contain', '22');

        })

        // Get row by index
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(addRow => {
            cy.wrap(addRow).find('[placeholder="First Name"]').type('Elvin');
            cy.wrap(addRow).find('[placeholder="Last Name"]').type('Javadov');
            cy.wrap(addRow).find('.nb-checkmark').click();
        })

        //Find and assert based on 1st table row with contain(1st method)
        cy.get('tbody tr').first().find('td').should('contain', 'Elvin');
        cy.get('tbody tr').first().find('td').should('contain', 'Javadov');

        //Find and assert based on 1st table row with equal (2nd method)
        cy.get('tbody tr').first().then(firstRow => {
            cy.wrap(firstRow).find('td').eq(2).find('.ng-star-inserted').first().invoke('text').should('eq', 'Elvin');
            cy.wrap(firstRow).find('td').eq(3).find('.ng-star-inserted').first().invoke('text').should('eq', 'Javadov');
        })

        //Find and assert based on entire table rows
        cy.get('tbody').contains('tr', 'Elvin').then(tableRow => {
            cy.wrap(tableRow).should('contain', 'Javadov');
        })

        //Assert each row age value based on search results
        let ages = [10, 28, 33, 20]
        cy.wrap(ages).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age);
            cy.wait(500);
            cy.get('tbody tr').each(($tableRow) => {
                const hasAttribute = $tableRow.attr('ng-reflect-ng-class') === '[object Object]';
                if (!hasAttribute) {
                    cy.wrap($tableRow).should('contain', 'No data found');
                } else {
                    cy.wrap($tableRow).find('td').eq(6).invoke('text').should('eq', age.toString());
                }
            });

        })

    })


    it('Tooltips', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltip').contains('Default').click()
        cy.get('nb-tooltip').invoke('text').should('eq', 'This is a tooltip')
    })

    it.only('Browser dialog boxes', () => {
        cy.visit('/');
        cy.get('[ng-reflect-klass="select-button"]').click();
        cy.get('ul').children('nb-option').contains(' Dark').click();
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // //1st Approach - soft assert. This code will not fail test if there is not pop-up dialog box or message
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('windows:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        //2nd Approach - 
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // //3rd Approach - This will cancel the dialog box and will not delete the row
        // cy.get('tbody tr').first().find('.nb-trash').click();
        // cy.on('windows:confirm', () => false)

    })
});