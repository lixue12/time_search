/**
 *
 * Created by defaultstr on 11/28/14.
 */

var strcookie = document.cookie;
var arrcookie = strcookie.split("; ");
var studentID;
$(function () {
    for (var i = 0 ; i < arrcookie.length ; i++) {
        arrcookiecontent = arrcookie[i].split("=");
        if (arrcookiecontent[0] == "studentID") {
            studentID = arrcookiecontent[1];
            break;
        }
    }
    console.log("studentID" + studentID);
});

//if (studentID == "") {
//    studentID = "0";
//}

var current_page_url = window.location.href;
var current_site = get_set(current_page_url);
var server_site = current_site;


function get_set(url_str) {
    var ret = "127.0.0.1";
    var site_re = /http:\/\/([\w\.]+):8000\//;
    if (site_re.test(url_str)) {
        ret = RegExp.$1;
    }
    return ret;
}


window.onbeforeunload = function (e) {
    return "";
    //return ''
};


function questionnaire_button_on_click() {
    var text = $("#answer").val();
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tTASK=" + currentTaskID;
    message += "\tACTION=ANSWER_QUESTION";
    message += "\tINFO:";
    message += "\tanswer=" + text + "\n";
    var log_url = "http://" + server_site + ":8000/QuestionnaireService/";
    if (confirm("ok?")) {
        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush questionnaire answer")
            }
        });
        window.onbeforeunload = null;
        window.close();
    }
}

function description_button_on_click() {
    var text = $("#answer").val();
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tTASK=" + currentTaskID;
    message += "\tACTION=DESCRIPTION";
    message += "\tINFO:";
    message += "\tanswer=" + text + "\n";
    var log_url = "http://" + server_site + ":8000/QuestionnaireService/";
    if (confirm("ok?")) {
        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush questionnaire answer")
            }
        });
        window.onbeforeunload = null;
        location.href = "/search/" + currentTaskID + "/" + initQuery + "/1/";
    }
}
function session_over_button_on_click() {
    var score = $("#session_annotation").raty('score');
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tTASK=" + currentTaskID;
    message += "\tACTION=SESSION_ANNOTATION";
    message += "\tINFO:";
    message += "\tscore=" + score + "\n"
    if (confirm("ok?")) {
        var encode_str = message;
        var log_url = "http://" + server_site + ":8000/SessionAnnoService/";
        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: encode_str},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush mouse log!")
            }
        });
        window.onbeforeunload = null;
        location.href = "/annotation/" + currentTaskID + "/";
    }
}

function click_on_submittimeestimation() {
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tTASK=" + currentTaskID;
    message += "\tACTION=TIMEESTIMATE";
    message += "\tRANGE=" + getRange();
    message += "\t";
    var log_url = "http://" + server_site + ":8000/TimeEstService/";

    if (confirm("你确定提交当前的估计时间吗？")) {
        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush time estimation")
            }
        });
        window.onbeforeunload = null;
        location.href = "/post_questionnaire/" + currentTaskID + "/";
    }
}

function click_on_submittimeestimation_quiet() {
    var text = $("#time").html();
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tTASK=" + currentTaskID;
    message += "\tACTION=DESCRIPTION";
    message += "\tINFO:";
    message += "\ttime=" + text + "\n";
    var log_url = "http://" + server_site + ":8000/TimeEstService/";
    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log(text)
            console.log("synchronously flush time estimation")
        }
    });
    window.onbeforeunload = null;
}


function begin_calibration(docid) {
    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + docid;
    message += "\tACTION=BEGIN_CALIBRATION";
    message += "\tINFO:";
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log("synchronously flush hallo answer")
        }
    });
    window.onbeforeunload = null;


}


function end_calibration() {

    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + docid;
    message += "\tACTION=END_CALIBRATION";
    message += "\tINFO:";
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log("synchronously flush hallo answer")
        }
    });
    window.onbeforeunload = null;
}

function begin_reading() {
    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tACTION=BEGIN_READING";
    message += "\tINFO: CURRENT_DOC=" + currentDoc;
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log("synchronously flush hallo answer")
        }
    });
    window.onbeforeunload = null;

}

function end_reading() {

    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tACTION=END_READING";
    message += "\tINFO: CURRENT_DOC=" + currentDoc;
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log("synchronously flush hallo answer")
        }
    });
    window.onbeforeunload = null;
}

function time_estimate() {

    var relstr = "";
    var rel = -1;
    if (document.getElementById("rel4").checked == true) {
        rel = 3;
    }
    if (document.getElementById("rel3").checked == true) {
        rel = 2;
    }
    if (document.getElementById("rel2").checked == true) {
        rel = 1;
    }
    if (document.getElementById("rel1").checked == true) {
        rel = 0;
    }

    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tACTION=RELEVANCE_ANNOTATION";
    message += "\tINFO: CURRENT_DOC=" + currentDoc + ' REL=' + rel;

    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
        type: 'POST',
        url: log_url,
        data: {message: message},
        async: false,
        complete: function (jqXHR, textStatus) {
            //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
            //should we reset onbeforeunload here?
            console.log("synchronously flush hallo answer")
        }
    });
    window.onbeforeunload = null;
}

function relevance_annotate() {

}

function over_button_on_click() {
    var message = "";
    var client_time = (new Date()).getTime();

    if (getAnswer1()==null || getAnswer2()==null ||
        getAnswer3()==null || getAnswer4()==null){
        alert("选项不能为空！");
        console.log("not finish questionnaire");
    }
    else{
        message += "TIMESTAMP=" + client_time;
        message += "\tUSER=" + studentID;
        message += "\tTASK=" + currentTaskID;
        message += "\tQUALITY=" + getAnswer1();
        message += "\tDIFFICULT=" + getAnswer2();
        message += "\tFEELTIME=" + getAnswer3();
        message += "\tPRESSURE=" + getAnswer4();
        message += "\t";
        var log_url = "http://" + server_site + ":8000/PostQuestionService/";
        if (confirm("你确定提交当前问卷吗？")) {
            $.ajax({
                type: 'POST',
                url: log_url,
                data: {message: message},
                async: false,
                complete: function (jqXHR, textStatus) {
                    //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                    //should we reset onbeforeunload here?
                    console.log("synchronously flush time estimation")
                }
            });
            window.onbeforeunload = null;
            window.close();
        }
    }
}


function click_on_time2() {
    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + docid;
    message += "\tACTION=TIME2";
    message += "\tINFO:" + "Range=" + getRange();
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });

    if (confirm("Are you confirm that this is your time estimation?")) {


        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
        window.onbeforeunload = null;
        window.location.href = "/time3/" + jobid + "/"
    }
}

function click_on_time3() {
    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + docid;
    message += "\tACTION=TIME3";
    message += "\tINFO:" + " Relative=" + getRelative();
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
    if (confirm("Are you confirm that this is your time estimation?")) {


        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
        window.onbeforeunload = null;
        window.location.href = "/outcome/" + jobid + "/"
    }
}


function click_on_time1() {
    var client_time = (new Date()).getTime();
    var message = "";
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + "0";
    message += "\tACTION=TIME_1";
    message += "\tINFO:" + "Segments=" + getSegs();
    var log_url = "http://" + server_site + ":8000/LogService/"

    $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
    if (confirm("Are you confirm that this is your time estimation?")) {

        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
        window.onbeforeunload = null;
        window.location.href = "/time2/" + jobid + "/";
    }
}


function click_on_submitoutcome() {
    var reg = new RegExp("\r\n", "g");
    var text = document.getElementById("answer").value;
    var message = "";
    var client_time = (new Date()).getTime();
    message += "TIMESTAMP=" + client_time;
    message += "\tUSER=" + studentID;
    message += "\tJOBID=" + jobid;
    message += "\tDOCID=" + "0";
    message += "\tACTION=OUTCOME";
    message += "\tINFO:" + "answer=" + text.replace(reg, " ");
    var log_url = "http://" + server_site + ":8000/LogService/";

    $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
    if (confirm("Are you confirm that this is your outcome?")) {
        $.ajax({
            type: 'POST',
            url: log_url,
            data: {message: message},
            async: false,
            complete: function (jqXHR, textStatus) {
                //alert(textStatus + "----" + jqXHR.status + "----" + jqXHR.readyState);
                //should we reset onbeforeunload here?
                console.log("synchronously flush hallo answer")
            }
        });
        window.onbeforeunload = null;
        window.close();
    }

}