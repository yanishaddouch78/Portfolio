// Sélectionner tous les inputs ayant la classe "input"
const inputs = document.querySelectorAll(".input");

// Ajouter la classe "focus" au parent lors du focus
function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

// Retirer la classe "focus" si le champ est vide au blur
function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

// Ajouter les événements focus et blur à chaque input
inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Récupérer le formulaire
const form = document.getElementById("contactForm");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal .close");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Récupérer tous les champs du formulaire
  const getemail = document.getElementById("email");
  const getname = document.getElementById("name");  
  const gettel = document.getElementById("tel");  
  const getsubject = document.getElementById("subject");  
  const getmessage = document.getElementById("message"); 
  
  // Récupérer les valeurs des champs
  let email = getemail.value;
  let name = getname.value;
  let tel = gettel.value;
  let subject = getsubject.value;
  let message = getmessage.value;

  // Appliquer DOMPurify pour purifier les valeurs des champs
  email = DOMPurify.sanitize(email);
  name = DOMPurify.sanitize(name);
  tel = DOMPurify.sanitize(tel);
  subject = DOMPurify.sanitize(subject);
  message = DOMPurify.sanitize(message);

  // Définir les options pour la requête fetch
  const options = { method: 'GET' };

  // Valider l'email avec l'API externe
  fetch('https://emailvalidation.abstractapi.com/v1?api_key=fd8fdadba9cf4859929d9f073fcdd138&email=' + email, options)
    .then(response => response.json())
    .then(response => {
      if (response.is_valid_format.value) {
        emailjs.sendForm("service_5c05qge", "template_3kujd8q", form, "Ra-g5RTMLLSAvNL68")
          .then(
            () => {
              console.log(response);
              modal.style.display = "block";  // Afficher la modale
              form.reset();  // Réinitialiser le formulaire
            },
            (error) => {
              console.log(response);
              console.error("Erreur:", error);
              alert("Erreur lors de l'envoi du message.");
            }
          );
      } else {
        alert("L'adresse email n'est pas valide.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de la validation de l'email.");
    });
});


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
