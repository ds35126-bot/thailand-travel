/* Thailand Stay - frontend demo. No server/database is connected. */
const stays = [
 {id:1,name:"The Standard, Hua Hin",province:"ประจวบคีรีขันธ์",type:"โรงแรม",price:4200,rating:4.9,reviews:328,guests:2,bed:"1 เตียงคิงไซซ์",tag:"ยอดนิยม",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",description:"พักผ่อนริมทะเลหัวหินกับดีไซน์ร่วมสมัย สระว่ายน้ำสวย และบรรยากาศผ่อนคลาย",amenities:["สระว่ายน้ำ","Wi-Fi ฟรี","ติดทะเล","อาหารเช้า"]},
 {id:2,name:"Veranda Resort Phuket",province:"ภูเก็ต",type:"รีสอร์ต",price:5600,rating:4.8,reviews:214,guests:2,bed:"1 เตียงคิงไซซ์",tag:"วิวทะเล",image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",description:"รีสอร์ตบรรยากาศสงบ มองเห็นวิวทะเล เหมาะสำหรับการพักผ่อนและเติมพลัง",amenities:["สระว่ายน้ำ","Wi-Fi ฟรี","วิวทะเล","สปา"]},
 {id:3,name:"Raya Heritage",province:"เชียงใหม่",type:"โรงแรม",price:6900,rating:4.9,reviews:186,guests:2,bed:"1 เตียงคิงไซซ์",tag:"ดีไซน์สวย",image:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85",description:"ที่พักแรงบันดาลใจจากงานหัตถกรรมล้านนา ท่ามกลางบรรยากาศริมแม่น้ำ",amenities:["สระว่ายน้ำ","Wi-Fi ฟรี","ร้านอาหาร","วิวแม่น้ำ"]},
 {id:4,name:"The Salil Hotel Riverside",province:"กรุงเทพมหานคร",type:"โรงแรม",price:3500,rating:4.7,reviews:402,guests:2,bed:"1 เตียงคิงไซซ์",tag:"เดินทางสะดวก",image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=85",description:"โรงแรมริมแม่น้ำเจ้าพระยา ใกล้แหล่งท่องเที่ยวและร้านอาหารในกรุงเทพฯ",amenities:["สระว่ายน้ำ","Wi-Fi ฟรี","ฟิตเนส","ร้านอาหาร"]},
 {id:5,name:"The Tubkaak Krabi Boutique Resort",province:"กระบี่",type:"รีสอร์ต",price:7800,rating:4.9,reviews:276,guests:2,bed:"1 เตียงคิงไซซ์",tag:"บรรยากาศดี",image:"https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=85",description:"รีสอร์ตริมชายหาดทับแขก รายล้อมด้วยธรรมชาติและวิวหมู่เกาะกระบี่",amenities:["สระว่ายน้ำ","Wi-Fi ฟรี","ติดทะเล","สปา"]},
 {id:6,name:"Pool Villa Pattaya",province:"ชลบุรี",type:"พูลวิลล่า",price:4900,rating:4.6,reviews:119,guests:4,bed:"2 ห้องนอน",tag:"เหมาะกับกลุ่มเพื่อน",image:"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",description:"พูลวิลล่าส่วนตัวพร้อมสระว่ายน้ำ เหมาะสำหรับครอบครัวและกลุ่มเพื่อน",amenities:["สระส่วนตัว","Wi-Fi ฟรี","ครัว","ที่จอดรถ"]}
];
const $ = s => document.querySelector(s);
const money = n => new Intl.NumberFormat("th-TH",{style:"currency",currency:"THB",maximumFractionDigits:0}).format(n);
const STORAGE_KEY = "thailandStayBookings_v1";
let activeFilter = "ทั้งหมด", visibleStays = [...stays], selectedStay = null, currentBooking = null;

function readBookings(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch{return []}}
function saveBookings(items){localStorage.setItem(STORAGE_KEY,JSON.stringify(items))}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderStays(items){
  visibleStays=items; $("#resultCount").textContent=`พบ ${items.length} ที่พัก`;
  $("#emptyState").hidden=items.length>0;
  $("#stayGrid").innerHTML=items.map(s=>`<article class="stay-card">
    <div class="stay-image"><img src="${s.image}" alt="${escapeHTML(s.name)}" loading="lazy"><span class="stay-tag">${s.tag}</span><button class="favorite" aria-label="เพิ่มรายการโปรด" data-fav="${s.id}">♡</button></div>
    <div class="stay-info"><span class="stay-location">⌖ ${s.province} · ${s.type}</span><div class="stay-title-row"><h3>${s.name}</h3><span class="rating">★ ${s.rating}</span></div>
    <p class="stay-description">${s.description}</p><div class="stay-meta"><span>♙ ${s.guests} ท่าน</span><span>▱ ${s.bed}</span><span>รีวิว ${s.reviews}</span></div>
    <div class="stay-bottom"><div class="price"><strong>${money(s.price)}</strong><span> / คืน</span></div><button class="detail-button" data-detail="${s.id}">ดูรายละเอียด →</button></div></div></article>`).join("");
}
function applyFilters(){
  const province=$("#destination").value, guests=Number($("#guests").value), sort=$("#sortBy").value;
  let result=stays.filter(s=>(!province||s.province===province)&&(activeFilter==="ทั้งหมด"||s.type===activeFilter)&&s.guests>=guests);
  if(sort==="low")result.sort((a,b)=>a.price-b.price); if(sort==="high")result.sort((a,b)=>b.price-a.price); if(sort==="rating")result.sort((a,b)=>b.rating-a.rating);
  renderStays(result);
}
function dateDefaults(){
 const today=new Date(); const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
 const next=new Date(today);next.setDate(next.getDate()+1);const nextLocal=new Date(next.getTime()-next.getTimezoneOffset()*60000).toISOString().slice(0,10);
 $("#checkIn").min=local;$("#checkIn").value=local;$("#checkOut").min=nextLocal;$("#checkOut").value=nextLocal;
}
function getNights(){const a=new Date($("#checkIn").value+"T00:00:00"),b=new Date($("#checkOut").value+"T00:00:00");return Math.round((b-a)/86400000)}
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function openStay(id){
 selectedStay=stays.find(s=>s.id===Number(id));if(!selectedStay)return;
 const s=selectedStay;
 $("#stayDetail").innerHTML=`<div class="detail-hero"><img src="${s.image}" alt="${escapeHTML(s.name)}"></div><div class="detail-content"><span class="eyebrow">${s.province} · ${s.type}</span><h2>${s.name}</h2><span class="rating">★ ${s.rating} (${s.reviews} รีวิวตัวอย่าง)</span><p>${s.description}</p><div class="detail-facts"><span>♙ ${s.guests} ผู้เข้าพัก</span><span>▱ ${s.bed}</span><span>฿ ${money(s.price)} / คืน</span></div><p><b>สิ่งอำนวยความสะดวก</b><br>${s.amenities.map(escapeHTML).join(" · ")}</p><div class="detail-footer"><div class="price"><strong>${money(s.price)}</strong><span> / คืน</span></div><button class="primary-button" id="startBooking">จองที่พักนี้</button></div></div>`;
 $("#stayModal").showModal();
}
function openBooking(){
 if(!selectedStay)return;
 if(getNights()<1){showToast("กรุณาเลือกวันเช็กเอาต์หลังวันเช็กอิน");return}
 currentBooking={stay:selectedStay,checkIn:$("#checkIn").value,checkOut:$("#checkOut").value,nights:getNights(),guests:$("#guests").value};
 $("#bookingStayName").textContent=`${selectedStay.name} · ${currentBooking.nights} คืน`;
 $("#priceSummary").innerHTML=`${money(selectedStay.price)} × ${currentBooking.nights} คืน <strong style="float:right">${money(selectedStay.price*currentBooking.nights)}</strong><br>เช็กอิน ${currentBooking.checkIn} · เช็กเอาต์ ${currentBooking.checkOut}<br>ผู้เข้าพัก ${currentBooking.guests} คน`;
 $("#stayModal").close();$("#bookingForm").reset();$("#bookingModal").showModal();
}
function renderBookings(){
 const items=readBookings();const host=$("#bookingList");
 if(!items.length){host.innerHTML='<div class="no-bookings">ยังไม่มีรายการจองในเบราว์เซอร์นี้</div>';return}
 host.innerHTML=items.slice().reverse().map(b=>`<article class="booking-item"><div><h3>${escapeHTML(b.stayName)}</h3><p>${escapeHTML(b.checkIn)} ถึง ${escapeHTML(b.checkOut)} · ${b.nights} คืน · ${b.guests} คน</p><p>ผู้จอง: ${escapeHTML(b.fullName)} · ${escapeHTML(b.phone)}</p></div><div><div class="booking-code">${escapeHTML(b.code)}</div><strong>${money(b.total)}</strong></div><button class="cancel-booking" data-cancel="${escapeHTML(b.code)}">ลบรายการ</button></article>`).join("");
}
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();if(getNights()<1){showToast("วันเช็กเอาต์ต้องอยู่หลังวันเช็กอิน");return}applyFilters();$("#stays").scrollIntoView({behavior:"smooth"})});
$("#checkIn").addEventListener("change",()=>{const d=new Date($("#checkIn").value+"T00:00:00");d.setDate(d.getDate()+1);const v=new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);$("#checkOut").min=v;if($("#checkOut").value<= $("#checkIn").value)$("#checkOut").value=v});
$("#destination").addEventListener("change",applyFilters);$("#guests").addEventListener("change",applyFilters);$("#sortBy").addEventListener("change",applyFilters);
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===btn));applyFilters()}));
$("#stayGrid").addEventListener("click",e=>{const detail=e.target.closest("[data-detail]");if(detail)openStay(detail.dataset.detail);const fav=e.target.closest("[data-fav]");if(fav){fav.classList.toggle("active");fav.textContent=fav.classList.contains("active")?"♥":"♡"}});
$("#stayDetail").addEventListener("click",e=>{if(e.target.id==="startBooking")openBooking()});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
$("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();if(!currentBooking)return;
 const fd=new FormData(e.currentTarget),code="TS"+Date.now().toString().slice(-8);
 const booking={code,stayId:currentBooking.stay.id,stayName:currentBooking.stay.name,checkIn:currentBooking.checkIn,checkOut:currentBooking.checkOut,nights:currentBooking.nights,guests:currentBooking.guests,fullName:fd.get("fullName").trim(),email:fd.get("email").trim(),phone:fd.get("phone").trim(),note:fd.get("note").trim(),total:currentBooking.stay.price*currentBooking.nights,createdAt:new Date().toISOString()};
 const items=readBookings();items.push(booking);saveBookings(items);$("#bookingModal").close();$("#confirmationCode").textContent=code;$("#confirmationModal").showModal();renderBookings();
});
$("#bookingList").addEventListener("click",e=>{const b=e.target.closest("[data-cancel]");if(!b)return;const items=readBookings().filter(x=>x.code!==b.dataset.cancel);saveBookings(items);renderBookings();showToast("ลบรายการจองออกจากเครื่องนี้แล้ว")});
$("#closeConfirmation").addEventListener("click",()=>{$("#confirmationModal").close();$("#stays").scrollIntoView({behavior:"smooth"})});
$("#menuToggle").addEventListener("click",()=>$(".main-nav").classList.toggle("open"));
$(".main-nav").addEventListener("click",e=>{if(e.target.tagName==="A")$(".main-nav").classList.remove("open")});
$("#year").textContent=new Date().getFullYear();
dateDefaults();renderStays(stays);renderBookings();
