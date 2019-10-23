var mySidebar = document.getElementById("mySidebar");
var x=document.getElementById(".bg-modal");

function my_open() {
    mySidebar = document.getElementById("mySidebar");
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
    } else {
        mySidebar.style.display = 'block';
    }
};
function closed(){
    x.style.display=='none';
};
function my_close() {
    mySidebar.style.display = "none";
};

//---------------------------------------//

// document.querySelector("#navbar").addEventListener('click', my_open(),false);

// document.querySelector("#close1").addEventListener('click', closed(),false);

// document.querySelector("#close2").addEventListener('click', function() {
//     document.querySelector(".bg-modal").style.display = "none";
// });
// document.getElementById("switch1").addEventListener('click', function() {
//     document.querySelector(".bg-modal").style.display = "flex";
//     document.querySelector("#registration-form").style.display = "block";
//     document.querySelector("#login-form").style.display = "none";

// });

// document.getElementById("form-switch").addEventListener('click', function() {
//     document.querySelector(".bg-modal").style.display = "flex";
//     document.querySelector("#registration-form").style.display = "none";
//     document.querySelector("#login-form").style.display = "block";

// });

// document.querySelector(".icon").addEventListener('mouseenter', pass)
// document.querySelector(".icon").addEventListener('mouseleave', pass)


