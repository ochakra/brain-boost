export type Lang = "en" | "hi" | "mr";

export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export const LANG_FLAGS: Record<Lang, string> = {
  en: "🇬🇧",
  hi: "🇮🇳",
  mr: "🪔",
};

export type Translations = {
  // App-wide
  appName: string;
  appSubtitle: string;
  todaysWorkout: string;
  tipTitle: string;
  tipBody: string;
  backHome: string;
  home: string;
  tryAgain: string;
  next: string;
  back: string;
  finish: string;
  checkAnswer: string;
  playAgain: string;
  reviewAgain: string;
  chooseLanguage: string;
  tryAnotherLanguage: string;

  // Points / levels
  points: string;
  level: string;
  exercises: string;
  dayStreak: string;
  badges: string;
  progressTo: string;
  completeToearnBadges: string;
  levelTitles: [string, string, string, string, string];

  // WhatsApp
  whatsappBtn: string;
  whatsappMsg: string;

  // Home exercise cards
  exercises_list: {
    wordPuzzle:    { title: string; subtitle: string; description: string };
    numberChallenge: { title: string; subtitle: string; description: string };
    memoryRecall:  { title: string; subtitle: string; description: string };
    learnSomething:{ title: string; subtitle: string; description: string };
    mindJourney:   { title: string; subtitle: string; description: string };
  };

  // Word Puzzle
  wp_title: string;
  wp_subtitle: (n: number) => string;
  wp_showHint: string;
  wp_hideHint: string;
  wp_won: string;
  wp_wordWas: string;
  wp_lostTitle: string;
  wp_lostHint: string;
  wp_backToHome: string;

  // Number Challenge
  nc_title: string;
  nc_subtitle: string;
  nc_correct: string;
  nc_answer: string;
  nc_excellent: string;
  nc_goodJob: string;
  nc_keepPracticing: string;
  nc_outOf: (score: number, total: number) => string;

  // Memory Recall
  mr_title: string;
  mr_subtitle: string;
  mr_placeholder: string;
  mr_amazingTitle: string;
  mr_amazingBody: (filled: number, total: number) => string;
  mr_tip: string;
  mr_prompts: { icon: string; question: string }[];

  // Learn Something
  ls_title: string;
  ls_choosePrompt: string;
  ls_todaysWord: string;
  ls_tapToReveal: string;
  ls_readAloud: string;
  ls_iLearned: string;
  ls_learnedTitle: (n: number) => string;
  ls_tryWord: string;

  // Visualization
  viz_title: string;
  viz_subtitle: string;
  viz_comfort1: string;
  viz_comfort2: string;
  viz_comfort3: string;
  viz_begin: string;
  viz_readyNext: string;
  viz_stepOf: (current: number, total: number) => string;
  viz_complete: string;
  viz_wonTitle: string;
  viz_wonBody: string;
  viz_doAgain: string;
  viz_journeys: { title: string; emoji: string; steps: { text: string; duration: number }[] }[];

  // Badges
  badge_newTitle: string;
  badge_tapToContinue: string;
  badgeNames: Record<string, { name: string; description: string }>;
};

const en: Translations = {
  appName: "Brain Boost",
  appSubtitle: "Daily exercises to keep your mind sharp! ✨",
  todaysWorkout: "Today's Brain Workout 🌟",
  tipTitle: "Tip of the Day",
  tipBody: "Even 10 minutes of brain exercise a day can make a big difference! You're doing great! 🎉",
  backHome: "← Back",
  home: "Home 🏠",
  tryAgain: "Try Again 🔄",
  next: "Next Question →",
  back: "← Back",
  finish: "Finish ✓",
  checkAnswer: "Check Answer ✓",
  playAgain: "Play Again 🔄",
  reviewAgain: "Review Again 🔄",
  chooseLanguage: "Which language would you like to learn today?",
  tryAnotherLanguage: "Try Another Language 🌍",

  points: "points",
  level: "Level",
  exercises: "Exercises",
  dayStreak: "Day Streak",
  badges: "Badges",
  progressTo: "Progress to Level",
  completeToearnBadges: "Complete exercises to earn badges! 🏅",
  levelTitles: ["Brain Beginner", "Mind Explorer", "Memory Master", "Wisdom Keeper", "Brain Champion"],

  whatsappBtn: "📲 Share with Friends on WhatsApp",
  whatsappMsg: "🧠 I am doing Brain Boost daily exercises to keep my mind sharp! Come join me!\n\n5 fun brain exercises every day:\n🔤 Word Puzzle\n🔢 Number Challenge\n📖 Memory Recall\n🌍 Learn Something New\n🧘 Mind Journey\n\nIt only takes 15 minutes a day and it's FREE! 🌟",

  exercises_list: {
    wordPuzzle:     { title: "Word Puzzle",         subtitle: "Guess the hidden word",   description: "Sharpen your vocabulary and memory" },
    numberChallenge:{ title: "Number Challenge",    subtitle: "Quick mental math",        description: "Keep your mind sharp with numbers" },
    memoryRecall:   { title: "Memory Recall",       subtitle: "Remember & reflect",       description: "Strengthen your daily memory" },
    learnSomething: { title: "Learn Something New", subtitle: "New words every day",      description: "Grow your brain with new knowledge" },
    mindJourney:    { title: "Mind Journey",        subtitle: "Peaceful visualization",   description: "Exercise spatial memory & calm the mind" },
  },

  wp_title: "🔤 Word Puzzle",
  wp_subtitle: (n) => `Guess the ${n}-letter word! (Up to 30 pts)`,
  wp_showHint: "💡 Show Hint",
  wp_hideHint: "🙈 Hide Hint",
  wp_won: "Wonderful! You got it! 🎉",
  wp_wordWas: "The word was",
  wp_lostTitle: "Good try! The word was:",
  wp_lostHint: "",
  wp_backToHome: "Back to Home →",

  nc_title: "🔢 Number Challenge",
  nc_subtitle: "Up to 30 points!",
  nc_correct: "✅ Correct!",
  nc_answer: "Answer:",
  nc_excellent: "Excellent!",
  nc_goodJob: "Good job!",
  nc_keepPracticing: "Keep practicing!",
  nc_outOf: (s, t) => `You got ${s} out of ${t} correct!`,

  mr_title: "📖 Memory Recall",
  mr_subtitle: "Up to 30 points!",
  mr_placeholder: "Write your thoughts here... take your time 😊",
  mr_amazingTitle: "Amazing Memory!",
  mr_amazingBody: (f, t) => `You answered ${f} of ${t} questions!`,
  mr_tip: "Reflecting on your day keeps your memory sharp and your mind happy. Keep it up!",
  mr_prompts: [
    { icon: "🌅", question: "What did you do first thing this morning?" },
    { icon: "🍽️", question: "What did you eat for your last meal? Describe it!" },
    { icon: "📞", question: "Who did you last speak with? What did you talk about?" },
    { icon: "🚶", question: "Describe the last walk you took. What did you see?" },
    { icon: "😄", question: "What made you smile or laugh recently?" },
  ],

  ls_title: "🌍 Learn Something New",
  ls_choosePrompt: "Which language would you like to learn today?",
  ls_todaysWord: "Today's new word",
  ls_tapToReveal: "👆 Tap to see the meaning!",
  ls_readAloud: "Read it out loud to remember it better! 🗣️",
  ls_iLearned: "I learned it! ✅ (+10 pts)",
  ls_learnedTitle: (n) => `You learned ${n} new things!`,
  ls_tryWord: "Try to use one of these words today! 💬",

  viz_title: "🧘 Mind Journey",
  viz_subtitle: "Peaceful visualization",
  viz_comfort1: "✅ Find a comfortable chair",
  viz_comfort2: "✅ 5 quiet minutes for yourself",
  viz_comfort3: "✅ Read or close your eyes",
  viz_begin: "Begin Journey",
  viz_readyNext: "Ready for next step",
  viz_stepOf: (c, t) => `Step ${c} of ${t}`,
  viz_complete: "Complete Journey ✓",
  viz_wonTitle: "Wonderful!",
  viz_wonBody: "Visualization exercises strengthen your memory and reduce stress. You are taking great care of your brain! 🧠",
  viz_doAgain: "Do it Again 🔄",
  viz_journeys: [
    { title: "Morning in the Garden", emoji: "🌸", steps: [
      { text: "Close your eyes. Take a deep breath in... and slowly breathe out. Feel your body relax.", duration: 8 },
      { text: "Imagine you are standing in a beautiful garden in the morning. The air is cool and fresh.", duration: 8 },
      { text: "You see colorful flowers around you — red roses, yellow marigolds, pink jasmine. Can you smell them?", duration: 10 },
      { text: "You hear birds singing. A gentle breeze touches your face. The sun is warm and golden.", duration: 10 },
      { text: "Walk slowly along a path in the garden. Notice the green grass under your feet.", duration: 8 },
      { text: "You reach a bench. Sit down, close your eyes (in the visualization), and feel the peace.", duration: 10 },
      { text: "Take three more deep breaths. Feel grateful for this beautiful moment. Slowly open your eyes. 😊", duration: 8 },
    ]},
    { title: "Walk by the River", emoji: "🌊", steps: [
      { text: "Sit comfortably. Close your eyes. Take a slow, deep breath. Let all worries float away.", duration: 8 },
      { text: "You are standing by a gentle river. The water is clear and calm, flowing slowly.", duration: 8 },
      { text: "You hear the soft sound of water over stones. It is peaceful and soothing.", duration: 10 },
      { text: "You see small fish swimming. A butterfly lands near you on a flower.", duration: 10 },
      { text: "The sky above is blue with soft white clouds. You feel completely safe and at peace.", duration: 8 },
      { text: "You dip your hand into the cool water. It feels refreshing and gentle.", duration: 8 },
      { text: "Breathe in the clean river air. Smile. Slowly bring yourself back to the room. 💙", duration: 8 },
    ]},
    { title: "Visit Your Happiest Memory", emoji: "💛", steps: [
      { text: "Find a comfortable position. Close your eyes. Breathe slowly in and out.", duration: 8 },
      { text: "Think of a time when you felt very happy. A family gathering, a celebration, or a peaceful day.", duration: 10 },
      { text: "Picture that moment clearly. Who was there with you? What did they look like?", duration: 10 },
      { text: "What sounds do you hear in this memory? Laughter? Music? The sound of cooking?", duration: 10 },
      { text: "What smells are there? What can you taste? Let the memory feel real and vivid.", duration: 10 },
      { text: "Feel the warmth and joy of that moment fill your heart.", duration: 10 },
      { text: "Carry this feeling with you. Take a gentle breath and slowly open your eyes. 🌟", duration: 8 },
    ]},
  ],

  badge_newTitle: "New Badge Earned!",
  badge_tapToContinue: "Tap anywhere to continue",
  badgeNames: {
    first_step:   { name: "First Step",     description: "Complete your first exercise" },
    word_master:  { name: "Word Master",    description: "Complete Word Puzzle 5 times" },
    math_whiz:    { name: "Math Whiz",      description: "Complete Number Challenge 5 times" },
    storyteller:  { name: "Storyteller",    description: "Complete Memory Recall 5 times" },
    scholar:      { name: "Scholar",        description: "Learn Something New 5 times" },
    zen_master:   { name: "Zen Master",     description: "Complete Mind Journey 5 times" },
    on_fire:      { name: "On Fire!",       description: "3-day streak" },
    week_warrior: { name: "Week Warrior",   description: "7-day streak" },
    century:      { name: "Century",        description: "Earn 100 points" },
    all_rounder:  { name: "All-Rounder",    description: "Try all 5 exercises" },
  },
};

const hi: Translations = {
  appName: "ब्रेन बूस्ट",
  appSubtitle: "हर दिन दिमाग को तेज़ रखने के व्यायाम! ✨",
  todaysWorkout: "आज का दिमागी व्यायाम 🌟",
  tipTitle: "आज की सलाह",
  tipBody: "रोज़ 10 मिनट का दिमागी व्यायाम बड़ा फर्क कर सकता है! आप बहुत अच्छा कर रहे हैं! 🎉",
  backHome: "← वापस",
  home: "होम 🏠",
  tryAgain: "फिर से करें 🔄",
  next: "अगला सवाल →",
  back: "← पीछे",
  finish: "पूरा करें ✓",
  checkAnswer: "जवाब जाँचें ✓",
  playAgain: "फिर से खेलें 🔄",
  reviewAgain: "फिर से देखें 🔄",
  chooseLanguage: "आज आप कौन सी भाषा सीखना चाहते हैं?",
  tryAnotherLanguage: "दूसरी भाषा आज़माएं 🌍",

  points: "अंक",
  level: "स्तर",
  exercises: "व्यायाम",
  dayStreak: "दिन की लकीर",
  badges: "बैज",
  progressTo: "स्तर की ओर प्रगति",
  completeToearnBadges: "बैज जीतने के लिए व्यायाम पूरे करें! 🏅",
  levelTitles: ["दिमाग का शुरुआती", "मन का खोजी", "यादों का उस्ताद", "ज्ञान का रक्षक", "दिमाग का चैंपियन"],

  whatsappBtn: "📲 WhatsApp पर दोस्तों के साथ शेयर करें",
  whatsappMsg: "🧠 मैं हर दिन ब्रेन बूस्ट व्यायाम कर रहा/रही हूँ! आप भी जुड़ें!\n\n5 मज़ेदार दिमागी व्यायाम:\n🔤 शब्द पहेली\n🔢 संख्या चुनौती\n📖 याद करो\n🌍 कुछ नया सीखो\n🧘 मन की यात्रा\n\nसिर्फ 15 मिनट रोज़, बिल्कुल मुफ़्त! 🌟",

  exercises_list: {
    wordPuzzle:     { title: "शब्द पहेली",      subtitle: "छुपा हुआ शब्द खोजो",   description: "शब्द ज्ञान और याददाश्त तेज़ करो" },
    numberChallenge:{ title: "संख्या चुनौती",   subtitle: "तेज़ मानसिक गणित",      description: "संख्याओं से दिमाग तेज़ रखो" },
    memoryRecall:   { title: "याद करो",          subtitle: "याद करो और सोचो",       description: "रोज़ की याददाश्त मजबूत करो" },
    learnSomething: { title: "कुछ नया सीखो",    subtitle: "हर दिन नए शब्द",        description: "नई जानकारी से दिमाग बढ़ाओ" },
    mindJourney:    { title: "मन की यात्रा",     subtitle: "शांत कल्पना",           description: "स्थानिक स्मृति का व्यायाम करो" },
  },

  wp_title: "🔤 शब्द पहेली",
  wp_subtitle: (n) => `${n} अक्षरों का शब्द खोजो! (30 अंक तक)`,
  wp_showHint: "💡 संकेत देखें",
  wp_hideHint: "🙈 संकेत छुपाएं",
  wp_won: "बहुत बढ़िया! आपने कर दिखाया! 🎉",
  wp_wordWas: "शब्द था",
  wp_lostTitle: "अच्छी कोशिश! शब्द था:",
  wp_lostHint: "",
  wp_backToHome: "होम पर वापस →",

  nc_title: "🔢 संख्या चुनौती",
  nc_subtitle: "30 अंक तक जीतें!",
  nc_correct: "✅ सही जवाब!",
  nc_answer: "जवाब:",
  nc_excellent: "शानदार!",
  nc_goodJob: "अच्छा किया!",
  nc_keepPracticing: "अभ्यास जारी रखें!",
  nc_outOf: (s, t) => `आपने ${t} में से ${s} सही किए!`,

  mr_title: "📖 याद करो",
  mr_subtitle: "30 अंक तक जीतें!",
  mr_placeholder: "यहाँ अपने विचार लिखें... समय लीजिए 😊",
  mr_amazingTitle: "यादों का जादू!",
  mr_amazingBody: (f, t) => `आपने ${t} में से ${f} सवालों के जवाब दिए!`,
  mr_tip: "अपने दिन पर सोचना याददाश्त को तेज़ और मन को खुश रखता है!",
  mr_prompts: [
    { icon: "🌅", question: "आज सुबह उठकर सबसे पहले आपने क्या किया?" },
    { icon: "🍽️", question: "आपने आखिरी बार क्या खाया? बताइए!" },
    { icon: "📞", question: "आखिरी बार किससे बात की? क्या बात हुई?" },
    { icon: "🚶", question: "आखिरी बार टहलने गए तो क्या-क्या देखा?" },
    { icon: "😄", question: "हाल ही में किस बात पर हँसे या मुस्कुराए?" },
  ],

  ls_title: "🌍 कुछ नया सीखो",
  ls_choosePrompt: "आज आप कौन सी भाषा सीखना चाहते हैं?",
  ls_todaysWord: "आज का नया शब्द",
  ls_tapToReveal: "👆 अर्थ देखने के लिए छुएं!",
  ls_readAloud: "इसे ज़ोर से पढ़ें — याद रहेगा! 🗣️",
  ls_iLearned: "मैंने सीख लिया! ✅ (+10 अंक)",
  ls_learnedTitle: (n) => `आपने ${n} नई चीज़ें सीखीं!`,
  ls_tryWord: "आज इनमें से एक शब्द ज़रूर बोलें! 💬",

  viz_title: "🧘 मन की यात्रा",
  viz_subtitle: "शांत कल्पना",
  viz_comfort1: "✅ आरामदायक कुर्सी पर बैठें",
  viz_comfort2: "✅ 5 मिनट का शांत समय निकालें",
  viz_comfort3: "✅ पढ़ें या आँखें बंद करें",
  viz_begin: "यात्रा शुरू करें",
  viz_readyNext: "अगले चरण के लिए तैयार",
  viz_stepOf: (c, t) => `चरण ${c} / ${t}`,
  viz_complete: "यात्रा पूरी करें ✓",
  viz_wonTitle: "वाह! बहुत बढ़िया!",
  viz_wonBody: "कल्पना के व्यायाम से याददाश्त मज़बूत होती है और तनाव कम होता है। आप अपने दिमाग का बहुत अच्छे से ख्याल रख रहे हैं! 🧠",
  viz_doAgain: "फिर करें 🔄",
  viz_journeys: [
    { title: "बगीचे में सुबह", emoji: "🌸", steps: [
      { text: "आँखें बंद करें। गहरी साँस लें... और धीरे-धीरे छोड़ें। शरीर को ढीला छोड़ें।", duration: 8 },
      { text: "सोचिए कि आप सुबह एक सुंदर बगीचे में खड़े हैं। हवा ठंडी और ताज़ी है।", duration: 8 },
      { text: "चारों तरफ रंग-बिरंगे फूल हैं — लाल गुलाब, पीले गेंदे, गुलाबी चमेली। क्या खुशबू आ रही है?", duration: 10 },
      { text: "पक्षियों की चहचहाहट सुनाई दे रही है। ठंडी हवा चेहरे को छू रही है। सूरज गर्म और सुनहरा है।", duration: 10 },
      { text: "बगीचे की पगडंडी पर धीरे-धीरे चलें। पैरों के नीचे हरी घास महसूस करें।", duration: 8 },
      { text: "आप एक बेंच तक पहुँचते हैं। बैठ जाएं और इस शांति को महसूस करें।", duration: 10 },
      { text: "तीन गहरी साँसें लें। इस सुंदर पल के लिए शुक्रगुज़ार रहें। धीरे-धीरे आँखें खोलें। 😊", duration: 8 },
    ]},
    { title: "नदी के किनारे सैर", emoji: "🌊", steps: [
      { text: "आरामदायक बैठें। आँखें बंद करें। धीरे-धीरे साँस लें। सब चिंताएं दूर जाने दें।", duration: 8 },
      { text: "आप एक शांत नदी के किनारे खड़े हैं। पानी साफ और धीरे-धीरे बह रहा है।", duration: 8 },
      { text: "पत्थरों पर पानी की कोमल आवाज़ सुनाई दे रही है। यह शांतिदायक और सुखद है।", duration: 10 },
      { text: "छोटी-छोटी मछलियाँ तैर रही हैं। एक तितली आपके पास फूल पर बैठती है।", duration: 10 },
      { text: "आसमान नीला है, सफेद बादल हल्के-हल्के तैर रहे हैं। आप पूरी तरह सुरक्षित और शांत हैं।", duration: 8 },
      { text: "ठंडे पानी में हाथ डालें। यह ताज़ा और कोमल लगता है।", duration: 8 },
      { text: "नदी की ताज़ी हवा में साँस लें। मुस्कुराएं। धीरे-धीरे वापस आएं। 💙", duration: 8 },
    ]},
    { title: "सबसे खुशी का पल", emoji: "💛", steps: [
      { text: "आरामदायक स्थिति में बैठें। आँखें बंद करें। धीरे-धीरे साँस लें।", duration: 8 },
      { text: "किसी ऐसे पल को याद करें जब आप बहुत खुश थे। कोई पारिवारिक मेल, उत्सव या शांत दिन।", duration: 10 },
      { text: "उस पल को साफ-साफ देखें। आपके साथ कौन था? वे कैसे दिखते थे?", duration: 10 },
      { text: "उस याद में कौन सी आवाज़ें हैं? हँसी? संगीत? खाना पकाने की आवाज़?", duration: 10 },
      { text: "कोई खुशबू? कोई स्वाद? उस पल को सच्चा और जीवंत महसूस करें।", duration: 10 },
      { text: "उस पल की गर्माहट और खुशी दिल में भर लें।", duration: 10 },
      { text: "यह एहसास अपने साथ रखें। धीरे साँस लें और आँखें खोलें। 🌟", duration: 8 },
    ]},
  ],

  badge_newTitle: "नया बैज मिला!",
  badge_tapToContinue: "जारी रखने के लिए कहीं भी छुएं",
  badgeNames: {
    first_step:   { name: "पहला कदम",      description: "पहला व्यायाम पूरा किया" },
    word_master:  { name: "शब्द उस्ताद",   description: "शब्द पहेली 5 बार पूरी की" },
    math_whiz:    { name: "गणित प्रतिभा",  description: "संख्या चुनौती 5 बार पूरी की" },
    storyteller:  { name: "कहानीकार",       description: "याद करो 5 बार पूरा किया" },
    scholar:      { name: "विद्वान",         description: "कुछ नया सीखो 5 बार पूरा किया" },
    zen_master:   { name: "शांति गुरु",     description: "मन की यात्रा 5 बार पूरी की" },
    on_fire:      { name: "जोश में!",       description: "3 दिन की लकीर" },
    week_warrior: { name: "सप्ताह का योद्धा", description: "7 दिन की लकीर" },
    century:      { name: "शतक",            description: "100 अंक जीते" },
    all_rounder:  { name: "सर्वांगीण",      description: "सभी 5 व्यायाम आज़माए" },
  },
};

const mr: Translations = {
  appName: "ब्रेन बूस्ट",
  appSubtitle: "दररोज मेंदू तीक्ष्ण ठेवण्याचे व्यायाम! ✨",
  todaysWorkout: "आजचा मेंदूचा व्यायाम 🌟",
  tipTitle: "आजची टीप",
  tipBody: "रोज १० मिनिटांचा मेंदूचा व्यायाम खूप फरक करतो! तुम्ही खूप छान करत आहात! 🎉",
  backHome: "← मागे",
  home: "होम 🏠",
  tryAgain: "पुन्हा करा 🔄",
  next: "पुढील प्रश्न →",
  back: "← मागे",
  finish: "संपवा ✓",
  checkAnswer: "उत्तर तपासा ✓",
  playAgain: "पुन्हा खेळा 🔄",
  reviewAgain: "पुन्हा पाहा 🔄",
  chooseLanguage: "आज तुम्हाला कोणती भाषा शिकायची आहे?",
  tryAnotherLanguage: "दुसरी भाषा वापरा 🌍",

  points: "गुण",
  level: "स्तर",
  exercises: "व्यायाम",
  dayStreak: "दिवसांची मालिका",
  badges: "बॅज",
  progressTo: "स्तराकडे प्रगती",
  completeToearnBadges: "बॅज मिळवण्यासाठी व्यायाम पूर्ण करा! 🏅",
  levelTitles: ["मेंदूचा नवशिका", "मनाचा शोधक", "आठवणींचा उस्ताद", "ज्ञानाचा रक्षक", "मेंदूचा चॅम्पियन"],

  whatsappBtn: "📲 WhatsApp वर मित्रांशी शेअर करा",
  whatsappMsg: "🧠 मी रोज ब्रेन बूस्ट व्यायाम करतो/करते! तुम्हीही या!\n\n५ मजेशीर मेंदूचे व्यायाम:\n🔤 शब्द कोडे\n🔢 संख्या आव्हान\n📖 आठव आणि विचार कर\n🌍 नवीन काहीतरी शिका\n🧘 मनाची सफर\n\nफक्त १५ मिनिटे रोज, पूर्णपणे मोफत! 🌟",

  exercises_list: {
    wordPuzzle:     { title: "शब्द कोडे",       subtitle: "लपलेला शब्द शोधा",      description: "शब्दसंग्रह आणि स्मरणशक्ती वाढवा" },
    numberChallenge:{ title: "संख्या आव्हान",   subtitle: "जलद मानसिक गणित",       description: "संख्यांनी मेंदू तीक्ष्ण ठेवा" },
    memoryRecall:   { title: "आठव आणि सांग",    subtitle: "आठव आणि विचार कर",      description: "रोजची स्मरणशक्ती मजबूत करा" },
    learnSomething: { title: "नवीन काहीतरी शिका", subtitle: "रोज नवीन शब्द",       description: "नवीन ज्ञानाने मेंदू वाढवा" },
    mindJourney:    { title: "मनाची सफर",        subtitle: "शांत कल्पनाविहार",      description: "अवकाशीय स्मृतीचा व्यायाम करा" },
  },

  wp_title: "🔤 शब्द कोडे",
  wp_subtitle: (n) => `${n} अक्षरांचा शब्द ओळखा! (३० गुणांपर्यंत)`,
  wp_showHint: "💡 इशारा पाहा",
  wp_hideHint: "🙈 इशारा लपवा",
  wp_won: "अप्रतिम! तुम्ही केलंत! 🎉",
  wp_wordWas: "शब्द होता",
  wp_lostTitle: "छान प्रयत्न! शब्द होता:",
  wp_lostHint: "",
  wp_backToHome: "होमवर परत →",

  nc_title: "🔢 संख्या आव्हान",
  nc_subtitle: "३० गुणांपर्यंत जिंका!",
  nc_correct: "✅ बरोबर!",
  nc_answer: "उत्तर:",
  nc_excellent: "अप्रतिम!",
  nc_goodJob: "छान केलंत!",
  nc_keepPracticing: "सराव सुरू ठेवा!",
  nc_outOf: (s, t) => `तुम्ही ${t} पैकी ${s} बरोबर केले!`,

  mr_title: "📖 आठव आणि सांग",
  mr_subtitle: "३० गुणांपर्यंत जिंका!",
  mr_placeholder: "इथे तुमचे विचार लिहा... वेळ घ्या 😊",
  mr_amazingTitle: "अद्भुत स्मरणशक्ती!",
  mr_amazingBody: (f, t) => `तुम्ही ${t} पैकी ${f} प्रश्नांची उत्तरे दिली!`,
  mr_tip: "दिवसावर विचार केल्याने स्मरणशक्ती तीक्ष्ण राहते आणि मन आनंदी राहते!",
  mr_prompts: [
    { icon: "🌅", question: "आज सकाळी उठल्यावर सगळ्यात आधी तुम्ही काय केले?" },
    { icon: "🍽️", question: "शेवटचे जेवण काय होते? सांगा!" },
    { icon: "📞", question: "शेवटचे कोणाशी बोललात? काय बोलणे झाले?" },
    { icon: "🚶", question: "शेवटच्या फिरायला गेलात तेव्हा काय-काय पाहिले?" },
    { icon: "😄", question: "अलीकडे कशावरून हसलात किंवा आनंद झाला?" },
  ],

  ls_title: "🌍 नवीन काहीतरी शिका",
  ls_choosePrompt: "आज तुम्हाला कोणती भाषा शिकायची आहे?",
  ls_todaysWord: "आजचा नवीन शब्द",
  ls_tapToReveal: "👆 अर्थ पाहण्यासाठी स्पर्श करा!",
  ls_readAloud: "मोठ्याने वाचा — लक्षात राहील! 🗣️",
  ls_iLearned: "मी शिकलो/शिकले! ✅ (+१० गुण)",
  ls_learnedTitle: (n) => `तुम्ही ${n} नवीन गोष्टी शिकलात!`,
  ls_tryWord: "आज यांपैकी एक शब्द नक्की वापरा! 💬",

  viz_title: "🧘 मनाची सफर",
  viz_subtitle: "शांत कल्पनाविहार",
  viz_comfort1: "✅ आरामदायक खुर्चीवर बसा",
  viz_comfort2: "✅ स्वतःसाठी ५ शांत मिनिटे",
  viz_comfort3: "✅ वाचा किंवा डोळे मिटा",
  viz_begin: "सफर सुरू करा",
  viz_readyNext: "पुढील पायरीसाठी तयार",
  viz_stepOf: (c, t) => `पायरी ${c} / ${t}`,
  viz_complete: "सफर पूर्ण करा ✓",
  viz_wonTitle: "वाह! अप्रतिम!",
  viz_wonBody: "कल्पनाविहाराने स्मरणशक्ती मजबूत होते आणि ताण कमी होतो. तुम्ही तुमच्या मेंदूची खूप छान काळजी घेत आहात! 🧠",
  viz_doAgain: "पुन्हा करा 🔄",
  viz_journeys: [
    { title: "बागेत सकाळ", emoji: "🌸", steps: [
      { text: "डोळे मिटा. खोल श्वास घ्या... आणि हळूहळू सोडा. शरीर सैल सोडा.", duration: 8 },
      { text: "कल्पना करा की तुम्ही सकाळी एका सुंदर बागेत उभे आहात. हवा थंड आणि ताजी आहे.", duration: 8 },
      { text: "चहूबाजूंनी रंगीबेरंगी फुले आहेत — लाल गुलाब, पिवळी झेंडू, गुलाबी जाई. सुगंध येतोय का?", duration: 10 },
      { text: "पक्ष्यांचा किलबिलाट ऐकू येतोय. मंद वारा चेहऱ्याला स्पर्श करतोय. सूर्य उबदार आणि सोनेरी आहे.", duration: 10 },
      { text: "बागेतल्या पायवाटेवर हळूहळू चाला. पायाखाली हिरवे गवत जाणवा.", duration: 8 },
      { text: "तुम्ही एका बाकड्यापाशी पोहोचता. बसा आणि या शांतीचा अनुभव घ्या.", duration: 10 },
      { text: "तीन खोल श्वास घ्या. या सुंदर क्षणाबद्दल कृतज्ञ रहा. हळूच डोळे उघडा. 😊", duration: 8 },
    ]},
    { title: "नदीकाठी फेरफटका", emoji: "🌊", steps: [
      { text: "आरामात बसा. डोळे मिटा. हळूहळू श्वास घ्या. सर्व काळज्या दूर जाऊ द्या.", duration: 8 },
      { text: "तुम्ही एका शांत नदीच्या काठी उभे आहात. पाणी स्वच्छ आणि हळुवारपणे वाहत आहे.", duration: 8 },
      { text: "दगडांवर पाण्याचा मंद आवाज ऐकू येतोय. हे शांतिदायक आणि सुखद आहे.", duration: 10 },
      { text: "छोटे मासे पोहताना दिसतात. एक फुलपाखरू जवळच्या फुलावर बसते.", duration: 10 },
      { text: "आकाश निळे आहे, पांढरे ढग हळुवारपणे तरंगत आहेत. तुम्ही पूर्णपणे सुरक्षित आणि शांत आहात.", duration: 8 },
      { text: "थंड पाण्यात हात बुडवा. हे ताजेतवाने आणि हळुवार वाटते.", duration: 8 },
      { text: "नदीची ताजी हवा श्वासात घ्या. हसा. हळूच परत या. 💙", duration: 8 },
    ]},
    { title: "सर्वात आनंदाचा क्षण", emoji: "💛", steps: [
      { text: "आरामदायक स्थितीत बसा. डोळे मिटा. हळूहळू श्वास घ्या.", duration: 8 },
      { text: "एखाद्या वेळी तुम्ही खूप आनंदी होतात ती आठव करा. कुटुंबाची भेट, सण किंवा शांत दिवस.", duration: 10 },
      { text: "तो क्षण स्पष्टपणे पाहा. तुमच्यासोबत कोण होते? ते कसे दिसत होते?", duration: 10 },
      { text: "त्या आठवणीत कोणते आवाज आहेत? हास्य? संगीत? स्वयंपाकाचा आवाज?", duration: 10 },
      { text: "कोणता सुगंध? कोणती चव? त्या क्षणाला खरे आणि जिवंत जाणवू द्या.", duration: 10 },
      { text: "त्या क्षणाची उब आणि आनंद मनात भरून घ्या.", duration: 10 },
      { text: "हे भाव सोबत ठेवा. हळुवारपणे श्वास घ्या आणि डोळे उघडा. 🌟", duration: 8 },
    ]},
  ],

  badge_newTitle: "नवीन बॅज मिळाला!",
  badge_tapToContinue: "पुढे जाण्यासाठी कुठेही स्पर्श करा",
  badgeNames: {
    first_step:   { name: "पहिले पाऊल",       description: "पहिला व्यायाम पूर्ण केला" },
    word_master:  { name: "शब्द उस्ताद",       description: "शब्द कोडे ५ वेळा पूर्ण केले" },
    math_whiz:    { name: "गणित प्रतिभा",      description: "संख्या आव्हान ५ वेळा पूर्ण केले" },
    storyteller:  { name: "कथाकार",            description: "आठव ५ वेळा पूर्ण केले" },
    scholar:      { name: "विद्वान",            description: "नवीन काहीतरी ५ वेळा शिकले" },
    zen_master:   { name: "शांती गुरू",        description: "मनाची सफर ५ वेळा पूर्ण केली" },
    on_fire:      { name: "जोशात!",            description: "३ दिवसांची मालिका" },
    week_warrior: { name: "आठवड्याचा योद्धा", description: "७ दिवसांची मालिका" },
    century:      { name: "शतक",               description: "१०० गुण मिळवले" },
    all_rounder:  { name: "सर्वांगीण",         description: "सर्व ५ व्यायाम केले" },
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { en, hi, mr };

// Extended prompt banks (appended — used by memory-recall page directly)
export const PROMPTS_EN = [
  { icon: "🌅", question: "What did you do first thing this morning?" },
  { icon: "🍽️", question: "What did you eat for your last meal? Describe it!" },
  { icon: "📞", question: "Who did you last speak with? What did you talk about?" },
  { icon: "🚶", question: "Describe the last walk you took. What did you see?" },
  { icon: "😄", question: "What made you smile or laugh recently?" },
  { icon: "🌸", question: "What is your favourite flower and why do you love it?" },
  { icon: "🎵", question: "Name a song that makes you feel happy. Why does it?" },
  { icon: "👨‍👩‍👧", question: "Describe a favourite memory with your family." },
  { icon: "🍲", question: "What is your favourite home-cooked dish? How is it made?" },
  { icon: "🌙", question: "What did you dream about last night, if you remember?" },
  { icon: "🎁", question: "What is the best gift you have ever received?" },
  { icon: "📚", question: "Tell me about a book or story you once loved." },
  { icon: "🌳", question: "Describe your favourite place in nature." },
  { icon: "👶", question: "What do you remember from your childhood home?" },
  { icon: "☕", question: "Describe your perfect morning — what do you do?" },
  { icon: "🏡", question: "What is your favourite room in your home and why?" },
  { icon: "🌦️", question: "What is your favourite season and what do you love about it?" },
  { icon: "👭", question: "Tell me about a friend who has meant a lot to you." },
  { icon: "🎉", question: "Describe the most joyful celebration you can remember." },
  { icon: "🙏", question: "What are three things you feel grateful for today?" },
];

export const PROMPTS_HI = [
  { icon: "🌅", question: "आज सुबह उठकर सबसे पहले आपने क्या किया?" },
  { icon: "🍽️", question: "आपने आखिरी बार क्या खाया? बताइए!" },
  { icon: "📞", question: "आखिरी बार किससे बात की? क्या बात हुई?" },
  { icon: "🚶", question: "आखिरी बार टहलने गए तो क्या-क्या देखा?" },
  { icon: "😄", question: "हाल ही में किस बात पर हँसे या मुस्कुराए?" },
  { icon: "🌸", question: "आपका पसंदीदा फूल कौन सा है और क्यों?" },
  { icon: "🎵", question: "वो कौन सा गाना है जो सुनकर मन खुश हो जाता है?" },
  { icon: "👨‍👩‍👧", question: "परिवार के साथ कोई एक खास याद बताइए।" },
  { icon: "🍲", question: "आपका पसंदीदा घर का खाना क्या है? कैसे बनता है?" },
  { icon: "🌙", question: "रात को आपने क्या सपना देखा, याद है?" },
  { icon: "🎁", question: "अब तक मिला सबसे अच्छा तोहफा कौन सा था?" },
  { icon: "📚", question: "कोई एक किताब या कहानी जो आपको बहुत पसंद थी।" },
  { icon: "🌳", question: "प्रकृति में आपकी सबसे पसंदीदा जगह कौन सी है?" },
  { icon: "👶", question: "बचपन के घर की कोई एक याद बताइए।" },
  { icon: "☕", question: "आपकी आदर्श सुबह कैसी होगी?" },
  { icon: "🏡", question: "घर में आपका पसंदीदा कमरा या कोना कौन सा है?" },
  { icon: "🌦️", question: "आपका पसंदीदा मौसम कौन सा है और क्यों?" },
  { icon: "👭", question: "एक ऐसे दोस्त के बारे में बताइए जो आपके दिल के करीब है।" },
  { icon: "🎉", question: "अपनी ज़िंदगी का सबसे खुशी का जश्न बताइए।" },
  { icon: "🙏", question: "आज आप किन तीन चीज़ों के लिए शुक्रगुज़ार हैं?" },
];

export const PROMPTS_MR = [
  { icon: "🌅", question: "आज सकाळी उठल्यावर सगळ्यात आधी तुम्ही काय केले?" },
  { icon: "🍽️", question: "शेवटचे जेवण काय होते? सांगा!" },
  { icon: "📞", question: "शेवटचे कोणाशी बोललात? काय बोलणे झाले?" },
  { icon: "🚶", question: "शेवटच्या फिरायला गेलात तेव्हा काय-काय पाहिले?" },
  { icon: "😄", question: "अलीकडे कशावरून हसलात किंवा आनंद झाला?" },
  { icon: "🌸", question: "तुमचे आवडते फूल कोणते आणि का?" },
  { icon: "🎵", question: "असे एखादे गाणे सांगा जे ऐकले की मन प्रसन्न होते." },
  { icon: "👨‍👩‍👧", question: "कुटुंबासोबतची एखादी आवडती आठवण सांगा." },
  { icon: "🍲", question: "तुमचे आवडते घरचे जेवण कोणते? ते कसे बनते?" },
  { icon: "🌙", question: "काल रात्री काय स्वप्न पडले, आठवतेय का?" },
  { icon: "🎁", question: "आत्तापर्यंत मिळालेली सर्वात आवडती भेट कोणती?" },
  { icon: "📚", question: "एखादे पुस्तक किंवा गोष्ट जी तुम्हाला खूप आवडत होती." },
  { icon: "🌳", question: "निसर्गातील तुमची सर्वात आवडती जागा कोणती?" },
  { icon: "👶", question: "बालपणीच्या घराची एखादी आठवण सांगा." },
  { icon: "☕", question: "तुमची आदर्श सकाळ कशी असेल?" },
  { icon: "🏡", question: "घरात तुमची सर्वात आवडती खोली किंवा जागा कोणती?" },
  { icon: "🌦️", question: "तुमचा आवडता ऋतू कोणता आणि का?" },
  { icon: "👭", question: "एखाद्या मित्र/मैत्रिणीबद्दल सांगा जो तुमच्या मनाच्या जवळ आहे." },
  { icon: "🎉", question: "आयुष्यातील सर्वात आनंदाचा सण किंवा उत्सव सांगा." },
  { icon: "🙏", question: "आज तुम्ही कोणत्या तीन गोष्टींसाठी कृतज्ञ आहात?" },
];
