/**
 * script.js - Scripts communs à toutes les pages du portfolio
 * 
 * Ce fichier contient l'ensemble des fonctionnalités JavaScript partagées
 * entre les différentes pages du site portfolio.
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation d'apparition des éléments au scroll
    animateOnScroll();
    
    // Gestion du menu mobile
    setupMobileMenu();
    
    // Année dynamique pour le copyright
    updateCopyright();
    
    // Ajouter des classes actives aux liens de navigation
    highlightActiveNavLink();
    
    // Effet de parallaxe pour les en-têtes de page
    setupParallaxEffect();
});

/**
 * Gère l'animation des éléments au défilement de la page
 */
function animateOnScroll() {
    // Sélectionner tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.projet-card, .info-card, .methode-card, .competence-card, .sujet-card, .article-card');
    
    // Options pour l'Intersection Observer
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de l'élément visible
    };
    
    // Créer l'observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe pour animer
                entry.target.classList.add('fade-in');
                // Ne plus observer cet élément
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observer chaque élément
    elementsToAnimate.forEach(element => {
        // Retirer la classe si elle existe déjà (pour éviter les animations au chargement)
        element.classList.remove('fade-in');
        // Observer l'élément
        observer.observe(element);
    });
}

/**
 * Configure le menu mobile avec interaction
 */
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    
    // Si les éléments existent
    if (menuToggle && menuIcon && menu) {
        // Événement pour fermer le menu en cliquant sur un lien
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.checked = false;
            });
        });
        
        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => {
            // Si le menu est ouvert et que le clic n'est pas sur le menu ou l'icône
            if (menuToggle.checked && !menu.contains(e.target) && !menuIcon.contains(e.target)) {
                menuToggle.checked = false;
            }
        });
    }
}

/**
 * Met à jour l'année du copyright dans le pied de page
 */
function updateCopyright() {
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/\d{4}/, currentYear);
    }
}

/**
 * Met en évidence le lien de navigation actif
 */
function highlightActiveNavLink() {
    // Obtenir le chemin de la page actuelle
    const currentPath = window.location.pathname;
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('nav .menu li a');
    
    // Parcourir les liens
    navLinks.forEach(link => {
        // Obtenir le chemin du lien
        const linkPath = link.getAttribute('href');
        
        // Vérifier si le chemin de la page correspond au lien
        if (currentPath.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentPath === '/' && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
}

/**
 * Ajoute un effet de parallaxe aux en-têtes de page
 */
function setupParallaxEffect() {
    const pageHeader = document.querySelector('.page-header');
    
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            // Calculer le décalage en fonction du scroll
            const offset = window.pageYOffset;
            const parallaxOffset = offset * 0.4;
            
            // Appliquer la transformation
            pageHeader.style.backgroundPositionY = `-${parallaxOffset}px`;
        });
    }
}

/**
 * Validation du formulaire de contact
 * @param {HTMLFormElement} form - Le formulaire à valider
 * @returns {boolean} - Indique si le formulaire est valide
 */
function validateContactForm(form) {
    // Sélectionner tous les champs requis
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Vérifier chaque champ
    requiredFields.forEach(field => {
        // Réinitialiser les styles d'erreur
        field.style.borderColor = '';
        
        // Vérifier si le champ est vide
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        }
        
        // Vérification spécifique pour l'email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.style.borderColor = 'red';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

/**
 * Ajoute des effets visuels aux boutons
 */
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Effet de pulse au survol
        button.addEventListener('mouseenter', () => {
            button.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('pulse');
        });
        
        // Effet au clic
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300);
        });
    });
}

// Exécuter le setup des boutons au chargement
document.addEventListener('DOMContentLoaded', setupButtonEffects);