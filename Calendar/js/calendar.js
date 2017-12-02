window.onresize = function (event) {
    var b_x = document.body.clientWidth;
    var b_y = document.body.clientHeight;
    // console.log("b_x=" + b_x + "    b_y=" + b_y);
    $('.parent input').click(function () {
        var my_Date = document.getElementById(this.id);
        // console.log(this.id.toString() + "=" + document.getElementById(this.id));
        var x = document.getElementById(this.id).offsetLeft;
        var y = document.getElementById(this.id).offsetTop;
        // console.log("x=" + x + " y=" + y);
        openCalendar(this.id, b_x, b_y, x, y);
    });
};
window.onload = function () {

}
function openCalendar(input, input_b_x, input_b_y, input_o_x, input_o_y) {
    // document.getElementById('show_mySide').value = "off";
    document.getElementById("mySide").style.width = "250px";
    document.getElementById("mySide").style.height = "180px";
    document.getElementById("mySide").style.borderWidth = "1px";
    document.getElementById("mySide").style.padding = "10px";
    document.getElementById("mySide").style.top = (input_o_y) + 25 + "px";
    if (input_b_x - input_o_x < 400) {
        document.getElementById("mySide").style.left = (input_o_x) - 100 + 50 + "px";
    }
    else {
        document.getElementById("mySide").style.left = (input_o_x) + 50 + "px";
    }
    show_calendar(input);

}
function closeCalendar() {
    // document.getElementById('show_mySide').value = "on";
    document.getElementById("mySide").style.width = "0px";
    document.getElementById("mySide").style.height = "0px";
    document.getElementById("mySide").style.borderWidth = "0px";
    document.getElementById("mySide").style.display = "block";
    document.getElementById("mySide").style.padding = "0px";
}
function show_calendar(input) {
    var key = document.getElementById("mySide_key").value;
    if (key == "") {
        do_createDaily(input, new Date().getFullYear(), new Date().getMonth(), new Date().getDay(1));
        document.getElementById("mySide_key").value = (new Date().getFullYear() - 1911).toString() + (new Date().getMonth() + 1 <= 9 ? "0" + new Date().getMonth() + 1 : new Date().getMonth() + 1).toString() + (new Date().getDate() <= 9 ? "0" + new Date().getDate() : new Date().getDate()).toString();
    } else {
        do_createDaily(input, (parseInt(key.substr(0, 3)) + parseInt("1911")), parseInt(key.substr(3, 2)) - 1, key.substr(5, 2));
    }
}

function do_createDaily(input, input_Y, input_M, input_D) {
    var ans_id = input;
    // console.log('ans_id=' + ans_id);
    var String_For_Daily_Tools = "";
    String_For_Daily_Tools += "<div style='padding:0px 0px 5px 5px;'align='center'>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'>";
    String_For_Daily_Tools += "<div id='OLD_Y'style='Display:inline-block;padding:5px 5px 0px 0px;' class='calendar_botton'>&lt;&lt;</div>&nbsp;";
    String_For_Daily_Tools += "<div id='OLD_M'style='Display:inline-block;padding:5px 5px 0px 0px;' class='calendar_botton'>&lt;</div>";
    String_For_Daily_Tools += "</div>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'>民國:</div><div style='Display:inline-block;'><input type='text' id='show_Y' style='width:40px;color:blue;border-width: 0px 0px 1px 0px;border-color:black;text-align:center;' readonly></div>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'>月:</div><div style='Display:inline-block;padding:0px 5px 0px 0px;'><input type='text' id='show_M' style='width:30px;color:blue;border-width: 0px 0px 1px 0px;border-color:black;text-align:center;' readonly></div>";
    String_For_Daily_Tools += "</div>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'></div>";
    String_For_Daily_Tools += "<div style='Display:inline-block;'>";
    String_For_Daily_Tools += "<div id='NEW_M'style='Display:inline-block;padding:5px 3px 0px 2px;' class='calendar_botton'>&gt;</div>&nbsp;";
    String_For_Daily_Tools += "<div id='NEW_Y'style='Display:inline-block;padding:5px 3px 0px 2px;' class='calendar_botton'>&gt;&gt;</div>";
    String_For_Daily_Tools += "</div></div>";
    document.getElementById('daily_Tools').innerHTML = String_For_Daily_Tools;
    var date = new Date(input_Y, input_M, "1");
    var CreateYear = date.getFullYear();//年
    var CreateMonth = date.getMonth();//月0~11
    var CreateDay = date.getDay(1);//該月第一天的星期  
    /*************************************************************************************** */
    try {
        document.getElementById("show_Y").value = (CreateYear - 1911).toString();
        document.getElementById("show_M").value = (CreateMonth + 1 < 10 ? "0" + (CreateMonth + 1) : CreateMonth + 1).toString();
    } catch (e) {
        console.log("[Error Code]:" + e);
    }
    /*************************************************************************************** */
    // 每月日數陣列
    var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // 閏年判斷
    if (((CreateYear % 4 == 0) && (CreateYear % 100 != 0)) || (CreateYear % 400 == 0)) monthDays[1] = 29;
    // 計算秀出時需要的格數
    var total = monthDays[CreateMonth] + CreateDay;
    var totalCells = total + (total % 7 ? 7 - total % 7 : 0);
    var String_For_Daily_Row = "";
    String_For_Daily_Row += "<li class='parent'><div class='child_7'>日</div><div class='child_7'>一</div><div class='child_7'>二</div><div class='child_7'>三</div><div class='child_7'>四</div><div class='child_7'>五</div><div class='child_7'>六</div></li>";
    for (i = 0; i < totalCells; i++) {
        if (i % 7 == 0) {
            String_For_Daily_Row += "<li class='parent'>";
        }
        if (i >= CreateDay && i < total) {
            if (i >= CreateDay) {
                String_For_Daily_Row += "<div class='child_7' align='center' id=" + ((parseInt(CreateYear) - 1911) < 100 ? "0" + (parseInt(CreateYear) - 1911) : (parseInt(CreateYear) - 1911)).toString() + ((CreateMonth + 1) < 10 ? ("0" + (CreateMonth + 1)) : (CreateMonth + 1)) + (((i - CreateDay) + 1) < 10 ? ("0" + ((i - CreateDay) + 1)) : ((i - CreateDay) + 1)) + ">" + ((i - CreateDay) + 1) + "</div>";
            }
        } else {
            String_For_Daily_Row += "<div class='child_7'></div>";
        }
    }
    String_For_Daily_Row += "</li>";
    document.getElementById('daily_Row').innerHTML = String_For_Daily_Row;
    $('#daily_Row li div').click(function () {
        var a = this.id.toString().length;
        if (this.id.toString().length == 7) {
            document.getElementById(ans_id).value = this.id.toString();
        }
        closeCalendar(ans_id);
    });
    $('#OLD_Y').click(function () {
        var old_key = document.getElementById("mySide_key").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            document.getElementById("mySide_key").value = ((parseInt(old_key.substr(0, 3)) - 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) - 1) : (parseInt(old_key.substr(0, 3)) - 1)).toString() + old_key.substr(3, 2) + old_key.substr(5, 2);
        } else {
        }
        show_calendar(ans_id);
    });
    $('#OLD_M').click(function () {
        var old_key = document.getElementById("mySide_key").value;
        if (parseInt(old_key.substr(0, 3)) > 10) {
            if (old_key.substr(3, 2) == "01") {
                document.getElementById("mySide_key").value = ((parseInt(old_key.substr(0, 3)) - 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) - 1) : (parseInt(old_key.substr(0, 3)) - 1)).toString() + "12" + old_key.substr(5, 2);
            } else {
                document.getElementById("mySide_key").value = old_key.substr(0, 3) + ((parseInt(old_key.substr(3, 2)) - 1 < 10) ? "0" + (parseInt(old_key.substr(3, 2)) - 1) : (parseInt(old_key.substr(3, 2)) - 1)).toString() + old_key.substr(5, 2);
            }
        } else {
        }
        show_calendar();
    });
    $('#NEW_Y').click(function () {
        var old_key = document.getElementById("mySide_key").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            document.getElementById("mySide_key").value = ((parseInt(old_key.substr(0, 3)) + 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) + 1) : (parseInt(old_key.substr(0, 3)) + 1)).toString() + old_key.substr(3, 2) + old_key.substr(5, 2);
        } else {
        }
        show_calendar(ans_id);
    });
    $('#NEW_M').click(function () {
        var old_key = document.getElementById("mySide_key").value;
        if (parseInt(old_key.substr(0, 3)) > 10) {
            if (old_key.substr(3, 2) == "12") {
                document.getElementById("mySide_key").value = ((parseInt(old_key.substr(0, 3)) + 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) + 1) : (parseInt(old_key.substr(0, 3)) + 1)).toString() + "01" + old_key.substr(5, 2);
            } else {
                document.getElementById("mySide_key").value = old_key.substr(0, 3) + ((parseInt(old_key.substr(3, 2)) + 1 < 10) ? "0" + (parseInt(old_key.substr(3, 2)) + 1) : (parseInt(old_key.substr(3, 2)) + 1)).toString() + old_key.substr(5, 2);
            }
        } else {
        }
        show_calendar(ans_id);
    });
}