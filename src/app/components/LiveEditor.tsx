"use client";
import React, { useState, useEffect } from 'react';

const LiveEditor = () => {
  // HTML, CSS, et JavaScript préremplis pour un formulaire fonctionnel
  const [html, setHtml] = useState(`
    <form id="myForm"> <!-- Formulaire avec un identifiant -->
      <label for="name">Name:</label> <!-- Label pour le champ nom -->
      <input type="text" id="name" name="name" placeholder="Entrez votre nom" required /> <!-- Champ de saisie pour le nom -->
      <br/><br/> <!-- Sauts de ligne -->
      <label for="email">Email:</label> <!-- Label pour le champ email -->
      <input type="email" id="email" name="email" placeholder="Entrez votre email" required /> <!-- Champ de saisie pour l'email -->
      <br/><br/> <!-- Sauts de ligne -->
      <button type="submit">Submit</button> <!-- Bouton de soumission du formulaire -->
    </form>
  `);

  const [css, setCss] = useState(`
    body {
      font-family: Arial, sans-serif; /* Utilisation d'une police de caractères simple */
      padding: 20px; /* Ajout d'un espace autour du contenu*/
      background-color: white; /* Couleur de fond de la page*/
    }
    form {
      max-width: 400px; /* Largeur maximale du formulaire*/
      margin: auto; /* Centre le formulaire*/
      padding: 20px; /* Espace à l'intérieur du formulaire*/
      border: 1px solid #ccc; /* Bordure grise claire autour du formulaire*/
      border-radius: 5px; /* Coins légèrement arrondis*/
      background-color: white; /* Couleur de fond du formulaire*/
    }
    label { /* Style des étiquettes des champs de formulaire*/
      font-weight: bold; /* Gras pour les étiquettes*/
    }
    input {
      display: block; /* Chaque champ apparaît sur une nouvelle ligne */
      width: 80%; /* Les champs occupent 80% de la largeur du formulaire */
      padding: 10px; /* Ajout d'un espace à l'intérieur des champs */
      margin-bottom: 10px; /* Marge en bas de chaque champ */
      border: 1px solid #ccc; /* Bordure grise claire*/
      border-radius: 3px; /* Coins légèrement arrondis */
    }
    button {
      padding: 10px 20px; /* Espace à l'intérieur du bouton */
      background-color: #28a745; /* Couleur de fond verte pour le bouton */
      color: white; /* Texte en blanc dans le bouton */
      border: none; /* Suppression de la bordure du bouton */
      border-radius: 3px; /* Coins arrondis pour le bouton */
      cursor: pointer; /* Le curseur change en pointeur au survol */
    }
    button:hover {
      background-color: #218838; /* Couleur de fond plus foncée au survol du bouton */
    }
  `);

  const [js, setJs] = useState(`
    document.getElementById('myForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Empêche l'envoi réel du formulaire
      alert('Nom: ' + document.getElementById('name').value + ', Email: ' + document.getElementById('email').value); // Affiche les valeurs saisies dans une alerte
    });
  `);

  const [srcDoc, setSrcDoc] = useState('');

  // Met à jour le contenu de l'iframe avec le HTML, CSS et JavaScript
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</body>
          <script>${js}</script>
        </html>
      `);
    }, 250); // Petit délai pour éviter trop de re-rendus successifs

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="flex h-screen">
      {/* Côté gauche : éditeurs de code */}
      <div className="w-1/2 p-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold mb-4">HTML</h2>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="w-full h-1/3 p-2 mb-4 border text-black"
          placeholder="Écrivez votre HTML ici"
        />
        <h2 className="text-xl font-semibold mb-4">CSS</h2>
        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          className="w-full h-1/3 p-2 mb-4 border text-black"
          placeholder="Écrivez votre CSS ici"
        />
        <h2 className="text-xl font-semibold mb-4">JavaScript</h2>
        <textarea
          value={js}
          onChange={(e) => setJs(e.target.value)}
          className="w-full h-1/3 p-2 mb-4 border text-black"
          placeholder="Écrivez votre JavaScript ici"
        />
      </div>

      {/* Côté droit : prévisualisation en direct */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Aperçu en direct</h2>
        <iframe
          srcDoc={srcDoc}
          title="aperçu en direct"
          sandbox="allow-scripts allow-forms allow-modals"
          frameBorder="0"
          className="w-full h-full border"
        />
      </div>
    </div>
  );
};

export default LiveEditor;
