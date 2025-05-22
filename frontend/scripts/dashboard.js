// Najdeme elementy
const map = document.querySelector('.map');
const mapImg = document.querySelector('.map-img');

// Funkce pro nastavení zoomu na základě pozice kurzoru
map.addEventListener('mousemove', (e) => {
  const mapRect = map.getBoundingClientRect();
  const mouseX = e.clientX - mapRect.left;
  const mouseY = e.clientY - mapRect.top;

  // Změna bodu zvětšení obrázku podle pozice kurzoru
  mapImg.style.transformOrigin = `${mouseX}px ${mouseY}px`; // Nastavení bodu zvětšení
  mapImg.style.transform = 'scale(2)'; // Zvětšení obrázku
});

// Když kurzor opustí mapu, obrázek se vrátí zpět
map.addEventListener('mouseleave', () => {
  mapImg.style.transform = 'scale(1)'; // Resetuje zoom na obrázku
});
