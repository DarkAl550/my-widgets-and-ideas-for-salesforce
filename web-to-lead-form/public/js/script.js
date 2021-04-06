document.getElementById("title").innerText = "Customer Information";
document.getElementById('prev').classList.add("hiddenElement");
document.getElementById('submit').classList.add("hiddenElement");
document.getElementById('finalPage').classList.add("hiddenElement");

function toNext(){
    let title = document.getElementsByTagName("h1")[0].innerHTML;
    let div1 = document.getElementById('firstPage');
    let div2 = document.getElementById('secondPage');
    let div3 = document.getElementById('finalPage');
    console.log("title: " + title)
    if(checkCompanyField() && checkSiteField() && checkFirstName() && checkLastName() && checkDateField() && checkEmailInput() && title == "Customer Information"){
        div1.classList.add("hiddenElement");
        div2.classList.remove("hiddenElement");
        document.getElementById("title").innerText = "Address Information";
        document.getElementById('prev').classList.remove("hiddenElement");
    }else if(checkCountryField() && checkStateField() && checkZipField() && checkCityField() && checkStreetField() && title == "Address Information"){
        displayInfo();
        div2.classList.add("hiddenElement");
        div3.classList.remove("hiddenElement");
        document.getElementById("title").innerText = "Check & Submit";
        document.getElementById('submit').classList.remove("hiddenElement");
        document.getElementById('next').classList.add("hiddenElement");
    }
}

function toPrev(){
    let div1 = document.getElementById('firstPage');
    let div2 = document.getElementById('secondPage');
    let div3 = document.getElementById('finalPage');
    if(div2.classList.contains("hiddenElement") && div1.classList.contains("hiddenElement")){
        div3.classList.add("hiddenElement");
        div2.classList.remove("hiddenElement");
        document.getElementById("title").innerText = "Address Information";
        document.getElementById('submit').classList.add("hiddenElement");
        document.getElementById('next').classList.remove("hiddenElement");
    }else if(div1.classList.contains("hiddenElement")){
        document.getElementById("title").innerText = "Customer Information";
        document.getElementById('prev').classList.add("hiddenElement");
        div2.classList.add("hiddenElement");
        div1.classList.remove("hiddenElement");
    }
}

function toggleCheckbox(){

    let checkbox = document.getElementById("00N5g000006HhMK");
    let checkboxBox = document.getElementById("checkboxBox");
    if(!checkbox.checked){ 
        checkboxBox.innerHTML = '<img class="image" width=20 src="img/checked.png"><label>Add shipping address</label>';
        document.getElementById("00N5g000006HhMK").checked = true;
    }else{
        checkboxBox.innerHTML = '<img class="image" width=20 src="img/unchecked.png"><label>Add shipping address</label>';
        document.getElementById("00N5g000006HhMK").checked = false;
    }
}
