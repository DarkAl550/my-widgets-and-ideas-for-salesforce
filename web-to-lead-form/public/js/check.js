function displayInfo(){
    let companyName = document.getElementById("company").value;console.log(companyName);
    let companySite = document.getElementById("url").value;console.log(companySite);
    let first_name = document.getElementById("first_name").value;console.log(first_name);
    let last_name = document.getElementById("last_name").value;console.log(last_name);
    let birthday = document.getElementById("00N5g000006HRKQ").value;console.log(birthday);
    let email = document.getElementById("email").value;console.log(email);
    let country = document.getElementById("country").value;console.log(country);
    let state = document.getElementById("state").value;console.log(state);
    let zip = document.getElementById("zip").value;console.log(zip);
    let city = document.getElementById("city").value;console.log(city);
    let street = document.getElementById("street").value;console.log(street);
    let addshipaddress = document.getElementById("00N5g000006HhMK").checked;console.log(addshipaddress);

    document.getElementById('cn').innerText = companyName;
    document.getElementById('cs').innerText = companySite;
    document.getElementById('fn').innerText = first_name;
    document.getElementById('ln').innerText = last_name;
    document.getElementById('b').innerText = birthday;
    document.getElementById('e').innerText = email;
    document.getElementById('bc').innerText = country;
    document.getElementById('bs').innerText = state;
    document.getElementById('bz').innerText = zip;
    document.getElementById('bcity').innerText = city;
    document.getElementById('bstreet').innerText = street;

}