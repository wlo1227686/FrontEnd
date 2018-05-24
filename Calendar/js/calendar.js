var now_Date =
    (new Date().getFullYear() - 1911).toString() +
    (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    ).toString() +
    (new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    ).toString();
var Session_DATE = now_Date;
window.onload = function (input) {
    Load_Main();
};
//------<Function>---------------------------------------------------------------------------------------
function Load_Main() {
    document.getElementById('query_date').value = Session_DATE;
    //日期的點擊事件
    document.getElementById('query_date').addEventListener('click', function () {
        alert_Message_Calendar();
    });
}
//[alert_Message_Calendar]日期的ALERT---------------------------------------------------------------------------------------------------------
function alert_Message_Calendar() {
    document.getElementById('model').className = "model_show";
    resultData = "";
    resultData += "<div style='height:50px;'><div style='padding:10px;' align='center'><div id='OLD_Y' style='Display:inline-block; letter-spacing: -5px;font-weight: bold;' class='btn_s_Calendar_tool'>&lt;&lt;</div><div id='OLD_M' style='Display:inline-block; letter-spacing: 0px;font-weight: bold;' class='btn_s_Calendar_tool'>&lt;</div><div style='Display:inline-block;font-size:24px;font-family:微軟正黑體;'>民國:</div><div style='Display:inline-block;Margin:0px 2px 0px 2px;'><input type='text' id='SHOW_Y' value='107' style='width:50px;color:blue;border-width: 0px 0px 1px 0px;border-color:black;text-align:center;font-size:24px;' readonly></div><div style='Display:inline-block;font-size:24px;font-family:微軟正黑體;'>年</div><div style='Display:inline-block;Margin:0px 2px 0px 2px;'><input type='text' id='SHOW_M' value='12' style='width:50px;color:blue;border-width: 0px 0px 1px 0px;border-color:black;text-align:center;font-size:24px;' readonly></div><div style='Display:inline-block;font-size:24px;font-family:微軟正黑體;'>月</div><div style='Display:inline-block;Margin:0px 2px 0px 2px;'><input type='text' id='SHOW_D' value='31' style='width:50px;color:blue;border-width: 0px 0px 1px 0px;border-color:black;text-align:center;font-size:24px;' readonly></div><div style='Display:inline-block;font-size:24px;font-family:微軟正黑體;'>日</div><div id='NEW_M' style='Display:inline-block;letter-spacing:0px;font-weight:bold;' class='btn_s_Calendar_tool'>&gt;</div><div id='NEW_Y' style='Display:inline-block;letter-spacing:-5px;font-weight:bold;' class='btn_s_Calendar_tool'>&gt;&gt;</div> </div></div><div style='height:389px;'><div style='padding:5px;font-size:30px;font-family:微軟正黑體;' align='center'><div id='daily_Row'></div></div></div><div style='height:60px;'><div style='padding:5px;' align='center'><div id='btn_s_a' style='Display:inline-block;' class='item' align='center'></div><div style='Display:inline-block;width:50px;'></div><div id='btn_s_c' style='Display:inline-block;' class='item' align='center'></div></div></div>";
    document.getElementById('ALERT_M').innerHTML = resultData;
    show_calendar(document.getElementById('query_date').value);
    logic_calendar();
    document.getElementById('ALERT_M').style.top = '15%';
    document.getElementById('btn_s_a').innerHTML = "確定";
    document.getElementById('btn_s_c').innerHTML = "取消";
    LOGIC_alert_Message_Calendar();
}
function show_calendar(input) {
    var key = input;
    CREATE_CALENDAR(input, (parseInt(key.substr(0, 3)) + parseInt("1911")), parseInt(key.substr(3, 2)) - 1, key.substr(5, 2));
}
function CREATE_CALENDAR(input, input_Y, input_M, input_D) {
    var ans_id = input;
    var date = new Date(input_Y, input_M, "1");
    var CreateYear = date.getFullYear();//年
    var CreateMonth = date.getMonth();//月0~11
    var CreateDay = date.getDay(1);//該月第一天的星期  
    /*************************************************************************************** */
    document.getElementById('SHOW_Y').value = input.substr(0, 3);
    document.getElementById('SHOW_M').value = input.substr(3, 2);
    document.getElementById('SHOW_D').value = input.substr(5, 2);
    /*************************************************************************************** */
    // 每月日數陣列
    var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // 閏年判斷
    if (((CreateYear % 4 == 0) && (CreateYear % 100 != 0)) || (CreateYear % 400 == 0)) monthDays[1] = 29;
    // 計算秀出時需要的格數
    var total = monthDays[CreateMonth] + CreateDay;
    var totalCells = total + (total % 7 ? 7 - total % 7 : 0);
    var String_For_Daily_Row = "";
    String_For_Daily_Row += "<div style='padding:2px;'><div style='Display:inline-block;' class='btn_s_Calendar_header'>日</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>一</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>二</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>三</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>四</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>五</div><div style='Display:inline-block;' class='btn_s_Calendar_header'>六</div></div>";
    for (i = 0; i < totalCells; i++) {
        if (i % 7 == 0) { if (i < 7) { String_For_Daily_Row += "<div style='padding:2px;'>"; } else { String_For_Daily_Row += "</div><div style='padding:2px;'>"; } }
        if (i >= CreateDay && i < total) { if (i >= CreateDay) { String_For_Daily_Row += "<div style='Display:inline-block;' class='btn_s_Calendar' id=" + ((parseInt(CreateYear) - 1911) < 100 ? "0" + (parseInt(CreateYear) - 1911) : (parseInt(CreateYear) - 1911)).toString() + ((CreateMonth + 1) < 10 ? ("0" + (CreateMonth + 1)) : (CreateMonth + 1)) + (((i - CreateDay) + 1) < 10 ? ("0" + ((i - CreateDay) + 1)) : ((i - CreateDay) + 1)) + " name='calendar_item'>" + ((i - CreateDay) + 1) + "</div>"; } } else { String_For_Daily_Row += "<div style='Display:inline-block;' class='btn_s_Calendar_header'>&nbsp;&nbsp;</div>"; }
    }
    String_For_Daily_Row += "</div>";
    document.getElementById('daily_Row').innerHTML = String_For_Daily_Row;
    try {
        if (now_Date == ans_id) {
            document.getElementById(now_Date).className = "btn_s_Calendar_NowDay";
        } else {
            document.getElementById(ans_id).className = "btn_s_Calendar_check";
            try {
                document.getElementById(now_Date).className = "btn_s_Calendar_NowDay";
            } catch (e) {
            }
        }
    } catch (e) {
    }
    $('#daily_Row div div').click(function () {
        var a = this.id.toString().length;
        if (this.id.toString().length == 7) {
            document.getElementById('SHOW_Y').value = this.id.substr(0, 3);
            document.getElementById('SHOW_M').value = this.id.substr(3, 2);
            document.getElementById('SHOW_D').value = this.id.substr(5, 2);
        }
        for (i = 0; i < $('div[name^="calendar_item"]').length; i++) {
            if ($('div[name^="calendar_item"]')[i].id != now_Date) {
                if ($('div[name^="calendar_item"]')[i].id != this.id) {
                    document.getElementById($('div[name^="calendar_item"]')[i].id).className = "btn_s_Calendar";
                } else {
                    document.getElementById($('div[name^="calendar_item"]')[i].id).className = "btn_s_Calendar_check";
                }
            }
        }
    });
}
function logic_calendar() {
    $('#OLD_Y').click(function () {
        var old_key = document.getElementById("SHOW_Y").value + document.getElementById("SHOW_M").value + document.getElementById("SHOW_D").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            new_key = ((parseInt(old_key.substr(0, 3)) - 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) - 1) : (parseInt(old_key.substr(0, 3)) - 1)).toString() + old_key.substr(3, 2) + old_key.substr(5, 2);
        } else {
        }
        show_calendar(new_key);
    });
    $('#OLD_M').click(function () {
        var old_key = document.getElementById("SHOW_Y").value + document.getElementById("SHOW_M").value + document.getElementById("SHOW_D").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            if (old_key.substr(3, 2) == "01") {
                new_key = ((parseInt(old_key.substr(0, 3)) - 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) - 1) : (parseInt(old_key.substr(0, 3)) - 1)).toString() + "12" + old_key.substr(5, 2);
            } else {
                new_key = old_key.substr(0, 3) + ((parseInt(old_key.substr(3, 2)) - 1 < 10) ? "0" + (parseInt(old_key.substr(3, 2)) - 1) : (parseInt(old_key.substr(3, 2)) - 1)).toString() + old_key.substr(5, 2);
            }
        } else {
        }
        show_calendar(new_key);
    });
    $('#NEW_Y').click(function () {
        var old_key = document.getElementById("SHOW_Y").value + document.getElementById("SHOW_M").value + document.getElementById("SHOW_D").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            new_key = ((parseInt(old_key.substr(0, 3)) + 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) + 1) : (parseInt(old_key.substr(0, 3)) + 1)).toString() + old_key.substr(3, 2) + old_key.substr(5, 2);
        } else {
        }
        show_calendar(new_key);
    });
    $('#NEW_M').click(function () {
        var old_key = document.getElementById("SHOW_Y").value + document.getElementById("SHOW_M").value + document.getElementById("SHOW_D").value;
        var new_key = "";
        if (parseInt(old_key.substr(0, 3)) > 10) {
            if (old_key.substr(3, 2) == "12") {
                new_key = ((parseInt(old_key.substr(0, 3)) + 1) < 100 ? "0" + (parseInt(old_key.substr(0, 3)) + 1) : (parseInt(old_key.substr(0, 3)) + 1)).toString() + "01" + old_key.substr(5, 2);
            } else {
                new_key = old_key.substr(0, 3) + ((parseInt(old_key.substr(3, 2)) + 1 < 10) ? "0" + (parseInt(old_key.substr(3, 2)) + 1) : (parseInt(old_key.substr(3, 2)) + 1)).toString() + old_key.substr(5, 2);
            }
        } else {
        }
        show_calendar(new_key);
    });
}
function LOGIC_alert_Message_Calendar() {
    document.getElementById('btn_s_a').addEventListener('click', function () {
        document.getElementById('query_date').value = document.getElementById("SHOW_Y").value + document.getElementById("SHOW_M").value + document.getElementById("SHOW_D").value;
        document.getElementById('model').className = "model_hidden";
        document.getElementById('ALERT_M').style.top = '-1000%';
        document.getElementById('ALERT_M').innerHTML = "";
        CALL_SERVER(document.getElementById('query_date').value, document.getElementById('Frontend_Session_QUERY_PAGE_MODE').value+"|"+document.getElementById('Frontend_Session_QUERY_LIST_SORT').value);
    });
    document.getElementById('btn_s_c').addEventListener('click', function () {
        document.getElementById('model').className = "model_hidden";
        document.getElementById('ALERT_M').style.top = '-1000%';
        document.getElementById('ALERT_M').innerHTML = "";
    });
}
//[alert_Message_Calendar]日期的ALERT---------------------------------------------------------------------------------------------------------