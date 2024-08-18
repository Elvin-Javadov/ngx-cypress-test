class FormDatepicker {

    selectDateFromToday(dateFromToday) {
        let date = new Date();
        date.setDate(date.getDate() + dateFromToday);
        let desiredDate = date.toString(); //Convert the date object to a string format
        let parts = desiredDate.split(" ");
        let selectedMonth = parts[1];
        let selectedDay = parseInt(parts[2]); //Convert day to number to remove leading zero
        let selectedYear = parts[3];
        let expectedDate = `${selectedMonth} ${selectedDay}, ${selectedYear}`;

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(currentValue => {
            if (!currentValue.includes(selectedMonth) || !currentValue.includes(selectedYear)) {
                cy.get('[data-name="chevron-right"]').click();
                this.selectDateFromToday(dateFromToday);
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(selectedDay).click();
            }

        })

        return expectedDate;
    }

    selectDateFromCommonDatepicker(dateFromToday) {
        cy.contains('nb-card', 'Common Datepicker').find('[placeholder="Form Picker"]').then(formPicker => {
            cy.wrap(formPicker).click();
            let expectedDate = this.selectDateFromToday(dateFromToday);
            cy.wrap(formPicker).invoke('prop', 'value').should('contain', expectedDate);
            cy.wrap(formPicker).should('have.value', expectedDate);
        })
    }

    selectDateFromDatepickerWithRange(startingDate, endingDate) {
        cy.contains('nb-card', 'Datepicker With Range').find('[placeholder="Range Picker"]').then(rangePicker => {
            cy.wrap(rangePicker).click();
            let startDate = this.selectDateFromToday(startingDate);
            let endDate = this.selectDateFromToday(endingDate);
            let dateRange = startDate + ' - ' + endDate;
            cy.wrap(rangePicker).invoke('prop', 'value').should('contain', dateRange);
            cy.wrap(rangePicker).should('have.value', dateRange);
        })
    }


}

export const formDatepickerPage = new FormDatepicker();