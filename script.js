// L Message（エルメ）のカレンダー予約URL。
// 管理画面 > カレンダー予約 で発行される「予約ページURL」または友だち追加URLを入れると、
// 相談ボタンからLINEの予約ページへ進めるようになります。空のままならデモ表示です。
const LME_BOOKING_URL = 'https://liff.line.me/2012228753-myMIPhvE?calendar_salon_id=33559&ts=1793043359';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'メニューを閉じる' : 'メニューを開く');
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a, button').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  navigation.classList.remove('is-open');
}));
const dialog = document.querySelector('#consult-dialog');
document.querySelectorAll('[data-consult]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#selected-plan').textContent = `ご相談内容：${button.dataset.consult}`;
  const staffNote = document.querySelector('#selected-staff');
  staffNote.hidden = !button.dataset.staff;
  staffNote.textContent = button.dataset.staff ? `予約画面で、スタッフ「${button.dataset.staff}」を選んでください。` : '';
  dialog.showModal();
}));
// 予約URLが設定されていれば、ダイアログをLINE予約への案内に切り替える
const hasBooking = /^https:\/\//.test(LME_BOOKING_URL);
dialog.querySelector('.dialog-live').hidden = !hasBooking;
dialog.querySelector('.dialog-demo').hidden = hasBooking;
if (hasBooking) {
  const link = dialog.querySelector('#lme-booking-link');
  link.href = LME_BOOKING_URL;
  link.addEventListener('click', () => dialog.close());
}
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

// スマホの料金プランスライダー：表示中のプランに合わせてドットを切り替える
const planGrid = document.querySelector('.plan-grid');
const planDots = document.querySelectorAll('.plan-dots span');
planGrid.addEventListener('scroll', () => {
  const plans = [...planGrid.children];
  const center = planGrid.scrollLeft + planGrid.clientWidth / 2;
  const current = plans.reduce((best, plan, i) => Math.abs(plan.offsetLeft + plan.offsetWidth / 2 - center) < Math.abs(plans[best].offsetLeft + plans[best].offsetWidth / 2 - center) ? i : best, 0);
  planDots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
}, { passive: true });

// スクロールで要素がふわっと現れるフェードイン
const revealTargets = document.querySelectorAll('.price-intro, .section-heading, .worry-grid>p, .intro-answer, .service-card, .staff-card, .plan, .steps li, .questions details, .contact');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  revealTargets.forEach(el => {
    // 同じ並びのカードは少しずつ遅らせて順番に表示
    const siblings = [...el.parentElement.children].filter(child => child.matches(el.tagName.toLowerCase()));
    el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 4) * 90}ms`);
    el.classList.add('reveal');
  });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
}
