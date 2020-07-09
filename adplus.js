// ==UserScript==
// @name         A岛-PLUS
// @namespace    adplus_ccq
// @version      0.5.1
// @description  try to take over the world!
// @author       ccq
// @match        https://adnmb2.com/t/*
// @match        https://adnmb2.com/f/*
// @grant GM_setValue
// @grant GM_getValue
// @note         https://github.com/chucongqing/greasy_scripts/edit/master/adplus.js
// ==/UserScript==
'use strict';

var darkCfg ={
    bodyBg:'#1d1f21',
    textAreaBg: '#282a2e',
    fontColor: '#c5c8c6',
    centreBg: '#2B2B2B',
    threadPoBg:"#3A3A42"
}

var defaultCfg = {

}

const Theme = {
    Default : 0,
    Dark : 1
}

let theme = Theme.Default



function dark_mode(){
    var config = darkCfg
    var cfg = {}
    cfg.html_bg = config.bodyBg
    cfg.html_color = config.fontColor
    cfg.h_threads_item_bg =  config.bodyBg // $('.h-threads-item').css("background",config.bodyBg)
    cfg.h_threads_content_color = config.fontColor//$('.h-threads-content').css("color",config.fontColor)
    cfg.htirm_bg = config.centreBg //$(".h-threads-item-reply-main").css("background",config.centreBg)
    cfg.hpft_bg = config.bodyBg //$('.h-post-form-title').css("background",config.bodyBg)
    cfg.ht_color =config.fontColor // $(".h-title").css("color",config.fontColor)

    setcss(cfg)
}

function default_mode() {
    setcss(defaultCfg)
}

function setcss(config){
 $('html').css("background",config.html_bg)
    $('html').css("color",config.html_color)
    $('.h-threads-item').css("background",config.h_threads_item_bg)
    $('.h-threads-content').css("color",config.h_threads_content_color)
    $(".h-threads-item-reply-main").css("background",config.htirm_bg)
    $('.h-post-form-title').css("background",config.hpft_bg)
    $(".h-title").css("color",config.hpft_bg)
   // $('.h-ref-view').css("background",config.centreBg)
}

function t_func() {
     // Your code here...
    let mainThread = $(".h-threads-item-main")
    let poerId = mainThread.find(".h-threads-info-uid").text();
    console.log(`poerId > ${poerId}`)

    let replys = $(".h-threads-item-reply")

    for(let i = 0; i < replys.length; i++){
        var reply = $(replys[i])
        var repId = reply.find(".h-threads-info-uid").text()
        if(repId === poerId){
            //reply.css("background-color","#55ee66")
            let color = ""
            if(theme === Theme.Dark)
            {
                color= darkCfg.threadPoBg
            }
            else{
                color = "rgb(255,237,191)"
            }
            reply.find(".h-threads-item-reply-main").css("background",color)
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

function OnChangeTheme(){
    if(theme == Theme.Dark)
    {
        dark_mode()
    }
    else{
         default_mode()
    }

     var pathname = window.location.pathname;

     if(pathname.indexOf("/f/") >= 0 ) {
        f_func()
     }
    else if( pathname.indexOf("/t/") >= 0 ) {
        t_func()
    }
}

function exfunc(){
   let menu = $("#h-menu-content")
   let c = $("<li class=\"h-nav-item\">  <a>  Dark Mode </a></li>")
   c.children("a").click(()=>{
      if(theme == 0)
      {
          theme =1 }
       else if( theme == 1) {
         theme = 0
       }
       else{
           theme = 0
       }
       GM_setValue("theme",theme)
       OnChangeTheme()
   })
   menu.append(c)
}

function backupdefault(){
    defaultCfg.html_bg = $('html').css("background")
    defaultCfg.html_color = $('html').css("color")
    defaultCfg.h_threads_item_bg =  $('.h-threads-item').css("background")
    defaultCfg.h_threads_content_color = $('.h-threads-content').css("color")
    defaultCfg.htirm_bg = $(".h-threads-item-reply-main").css("background")
    defaultCfg.hpft_bg = $('.h-post-form-title').css("background")
    defaultCfg.ht_color = $(".h-title").css("color")
    //$('.h-ref-view').css("background",config.centreBg)
}

(function() {
    theme = GM_getValue("theme",Theme.Default)
    backupdefault();
    console.log("current theme = " + theme)
OnChangeTheme();

    exfunc()

})();

