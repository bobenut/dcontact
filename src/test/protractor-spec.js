describe('test dcontact web front function', function() {
    beforeEach(function () {
        browser.get('http://localhost:3000/');
        browser.waitForAngular();
    });

    it('create contator, name\'s len is less than min 2 chars, should show name error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('W');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, name\'s len is greater than max 16 chars, should show name error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('WangWu12345678901');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, name\'s len is invalid, input a valid value again, should not show name error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('WangWu12345678901');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);

        element(by.model('contactCreationOrEditFactory.name.content')).clear();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('WangWu');
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(false);
    });

    it('create contator, nameFirstWordChr\'s len is greater than 1 chars, should show nameFirstWordChr error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).sendKeys('ww');
        expect(element(by.id('nameFirstWordChrErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, nameFirstWordChr\'s len is invalid, input a valid value again, should not show nameFirstWordChr error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).sendKeys('ww');
        expect(element(by.id('nameFirstWordChrErrorInfo')).isDisplayed()).toBe(true);

        element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).clear();
        element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).sendKeys('w');
        expect(element(by.id('nameFirstWordChrErrorInfo')).isDisplayed()).toBe(false);
    });

    it('create contator, nameAllWordChr\'s len is greater than 10 chars, should show nameAllWordChr error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).sendKeys('ww012345671');
        expect(element(by.id('nameAllWordChrErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, nameAllWordChr\'s len is invalid, input a valid value again, should not show nameAllWordChr error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).sendKeys('ww012345671');
        expect(element(by.id('nameAllWordChrErrorInfo')).isDisplayed()).toBe(true);

        element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).clear();
        element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).sendKeys('ww');
        expect(element(by.id('nameAllWordChrErrorInfo')).isDisplayed()).toBe(false);
    });

    it('create contator, mobilePhone\'s len is less than min 4 chars, should show mobilePhone error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('123');
        expect(element(by.id('mobilePhoneErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, mobilePhone\'s len is greater than max 20 chars, should show mobilePhone error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('123456789012345678901');
        expect(element(by.id('mobilePhoneErrorInfo')).isDisplayed()).toBe(true);
    });

    it('create contator, mobilePhone\'s len is invalid, input a valid value again, should not show mobilePhone error info.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('123456789012345678901');
        expect(element(by.id('mobilePhoneErrorInfo')).isDisplayed()).toBe(true);

        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).clear();
        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('13718213227');
        expect(element(by.id('mobilePhoneErrorInfo')).isDisplayed()).toBe(false);
    });

    it('create contator, name is empty, directly click save, name & NameFirstWordChr & NameAllWordChr & Mobile Phone' +
        ' must be inputed, should show error info,, create dailog is not closed.. ', function() {
        element(by.id('btnCreate')).click();
        element(by.id('btnSave')).click();
        expect(element(by.id('nameErrorInfo')).isDisplayed()).toBe(true);
        expect(element(by.id('nameFirstWordChrErrorInfo')).isDisplayed()).toBe(true);
        expect(element(by.id('nameAllWordChrErrorInfo')).isDisplayed()).toBe(true);
        expect(element(by.id('mobilePhoneErrorInfo')).isDisplayed()).toBe(true);

        expect(element(by.className('modal-dialog')).isDisplayed()).toBe(true);
    });

    it('create contator, all fields are inputed correctly, save ok.', function() {
        element(by.id('btnCreate')).click();
        element(by.model('contactCreationOrEditFactory.name.content')).sendKeys('WangWu');
        element(by.model('contactCreationOrEditFactory.nameFirstWordChr.content')).sendKeys('w');
        element(by.model('contactCreationOrEditFactory.nameAllWordChr.content')).sendKeys('ww');
        element(by.model('contactCreationOrEditFactory.corp.content')).sendKeys('bobenut');
        element(by.model('contactCreationOrEditFactory.mobilePhone.content')).sendKeys('13718213227');
        element(by.model('contactCreationOrEditFactory.mail.content')).sendKeys('wangwu@bobenut.com');

        element(by.id('btnSave')).click().then(function(){
            browser.wait(function () {
                return browser.switchTo().alert().then(
                    function () {return true;},
                    function () {return false;}
                );
            }, 3000); // Wait timeout

            var saveOkAlert = browser.switchTo().alert();
            alertText = saveOkAlert.getText();
            //console.log('alert text: ' + alertText);
            expect(alertText).toMatch('save ok');

            saveOkAlert.dismiss().then(function(){
                //console.log('alert closed');
            });
        });
    });
});