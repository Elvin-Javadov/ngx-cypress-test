class NavigationPage {

    ifCollapsedThenClick(navigationMenuName){
        const selector = '[title="' + `${navigationMenuName}` + '"]';
        cy.get(selector).then(input => {
            cy.wrap(input)
              .find('.expand-state')
              .invoke('attr', 'ng-reflect-icon')
              .then(attr=> {
                if(attr.includes('chevron-left-outline')){
                    cy.wrap(input).click();
                }
            })
        })
    }

    mainPage(){
        cy.get('[data-name="arrow-back"]').click();
    }

    // LAYOUT
    layout() {
       this.ifCollapsedThenClick('Layout');
    }

    layoutStepperPage() {
        this.layout();
        cy.contains('Stepper').click();
    }

    layoutAccordionPage() {
        this.layout();
        cy.contains('Accordion').click();
    }


    // FORMS
    forms() {
        this.ifCollapsedThenClick('Forms');
    }

    formLayoutsPage() {
        this.forms()
        cy.contains('Form Layouts').click();
    }

    formDatepickerPage() {
        this.forms()
        cy.contains('Datepicker').click();
    }


    //MODAL & OVERLAYS
    modalAndOverlays() {
        this.ifCollapsedThenClick('Modal & Overlays');
    }

    dialog(){
        this.modalAndOverlays();
        cy.contains('Dialog').click();
    }

    window(){
        this.modalAndOverlays();
        cy.contains('Window').click();
    }

    popover(){
        this.modalAndOverlays();
        cy.contains('Popover').click();
    }

    toastr(){
        this.modalAndOverlays();
        cy.contains('Toastr').click();
    }

    tooltip(){
        this.modalAndOverlays();
        cy.contains('Tooltip').click();
    }

    // EXTRA COMPONENTS
    extraComponents() {
        this.ifCollapsedThenClick('Extra Components');
    }

    calendar(){
        this.extraComponents();
        cy.contains('Calendar').click();
    }

    // TABLES & DATA
    tablesAndData() {
        this.ifCollapsedThenClick('Tables & Data');
    }

    smartTable(){
        this.tablesAndData();
        cy.contains('Smart Table').click();
    }

    treeGrid(){
        this.tablesAndData();
        cy.contains('Tree Grid').click();
    }

    // AUTH
    auth() {
        this.ifCollapsedThenClick('Auth');
    }

    login(){
        this.auth();
        cy.contains('Login').click();
    }

    register(){
        this.auth();
        cy.contains('Register').click();
    }

    requestPassword(){
        this.auth();
        cy.contains('Request Password').click();
    }

    resetPassword(){
        this.auth();
        cy.contains('Reset Password').click();
    }
}

    



export const navigateTo = new NavigationPage();