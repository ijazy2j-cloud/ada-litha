// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// A short, plain reflection for each Dhammapada verse shown (Dhp 1–60), keyed
// by verse number. These are gentle, everyday glosses on the verse's meaning —
// not commentary or doctrine, and not a sermon. A Sinhala editor (and ideally
// someone familiar with the Dhammapada) should confirm the wording before
// launch.
export const GATHA_REFLECTIONS_VERIFIED = false;

export interface GathaReflection {
  si: string;
  en: string;
}

// Keyed by Dhammapada verse number.
export const GATHA_REFLECTIONS: Record<number, GathaReflection> = {
  1: {
    si: 'හැම ක්‍රියාවක්ම පටන් ගන්නේ සිතෙනි. අද සිත පිරිසිදුව තබා ගනිමු.',
    en: 'Every action begins in the mind. Tend the mind first, and the day follows.',
  },
  2: {
    si: 'පැහැදුණු සිතකින් කරන දේ පසුපස සැනසුම සෙවණැල්ලක් සේ එයි.',
    en: 'When the mind is clear, ease follows our actions like a faithful shadow.',
  },
  3: {
    si: 'තැළුම් බැණුම් සිතේ රඳවා ගැනීමෙන් වෛරය වැඩෙයි. අත හැරීම සැහැල්ලුවකි.',
    en: 'Clinging to hurts only feeds resentment. Letting go is the lighter path.',
  },
  4: {
    si: 'අමනාප සිතිවිලි අත්හළ විට හිත ඉබේම සන්සුන් වෙයි.',
    en: 'Release the grudge and the heart quietens on its own.',
  },
  5: {
    si: 'වෛරයට වෛරයෙන් උත්තර දීමෙන් එය නොනිමේ; කරුණාවෙන්ම සන්සිඳේ.',
    en: 'Anger answered with anger never ends; only kindness can still it.',
  },
  6: {
    si: 'අප සැම අස්ථිර බව මතක තබා ගත් විට, කුඩා රණ්ඩු තේරුමක් නැති වෙයි.',
    en: 'Remembering that all of us pass makes small quarrels lose their grip.',
  },
  7: {
    si: 'සැප පමණක් පතමින් අයාලේ ගියොත් සිත දුර්වල වෙයි.',
    en: 'Chasing only comfort, unguarded, leaves the mind easily shaken.',
  },
  8: {
    si: 'පමණ දැන, සංවරව ජීවත් වන්නා ගල්පර්වතයක් සේ ස්ථිරයි.',
    en: 'Lived with moderation and restraint, the mind stands firm as a mountain.',
  },
  9: {
    si: 'පිටතැති ලකුණුවලට වඩා ඇතුළත පිරිසිදුකම වටී.',
    en: 'Outward signs mean little without inner honesty and restraint.',
  },
  10: {
    si: 'සිල්හි පිහිටා, සත්‍යයෙන් යුතු වීම සැබෑ වටිනාකමයි.',
    en: 'True worth is steadiness in virtue and truth.',
  },
  11: {
    si: 'හරය නැති දෙයින් හරයක් සොයන්නෝ සැබෑ දෙයට නොපැමිණෙති.',
    en: 'Seeking substance in the trivial, we miss what truly matters.',
  },
  12: {
    si: 'වැදගත් දේ වැදගත් ලෙස හඳුනා ගැනීම පටන් ගැනීමයි.',
    en: 'Knowing the essential from the trivial is where the path opens.',
  },
  13: {
    si: 'නොසෙවිලි ගෙයකට වැස්ස මෙන්, නොවැඩූ සිතට ආශාව පහසුවෙන් කා වදී.',
    en: 'An untended mind, like a leaky roof, lets craving seep straight in.',
  },
  14: {
    si: 'හොඳින් වැඩූ සිතකට කලබලය පහසුවෙන් කා නොවදී.',
    en: 'A well-tended mind keeps restlessness from soaking through.',
  },
  15: {
    si: 'හානිකර ක්‍රියා පසුව තැවීමක්ම ඉතිරි කරයි.',
    en: 'Harmful deeds leave only regret in their wake.',
  },
  16: {
    si: 'හොඳ ක්‍රියා, දැක ආපසු සිහිකරන විට, සතුටක්ම ගෙන දෙයි.',
    en: 'Good deeds bring quiet gladness each time we recall them.',
  },
  17: {
    si: 'වැරදි ක්‍රියා සිත දෙවරක් තවයි — කරන විටද, මතක් වන විටද.',
    en: 'Wrongdoing burns twice — in the doing and in the remembering.',
  },
  18: {
    si: 'හොඳ ක්‍රියා සිත දෙවරක් සනසයි.',
    en: 'Kind deeds gladden us twice over.',
  },
  19: {
    si: 'බොහෝ දේ දැනීම නොව, ඒ අනුව කිරීමයි ඵලය ගෙන දෙන්නේ.',
    en: 'Knowing much means little; living it is what bears fruit.',
  },
  20: {
    si: 'ටිකක් දැන, ඒ අනුව සන්සුන්ව ජීවත් වීම ඇත.',
    en: 'Even a little, truly practised, carries us further than much only spoken.',
  },
  21: {
    si: 'සිහියෙන් සිටීම ජීවය වැනියි; ප්‍රමාදය නිදිකිරීමක් වැනියි.',
    en: 'Heedfulness is a kind of being awake; carelessness, a kind of sleep.',
  },
  22: {
    si: 'නුවණැත්තෝ සිහියෙන් සිටීම ඇගයීමට ලක් කරති.',
    en: 'The wise take quiet delight in staying attentive.',
  },
  23: {
    si: 'ස්ථිර, නොනවතින උත්සාහයෙන් සැබෑ නිදහස ළං වෙයි.',
    en: 'Steady, unhurried effort brings true freedom nearer.',
  },
  24: {
    si: 'උනන්දුව, සිහිය හා පිරිසිදු ක්‍රියා ඇත්තාගේ ගෞරවය ඉබේම වැඩෙයි.',
    en: 'For the diligent and mindful, respect grows quietly of itself.',
  },
  25: {
    si: 'උත්සාහයෙන් හා සංයමයෙන්, කිසි පහරකින් නොයටවන තැනක් සිත තුළ තනා ගත හැකියි.',
    en: 'With effort and restraint we can build an inner island no flood reaches.',
  },
  26: {
    si: 'සිහිය උතුම් ධනයක් සේ රැකගත යුතුය.',
    en: 'Guard your attentiveness as you would your dearest treasure.',
  },
  27: {
    si: 'ප්‍රමාදයටවත් අධික ආශාවටවත් යට නොවී, සන්සුන්ව සිටීම මහත් සැපයකි.',
    en: 'Free of both carelessness and craving, the calm mind finds abundant ease.',
  },
  28: {
    si: 'සිහිය ලබාගත් විට, කලබලයෙන් ඉවත්ව සන්සුන්ව බැලිය හැකියි.',
    en: 'With a steadied mind we can look on turmoil calmly, from a quiet height.',
  },
  29: {
    si: 'අන් අය නිදන විට අවදිව සිටින්නා ඉදිරියට යයි.',
    en: 'Awake while others drowse, the attentive one quietly moves ahead.',
  },
  30: {
    si: 'සිහියෙන් සිටීම සැම කල්හි ඇගයෙයි.',
    en: 'Attentiveness has always been worthy of praise.',
  },
  31: {
    si: 'සිහියෙහි ඇලුණු සිත කුඩා බැඳීම් පවා සැහැල්ලු කරයි.',
    en: 'A mind that values awareness loosens even its smallest knots.',
  },
  32: {
    si: 'සිහියෙන් සිටින්නා පිරිහීමට ඈතය, සැනසුමට ළඟය.',
    en: 'The attentive one drifts not backward, but ever toward peace.',
  },
  33: {
    si: 'සැලෙන සිත, හීවඩුවා ඊතලයක් සේ, ඉවසීමෙන් ඍජු කරගත හැකියි.',
    en: 'The restless mind can be straightened, patiently, as a fletcher straightens an arrow.',
  },
  34: {
    si: 'සිත නොසන්සුන් වන විට එය හඳුනා ගැනීමම පළමු පියවරයි.',
    en: 'Simply noticing the mind’s restlessness is itself the first step.',
  },
  35: {
    si: 'දැමුණු සිත සැනසුම ගෙන දෙයි.',
    en: 'A gently tamed mind brings its own quiet happiness.',
  },
  36: {
    si: 'සියුම් සිත ආදරයෙන් රැකගැනීම සැපය ගෙන දෙයි.',
    en: 'Watched over with care, the subtle mind grows peaceful.',
  },
  37: {
    si: 'හුදකලාව හැසිරෙන සිත සංයමයට ගැනීම නිදහසට මඟයි.',
    en: 'Gathering the far-wandering mind is a path to freedom.',
  },
  38: {
    si: 'සිත නොසන්සුන් නම් නුවණ සම්පූර්ණ නොවේ; සන්සුන්කම පළමුවෙන්.',
    en: 'An unsettled mind cannot ripen into wisdom; steadiness comes first.',
  },
  39: {
    si: 'සන්සුන්, නොකැළඹුණු සිතකට බියක් නැත.',
    en: 'A calm, untroubled mind has nothing to fear.',
  },
  40: {
    si: 'මේ කය බොර බව දැන, සිත නුවණින් රැකගත යුතුය.',
    en: 'Knowing the body is fragile, guard the mind with wisdom.',
  },
  41: {
    si: 'කය අස්ථිර බව මතකය, අද මොහොත වටිනවා කරයි.',
    en: 'Remembering the body’s impermanence makes this moment precious.',
  },
  42: {
    si: 'වැරදි ලෙස මෙහෙයවූ සිත බාහිර සතුරෙකුටත් වඩා හානි කරයි.',
    en: 'A misdirected mind can harm us more than any enemy.',
  },
  43: {
    si: 'මනාව මෙහෙයවූ සිත ආදරණීයයන්ටත් වඩා යහපතක් කරයි.',
    en: 'A well-directed mind does us more good than even those who love us.',
  },
  44: {
    si: 'දක්ෂයෙකු මල් තෝරන සේ, දැහැමි දේ සොයා තෝරා ගත හැකියි.',
    en: 'As a skilled hand gathers flowers, we can gather what is wholesome.',
  },
  45: {
    si: 'හික්මෙන්නා සෙමින්, මලක් තෝරන සේ, මඟ ගොඩනඟා ගනියි.',
    en: 'The one in training builds the path gently, flower by flower.',
  },
  46: {
    si: 'කය පෙණ පිඬක් බව දැන, සිත සැහැල්ලු කරගත හැකියි.',
    en: 'Seeing the body as fleeting as foam lightens the mind.',
  },
  47: {
    si: 'සැප පමණක් එක්රැස් කිරීමෙහි ඇලුණොත්, කාලය ඉක්මනින් ගෙවී යයි.',
    en: 'Lost in gathering pleasures, we may not notice how swiftly time slips by.',
  },
  48: {
    si: 'තෘප්තිය පිටතින් සොයන තාක්, එය නොලැබේ.',
    en: 'Sought only outside, contentment keeps slipping away.',
  },
  49: {
    si: 'බඹරා මලට හානි නොකරන සේ, අන් අයට බරක් නොවී ජීවත් විය හැකියි.',
    en: 'Like a bee that leaves the flower unharmed, we can live lightly on others.',
  },
  50: {
    si: 'අනුන්ගේ වැරදි නොව, තමාගේ ක්‍රියාම බැලීම යහපති.',
    en: 'Better to watch our own deeds than to weigh others’ faults.',
  },
  51: {
    si: 'ඒ අනුව නොකරන ලස්සන වචන සුවඳ නැති මලක් වැනියි.',
    en: 'Fine words unlived are like a bright flower with no scent.',
  },
  52: {
    si: 'ඒ අනුව කරන වචන සුවඳ ඇති මලක් සේ ඵලදායකයි.',
    en: 'Fine words lived out are a flower with both colour and fragrance.',
  },
  53: {
    si: 'මල් ගොඩකින් බොහෝ මාලා සේ, මේ ජීවිතයෙන් බොහෝ යහපත් කළ හැකියි.',
    en: 'As many garlands come from one heap of flowers, much good can come of this life.',
  },
  54: {
    si: 'හොඳ ගුණයේ සුවඳ සුළඟටත් එරෙහිව පැතිරෙයි.',
    en: 'The fragrance of goodness travels even against the wind.',
  },
  55: {
    si: 'සියලු සුවඳ අතර, සිල්වත් බවේ සුවඳ උතුම්ය.',
    en: 'Among all fragrances, the scent of virtue is the finest.',
  },
  56: {
    si: 'සිල්වත් බව සියුම්ව, දුර පැතිරෙයි.',
    en: 'Goodness has a quiet fragrance that carries far.',
  },
  57: {
    si: 'සිහියෙන් සිල්වත්ව වෙසෙන්නාට මාරයාට පවා මඟ සොයාගත නොහැකියි.',
    en: 'For one living mindful and good, even Mara cannot find the way.',
  },
  58: {
    si: 'කසළ ගොඩක වුව සුවඳැති නෙළුමක් පිපෙන සේ, දුෂ්කරතා මැද යහපත හටගත හැකියි.',
    en: 'As a sweet lotus blooms on a rubbish heap, goodness can rise amid hardship.',
  },
  59: {
    si: 'අඳුර මැද වුව, නුවණ සැහැල්ලුවෙන් බබළයි.',
    en: 'Even amid confusion, wisdom shines softly through.',
  },
  60: {
    si: 'නොනිදන්නාට රෑ දිගු සේ, සිහියක් නැතිව ගත වන කාලයද දිගුය.',
    en: 'As the night is long to the sleepless, time drags when lived without awareness.',
  },
};

/** Reflection for a verse number, if one is on file. */
export function reflectionForGatha(n: number): GathaReflection | undefined {
  return GATHA_REFLECTIONS[n];
}
