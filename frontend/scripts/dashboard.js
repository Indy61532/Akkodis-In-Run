// Najdeme elementy
const map = document.querySelector('.map-window');
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

const modal = document.getElementById('add-run-modal');
const openBtn = document.querySelector('.add-new-run');
const closeBtn = document.querySelector('.close-button');
const submitBtn = document.getElementById('submit-run');

// Otevření modalu
openBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Zavření modalu
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Odeslání běhu
submitBtn.addEventListener('click', async () => {
  const distance = document.getElementById('distance').value;
  const runTime = document.getElementById('run-time').value;
  const runDate = document.getElementById('run-date').value;
  const imageUrl = document.getElementById('image-url').value;

  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token); // potřebuješ funkci na dekódování nebo backend endpoint

  const response = await fetch('http://localhost:3000/api/runs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: userId,
      distance_km: parseFloat(distance),
      run_time: runTime,
      run_date: runDate,
      route_image: imageUrl
    })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Běh přidán!');
    modal.classList.add('hidden');
    location.reload();
  } else {
    alert(data.error || 'Chyba při ukládání běhu');
  }
});

// (Volitelné) Funkce na dekódování tokenu bez backendu:
function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
}
