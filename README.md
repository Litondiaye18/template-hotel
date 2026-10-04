# Dar El Yasmine — template hôtel

Site vitrine premium pour un hôtel, un riad, une maison d’hôtes ou une résidence touristique.

La version livrée n’a pas de backend, pas de base de données, pas de compte client et pas de paiement en ligne. Une demande de séjour ou un message de contact ouvre WhatsApp avec un texte déjà rempli. **Ce n’est pas une réservation confirmée.**

Le contenu de démonstration s’appelle Dar El Yasmine, à Marrakech. Remplacez-le par l’établissement réel.

## 1. Installation

Prérequis : Node.js 20 ou plus récent.

```bash
cd template-hotel
npm install
```

## 2. Lancement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Pour vérifier la version de production en local :

```bash
npm run build
npm start
```

## 3. Personnalisation

Pour un nouveau client, modifiez surtout ces fichiers :

| Fichier | Rôle |
| --- | --- |
| `config/site.ts` | Nom, slogan, coordonnées, couleurs, hero, horaires, textes d’accueil |
| `data/rooms.ts` | Chambres, prix, capacités, photos |
| `data/services.ts` | Services |
| `data/gallery.ts` | Galerie, catégories, textes alternatifs |
| `data/testimonials.ts` | Exemples de témoignages (démonstration uniquement) |
| `public/images/` | Logo, hero, chambres, services, galerie |

L’architecture des pages et des composants peut rester inchangée.

## 4. Modification du nom

Dans `config/site.ts` :

- `siteName` : nom affiché dans l’en-tête, le pied de page et les messages WhatsApp
- `slogan`
- `hero.title` et `hero.subtitle` : texte du bandeau d’accueil
- `description` : résumé utilisé pour le référencement
- `url` : adresse définitive du site, avec `https://`

Si le fichier logo contient déjà le nom en toutes lettres, passez `logoIncludesName` à `true`. Sinon laissez `false` : le nom est écrit à côté du symbole.

## 5. Modification des coordonnées

Toujours dans `config/site.ts` :

- `phone` : numéro affiché et utilisé pour l’appel (`tel:`)
- `whatsapp` : numéro international, chiffres seulement, sans `+` ni espaces. Exemple Maroc : `212524441820`
- `email`
- `address`, `city`, `country`
- `checkIn`, `checkOut`
- `openingHours`
- `googleMapsUrl` : lien « Ouvrir dans Google Maps »
- `googleMapsEmbedUrl` : iframe de la carte. Remplacez la recherche par l’adresse exacte
- `socialLinks` : Instagram, Facebook, ou tout autre lien

## 6. Modification des chambres

Éditez le tableau `rooms` dans `data/rooms.ts`.

Chaque chambre contient :

- `id`, `name`, `slug` (l’adresse sera `/chambres/ce-slug`)
- `description`, `shortDescription`
- `price`, `currency` (code ISO : `MAD`, `EUR`, `USD`…)
- `capacity`, `beds`, `size` (superficie en m²)
- `amenities`
- `images` et `imageAlts` (même nombre d’entrées)
- `featured` : `true` pour l’afficher sur l’accueil. Si aucune chambre n’est mise en avant, elles le sont toutes
- `available` : `false` affiche « Indisponible » et empêche de la choisir dans le formulaire

Le slug ne doit contenir que des minuscules, des chiffres et des tirets, sans accent.

## 7. Modification des services

Éditez `data/services.ts`.

L’accueil et la page Services affichent les entrées dans l’ordre du fichier. Pour retirer un service, supprimez son objet. Pour en ajouter un, copiez un bloc et changez `id`, `name`, `description`, `image` et `imageAlt`.

## 8. Remplacement des images

Aucune photo distante n’est utilisée. Le projet contient des illustrations SVG locales, marquées « visuel de démonstration ».

Remplacez-les par vos photos (JPG ou WebP de préférence) :

| Dossier | Usage | Où le chemin est déclaré |
| --- | --- | --- |
| `public/images/hero/hero.svg` | Grande image d’accueil | `config/site.ts` → `hero.image` et `hero.imageAlt` |
| `public/images/logo/logo.svg` | Symbole de l’en-tête | `config/site.ts` → `logo` |
| `public/images/logo/favicon.svg` | Icône d’onglet | `config/site.ts` → `favicon` |
| `public/images/rooms/` | Photos des chambres | `data/rooms.ts` → `images` et `imageAlts` |
| `public/images/services/` | Visuels des services | `data/services.ts` |
| `public/images/gallery/` | Galerie | `data/gallery.ts` |

Dimensions conseillées :

- Hero : 2000 × 1250 px
- Chambre et galerie : 1600 × 1200 px
- Service : 1200 × 800 px
- Logo : carré, au moins 160 × 160 px

Vous pouvez garder le même nom de fichier ou changer le chemin dans le fichier de données. Mettez à jour le texte alternatif pour décrire la vraie photo.

Le fichier `scripts/generate-demo-images.mjs` régénère les illustrations de démonstration et **écrase** les SVG du même nom. Ne le lancez plus une fois vos photos en place si elles utilisent ces noms.

Les réseaux sociaux préfèrent une image Open Graph en PNG. Le fichier `app/opengraph-image.tsx` la génère à partir du nom et du slogan.

## 9. Modification des couleurs

Dans `config/site.ts`, objet `theme` :

- `primary` : vert profond, boutons, en-tête mobile, pied de page
- `secondary` : terre cuite, messages d’erreur et pastilles
- `accent` : laiton, filets, prix, focus clavier
- `background` : fond clair
- `text` : texte principal

Utilisez des couleurs hexadécimales. Le fond est clair : gardez un `text` très sombre et un `primary` assez foncé pour que le texte clair des boutons reste lisible.

Aucun fichier CSS n’a besoin d’être modifié pour un simple changement de palette.

## 10. Configuration WhatsApp

Le numéro se règle avec `whatsapp` dans `config/site.ts`.

Les messages sont composés dans `lib/whatsapp.ts` par `generateWhatsAppUrl()` :

- `reservation` : demande de séjour (hôtel, chambre, dates, nombre de personnes)
- `information` : question générale, y compris le bouton flottant
- `contact` : formulaire et bouton de la page Contact

Le bouton d’une chambre préremplit l’hôtel et le nom de la chambre. Les dates restent « À préciser » tant que le visiteur n’a pas utilisé le formulaire.

Après envoi du formulaire, le site affiche : « Votre demande de réservation va être envoyée à l'hôtel pour confirmation. » Rien n’est enregistré sur le serveur.

## 11. Déploiement Vercel

1. Poussez le dossier `template-hotel` vers un dépôt Git.
2. Importez ce dépôt sur [vercel.com](https://vercel.com).
3. Framework : Next.js. Commande de build : `npm run build`.
4. Aucune variable d’environnement n’est requise pour cette version.
5. Avant la mise en ligne, remplacez `url` dans `config/site.ts` par le domaine final, afin que le sitemap et les balises canoniques soient justes.

## 12. Déploiement Netlify

1. Importez le même dépôt Git sur [netlify.com](https://netlify.com).
2. Commande de build : `npm run build`.
3. Laissez Netlify détecter Next.js. Ne publiez pas le dossier `out` et n’ajoutez pas `output: "export"` : les pages sont déjà statiques, et Netlify sert l’application Next.js avec son runtime.
4. Aucune variable d’environnement n’est requise pour cette version.
5. Mettez à jour `url` dans `config/site.ts` avec le domaine Netlify ou le domaine personnalisé.

## Pages

- `/` accueil
- `/chambres` liste des chambres
- `/chambres/[slug]` fiche chambre
- `/services`
- `/galerie`
- `/a-propos`
- `/reservation`
- `/contact`

## Témoignages

La section « Exemples de témoignages » est volontairement marquée comme démonstration. Ce ne sont pas des avis clients. Remplacez `data/testimonials.ts` par des citations autorisées, ou retirez `<Testimonials />` de `app/page.tsx` avant de vendre le site comme celui d’un établissement réel.

## Accessibilité

Le template prévoit un lien d’évitement, des labels de formulaire, des textes alternatifs, un menu clavier, une visionneuse fermable avec Échap, et un focus visible. Conservez ces textes lorsque vous remplacez les photos.
