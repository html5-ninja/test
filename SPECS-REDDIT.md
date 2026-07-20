# SPECS — Dots & Boxes pour Reddit (Devvit)

---

## 1. CONCEPT

| Élément | Détail |
|---|---|
| **Nom** | Dots & Boxes |
| **Sous-titre** | Jeu de Carrés en Losange |
| **Genre** | Puzzle / Stratégie tour par tour avec Power-ups |
| **Joueurs** | 2 à 4 joueurs simultanés |
| **Plateforme** | Reddit — Custom Post via Devvit |
| **Rendu** | Canvas 2D via Konva.js dans un WebView |

---

## 2. RÈGLES DU JEU

1. La grille est un **grand losange** (diamant) de 41 carrés (size=5, pattern 1-3-5-7-9-7-5-3-1)
2. De **2 à 4 joueurs** jouent à tour de rôle
3. Chaque tour, un joueur clique sur **une ligne** entre deux points
4. Si la ligne ferme un carré (4 côtés), le joueur **gagne le carré** et **rejoue**
5. Si aucun carré n'est fermé, le tour passe au joueur suivant
6. Les joueurs peuvent utiliser des **bonus** (1 par tour, sous conditions)
7. Partie terminée quand **tous les carrés** sont capturés
8. Le joueur avec **le plus de carrés** gagne

---

## 3. GRILLE UNIQUE

| Propriété | Valeur |
|---|---|
| **Taille** | size=5 (Grand Losange) |
| **Nombre de carrés** | 41 |
| **Pattern diamant** | 1-3-5-7-9-7-5-3-1 |
| **Points (dots)** | 80 |
| **Lignes** | 112 |
| **Durée moyenne** | 5-8 minutes (4 joueurs) |

```
        [X]
      [X][X][X]
    [X][X][X][X][X]
  [X][X][X][X][X][X][X]
[X][X][X][X][X][X][X][X][X]
  [X][X][X][X][X][X][X]
    [X][X][X][X][X]
      [X][X][X]
        [X]
```

---

## 4. JOUEURS (2 à 4)

| Joueur | Couleur | Identifiant |
|---|---|---|
| **Joueur 1** | #4fc3f7 (Bleu) | Créateur de la partie |
| **Joueur 2** | #ef5350 (Rouge) | |
| **Joueur 3** | #66bb6a (Vert) | |
| **Joueur 4** | #ffa726 (Orange) | |

### Ordre de jeu :
- Tour par tour dans l'ordre J1 → J2 → J3 → J4 → J1...
- Si un joueur ferme un carré, il **rejoue** immédiatement
- Si un joueur quitte, ses carrés restent mais son tour est sauté

---

## 5. MODES DE JEU

| Mode | Description | Joueurs | Priorité |
|---|---|---|---|
| **Partie rapide** | Matchmaking auto (2-4 joueurs) | 2-4 | MVP |
| **vs CPU** | Joueur contre 1-3 IA | 1 + CPU | MVP |
| **Défi privé** | Inviter des Redditors spécifiques | 2-4 | MVP |
| **Daily Challenge** | 1 grille/jour, classement communauté | Solo | Phase 2 |
| **Tournoi** | Bracket automatique dans le subreddit | 2-4 | Phase 3 |

---

## 6. SYSTÈME DE BONUS (Power-ups)

### Inventaire de bonus :

| Bonus | Icône | Effet | Cooldown |
|---|---|---|---|
| **Bombe de peinture** | 💣 | Capture instantanément 1 carré non-fermé adjacent à vos carrés (sans placer les 4 lignes) | 1 par partie |
| **Swap** | 🔄 | Échange un de vos carrés contre un carré d'un adversaire | 1 par partie |
| **Double coup** | ⚡ | Placez 2 lignes au lieu d'1 ce tour | Tous les 8 tours |
| **Bouclier** | 🛡️ | Protège un de vos carrés contre le Swap pendant 3 tours | 2 par partie |
| **Vol de ligne** | 🎯 | Retirez une ligne posée par un adversaire (elle redevient disponible) | 1 par partie |
| **Gel** | ❄️ | Gèle un adversaire : il passe son prochain tour | 1 par partie |
| **Vision** | 👁️ | Révèle les carrés "presque fermés" (3 lignes sur 4) pendant 2 tours | 2 par partie |
| **Peinture dorée** | ✨ | Le prochain carré que vous fermez vaut 2 points au lieu de 1 | 1 par partie |

### Règles des bonus :
- Chaque joueur commence avec **1 exemplaire de chaque bonus** (sauf exceptions indiquées)
- Un seul bonus utilisable **par tour**
- Les bonus sont utilisés **avant** de placer une ligne (sauf Double coup)
- Les bonus utilisés sont **visibles** par tous les joueurs (pas secrets)
- En mode CPU, l'IA utilise aussi des bonus (avec stratégie)

### Obtenir des bonus supplémentaires (Gamification) :
- **Quête quotidienne** : gagner 1 bonus aléatoire
- **Série de victoires** : 3 wins consécutifs = 1 bonus au choix
- **Level-up** : gagner des bonus à chaque niveau
- **Devvit Goods** : acheter des packs de bonus (monétisation)

---

## 7. GAMIFICATION

### Système de progression

#### XP (Expérience)
| Action | XP gagnés |
|---|---|
| Jouer une partie | +10 XP |
| Gagner une partie | +50 XP |
| Fermer un carré | +5 XP |
| Utiliser un bonus | +3 XP |
| Daily Challenge complété | +30 XP |
| Streak quotidienne (3 jours) | +100 XP |
| Streak quotidienne (7 jours) | +300 XP |
| Premier du classement hebdo | +500 XP |

#### Niveaux et Rangs

| Niveau | XP requis | Rang | Récompense |
|---|---|---|---|
| 1-5 | 0-500 | Débutant 🟤 | Tutoriel |
| 6-10 | 500-1500 | Apprenti 🔵 | Bonus "Vision" x2 |
| 11-20 | 1500-4000 | Stratège 🟢 | Thème "Néon" débloqué |
| 21-35 | 4000-10000 | Expert 🟣 | Bonus "Double coup" x2 |
| 36-50 | 10000-20000 | Maître ⭐ | Cadre profil doré |
| 51-75 | 20000-40000 | Grand Maître 💎 | Thème exclusif + emote |
| 76-100 | 40000-70000 | Légende 👑 | Badge "Légende" permanent |

#### Saisons (Reset trimestriel)
- Classement par saison (3 mois)
- Récompenses exclusives en fin de saison
- Rang visible sur le profil Reddit via flair

### Quêtes / Missions

#### Quêtes quotidiennes (3 par jour) :
| Quête | Récompense |
|---|---|
| Jouer 2 parties | +20 XP + 1 bonus aléatoire |
| Fermer 10 carrés | +30 XP |
| Gagner 1 partie | +40 XP |
| Utiliser 2 bonus dans une partie | +15 XP |
| Jouer contre un adversaire de rang supérieur | +50 XP |

#### Quêtes hebdomadaires :
| Quête | Récompense |
|---|---|
| Gagner 5 parties | +200 XP + Bonus rare |
| Jouer 7 jours consécutifs | +300 XP + Thème temporaire |
| Finir dans le top 10 du classement | +500 XP |
| Gagner une partie sans utiliser de bonus | +150 XP (titre "Puriste") |

### Succès / Trophées

| Succès | Condition | Récompense |
|---|---|---|
| Premier sang | Gagner votre première partie | Badge + 50 XP |
| Dominateur | Gagner avec 30+ carrés (sur 41) | Badge + Titre |
| Comeback King | Gagner après avoir été dernier à mi-partie | Badge + 100 XP |
| Collectionneur | Posséder tous les thèmes | Badge spécial |
| Inarrêtable | Série de 10 victoires | Badge + 500 XP |
| Social | Jouer 50 parties multijoueur | Badge + Bonus pack |
| Bombe atomique | Utiliser Bombe de peinture pour gagner la partie | Badge |
| Swap master | Voler le carré gagnant avec un Swap | Badge |
| Pacifiste | Gagner sans utiliser aucun bonus offensif | Titre "Pacifiste" |
| Légende Reddit | Atteindre le niveau 100 | Flair Reddit exclusif |

### Classements

| Type | Période | Visible par |
|---|---|---|
| **Classement subreddit** | Permanent | Membres du subreddit |
| **Classement hebdomadaire** | Reset chaque lundi | Tout le monde |
| **Classement saison** | 3 mois | Tout le monde |
| **Classement amis** | Permanent | Joueurs qui se sont affrontés |

---

## 8. ARCHITECTURE TECHNIQUE

```
┌──────────────────────────────────────────────┐
│              POST REDDIT                      │
│  ┌────────────────────────────────────────┐  │
│  │         DEVVIT WEBVIEW                 │  │
│  │                                        │  │
│  │   ┌──────────────────────────────┐     │  │
│  │   │      KONVA.JS (Canvas)       │     │  │
│  │   │                              │     │  │
│  │   │   • Grand losange (41 carrés)│     │  │
│  │   │   • 4 couleurs joueurs       │     │  │
│  │   │   • Animations bonus         │     │  │
│  │   │   • Effets visuels (glow)    │     │  │
│  │   │   • Particules               │     │  │
│  │   │                              │     │  │
│  │   └──────────────────────────────┘     │  │
│  │                                        │  │
│  │   UI: Scores x4, Tour, Bonus bar      │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ⬆️ Upvote  💬 Comments  ↗️ Share           │
└──────────────────────────────────────────────┘
         │                    ▲
         ▼                    │
┌──────────────────────────────────────────────┐
│           DEVVIT BACKEND (Server)            │
│                                              │
│  • Logique métier (validation coups + bonus) │
│  • Anti-triche (vérif serveur)               │
│  • Gestion 2-4 joueurs                       │
│  • Matchmaking (file d'attente)              │
│  • Système XP / niveaux                      │
│  • Quêtes / missions                         │
│                                              │
│           REDIS (Stockage)                   │
│  • État parties (Hash)                       │
│  • Classements (Sorted Set)                  │
│  • Profils + progression (Hash)              │
│  • Quêtes joueurs (Hash)                     │
│  • Inventaire bonus (Hash)                   │
│  • Saisons (Sorted Set)                      │
└──────────────────────────────────────────────┘
```

---

## 9. STACK TECHNIQUE

| Couche | Technologie |
|---|---|
| **Plateforme** | Devvit (Reddit Developer Platform) |
| **Frontend** | React (Devvit WebView) + Konva.js |
| **Rendu graphique** | Konva.js (HTML5 Canvas 2D) |
| **Backend** | Devvit Server Functions (TypeScript) |
| **Stockage** | Redis (intégré à Devvit) |
| **Temps réel** | Devvit Realtime API |
| **Auth** | Automatique (compte Reddit) |
| **Build** | Vite + TypeScript |
| **Monétisation** | Devvit Goods |

---

## 10. MODÈLE DE DONNÉES (Redis)

### Partie en cours
```
Key: game:{gameId}
Type: Hash
{
  "players": "[\"user1\",\"user2\",\"user3\",\"user4\"]",
  "playerCount": "4",
  "currentPlayer": "0",               // index 0-3
  "scores": "{\"0\":5,\"1\":3,\"2\":7,\"3\":2}",
  "gridSize": "5",
  "status": "in_progress",             // waiting | in_progress | finished
  "createdAt": "1720000000",
  "lines": "{\"h2_1\":0,\"v0_2\":1}",  // ligne -> index joueur
  "boxes": "{\"box_2_2\":0}",          // carré -> index joueur
  "bonusUsed": "{\"0\":{\"bomb\":true},\"1\":{}}",
  "bonusInventory": "{\"0\":{\"bomb\":1,\"swap\":1,...}}",
  "frozenPlayers": "[]",               // joueurs gelés (skip tour)
  "shieldedBoxes": "{\"box_3_3\":{\"player\":0,\"turnsLeft\":3}}",
  "goldenNext": "[]",                  // joueurs avec peinture dorée active
  "turnNumber": "12"
}
```

### Profil joueur
```
Key: player:{userId}
Type: Hash
{
  "xp": "4250",
  "level": "18",
  "rank": "Stratège",
  "wins": "42",
  "losses": "15",
  "draws": "3",
  "totalBoxes": "387",
  "currentStreak": "5",
  "bestStreak": "12",
  "gamesPlayed": "60",
  "seasonWins": "8",
  "achievements": "[\"first_blood\",\"dominator\"]",
  "bonusInventory": "{\"bomb\":3,\"swap\":2,\"double\":1,...}",
  "questsDaily": "{\"play2\":1,\"close10\":7,\"win1\":0}",
  "lastPlayed": "1720000000"
}
```

### Classement saison
```
Key: season:{seasonId}:leaderboard
Type: Sorted Set
Score: XP gagné durant la saison
Member: reddit_user_id
```

### Matchmaking (file d'attente)
```
Key: queue:{playerCount}
Type: List
Values: ["user1", "user2", ...]
```

---

## 11. INTELLIGENCE ARTIFICIELLE

| Niveau | Stratégie | Utilise les bonus |
|---|---|---|
| **Facile** | Coups aléatoires | Non |
| **Moyen** | Greedy + évite d'offrir | Oui (basique) |
| **Difficile** | Chaînes + minimax + bonus stratégique | Oui (optimal) |

### IA et bonus :
- **Facile** : N'utilise jamais de bonus
- **Moyen** : Utilise les bonus quand c'est évident (ex: bombe si carré adjacent dispo)
- **Difficile** : Utilise les bonus au moment optimal (ex: swap pour voler le carré décisif en fin de partie)

---

## 12. UI / UX

### Thème visuel
| Élément | Valeur |
|---|---|
| Fond | #1a1a2e (dark blue) |
| Surface | #16213e |
| Accent | #0f3460 |
| Couleur J1 | #4fc3f7 (Bleu) |
| Couleur J2 | #ef5350 (Rouge) |
| Couleur J3 | #66bb6a (Vert) |
| Couleur J4 | #ffa726 (Orange) |
| Points | #e0e0e0, rayon 6px |
| Lignes (idle) | #2a3a5e, épaisseur 4px |
| Zone touch | 24px invisible (mobile) |

### Interface de jeu (4 joueurs)
```
┌─────────────────────────────────────────────┐
│ [J1 🔵 12] [J2 🔴 8] [J3 🟢 14] [J4 🟠 7] │  ← Scores
├─────────────────────────────────────────────┤
│           Tour de: Joueur 3 🟢              │  ← Indicateur
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│           ◆ GRILLE LOSANGE ◆               │  ← Canvas Konva.js
│              (41 carrés)                    │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│ [💣] [🔄] [⚡] [🛡️] [🎯] [❄️] [👁️] [✨]   │  ← Barre de bonus
├─────────────────────────────────────────────┤
│ Nv.18 ████████░░ 4250 XP                   │  ← Barre de progression
└─────────────────────────────────────────────┘
```

### Écrans
1. **Menu** : Choix du mode + nombre de joueurs
2. **Lobby** : Attente des joueurs (2-4) + chat
3. **Jeu** : Header scores + Canvas + Barre bonus + XP
4. **Game Over** : Classement 1-4, XP gagné, quêtes complétées
5. **Profil** : Niveau, rang, stats, succès, inventaire bonus
6. **Leaderboard** : Classement subreddit / saison
7. **Shop** : Thèmes, bonus, cosmétiques (Devvit Goods)
8. **Quêtes** : Daily + Weekly + progression

### Animations bonus
| Bonus | Animation |
|---|---|
| Bombe de peinture | Explosion de particules colorées sur le carré |
| Swap | Les 2 carrés tournent et échangent de couleur |
| Double coup | Éclair lumineux + son "power up" |
| Bouclier | Bulle protectrice autour du carré |
| Vol de ligne | La ligne se décompose en particules |
| Gel | Flocons + joueur grisé |
| Vision | Halo lumineux sur les carrés presque fermés |
| Peinture dorée | Éclat doré + carré avec bordure or |

---

## 13. MONÉTISATION (Devvit Goods)

| Produit | Prix (Gold) | Description |
|---|---|---|
| **Pack Bonus Starter** | 100 Gold | +2 de chaque bonus |
| **Pack Bonus Pro** | 250 Gold | +5 de chaque bonus |
| **Thème Néon** | 150 Gold | Couleurs néon fluo |
| **Thème Rétro** | 150 Gold | Style pixel art |
| **Thème Galaxie** | 200 Gold | Fond étoilé + particules |
| **Cadre profil Or** | 100 Gold | Bordure dorée sur le profil |
| **Cadre profil Diamant** | 300 Gold | Bordure diamant animée |
| **Emote "GG"** | 50 Gold | Utilisable en fin de partie |
| **Emote "Savage"** | 50 Gold | Après un Swap réussi |
| **Titre personnalisé** | 200 Gold | Titre affiché sous le pseudo |
| **Season Pass** | 500 Gold | Bonus XP x2 + récompenses exclusives |

---

## 14. ANTI-TRICHE

| Protection | Méthode |
|---|---|
| Validation serveur | Chaque coup + bonus vérifié côté Devvit Server |
| Tour forcé | Impossible de jouer hors de son tour |
| Bonus vérifié | Le serveur check l'inventaire avant d'appliquer |
| Lignes déjà prises | Rejet des coups invalides |
| Timeout | 30s par coup (4 joueurs), sinon coup aléatoire |
| Rate limiting | Max 1 action par 500ms |
| Anti-collusion | Détection de patterns suspects entre joueurs |

---

## 15. STRUCTURE DES FICHIERS

```
dots-and-boxes-reddit/
├── devvit.yaml
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts                    # Point d'entrée Devvit
│   ├── server/
│   │   ├── gameLogic.ts           # Logique métier (coups + score)
│   │   ├── bonusLogic.ts          # Logique des bonus
│   │   ├── cpuAI.ts               # Intelligence artificielle
│   │   ├── matchmaking.ts         # File d'attente 2-4 joueurs
│   │   ├── progression.ts         # XP, niveaux, quêtes
│   │   ├── redis.ts               # Helpers Redis
│   │   ├── leaderboard.ts         # Classements
│   │   └── season.ts              # Gestion des saisons
│   └── webview/
│       ├── index.html
│       ├── App.tsx
│       ├── components/
│       │   ├── Menu.tsx            # Écran menu
│       │   ├── Lobby.tsx           # Attente joueurs
│       │   ├── GameBoard.tsx       # Canvas Konva.js
│       │   ├── BonusBar.tsx        # Barre de bonus
│       │   ├── ScoreHeader.tsx     # Scores 4 joueurs
│       │   ├── GameOver.tsx        # Résultats + XP
│       │   ├── Profile.tsx         # Profil joueur
│       │   ├── Leaderboard.tsx     # Classement
│       │   ├── Quests.tsx          # Missions
│       │   └── Shop.tsx            # Boutique
│       ├── game/
│       │   ├── grid.ts            # Génération grille losange
│       │   ├── renderer.ts        # Rendu Konva.js
│       │   ├── bonusEffects.ts    # Animations des bonus
│       │   ├── particles.ts       # Système de particules
│       │   └── state.ts           # État local du jeu
│       └── styles/
│           └── main.css
├── assets/
│   ├── preview.png
│   ├── icons/                     # Icônes bonus
│   └── sounds/                    # Sons (optionnel)
└── README.md
```

---

## 16. PLANNING

| Étape | Durée | Livrable |
|---|---|---|
| Setup Devvit + structure | 2 jours | Projet initialisé |
| Grille Konva.js (41 carrés) | 3 jours | Canvas jouable |
| Support 2-4 joueurs | 2 jours | Multi-couleurs + tour |
| Système de bonus (logique) | 4 jours | 8 bonus fonctionnels |
| Animations bonus (Canvas) | 3 jours | Effets visuels |
| Mode CPU (avec bonus) | 3 jours | IA 3 niveaux |
| Intégration Redis + Realtime | 3 jours | Multijoueur temps réel |
| Matchmaking (2-4 joueurs) | 2 jours | File d'attente |
| Système XP + niveaux | 2 jours | Progression |
| Quêtes + succès | 2 jours | Missions daily/weekly |
| Leaderboard + saisons | 2 jours | Classements |
| Devvit Goods (shop) | 2 jours | Monétisation |
| UI polish + animations | 3 jours | UX fluide |
| Tests + deploy | 3 jours | Publication Reddit |
| **TOTAL** | **~36 jours** | App Reddit complète |

---

## 17. MÉTRIQUES DE SUCCÈS

| KPI | Cible |
|---|---|
| Parties jouées / jour | > 1000 |
| Rétention D1 | > 40% |
| Rétention D7 | > 18% |
| Durée session moyenne | > 5 min |
| Parties par session | > 2.5 |
| Taux utilisation bonus | > 70% des parties |
| Conversion Devvit Goods | > 5% |
| Revenu / mois | > $500 |
| Installations subreddits | > 50 |
| Note communauté | > 4.3/5 |
