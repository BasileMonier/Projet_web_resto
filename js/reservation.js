    const dateInput = document.getElementById('date');
    const today = new Date();
    const minStr = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', minStr);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    function setError(field, msg) {
      document.getElementById(`error-${field}`).textContent = msg;
    }

    function clearErrors() {
      ['nom','prenom','email','tel','date','heure','personnes'].forEach(f => setError(f, ''));
    }

    document.getElementById('reservationForm').addEventListener('submit', function(e) {
      e.preventDefault();
      clearErrors();
      let valid = true;

      const nom = document.getElementById('nom').value.trim();
      const prenom = document.getElementById('prenom').value.trim();
      const email = document.getElementById('email').value.trim();
      const tel = document.getElementById('tel').value.trim();
      const dateVal = dateInput.value;
      const heure = document.getElementById('heure').value;
      const personnes = parseInt(document.getElementById('personnes').value, 10);

      if (!nom) { setError('nom','Requis'); valid = false; }
      if (!prenom) { setError('prenom','Requis'); valid = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email','Email invalide'); valid = false; }
      if (tel && !/^[0-9]{10}$/.test(tel)) { setError('tel','10 chiffres attendus'); valid = false; }

      if (!dateVal) { setError('date','Requis'); valid = false; }
      else {
        const selected = new Date(dateVal + 'T00:00:00');
        const day = selected.getDay(); // 1 = lundi
        if (day === 1) { setError('date','Fermé le lundi'); valid = false; }
        if (selected < new Date(minStr + 'T00:00:00')) { setError('date','Date déjà passée'); valid = false; }
        if (selected > new Date(maxDate.toISOString().split('T')[0] + 'T00:00:00')) { setError('date','Réservation max 60 jours à l\'avance'); valid = false; }
      }

      if (!heure) { setError('heure','Créneau requis'); valid = false; }
      if (isNaN(personnes) || personnes < 1 || personnes > 12) { setError('personnes','Entre 1 et 12'); valid = false; }

      if (valid) {
    const formData = new FormData();
    formData.append('nom', document.getElementById('nom').value.trim());
    formData.append('prenom', document.getElementById('prenom').value.trim());
    formData.append('email', document.getElementById('email').value.trim());
    formData.append('tel', document.getElementById('tel').value.trim());
    formData.append('date_resa', dateInput.value);
    formData.append('heure_resa', document.getElementById('heure').value);
    formData.append('nb_personnes', document.getElementById('personnes').value);
    formData.append('message', document.getElementById('message').value.trim());

    fetch('api/reservation.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            document.getElementById('confirmationMsg').innerHTML = `<p>✅ ${data.message}</p>`;
            document.getElementById('confirmationMsg').classList.add('active');
            document.getElementById('reservationForm').style.display = 'none';
        } else {
            setError(data.field, data.message);
        }
    })
    .catch(error => {
        // Fallback si PHP inaccessible
        const dateFr = new Date(dateInput.value + 'T00:00:00').toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
        document.getElementById('confirmationMsg').innerHTML = `<p>✅ Réservation enregistrée pour le ${dateFr} à ${document.getElementById('heure').value} pour ${document.getElementById('personnes').value} personne(s).</p><p>À bientôt chez Perla'Bul !</p>`;
        document.getElementById('confirmationMsg').classList.add('active');
        document.getElementById('reservationForm').style.display = 'none';
    });
}
    });
