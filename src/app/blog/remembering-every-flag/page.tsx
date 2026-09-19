import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "my mental model for remembering every flag | Tanay Gondil",
  description: "an insight into my big brain",
};

type Entry = { text: string; flags: [string, string][] };

const sections: { title: string; entries: Entry[] }[] = [
  {
    title: "ones I just know",
    entries: [
      { text: "china", flags: [["CN", "china"]] },
      { text: "pakistan", flags: [["PK", "pakistan"]] },
      { text: "portugal", flags: [["PT", "portugal"]] },
      { text: "nigeria", flags: [["NG", "nigeria"]] },
      { text: "canada", flags: [["CA", "canada"]] },
      { text: "belgium", flags: [["BE", "belgium"]] },
      { text: "france", flags: [["FR", "france"]] },
      { text: "germany", flags: [["DE", "germany"]] },
      { text: "italy", flags: [["IT", "italy"]] },
      { text: "hungary", flags: [["HU", "hungary"]] },
      { text: "mexico", flags: [["MX", "mexico"]] },
      { text: "ukraine", flags: [["UA", "ukraine"]] },
      { text: "israel", flags: [["IL", "israel"]] },
      { text: "north korea", flags: [["KP", "north korea"]] },
      { text: "argentina", flags: [["AR", "argentina"]] },
      { text: "spain", flags: [["ES", "spain"]] },
      { text: "estonia (david laid)", flags: [["EE", "estonia"]] },
      { text: "russia", flags: [["RU", "russia"]] },
      { text: "india", flags: [["IN", "india"]] },
      { text: "kenya", flags: [["KE", "kenya"]] },
      { text: "georgia", flags: [["GE", "georgia"]] },
      { text: "australia", flags: [["AU", "australia"]] },
      { text: "nz (nz is red stars)", flags: [["NZ", "new zealand"]] },
      { text: "taiwan", flags: [["TW", "taiwan"]] },
      { text: "uruguay", flags: [["UY", "uruguay"]] },
      { text: "usa", flags: [["US", "united states"]] },
      { text: "bangladesh", flags: [["BD", "bangladesh"]] },
      { text: "south korea", flags: [["KR", "south korea"]] },
      { text: "japan", flags: [["JP", "japan"]] },
      { text: "brazil", flags: [["BR", "brazil"]] },
      { text: "uk", flags: [["GB", "united kingdom"]] },
      { text: "turkey", flags: [["TR", "turkey"]] },
      { text: "switzerland", flags: [["CH", "switzerland"]] },
    ],
  },
  {
    title: "versions of other flags:",
    entries: [
      { text: "tunisia → turkey", flags: [["TN", "tunisia"], ["TR", "turkey"]] },
      { text: "vietnam → china", flags: [["VN", "vietnam"], ["CN", "china"]] },
      { text: "côte d’ivoire → ireland reversed", flags: [["CI", "côte d’ivoire"], ["IE", "ireland"]] },
      { text: "mali / guinea", flags: [["ML", "mali"], ["GN", "guinea"]] },
      { text: "laos → japan", flags: [["LA", "laos"], ["JP", "japan"]] },
      { text: "niger → india", flags: [["NE", "niger"], ["IN", "india"]] },
      { text: "monaco → poland / indonesia", flags: [["MC", "monaco"], ["PL", "poland"], ["ID", "indonesia"]] },
      { text: "liberia / united states", flags: [["LR", "liberia"], ["US", "united states"]] },
      { text: "malaysia / united states", flags: [["MY", "malaysia"], ["US", "united states"]] },
      { text: "palau / japan", flags: [["PW", "palau"], ["JP", "japan"]] },
      { text: "moldova / romania", flags: [["MD", "moldova"], ["RO", "romania"]] },
      { text: "andorra / romania", flags: [["AD", "andorra"], ["RO", "romania"]] },
      { text: "peru / canada", flags: [["PE", "peru"], ["CA", "canada"]] },
      { text: "costa rica / thailand", flags: [["CR", "costa rica"], ["TH", "thailand"]] },
      { text: "haiti / liechtenstein", flags: [["HT", "haiti"], ["LI", "liechtenstein"]] },
      { text: "chile / united states", flags: [["CL", "chile"], ["US", "united states"]] },
    ],
  },
  {
    title: "twins →",
    entries: [
      { text: "poland / indonesia", flags: [["PL", "poland"], ["ID", "indonesia"]] },
      { text: "chad / romania", flags: [["TD", "chad"], ["RO", "romania"]] },
      { text: "australia → nz", flags: [["AU", "australia"], ["NZ", "new zealand"]] },
      { text: "laos → japan / bangladesh", flags: [["LA", "laos"], ["JP", "japan"], ["BD", "bangladesh"]] },
      { text: "slovenia / slovakia", flags: [["SI", "slovenia"], ["SK", "slovakia"]] },
      { text: "serbia / croatia", flags: [["RS", "serbia"], ["HR", "croatia"]] },
      { text: "bahrain / qatar", flags: [["BH", "bahrain"], ["QA", "qatar"]] },
      { text: "netherlands / luxembourg", flags: [["NL", "netherlands"], ["LU", "luxembourg"]] },
      { text: "austria / latvia", flags: [["AT", "austria"], ["LV", "latvia"]] },
      { text: "colombia / ecuador / venezuela", flags: [["CO", "colombia"], ["EC", "ecuador"], ["VE", "venezuela"]] },
    ],
  },
  {
    title: "crescent flags",
    entries: [
      { text: "mauritania", flags: [["MR", "mauritania"]] },
      { text: "azerbaijan", flags: [["AZ", "azerbaijan"]] },
      { text: "libya", flags: [["LY", "libya"]] },
      { text: "maldives", flags: [["MV", "maldives"]] },
      { text: "algeria", flags: [["DZ", "algeria"]] },
      { text: "singapore", flags: [["SG", "singapore"]] },
      { text: "malaysia", flags: [["MY", "malaysia"]] },
      { text: "uzbekistan", flags: [["UZ", "uzbekistan"]] },
      { text: "turkmenistan", flags: [["TM", "turkmenistan"]] },
      { text: "comoros", flags: [["KM", "comoros"]] },
      { text: "pakistan", flags: [["PK", "pakistan"]] },
      { text: "turkey", flags: [["TR", "turkey"]] },
      { text: "tunisia", flags: [["TN", "tunisia"]] },
      { text: "brunei", flags: [["BN", "brunei"]] },
    ],
  },
  {
    title: "country on flag:",
    entries: [
      { text: "kosovo & cyprus", flags: [["XK", "kosovo"], ["CY", "cyprus"]] },
    ],
  },
  {
    title: "name games:",
    entries: [
      { text: "ecuador → eaglecuador", flags: [["EC", "ecuador"]] },
      { text: "slovenia → snowvenia (and the other one is slovakia)", flags: [["SI", "slovenia"], ["SK", "slovakia"]] },
    ],
  },
  {
    title: "fun flags that are so distinct they can’t be classified",
    entries: [
      { text: "nepal → not even a rectangle", flags: [["NP", "nepal"]] },
      { text: "bhutan → dragon", flags: [["BT", "bhutan"]] },
      { text: "sri lanka → lion holding a sword", flags: [["LK", "sri lanka"]] },
      { text: "mozambique → AK-47", flags: [["MZ", "mozambique"]] },
      { text: "belize → two dudes", flags: [["BZ", "belize"]] },
      { text: "seychelles → color explosion from the corner", flags: [["SC", "seychelles"]] },
      { text: "south africa → sideways Y", flags: [["ZA", "south africa"]] },
      { text: "south korea → pepsi + four sets of bars", flags: [["KR", "south korea"]] },
      { text: "papua new guinea → bird + stars, diagonal split", flags: [["PG", "papua new guinea"]] },
      { text: "kiribati → bird flying over sunrise and waves", flags: [["KI", "kiribati"]] },
      { text: "eswatini → massive shield", flags: [["SZ", "eswatini"]] },
      { text: "lebanon → christmas tree", flags: [["LB", "lebanon"]] },
      { text: "albania", flags: [["AL", "albania"]] },
      { text: "cambodia", flags: [["KH", "cambodia"]] },
      { text: "barbados", flags: [["BB", "barbados"]] },
      { text: "angola", flags: [["AO", "angola"]] },
      { text: "dominica", flags: [["DM", "dominica"]] },
      { text: "lesotho", flags: [["LS", "lesotho"]] },
      { text: "mongolia", flags: [["MN", "mongolia"]] },
      { text: "saudi arabia", flags: [["SA", "saudi arabia"]] },
      { text: "afghanistan", flags: [["AF", "afghanistan"]] },
    ],
  },
  {
    title: "cross countries",
    entries: [
      { text: "denmark → red + white cross", flags: [["DK", "denmark"]] },
      { text: "sweden → blue + yellow cross", flags: [["SE", "sweden"]] },
      { text: "finland → white + blue cross", flags: [["FI", "finland"]] },
      { text: "norway → red + blue cross outlined in white", flags: [["NO", "norway"]] },
      { text: "iceland → blue + red cross outlined in white", flags: [["IS", "iceland"]] },
      { text: "switzerland → red square + white plus", flags: [["CH", "switzerland"]] },
      { text: "tonga → red flag, white corner with red cross", flags: [["TO", "tonga"]] },
      { text: "dominican republic → white cross dividing blue/red quarters", flags: [["DO", "dominican republic"]] },
      { text: "greece", flags: [["GR", "greece"]] },
      { text: "georgia", flags: [["GE", "georgia"]] },
      { text: "malta", flags: [["MT", "malta"]] },
      { text: "jamaica", flags: [["JM", "jamaica"]] },
      { text: "burundi", flags: [["BI", "burundi"]] },
    ],
  },
  {
    title: "pan-arab colors",
    entries: [
      { text: "jordan", flags: [["JO", "jordan"]] },
      { text: "palestine", flags: [["PS", "palestine"]] },
      { text: "sudan", flags: [["SD", "sudan"]] },
      { text: "kuwait", flags: [["KW", "kuwait"]] },
      { text: "united arab emirates", flags: [["AE", "united arab emirates"]] },
      { text: "egypt", flags: [["EG", "egypt"]] },
      { text: "iraq", flags: [["IQ", "iraq"]] },
      { text: "yemen", flags: [["YE", "yemen"]] },
      { text: "syria", flags: [["SY", "syria"]] },
      { text: "oman", flags: [["OM", "oman"]] },
      { text: "south sudan", flags: [["SS", "south sudan"]] },
    ],
  },
  {
    title: "red, yellow, and green flags",
    entries: [
      { text: "ghana", flags: [["GH", "ghana"]] },
      { text: "senegal", flags: [["SN", "senegal"]] },
      { text: "cameroon", flags: [["CM", "cameroon"]] },
      { text: "guinea", flags: [["GN", "guinea"]] },
      { text: "mali", flags: [["ML", "mali"]] },
      { text: "benin", flags: [["BJ", "benin"]] },
      { text: "ethiopia", flags: [["ET", "ethiopia"]] },
      { text: "bolivia", flags: [["BO", "bolivia"]] },
      { text: "burkina faso", flags: [["BF", "burkina faso"]] },
      { text: "guinea-bissau", flags: [["GW", "guinea-bissau"]] },
      { text: "são tomé and príncipe", flags: [["ST", "são tomé and príncipe"]] },
      { text: "togo", flags: [["TG", "togo"]] },
      { text: "republic of the congo", flags: [["CG", "republic of the congo"]] },
      { text: "equatorial guinea", flags: [["GQ", "equatorial guinea"]] },
      { text: "zimbabwe", flags: [["ZW", "zimbabwe"]] },
    ],
  },
  {
    title: "central american flags",
    entries: [
      { text: "guatemala", flags: [["GT", "guatemala"]] },
      { text: "honduras", flags: [["HN", "honduras"]] },
      { text: "el salvador", flags: [["SV", "el salvador"]] },
      { text: "nicaragua", flags: [["NI", "nicaragua"]] },
    ],
  },
  {
    title: "union jack flags",
    entries: [
      { text: "australia", flags: [["AU", "australia"]] },
      { text: "new zealand", flags: [["NZ", "new zealand"]] },
      { text: "fiji", flags: [["FJ", "fiji"]] },
      { text: "tuvalu", flags: [["TV", "tuvalu"]] },
    ],
  },
  {
    title: "diagonal stripes",
    entries: [
      { text: "tanzania", flags: [["TZ", "tanzania"]] },
      { text: "dr congo", flags: [["CD", "dr congo"]] },
      { text: "namibia", flags: [["NA", "namibia"]] },
      { text: "trinidad and tobago", flags: [["TT", "trinidad and tobago"]] },
      { text: "saint kitts and nevis", flags: [["KN", "saint kitts and nevis"]] },
      { text: "solomon islands", flags: [["SB", "solomon islands"]] },
      { text: "marshall islands", flags: [["MH", "marshall islands"]] },
      { text: "brunei", flags: [["BN", "brunei"]] },
      { text: "republic of the congo", flags: [["CG", "republic of the congo"]] },
    ],
  },
  {
    title: "star flags",
    entries: [
      { text: "somalia", flags: [["SO", "somalia"]] },
      { text: "micronesia", flags: [["FM", "micronesia"]] },
      { text: "samoa", flags: [["WS", "samoa"]] },
      { text: "nauru", flags: [["NR", "nauru"]] },
      { text: "morocco", flags: [["MA", "morocco"]] },
      { text: "vietnam", flags: [["VN", "vietnam"]] },
    ],
  },
  {
    title: "sun flags",
    entries: [
      { text: "kazakhstan", flags: [["KZ", "kazakhstan"]] },
      { text: "kyrgyzstan", flags: [["KG", "kyrgyzstan"]] },
      { text: "north macedonia", flags: [["MK", "north macedonia"]] },
      { text: "rwanda", flags: [["RW", "rwanda"]] },
      { text: "argentina", flags: [["AR", "argentina"]] },
      { text: "uruguay", flags: [["UY", "uruguay"]] },
      { text: "kiribati", flags: [["KI", "kiribati"]] },
      { text: "malawi", flags: [["MW", "malawi"]] },
      { text: "antigua and barbuda", flags: [["AG", "antigua and barbuda"]] },
      { text: "philippines", flags: [["PH", "philippines"]] },
    ],
  },
  {
    title: "tricolors",
    entries: [
      { text: "armenia", flags: [["AM", "armenia"]] },
      { text: "lithuania", flags: [["LT", "lithuania"]] },
      { text: "bulgaria", flags: [["BG", "bulgaria"]] },
      { text: "gabon", flags: [["GA", "gabon"]] },
      { text: "sierra leone", flags: [["SL", "sierra leone"]] },
      { text: "estonia", flags: [["EE", "estonia"]] },
      { text: "hungary", flags: [["HU", "hungary"]] },
      { text: "germany", flags: [["DE", "germany"]] },
      { text: "russia", flags: [["RU", "russia"]] },
      { text: "netherlands", flags: [["NL", "netherlands"]] },
      { text: "luxembourg", flags: [["LU", "luxembourg"]] },
      { text: "austria", flags: [["AT", "austria"]] },
      { text: "latvia", flags: [["LV", "latvia"]] },
      { text: "ireland", flags: [["IE", "ireland"]] },
      { text: "italy", flags: [["IT", "italy"]] },
      { text: "belgium", flags: [["BE", "belgium"]] },
      { text: "france", flags: [["FR", "france"]] },
      { text: "chad", flags: [["TD", "chad"]] },
      { text: "romania", flags: [["RO", "romania"]] },
    ],
  },
  {
    title: "triangle flags",
    entries: [
      { text: "bahamas", flags: [["BS", "bahamas"]] },
      { text: "cuba", flags: [["CU", "cuba"]] },
      { text: "czechia", flags: [["CZ", "czechia"]] },
      { text: "djibouti", flags: [["DJ", "djibouti"]] },
      { text: "eritrea", flags: [["ER", "eritrea"]] },
      { text: "guyana", flags: [["GY", "guyana"]] },
      { text: "saint lucia", flags: [["LC", "saint lucia"]] },
      { text: "timor-leste", flags: [["TL", "timor-leste"]] },
      { text: "vanuatu", flags: [["VU", "vanuatu"]] },
      { text: "bosnia and herzegovina", flags: [["BA", "bosnia and herzegovina"]] },
    ],
  },
  {
    title: "coats of arms",
    entries: [
      { text: "tajikistan", flags: [["TJ", "tajikistan"]] },
      { text: "montenegro", flags: [["ME", "montenegro"]] },
      { text: "liechtenstein", flags: [["LI", "liechtenstein"]] },
      { text: "san marino", flags: [["SM", "san marino"]] },
      { text: "vatican city", flags: [["VA", "vatican city"]] },
      { text: "paraguay", flags: [["PY", "paraguay"]] },
      { text: "moldova", flags: [["MD", "moldova"]] },
      { text: "andorra", flags: [["AD", "andorra"]] },
      { text: "haiti", flags: [["HT", "haiti"]] },
      { text: "ecuador", flags: [["EC", "ecuador"]] },
      { text: "spain", flags: [["ES", "spain"]] },
      { text: "serbia", flags: [["RS", "serbia"]] },
      { text: "croatia", flags: [["HR", "croatia"]] },
    ],
  },
  {
    title: "striped flags",
    entries: [
      { text: "botswana", flags: [["BW", "botswana"]] },
      { text: "gambia", flags: [["GM", "gambia"]] },
      { text: "mauritius", flags: [["MU", "mauritius"]] },
      { text: "thailand", flags: [["TH", "thailand"]] },
      { text: "costa rica", flags: [["CR", "costa rica"]] },
      { text: "uganda", flags: [["UG", "uganda"]] },
      { text: "cape verde", flags: [["CV", "cape verde"]] },
      { text: "uzbekistan", flags: [["UZ", "uzbekistan"]] },
      { text: "central african republic", flags: [["CF", "central african republic"]] },
    ],
  },
  {
    title: "other symbols",
    entries: [
      { text: "belarus", flags: [["BY", "belarus"]] },
      { text: "madagascar", flags: [["MG", "madagascar"]] },
      { text: "myanmar", flags: [["MM", "myanmar"]] },
      { text: "panama", flags: [["PA", "panama"]] },
      { text: "suriname", flags: [["SR", "suriname"]] },
      { text: "saint vincent and the grenadines", flags: [["VC", "saint vincent and the grenadines"]] },
      { text: "grenada", flags: [["GD", "grenada"]] },
      { text: "iran", flags: [["IR", "iran"]] },
      { text: "zambia", flags: [["ZM", "zambia"]] },
    ],
  },
];

function Flag({ code, country }: { code: string; country: string }) {
  return (
    <span tabIndex={0} aria-label={country} className="group relative flex h-12 w-16 items-center justify-center outline-none focus-visible:ring-1 focus-visible:ring-zanah/60">
      <Image
        src={`/blog/flags/${code.toLowerCase()}.svg`}
        alt={`${country} flag`}
        width={64}
        height={48}
        unoptimized
        className="max-h-12 w-auto max-w-full object-contain"
      />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zanah px-2 py-1 font-scp text-xs text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
        {country}
      </span>
    </span>
  );
}

export default function RememberingEveryFlag() {
  return (
    <main className="min-h-screen bg-black animate-fade-in">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-16 py-8 bg-gradient-to-b from-black via-black/80 to-transparent">
        <Link href="/blog" className="text-zanah/50 font-scp text-sm hover:text-zanah transition-all">
          &larr; back
        </Link>
      </nav>

      <article className="w-full max-w-2xl mx-auto px-8 sm:px-12 pt-32 pb-24">
        <header className="mb-14">
          <time dateTime="2026-09-19" className="block text-zanah/40 font-scp text-xs tracking-widest mb-10">
            September 19, 2026
          </time>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis">
            my mental model for remembering every flag
          </h1>
          <p className="text-zanah/60 font-scp text-sm mt-6">an insight into my big brain</p>
        </header>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`section-${index}`}>
              <h2 id={`section-${index}`} className="text-xl sm:text-2xl text-zanah font-cv leading-snug mb-6">
                {section.title}
              </h2>
              {section.title === "versions of other flags:" || section.title === "twins →" ? (
                <ul className="flex flex-wrap items-center gap-4">
                  {section.entries.map((entry) => (
                    <li key={entry.text} className="flex flex-wrap items-center gap-4 rounded-lg border border-zanah/25 p-4">
                      {entry.flags.map(([code, country]) => (
                        <Flag key={code} code={code} country={country} />
                      ))}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-6">
                  {section.entries.flatMap((entry) => entry.flags).map(([code, country]) => (
                    <li key={code}>
                      <Flag code={code} country={country} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
