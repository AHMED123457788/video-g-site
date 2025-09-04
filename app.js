// Video Data
const videos = [
   
  {
    title: "News Video",
    src: "https://1024terabox.com/s/18m0AryDlxlGFFWXBY5m-Zg"
  }
  
  ,
  {
    id: 'vid2',
    title: 'New Video 2',
    desc: 'الفيديو الثاني',
    src: 'https://drive.google.com/file/d/1FAsokB11cSc4Fk6b4fVSSZOv2fbZxlkR/view?usp=sharing'
  },
  {
    id: 'vid3',
    title: 'New Video 2',
    desc: 'الفيديو الثاني',
    src: 'https://artlist.io/stock-footage/clip/man-fisherman-hut-lying-down/6525088'
  }
  
];

// Age Gate
const ageGate = document.getElementById('ageGate');
const allowBtn = document.getElementById('allowBtn');
const denyBtn = document.getElementById('denyBtn');
const birthdateInput = document.getElementById('birthdate');

function hideAgeGate(){ ageGate.style.display='none'; }
function showAgeGate(){ ageGate.style.display='flex'; }

if(localStorage.getItem('vg_allowed')==='1'){ hideAgeGate(); }
else{ showAgeGate(); }

allowBtn.addEventListener('click', ()=>{
  const dob = birthdateInput.value;
  if(!dob){ alert('يرجى إدخال تاريخ الميلاد'); return; }
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if(age<18){ alert('عذراً! يجب أن يكون عمرك 18 سنة أو أكثر'); return; }
  localStorage.setItem('vg_allowed','1');
  hideAgeGate();
});

denyBtn.addEventListener('click', ()=>{ window.location.href='https://www.google.com'; });

// Render Videos
function renderVideos(){
  const grid = document.getElementById('videosGrid');
  grid.innerHTML = '';
  videos.forEach(v=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <video controls src="${v.src}"></video>
      <h3>${v.title}</h3>
      <p>${v.desc}</p>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderVideos);
