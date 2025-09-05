/* app.js
 - ضع هنا روابط الفيديو لاحقًا في مصفوفة `VIDEOS`
 - يدعم كل فيديو الحقول: id, title, category, quality ('high'|'medium'|'low'), src, isShock(boolean)
 - يحتوي وظائف: فتح/إغلاق الجانبي، فلتر فئات، فلتر جودة، عرض الفيديوهات، like/dislike محلي، block comments
*/

// ------------ عناصر الواجهة -------------
const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const categoryList = document.getElementById('categoryList');
const videosGrid = document.getElementById('videosGrid');
const sectionTitle = document.getElementById('sectionTitle');
const searchInput = document.getElementById('searchInput');

// Age Gate elements
const ageGate = document.getElementById('ageGate');
const ageAccept = document.getElementById('ageAccept');
const ageDeny = document.getElementById('ageDeny');
const birthdateInput = document.getElementById('birthdate');

// ------------ بيانات الفيديو - ضع روابطك هنا -------------
/* مثال: 
  { id:'v1', title:'عنوان', category:'funny', quality:'high', src:'https://player.vimeo.com/video/1115868172', isEmbed:true, isShock:false }
  أو لمقاطع mp4 مباشرة: { src:'https://example.com/file.mp4', isEmbed:false }
*/
const VIDEOS = [
  // ثلاث نسخ من نفس الفيديو كمثال — استبدل src بالروابط الحقيقية
  { id:'v1', title:'Old Video 1', category:'sensible', quality:'high', src:'https://player.vimeo.com/video/1115868172', isEmbed:true, isShock:false },
  { id:'v2', title:'Old Video 2', category:'sensible', quality:'medium', src:'https://player.vimeo.com/video/1115868172', isEmbed:true, isShock:false },
  { id:'v3', title:'Old Video 3', category:'sensible', quality:'low', src:'https://player.vimeo.com/video/1115868172', isEmbed:true, isShock:true }
];

// ------------ وظائف Age Gate -------------
function showAgeGate(){ ageGate.style.display='flex'; }
function hideAgeGate(){ ageGate.style.display='none'; }
if(localStorage.getItem('vg_allowed')==='1'){ hideAgeGate(); } else { showAgeGate(); }

ageAccept.addEventListener('click', ()=>{
  // تحقق اختياري من تاريخ الميلاد لو أُدخل
  const dob = birthdateInput.value;
  if(dob){
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if(age < 18){ alert('يجب أن تكون فوق 18 سنة'); return; }
  }
  localStorage.setItem('vg_allowed','1');
  hideAgeGate();
});
ageDeny.addEventListener('click', ()=>{ window.location.href = 'about:blank'; });

// ------------ فتح / غلق الناف بار -------------
menuToggle.addEventListener('click', ()=>{
  if(sideNav.classList.contains('open')) sideNav.classList.remove('open');
  else sideNav.classList.add('open');
});

// إغلاق عند النقر على نفس الزر (تم بالفعل)، ويمكن إغلاق بالخلفية إذا أردت

// ------------ فلترة التصانيف -------------
categoryList.addEventListener('click', (e)=>{
  if(!e.target || !e.target.dataset) return;
  const li = e.target;
  if(li.dataset.cat){
    // تحديد التفعيل البصري
    for(const item of categoryList.querySelectorAll('li')) item.classList.remove('active');
    li.classList.add('active');
    renderVideos(); // إعادة العرض
  }
});

// فلتر الجودة
document.querySelectorAll('input[name="sizeFilter"]').forEach(r=>{
  r.addEventListener('change', ()=> renderVideos());
});

// البحث
searchInput.addEventListener('input', ()=> renderVideos());

// ------------ Like / Dislike local storage -------------
function getVotes(id){
  try{
    const raw = localStorage.getItem('vg_votes_'+id);
    return raw ? JSON.parse(raw) : {like:0,dislike:0,blockedComments:false};
  }catch(e){ return {like:0,dislike:0,blockedComments:false}; }
}
function saveVotes(id,data){ localStorage.setItem('vg_votes_'+id, JSON.stringify(data)); }

// ------------ مساعدة لتحويل روابط Google Drive (تنبيه: قد لا تعمل دائماً للبث) -------------
function convertDriveToDirect(url){
  // إن كان رابط Google Drive, حاول استبداله بنسخة uc?export=download
  // مثال: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  try{
    if(!url.includes('drive.google.com')) return url;
    const m = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
    if(m && m[1]) return 'https://drive.google.com/uc?export=download&id='+m[1];
    return url;
  }catch(e){ return url; }
}

// ------------ عرض الفيديوهات إلى الواجهة -------------
function renderVideos(){
  videosGrid.innerHTML = '';
  // احصل الفلاتر
  const activeCat = categoryList.querySelector('li.active')?.dataset.cat || 'all';
  const sizeFilter = document.querySelector('input[name="sizeFilter"]:checked')?.value || 'all';
  const q = searchInput.value.trim().toLowerCase();

  // فلتر الفيديوز
  const visible = VIDEOS.filter(v=>{
    if(activeCat !== 'all' && v.category !== activeCat) return false;
    if(sizeFilter !== 'all' && v.quality !== sizeFilter) return false;
    if(q && !(v.title.toLowerCase().includes(q) || v.category.toLowerCase().includes(q))) return false;
    return true;
  });

  if(visible.length === 0){
    videosGrid.innerHTML = '<p style="color:var(--muted)">لا توجد فيديوهات لهذه الفلاتر.</p>';
    return;
  }

  visible.forEach(v=>{
    const card = document.createElement('div');
    card.className = 'card' + (v.isShock ? ' shock' : '');

    // video area (iframe أو video)
    const mediaWrap = document.createElement('div');
    if(v.isEmbed){
      const iframe = document.createElement('iframe');
      iframe.src = v.src;
      iframe.width = '100%';
      iframe.height = '320';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      mediaWrap.appendChild(iframe);
    } else {
      const vid = document.createElement('video');
      vid.className = 'video-el';
      vid.controls = true;
      // تحويل روابط Drive إن لزم
      vid.src = convertDriveToDirect(v.src);
      mediaWrap.appendChild(vid);
    }

    // meta
    const meta = document.createElement('div');
    meta.className = 'meta';
    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = v.title;
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = `${v.category} · ${v.quality}`;
    meta.appendChild(title);
    meta.appendChild(badge);

    // controls (like/dislike/block comments)
    const controls = document.createElement('div');
    controls.className = 'controls';
    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn';
    likeBtn.textContent = '👍 Like';
    const dislikeBtn = document.createElement('button');
    dislikeBtn.className = 'btn';
    dislikeBtn.textContent = '👎 Dislike';
    const commentToggle = document.createElement('button');
    commentToggle.className = 'btn';
    commentToggle.textContent = '🛑 Block Comments';

    // counters
    const votes = getVotes(v.id);
    const likeCount = document.createElement('span'); likeCount.className='counter'; likeCount.textContent = votes.like;
    const dislikeCount = document.createElement('span'); dislikeCount.className='counter'; dislikeCount.textContent = votes.dislike;

    likeBtn.addEventListener('click', ()=>{
      const cur = getVotes(v.id);
      cur.like = (cur.like || 0) + 1;
      saveVotes(v.id,cur);
      likeCount.textContent = cur.like;
    });
    dislikeBtn.addEventListener('click', ()=>{
      const cur = getVotes(v.id);
      cur.dislike = (cur.dislike || 0) + 1;
      saveVotes(v.id,cur);
      dislikeCount.textContent = cur.dislike;
    });
    commentToggle.addEventListener('click', ()=>{
      const cur = getVotes(v.id);
      cur.blockedComments = !cur.blockedComments;
      saveVotes(v.id,cur);
      // تحديث المظهر
      if(cur.blockedComments) commentSection.classList.add('blocked-comments');
      else commentSection.classList.remove('blocked-comments');
    });

    controls.appendChild(likeBtn);
    controls.appendChild(likeCount);
    controls.appendChild(dislikeBtn);
    controls.appendChild(dislikeCount);
    controls.appendChild(commentToggle);

    // comments section (بسيط محلي)
    const commentSection = document.createElement('div');
    commentSection.className = 'comments';
    const isBlocked = getVotes(v.id).blockedComments;
    if(isBlocked) commentSection.classList.add('blocked-comments');

    const commentForm = document.createElement('div');
    commentForm.innerHTML = '<input placeholder="أضف تعليقاً..." style="width:70%;padding:6px;border-radius:6px;border:1px solid rgba(255,255,255,0.04)"><button class="btn" style="margin-left:8px">نشر</button>';
    const commentList = document.createElement('div');
    commentList.style.marginTop = '8px';
    commentList.style.color = 'var(--muted)';
    // لا نخزن التعليقات في هذا المثال (خصوصية وبساطة)

    commentSection.appendChild(commentForm);
    commentSection.appendChild(commentList);

    // تجميع البطاقة
    card.appendChild(mediaWrap);
    card.appendChild(meta);
    card.appendChild(controls);
    card.appendChild(commentSection);

    videosGrid.appendChild(card);
  });
}

// أول عرض
renderVideos();
