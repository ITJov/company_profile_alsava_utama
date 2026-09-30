// ===== WhatsApp direct link =====
// Ganti nomor di bawah ini dengan nomor WhatsApp asli CV Alsava Utama.
// Format: kode negara tanpa "+" dan tanpa spasi/strip. Contoh nomor 0812-3456-7890 -> "6281234567890"
const WA_NUMBER = "6281321411333"; // TODO: ganti dengan nomor WA asli
const WA_MESSAGE = "Halo Alsava Utama, saya ingin konsultasi...";

const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
document.querySelectorAll('.wa-link').forEach(el => { el.href = waLink; });

// ===== Menu mobile & header =====
const hdr = document.getElementById('hdr');
const mmenu = document.getElementById('mmenu');
document.getElementById('burger').addEventListener('click', () => mmenu.classList.toggle('open'));
mmenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mmenu.classList.remove('open')));
window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 40), { passive: true });

// ===== Reveal saat scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// ===== Slider produk (geser ke kanan) =====
const track = document.getElementById('track');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const prog = document.getElementById('prog');

const step = () => (track.querySelector('.card')?.offsetWidth || 300) + 20;

function update() {
  const max = track.scrollWidth - track.clientWidth;
  prev.disabled = track.scrollLeft <= 4;
  next.disabled = track.scrollLeft >= max - 4;
  const visible = track.clientWidth / track.scrollWidth;
  const pos = max > 0 ? track.scrollLeft / max : 0;
  prog.style.width = (visible * 100) + '%';
  prog.style.marginLeft = (pos * (100 - visible * 100)) + '%';
}
prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
track.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();

// Drag dengan mouse (di HP otomatis pakai swipe)
let down = false, startX = 0, startLeft = 0;
track.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;
  down = true; startX = e.clientX; startLeft = track.scrollLeft; track.classList.add('drag');
});
window.addEventListener('pointermove', e => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); });
window.addEventListener('pointerup', () => { down = false; track.classList.remove('drag'); });