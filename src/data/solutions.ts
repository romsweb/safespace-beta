// Contenu des landing pages solutions — une entrée = une page /solutions/<slug>.
// Chaque page cible une intention de recherche distincte (pas seulement un produit) :
// le H1, la meta et la FAQ portent le vocabulaire réellement tapé par les PME calédoniennes.

export interface Faq {
  q: string;
  a: string;
}

export interface Solution {
  slug: string;
  navLabel: string;
  navHint: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  h1: string;
  heroLead: string;
  problemTitle: string;
  problemPoints: string[];
  features: { title: string; desc: string }[];
  pricing: {
    from: string;
    unit: string;
    trial: string;
    ctaLabel: string;
  };
  localNote: string;
  faq: Faq[];
  related: string[];
  popular?: boolean;
}

export const solutions: Solution[] = [
  {
    slug: 'plan-reprise-activite',
    navLabel: 'Plan de Reprise d’Activité (PRA)',
    navHint: 'Vos serveurs redémarrent chez nous en moins de 2h',
    metaTitle: 'Plan de Reprise d’Activité (PRA) en Nouvelle-Calédonie | SAFESPACE by NOVATECH',
    metaDescription:
      'Ransomware, incendie, cyclone : vos serveurs redémarrent sur nos infrastructures en 2 à 4h. PRA testé régulièrement, runbook intégré, support calédonien. Dès 6 900 F HT/mois.',
    kicker: 'Continuité d’activité',
    h1: 'Votre entreprise redémarre en 2 à 4 heures. Quoi qu’il arrive.',
    heroLead:
      'Ransomware, incendie, panne majeure : avec un Plan de Reprise d’Activité SAFESPACE, vos serveurs critiques redémarrent sur nos infrastructures de secours — pendant que les autres comptent leurs pertes.',
    problemTitle: 'Sans PRA, une sauvegarde ne suffit pas',
    problemPoints: [
      'Restaurer des sauvegardes sur du matériel neuf prend des jours, parfois des semaines — le temps de commander, livrer et reconfigurer en Nouvelle-Calédonie.',
      'En 2024, 740 entreprises calédoniennes ont été partiellement ou totalement détruites : celles sans plan de reprise ont perdu des semaines d’activité.',
      'Une entreprise qui perd ses données critiques sans plan a 60 % de risques de fermer définitivement dans les 6 mois.',
    ],
    features: [
      { title: 'Redémarrage en 2-4h', desc: 'Vos machines virtuelles redémarrent sur notre infrastructure de secours, en Nouvelle-Calédonie ou à l’international selon votre choix.' },
      { title: 'Runbook intégré', desc: 'La procédure de bascule est écrite, jouée et tenue à jour : le jour J, personne n’improvise.' },
      { title: 'Tests réguliers', desc: 'Un PRA qui n’est pas testé n’existe pas. Nous simulons la bascule et vous remettons le rapport.' },
      { title: 'Infrastructure de secours dédiée', desc: 'Capacité réservée sur nos hébergements NC, Australie et France — vous choisissez la localisation.' },
      { title: 'Supervision quotidienne', desc: 'Les réplications sont surveillées chaque jour par notre équipe à Nouméa, en français.' },
      { title: 'Intervention d’urgence 24/7', desc: 'Un sinistre n’attend pas les heures ouvrées. Notre astreinte locale non plus.' },
    ],
    pricing: {
      from: '6 900 F HT',
      unit: 'par mois',
      trial: 'Essai gratuit 30 jours',
      ctaLabel: 'Planifier mon PRA',
    },
    localNote:
      'Infrastructure de secours disponible en Nouvelle-Calédonie (souveraineté locale), en Australie et en France. Bascule pilotée par notre équipe de Nouméa — pas par un support offshore.',
    faq: [
      {
        q: 'Quelle différence entre une sauvegarde et un PRA ?',
        a: 'La sauvegarde protège vos données ; le PRA protège votre activité. Avec une simple sauvegarde, il faut retrouver du matériel, réinstaller et restaurer — souvent plusieurs jours en Nouvelle-Calédonie. Avec un PRA, vos serveurs redémarrent directement sur notre infrastructure de secours en 2 à 4 heures.',
      },
      {
        q: 'Le délai de 2-4h est-il garanti ?',
        a: 'C’est l’objectif de reprise (RTO) que nous dimensionnons avec vous selon vos options : nombre de serveurs, volumétrie, fréquence de réplication. Il est validé par des tests de bascule réguliers dont vous recevez le compte rendu.',
      },
      {
        q: 'Où redémarrent nos serveurs — les données restent-elles en Nouvelle-Calédonie ?',
        a: 'Vous choisissez : notre infrastructure locale en Nouvelle-Calédonie, ou nos hébergements en Australie et en France. Beaucoup de clients combinent local (rapidité, souveraineté) et international (résilience cyclone/incendie).',
      },
      {
        q: 'Que se passe-t-il pendant un cyclone ou une coupure internet ?',
        a: 'Le PRA est justement conçu pour ces scénarios : les réplicas existent déjà hors de votre site. Si votre connexion tombe, vos équipes peuvent accéder aux serveurs redémarrés depuis n’importe quelle connexion — 4G comprise.',
      },
    ],
    related: ['sauvegarde-serveurs-nas', 'protection-edr-xdr-mdr', 'audit-securite'],
    popular: true,
  },
  {
    slug: 'sauvegarde-microsoft-365',
    navLabel: 'Sauvegarde Microsoft 365',
    navHint: 'Emails, OneDrive, SharePoint et Teams protégés',
    metaTitle: 'Sauvegarde Microsoft 365 en Nouvelle-Calédonie | SAFESPACE by NOVATECH',
    metaDescription:
      'Microsoft ne sauvegarde pas vos emails, OneDrive et SharePoint. Sauvegarde M365 indépendante, conservation illimitée, restauration granulaire, support à Nouméa. Dès 400 F HT/utilisateur/mois.',
    kicker: 'Sauvegarde cloud',
    h1: 'Microsoft ne sauvegarde pas votre Microsoft 365. Nous, si.',
    heroLead:
      'Suppression accidentelle, compte piraté, ransomware qui chiffre le SharePoint : sans sauvegarde indépendante, vos emails et documents M365 peuvent disparaître définitivement. SAFESPACE les copie chaque jour, hors de portée des attaquants.',
    problemTitle: 'Le malentendu qui coûte cher',
    problemPoints: [
      'Le contrat Microsoft est clair : la disponibilité du service est garantie, pas la récupération de vos données. La corbeille se vide définitivement après 30 à 93 jours.',
      'Un compte administrateur compromis peut supprimer emails, OneDrive et SharePoint de toute l’entreprise en quelques minutes.',
      'Les ransomwares modernes chiffrent aussi les fichiers synchronisés dans le cloud — la « copie OneDrive » est chiffrée avec le reste.',
    ],
    features: [
      { title: 'Sauvegarde automatique quotidienne', desc: 'Exchange, OneDrive, SharePoint et Teams — sans action de votre part, supervisée par notre équipe.' },
      { title: 'Conservation illimitée', desc: 'Retrouvez un email de l’an dernier ou un dossier supprimé il y a deux ans. Aucune limite de durée.' },
      { title: 'Restauration granulaire', desc: 'Un seul email, un fichier précis, une boîte entière : vous restaurez exactement ce qu’il faut, en quelques clics.' },
      { title: 'Restauration assistée', desc: 'Notre équipe de Nouméa fait la manipulation avec vous, en français, par téléphone ou WhatsApp.' },
      { title: 'Copie hors tenant', desc: 'Vos sauvegardes vivent hors de votre tenant Microsoft : un attaquant qui contrôle M365 ne peut pas les toucher.' },
      { title: 'Rapports de supervision', desc: 'Vous savez chaque semaine que vos sauvegardes ont réellement tourné — preuve à l’appui pour votre cyber-assurance.' },
    ],
    pricing: {
      from: '400 F HT',
      unit: 'par utilisateur / mois',
      trial: 'Essai gratuit 30 jours — sans carte bancaire',
      ctaLabel: 'Protéger mon Microsoft 365',
    },
    localNote:
      'Stockage des sauvegardes au choix : Nouvelle-Calédonie, Australie ou France. Support en français aux horaires calédoniens — pas de ticket perdu dans un centre offshore.',
    faq: [
      {
        q: 'Microsoft ne garde-t-il pas déjà mes données ?',
        a: 'Microsoft garantit la disponibilité du service, pas vos données : c’est le principe de « responsabilité partagée » inscrit dans le contrat. Les éléments supprimés sont définitivement purgés après 30 à 93 jours selon le cas, et Microsoft recommande lui-même une sauvegarde tierce.',
      },
      {
        q: 'Que couvre exactement la sauvegarde ?',
        a: 'Les boîtes Exchange (emails, calendriers, contacts), OneDrive, les sites SharePoint et les conversations/fichiers Teams. La conservation est illimitée dans le temps.',
      },
      {
        q: 'Combien de temps pour restaurer un email ou un fichier ?',
        a: 'Quelques minutes : la restauration est granulaire (un email, un fichier, un dossier ou une boîte complète) et notre équipe peut la faire avec vous par téléphone.',
      },
      {
        q: 'Où sont stockées les sauvegardes ?',
        a: 'Sur un stockage indépendant de Microsoft, localisé selon votre choix en Nouvelle-Calédonie, en Australie ou en France, chiffré en transit et au repos.',
      },
    ],
    related: ['securite-email', 'formation-anti-phishing', 'sauvegarde-serveurs-nas'],
  },
  {
    slug: 'sauvegarde-serveurs-nas',
    navLabel: 'Sauvegarde Serveurs & NAS',
    navHint: 'Externalisation sécurisée hors de vos murs',
    metaTitle: 'Sauvegarde externalisée Serveurs & NAS en Nouvelle-Calédonie | SAFESPACE',
    metaDescription:
      'Vos serveurs et NAS sauvegardés hors de vos murs : incendie, vol, ransomware ou cyclone ne peuvent plus tout emporter. Supervision quotidienne depuis Nouméa. Dès 4 000 F HT/mois.',
    kicker: 'Sauvegarde externalisée',
    h1: 'La sauvegarde qui survit à l’incendie de votre bâtiment',
    heroLead:
      'Un NAS dans le même bâtiment que le serveur n’est pas un plan : c’est un pari. SAFESPACE externalise chaque nuit vos données vers un stockage sécurisé, hors de vos murs et hors de portée d’un ransomware.',
    problemTitle: 'La copie locale meurt avec le site',
    problemPoints: [
      'Incendie, dégât des eaux, vol, émeute : tout ce qui détruit vos serveurs détruit aussi le NAS de sauvegarde posé à côté.',
      'Les ransomwares chiffrent en priorité les sauvegardes accessibles sur le réseau avant de chiffrer la production.',
      'Une sauvegarde qui échoue en silence depuis trois mois ne se découvre que le jour où on en a besoin.',
    ],
    features: [
      { title: 'Externalisation automatique', desc: 'Serveurs physiques, machines virtuelles, NAS et postes critiques répliqués chaque nuit vers notre stockage sécurisé.' },
      { title: 'Supervision quotidienne', desc: 'Chaque job est vérifié tous les matins par notre équipe à Nouméa. Un échec = une alerte traitée, pas un voyant ignoré.' },
      { title: 'Stockage immuable', desc: 'Des copies verrouillées qu’un ransomware ou un administrateur compromis ne peut ni chiffrer ni supprimer.' },
      { title: 'Multi-géographique', desc: 'Nouvelle-Calédonie, Australie, France : vous choisissez où vivent vos données — ou vous combinez.' },
      { title: 'Restauration rapide', desc: 'Un fichier, une VM complète ou un serveur entier, restaurés avec l’assistance de notre équipe.' },
      { title: 'Rapports automatiques', desc: 'Un état clair de vos sauvegardes, exploitable pour votre direction et votre cyber-assurance.' },
    ],
    pricing: {
      from: '4 000 F HT',
      unit: 'par mois',
      trial: 'Essai gratuit 30 jours',
      ctaLabel: 'Externaliser mes sauvegardes',
    },
    localNote:
      'Vos données transitent chiffrées et restent dans la zone géographique que vous choisissez. Restauration possible sur site à Nouméa, ou directement sur notre infrastructure si la vôtre a disparu.',
    faq: [
      {
        q: 'Mon NAS local ne suffit-il pas ?',
        a: 'Le NAS local est utile pour restaurer vite un fichier, mais il partage les risques du site : incendie, vol, surtension, ransomware. La règle du 3-2-1 impose au moins une copie hors site — c’est exactement ce que nous automatisons.',
      },
      {
        q: 'La connexion internet calédonienne suffit-elle pour externaliser ?',
        a: 'Oui : la première sauvegarde peut être amorcée localement, puis seuls les blocs modifiés partent chaque nuit (sauvegarde incrémentielle dédupliquée). Nos clients externalisent des téraoctets sur des liaisons standards.',
      },
      {
        q: 'Que se passe-t-il si mes serveurs sont détruits ?',
        a: 'Vos données sont restaurables sur du matériel neuf, ou — avec l’option PRA — vos serveurs redémarrent directement sur notre infrastructure en 2 à 4h, sans attendre une livraison de matériel.',
      },
      {
        q: 'Un ransomware peut-il chiffrer aussi la sauvegarde externalisée ?',
        a: 'Non : les copies sont stockées hors de votre réseau, sur un stockage immuable (WORM). Même avec des identifiants administrateur volés, elles ne peuvent être ni modifiées ni supprimées pendant la période de rétention.',
      },
    ],
    related: ['plan-reprise-activite', 'services-veeam', 'sauvegarde-microsoft-365'],
  },
  {
    slug: 'protection-edr-xdr-mdr',
    navLabel: 'Protection EDR • XDR • MDR',
    navHint: 'Détection et réponse aux ransomwares 24/7',
    metaTitle: 'Protection EDR / XDR / MDR contre les ransomwares | SAFESPACE Nouvelle-Calédonie',
    metaDescription:
      'L’antivirus ne suffit plus : détection comportementale EDR, corrélation XDR et équipe de réponse 24/7 (MDR) pour stopper les ransomwares avant le chiffrement. Dès 500 F HT/utilisateur/mois.',
    kicker: 'Cybersécurité active',
    h1: 'Stoppez le ransomware pendant qu’il se prépare, pas après',
    heroLead:
      'Une attaque moderne passe l’antivirus sans déclencher une seule alerte. L’EDR surveille les comportements — élévation de privilèges, chiffrement anormal, mouvements latéraux — et isole la machine avant que le SI ne tombe.',
    problemTitle: 'L’antivirus regarde les fichiers. L’attaquant, lui, n’en dépose plus.',
    problemPoints: [
      'Des dizaines de PME calédoniennes ont été victimes de ransomware — dont un fournisseur d’accès internet local. Toutes avaient un antivirus.',
      'Les attaques actuelles utilisent des outils légitimes (PowerShell, RDP, comptes volés) invisibles pour une détection par signatures.',
      'Entre l’intrusion et le chiffrement, il s’écoule en moyenne plusieurs jours : c’est la fenêtre où l’EDR fait la différence.',
    ],
    features: [
      { title: 'Surveillance continue des endpoints', desc: 'Processus, fichiers, connexions réseau : chaque poste et serveur est observé en temps réel.' },
      { title: 'Détection comportementale', desc: 'Chiffrement massif, élévation de privilèges, persistance : les comportements d’attaque sont bloqués, même inédits (zero-day).' },
      { title: 'Corrélation XDR', desc: 'Les signaux endpoints, cloud et réseau sont croisés pour voir l’attaque entière, pas des alertes isolées.' },
      { title: 'Quarantaine automatique', desc: 'Une machine compromise est isolée du réseau en quelques secondes, avant la propagation.' },
      { title: 'Option MDR 24/7', desc: 'Une équipe dédiée investigue et répond à toute heure — vous dormez, quelqu’un veille.' },
      { title: 'Guidage de restauration', desc: 'Couplé à vos sauvegardes SAFESPACE, le retour à la normale est orchestré, pas improvisé.' },
    ],
    pricing: {
      from: '500 F HT',
      unit: 'par utilisateur / mois',
      trial: 'Appel de qualification offert',
      ctaLabel: 'Évaluer ma protection',
    },
    localNote:
      'Déploiement et suivi par notre équipe de Nouméa, en français. L’option MDR ajoute une surveillance humaine 24/7 — précieuse quand l’attaque démarre un samedi à 3h du matin, heure de Nouméa.',
    faq: [
      {
        q: 'Quelle différence entre antivirus et EDR ?',
        a: 'L’antivirus compare les fichiers à une base de signatures connues. L’EDR observe les comportements du système en continu : il détecte une attaque qui n’utilise aucun fichier malveillant connu — le cas de la quasi-totalité des ransomwares actuels.',
      },
      {
        q: 'EDR, XDR, MDR : que choisir ?',
        a: 'L’EDR protège chaque machine. Le XDR corrèle les signaux de tout le SI (endpoints, cloud, réseau). Le MDR ajoute l’équipe humaine 24/7 qui investigue et répond. Une PME sans équipe informatique dédiée a généralement le meilleur rapport protection/coût avec l’EDR managé (MDR).',
      },
      {
        q: 'Est-ce lourd à déployer sur nos postes ?',
        a: 'Non : un agent léger installé à distance, sans interruption de travail. Le déploiement complet d’une PME se fait typiquement en quelques jours, accompagné par notre équipe.',
      },
      {
        q: 'Que se passe-t-il quand une menace est détectée ?',
        a: 'La machine est automatiquement isolée du réseau, l’alerte est investiguée (par votre équipe ou la nôtre en MDR), puis nous vous guidons pour l’éradication et la restauration éventuelle depuis vos sauvegardes.',
      },
    ],
    related: ['securite-email', 'formation-anti-phishing', 'plan-reprise-activite'],
  },
  {
    slug: 'securite-email',
    navLabel: 'SafeSpace Email Security',
    navHint: 'Phishing, malware et zero-day bloqués en temps réel',
    metaTitle: 'Sécurité Email & Anti-Phishing pour entreprises | SAFESPACE Nouvelle-Calédonie',
    metaDescription:
      'Le gilet pare-balles de votre messagerie : 7 couches anti-phishing, détection zero-day, SOC humain 24/7. Analyse en moins de 30 secondes. Dès 499 F HT/utilisateur/mois, essai 30 jours.',
    kicker: 'Sécurité email',
    h1: 'Le gilet pare-balles de votre messagerie',
    heroLead:
      '9 attaques sur 10 commencent par un email. SafeSpace Email Security intercepte phishing, malwares et menaces zero-day avant qu’ils n’atteignent la boîte de réception — en moins de 30 secondes par message.',
    problemTitle: 'Le filtre standard laisse passer l’essentiel',
    problemPoints: [
      'Les filtres intégrés de Microsoft 365 et Google bloquent le spam de masse, pas le phishing ciblé rédigé pour votre entreprise.',
      'Fausses factures, faux RIB, usurpation du dirigeant : les fraudes par email coûtent des millions de francs aux PME calédoniennes chaque année.',
      'Les pièces jointes zero-day n’ont par définition aucune signature : seule une analyse comportementale les arrête.',
    ],
    features: [
      { title: 'Analyse en moins de 30 secondes', desc: 'Chaque email est disséqué avant livraison, sans retard perceptible pour vos équipes.' },
      { title: '7 couches anti-phishing', desc: 'Réputation, usurpation de domaine, liens piégés, ingénierie sociale : chaque angle d’attaque a sa couche.' },
      { title: 'Détection zero-day par analyse CPU', desc: 'Les pièces jointes sont détonées et observées au niveau processeur — les menaces inconnues n’y échappent pas.' },
      { title: 'SOC humain inclus 24/7', desc: 'Les cas ambigus sont vérifiés par des analystes humains, pas seulement par un score automatique.' },
      { title: 'Protection des liens au clic', desc: 'Un lien devenu malveillant après livraison est bloqué au moment du clic.' },
      { title: 'Compatible M365 & Google', desc: 'Déploiement en quelques heures, sans changer de messagerie ni toucher aux MX records.' },
    ],
    pricing: {
      from: '499 F HT',
      unit: 'par utilisateur / mois',
      trial: '30 jours d’essai gratuit',
      ctaLabel: 'Protéger mes emails',
    },
    localNote:
      'Paramétrage et accompagnement par notre équipe de Nouméa. Couplé à la Formation Anti-Phishing, vous traitez la menace technique et le facteur humain en même temps.',
    faq: [
      {
        q: 'Microsoft 365 n’a-t-il pas déjà un anti-phishing ?',
        a: 'Les protections incluses arrêtent le spam générique. Le phishing ciblé — celui qui imite votre banque locale, un fournisseur ou votre dirigeant — passe régulièrement. Cette solution ajoute des couches spécialisées et une vérification humaine que les filtres standards n’ont pas.',
      },
      {
        q: 'Les emails sont-ils retardés par l’analyse ?',
        a: 'Non : l’analyse complète prend moins de 30 secondes par message, imperceptible à l’usage.',
      },
      {
        q: 'Que devient un email détecté comme malveillant ?',
        a: 'Il est mis en quarantaine avant d’atteindre la boîte de réception. Les administrateurs reçoivent un rapport, et le SOC peut libérer un faux positif en quelques minutes.',
      },
      {
        q: 'Le déploiement est-il compliqué ?',
        a: 'Quelques heures, via l’API Microsoft 365 ou Google Workspace, sans modification des MX et sans interruption du courrier. Notre équipe s’en charge avec vous.',
      },
    ],
    related: ['formation-anti-phishing', 'protection-edr-xdr-mdr', 'sauvegarde-microsoft-365'],
  },
  {
    slug: 'formation-anti-phishing',
    navLabel: 'Formation & Anti-Phishing',
    navHint: 'Transformez vos équipes en première ligne de défense',
    metaTitle: 'Formation Anti-Phishing & Sensibilisation Cybersécurité | SAFESPACE Nouvelle-Calédonie',
    metaDescription:
      'Simulations de phishing réalistes et locales, micro-formations vidéo de 3 minutes, service 100 % géré. Réduisez le risque humain, prouvez-le à votre cyber-assurance. Dès 250 F HT/utilisateur/mois.',
    kicker: 'Facteur humain',
    h1: 'Votre meilleur pare-feu, ce sont vos équipes',
    heroLead:
      'La quasi-totalité des intrusions commence par un clic. Nous entraînons vos collaborateurs avec de vraies simulations de phishing — écrites avec les codes locaux — et des micro-formations de 3 minutes qu’ils regardent vraiment.',
    problemTitle: 'Un seul clic suffit',
    problemPoints: [
      'Le phishing qui fonctionne en Nouvelle-Calédonie parle OPT, provinces, banques locales et coutumes d’entreprise — pas les templates génériques traduits.',
      'Une formation annuelle en salle est oubliée en trois semaines ; le réflexe se construit par la répétition courte.',
      'Les cyber-assurances exigent désormais la preuve d’un programme de sensibilisation actif.',
    ],
    features: [
      { title: 'Simulations réalistes et locales', desc: 'Des campagnes de phishing simulées, contextualisées Nouvelle-Calédonie, envoyées à intervalles imprévisibles.' },
      { title: 'Micro-formations de 3 minutes', desc: 'Des vidéos courtes et ludiques déclenchées au bon moment — notamment juste après un clic malheureux.' },
      { title: '100 % géré', desc: 'Nous concevons, envoyons, mesurons et relançons. Zéro charge mentale pour vous.' },
      { title: 'Rapports pour cyber-assurance', desc: 'Taux de clic, progression, couverture : la preuve documentée que votre programme existe et fonctionne.' },
      { title: 'Progression mesurée', desc: 'Le taux de clic moyen chute drastiquement dès les premiers mois — vous le voyez, chiffres à l’appui.' },
      { title: 'Sans stigmatisation', desc: 'L’objectif est le réflexe collectif, pas la chasse au coupable : pédagogie, jamais de sanction.' },
    ],
    pricing: {
      from: '250 F HT',
      unit: 'par utilisateur / mois',
      trial: 'Test de phishing gratuit',
      ctaLabel: 'Lancer un test gratuit',
    },
    localNote:
      'Campagnes rédigées en français avec les références locales qui rendent le test crédible. Restitution en clair à votre direction par notre équipe de Nouméa.',
    faq: [
      {
        q: 'Nos équipes vont-elles mal le prendre ?',
        a: 'Non, si c’est bien amené : les campagnes sont pédagogiques et anonymisées au niveau individuel dans les restitutions. L’expérience montre que les équipes prennent le jeu au sérieux et que le taux de clic devient un indicateur d’équipe suivi avec fierté.',
      },
      {
        q: 'Combien de temps cela prend-il à nos collaborateurs ?',
        a: 'Quelques minutes par mois : les simulations arrivent dans le flux normal des emails, et les micro-formations durent 3 minutes. C’est la répétition courte qui crée le réflexe, pas les sessions marathon.',
      },
      {
        q: 'Le test de phishing gratuit, comment ça marche ?',
        a: 'Nous lançons une campagne test sur vos équipes, sans préavis, et vous remettons le taux de clic réel de votre entreprise. C’est souvent le déclic pour la direction.',
      },
      {
        q: 'Est-ce reconnu par les cyber-assurances ?',
        a: 'Oui : les rapports de campagne documentent précisément votre programme de sensibilisation, une exigence de plus en plus fréquente des assureurs cyber.',
      },
    ],
    related: ['securite-email', 'protection-edr-xdr-mdr', 'audit-securite'],
  },
  {
    slug: 'services-veeam',
    navLabel: 'Services Veeam VCSP',
    navHint: 'Licences, stockage cloud et supervision pour pros IT',
    metaTitle: 'Services Veeam VCSP — Licences, Cloud Connect & Supervision | SAFESPACE NC',
    metaDescription:
      'Partenaire Veeam VCSP en Nouvelle-Calédonie : licences en mode locatif (VUL/SPLA), stockage S3 externalisé multi-géographique, supervision managée de vos jobs et tests SureBackup.',
    kicker: 'Pour les professionnels IT',
    h1: 'Votre infrastructure Veeam, sans les contraintes',
    heroLead:
      'Prestataires IT, DSI, revendeurs : licences Veeam à la demande, cible de sauvegarde S3 hors site et supervision quotidienne de vos jobs — opérées depuis Nouméa par un partenaire VCSP.',
    problemTitle: 'Veeam est excellent. L’opérer seul, moins.',
    problemPoints: [
      'Les licences perpétuelles immobilisent du capital et se retrouvent sur- ou sous-dimensionnées à chaque évolution du parc.',
      'Sans cible hors site, une infrastructure Veeam locale reste vulnérable à l’incendie, au vol et au chiffrement des dépôts.',
      'Superviser des dizaines de jobs chaque matin est le travail que tout le monde repousse — jusqu’au jour où une restauration échoue.',
    ],
    features: [
      { title: 'Licences en mode locatif', desc: 'VUL et SPLA à la demande : payez ce que vous consommez, ajustez chaque mois.' },
      { title: 'Backup-as-a-Service S3', desc: 'Une cible S3 immuable multi-géographique (NC, Australie, France) directement branchée sur vos jobs.' },
      { title: 'Supervision quotidienne managée', desc: 'Nos ingénieurs vérifient vos jobs chaque matin et traitent les échecs avant qu’ils ne comptent.' },
      { title: 'Tests SureBackup automatisés', desc: 'Vos restaurations sont testées automatiquement : vous savez qu’elles fonctionnent, pas seulement qu’elles existent.' },
      { title: 'Expertise VCSP locale', desc: 'Un interlocuteur certifié Veeam dans votre fuseau horaire, en français.' },
      { title: 'Marque blanche possible', desc: 'Revendeurs : proposez le service à vos propres clients avec notre infrastructure en coulisses.' },
    ],
    pricing: {
      from: 'Sur devis',
      unit: 'selon consommation',
      trial: 'Audit gratuit de votre infra Veeam',
      ctaLabel: 'Demander un devis',
    },
    localNote:
      'Nous sommes fournisseur de services cloud Veeam (VCSP) : licences, stockage et supervision opérés localement, avec la réactivité d’une équipe basée à Nouméa.',
    faq: [
      {
        q: 'Pourquoi passer en licences locatives (VUL/SPLA) ?',
        a: 'Zéro capital immobilisé, un coût mensuel aligné sur le parc réel, et les mises à jour majeures incluses. Quand votre parc évolue, la licence suit — dans les deux sens.',
      },
      {
        q: 'Puis-je garder mon serveur Veeam actuel ?',
        a: 'Oui : nos services se branchent sur votre infrastructure existante. La cible S3 s’ajoute comme dépôt, la supervision se fait sur vos jobs actuels, sans migration.',
      },
      {
        q: 'Le dépôt S3 est-il protégé contre un ransomware ?',
        a: 'Oui : l’immuabilité S3 (Object Lock) rend les points de restauration impossibles à modifier ou supprimer pendant la rétention, même avec des identifiants compromis.',
      },
      {
        q: 'Que comprend l’audit gratuit ?',
        a: 'Une revue de votre configuration Veeam : versions, stratégie 3-2-1, immuabilité, jobs en échec, points de restauration réellement testables. Vous repartez avec un plan d’action chiffré.',
      },
    ],
    related: ['sauvegarde-serveurs-nas', 'plan-reprise-activite', 'audit-securite'],
  },
  {
    slug: 'audit-securite',
    navLabel: 'Audit de Sécurité & Conformité',
    navHint: 'État des lieux complet + plan d’action chiffré',
    metaTitle: 'Audit Cybersécurité & Conformité RGPD en Nouvelle-Calédonie | SAFESPACE',
    metaDescription:
      'État des lieux complet de votre sécurité : vulnérabilités critiques, exposition, conformité RGPD, test de phishing. Rapport priorisé et chiffré. Pré-audit gratuit d’une heure à Nouméa.',
    kicker: 'Diagnostic & conformité',
    h1: 'Savez-vous vraiment où vous en êtes ?',
    heroLead:
      'Avant d’investir dans la sécurité, mesurez. Notre audit dresse l’état réel de votre posture — actifs exposés, vulnérabilités critiques, conformité RGPD — et le traduit en plan d’action priorisé et chiffré.',
    problemTitle: 'On ne protège pas ce qu’on ne voit pas',
    problemPoints: [
      'La plupart des intrusions exploitent des faiblesses connues mais jamais inventoriées : un VPN oublié, un serveur non patché, un compte parti avec un prestataire.',
      'La conformité RGPD s’applique aussi en Nouvelle-Calédonie — et les clients comme les assureurs la demandent de plus en plus.',
      'Sans priorisation, les budgets sécurité partent dans les gadgets pendant que la porte d’entrée reste ouverte.',
    ],
    features: [
      { title: 'Inventaire des actifs et expositions', desc: 'Ce qui est visible depuis internet, ce qui est accessible en interne, ce qui a été oublié.' },
      { title: 'Analyse des vulnérabilités critiques', desc: 'Scan et revue manuelle des faiblesses réellement exploitables, pas une liste brute de CVE.' },
      { title: 'Évaluation RGPD et conformité locale', desc: 'Registre, bases légales, sous-traitants, durées de conservation : où vous en êtes, quoi corriger d’abord.' },
      { title: 'Test de phishing réel', desc: 'Une simulation sur vos équipes pour mesurer le facteur humain, pas le supposer.' },
      { title: 'Rapport priorisé et chiffré', desc: 'Chaque recommandation avec son impact, son effort et son coût : votre feuille de route sécurité.' },
      { title: 'Restitution à la direction', desc: 'Présentation en clair, sans jargon, pour décider en connaissance de cause.' },
    ],
    pricing: {
      from: 'Sur devis',
      unit: 'selon périmètre',
      trial: 'Pré-audit gratuit — 1h de diagnostic',
      ctaLabel: 'Planifier mon audit',
    },
    localNote:
      'Audit mené par notre équipe de Nouméa, sur site ou à distance, avec une connaissance concrète du contexte calédonien : opérateurs locaux, contraintes de connectivité, réalités des PME du territoire.',
    faq: [
      {
        q: 'Que comprend le pré-audit gratuit d’une heure ?',
        a: 'Un entretien structuré sur votre infrastructure, vos sauvegardes, vos accès et votre exposition, suivi d’un premier avis écrit sur vos trois risques majeurs. Sans engagement.',
      },
      {
        q: 'L’audit va-t-il perturber notre activité ?',
        a: 'Non : les scans sont planifiés en dehors des heures critiques et le test de phishing est invisible pour l’activité. La partie entretiens mobilise vos équipes quelques heures au total.',
      },
      {
        q: 'Le RGPD s’applique-t-il vraiment en Nouvelle-Calédonie ?',
        a: 'Oui — la loi Informatique et Libertés modifiée, qui transpose le RGPD, s’applique en Nouvelle-Calédonie. Et au-delà de l’obligation, vos clients métropolitains et vos assureurs l’exigent contractuellement.',
      },
      {
        q: 'Et après l’audit ?',
        a: 'Vous êtes libre : le rapport est actionnable par n’importe quel prestataire. Beaucoup de clients nous confient ensuite les priorités — sauvegarde, PRA, EDR — mais le rapport vous appartient.',
      },
    ],
    related: ['plan-reprise-activite', 'protection-edr-xdr-mdr', 'formation-anti-phishing'],
  },
];

export function getSolution(slug: string): Solution {
  const s = solutions.find((x) => x.slug === slug);
  if (!s) throw new Error(`Solution inconnue: ${slug}`);
  return s;
}
