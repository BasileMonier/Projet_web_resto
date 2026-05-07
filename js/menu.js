
    // Données (20 plats) – séparation données / affichage
    const plats = [
      { nom: "Velouté de potimarron", desc: "Crème onctueuse, éclats de noisettes", prix: 15, cat: "entrée", tags: ["végé", "sans gluten"] },
      { nom: "Tartare de saumon", desc: "Saumon frais, avocat, citron vert", prix: 20, cat: "entrée", tags: ["sans gluten"] },
      { nom: "Salade de chèvre chaud", desc: "Mesclun, toasts de chèvre, miel", prix: 14, cat: "entrée", tags: ["végé"] },
      { nom: "Oeuf mimosa rétro", desc: "Œufs mimosa, mayonnaise maison", prix: 7, cat: "entrée", tags: ["végé", "sans gluten"] },
      { nom: "Carpaccio de betterave", desc: "Betterave, roquette, parmesan", prix: 10, cat: "entrée", tags: ["végé", "sans gluten"] },
      { nom: "Suprême de volaille doré", desc: "Purée de patate douce, jus réduit aux herbes", prix: 22, cat: "plat", tags: [] },
      { nom: "Risotto aux cèpes", desc: "Risotto crémeux, champignons des bois", prix: 18, cat: "plat", tags: ["végé"] },
      { nom: "Dos de cabillaud", desc: "Écrasé de pommes de terre, beurre blanc", prix: 20, cat: "plat", tags: ["sans gluten"] },
      { nom: "Burger végétarien", desc: "Steak de lentilles, légumes grillés", prix: 16, cat: "plat", tags: ["végé"] },
      { nom: "Poulet rôti aux herbes", desc: "Pommes grenailles, jus corsé", prix: 19, cat: "plat", tags: [] },
      { nom: "Pâtes fraîches au pesto", desc: "Tagliatelles, pesto basilic, pignons", prix: 14, cat: "plat", tags: ["végé"] },
      { nom: "Magret de canard", desc: "Purée de patate douce, sauce miel-orange", prix: 24, cat: "plat", tags: [] },
      { nom: "Curry de légumes", desc: "Lait de coco, riz basmati, coriandre", prix: 15, cat: "plat", tags: ["végé", "sans gluten"] },
      { nom: "Tarte tatin", desc: "Pommes caramélisées, glace vanille", prix: 10, cat: "dessert", tags: ["végé"] },
      { nom: "Mousse au chocolat noir", desc: "Chocolat 70%, éclats de fève de cacao", prix: 9, cat: "dessert", tags: ["végé", "sans gluten"] },
      { nom: "Crème brûlée", desc: "Vanille de Madagascar, cassonade caramélisée", prix: 8, cat: "dessert", tags: ["végé"] },
      { nom: "Salade de fruits frais", desc: "Fruits de saison, sirop léger", prix: 7, cat: "dessert", tags: ["végé", "sans gluten"] },
      { nom: "Café Gourmand", desc: "Expresso et mini desserts", prix: 8, cat: "boisson", tags: [] },
      { nom: "Thé glacé maison", desc: "Infusion de fruits rouges, menthe", prix: 5, cat: "boisson", tags: ["végé", "sans gluten"] },
      { nom: "Smoothie vert", desc: "Épinard, pomme, gingembre", prix: 6, cat: "boisson", tags: ["végé", "sans gluten"] }
    ];

    let catActive = 'tout';
    const container = document.getElementById('platsContainer');
    const compteur   = document.getElementById('compteur');

    function filtrerPlats(liste, cat, vege, sansGluten) {
      return liste.filter(p => 
        (cat === 'tout' || p.cat === cat) &&
        (!vege || p.tags.includes('végé')) &&
        (!sansGluten || p.tags.includes('sans gluten'))
      );
    }

    function afficherPlats(liste) {
      container.innerHTML = '';
      liste.forEach(p => {
        const card = document.createElement('article');
        card.className = 'plat-card';
        // Génération des badges de tags
        let badges = '';
        if (p.tags.includes('végé')) badges += '<span class="plat-badge">Végé</span>';
        if (p.tags.includes('sans gluten')) badges += '<span class="plat-badge">Sans gluten</span>';
        card.innerHTML = `
             <div class="plat-img">
                 <img src="img/menu/${p.nom.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}.jpg" alt="${p.nom}" loading="lazy" onerror="this.src='img/menu/placeholder.jpg'" />
             </div>
          <div class="plat-body">
            <h3 class="plat-name">${p.nom}</h3>
            <p class="plat-desc">${p.desc}</p>
            <div class="plat-footer">
              <span class="plat-price">${p.prix} €</span>
              <div>${badges}</div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
      compteur.textContent = `${liste.length} plat(s) correspondent à votre sélection`;
    }

    function appliquerFiltres() {
      const vege = document.getElementById('filterVege').checked;
      const sansGluten = document.getElementById('filterSansGluten').checked;
      const resultats = filtrerPlats(plats, catActive, vege, sansGluten);
      afficherPlats(resultats);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        catActive = this.dataset.categorie;
        appliquerFiltres();
      });
    });

    document.getElementById('filterVege').addEventListener('change', appliquerFiltres);
    document.getElementById('filterSansGluten').addEventListener('change', appliquerFiltres);

    // Affichage initial
    afficherPlats(plats);