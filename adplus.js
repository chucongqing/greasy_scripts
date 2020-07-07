// ==UserScript==
// @name         A岛-PLUS
// @namespace    adplus_ccq
// @version      0.4
// @description  try to take over the world!
// @author       ccq
// @match        https://adnmb2.com/t/*
// @match        https://adnmb2.com/f/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/chucongqing/greasy_scripts/master/adplus.js
// ==/UserScript==
'use strict';

function t_func() {
     // Your code here...
    let mainThread = $(".h-threads-item-main")
    let poerId = mainThread.find(".h-threads-info-uid").text();
    console.log(`poerId > ${poerId}`)

    let replys = $(".h-threads-item-reply")

    for(let i = 0; i < replys.length; i++){
        var reply = $(replys[i])
        var repId = reply.find(".h-threads-info-uid").text()
        if(repId == poerId){
            //reply.css("background-color","#55ee66")
            reply.find(".h-threads-item-reply-main").css("background-color","rgb(255,237,191")
        }
    }

    $(".h-threads-info-id").css("font-size","19px")
}

function f_func() {
    var cl = $(".h-threads-list")
    var d = cl.children("div")
    for(var i = 0 ; i < d.length; i++ ) {
        var aa = $(d[i])
        //console.log(`id = ${ aa.attr("data-threads-id")}`)
        let wt = aa.find("span.warn_txt2")
        var rep = aa.find("span.h-threads-info-reply-btn")
        let href = rep.children("a").attr("href")

        var wttxt = wt.text()
        wt.text("")
        wt.append(`<a href="${href}">${wttxt}</a>`)

    }
}

(function() {
   
     var pathname = window.location.pathname;

     if(pathname.indexOf("/f/") >= 0 ) {
        f_func()
     }
    else if( pathname.indexOf("/t/") >= 0 ) {
        t_func()
    }

})();


