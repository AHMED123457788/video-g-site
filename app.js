// بيانات الفيديوهات (قابل للتعديل لاحقاً)
const videos = [
  {
    id: 'demo1',
    title: 'فيديو تجريبي: مشهد عام (mp4)',
    desc: 'فيديو تجريبي لعرض المشغّل',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumb: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
  }
];

// Age Gate
const ageGate = document.getElementById('ageGate');
const allowBtn = document.getElementById('allowBtn');
const denyBtn = document.getElementById('denyBtn');

function hideAgeGate(){ if(ageGate) ageGate.style.display = 'none'; }
function showAgeGate(){ if(ageGate) ageGate.style.display = 'flex'; }

if (allowBtn) allowBtn.addEventListener('click', ()=>{
  try{localStorage.setItem('vg_allowed','1')}catch(e){}
  hideAgeGate();
});
if (denyBtn) denyBtn.addEventListener('click', ()=>{
  window.location.href = 'https://www.google.com';
});

try{
  if(localStorage.getItem('vg_allowed') === '1') hideAgeGate();
  else showAgeGate();
}catch(e){ showAgeGate(); }

// الصفحة الرئيسية
function renderGrid(){
  const grid = document.getElementById('videosGrid');
  if(!grid) return;
  grid.innerHTML = '';
  videos.forEach(v =>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <a href="/watch.html?id=${v.id}">
        <img class="thumb" src="${v.thumb}" alt="${v.title}" />
      </a>
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    `;
    grid.appendChild(el);
  });
}

// صفحة المشاهدة
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
function renderWatch(){
  const id = getQueryParam('id');
  if(!id) return;
  const v = videos.find(x=>x.id===id);
  const area = document.getElementById('videoArea');
  const meta = document.getElementById('videoMeta');
  if(!v || !area) return;
  area.innerHTML = `
    <div class="card">
      <video class="player" controls playsinline src="${v.src}"></video>
    </div>
  `;
  meta.innerHTML = `<h2>${v.title}</h2><p>${v.desc}</p>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderGrid();
  renderWatch();
});