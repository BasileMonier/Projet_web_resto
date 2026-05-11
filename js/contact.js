    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('contactFeedback').textContent = 'Merci ! Votre message a bien été envoyé.';
      this.reset();
    });