function myFunction() {
    let x = document.getElementById("myInput");
    let y = document.getElementById("hide1");
    let z = document.getElementById("hide2");

    if (x.type === 'password') {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    }
    else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

function myFunction2() {
    let x2 = document.getElementById("myInput2");
    let y2 = document.getElementById("hide3");
    let z2 = document.getElementById("hide4");

    if (x2.type === 'password') {
        x2.type = "text";
        y2.style.display = "block";
        z2.style.display = "none";
    }
    else {
        x2.type = "password";
        y2.style.display = "none";
        z2.style.display = "block"
    }
}

function myFunction3() {
    let x3 = document.getElementById("myInput3");
    let y3 = document.getElementById("hide5");
    let z3 = document.getElementById("hide6");

    if (x3.type === 'password') {
        x3.type = "text";
        y3.style.display = "block";
        z3.style.display = "none";
    }
    else {
        x3.type = "password";
        y3.style.display = "none";
        z3.style.display = "block"
    }
}