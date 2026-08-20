/* ============================================================
   PORTFOLIO — FATOU SECK FAYE
   JAVASCRIPT PRINCIPAL
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================

   IMPORTANT :
   Les deux éléments ci-dessous sont les seules informations
   que vous devez normalement modifier dans ce fichier.

   1. Votre adresse email
   2. Les intitulés qui apparaissent dans l'animation
      "machine à écrire"

   ============================================================ */

const CONFIGURATION = {

    /* Adresse qui recevra les messages du formulaire */
    emailContact: "Fayef796@gmail.com",

    /* Intitulés animés dans le Hero */
    titresAnimes: [
        "Styliste costumière cinéma",
        "Community Manager",
        "Assistante digitale",
        "Chargée de communication digitale"
    ]

};


/* ============================================================
   ATTENDRE LE CHARGEMENT DU DOM
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initTypingEffect();

    initScrollReveal();

    initStickyHeader();

    initActiveNavigation();

    initMobileMenu();

    initContactForm();

    initCurrentYear();

});


/* ============================================================
   1. EFFET MACHINE À ÉCRIRE
   ============================================================ */

function initTypingEffect() {

    const typingElement =
        document.getElementById("typingText");

    if (!typingElement) {
        return;
    }


    /*
       Vérification de l'accessibilité.

       Si l'utilisateur a activé "réduire les animations"
       dans son système, on affiche simplement le premier titre.
    */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        reduceMotion ||
        CONFIGURATION.titresAnimes.length === 0
    ) {

        typingElement.textContent =
            CONFIGURATION.titresAnimes[0] || "";

        return;
    }


    let titleIndex = 0;
    let characterIndex = 0;

    let isDeleting = false;

    const typingSpeed = 80;
    const deletingSpeed = 45;

    const pauseAfterWriting = 2200;
    const pauseAfterDeleting = 500;


    function type() {

        const currentTitle =
            CONFIGURATION.titresAnimes[titleIndex];


        /*
           Écriture
        */

        if (!isDeleting) {

            typingElement.textContent =
                currentTitle.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            /*
               Si le mot est complètement écrit,
               on attend avant de commencer à effacer.
            */

            if (
                characterIndex ===
                currentTitle.length
            ) {

                isDeleting = true;

                setTimeout(
                    type,
                    pauseAfterWriting
                );

                return;
            }


            setTimeout(
                type,
                typingSpeed
            );

            return;
        }


        /*
           Effacement
        */

        typingElement.textContent =
            currentTitle.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        /*
           Lorsque le mot est complètement effacé,
           on passe au titre suivant.
        */

        if (characterIndex === 0) {

            isDeleting = false;

            titleIndex =
                (titleIndex + 1) %
                CONFIGURATION.titresAnimes.length;

            setTimeout(
                type,
                pauseAfterDeleting
            );

            return;
        }


        setTimeout(
            type,
            deletingSpeed
        );

    }


    type();

}


/* ============================================================
   2. APPARITION DES SECTIONS AU DÉFILEMENT
   ============================================================ */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(".reveal");


    /*
       Si le navigateur ne prend pas en charge
       IntersectionObserver, on affiche directement
       les éléments.
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            element => {
                element.classList.add("visible");
            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   3. HEADER STICKY + OMBRE AU SCROLL
   ============================================================ */

function initStickyHeader() {

    const header =
        document.querySelector(".site-header");


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* ============================================================
   4. LIEN ACTIF DE LA NAVIGATION
   ============================================================ */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        sections.length === 0 ||
        navLinks.length === 0
    ) {
        return;
    }


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        const href =
                            link.getAttribute("href");


                        if (
                            href ===
                            `#${currentId}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* ============================================================
   5. MENU MOBILE
   ============================================================ */

function initMobileMenu() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    if (!menuToggle || !mainMenu) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainMenu.classList.toggle(
                    "open"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fermer le menu"
                    : "Ouvrir le menu"
            );

        }
    );


    /*
       Fermeture du menu lorsqu'on clique
       sur un lien.
    */

    const links =
        mainMenu.querySelectorAll(
            ".nav-link"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mainMenu.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            }
        );

    });


    /*
       Fermeture si l'on clique en dehors du menu.
    */

    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideMenu =
                mainMenu.contains(
                    event.target
                );

            const clickedButton =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                mainMenu.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Ouvrir le menu"
                );

            }

        }
    );

}


/* ============================================================
   6. FORMULAIRE DE CONTACT — MAILTO
   ============================================================ */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        (event) => {

            /*
               Empêche l'envoi classique du formulaire.
               Aucun serveur n'est utilisé.
            */

            event.preventDefault();


            /*
               Récupération des informations saisies.
            */

            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();


            /*
               Construction du corps de l'email.
            */

            const emailBody =

`Bonjour Fatou,

Je vous contacte depuis votre portfolio.

Nom : ${name}
Email : ${email}

Message :
${message}

Cordialement,
${name}`;


            /*
               Encodage pour éviter les problèmes
               avec les espaces et caractères spéciaux.
            */

            const mailtoLink =
                `mailto:${CONFIGURATION.emailContact}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(emailBody)}`;


            /*
               Ouverture du logiciel de messagerie
               installé sur l'appareil du visiteur.
            */

            window.location.href =
                mailtoLink;

        }
    );

}


/* ============================================================
   7. ANNÉE AUTOMATIQUE DU FOOTER
   ============================================================ */

function initCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* ============================================================
   FIN DU SCRIPT
   ============================================================ */
