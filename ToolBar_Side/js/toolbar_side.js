window.onload = function () {
    toolbar_Logic();
}
function toolbar_Logic() {
    document.getElementById('toolbar').addEventListener('click', function () {
        openNav();
    });
    document.getElementById('mySidenav').addEventListener('mouseleave', function () {
        closeNav()
    });
    document.getElementById('exit').addEventListener('click', function () {
        alert("exit");
    });
    document.getElementById('checked').addEventListener('click', function () {
        alert("checked");
    });
    document.getElementById('save').addEventListener('click', function () {
        alert("save");
    });
    document.getElementById('cloud').addEventListener('click', function () {
        alert("cloud");
    });
    document.getElementById('calendar').addEventListener('click', function () {
        alert("calendar");
    });
    document.getElementById('visibility').addEventListener('click', function () {
        alert("visibility");
    });
    document.getElementById('pin').addEventListener('click', function () {
        if (document.getElementById("status_pin").checked) {
            document.getElementById("status_pin").checked = false;
            document.getElementById("pin").style.backgroundColor = "#555555";
        } else {
            document.getElementById("status_pin").checked = true;
            document.getElementById("pin").style.backgroundColor = "#000000";
        }
    });
    document.getElementById('underline').addEventListener('click', function () {
        alert("underline");
    });
    document.getElementById('search').addEventListener('click', function () {
        alert("search");
    });
}
function openNav() {
    document.getElementById("mySidenav").style.width = "80px";
}
function closeNav() {
    if (document.getElementById("status_pin").checked) {
    } else {
        document.getElementById("mySidenav").style.width = "0px";
    }
}