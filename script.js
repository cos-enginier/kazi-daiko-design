// L Message（エルメ）のカレンダー予約URL。
// 管理画面 > カレンダー予約 で発行される「予約ページURL」または友だち追加URLを入れると、
// 相談ボタンからLINEの予約ページへ進めるようになります。空のままならデモ表示です。
const LME_BOOKING_URL = 'https://liff.line.me/2012228753-myMIPhvE?calendar_salon_id=33559&ts=1793043359';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a, button').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}));
const dialog = document.querySelector('#consult-dialog');
document.querySelectorAll('[data-consult]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#selected-plan').textContent = `ご相談内容：${button.dataset.consult}`;
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
