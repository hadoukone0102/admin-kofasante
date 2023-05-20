// export function showConsole(){
//     console.log("super man!");
// }

// Récupération de l'élément input du numéro de téléphone
var input = document.querySelector("#phone");

// Initialisation de la bibliothèque int-tel-input
var iti = window.intlTelInput(input, {
    preferredCountries: ["ci"], // Pays préférés
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.5/js/intlTelInput.min.js" // Script utils
});

function showPhoneNumber() {
    // Récupération de l'indicatif du pays sélectionné et mise à jour de l'élément HTML correspondant
    var selectedCountryData = iti.getSelectedCountryData();
    var countryCode = selectedCountryData.dialCode;
    document.querySelector("#country-code").innerHTML = "cool";
    document.querySelector("#country-coxde").innerHTML = countryCode;

    // Récupération du numéro de téléphone saisi et mise à jour de l'élément HTML correspondant
    // var phoneNumber = iti.getNumber();
    var phoneNumber = document.getElementById("phone").value;
    document.querySelector("#phone-number").innerHTML = phoneNumber;

    var contact = '+' + countryCode + phoneNumber;

    console.log(contact);
}

