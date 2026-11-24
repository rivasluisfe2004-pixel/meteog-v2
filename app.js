// Commun à toutes les pages : en-tête, connexion (pseudo), scores.
// ponytail: tout est stocké dans le navigateur (localStorage) ; pour un vrai classement partagé il faudra un serveur.
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const getPseudo = () => store.get('meteog-pseudo', '');
const getScores = () => store.get('meteog-scores', []);
// on garde toutes les parties (les points s'additionnent) ; ponytail: plafond de 5 000 parties, les plus anciennes sautent
function addScore(score, mode, extra = {}) {
  const all = getScores();
  all.push({ pseudo: getPseudo() || 'Invité', score, mode, date: Date.now(), ...extra });
  store.set('meteog-scores', all.slice(-5000));
  const i = leaderboard('').findIndex(p => p.pseudo === getPseudo());
  return i < 0 ? null : i + 1; // rang du joueur connecté, null pour un invité
}
// joueurs de démo pour que le classement ne soit pas vide
// ponytail: faux comptes en dur ; à supprimer quand le classement viendra d'un serveur
const DEMO = [['MèmeLord', 12400, 'mixte'], ['PixelPaul', 10900, 'pixel'], ['Ouïe_Fine', 9300, 'son'], ['SoleilVert', 8100, 'associer'],
  ['Brumeux', 6700, 'mixte'], ['Grêlon', 5200, 'pixel'], ['Zéphyr', 4400, 'son'], ['ArcEnCiel', 3600, 'associer'],
  ['Tornade_92', 2500, 'pixel'], ['Bruine', 1700, 'mixte'], ['Canicule', 900, 'son'], ['Verglas', 400, 'associer']]
  .map(([pseudo, score, mode]) => ({ pseudo, score, mode, found: [] }));
// vidéo préférée des joueurs de démo (les vrais joueurs : leurs votes de la Battle)
const DEMO_FAV = { 'MèmeLord': 'fleurs', 'PixelPaul': 'champ', 'Ouïe_Fine': 'carte', 'SoleilVert': 'fleurs', 'Brumeux': 'mitige',
  'Grêlon': 'champ', 'Zéphyr': 'mieux', 'ArcEnCiel': 'pasmieux', 'Tornade_92': 'fleurs', 'Bruine': 'carte' };
// classement : un compte = une ligne, points additionnés (par mode si demandé). Les invités ne comptent pas.
function leaderboard(mode) {
  const by = {};
  for (const s of [...DEMO, ...getScores()]) {
    if (s.pseudo === 'Invité' || (mode && s.mode !== mode)) continue;
    const p = by[s.pseudo] ??= { pseudo: s.pseudo, points: 0, parties: 0, refs: 0, pixel: 0, son: 0, associer: 0, mixte: 0 };
    p.points += s.score; p.parties++; p.refs += (s.found || []).length; p[s.mode] = (p[s.mode] || 0) + s.score;
  }
  return Object.values(by).sort((a, b) => b.points - a.points);
}

// vidéos de notre Instagram pour la Battle de la semaine (miniatures) — à remplacer par la vraie banque
// les votes restent dans ce navigateur (meteog-battle) ; personne ne voit les totaux, ce sera pour la partie admin
const VIDEOS = [
  { id: 'champ', nom: 'Le champ', img: 'assets/battle/battle_1.jpg', txt: 'Vu d’en haut, ça ressemble à un mème. Mais lequel ?' },
  { id: 'fleurs', nom: 'Les fleurs', img: 'assets/battle/battle_2.jpg', txt: 'Le visage, les fleurs, le son derrière… tu l’as déjà vue passer.' },
  { id: 'mieux', nom: 'C’était mieux avant', img: 'assets/verdict_soleil_cetait_mieux_avant.svg', bg: 'jaune', txt: 'C’était mieux avant ? On a tranché en 30 secondes.' },
  { id: 'pasmieux', nom: 'C’était pas mieux', img: 'assets/verdict_orage_cetait_pas_mieux_avant.svg', bg: 'lavande', txt: 'Non, c’était pas mieux avant. La preuve en images.' },
  { id: 'mitige', nom: 'Avis mitigé', img: 'assets/verdict_nuageux_avis_mitige.svg', bg: 'menthe', txt: 'Avis mitigé sur un classique d’internet.' },
  { id: 'carte', nom: 'La météo des réfs', img: 'assets/01_carte_meteo.svg', bg: 'ciel', txt: 'La météo des réfs : ce qui tourne cette semaine.' },
];
const videoBg = v => v.bg ? `background:var(--${v.bg})` : `background-image:url(${v.img})`;
// vidéo préférée d'un joueur = celle qu'il a gardée le plus souvent
// ponytail: les votes ne sont connus que pour le joueur de ce navigateur ; un serveur les donnera pour tout le monde
function favVideo(pseudo) {
  if (pseudo !== getPseudo()) return VIDEOS.find(v => v.id === DEMO_FAV[pseudo]);
  const votes = store.get('meteog-battle', {});
  return VIDEOS.filter(v => votes[v.id]).sort((a, b) => votes[b.id] - votes[a.id])[0];
}

// menu burger (mobile) : ouvre / ferme la nav de l'en-tête
const head = document.querySelector('.top');
head.insertAdjacentHTML('beforeend', '<button class="burger" type="button" aria-label="Menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>');
const burger = head.querySelector('.burger');
burger.onclick = () => burger.setAttribute('aria-expanded', head.classList.toggle('open'));
head.querySelector('.nav').addEventListener('click', () => { head.classList.remove('open'); burger.setAttribute('aria-expanded', false); });

// pied de page : liens Instagram et TikTok sur toutes les pages
// ponytail: liens génériques, à remplacer par les vrais comptes MétéOG
document.querySelector('footer .wrap')?.insertAdjacentHTML('beforeend', `<div class="socials">
  <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram MétéOG"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/></svg></a>
  <a href="https://www.tiktok.com/" target="_blank" rel="noopener" aria-label="TikTok MétéOG"><svg viewBox="0 0 24 24"><path class="tt" d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.1-2.8V9a6.2 6.2 0 1 0 5.4 6.2V8.4a7.6 7.6 0 0 0 4.4 1.4V6.5a4.4 4.4 0 0 1-4.4-4.5z"/></svg></a>
</div>`);

// en-tête : fond plein dès qu'on défile
const bar = document.querySelector('.top');
const onScroll = () => bar.classList.toggle('scrolled', scrollY > 10);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// profil du joueur (avatar, bannière, bio, titre, vitrine), un par pseudo
const PROFIL_DEFAUT = { avatar: 'assets/METEOG_symbole.svg', banniere: 'ciel', titre: 'Chasseur de réfs', bio: '', vitrine: [] };
const getProfil = () => ({ ...PROFIL_DEFAUT, ...store.get('meteog-profil-' + getPseudo(), {}) });
const setProfil = p => store.set('meteog-profil-' + getPseudo(), p);

// connexion : un pseudo, gardé sur cet appareil
const dlg = document.createElement('dialog');
dlg.innerHTML = `
  <form method="dialog">
    <h2 class="outline">Connexion</h2>
    <p>Choisis un pseudo pour avoir ton compte et apparaître dans le classement. Version test : il reste sur cet appareil.</p>
    <label for="pseudo">Pseudo</label>
    <input id="pseudo" type="text" maxlength="16" autocomplete="nickname" required>
    <div class="row">
      <button class="btn jaune" value="ok">C’est parti</button>
      <button class="btn" value="" formnovalidate>Annuler</button>
    </div>
  </form>`;
document.body.append(dlg);
const openLogin = () => { dlg.returnValue = ''; dlg.querySelector('#pseudo').value = getPseudo(); dlg.showModal(); };
const loginBtn = document.querySelector('#login');
function paintLogin() {
  const p = getPseudo();
  loginBtn.innerHTML = p
    ? `<img class="mini-av" src="${getProfil().avatar}" alt=""><span class="long"></span><span class="short"></span>`
    : '<span class="long">Connexion</span><span class="short">Connexion</span>';
  if (p) { loginBtn.querySelector('.long').textContent = 'Mon compte'; loginBtn.querySelector('.short').textContent = 'Compte'; }
}
loginBtn.addEventListener('click', () => getPseudo() ? location.href = 'compte.html' : openLogin());
dlg.addEventListener('close', () => {
  if (dlg.returnValue !== 'ok') return;
  store.set('meteog-pseudo', dlg.querySelector('#pseudo').value.trim().slice(0, 16));
  location.href = 'compte.html';
});
paintLogin();
