describe('Protractor Demo App', function() {
    beforeEach(function () {
        browser.get('http://localhost:3000/');
        browser.waitForAngular();
    });

    it('create contator, name\'s len is less than min 2 chars, should show name error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('w');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);

        //element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).sendKeys('w');
        //element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).sendKeys('ww');
        //element(by.model('contactCreationOrEditFactory.corp.content')).sendKeys('shgbit');
        //element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('12312345643');
        //element(by.model('contactCreationOrEditFactory.mail.content')).sendKeys('wangwu@shgbit.com');
        //
        //element(by.id('btnCancel')).click();
    });

    it('create contator, name\'s len is greater than max 16 chars, should show name error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('bobenut1234567890');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, name is empty, directly click save, should show name error info, create dailog is not closed.. ', function() {
        element(by.id('btnCreate')).click();
        element(by.id('btnSave')).click();
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);
    });

    //it('should add one and two', function() {
    //    browser.get('http://juliemr.github.io/protractor-demo/');
    //    element(by.model('first')).sendKeys(1);
    //    element(by.model('second')).sendKeys(2);
    //
    //    element(by.id('gobutton')).click();
    //
    //    expect(element(by.binding('latest')).getText()).
    //    toEqual('5'); // This is wrong!
    //    expect(element(by.className('modal-dialog')).isDisplayed()).toBe(true);
    //});
});