export type NewsSource = {
  name: string;
  url: string;
  role: string;
};

export type Story = {
  kind?: "pilot" | "live";
  slug: string;
  category: string;
  time: string;
  updated: string;
  title: string;
  summary: string;
  sources: number;
  tone: string;
  source: string;
  sourceUrl: string;
  image: string;
  imageCredit: string;
  imageSourceUrl: string;
  imageLicense: string;
  imageLicenseUrl: string;
  points: string[];
  articleSummary: string[];
  coverageSources: NewsSource[];
};

const featuredStories: Story[] = [
  {
    slug: "energy-costs-household-budget",
    category: "Οικονομία",
    time: "12 λεπτά",
    updated: "Σήμερα, 14:20",
    title: "Νέα δεδομένα για τις τιμές ενέργειας και τον οικογενειακό προϋπολογισμό",
    summary: "Οι ανακοινώσεις, οι πρώτες αντιδράσεις της αγοράς και όσα αλλάζουν για νοικοκυριά και επιχειρήσεις — σε μία σύντομη εικόνα.",
    sources: 8,
    tone: "Ισορροπημένη κάλυψη",
    source: "ΡΑΑΕΥ",
    sourceUrl: "https://www.raaey.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Heraklion_Kohlekraftwerk.jpg",
    imageCredit: "Φωτογραφία: Oliver Deisenroth · Ηράκλειο Κρήτης",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Heraklion_Kohlekraftwerk.jpg",
    imageLicense: "CC BY-SA 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    points: [
      "Οι μεταβολές στις τιμές ενέργειας επηρεάζουν διαφορετικά κάθε κατηγορία κατανάλωσης.",
      "Τα νοικοκυριά χρειάζεται να συγκρίνουν το συνολικό κόστος και όχι μόνο την αρχική τιμή.",
      "Οι επίσημες ανακοινώσεις και οι τιμοκατάλογοι των παρόχων παραμένουν οι βασικές πηγές επιβεβαίωσης.",
    ],
    articleSummary: [
      "Η ενεργειακή δαπάνη παραμένει ένα από τα βασικά ζητήματα για τα ελληνικά νοικοκυριά, καθώς η τελική επιβάρυνση δεν εξαρτάται μόνο από την ονομαστική τιμή της κιλοβατώρας. Πάγια, ρυθμιζόμενες χρεώσεις, κατανάλωση και τύπος τιμολογίου επηρεάζουν το ποσό που εμφανίζεται στον λογαριασμό.",
      "Οι καταναλωτές χρειάζεται να συγκρίνουν τις διαθέσιμες επιλογές με βάση το συνολικό κόστος και τους όρους κάθε προγράμματος. Μία χαμηλή αρχική τιμή μπορεί να συνοδεύεται από διαφορετικές προϋποθέσεις, διάρκεια ή μηχανισμό μεταβολής, γι’ αυτό η σύγκριση πρέπει να γίνεται πάνω σε πραγματικά δεδομένα κατανάλωσης.",
      "Η εικόνα μπορεί να αλλάζει μέσα στον μήνα, ανάλογα με τις τιμές της χονδρεμπορικής αγοράς και τις ανακοινώσεις των παρόχων. Για οριστική επιβεβαίωση, ο αναγνώστης πρέπει να συμβουλεύεται τις επίσημες ανακοινώσεις, τα εργαλεία σύγκρισης και το πρωτότυπο υλικό των πηγών.",
    ],
    coverageSources: [
      { name: "ΡΑΑΕΥ", url: "https://www.raaey.gr/", role: "Πρωτογενής πηγή" },
      { name: "Ναυτεμπορική", url: "https://www.naftemporiki.gr/", role: "Οικονομική κάλυψη" },
      { name: "Καθημερινή", url: "https://www.kathimerini.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "parliament-public-administration",
    category: "Πολιτική",
    time: "24 λεπτά",
    updated: "Σήμερα, 14:08",
    title: "Στη Βουλή η νέα συζήτηση για τη λειτουργία του Δημοσίου",
    summary: "Τα βασικά σημεία της πρότασης και πού συμφωνούν ή διαφωνούν τα κόμματα.",
    sources: 11,
    tone: "Πολλαπλές οπτικές",
    source: "Βουλή των Ελλήνων",
    sourceUrl: "https://www.hellenicparliament.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Attica_06-13_Athens_10_Parliament.jpg",
    imageCredit: "Φωτογραφία: A.Savin, Wikipedia · Βουλή των Ελλήνων",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Attica_06-13_Athens_10_Parliament.jpg",
    imageLicense: "CC BY-SA 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    points: [
      "Η συζήτηση εστιάζει στην ταχύτητα εξυπηρέτησης και στη διαφάνεια των διαδικασιών.",
      "Τα κόμματα διαφωνούν ως προς το χρονοδιάγραμμα και τον τρόπο εφαρμογής.",
      "Η τελική μορφή θα προκύψει μετά την ολοκλήρωση της κοινοβουλευτικής διαδικασίας.",
    ],
    articleSummary: [
      "Η κοινοβουλευτική συζήτηση αφορά αλλαγές στη λειτουργία της δημόσιας διοίκησης, με έμφαση στην ταχύτερη εξυπηρέτηση, την ψηφιοποίηση διαδικασιών και τη δυνατότητα καλύτερης παρακολούθησης των αιτημάτων των πολιτών. Οι προτάσεις βρίσκονται ακόμη σε στάδιο επεξεργασίας και δεν αποτελούν οριστική απόφαση.",
      "Οι πολιτικές τοποθετήσεις συγκλίνουν στην ανάγκη περιορισμού της γραφειοκρατίας, αλλά διαφέρουν ως προς το χρονοδιάγραμμα, το κόστος και τις εγγυήσεις εφαρμογής. Ιδιαίτερη σημασία έχουν η προστασία προσωπικών δεδομένων, η πρόσβαση πολιτών που δεν χρησιμοποιούν ψηφιακά μέσα και η λογοδοσία των υπηρεσιών.",
      "Τα επόμενα βήματα εξαρτώνται από την πορεία της πρότασης στις αρμόδιες επιτροπές και την τελική ψηφοφορία. Μέχρι τότε, οι ακριβείς ρυθμίσεις πρέπει να επιβεβαιώνονται από τα πρακτικά και τα επίσημα έγγραφα της Βουλής.",
    ],
    coverageSources: [
      { name: "Βουλή των Ελλήνων", url: "https://www.hellenicparliament.gr/", role: "Πρωτογενής πηγή" },
      { name: "ΕΡΤ News", url: "https://www.ertnews.gr/", role: "Δημόσια ενημέρωση" },
      { name: "in.gr", url: "https://www.in.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "greek-businesses-adopt-ai",
    category: "Τεχνολογία",
    time: "38 λεπτά",
    updated: "Σήμερα, 13:54",
    title: "Οι ελληνικές επιχειρήσεις επιταχύνουν την υιοθέτηση εργαλείων AI",
    summary: "Πού επενδύουν, ποιες ειδικότητες αναζητούν και τι προβληματίζει τους εργαζομένους.",
    sources: 6,
    tone: "Ανάλυση αγοράς",
    source: "Υπουργείο Ψηφιακής Διακυβέρνησης",
    sourceUrl: "https://www.gov.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Staff_meeting.jpg",
    imageCredit: "Φωτογραφία: Robert Scoble · Ενδεικτική εικόνα εργασιακής συνάντησης",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Staff_meeting.jpg",
    imageLicense: "CC BY 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    points: [
      "Οι πρώτες εφαρμογές επικεντρώνονται στην εξυπηρέτηση πελατών και στην ανάλυση δεδομένων.",
      "Η ζήτηση αυξάνεται για ανθρώπους που συνδυάζουν τεχνολογικές και επιχειρηματικές γνώσεις.",
      "Προστασία δεδομένων, ακρίβεια και ανθρώπινη εποπτεία παραμένουν βασικές προϋποθέσεις.",
    ],
    articleSummary: [
      "Όλο και περισσότερες ελληνικές επιχειρήσεις εξετάζουν εργαλεία τεχνητής νοημοσύνης για την εξυπηρέτηση πελατών, την ανάλυση εγγράφων, την παραγωγή περιεχομένου και την επεξεργασία δεδομένων. Οι περισσότερες εφαρμογές ξεκινούν ως περιορισμένα πιλοτικά έργα και επεκτείνονται μόνο όταν αποδειχθεί ότι προσφέρουν μετρήσιμο όφελος.",
      "Η μετάβαση δημιουργεί ζήτηση για στελέχη που μπορούν να συνδέσουν την τεχνολογία με πραγματικές επιχειρηματικές ανάγκες. Παράλληλα, οι εργαζόμενοι χρειάζονται εκπαίδευση ώστε να ελέγχουν τα αποτελέσματα των συστημάτων και να γνωρίζουν πότε μία αυτοματοποιημένη απάντηση δεν είναι αρκετά αξιόπιστη.",
      "Προστασία δεδομένων, ασφάλεια, πνευματικά δικαιώματα και ανθρώπινη εποπτεία αποτελούν βασικές προϋποθέσεις. Η χρήση AI δεν καταργεί την ευθύνη της επιχείρησης για τις αποφάσεις και το περιεχόμενο που παράγεται στο όνομά της.",
    ],
    coverageSources: [
      { name: "gov.gr", url: "https://www.gov.gr/", role: "Πρωτογενής πηγή" },
      { name: "Capital", url: "https://www.capital.gr/", role: "Επιχειρηματική κάλυψη" },
      { name: "CNN Greece", url: "https://www.cnn.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "urban-transport-changes",
    category: "Κοινωνία",
    time: "51 λεπτά",
    updated: "Σήμερα, 13:41",
    title: "Πώς οργανώνονται οι μετακινήσεις στις μεγάλες πόλεις αυτή την εβδομάδα",
    summary: "Ένα πρακτικό σημείωμα με τις σημαντικότερες αλλαγές και εναλλακτικές διαδρομές.",
    sources: 5,
    tone: "Χρήσιμη ενημέρωση",
    source: "ΟΑΣΑ",
    sourceUrl: "https://www.oasa.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Athens_Metro_Train.jpg",
    imageCredit: "Φωτογραφία: Bobby H · Συρμός Μετρό Αθηνών",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Athens_Metro_Train.jpg",
    imageLicense: "CC BY-SA 2.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    points: [
      "Οι επιβάτες καλούνται να ελέγχουν τις επίσημες ενημερώσεις πριν από τη διαδρομή τους.",
      "Σε ορισμένα σημεία προβλέπονται προσωρινές τροποποιήσεις και εναλλακτικές συνδέσεις.",
      "Οι ώρες και οι διαδρομές μπορεί να αλλάξουν μέσα στην ημέρα.",
    ],
    articleSummary: [
      "Οι μετακινήσεις στις μεγάλες πόλεις μπορεί να επηρεάζονται από προγραμματισμένες εργασίες, προσωρινές κυκλοφοριακές ρυθμίσεις και αλλαγές στα δρομολόγια. Οι ανακοινώσεις συχνά διαφοροποιούνται ανά γραμμή και χρονική ζώνη, επομένως μία γενική ενημέρωση δεν καλύπτει απαραίτητα κάθε διαδρομή.",
      "Οι επιβάτες είναι χρήσιμο να ελέγχουν την επίσημη πληροφόρηση λίγο πριν αναχωρήσουν και να προβλέπουν περισσότερο χρόνο για μετεπιβιβάσεις. Όπου υπάρχουν προσωρινές διακοπές, οι φορείς μπορεί να προτείνουν εναλλακτικές γραμμές λεωφορείων ή διαφορετικούς σταθμούς.",
      "Επειδή οι ρυθμίσεις μπορούν να μεταβληθούν μέσα στην ημέρα, η σελίδα παρουσιάζει τη συνολική εικόνα αλλά παραπέμπει πάντα στις ανακοινώσεις του αρμόδιου οργανισμού. Η ώρα τελευταίας ενημέρωσης αποτελεί κρίσιμο στοιχείο για την αξιολόγηση κάθε πληροφορίας.",
    ],
    coverageSources: [
      { name: "ΟΑΣΑ", url: "https://www.oasa.gr/", role: "Πρωτογενής πηγή" },
      { name: "ΕΡΤ News", url: "https://www.ertnews.gr/", role: "Ειδησεογραφική κάλυψη" },
      { name: "News 24/7", url: "https://www.news247.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "international-developments-greece",
    category: "Κόσμος",
    time: "1 ώρα",
    updated: "Σήμερα, 13:32",
    title: "Οι διεθνείς εξελίξεις που επηρεάζουν άμεσα την Ελλάδα",
    summary: "Η ευρωπαϊκή ατζέντα, οι αγορές και η διπλωματία σε μια σύντομη επισκόπηση.",
    sources: 14,
    tone: "Διεθνής κάλυψη",
    source: "Ευρωπαϊκή Επιτροπή",
    sourceUrl: "https://commission.europa.eu/index_el",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/14_EU_Member_Flags_in_front_of_European_Parliament_in_Brussels.jpg",
    imageCredit: "Φωτογραφία: Marek Ślusarczyk · Ευρωπαϊκό Κοινοβούλιο",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:14_EU_Member_Flags_in_front_of_European_Parliament_in_Brussels.jpg",
    imageLicense: "CC BY 3.0",
    imageLicenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    points: [
      "Οι ευρωπαϊκές αποφάσεις επηρεάζουν την οικονομία, την ενέργεια και τη μεταναστευτική πολιτική.",
      "Οι αγορές παρακολουθούν τις νέες εκτιμήσεις και τις διπλωματικές εξελίξεις.",
      "Η εικόνα εξελίσσεται και απαιτεί σύγκριση επίσημων και διεθνών πηγών.",
    ],
    articleSummary: [
      "Οι διεθνείς εξελίξεις μπορούν να επηρεάσουν άμεσα την Ελλάδα μέσω των τιμών ενέργειας, του εμπορίου, των ευρωπαϊκών αποφάσεων και της περιφερειακής ασφάλειας. Η επίδραση δεν είναι πάντοτε άμεση· συχνά περνά μέσα από τις αγορές, τις μεταφορές ή τις κοινές πολιτικές της Ευρωπαϊκής Ένωσης.",
      "Η παρακολούθηση διαφορετικών πηγών είναι απαραίτητη, επειδή κάθε μέσο δίνει έμφαση σε διαφορετικές πλευρές του ίδιου γεγονότος. Οι επίσημες ανακοινώσεις προσφέρουν την πρωτογενή θέση των θεσμών, ενώ η δημοσιογραφική κάλυψη προσθέτει αντιδράσεις, πλαίσιο και πιθανές συνέπειες.",
      "Η κατάσταση μπορεί να αλλάξει γρήγορα, ιδιαίτερα σε θέματα διπλωματίας και αγορών. Για αυτό η σύνοψη ενημερώνεται όταν εμφανίζονται νέα επιβεβαιωμένα στοιχεία και διατηρεί συνδέσμους προς όλες τις αρχικές δημοσιεύσεις.",
    ],
    coverageSources: [
      { name: "Ευρωπαϊκή Επιτροπή", url: "https://commission.europa.eu/index_el", role: "Πρωτογενής πηγή" },
      { name: "BBC News", url: "https://www.bbc.com/news", role: "Διεθνής κάλυψη" },
      { name: "Politico Europe", url: "https://www.politico.eu/", role: "Ευρωπαϊκή κάλυψη" },
    ],
  },
  {
    slug: "tourism-season-local-economy",
    category: "Οικονομία",
    time: "1 ώρα",
    updated: "Σήμερα, 13:18",
    title: "Τουρισμός και τοπική οικονομία: οι δείκτες που αξίζει να παρακολουθούμε",
    summary: "Αφίξεις, διανυκτερεύσεις και έσοδα δεν κινούνται πάντα μαζί. Η σύντομη εικόνα των στοιχείων και των επιφυλάξεων της αγοράς.",
    sources: 7,
    tone: "Στοιχεία και πλαίσιο",
    source: "Τράπεζα της Ελλάδος",
    sourceUrl: "https://www.bankofgreece.gr/",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία παραλίας · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/b723cf961d3e",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Οι αφίξεις από μόνες τους δεν αποτυπώνουν τη συνολική οικονομική επίδραση.",
      "Διανυκτερεύσεις, μέση δαπάνη και εποχικότητα συμπληρώνουν την εικόνα.",
      "Τα επίσημα δεδομένα πρέπει να διαβάζονται μαζί με τις τοπικές συνθήκες.",
    ],
    articleSummary: [
      "Η πορεία του τουρισμού αποτυπώνεται σε περισσότερους από έναν δείκτες. Οι αφίξεις δείχνουν τον όγκο των επισκεπτών, ενώ οι διανυκτερεύσεις και η ταξιδιωτική δαπάνη βοηθούν να εκτιμηθεί καλύτερα η επίδραση στις επιχειρήσεις και στις τοπικές οικονομίες.",
      "Η σύγκριση στοιχείων από την Τράπεζα της Ελλάδος, την ΕΛΣΤΑΤ και τους επαγγελματικούς φορείς περιορίζει τα βιαστικά συμπεράσματα. Η σύνοψη αποτελεί ενημερωτικό πλαίσιο και τα τελικά μεγέθη επιβεβαιώνονται στις επίσημες δημοσιεύσεις.",
    ],
    coverageSources: [
      { name: "Τράπεζα της Ελλάδος", url: "https://www.bankofgreece.gr/", role: "Πρωτογενή οικονομικά στοιχεία" },
      { name: "ΕΛΣΤΑΤ", url: "https://www.statistics.gr/", role: "Επίσημα στατιστικά" },
      { name: "Money Review", url: "https://www.moneyreview.gr/", role: "Οικονομική κάλυψη" },
      { name: "Ναυτεμπορική", url: "https://www.naftemporiki.gr/", role: "Ανάλυση αγοράς" },
    ],
  },
  {
    slug: "digital-services-citizen-state",
    category: "Πολιτική",
    time: "1 ώρα",
    updated: "Σήμερα, 13:06",
    title: "Ψηφιακές υπηρεσίες του Δημοσίου: τι αλλάζει για την εξυπηρέτηση του πολίτη",
    summary: "Οι νέες διαδικασίες, τα σημεία που χρειάζονται προσοχή και η πολιτική συζήτηση γύρω από πρόσβαση και προσωπικά δεδομένα.",
    sources: 9,
    tone: "Θεσμική σύγκριση",
    source: "gov.gr",
    sourceUrl: "https://www.gov.gr/",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία δημόσιου κτιρίου · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/c627a92ad1ab",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Η ψηφιοποίηση μπορεί να μειώσει τον χρόνο ολοκλήρωσης συχνών διαδικασιών.",
      "Η φυσική εξυπηρέτηση παραμένει κρίσιμη για όσους δεν έχουν εύκολη ψηφιακή πρόσβαση.",
      "Η προστασία δεδομένων και η σαφής ενημέρωση αποτελούν βασικά σημεία ελέγχου.",
    ],
    articleSummary: [
      "Η διεύρυνση των ψηφιακών υπηρεσιών του Δημοσίου στοχεύει σε λιγότερες μετακινήσεις, ταχύτερη διεκπεραίωση και καλύτερη παρακολούθηση των αιτημάτων. Η πραγματική αποτελεσματικότητα, όμως, εξαρτάται από τη διασύνδεση των υπηρεσιών και τη σαφήνεια των οδηγιών.",
      "Η πολιτική συζήτηση αφορά επίσης την ισότιμη πρόσβαση, την υποστήριξη πολιτών με περιορισμένες ψηφιακές δεξιότητες και την ασφάλεια των προσωπικών δεδομένων. Οι δεσμευτικές λεπτομέρειες πρέπει να ελέγχονται στα επίσημα κείμενα και στις ανακοινώσεις των αρμόδιων αρχών.",
    ],
    coverageSources: [
      { name: "gov.gr", url: "https://www.gov.gr/", role: "Πρωτογενής πηγή" },
      { name: "Αρχή Προστασίας Δεδομένων", url: "https://www.dpa.gr/", role: "Θεσμικό πλαίσιο" },
      { name: "ΕΡΤ News", url: "https://www.ertnews.gr/", role: "Δημόσια ενημέρωση" },
      { name: "Το Βήμα", url: "https://www.tovima.gr/", role: "Πολιτική κάλυψη" },
    ],
  },
  {
    slug: "cybersecurity-small-business",
    category: "Τεχνολογία",
    time: "2 ώρες",
    updated: "Σήμερα, 12:47",
    title: "Κυβερνοασφάλεια για μικρές επιχειρήσεις: οι απειλές και οι βασικές άμυνες",
    summary: "Phishing, αντίγραφα ασφαλείας και έλεγχος πρόσβασης σε έναν πρακτικό οδηγό βασισμένο σε επίσημες συστάσεις.",
    sources: 8,
    tone: "Πρακτική ενημέρωση",
    source: "Εθνική Αρχή Κυβερνοασφάλειας",
    sourceUrl: "https://cyber.gov.gr/",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία φορητού υπολογιστή · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/f06f85e504b3",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Το phishing παραμένει μία από τις συχνότερες διαδρομές παραβίασης.",
      "Πολυπαραγοντικός έλεγχος και ενημερωμένα αντίγραφα ασφαλείας μειώνουν τον κίνδυνο.",
      "Η εκπαίδευση προσωπικού είναι εξίσου σημαντική με τα τεχνικά εργαλεία.",
    ],
    articleSummary: [
      "Οι μικρές επιχειρήσεις συχνά αντιμετωπίζουν τις ίδιες ψηφιακές απειλές με τους μεγάλους οργανισμούς, αλλά διαθέτουν λιγότερους πόρους για πρόληψη και αποκατάσταση. Ύποπτα μηνύματα, αδύναμοι κωδικοί και μη ενημερωμένο λογισμικό αποτελούν συνηθισμένα σημεία εισόδου.",
      "Ένα βασικό σχέδιο περιλαμβάνει πολυπαραγοντικό έλεγχο ταυτότητας, τακτικά αντίγραφα ασφαλείας, περιορισμένα δικαιώματα πρόσβασης και σαφή διαδικασία αναφοράς περιστατικών. Οι επίσημες οδηγίες προσφέρουν το ασφαλέστερο σημείο εκκίνησης.",
    ],
    coverageSources: [
      { name: "Εθνική Αρχή Κυβερνοασφάλειας", url: "https://cyber.gov.gr/", role: "Πρωτογενής οδηγία" },
      { name: "ENISA", url: "https://www.enisa.europa.eu/", role: "Ευρωπαϊκή τεχνογνωσία" },
      { name: "Insomnia", url: "https://www.insomnia.gr/", role: "Τεχνολογική κάλυψη" },
      { name: "CNN Greece", url: "https://www.cnn.gr/tech", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "housing-rents-urban-centres",
    category: "Κοινωνία",
    time: "2 ώρες",
    updated: "Σήμερα, 12:31",
    title: "Στέγη και ενοίκια στα αστικά κέντρα: τι δείχνουν οι διαφορετικές μετρήσεις",
    summary: "Γιατί οι ζητούμενες τιμές, τα πραγματικά μισθώματα και το διαθέσιμο εισόδημα δίνουν διαφορετική εικόνα της στεγαστικής πίεσης.",
    sources: 10,
    tone: "Κοινωνική ανάλυση",
    source: "ΕΛΣΤΑΤ",
    sourceUrl: "https://www.statistics.gr/",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία κατοικιών · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/2429e8be8625",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Οι τιμές αγγελιών δεν ταυτίζονται πάντα με τα ποσά των τελικών συμφωνιών.",
      "Η σχέση ενοικίου προς εισόδημα δείχνει καλύτερα την πίεση στα νοικοκυριά.",
      "Περιοχή, μέγεθος και ενεργειακή κατάσταση επηρεάζουν σημαντικά κάθε σύγκριση.",
    ],
    articleSummary: [
      "Η στεγαστική πίεση δεν αποτυπώνεται από έναν μόνο αριθμό. Οι ζητούμενες τιμές στις αγγελίες δείχνουν την κατεύθυνση της αγοράς, ενώ οι επίσημοι δείκτες, το διαθέσιμο εισόδημα και το κόστος ενέργειας συμπληρώνουν την καθημερινή εμπειρία των νοικοκυριών.",
      "Για ουσιαστική σύγκριση χρειάζεται κοινή βάση ως προς την περιοχή, το μέγεθος, την ηλικία και την κατάσταση του ακινήτου. Η σύνθεση επίσημων δεδομένων και ρεπορτάζ βοηθά να ξεχωρίζουν οι γενικές τάσεις από τις μεμονωμένες περιπτώσεις.",
    ],
    coverageSources: [
      { name: "ΕΛΣΤΑΤ", url: "https://www.statistics.gr/", role: "Επίσημα στατιστικά" },
      { name: "Τράπεζα της Ελλάδος", url: "https://www.bankofgreece.gr/", role: "Οικονομικοί δείκτες" },
      { name: "Καθημερινή", url: "https://www.kathimerini.gr/", role: "Κοινωνική κάλυψη" },
      { name: "News 24/7", url: "https://www.news247.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  {
    slug: "european-economy-decisions-greece",
    category: "Κόσμος",
    time: "3 ώρες",
    updated: "Σήμερα, 11:58",
    title: "Ευρωπαϊκή οικονομία: ποιες αποφάσεις περνούν στην ελληνική καθημερινότητα",
    summary: "Επιτόκια, χρηματοδότηση και κοινές ευρωπαϊκές πολιτικές εξηγούνται με βάση τις πρωτογενείς ανακοινώσεις και τη διεθνή κάλυψη.",
    sources: 12,
    tone: "Διεθνής σύγκριση",
    source: "Ευρωπαϊκή Κεντρική Τράπεζα",
    sourceUrl: "https://www.ecb.europa.eu/",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία της Γης · Unsplash / NASA imagery",
    imageSourceUrl: "https://unsplash.com/photos/43490279c0fa",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Οι αποφάσεις για τα επιτόκια επηρεάζουν σταδιακά δάνεια, αποταμιεύσεις και επενδύσεις.",
      "Τα ευρωπαϊκά χρηματοδοτικά εργαλεία συνδέονται με συγκεκριμένους όρους και χρονοδιαγράμματα.",
      "Η εθνική επίδραση διαφέρει ανάλογα με την οικονομία και τα μέτρα εφαρμογής.",
    ],
    articleSummary: [
      "Οι ευρωπαϊκές οικονομικές αποφάσεις επηρεάζουν την Ελλάδα μέσω του κόστους δανεισμού, της χρηματοδότησης επενδύσεων και των κοινών δημοσιονομικών κανόνων. Η μετάδοση στην καθημερινότητα δεν είναι άμεση ούτε ίδια για όλους τους πολίτες και τις επιχειρήσεις.",
      "Οι ανακοινώσεις της ΕΚΤ και της Ευρωπαϊκής Επιτροπής αποτελούν τις πρωτογενείς πηγές. Η διεθνής και ελληνική δημοσιογραφική κάλυψη προσθέτει αντιδράσεις και εκτιμήσεις, οι οποίες πρέπει να διακρίνονται από τις επίσημες αποφάσεις.",
    ],
    coverageSources: [
      { name: "Ευρωπαϊκή Κεντρική Τράπεζα", url: "https://www.ecb.europa.eu/", role: "Πρωτογενής πηγή" },
      { name: "Ευρωπαϊκή Επιτροπή", url: "https://commission.europa.eu/index_el", role: "Θεσμική ενημέρωση" },
      { name: "Reuters", url: "https://www.reuters.com/world/europe/", role: "Διεθνής κάλυψη" },
      { name: "Capital", url: "https://www.capital.gr/", role: "Ελληνική οικονομική κάλυψη" },
    ],
  },
  {
    slug: "greek-clubs-european-competitions",
    category: "Αθλητικά",
    time: "3 ώρες",
    updated: "Σήμερα, 11:34",
    title: "Οι ελληνικές ομάδες στην Ευρώπη: πρόγραμμα, δεδομένα και επόμενα βήματα",
    summary: "Όσα χρειάζεται να ξέρει ο φίλαθλος για το πρόγραμμα, τη βαθμολογία και τα αγωνιστικά δεδομένα από επίσημες και αθλητικές πηγές.",
    sources: 9,
    tone: "Αθλητική επισκόπηση",
    source: "UEFA",
    sourceUrl: "https://www.uefa.com/",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία ποδοσφαίρου · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/1a6deb1dec8d",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Το επίσημο πρόγραμμα και οι βαθμολογίες επιβεβαιώνονται από τη διοργανώτρια αρχή.",
      "Οι αποστολές και η διαθεσιμότητα παικτών μπορεί να αλλάξουν έως λίγο πριν τον αγώνα.",
      "Η ανάλυση ξεχωρίζει τα επιβεβαιωμένα στοιχεία από τις εκτιμήσεις.",
    ],
    articleSummary: [
      "Η ευρωπαϊκή πορεία των ελληνικών συλλόγων συνδυάζει αποτελέσματα, βαθμολογική θέση, πρόγραμμα και αγωνιστική κατάσταση. Οι ώρες έναρξης, οι έδρες και τυχόν πειθαρχικές αποφάσεις πρέπει να επιβεβαιώνονται από τις επίσημες διοργανώσεις.",
      "Τα αθλητικά μέσα προσθέτουν ρεπορτάζ για προπονήσεις, τραυματισμούς και πιθανές ενδεκάδες, όμως αυτά τα στοιχεία μπορούν να μεταβληθούν. Η σύνοψη τα παρουσιάζει χωριστά από τα επιβεβαιωμένα δεδομένα του αγώνα.",
    ],
    coverageSources: [
      { name: "UEFA", url: "https://www.uefa.com/", role: "Πρωτογενή στοιχεία" },
      { name: "ΕΠΟ", url: "https://www.epo.gr/", role: "Εθνική ομοσπονδία" },
      { name: "SPORT24", url: "https://www.sport24.gr/", role: "Αθλητική κάλυψη" },
      { name: "Gazzetta", url: "https://www.gazzetta.gr/", role: "Αθλητική κάλυψη" },
    ],
  },
  {
    slug: "national-team-preparation",
    category: "Αθλητικά",
    time: "4 ώρες",
    updated: "Σήμερα, 10:52",
    title: "Εθνική ομάδα: η προετοιμασία, οι επιλογές και τα κρίσιμα παιχνίδια",
    summary: "Το αγωνιστικό πλάνο και οι διαθέσιμοι παίκτες με σαφή διάκριση ανάμεσα στις επίσημες ανακοινώσεις και τις δημοσιογραφικές εκτιμήσεις.",
    sources: 8,
    tone: "Επιβεβαιωμένη ενημέρωση",
    source: "ΕΠΟ",
    sourceUrl: "https://www.epo.gr/",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία γηπέδου · Unsplash",
    imageSourceUrl: "https://unsplash.com/photos/19e32dc3e97e",
    imageLicense: "Unsplash License",
    imageLicenseUrl: "https://unsplash.com/license",
    points: [
      "Οι κλήσεις και το επίσημο πρόγραμμα προέρχονται από την ΕΠΟ και τη διοργανώτρια αρχή.",
      "Οι πιθανές επιλογές ενδεκάδας αποτελούν δημοσιογραφική εκτίμηση μέχρι την ανακοίνωσή τους.",
      "Τραυματισμοί και διαθεσιμότητα χρειάζονται συνεχή επιβεβαίωση.",
    ],
    articleSummary: [
      "Η προετοιμασία της Εθνικής αξιολογείται μέσα από το επίσημο πρόγραμμα, τις κλήσεις και τις ενημερώσεις για τη διαθεσιμότητα των παικτών. Αυτά αποτελούν τον σταθερό πυρήνα της ενημέρωσης γύρω από κάθε αγώνα.",
      "Οι τακτικές επιλογές και η πιθανή ενδεκάδα βασίζονται συνήθως στο ρεπορτάζ και δεν πρέπει να παρουσιάζονται ως οριστικές. Η σελίδα συγκεντρώνει τις διαφορετικές πληροφορίες, επισημαίνοντας καθαρά τι έχει επιβεβαιωθεί.",
    ],
    coverageSources: [
      { name: "ΕΠΟ", url: "https://www.epo.gr/", role: "Πρωτογενής πηγή" },
      { name: "UEFA", url: "https://www.uefa.com/", role: "Διοργανώτρια αρχή" },
      { name: "SPORT24", url: "https://www.sport24.gr/", role: "Αθλητικό ρεπορτάζ" },
      { name: "Novasports", url: "https://www.novasports.gr/", role: "Αθλητική κάλυψη" },
    ],
  },
];

type ExtraStory = Pick<Story, "slug" | "category" | "title" | "summary">;

const extraStories: ExtraStory[] = [
  { slug: "local-government-funding", category: "Πολιτική", title: "Τοπική αυτοδιοίκηση: πού κατευθύνονται οι νέες χρηματοδοτήσεις", summary: "Τα έργα που μπαίνουν σε προτεραιότητα, τα χρονοδιαγράμματα και οι έλεγχοι υλοποίησης σε μία καθαρή εικόνα." },
  { slug: "justice-digital-transformation", category: "Πολιτική", title: "Ψηφιακή δικαιοσύνη: οι αλλαγές που σχεδιάζονται στις διαδικασίες", summary: "Τι προβλέπεται για την ταχύτητα απονομής, την ηλεκτρονική πρόσβαση και την προστασία των δεδομένων." },
  { slug: "education-parliament-agenda", category: "Πολιτική", title: "Παιδεία στη Βουλή: τα βασικά σημεία της νέας πολιτικής συζήτησης", summary: "Οι προτάσεις, οι ενστάσεις και όσα μένει να αποσαφηνιστούν πριν από τις τελικές αποφάσεις." },
  { slug: "eu-funds-oversight", category: "Πολιτική", title: "Ευρωπαϊκά κονδύλια: πώς ελέγχεται η πορεία των έργων", summary: "Οι θεσμικοί έλεγχοι, τα ορόσημα και η δημόσια λογοδοσία πίσω από τις χρηματοδοτήσεις." },
  { slug: "civil-protection-coordination", category: "Πολιτική", title: "Πολιτική προστασία: το σχέδιο συντονισμού κράτους και δήμων", summary: "Ρόλοι, διαθέσιμα μέσα και κρίσιμα σημεία συνεργασίας πριν από μια έκτακτη ανάγκη." },

  { slug: "food-prices-household-basket", category: "Οικονομία", title: "Τιμές τροφίμων: τι δείχνει η σύγκριση για το καλάθι του νοικοκυριού", summary: "Οι επίσημοι δείκτες, οι τιμές στο ράφι και οι παράγοντες που διαμορφώνουν την τελική δαπάνη." },
  { slug: "mortgage-rates-borrowers", category: "Οικονομία", title: "Στεγαστικά δάνεια: πώς επηρεάζουν τα επιτόκια τους δανειολήπτες", summary: "Σταθερά και κυμαινόμενα επιτόκια, μηνιαία δόση και οι βασικές επιλογές που χρειάζονται προσοχή." },
  { slug: "small-business-liquidity", category: "Οικονομία", title: "Μικρομεσαίες επιχειρήσεις: τα εργαλεία ρευστότητας και οι προϋποθέσεις", summary: "Χρηματοδότηση, εγγυήσεις και κριτήρια ένταξης εξηγούνται χωρίς τεχνική ορολογία." },
  { slug: "greek-exports-markets", category: "Οικονομία", title: "Ελληνικές εξαγωγές: ποιες αγορές και προϊόντα ξεχωρίζουν", summary: "Η πορεία των εμπορικών ροών και οι παράγοντες που μπορούν να αλλάξουν την εικόνα." },
  { slug: "labour-market-wages", category: "Οικονομία", title: "Αγορά εργασίας και μισθοί: τι αποτυπώνουν τα τελευταία διαθέσιμα στοιχεία", summary: "Απασχόληση, ανεργία και αμοιβές μέσα από επίσημα δεδομένα και διαφορετικές αναγνώσεις." },

  { slug: "public-health-access", category: "Κοινωνία", title: "Πρόσβαση στη δημόσια υγεία: αναμονές, υποδομές και περιφέρεια", summary: "Πού εντοπίζονται οι μεγαλύτερες πιέσεις και ποια στοιχεία χρειάζονται για ασφαλή συμπεράσματα." },
  { slug: "schools-building-infrastructure", category: "Κοινωνία", title: "Σχολικές υποδομές: οι ανάγκες, οι έλεγχοι και τα έργα που προγραμματίζονται", summary: "Μια συνοπτική καταγραφή για συντηρήσεις, ασφάλεια και χρηματοδότηση των σχολικών κτιρίων." },
  { slug: "weather-emergency-preparedness", category: "Κοινωνία", title: "Ακραία καιρικά φαινόμενα: ο πρακτικός οδηγός προετοιμασίας", summary: "Οι επίσημες προειδοποιήσεις, τα βασικά μέτρα προστασίας και οι χρήσιμοι αριθμοί έκτακτης ανάγκης." },
  { slug: "demographic-challenge-greece", category: "Κοινωνία", title: "Δημογραφικό: πώς αλλάζει ο πληθυσμός και τι σημαίνει για την Ελλάδα", summary: "Γεννήσεις, γήρανση και μετακινήσεις πληθυσμού μέσα από τα διαθέσιμα στατιστικά στοιχεία." },
  { slug: "recycling-waste-cities", category: "Κοινωνία", title: "Ανακύκλωση και απορρίμματα: η εικόνα στις ελληνικές πόλεις", summary: "Οι στόχοι, οι επιδόσεις και τα σημεία όπου πολίτες και δήμοι συναντούν τις μεγαλύτερες δυσκολίες." },

  { slug: "european-defence-policy", category: "Κόσμος", title: "Ευρωπαϊκή άμυνα: οι αποφάσεις που ενδιαφέρουν την Ελλάδα", summary: "Κοινές προμήθειες, χρηματοδότηση και διπλωματικές ισορροπίες σε μία σύντομη επισκόπηση." },
  { slug: "mediterranean-migration-routes", category: "Κόσμος", title: "Μεσόγειος και μεταναστευτικές ροές: τα δεδομένα πίσω από τους τίτλους", summary: "Οι αριθμοί, οι ευρωπαϊκές αποφάσεις και οι ανθρωπιστικές διαστάσεις με σαφή διάκριση πηγών." },
  { slug: "energy-corridors-southeast-europe", category: "Κόσμος", title: "Ενεργειακοί διάδρομοι στη Νοτιοανατολική Ευρώπη: ο ρόλος της Ελλάδας", summary: "Δίκτυα, διασυνδέσεις και γεωπολιτικές επιπτώσεις χωρίς υπεραπλουστεύσεις." },
  { slug: "europe-climate-policy", category: "Κόσμος", title: "Ευρωπαϊκή κλιματική πολιτική: τι αλλάζει για κράτη και επιχειρήσεις", summary: "Στόχοι, προθεσμίες και κόστος μετάβασης μέσα από τις επίσημες αποφάσεις και τη διεθνή κάλυψη." },
  { slug: "global-markets-greek-economy", category: "Κόσμος", title: "Διεθνείς αγορές: τα σήματα που παρακολουθεί η ελληνική οικονομία", summary: "Ενέργεια, επιτόκια και εμπόριο συνδέονται σε μια σύντομη εικόνα των παγκόσμιων τάσεων." },

  { slug: "digital-payments-everyday-life", category: "Τεχνολογία", title: "Ψηφιακές πληρωμές: ασφάλεια και αλλαγές στην καθημερινή χρήση", summary: "Άμεσες συναλλαγές, ηλεκτρονικά πορτοφόλια και βασικοί κανόνες προστασίας για καταναλωτές και επιχειρήσεις." },
  { slug: "data-centres-cloud-greece", category: "Τεχνολογία", title: "Data centers και cloud: οι επενδύσεις που αλλάζουν τον ψηφιακό χάρτη", summary: "Υποδομές, ενεργειακές απαιτήσεις και θέσεις εργασίας μέσα από επίσημες και επιχειρηματικές πηγές." },
  { slug: "ai-in-education", category: "Τεχνολογία", title: "Τεχνητή νοημοσύνη στην εκπαίδευση: δυνατότητες και όρια", summary: "Πώς χρησιμοποιούνται τα νέα εργαλεία και γιατί η ακρίβεια, η ιδιωτικότητα και η επίβλεψη παραμένουν κρίσιμες." },
  { slug: "greek-startups-funding", category: "Τεχνολογία", title: "Ελληνικές startups: χρηματοδότηση, ανάπτυξη και οι νέες προκλήσεις", summary: "Τι κοιτούν οι επενδυτές και ποιοι δείκτες ξεχωρίζουν μια ανακοίνωση από μια βιώσιμη πορεία." },
  { slug: "digital-identity-wallet", category: "Τεχνολογία", title: "Ψηφιακή ταυτότητα και wallet: τι αποθηκεύεται και πώς προστατεύεται", summary: "Οι διαθέσιμες λειτουργίες, οι δικλείδες ασφαλείας και όσα πρέπει να γνωρίζει ο πολίτης." },

  { slug: "basketball-clubs-europe", category: "Αθλητικά", title: "Ελληνικές ομάδες μπάσκετ στην Ευρώπη: πρόγραμμα και βαθμολογία", summary: "Αποτελέσματα, επόμενοι αγώνες και αγωνιστικά δεδομένα με παραπομπή στις επίσημες διοργανώσεις." },
  { slug: "super-league-schedule", category: "Αθλητικά", title: "Super League: το πρόγραμμα, η βαθμολογία και τα κρίσιμα παιχνίδια", summary: "Όλη η βασική εικόνα της αγωνιστικής με σαφή διάκριση ανάμεσα σε στοιχεία και εκτιμήσεις." },
  { slug: "greek-athletics-preparation", category: "Αθλητικά", title: "Ελληνικός στίβος: οι διοργανώσεις και η προετοιμασία των αθλητών", summary: "Επίσημο καλεντάρι, επιδόσεις και στόχοι από τις ομοσπονδίες και το αθλητικό ρεπορτάζ." },
  { slug: "volleyball-championships", category: "Αθλητικά", title: "Βόλεϊ: η εικόνα των πρωταθλημάτων και οι επόμενες αναμετρήσεις", summary: "Βαθμολογίες, πρόγραμμα και νέα των ομάδων συγκεντρωμένα από επίσημες και αθλητικές πηγές." },
  { slug: "youth-football-academies", category: "Αθλητικά", title: "Ακαδημίες ποδοσφαίρου: ανάπτυξη νέων παικτών και σύγχρονες προκλήσεις", summary: "Εκπαίδευση, προστασία ανηλίκων και η διαδρομή από τις υποδομές προς την πρώτη ομάδα." },
];

type CategoryTemplate = Pick<Story,
  "tone" | "source" | "sourceUrl" | "image" | "imageCredit" | "imageSourceUrl" |
  "imageLicense" | "imageLicenseUrl" | "coverageSources"
>;

const categoryTemplates: Record<string, CategoryTemplate> = {
  "Πολιτική": {
    tone: "Θεσμική σύγκριση", source: "Βουλή των Ελλήνων", sourceUrl: "https://www.hellenicparliament.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/22/Attica_06-13_Athens_10_Parliament.jpg",
    imageCredit: "Φωτογραφία: A.Savin · Βουλή των Ελλήνων", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Attica_06-13_Athens_10_Parliament.jpg",
    imageLicense: "CC BY-SA 3.0", imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    coverageSources: [
      { name: "Βουλή των Ελλήνων", url: "https://www.hellenicparliament.gr/", role: "Πρωτογενής πηγή" },
      { name: "ΕΡΤ News", url: "https://www.ertnews.gr/", role: "Δημόσια ενημέρωση" },
      { name: "Καθημερινή", url: "https://www.kathimerini.gr/", role: "Πολιτική κάλυψη" },
      { name: "in.gr", url: "https://www.in.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  "Οικονομία": {
    tone: "Στοιχεία και πλαίσιο", source: "ΕΛΣΤΑΤ", sourceUrl: "https://www.statistics.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Heraklion_Kohlekraftwerk.jpg",
    imageCredit: "Φωτογραφία: Oliver Deisenroth · Ελλάδα", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Heraklion_Kohlekraftwerk.jpg",
    imageLicense: "CC BY-SA 3.0", imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    coverageSources: [
      { name: "ΕΛΣΤΑΤ", url: "https://www.statistics.gr/", role: "Πρωτογενή στοιχεία" },
      { name: "Τράπεζα της Ελλάδος", url: "https://www.bankofgreece.gr/", role: "Οικονομικοί δείκτες" },
      { name: "Ναυτεμπορική", url: "https://www.naftemporiki.gr/", role: "Οικονομική κάλυψη" },
      { name: "Capital", url: "https://www.capital.gr/", role: "Ανάλυση αγοράς" },
    ],
  },
  "Κοινωνία": {
    tone: "Χρήσιμη ενημέρωση", source: "ΕΡΤ News", sourceUrl: "https://www.ertnews.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Athens_Metro_Train.jpg",
    imageCredit: "Φωτογραφία: Bobby H · Αθήνα", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Athens_Metro_Train.jpg",
    imageLicense: "CC BY-SA 2.0", imageLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    coverageSources: [
      { name: "ΕΡΤ News", url: "https://www.ertnews.gr/", role: "Δημόσια ενημέρωση" },
      { name: "ΕΛΣΤΑΤ", url: "https://www.statistics.gr/", role: "Επίσημα στοιχεία" },
      { name: "News 24/7", url: "https://www.news247.gr/", role: "Κοινωνική κάλυψη" },
      { name: "Καθημερινή", url: "https://www.kathimerini.gr/", role: "Ειδησεογραφική κάλυψη" },
    ],
  },
  "Κόσμος": {
    tone: "Διεθνής σύγκριση", source: "Ευρωπαϊκή Επιτροπή", sourceUrl: "https://commission.europa.eu/index_el",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/14_EU_Member_Flags_in_front_of_European_Parliament_in_Brussels.jpg",
    imageCredit: "Φωτογραφία: Marek Ślusarczyk · Ευρωπαϊκό Κοινοβούλιο", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:14_EU_Member_Flags_in_front_of_European_Parliament_in_Brussels.jpg",
    imageLicense: "CC BY 3.0", imageLicenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    coverageSources: [
      { name: "Ευρωπαϊκή Επιτροπή", url: "https://commission.europa.eu/index_el", role: "Πρωτογενής πηγή" },
      { name: "Reuters", url: "https://www.reuters.com/world/europe/", role: "Διεθνής κάλυψη" },
      { name: "BBC News", url: "https://www.bbc.com/news", role: "Διεθνής κάλυψη" },
      { name: "Politico Europe", url: "https://www.politico.eu/", role: "Ευρωπαϊκή κάλυψη" },
    ],
  },
  "Τεχνολογία": {
    tone: "Τεχνολογική ανάλυση", source: "Υπουργείο Ψηφιακής Διακυβέρνησης", sourceUrl: "https://www.gov.gr/",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Staff_meeting.jpg",
    imageCredit: "Φωτογραφία: Robert Scoble · Εργασιακή συνάντηση", imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Staff_meeting.jpg",
    imageLicense: "CC BY 2.0", imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    coverageSources: [
      { name: "gov.gr", url: "https://www.gov.gr/", role: "Πρωτογενής πηγή" },
      { name: "Εθνική Αρχή Κυβερνοασφάλειας", url: "https://cyber.gov.gr/", role: "Θεσμική ενημέρωση" },
      { name: "CNN Greece Tech", url: "https://www.cnn.gr/tech", role: "Τεχνολογική κάλυψη" },
      { name: "Insomnia", url: "https://www.insomnia.gr/", role: "Τεχνολογική κάλυψη" },
    ],
  },
  "Αθλητικά": {
    tone: "Αθλητική επισκόπηση", source: "ΕΡΤ Sports", sourceUrl: "https://www.ertsports.gr/",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=82",
    imageCredit: "Πραγματική φωτογραφία ποδοσφαίρου · Unsplash", imageSourceUrl: "https://unsplash.com/photos/1a6deb1dec8d",
    imageLicense: "Unsplash License", imageLicenseUrl: "https://unsplash.com/license",
    coverageSources: [
      { name: "ΕΡΤ Sports", url: "https://www.ertsports.gr/", role: "Αθλητική ενημέρωση" },
      { name: "ΕΠΟ", url: "https://www.epo.gr/", role: "Πρωτογενή στοιχεία" },
      { name: "SPORT24", url: "https://www.sport24.gr/", role: "Αθλητικό ρεπορτάζ" },
      { name: "Gazzetta", url: "https://www.gazzetta.gr/", role: "Αθλητική κάλυψη" },
    ],
  },
};

const generatedStories: Story[] = extraStories.map((story, index) => {
  const template = categoryTemplates[story.category];
  return {
    ...story,
    ...template,
    time: `${4 + Math.floor(index / 6)} ώρες`,
    updated: `Σήμερα, ${String(10 - Math.floor(index / 10)).padStart(2, "0")}:${String(45 - (index % 10) * 4).padStart(2, "0")}`,
    sources: template.coverageSources.length,
    points: [
      "Η σύνοψη συγκρίνει τις διαθέσιμες επίσημες ανακοινώσεις και τη δημοσιογραφική κάλυψη.",
      "Τα επιβεβαιωμένα στοιχεία παρουσιάζονται χωριστά από εκτιμήσεις και σχόλια.",
      "Οι σύνδεσμοι προς τις πρωτότυπες πηγές επιτρέπουν άμεσο έλεγχο και βαθύτερη ανάγνωση.",
    ],
    articleSummary: [
      `${story.summary} Το Ελλάδα Τώρα συγκεντρώνει τα βασικά σημεία του θέματος, αφαιρεί τις επαναλήψεις και οργανώνει την πληροφορία ώστε ο αναγνώστης να κατανοεί γρήγορα τι έχει επιβεβαιωθεί και ποια ερωτήματα παραμένουν ανοιχτά.`,
      "Η κάλυψη συνδυάζει πρωτογενείς θεσμικές πηγές με μεγάλα ελληνικά ή διεθνή μέσα. Η σύνοψη είναι ενημερωτική και συντομότερη από το πρωτότυπο υλικό· για κάθε δεσμευτική λεπτομέρεια ή νεότερη εξέλιξη, ο αναγνώστης μπορεί να ανοίξει απευθείας τις πηγές που αναγράφονται στη σελίδα.",
    ],
  };
});

export const stories: Story[] = [...featuredStories, ...generatedStories];

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
