
const personData=[];
function validateForm() {
    let formHasError = false;
    document.getElementById("velgFilmVal").innerHTML = " ";
    let velgFilm = document.forms["myForm"]["movies"].value;
    if (velgFilm == "") {
        document.getElementById("velgFilmVal").innerHTML = "vennligst velg en film";
        formHasError = true;
    }

    document.getElementById("antallVal").innerHTML = " ";
    let antallFilm = document.forms["myForm"]["antall"].value;
    if (antallFilm == "") {
        document.getElementById("antallVal").innerHTML="vennligst fyll ut antall";
        formHasError = true;


    }
    else if (isNaN(Number(antallFilm))) {
        document.getElementById("antallVal").innerHTML = "Vennligst skriv et nummer";
        formHasError = true;
    }
    document.getElementById("fNavnVal").innerHTML=" ";
    let forNavn = document.forms["myForm"]["fNavn"].value;
    if (forNavn == "") {
        document.getElementById("fNavnVal").innerHTML = "Fyll ut feltet";




        formHasError = true;
    }
       else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(forNavn)){
            document.getElementById("fNavnVal").innerHTML="Vennligst bare bokstaver";
            formHasError = true;
        }

    document.getElementById("eNavnVal").innerHTML=" ";
    let etterNavn = document.forms["myForm"]["eNavn"].value;
    if (etterNavn == " "){
        document.getElementById("eNavnVal").innerHTML = "vennligst skriv etternavn"
        formHasError = true;
    }
    else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(etterNavn)){
        document.getElementById("eNavnVal").innerHTML = " Skrive bare bokstaver"
        formHasError = true;
    }


    document.getElementById("telefonnrVal").innerHTML=" ";
    let telefonnummer = document.forms["myForm"]["telefonnr"].value;
    if (telefonnummer == "") {
        document.getElementById("telefonnrVal").innerHTML="Vennligs skriv telefonnummer";
        formHasError = true;


    }
    else if (isNaN(Number(telefonnummer)) || telefonnummer.length !== 8) {
        document.getElementById("telefonnrVal").innerHTML="Nummeret er ikke riktig";
        formHasError = true;

    }
    document.getElementById("epostVal").innerHTML=" ";
    let epostaddress = document.forms["myForm"]["epost"].value;
    if (epostaddress == "") {
        document.getElementById("epostVal").innerHTML = "vennligst skriv inn epost";
        formHasError = true;
    }
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!epostaddress.match(validRegex)) {
   // else if (!epostaddress.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        document.getElementById("epostVal").innerHTML="Vennligs skriv en riktig e-post"
        formHasError = true;
    }
    if(!formHasError)
    {
        const person = {
        film : velgFilm,
        antall : antallFilm,
        fornavn : forNavn,
        etternavn : etterNavn,
        telefonnr : telefonnummer,
        epost : epostaddress
    };
        //personData.push(person)
       // document.getElementById("myForm").reset();
        postData(person);




    }


    return false;



}



function postData(Billett) {
    $.post("/lagre", Billett, function (data) {
        document.getElementById("velgFilmVal").innerHTML = "";
        document.getElementById("antallVal").innerHTML = "";
        document.getElementById("fNavnVal").innerHTML = "";
        document.getElementById("eNavnVal").innerHTML = "";
        document.getElementById("telefonnrVal").innerHTML = "";
        document.getElementById("epostVal").innerHTML = "";
        document.getElementById("myForm").reset();


        //window.alert("your data has been saved successfully");
        $('.alert').css('display', 'block');
        fikkAlle();
    });
}

function closeAlert(){
    $('.alert').css('display', 'none');
}

function fikkAlle() {
    $.get("/fikkAlle", function (data) {
        let ut = "<table class=\"table table-striped\"><tr> " +
            "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
            "</tr>";
        for (let p of data) {
            ut += "<tr>";
            ut += "<td>" + p.film + "</td><td>" + p.antall + "</td><td>" + p.fornavn + " </td><td>" + p.etternavn +
                "</td><td>" + p.telefonnr + "</td><td>" + p.epost + "</td>";
            ut += "</tr>";

        }

        let list = document.getElementById('alleBilletter');
        list.innerHTML = ut;
    });
}

function slett() {

    $.post("/slettAlle", {}, function () {
        let list = document.getElementById('alleBilletter');
        list.innerHTML = " ";  // deleting entire data in the array
        closeAlert();
    });


}


/*INSERT INTO billett (film, antall, fornavn, etternavn, telefonnr, epost)
VALUES ('sweet November', '9', 'Yoel', 'Hagos', '48487647', 'nateye@hotmail.no');

INSERT INTO billett (film, antall, fornavn, etternavn, telefonnr, epost)
VALUES ('sweet November', '2', 'Stina', 'Berge', '123456', 'iuytrge@hotmail.no');*/

