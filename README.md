# Test technique Botmind - Twitter Clone

## Sujet

### Objectifs

- [x] L'exercice consiste en la réalisation d'un service de microblogging du même type que
      Twitter. Il s'agit d'un service sur lequel on peut s'inscrire, se connecter, rédiger et publier
      des articles textuels courts, accéder aux articles écrits par les usagers.

### Périmètre

- [x] La partie client doit utiliser Angular, et l'application client doit communiquer avec
      l'application serveur par l'intermédiaire d'une API http.
- [x] La partie serveur doit fonctionner sous NodeJS avec TypeScript, et utiliser Express.
- [x] La partie base de données peut utiliser le système de votre choix, à condition d'employer
      une librairie ORM adaptée dans l'application serveur.
- [x] Vous êtes libres d'employer, tant pour l'application client que l'application serveur, toutes
      les librairies compatibles qui vous sembleront pertinentes.
- [x] Les versions des différents composants, langages et dépendances des applications du
      projet sont également laissées à votre appréciation, avec une préférence pour les
      versions actives ou LTS.

### Description des besoins

- [x] Il faut pouvoir créer un compte avec email et mot-de-passe sécurisé, se connecter et se
      déconnecter. Une fois connecté, un bandeau en haut du site doit contenir un menu
      comprenant l'option "se déconnecter".
- [x] Il faut, une fois connecté, avoir une timeline des dix derniers articles rédigés (tous
      utilisateurs confondus), si l'on fait défiler la page au-delà, on charge dix nouveaux
      articles, etc.
- [x] Il faut prévoir, en haut de cette timeline, un espace "rédaction" avec un champ texte et un
      bouton publier.
- [x] Les éléments de design sont laissés à votre appréciation, vous êtes libres d'employer les
      librairies de votre choix (Bootstrap, Material, etc.)

### Objectifs bonus possibles (peut faire la différence avec d’autres profils)

- [ ] Éditer un article qu'on a écrit
- [ ] Supprimer un article
- [ ] Articles avec image
- [ ] Affichage d'une prévisualisation si l'article contient un lien
- [ ] Suppression de compte (compte seul ou compte plus données associées (RGPD))
- [ ] Système d'abonnement où l'on verrait uniquement les articles des usagers de son choix
- [ ] Système de "likes"
- [ ] Réorganiser la timeline en montrant d'abord les articles récents populaires
- [ ] Thème clair/sombre, stocker la préférence selon l'usager
- [ ] Tout autre bonus de votre choix
