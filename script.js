// ============================================
// ÉCOLE DE SURF - SCRIPT FONCTIONNEL
// ============================================

// Tableau pour stocker toutes les réservations
var reservations = [];

// Prix en Dirhams Marocains
function calculerPrix(nombrePersonnes, typeCours) {
    var prixParPersonne = 0;
    
    if (typeCours === "débutant") {
        prixParPersonne = 1000;  // 1,000 DH
    } else if (typeCours === "intermédiaire") {
        prixParPersonne = 1500;  // 1,500 DH
    } else if (typeCours === "prive") {
        prixParPersonne = 3000;  // 3,000 DH
    }
    
    return prixParPersonne * nombrePersonnes;
}

// Fonction pour valider la réservation
function validerReservation() {
    console.log("Fonction validerReservation appelée !");
    
    // Récupérer les valeurs du formulaire
    var nom = document.getElementById('clientName').value;
    var email = document.getElementById('clientEmail').value;
    var cours = document.getElementById('courseType').value;
    var date = document.getElementById('courseDate').value;
    var personnes = parseInt(document.getElementById('participants').value);
    
    // Vérifier que tous les champs sont remplis
    if (!nom || !email || !cours || !date || !personnes) {
        alert("❌ Veuillez remplir tous les champs !");
        return;
    }
    
    // Calculer le prix
    var prixTotal = calculerPrix(personnes, cours);
    
    // Créer l'objet réservation
    var nouvelleReservation = {
        nom: nom,
        email: email,
        cours: cours,
        date: date,
        personnes: personnes,
        prix: prixTotal,
        dateReservation: new Date().toLocaleString('fr-MA')
    };
    
    // Ajouter au tableau
    reservations.push(nouvelleReservation);
    console.log("✅ Réservation ajoutée :", nouvelleReservation);
    
    // Afficher la confirmation
    afficherConfirmation(nouvelleReservation);
    
    // Mettre à jour l'affichage
    afficherDerniereReservation();
    
    // Mettre à jour les statistiques
    mettreAJourStatistiques();
    
    // Réinitialiser le formulaire
    document.getElementById('reservationForm').reset();
    
    // Mettre à jour l'estimation du prix
    mettreAJourEstimationPrix();
}

// Afficher la confirmation
function afficherConfirmation(reservation) {
    var messageDiv = document.getElementById('confirmationMessage');
    var detailsDiv = document.getElementById('reservationDetails');
    var prixDiv = document.getElementById('totalPrice');
    
    // Formater la date
    var dateFormatee = new Date(reservation.date).toLocaleDateString('fr-MA');
    
    // Afficher les détails
    detailsDiv.innerHTML = `
        <div class="details-reservation">
            <p><strong>Nom :</strong> ${reservation.nom}</p>
            <p><strong>Email :</strong> ${reservation.email}</p>
            <p><strong>Cours :</strong> ${reservation.cours}</p>
            <p><strong>Date :</strong> ${dateFormatee}</p>
            <p><strong>Personnes :</strong> ${reservation.personnes}</p>
            <p><strong>Référence :</strong> SURF-${Date.now()}</p>
        </div>
    `;
    
    // Afficher le prix
    prixDiv.innerHTML = `
        <h3>💰 Prix total : ${reservation.prix.toLocaleString()} DH</h3>
    `;
    
    // Afficher le message
    messageDiv.style.display = 'flex';
}

// Fermer le message de confirmation
function closeConfirmation() {
    document.getElementById('confirmationMessage').style.display = 'none';
}

// Afficher la dernière réservation
function afficherDerniereReservation() {
    if (reservations.length === 0) return;
    
    var derniere = reservations[reservations.length - 1];
    var listeDiv = document.getElementById('bookingsList');
    var dateFormatee = new Date(derniere.date).toLocaleDateString('fr-MA');
    
    listeDiv.innerHTML = `
        <div class="reservation-recente">
            <h4>📌 Dernière réservation</h4>
            <div class="details-reservation">
                <p><strong>${derniere.nom}</strong></p>
                <p>Cours : ${derniere.cours}</p>
                <p>Date : ${dateFormatee}</p>
                <p>Personnes : ${derniere.personnes}</p>
                <p class="prix-total">${derniere.prix.toLocaleString()} DH</p>
                <p class="heure-reservation">Réservé le : ${derniere.dateReservation}</p>
            </div>
        </div>
    `;
}

// Afficher toutes les réservations
function showAllBookings() {
    var listeDiv = document.getElementById('bookingsList');
    
    if (reservations.length === 0) {
        listeDiv.innerHTML = "<p class='no-bookings'>Aucune réservation pour le moment.</p>";
        return;
    }
    
    var html = "<h3>📋 Toutes mes réservations</h3>";
    var totalPrix = 0;
    
    for (var i = 0; i < reservations.length; i++) {
        var res = reservations[i];
        totalPrix += res.prix;
        var dateFormatee = new Date(res.date).toLocaleDateString('fr-MA');
        
        html += `
            <div class="reservation-complete">
                <div class="reservation-header">
                    <span class="numero-reservation">#${i + 1}</span>
                    <span class="statut-reservation">Confirmée</span>
                </div>
                <div class="reservation-details">
                    <p><strong>${res.nom}</strong> (${res.email})</p>
                    <p>Cours : ${res.cours} | Date : ${dateFormatee}</p>
                    <p>Personnes : ${res.personnes} | Prix : ${res.prix.toLocaleString()} DH</p>
                    <p class="date-reservation">Réservé le : ${res.dateReservation}</p>
                </div>
            </div>
        `;
    }
    
    html += `
        <div class="resume-total">
            <p><strong>Total des réservations :</strong> ${reservations.length}</p>
            <p><strong>Montant total :</strong> ${totalPrix.toLocaleString()} DH</p>
        </div>
    `;
    
    listeDiv.innerHTML = html;
}

// Exporter les réservations
function exportBookings() {
    if (reservations.length === 0) {
        alert("📭 Aucune réservation à exporter !");
        return;
    }
    
    var contenu = "=== MES RÉSERVATIONS DE SURF ===\n\n";
    
    reservations.forEach(function(res, index) {
        contenu += `Réservation #${index + 1}\n`;
        contenu += `Nom: ${res.nom}\n`;
        contenu += `Email: ${res.email}\n`;
        contenu += `Cours: ${res.cours}\n`;
        contenu += `Date: ${res.date}\n`;
        contenu += `Personnes: ${res.personnes}\n`;
        contenu += `Prix: ${res.prix} DH\n`;
        contenu += `Date de réservation: ${res.dateReservation}\n`;
        contenu += "─".repeat(40) + "\n\n";
    });
    
    var revenuTotal = reservations.reduce(function(total, res) {
        return total + res.prix;
    }, 0);
    
    contenu += `\n📊 RÉSUMÉ\n`;
    contenu += `Nombre de réservations: ${reservations.length}\n`;
    contenu += `Revenu total: ${revenuTotal} DH\n`;
    
    // Créer et télécharger le fichier
    var blob = new Blob([contenu], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'reservations-surf.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert(`✅ Fichier exporté avec ${reservations.length} réservation(s)`);
}

// Mettre à jour l'estimation du prix
function mettreAJourEstimationPrix() {
    var cours = document.getElementById('courseType').value;
    var personnes = parseInt(document.getElementById('participants').value) || 1;
    
    if (cours) {
        var prix = calculerPrix(personnes, cours);
        document.getElementById('priceEstimation').innerHTML = 
            `<span class="prix-estime">${prix.toLocaleString()} DH</span> pour ${personnes} personne(s)`;
    } else {
        document.getElementById('priceEstimation').textContent = 
            "Sélectionnez un cours pour voir le prix";
    }
}

// Mettre à jour les statistiques
function mettreAJourStatistiques() {
    var totalReservations = reservations.length;
    var revenuTotal = reservations.reduce(function(total, res) {
        return total + res.prix;
    }, 0);
    
    document.getElementById('totalBookings').textContent = totalReservations;
    document.getElementById('totalAmount').textContent = revenuTotal.toLocaleString() + " DH";
}

// Sélectionner un cours (pour les boutons dans la section tarifs)
function selectCourse(typeCours) {
    document.getElementById('courseType').value = typeCours;
    mettreAJourEstimationPrix();
    
    // Faire défiler jusqu'au formulaire
    document.getElementById('reservationForm').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    alert(`✅ Cours ${typeCours} sélectionné !`);
}

// Sauvegarder dans le stockage local
function sauvegarderLocalement() {
    localStorage.setItem('reservationsSurf', JSON.stringify(reservations));
    console.log("💾 Réservations sauvegardées localement");
}

// Charger depuis le stockage local
function chargerReservations() {
    var donneesSauvegardees = localStorage.getItem('reservationsSurf');
    if (donneesSauvegardees) {
        try {
            reservations = JSON.parse(donneesSauvegardees);
            mettreAJourStatistiques();
            if (reservations.length > 0) {
                afficherDerniereReservation();
            }
            console.log(`📂 ${reservations.length} réservation(s) chargée(s)`);
        } catch (e) {
            console.log("Aucune donnée sauvegardée");
        }
    }
}

// Initialisation quand la page est chargée
window.onload = function() {
    console.log("✅ Page chargée - JavaScript fonctionnel");
    
    // Configurer la date minimale (aujourd'hui)
    var aujourdhui = new Date();
    var dateMin = aujourdhui.toISOString().split('T')[0];
    
    var dateInput = document.getElementById('courseDate');
    if (dateInput) {
        dateInput.min = dateMin;
    }
    
    // Ajouter les écouteurs d'événements
    var selectCours = document.getElementById('courseType');
    var inputPersonnes = document.getElementById('participants');
    
    if (selectCours) {
        selectCours.addEventListener('change', mettreAJourEstimationPrix);
    }
    
    if (inputPersonnes) {
        inputPersonnes.addEventListener('input', mettreAJourEstimationPrix);
    }
    
    // Charger les réservations sauvegardées
    chargerReservations();
    
    // Initialiser l'estimation du prix
    mettreAJourEstimationPrix();
    
    // Message de bienvenue dans la console
    console.log("🏄 Bienvenue à l'École de Surf Marocaine !");
    console.log("💰 Prix en Dirhams Marocains : 1,000 DH | 1,500 DH | 3,000 DH");
    
    // Tester que les fonctions existent
    console.log("Fonctions disponibles :");
    console.log("- validerReservation()");
    console.log("- showAllBookings()");
    console.log("- exportBookings()");
    console.log("- closeConfirmation()");
};

// Ajouter un gestionnaire pour sauvegarder avant de quitter
window.addEventListener('beforeunload', function() {
    sauvegarderLocalement();
});