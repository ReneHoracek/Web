document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  if (!title) return;

  try {
    const res = await fetch('data/cars.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const cars = await res.json();
    const car = cars.find(c => c.title === title);
    if (!car) {
      document.getElementById('detailTitle').textContent = 'Vůz nenalezen';
      return;
    }

    const img = document.getElementById('detailImg');
    if (img) {
      img.src = car.foto || 'images/uploads/placeholder.jpg';
      img.alt = car.title;
    }
    const titleEl = document.getElementById('detailTitle');
    if (titleEl) titleEl.textContent = car.title;
    const yearEl = document.getElementById('detailYear');
    if (yearEl) yearEl.textContent = car.rok;
    const fuelEl = document.getElementById('detailFuel');
    if (fuelEl) fuelEl.textContent = car.palivo;
    const mileageEl = document.getElementById('detailMileage');
    if (mileageEl) mileageEl.textContent = car.najezd + ' km';
    const gearboxEl = document.getElementById('detailGearbox');
    if (gearboxEl) gearboxEl.textContent = car.prevodovka || '–';
    const priceEl = document.getElementById('detailPrice');
    if (priceEl) {
      const priceFormatted = String(car.cena).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Kč';
      priceEl.textContent = priceFormatted;
    }
  } catch (err) {
    console.error('Chyba načítání dat vozu', err);
    const titleEl = document.getElementById('detailTitle');
    if (titleEl) titleEl.textContent = 'Chyba načítání';
  }
});
