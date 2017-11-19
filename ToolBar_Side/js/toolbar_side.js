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
}
function openNav() {
    document.getElementById("mySidenav").style.width = "80px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}