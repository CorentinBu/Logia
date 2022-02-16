# Logia
Défi Soixante Circuits : Programme permettant d'afficher la météo de villes différentes toutes les 30 secondes. Utilise l'API Open Weather Map.

Comment utiliser Logia ?

En résumé :
  - Téléchargez le programme
  - Ouvrir un terminal, puis taper la commande "**npm install express socket.io --save-dev nodemon dotenv**"
  - Placez votre clé API dans le dossier ".env"
  - Démarrez le server avec "**node app.js**"
  - Allez sur "http://localhost:3000"

En détails :
  - Récupérez tous les fichiers sur le Git.
  - Ouvrir un terminal
  - Maintenant, il va falloir installer les modules permettant au programme de fonctionner. Ici on va avoir besoin de Express, Socket.io et Nodemon, vous pouvez les installer avec cette commande : "**npm install express socket.io --save-dev nodemon dotenv**"
  - A présent, pour pouvoir utiliser l'API, il va falloir s'inscrire sur ce site : https://rapidapi.com/community/api/open-weather-map/
  - Une fois cela fait, il faut s'inscrire sur l'API "Open Weather Map", c'est ce qui permet de récupérer les informations sur la météo.
  - Vous pouvez récupérer la clé API dans la fenêtre de droite après avoir lancé un Endpoint. Elle se trouve dans le code snippets, à la ligne "x-rapidapi-key"
  - Il ne reste plus qu'à placer la clé API dans le fichier ".env".
  - Retournez dans le terminal de commande et rentrez "**node app.js**".
  - Allez sur http://localhost:3000 et vous pourrez voir le programme se lancer automatiquement.

Problème connu : 
  Si l'on rafraichi la page, les sockets existantes restent connectées et de nouvelles se créent par-dessus. Cela provoque donc des erreurs de MaxListenerExceedWarning et le chronomètre avance de n secondes au lieu de 1 (le n étant le nombre de fois où on l'a rafraichi la page). 
  J'ai essayé de fermer les sockets lors de la déconnnexion et après leur utilisation mais cela ne fonctionne pas. J'ai aussi essayé de reprendre la solution à ce problème : https://stackoverflow.com/questions/41924713/node-js-socket-io-page-refresh-multiple-connections.
