# SPECS — Dots & Boxes pour Reddit (Devvit)

---

## 1. CONCEPT

| Élément | Détail |
|---|---|
| **Nom** | Dots & Boxes |
| **Sous-titre** | Jeu de Carrés en Losange |
| **Genre** | Puzzle / Stratégie tour par tour |
| **Joueurs** | 2 joueurs (local, CPU, ou multijoueur Reddit) |
| **Plateforme** | Reddit — Custom Post via Devvit |
| **Rendu** | Canvas 2D via Konva.js dans un WebView |

---

## 2. RÈGLES DU JEU

1. La grille est un **losange** (diamant) composé de carrés
2. Les joueurs jouent **à tour de rôle**
3. Chaque tour, un joueur clique sur **une ligne** entre deux points
4. Si la ligne ferme un carré (4 côtés), le joueur **gagne le carré** et **rejoue**
5. Si aucun carré n'est fermé, le tour passe à l'adversaire
6. Partie terminée quand **tous les carrés** sont capturés
7. Le joueur avec **le plus de carrés** gagne

---

## 3. MODES DE JEU

| Mode | Description | Priorité |
|---|---|---|
| **vs CPU** | Joueur contre IA | MVP |
| **Challenge** | Défier un autre Redditor (asynchrone ou temps réel) | MVP |
| **Daily Puzzle** | 1 grille/jour, même pour tout le monde, classement | Phase 2 |
| **Tournoi communautaire** | Bracket automatique dans le subreddit | Phase 3 |

---

## 4. GRILLES

| Taille | Carrés | Pattern diamant | Accès |
|---|---|---|---|
| Small (size=2) | 5 | 1-3-1 | Gratuit |
| Medium (size=3) | 13 | 1-3-5-3-1 | Gratuit |
| Large (size=4) | 25 | 1-3-5-7-5-3-1 | Devvit Good |
| XL (size=5) | 41 | 1-3-5-7-9-7-5-3-1 | Devvit Good |

---

## 5. ARCHITECTURE TECHNIQUE

```
┌──────────────────────────────────────────────┐
│              POST REDDIT                      │
│  ┌────────────────────────────────────────┐  │
│  │         DEVVIT WEBVIEW                 │  │
│  │                                        │  │
│  │   ┌──────────────────────────────┐     │  │
│  │   │      KONVA.JS (Canvas)       │     │  │
│  │   │                              │     │  │
│  │   │   • Grille losange           │     │  │
│  │   │   • Points (cercles)         │     │  │
│  │   │   • Lignes (cliquables)      │     │  │
│  │   │   • Carrés (remplis)         │     │  │
│  │   │   • Animations               │     │  │
│  │   │                              │     │  │
│  │   └──────────────────────────────┘     │  │
│  │                                        │  │
│  │   UI: Score, Tour, Boutons             │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ⬆️ Upvote  💬 Comments  ↗️ Share           │
└──────────────────────────────────────────────┘
         │                    ▲
         ▼                    │
┌──────────────────────────────────────────────┐
│           DEVVIT BACKEND (Server)            │
│                                              │
│  • Logique métier (validation des coups)     │
│  • Anti-triche (vérification côté serveur)   │
│  • Gestion des parties (création/join)       │
│  • Matchmaking                               │
│                                              │
│           REDIS (Stockage)                   │
│  • État des parties en cours                 │
│  • Scores / Classements (Sorted Sets)        │
│  • Profils joueurs (stats)                   │
│  • Daily Challenge (seed du jour)            │
└──────────────────────────────────────────────┘
```

---

## 6. STACK TECHNIQUE

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

## 7. MODÈLE DE DONNÉES (Redis)

### Partie en cours
```
Key: game:{gameId}
Type: Hash
{
  "player1": "reddit_user_id_1",
  "player2": "reddit_user_id_2",       // ou "CPU"
  "currentPlayer": "1",
  "scoreP1": "3",
  "scoreP2": "5",
  "gridSize": "3",
  "status": "in_progress",             // waiting | in_progress | finished
  "createdAt": "1720000000",
  "lines": "{\"h2_1\":1,\"v0_2\":2}"   // JSON des lignes placées
  "boxes": "{\"box_2_2\":1}"           // JSON des carrés capturés
}
```

### Classement (Sorted Set)
```
Key: leaderboard:{subredditId}
Type: Sorted Set
Score: nombre de victoires
Member: reddit_user_id
```

### Profil joueur
```
Key: player:{userId}
Type: Hash
{
  "wins": "12",
  "losses": "5",
  "draws": "2",
  "totalBoxes": "87",
  "currentStreak": "3",
  "bestStreak": "7",
  "gamesPlayed": "19"
}
```

### Daily Challenge
```
Key: daily:{date}
Type: Hash
{
  "seed": "abc123",
  "gridSize": "3",
  "bestScore": "9",
  "bestPlayer": "reddit_user_id"
}
```

---

## 8. INTELLIGENCE ARTIFICIELLE

| Niveau | Stratégie | Accès |
|---|---|---|
| **Facile** | Coups aléatoires | Gratuit |
| **Moyen** | Greedy (ferme les carrés) + évite d'offrir | Gratuit |
| **Difficile** | Chaînes + sacrifice calculé + minimax simplifié | Devvit Good |

### Algorithme CPU (Moyen) :
```
1. Si un carré peut être fermé → le fermer (garder le tour)
2. Chercher les coups "sûrs" (qui ne donnent pas un carré à l'adversaire)
3. Si aucun coup sûr → choisir le moins dangereux
```

---

## 9. FLUX UTILISATEUR

### Créer une partie :
```
1. Utilisateur ouvre le Custom Post "Dots & Boxes"
2. Choix : vs CPU / Défier un Redditor / Daily Challenge
3. [vs CPU] → Partie commence immédiatement
4. [Défier] → Crée un lien d'invitation, attend l'adversaire
5. [Daily] → Charge le puzzle du jour
```

### Jouer :
```
1. Affichage de la grille losange (Konva.js)
2. Indicateur de tour (J1 bleu / J2 rouge)
3. Joueur clique/touche une ligne
4. Validation côté serveur
5. Mise à jour Canvas (animation)
6. Si carré fermé → animation capture + score + rejoue
7. Sinon → tour passe à l'adversaire
8. Fin → écran résultats + bouton "Rejouer" / "Partager"
```

### Partager le résultat :
```
Commentaire auto-généré :
"🏆 J'ai battu @adversaire 8-5 sur une grille Medium !
   Qui veut me défier ? 👇"
```

---

## 10. UI / UX

### Thème visuel
| Élément | Valeur |
|---|---|
| Fond | #1a1a2e (dark blue) |
| Surface | #16213e |
| Accent | #0f3460 |
| Couleur J1 | #4fc3f7 (bleu clair) |
| Couleur J2 | #ef5350 (rouge) |
| Points | #e0e0e0, rayon 6px |
| Lignes (idle) | #2a3a5e, épaisseur 4px |
| Lignes (hover) | #5c7cfa, épaisseur 6px |
| Lignes (J1 placée) | #4fc3f7, épaisseur 5px + glow |
| Lignes (J2 placée) | #ef5350, épaisseur 5px + glow |
| Zone touch | 24px invisible (mobile) |
| Police | Segoe UI / system |

### Écrans
1. **Menu** : Choix du mode (CPU / Défi / Daily)
2. **Jeu** : Header (scores + tour) + Canvas (grille) + Bouton retour
3. **Game Over** : Résultat + Score + Rejouer + Partager
4. **Leaderboard** : Classement du subreddit (top 20)
5. **Shop** : Thèmes + Grilles premium (Devvit Goods)

### Responsive
| Taille | Adaptation |
|---|---|
| Mobile (< 480px) | Grille plein écran, labels masqués |
| Tablette (480-768px) | Grille centrée, labels visibles |
| Desktop (> 768px) | Grille centrée, espacement large |

---

## 11. MONÉTISATION (Devvit Goods)

| Produit | Prix (Gold) | Description |
|---|---|---|
| Thème Néon | 100 Gold | Couleurs néon fluo |
| Thème Rétro | 100 Gold | Style pixel art |
| Thème Nature | 100 Gold | Vert/brun naturel |
| Grille Large (4x4) | 200 Gold | 25 carrés |
| Grille XL (5x5) | 300 Gold | 41 carrés |
| CPU Difficile | 150 Gold | IA avancée |
| Badge "Champion" | 50 Gold | Affiché sur le profil |

---

## 12. ANTI-TRICHE

| Protection | Méthode |
|---|---|
| Validation serveur | Chaque coup vérifié côté Devvit Server |
| Tour forcé | Impossible de jouer hors de son tour |
| Lignes déjà prises | Rejet des coups invalides |
| Timeout | 60s par coup, sinon coup aléatoire |
| Rate limiting | Max 1 coup par 500ms |

---

## 13. STRUCTURE DES FICHIERS

```
dots-and-boxes-reddit/
├── devvit.yaml                 # Config Devvit
├── package.json
├── tsconfig.json
├── src/
│   ├── main.ts                 # Point d'entrée Devvit (Custom Post)
│   ├── server/
│   │   ├── gameLogic.ts        # Logique métier (validation, score)
│   │   ├── cpuAI.ts            # Intelligence artificielle
│   │   ├── redis.ts            # Helpers Redis (CRUD parties)
│   │   └── leaderboard.ts      # Classement
│   └── webview/
│       ├── index.html
│       ├── App.tsx             # Composant React principal
│       ├── components/
│       │   ├── Menu.tsx        # Écran menu
│       │   ├── GameBoard.tsx   # Canvas Konva.js
│       │   ├── GameOver.tsx    # Écran fin
│       │   └── Leaderboard.tsx # Classement
│       ├── game/
│       │   ├── grid.ts         # Génération grille losange
│       │   ├── renderer.ts     # Rendu Konva.js
│       │   └── state.ts        # État local du jeu
│       └── styles/
│           └── main.css        # Styles (Tailwind ou custom)
├── assets/
│   └── preview.png             # Image aperçu dans le feed
└── README.md
```

---

## 14. PLANNING

| Étape | Durée | Livrable |
|---|---|---|
| Setup Devvit + structure | 2 jours | Projet initialisé |
| Grille Konva.js + rendu | 3 jours | Canvas jouable (local) |
| Mode CPU | 2 jours | IA fonctionnelle |
| Intégration Redis | 2 jours | Persistance des parties |
| Mode multijoueur (Realtime) | 3 jours | 2 joueurs Reddit |
| Leaderboard | 1 jour | Classement subreddit |
| UI polish + animations | 2 jours | UX fluide |
| Devvit Goods (shop) | 1 jour | Monétisation |
| Tests + deploy | 2 jours | Publication |
| **TOTAL** | **~18 jours** | App Reddit complète |

---

## 15. MÉTRIQUES DE SUCCÈS

| KPI | Cible |
|---|---|
| Parties jouées / jour | > 500 |
| Rétention D1 | > 35% |
| Rétention D7 | > 12% |
| Durée session | > 2 min |
| Revenu Devvit Goods / mois | > $200 |
| Note communauté | > 4/5 |
| Installations subreddits | > 20 |
