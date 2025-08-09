const STORE_KEY = 'regen_memories_v1';

function loadPosts(){
  try{
    return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
  }catch(e){ return []; }
}
function savePosts(posts){
  localStorage.setItem(STORE_KEY, JSON.stringify(posts));
}
function renderPosts(){
  const list = document.getElementById('memList');
  const posts = loadPosts().sort((a,b)=>b.ts-a.ts);
  list.innerHTML='';
  if(posts.length===0){
    const p = document.createElement('p');
    p.textContent = document.querySelector('[data-i18n="mem.empty"]').textContent || 'No posts yet.';
    list.appendChild(p);
    return;
  }
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className='post';
    el.setAttribute('data-searchable','');
    const when = new Date(p.ts).toLocaleString();
    const author = p.anon ? 'Anonymous' : (p.name || 'Anonymous');
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:.6rem;flex-wrap:wrap">
        <h4>${author}</h4>
        <span class="tag">${when}</span>
      </div>
      <p>${(p.content||'').replace(/</g,'&lt;')}</p>
      ${p.image? `<img src="${p.image}" alt="image" loading="lazy" style="max-width:100%;border-radius:10px;border:1px solid rgba(148,163,184,.2)"/>` : ''}
      <div style="margin-top:.5rem;display:flex;gap:.5rem;flex-wrap:wrap">
        <button class="btn ghost" onclick="deletePost('${p.id}')">Xóa</button>
      </div>
    `;
    list.appendChild(el);
  });
}
function deletePost(id){
  const posts = loadPosts().filter(p=>p.id!==id);
  savePosts(posts);
  renderPosts();
}
function uid(){ return Math.random().toString(36).slice(2)+Date.now().toString(36); }

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('memForm');
  renderPosts();
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const post = {
      id: uid(),
      name: data.get('name') || '',
      anon: data.get('anon') === 'on',
      content: data.get('content') || '',
      image: data.get('image') || '',
      ts: Date.now()
    };
    const posts = loadPosts();
    posts.push(post);
    savePosts(posts);
    form.reset();
    renderPosts();
  });
});
