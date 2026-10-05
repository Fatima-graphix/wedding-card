/* ===== EDIT YOUR DETAILS HERE ===== */
var C={
  bride:"Ayesha", groom:"Hamza",
  date:"2026-12-12T18:00:00",           // wedding start (local time)
  dateText:"Saturday, 12 December 2026",
  venue:"The Grand Pavilion",
  address:"12 Rosewater Lane, Manchester",
  mapQuery:"The Grand Pavilion Manchester",
  rsvpPhone:"447000000000",              // WhatsApp number, country code, no + or spaces
  rsvpBy:"20 November",
  events:[
    {name:"Mehndi",  when:"Thursday, 10 December",  time:"6:00 pm",  note:"Henna, dhol and dinner"},
    {name:"Barat",   when:"Saturday, 12 December",  time:"6:00 pm",  note:"Arrival of the groom's family"},
    {name:"Nikah and dinner", when:"Saturday, 12 December", time:"8:00 pm", note:"Ceremony followed by dinner"},
    {name:"Walima",  when:"Sunday, 13 December",    time:"7:00 pm",  note:"A relaxed evening reception"}
  ]
};
/* =================================== */
var $=function(id){return document.getElementById(id)};
var B=C.bride, G=C.groom, ini=B[0]+" & "+G[0];

/* Personalise with a link like ...?guest=Sara */
var guest="";
try{guest=(new URLSearchParams(location.search).get("guest")||"").slice(0,40)}catch(e){}
if(guest){$("hi").textContent="Dear";$("guestName").textContent=guest}

document.title=B+" & "+G+" – Wedding Invitation";
$("seal").textContent=ini.replace(" & ","&");
$("lt").textContent=B+" & "+G;
$("names").innerHTML=B+"<i>&amp;</i>"+G;
$("names2").textContent=B+" & "+G;
$("mono").textContent=B[0]+G[0];
$("dateLine").textContent=C.dateText;
$("placeLine").textContent=C.venue+", Manchester";
$("venue").textContent=C.venue;
$("addr").textContent=C.address;
$("mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.mapQuery);

var s=new Date(C.date), e=new Date(s.getTime()+4*3600000);
function f(d){return d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2)+"T"+("0"+d.getHours()).slice(-2)+("0"+d.getMinutes()).slice(-2)+"00"}
$("calLink").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(B+" & "+G+" Wedding")+"&dates="+f(s)+"/"+f(e)+"&location="+encodeURIComponent(C.venue+", "+C.address);

$("events").innerHTML=C.events.map(function(v){
  return '<div class="ev"><h3>'+v.name+'</h3><p>'+v.when+' at '+v.time+'</p><small>'+v.note+'</small></div>'}).join("");

$("rsvpText").textContent="Please let us know by "+C.rsvpBy+" so we can save you a seat.";
function wa(t){return "https://wa.me/"+C.rsvpPhone+"?text="+encodeURIComponent(t)}
var who=guest||"I";
$("yes").href=wa("Assalam o alaikum! "+who+" will be attending "+B+" & "+G+"'s wedding. Congratulations!");
$("no").href=wa("Assalam o alaikum! "+who+" can't make it to "+B+" & "+G+"'s wedding, but sends love and duas.");

function tick(){
  var d=Math.max(0,s-new Date());
  $("cd").textContent=Math.floor(d/864e5);
  $("ch").textContent=Math.floor(d%864e5/36e5);
  $("cm").textContent=Math.floor(d%36e5/6e4);
}
tick();setInterval(tick,30000);

/* Open the envelope */
var env=$("env"),opened=false;
function open(){
  if(opened)return;opened=true;env.classList.add("open");document.body.classList.add("stage-open");
  setTimeout(function(){$("invite").classList.add("show");$("stage").classList.add("gone");window.scrollTo(0,0)},2200);
}
env.addEventListener("click",open);
