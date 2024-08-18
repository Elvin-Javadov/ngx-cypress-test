import { navigateTo } from "../../support/page_objects/navigationPages";
import { formLayoutsPage } from "../../support/page_objects/formLayouts";
import { formDatepickerPage } from "../../support/page_objects/formDatepicker";


describe('Page Object Model', () => {

    beforeEach('Open web app', () => {
        cy.visit('/');
    })


    it('Navigation with POM design', () => {
        navigateTo.layoutAccordionPage();
        navigateTo.layoutStepperPage();
        navigateTo.formLayoutsPage();
        navigateTo.formDatepickerPage();
        navigateTo.dialog();
        navigateTo.window();
        navigateTo.popover();
        navigateTo.tooltip()
        navigateTo.toastr()
        navigateTo.calendar()
        navigateTo.smartTable()
        navigateTo.treeGrid()
        navigateTo.login()
        navigateTo.mainPage()
        navigateTo.register()
        navigateTo.mainPage()
        navigateTo.requestPassword()
        navigateTo.mainPage()
        navigateTo.resetPassword()
        navigateTo.mainPage()
    })

    it.only('Should submit Inline and Basic Fomrs and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage();
        formLayoutsPage.submitInlineForm("Elvin Javadov", "elvinjavadov@gmail.com");
        formLayoutsPage.submitBasicForm("saidyusifli@gmail.com", 'test@#1234!');
        navigateTo.formDatepickerPage();
        formDatepickerPage.selectDateFromCommonDatepicker(20)
        formDatepickerPage.selectDateFromDatepickerWithRange(200, 225)

    })
})