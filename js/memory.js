// Memory wall functionality

let memoryPosts = [];

function loadMemoryPosts() {
  try {
    const stored = localStorage.getItem('memoryPosts');
    memoryPosts = stored ? JSON.parse(stored) : [];
  } catch (e) {
    memoryPosts = [];
  }
}

function saveMemoryPosts() {
  localStorage.setItem('memoryPosts', JSON.stringify(memoryPosts));
}

function renderMemoryPosts(filter = '') {
  const container = document.getElementById('memoryPostsContainer');
  if (!container) return;
  container.innerHTML = '';
  const lang = document.body.getAttribute('data-lang') || 'vi';
  let postsToShow = memoryPosts;
  if (filter) {
    const f = filter.toLowerCase();
    postsToShow = memoryPosts.filter(p => p.content.toLowerCase().includes(f) || (p.name && p.name.toLowerCase().includes(f)));
  }
  // show newest first
  postsToShow = postsToShow.slice().reverse();
  postsToShow.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'memory-post';
    const name = post.name ? `<strong>${post.name}</strong>` : (lang === 'vi' ? '<em>Ẩn danh</em>' : '<em>Anonymous</em>');
    const meta = `<div class="meta">${name} · ${new Date(post.date).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}</div>`;
    const content = `<div class="content">${post.content.replace(/\n/g, '<br>')}</div>`;
    const imagePart = post.image ? `<img src="${post.image}" alt="memory image">` : '';
    const likeLabel = lang === 'vi' ? 'Thích' : 'Like';
    const actions = `<div class="actions"><button onclick="likeMemoryPost('${post.id}')">❤️ ${post.likes}</button></div>`;
    postDiv.innerHTML = meta + content + imagePart + actions;
    container.appendChild(postDiv);
  });
}

function handleMemorySubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('memoryName');
  const contentInput = document.getElementById('memoryContent');
  const imageInput = document.getElementById('memoryImage');
  const name = nameInput.value.trim();
  const content = contentInput.value.trim();
  const image = imageInput.value.trim();
  if (!content) return;
  const post = {
    id: Date.now().toString(),
    name: name || null,
    content: content,
    image: image || null,
    likes: 0,
    date: new Date().toISOString(),
  };
  memoryPosts.push(post);
  saveMemoryPosts();
  // reset form
  nameInput.value = '';
  contentInput.value = '';
  imageInput.value = '';
  renderMemoryPosts();
}

function likeMemoryPost(id) {
  const post = memoryPosts.find(p => p.id === id);
  if (post) {
    post.likes += 1;
    saveMemoryPosts();
    renderMemoryPosts();
  }
}

function handleMemorySearch(event) {
  const query = event.target.value;
  renderMemoryPosts(query);
}

document.addEventListener('DOMContentLoaded', function () {
  // Only run on memory page
  if (!document.getElementById('memoryPostsContainer')) return;
  loadMemoryPosts();
  renderMemoryPosts();
  const form = document.getElementById('memoryForm');
  if (form) form.addEventListener('submit', handleMemorySubmit);
  const search = document.getElementById('memorySearch');
  if (search) search.addEventListener('input', handleMemorySearch);
});