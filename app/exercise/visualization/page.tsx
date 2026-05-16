"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";
import { pickUnseen } from "@/lib/picker";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

type Step = { text: string; duration: number };
type Journey = { title: string; emoji: string; steps: Step[] };

const JOURNEYS_EN: Journey[] = [
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
  { title: "Sunrise on the Mountain", emoji: "⛰️", steps: [
    { text: "Take a deep breath. Relax your shoulders. Close your eyes gently.", duration: 8 },
    { text: "You are on a beautiful mountain at dawn. The air is crisp and cool.", duration: 8 },
    { text: "The sky begins to glow — first orange, then golden, then brilliant pink.", duration: 10 },
    { text: "The sun rises slowly over the horizon. Its warm light touches your face.", duration: 10 },
    { text: "You can see valleys, forests and a winding river far below you.", duration: 8 },
    { text: "You feel tall, strong, and at peace with the whole world.", duration: 10 },
    { text: "Take a deep breath of the mountain air. Hold the feeling. Slowly open your eyes. 🌄", duration: 8 },
  ]},
  { title: "Peaceful Rain", emoji: "🌧️", steps: [
    { text: "Breathe in deeply and let out a long, slow breath. Feel completely safe.", duration: 8 },
    { text: "You are sitting inside by a window. Outside, rain is falling softly.", duration: 8 },
    { text: "You hear the gentle patter of rain on the roof. It is a soothing sound.", duration: 10 },
    { text: "The world outside is green and fresh. The smell of rain on earth fills the air.", duration: 10 },
    { text: "You hold a warm cup of tea or coffee in your hands. Feel its warmth.", duration: 8 },
    { text: "You feel cosy, safe and completely content. Nothing to worry about right now.", duration: 10 },
    { text: "Breathe in the peace. Three slow breaths. Gently return to the room. ☕", duration: 8 },
  ]},
  { title: "Evening by the Sea", emoji: "🌅", steps: [
    { text: "Sit comfortably. Release any tension from your shoulders. Close your eyes.", duration: 8 },
    { text: "You are sitting on a warm sandy beach as the sun begins to set.", duration: 8 },
    { text: "The sky is painted with gold, orange and soft pink. The sea is calm.", duration: 10 },
    { text: "You hear the gentle waves lapping at the shore. A cool sea breeze touches you.", duration: 10 },
    { text: "You feel the warm sand between your fingers. Seagulls glide silently overhead.", duration: 8 },
    { text: "The sun sinks slowly into the horizon. You feel grateful for this moment.", duration: 10 },
    { text: "Take three peaceful breaths. Carry the colours of the sunset with you. 🌊", duration: 8 },
  ]},
];

const JOURNEYS_HI: Journey[] = [
  { title: "बगीचे में सुबह", emoji: "🌸", steps: [
    { text: "आँखें बंद करें। गहरी साँस लें... और धीरे-धीरे छोड़ें। शरीर को ढीला छोड़ें।", duration: 8 },
    { text: "सोचिए कि आप सुबह एक सुंदर बगीचे में खड़े हैं। हवा ठंडी और ताज़ी है।", duration: 8 },
    { text: "चारों तरफ रंग-बिरंगे फूल हैं — लाल गुलाब, पीले गेंदे, गुलाबी चमेली। क्या खुशबू आ रही है?", duration: 10 },
    { text: "पक्षियों की चहचहाहट सुनाई दे रही है। ठंडी हवा चेहरे को छू रही है।", duration: 10 },
    { text: "बगीचे की पगडंडी पर धीरे-धीरे चलें। पैरों के नीचे हरी घास महसूस करें।", duration: 8 },
    { text: "आप एक बेंच तक पहुँचते हैं। बैठ जाएं और इस शांति को महसूस करें।", duration: 10 },
    { text: "तीन गहरी साँसें लें। इस सुंदर पल के लिए शुक्रगुज़ार रहें। धीरे-धीरे आँखें खोलें। 😊", duration: 8 },
  ]},
  { title: "नदी के किनारे सैर", emoji: "🌊", steps: [
    { text: "आरामदायक बैठें। आँखें बंद करें। धीरे-धीरे साँस लें। सब चिंताएं दूर जाने दें।", duration: 8 },
    { text: "आप एक शांत नदी के किनारे खड़े हैं। पानी साफ और धीरे-धीरे बह रहा है।", duration: 8 },
    { text: "पत्थरों पर पानी की कोमल आवाज़ सुनाई दे रही है। यह शांतिदायक है।", duration: 10 },
    { text: "छोटी-छोटी मछलियाँ तैर रही हैं। एक तितली आपके पास फूल पर बैठती है।", duration: 10 },
    { text: "आसमान नीला है, सफेद बादल हल्के-हल्के तैर रहे हैं।", duration: 8 },
    { text: "ठंडे पानी में हाथ डालें। यह ताज़ा और कोमल लगता है।", duration: 8 },
    { text: "नदी की ताज़ी हवा में साँस लें। मुस्कुराएं। धीरे-धीरे वापस आएं। 💙", duration: 8 },
  ]},
  { title: "सबसे खुशी का पल", emoji: "💛", steps: [
    { text: "आरामदायक स्थिति में बैठें। आँखें बंद करें। धीरे-धीरे साँस लें।", duration: 8 },
    { text: "किसी ऐसे पल को याद करें जब आप बहुत खुश थे।", duration: 10 },
    { text: "उस पल को साफ-साफ देखें। आपके साथ कौन था?", duration: 10 },
    { text: "उस याद में कौन सी आवाज़ें हैं? हँसी? संगीत?", duration: 10 },
    { text: "कोई खुशबू? कोई स्वाद? उस पल को सच्चा महसूस करें।", duration: 10 },
    { text: "उस पल की गर्माहट और खुशी दिल में भर लें।", duration: 10 },
    { text: "यह एहसास अपने साथ रखें। धीरे साँस लें और आँखें खोलें। 🌟", duration: 8 },
  ]},
  { title: "पहाड़ पर सूर्योदय", emoji: "⛰️", steps: [
    { text: "गहरी साँस लें। कंधों को ढीला छोड़ें। आँखें धीरे से बंद करें।", duration: 8 },
    { text: "आप भोर में एक सुंदर पहाड़ पर हैं। हवा ताज़ी और ठंडी है।", duration: 8 },
    { text: "आसमान धीरे-धीरे रंग बदल रहा है — पहले नारंगी, फिर सुनहरा, फिर गुलाबी।", duration: 10 },
    { text: "सूरज धीरे-धीरे उगता है। उसकी गर्म रोशनी आपके चेहरे पर पड़ती है।", duration: 10 },
    { text: "आप नीचे घाटियाँ, जंगल और एक नदी देख सकते हैं।", duration: 8 },
    { text: "आप बलशाली, शांत और पूरी दुनिया से जुड़े हुए महसूस करते हैं।", duration: 10 },
    { text: "पहाड़ की हवा में एक गहरी साँस लें। धीरे-धीरे आँखें खोलें। 🌄", duration: 8 },
  ]},
  { title: "शांत बारिश", emoji: "🌧️", steps: [
    { text: "गहरी साँस लें और धीरे-धीरे छोड़ें। आप पूरी तरह सुरक्षित हैं।", duration: 8 },
    { text: "आप एक खिड़की के पास बैठे हैं। बाहर हल्की-हल्की बारिश हो रही है।", duration: 8 },
    { text: "छत पर बारिश की बूँदों की आवाज़ सुनाई दे रही है। यह मन को सुकून देती है।", duration: 10 },
    { text: "बाहर की दुनिया हरी-भरी और ताज़ी है। मिट्टी की खुशबू हवा में है।", duration: 10 },
    { text: "आपके हाथों में एक गर्म चाय का प्याला है। उसकी गर्माहट महसूस करें।", duration: 8 },
    { text: "आप आरामदायक, सुरक्षित और पूरी तरह संतुष्ट महसूस करते हैं।", duration: 10 },
    { text: "इस शांति में साँस लें। तीन धीमी साँसें। धीरे-धीरे वापस आएं। ☕", duration: 8 },
  ]},
  { title: "समुद्र किनारे शाम", emoji: "🌅", steps: [
    { text: "आरामदायक बैठें। कंधों की थकान छोड़ें। आँखें बंद करें।", duration: 8 },
    { text: "आप एक गर्म रेतीले समुद्र तट पर बैठे हैं। सूरज ढलने लगा है।", duration: 8 },
    { text: "आसमान सोने, नारंगी और हल्के गुलाबी रंग से रंगा है। समुद्र शांत है।", duration: 10 },
    { text: "लहरों की कोमल आवाज़ सुनाई दे रही है। ठंडी समुद्री हवा आपको छू रही है।", duration: 10 },
    { text: "आप उँगलियों में गर्म रेत महसूस करते हैं। ऊपर समुद्री पक्षी उड़ रहे हैं।", duration: 8 },
    { text: "सूरज धीरे-धीरे क्षितिज में डूब रहा है। आप इस पल के लिए कृतज्ञ हैं।", duration: 10 },
    { text: "तीन शांत साँसें लें। सूरज के रंग अपने साथ ले जाएं। 🌊", duration: 8 },
  ]},
];

const JOURNEYS_MR: Journey[] = [
  { title: "बागेत सकाळ", emoji: "🌸", steps: [
    { text: "डोळे मिटा. खोल श्वास घ्या... आणि हळूहळू सोडा. शरीर सैल सोडा.", duration: 8 },
    { text: "कल्पना करा की तुम्ही सकाळी एका सुंदर बागेत उभे आहात. हवा थंड आणि ताजी आहे.", duration: 8 },
    { text: "चहूबाजूंनी रंगीबेरंगी फुले आहेत — लाल गुलाब, पिवळी झेंडू, गुलाबी जाई.", duration: 10 },
    { text: "पक्ष्यांचा किलबिलाट ऐकू येतोय. मंद वारा चेहऱ्याला स्पर्श करतोय.", duration: 10 },
    { text: "बागेतल्या पायवाटेवर हळूहळू चाला. पायाखाली हिरवे गवत जाणवा.", duration: 8 },
    { text: "तुम्ही एका बाकड्यापाशी पोहोचता. बसा आणि या शांतीचा अनुभव घ्या.", duration: 10 },
    { text: "तीन खोल श्वास घ्या. या सुंदर क्षणाबद्दल कृतज्ञ रहा. हळूच डोळे उघडा. 😊", duration: 8 },
  ]},
  { title: "नदीकाठी फेरफटका", emoji: "🌊", steps: [
    { text: "आरामात बसा. डोळे मिटा. हळूहळू श्वास घ्या. सर्व काळज्या दूर जाऊ द्या.", duration: 8 },
    { text: "तुम्ही एका शांत नदीच्या काठी उभे आहात. पाणी स्वच्छ आणि हळुवारपणे वाहत आहे.", duration: 8 },
    { text: "दगडांवर पाण्याचा मंद आवाज ऐकू येतोय. हे शांतिदायक आहे.", duration: 10 },
    { text: "छोटे मासे पोहताना दिसतात. एक फुलपाखरू जवळच्या फुलावर बसते.", duration: 10 },
    { text: "आकाश निळे आहे, पांढरे ढग हळुवारपणे तरंगत आहेत.", duration: 8 },
    { text: "थंड पाण्यात हात बुडवा. हे ताजेतवाने आणि हळुवार वाटते.", duration: 8 },
    { text: "नदीची ताजी हवा श्वासात घ्या. हसा. हळूच परत या. 💙", duration: 8 },
  ]},
  { title: "सर्वात आनंदाचा क्षण", emoji: "💛", steps: [
    { text: "आरामदायक स्थितीत बसा. डोळे मिटा. हळूहळू श्वास घ्या.", duration: 8 },
    { text: "एखाद्या वेळी तुम्ही खूप आनंदी होतात ती आठव करा.", duration: 10 },
    { text: "तो क्षण स्पष्टपणे पाहा. तुमच्यासोबत कोण होते?", duration: 10 },
    { text: "त्या आठवणीत कोणते आवाज आहेत? हास्य? संगीत?", duration: 10 },
    { text: "कोणता सुगंध? कोणती चव? त्या क्षणाला खरे जाणवू द्या.", duration: 10 },
    { text: "त्या क्षणाची उब आणि आनंद मनात भरून घ्या.", duration: 10 },
    { text: "हे भाव सोबत ठेवा. हळुवारपणे श्वास घ्या आणि डोळे उघडा. 🌟", duration: 8 },
  ]},
  { title: "डोंगरावर सूर्योदय", emoji: "⛰️", steps: [
    { text: "खोल श्वास घ्या. खांदे सैल सोडा. डोळे हळुवारपणे मिटा.", duration: 8 },
    { text: "तुम्ही पहाटे एका सुंदर डोंगरावर आहात. हवा ताजी आणि थंड आहे.", duration: 8 },
    { text: "आकाश हळूहळू रंग बदलते — आधी केशरी, मग सोनेरी, मग गुलाबी.", duration: 10 },
    { text: "सूर्य हळूहळू उगवतो. त्याचा उबदार प्रकाश तुमच्या चेहऱ्यावर पडतो.", duration: 10 },
    { text: "खाली दऱ्या, जंगले आणि वळणदार नदी दिसते.", duration: 8 },
    { text: "तुम्ही बलवान, शांत आणि संपूर्ण जगाशी जोडलेले वाटता.", duration: 10 },
    { text: "डोंगराच्या हवेत एक खोल श्वास घ्या. हळूच डोळे उघडा. 🌄", duration: 8 },
  ]},
  { title: "शांत पाऊस", emoji: "🌧️", steps: [
    { text: "खोल श्वास घ्या आणि हळूहळू सोडा. तुम्ही पूर्णपणे सुरक्षित आहात.", duration: 8 },
    { text: "तुम्ही एका खिडकीजवळ बसला आहात. बाहेर हळुवार पाऊस पडतोय.", duration: 8 },
    { text: "छतावर पावसाच्या थेंबांचा मंद आवाज ऐकू येतो. हे मनाला सुखावते.", duration: 10 },
    { text: "बाहेरचे जग हिरवेगार आणि ताजे आहे. मातीचा सुगंध हवेत आहे.", duration: 10 },
    { text: "तुमच्या हातात उबदार चहाचा कप आहे. त्याची उब जाणवा.", duration: 8 },
    { text: "तुम्ही आरामदायक, सुरक्षित आणि पूर्णपणे समाधानी आहात.", duration: 10 },
    { text: "या शांतीत श्वास घ्या. तीन मंद श्वास. हळूच परत या. ☕", duration: 8 },
  ]},
  { title: "समुद्रकिनारी संध्याकाळ", emoji: "🌅", steps: [
    { text: "आरामात बसा. खांद्यातील थकवा सोडा. डोळे मिटा.", duration: 8 },
    { text: "तुम्ही एका उबदार वाळूच्या समुद्रकिनारी बसला आहात. सूर्य मावळतीला आहे.", duration: 8 },
    { text: "आकाश सोनेरी, केशरी आणि हलक्या गुलाबी रंगाने रंगले आहे. समुद्र शांत आहे.", duration: 10 },
    { text: "लाटांचा हळुवार आवाज ऐकू येतो. थंड समुद्री वारा तुम्हाला स्पर्श करतो.", duration: 10 },
    { text: "बोटांमध्ये उबदार वाळू जाणवते. वरून समुद्रपक्षी शांतपणे उडतात.", duration: 8 },
    { text: "सूर्य हळूहळू क्षितिजात बुडतो. या क्षणाबद्दल तुम्ही कृतज्ञ आहात.", duration: 10 },
    { text: "तीन शांत श्वास घ्या. सूर्यास्ताचे रंग सोबत घेऊन जा. 🌊", duration: 8 },
  ]},
];

export default function VisualizationPage() {
  const { t, lang } = useLang();
  const allJourneys = lang === "hi" ? JOURNEYS_HI : lang === "mr" ? JOURNEYS_MR : JOURNEYS_EN;

  const [journey, setJourney] = useState<Journey | null>(null);
  const [step, setStep] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  useEffect(() => {
    setJourney(pickUnseen(`viz-${lang}`, allJourneys));
    setStep(-1); setDone(false); setShowConfetti(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!journey || step < 0 || done) return;
    setTimeLeft(journey.steps[step].duration);
    const interval = setInterval(() => setTimeLeft(t => t <= 1 ? (clearInterval(interval), 0) : t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, journey, done]);

  const goNext = () => {
    if (!journey) return;
    if (step + 1 >= journey.steps.length) {
      const pts = 20;
      const { newBadges: nb } = addExercisePoints("visualization", pts);
      setPointsEarned(pts); setPointsKey(k => k + 1); setNewBadges(nb);
      window.dispatchEvent(new Event("progress-updated"));
      setDone(true); setShowConfetti(true);
    } else { setStep(step + 1); }
  };

  const currentStep = journey && step >= 0 && step < journey.steps.length ? journey.steps[step] : null;
  const progress = journey && step >= 0 ? ((step + 1) / journey.steps.length) * 100 : 0;

  if (!journey) return <div className="min-h-screen flex items-center justify-center text-2xl">...</div>;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-pink-800">{t.viz_title}</h1>
            <p className="text-pink-600 text-lg">{journey.title}</p>
          </div>
        </div>

        {step === -1 && !done && (
          <div className="text-center bounce-in">
            <div className="text-8xl mb-6 float">{journey.emoji}</div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-6">
              <h2 className="text-3xl font-bold text-pink-800 mb-3">{journey.title}</h2>
              <p className="text-xl text-gray-600 mb-4">{journey.steps.length} steps · 20 {t.points} 🌟</p>
              <div className="text-left space-y-2 text-lg text-gray-600">
                <p>{t.viz_comfort1}</p><p>{t.viz_comfort2}</p><p>{t.viz_comfort3}</p>
              </div>
            </div>
            <button onClick={() => setStep(0)} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-5 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              {t.viz_begin} {journey.emoji}
            </button>
          </div>
        )}

        {step >= 0 && !done && currentStep && (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div className="bg-pink-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-6 min-h-[200px] flex flex-col items-center justify-center text-center bounce-in" key={step}>
              <div className="text-4xl mb-4">{["🌬️","🌸","🌈","🎵","🌿","💧","⭐"][step % 7]}</div>
              <p className="text-2xl text-gray-800 leading-relaxed">{currentStep.text}</p>
            </div>
            <div className="text-center mb-4">
              <div className="inline-block bg-pink-100 rounded-full px-5 py-2 text-pink-700 font-semibold text-xl">
                {timeLeft > 0 ? `⏱ ${timeLeft}...` : t.viz_readyNext}
              </div>
            </div>
            <button onClick={goNext} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-4 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              {step + 1 >= journey.steps.length ? t.viz_complete : "→"}
            </button>
            <p className="text-center text-gray-400 mt-3">{t.viz_stepOf(step + 1, journey.steps.length)}</p>
          </div>
        )}

        {done && (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-pink-800 mb-2">{t.viz_wonTitle}</h2>
            <p className="text-xl text-pink-700 mb-2">{journey.title}</p>
            <p className="text-gray-600 text-lg mb-6">{t.viz_wonBody}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => {
                setJourney(pickUnseen(`viz-${lang}`, allJourneys));
                setStep(-1); setDone(false); setShowConfetti(false);
              }} className="bg-pink-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-pink-600 transition-colors">{t.viz_doAgain}</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">{t.home}</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
