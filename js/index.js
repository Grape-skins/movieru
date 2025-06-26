// 封装：获取 DOM 元素
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// ===== 移动端菜单功能 =====
const mobileMenu = $('#mobileMenu');
const navMenu = $('#navMenu');
const navLinks = $$('#navMenu a');

mobileMenu.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== 标签页切换功能 =====
const tabButtons = $$('.tab-button');
const tabContents = $$('.tab-content'); // 可选：如果有对应内容区域

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 按钮高亮
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // 可选：标签内容联动
    const target = button.dataset.tab;
    tabContents.forEach(content => {
      content.style.display = content.id === target ? 'block' : 'none';
    });
  });
});

// ===== 平滑滚动 =====
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== 滚动时头部样式变化 =====
function updateHeaderOnScroll() {
  const header = $('.header');
  const isScrolled = window.scrollY > 100;
  Object.assign(header.style, {
    background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'none',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
  });
}

window.addEventListener('scroll', updateHeaderOnScroll);

// ===== 红点指示逻辑（初始+点击） =====
const navLis = $$('#navMenu li');
const navDivs = $$('#navMenu li div');

navLis.forEach((li, index) => {
  if (index === 0) {
    li.querySelector('div')?.classList.add('redBox');
  }

  li.addEventListener('click', () => {
    navDivs.forEach(div => div.classList.remove('redBox'));
    li.querySelector('div')?.classList.add('redBox');
  });
});

// ===== 滚动同步红点高亮导航项 =====
const sectionIds = ['home', 'pricing', 'courses', 'interview', 'company'];

function getCurrentSection() {
  let current = sectionIds[0];
  for (let id of sectionIds) {
    const section = document.getElementById(id);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 100) {
        current = id;
      }
    }
  }
  return current;
}

window.addEventListener('scroll', () => {
  const currentSection = getCurrentSection();
  navLis.forEach((li, idx) => {
    const div = li.querySelector('div');
    div?.classList.toggle('redBox', sectionIds[idx] === currentSection);
  });
});
