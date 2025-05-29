// 🌍 Zoom efekt na mapu
const map = document.querySelector('.map-window');
const mapImg = document.querySelector('.map-img');

map.addEventListener('mousemove', (e) => {
  const mapRect = map.getBoundingClientRect();
  const mouseX = e.clientX - mapRect.left;
  const mouseY = e.clientY - mapRect.top;
  mapImg.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  mapImg.style.transform = 'scale(2)';
});

map.addEventListener('mouseleave', () => {
  mapImg.style.transform = 'scale(1)';
});

// 🧾 Modal – otevření a zavření
const modal = document.getElementById('add-run-modal');
const openBtn = document.querySelector('.add-new-run');
const closeBtn = document.querySelector('.close-button');

openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// 🔐 Token z localStorage
const token = localStorage.getItem('token');

// 📊 Načti statistiky
fetch('https://tvuj-backend.onrender.com/api/runs/stats', {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(data => {
    document.querySelector('.stat-distance').textContent = `${data.totalDistance} km`;
    document.querySelector('.stat-time').textContent = `${data.totalTime} h`;
    document.querySelector('.stat-runs').textContent = data.totalRuns;
  });

// 🏃‍♂️ Načti moje top běhy
fetch('https://tvuj-backend.onrender.com/api/runs/my-top', {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(runs => {
    const table = document.querySelector('.my-top-runs tbody');
    table.innerHTML = '';
for (let i = 0; i < 5; i++) {
  const row = document.createElement('tr');

  // Přidání třídy podle pořadí
  if (i === 0) row.classList.add('gold');
  else if (i === 1) row.classList.add('silver');
  else if (i === 2) row.classList.add('bronze');

  if (runs[i]) {
    row.innerHTML = `
      <td>${i + 1}.</td>
      <td>${runs[i].run_date}</td>
      <td>${runs[i].run_time}</td>
      <td>${parseFloat(runs[i].distance_km).toFixed(2)} km</td>
    `;
  } else {
    row.innerHTML = `
      <td>${i + 1}.</td>
      <td>-----</td>
      <td>-----</td>
      <td>-----</td>
    `;
  }

  table.appendChild(row);
}


  });

// ➕ Přidání běhu
const submitBtn = document.getElementById('submit-run');

submitBtn.addEventListener('click', async () => {
  const distance_km = document.getElementById('distance').value;
  const run_time = document.getElementById('run-time').value;
  const run_date = document.getElementById('run-date').value;
  const route_image = document.getElementById('image-url').value;

  try {
    const res = await fetch('https://tvuj-backend.onrender.com/api/runs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ distance_km, run_time, run_date, route_image })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Běh uložen!');
      modal.classList.add('hidden');
      location.reload();
    } else {
      alert(data.error || 'Chyba při ukládání běhu');
    }
  } catch (err) {
    alert('Chyba spojení se serverem');
  }
});

// 🥇 Načti top běžce
fetch('https://tvuj-backend.onrender.com/api/runs/top', {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => res.json())
  .then(runners => {
    const table = document.querySelector('.leaderboard-table'); // tabulka s top běžci
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const row = document.createElement('tr');

      if (i === 0) row.classList.add('gold');
      else if (i === 1) row.classList.add('silver');
      else if (i === 2) row.classList.add('bronze');

      if (runners[i]) {
        row.innerHTML = `
          <td>${i + 1}.</td>
          <td>${runners[i].username}</td>
          <td>${runners[i].runs_count}</td>
          <td>${parseFloat(runners[i].total_distance).toFixed(2)} km</td>
        `;
      } else {
        row.innerHTML = `
          <td>${i + 1}.</td>
          <td>-----</td>
          <td>-----</td>
          <td>-----</td>
        `;
      }

      tbody.appendChild(row);
    }
  })
  .catch(err => console.error('❌ Chyba při načítání top běžců:', err));

