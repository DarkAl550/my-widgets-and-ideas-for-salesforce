function checkCompanyField(){
    let companyField =  document.getElementById("company");
    let companyFieldvalue = companyField.value;
    let errorMessage = document.getElementById('companynameerror');
    if(companyFieldvalue.trim()) {
        errorMessage.classList.add("error");
        document.getElementById("company").value = companyFieldvalue.trim();
        companyField.classList.add("currentlyField");
        companyField.classList.remove("invalidField")
        return true;
    }else{
        errorMessage.classList.remove("error");
        document.getElementById("company").value = companyFieldvalue.trim();
        companyField.classList.add("invalidField");
        companyField.classList.remove("currentlyField");
        return false;
    }
}

function checkSiteField(){
    let siteField = document.getElementById("url");
    let siteFieldValue = siteField.value.trim();
    let errorMessage = document.getElementById('companysiteerror');
    if(!siteFieldValue){
        errorMessage.classList.add("error");
        document.getElementById("url").value = siteFieldValue.trim();
        siteField.classList.add("currentlyField");
        siteField.classList.remove("invalidField")
        return true;
    }else {
        document.getElementById("url").value = siteFieldValue.trim();
        let url;
        try {
            errorMessage.classList.add("error");
            url = new URL(siteFieldValue);
            siteField.classList.add("currentlyField");
            siteField.classList.remove("invalidField")
            return true;
        }catch (_) {
            errorMessage.classList.remove("error");
            siteField.classList.add("invalidField");
            siteField.classList.remove("currentlyField");
            return false;
        }
        
    }
}

function checkDateField(){
    let dateField = document.getElementById("dateField");
    let dateFieldValue = dateField.value;
    let errorMessage = document.getElementById('daterror');
    if(dateFieldValue){
        errorMessage.classList.add("error");
        dateField.classList.add("currentlyField");
        dateField.classList.remove("invalidField")
        document.getElementById('00N5g000006HRKQ').value = dateFieldValue.split('-')[1] + '/'+dateFieldValue.split('-')[2] + '/'+dateFieldValue.split('-')[0];
        return true
    }else{
        errorMessage.classList.remove("error");
        dateField.classList.add("invalidField");
        dateField.classList.remove("currentlyField");
        return false;
    }
}

function checkFirstName(){
    let firstNameField = document.getElementById("first_name");
    let firstNameFieldValue = firstNameField.value;
    let errorMessage = document.getElementById('firstnameerror');
    if(firstNameFieldValue && firstNameFieldValue.split('').length > 1){
        var reg = /^([а-яё]+|[a-z]+)$/i;
        if(reg.test(firstNameFieldValue.trim()))
        {
            errorMessage.classList.add("error");
            document.getElementById("first_name").value = firstNameFieldValue.trim();
            firstNameField.classList.add("currentlyField");
            firstNameField.classList.remove("invalidField")
            return true;
        }
        else{
            errorMessage.classList.remove("error");
            firstNameField.classList.add("invalidField");
            firstNameField.classList.remove("currentlyField");
            return false;
        } 
    }else{
        errorMessage.classList.remove("error");
        firstNameField.classList.add("invalidField");
        firstNameField.classList.remove("currentlyField");
        return false;
    }
}

function checkLastName(){
    let lastNameField = document.getElementById("last_name");
    let lastNameFieldValue = lastNameField.value;
    let errorMessage = document.getElementById('lastnameerror');
    if(lastNameFieldValue && lastNameFieldValue.split('').length > 1){
        var reg = /^([а-яё]+|[a-z]+)$/i;
        if(reg.test(lastNameFieldValue))
        {
            errorMessage.classList.add("error");
            lastNameField.classList.add("currentlyField");
            lastNameField.classList.remove("invalidField")
            return true;
        }
        else{
            errorMessage.classList.remove("error");
            lastNameField.classList.add("invalidField");
            lastNameField.classList.remove("currentlyField");
            return false;
        } 
    }else{
        errorMessage.classList.remove("error");
        lastNameField.classList.add("invalidField");
        lastNameField.classList.remove("currentlyField");
        return false;
    }
}

function checkEmailInput(){
    let emailField = document.getElementById("email");
    let emailFieldvalue = emailField.value;
    let errorMessage = document.getElementById('emailerror');
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(String(emailFieldvalue).toLowerCase())){
        errorMessage.classList.add("error");
        emailField.classList.add("currentlyField");
        emailField.classList.remove("invalidField")
        return true;
    }else{
        errorMessage.classList.remove("error");
        emailField.classList.add("invalidField");
        emailField.classList.remove("currentlyField");
        return false;
    }
}
//second page
function checkCountryField(){
    let countryField = document.getElementById("country");
    let countryFieldValue = countryField.value;
    let errorMessage = document.getElementById('countryerror');
    if(countryFieldValue && countryFieldValue.split('').length > 2){
        var reg = /^([а-яё]+|[a-z]+)$/i;
        if(reg.test(countryFieldValue))
        {
            errorMessage.classList.add("error");
            countryField.classList.add("currentlyField");
            countryField.classList.remove("invalidField")
            return true;
        }
        else{
            errorMessage.classList.remove("error");
            countryField.classList.add("invalidField");
            countryField.classList.remove("currentlyField");
            return false;
        } 
    }else{
        errorMessage.classList.remove("error");
        countryField.classList.add("invalidField");
        countryField.classList.remove("currentlyField");
        return false;
    }
}

function checkStateField(){
    let stateField = document.getElementById("state");
    let stateFieldValue = stateField.value;
    let errorMessage = document.getElementById('stateerror');
    if(stateFieldValue && stateFieldValue.split('').length > 1 || stateFieldValue.split('').includes(' ') && stateFieldValue.trim()) {
        errorMessage.classList.add("error");
        stateField.classList.add("currentlyField");
        stateField.classList.remove("invalidField")
        return true;
    }else{
        errorMessage.classList.remove("error");
        stateField.classList.add("invalidField");
        stateField.classList.remove("currentlyField");
        return false;
    }
}

function checkZipField(){
    let zipField = document.getElementById("zip");
    let zipFieldValue = zipField.value;
    let errorMessage = document.getElementById('ziperror');
    if(zipFieldValue.trim() && zipFieldValue.split('').length > 2){
        if(!isNaN(zipFieldValue))
        {
            errorMessage.classList.add("error");
            zipField.classList.add("currentlyField");
            zipField.classList.remove("invalidField")
            return true;
        }
        else{
            errorMessage.classList.remove("error");
            zipField.classList.add("invalidField");
            zipField.classList.remove("currentlyField");
            return false;
        } 
    }else{
        errorMessage.classList.remove("error");
        zipField.classList.add("invalidField");
        zipField.classList.remove("currentlyField");
        return false;
    }
}

function checkCityField(){
    let cityField = document.getElementById("city");
    let cityFieldValue = cityField.value;
    let errorMessage = document.getElementById('cityerror');
    if(cityFieldValue && cityFieldValue.split('').length > 1 || cityFieldValue.split('').includes(' ') && cityFieldValue.trim()) {
        errorMessage.classList.add("error");
        cityField.classList.add("currentlyField");
        cityField.classList.remove("invalidField")
        return true;
    }else{
        errorMessage.classList.remove("error");
        cityField.classList.add("invalidField");
        cityField.classList.remove("currentlyField");
        return false;
    }
}

function checkStreetField(){
    let streetField = document.getElementById("street");
    let streetFieldValue = streetField.value;
    let errorMessage = document.getElementById('streeterror');
    if(streetFieldValue && streetFieldValue.split('').length > 1 || streetFieldValue.split('').includes(' ') && streetFieldValue.trim()) {
        errorMessage.classList.add("error");
        streetField.classList.add("currentlyField");
        streetField.classList.remove("invalidField")
        return true;
    }else{
        errorMessage.classList.add("error");
        streetField.classList.add("invalidField");
        streetField.classList.remove("currentlyField");
        return false;
    }
}
function timestamp() { 
    var response = document.getElementById("g-recaptcha-response"); 
    if (response == null || response.value.trim() == "") {
        var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
        document.getElementById("retURL").value = 'https://task-web-to-lead.herokuapp.com/';
        return false;
    }else{
        document.getElementById("retURL").value = 'https://task-web-to-lead.herokuapp.com/complete.html';
        return true;
    }
} setInterval(timestamp, 500);

