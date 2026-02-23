import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const C = {
  white: "#FFFFFF", bg: "#F7F9FC", bgAlt: "#EEF2F7", card: "#FFFFFF",
  border: "#E8ECF1", borderLight: "#F0F3F7",
  green: "#2BB673", greenDk: "#1E9B5E", greenLt: "#E8F8F0", greenMd: "#D0F0E0", greenPale: "#F0FBF5",
  navy: "#0F2B46", navyLt: "#1A3D5C", navyMd: "#2D5478",
  text: "#1A2B3D", textMid: "#4A5C6F", textDim: "#8A99AB", textLt: "#B0BCC8",
  red: "#E74C5E", redLt: "#FFF0F2", orange: "#F5A623", orangeLt: "#FFF8EC",
  blue: "#3A7BD5", blueLt: "#EDF4FF", purple: "#7B61FF", purpleLt: "#F3F0FF",
  cyan: "#17A2B8", cyanLt: "#E8F8FB",
};

/* ═══════════════ TRANSLATIONS ═══════════════ */
const T = {
  ar: {
    dir: "rtl", font: "'Tajawal', sans-serif",
    brand: "ادَّخــار",
    roiCalc: "حاسبة العائد على الاستثمار",
    learnMore: "تعرف على ادَّخــار",
    roiPos: "ROI إيجابي", roiNeg: "ROI سلبي",
    heroTag: "FINAL ROI CALCULATOR",
    heroT1: "احسب عائد الاستثمار من برنامج", heroT2: "ادَّخــار",
    heroSub: "عدّل المدخلات لتحليل الأثر المالي الفعلي لبرنامج ادَّخــار على مؤسستك",
    hint: "💡 عدّل القيم أدناه وشاهد تحديث جميع النتائج مباشرة",
    params: "المدخلات", paramsEn: "PARAMETERS",
    slTotalEmp: "إجمالي عدد الموظفين", slTotalEmpSub: "TOTAL EMPLOYEES",
    slPart: "نسبة المشاركة في البرنامج", slPartSub: "PARTICIPATION RATE",
    slSal: "متوسط الراتب الشهري", slSalSub: "AVG SALARY",
    slTurn: "معدل الدوران الحالي", slTurnSub: "CURRENT TURNOVER",
    slRep: "تكلفة الاستبدال (شهور)", slRepSub: "REPLACEMENT COST",
    slSav: "نسبة ادخار الموظف", slSavSub: "EMPLOYEE SAVINGS",
    slMatch: "نسبة مساهمة الشركة", slMatchSub: "COMPANY MATCHING",
    slFee: "رسوم الاشتراك السنوية/موظف", slFeeSub: "ANNUAL FEE / EMPLOYEE",
    slTarget: "الدوران المستهدف للمشاركين", slTargetSub: "TARGET TURNOVER",
    partActual: "المشاركون فعلياً", emp: "موظف",
    kpiPart: "المشاركون فعلياً", kpiPartSub: "PARTICIPANTS",
    kpiBleed: "النزيف السنوي", kpiBleedSub: "ANNUAL BLEED",
    kpiSav: "صافي التوفير", kpiSavSub: "NET SAVINGS",
    kpiRoi: "عائد الاستثمار", kpiRoiSub: "ROI",
    kpiRet: "موظفين محتفظ بهم", kpiRetSub: "RETAINED",
    of: "من",
    secCost: "تحليل تكاليف البرنامج", secCostSub: "PROGRAM COST ANALYSIS",
    secImpact: "أثر نسبة المشاركة", secImpactSub: "PARTICIPATION IMPACT ANALYSIS",
    secMonth: "التوقعات الشهرية — السنة الأولى", secMonthSub: "MONTHLY PROJECTIONS (YEAR 1)",
    mSub: "رسوم المنصة", mSubSub: "SUBSCRIPTION",
    mMatch: "مساهمة الشركة", mMatchSub: "MATCHING",
    mVest: "وفورات الاستحقاق", mVestSub: "VESTING",
    mProg: "صافي تكلفة البرنامج", mProgSub: "NET COST",
    chBefore: "المقارنة: قبل وبعد ادَّخــار", chBeforeSub: "BEFORE vs AFTER",
    chPie: "توزيع تكاليف البرنامج", chPieSub: "COST DISTRIBUTION",
    chGauge: "نسبة المشاركة", chGaugeSub: "PARTICIPATION RATE",
    chScen: "التوفير حسب نسبة المشاركة", chScenSub: "SAVINGS BY PARTICIPATION RATE",
    chTurn: "منحنى انخفاض الدوران", chTurnSub: "TURNOVER DECLINE",
    chCum: "التوفير التراكمية", chCumSub: "CUMULATIVE SAVINGS",
    bBefore: "بدون ادَّخــار", bAfter: "مع ادَّخــار", bCost: "التكلفة", bSav: "التوفير", bTurn: "الدوران", bCum: "التراكمي",
    sumT: "ملخص التوصية", sumSub1: "بناءً على", sumSub2: "موظف مشارك من أصل",
    sumTurnSav: "التوفير من تقليل الدوران", sumPay: "فترة الاسترداد", sumPaySub: "حتى التعادل",
    sum3y: "التوفير لـ 3 سنوات", sum3ySub: "العائد الإجمالي",
    sumCPR: "التكلفة لكل موظف محتفظ", sumRet: "موظف محتفظ",
    months: "أشهر", turnDown: "دوران",
    footDesc: "منصة توفير رقمية للموظفين", footCopy: "جميع الحقوق محفوظة © 2025 ادَّخــار",
    n1a: "* الحسابات تطبق فقط على الموظفين المشاركين (", n1b: " موظف) وليس على كامل الشركة",
    n2: "* افتراض: 50% من المستقيلين يغادرون قبل إتمام فترة الاستحقاق (سنتين)، فتعود مساهمات الشركة",
    n3a: "* رسوم المنصة: ", n3b: " /مشارك سنوياً • منحنى الانخفاض يفترض 8 أشهر للوصول للمستهدف",
  },
  en: {
    dir: "ltr", font: "'IBM Plex Sans', 'Tajawal', sans-serif",
    brand: "eddekhar",
    roiCalc: "ROI Calculator",
    learnMore: "Learn about Eddekhar",
    roiPos: "Positive ROI", roiNeg: "Negative ROI",
    heroTag: "FINAL ROI CALCULATOR",
    heroT1: "Calculate ROI from the", heroT2: "eddekhar",
    heroSub: "Adjust the inputs to analyze the real financial impact of the Eddekhar savings program on your organization",
    hint: "💡 Adjust the values below and watch all results update in real time",
    params: "Parameters", paramsEn: "INPUTS",
    slTotalEmp: "Total Employees", slTotalEmpSub: "HEADCOUNT",
    slPart: "Program Participation Rate", slPartSub: "ENROLLMENT %",
    slSal: "Average Monthly Salary", slSalSub: "PER MONTH",
    slTurn: "Current Turnover Rate", slTurnSub: "ANNUAL ATTRITION",
    slRep: "Replacement Cost (months)", slRepSub: "MONTHS OF SALARY",
    slSav: "Employee Savings Rate", slSavSub: "% OF SALARY",
    slMatch: "Company Matching Rate", slMatchSub: "EMPLOYER MATCH %",
    slFee: "Annual Subscription / Employee", slFeeSub: "PLATFORM FEE",
    slTarget: "Target Turnover (Participants)", slTargetSub: "POST-PROGRAM ATTRITION",
    partActual: "Active Participants", emp: "employees",
    kpiPart: "Active Participants", kpiPartSub: "ENROLLED",
    kpiBleed: "Annual Bleed", kpiBleedSub: "TURNOVER COST",
    kpiSav: "Net Savings", kpiSavSub: "ANNUAL",
    kpiRoi: "Return on Investment", kpiRoiSub: "ROI",
    kpiRet: "Employees Retained", kpiRetSub: "SAVED",
    of: "of",
    secCost: "Program Cost Analysis", secCostSub: "BREAKDOWN",
    secImpact: "Participation Impact", secImpactSub: "ENROLLMENT ANALYSIS",
    secMonth: "Monthly Projections — Year 1", secMonthSub: "FORECAST",
    mSub: "Platform Fee", mSubSub: "SUBSCRIPTION",
    mMatch: "Company Matching", mMatchSub: "EMPLOYER COST",
    mVest: "Vesting Savings", mVestSub: "CLAWBACK",
    mProg: "Net Program Cost", mProgSub: "TOTAL",
    chBefore: "Before vs After Eddekhar", chBeforeSub: "COMPARISON",
    chPie: "Program Cost Distribution", chPieSub: "ALLOCATION",
    chGauge: "Participation Rate", chGaugeSub: "ENROLLMENT",
    chScen: "Savings by Participation Rate", chScenSub: "SCENARIO ANALYSIS",
    chTurn: "Turnover Decline Curve", chTurnSub: "ATTRITION TREND",
    chCum: "Cumulative Savings", chCumSub: "RUNNING TOTAL",
    bBefore: "Without Eddekhar", bAfter: "With Eddekhar", bCost: "Cost", bSav: "Savings", bTurn: "Turnover", bCum: "Cumulative",
    sumT: "Recommendation Summary", sumSub1: "Based on", sumSub2: "participants out of",
    sumTurnSav: "Turnover Reduction Savings", sumPay: "Payback Period", sumPaySub: "to break even",
    sum3y: "3-Year Savings", sum3ySub: "Total projected return",
    sumCPR: "Cost per Retained Employee", sumRet: "retained",
    months: "months", turnDown: "turnover",
    footDesc: "Digital savings platform for employees", footCopy: "All rights reserved © 2025 Eddekhar",
    n1a: "* Calculations apply only to enrolled participants (", n1b: " employees), not the entire company",
    n2: "* Assumes 50% of leavers depart before the 2-year vesting period, recovering employer contributions",
    n3a: "* Platform fee: ", n3b: " /participant/year • Decline curve assumes 8 months to reach target",
  }
};

const fNum = (v, lang) => {
  if (Math.abs(v)>=1e6) return `${(v/1e6).toFixed(1)}M`;
  if (Math.abs(v)>=1e3) return `${Math.round(v/1e3)}K`;
  return v.toLocaleString(lang==="ar"?"ar-SA":"en-US");
};
const fSAR = (v, lang) => <span style={{whiteSpace:"nowrap"}}>{fNum(v,lang)} <R s={12}/></span>;
const fSARText = (v, lang) => {
  if (Math.abs(v)>=1e6) return (v/1e6).toFixed(1)+"M";
  if (Math.abs(v)>=1e3) return Math.round(v/1e3)+"K";
  return v.toLocaleString(lang==="ar"?"ar-SA":"en-US");
};
const fPct = v => `${(v*100).toFixed(1)}%`;

/* ═══════════════ COMPONENTS ═══════════════ */
const LOGO_URL = "data:image/png;base64,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";

const RIYAL_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAABpElEQVR42nWRMWsUURSFv/PeJKzYiGCqdWfyNo3bKChiCpnCQiz8A/4FCTaW/gPBQtFaCwtrm1i4qJ0k2qiLyMzGSXZBbBVxM7PvWuxGw6pfee895x7uhT84gLUsy0O6evug2G63j7M4NEcA0bgj4mmAkKZ3l11yHSDP82RRYDOVLWP6Pmtqw8z84Q0JfxPt9zabSIqAG4/HPv+PQGDKIdmbJTAgFkUxKQ4JfK/X84PBoJmlon4JTYAIKISwoqh1LJ7Ton1IszeCH5gegd1DmKQj3nuauv4kgG6WXcZ0CdlFImfk1Do4hJm9xfRQ+H6xWwxcN03XndymsJuYLUlMzOx5bXHVzH5G7HG5u/PAZCuhk91St91dw3OirMptoO6m6WuLfB3uVVdDJ/3mnDsKKPGe/aYpk3JUFkCRpmnm4QLolJw9ATzwAeNLlPX3J7E/HH1+r9DJ7juna5KOOeeom/rZsKquzJ86BcjJk1Fn5zxSngg7i+mp2fRFLbaGVfVu7j4NJ7Mb3mtjbFU38UvUzfSj+DcCXOhkW95pYtimmb1KWq3tX06FsCZaTdAqAAAAAElFTkSuQmCC";
const R = ({s=12}) => <img src={RIYAL_URL} alt="" style={{height:s,verticalAlign:"middle",margin:"0 2px",display:"inline-block"}}/>;

const Logo = ({ t, dark, size=38 }) => (
  <img src={LOGO_URL} alt="eddekhar" style={{ height:size, objectFit:"contain", borderRadius:6 }}/>
);

const LangToggle = ({ lang, setLang }) => (
  <div style={{ display:"flex", background:C.bgAlt, borderRadius:8, padding:2, border:`1px solid ${C.border}` }}>
    {["ar","en"].map(l => (
      <button key={l} onClick={()=>setLang(l)} style={{
        padding:"5px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
        border:"none", transition:"all 0.25s",
        background: lang===l ? C.green : "transparent",
        color: lang===l ? "white" : C.textMid,
        fontFamily: l==="ar" ? "'Tajawal',sans-serif" : "'IBM Plex Sans','IBM Plex Mono',sans-serif",
      }}>
        {l==="ar" ? "العربية" : "English"}
      </button>
    ))}
  </div>
);

const Sl = ({ label, sub, value, min, max, step, onChange, format, icon, color=C.green }) => {
  const pct = ((value-min)/(max-min))*100;
  return (
    <div style={{ background:C.card, borderRadius:14, padding:"16px 20px", marginBottom:10, border:`1px solid ${C.border}`, transition:"all 0.25s", boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor=color;e.currentTarget.style.boxShadow=`0 4px 16px ${color}18`}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"}}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`${color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{icon}</div>
          <div>
            <div style={{ color:C.text, fontSize:12.5, fontWeight:600 }}>{label}</div>
            <div style={{ color:C.textLt, fontSize:9, fontFamily:"'IBM Plex Mono',monospace" }}>{sub}</div>
          </div>
        </div>
        <div style={{ background:`${color}12`, color, padding:"4px 12px", borderRadius:7, fontSize:15, fontWeight:700, fontFamily:"'IBM Plex Mono',monospace", border:`1px solid ${color}25` }}>{format(value)}</div>
      </div>
      <div dir="ltr" style={{ position:"relative", height:5, borderRadius:3, background:C.bgAlt }}>
        <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${pct}%`, borderRadius:3, background:`linear-gradient(90deg,${color},${color}cc)`, transition:"width 0.15s" }}/>
        <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(parseFloat(e.target.value))}
          style={{ position:"absolute", top:-8, left:0, width:"100%", height:22, appearance:"none", background:"transparent", cursor:"pointer", margin:0, direction:"ltr" }}/>
      </div>
      <div dir="ltr" style={{ display:"flex", justifyContent:"space-between", marginTop:5, fontSize:9, color:C.textLt, fontFamily:"'IBM Plex Mono',monospace" }}>
        <span>{format(min)}</span><span>{format(max)}</span>
      </div>
    </div>
  );
};

const Met = ({ title, sub2, value, icon, color, colorLt, sub }) => (
  <div style={{ background:C.card, borderRadius:14, padding:"16px 18px", border:`1px solid ${C.border}`, transition:"all 0.25s", boxShadow:"0 1px 3px rgba(0,0,0,0.04)", flex:1, minWidth:155 }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.06)"}}
    onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"}}
  >
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
      <div style={{ width:32, height:32, borderRadius:8, background:colorLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{icon}</div>
      <div>
        <div style={{ color:C.textMid, fontSize:11, fontWeight:500 }}>{title}</div>
        {sub2&&<div style={{ color:C.textLt, fontSize:8, fontFamily:"'IBM Plex Mono',monospace" }}>{sub2}</div>}
      </div>
    </div>
    <div style={{ color, fontSize:19, fontWeight:800, fontFamily:"'IBM Plex Mono',monospace" }}>{value}</div>
    {sub&&<div style={{ color:C.textDim, fontSize:10, marginTop:3 }}>{sub}</div>}
  </div>
);

const Sec = ({ title, sub, icon }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, margin:"28px 0 14px" }}>
    <div style={{ width:30, height:30, borderRadius:8, background:C.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{icon}</div>
    <div>
      <div style={{ color:C.text, fontSize:15, fontWeight:700 }}>{title}</div>
      <div style={{ color:C.textDim, fontSize:9, fontFamily:"'IBM Plex Mono',monospace", letterSpacing:1 }}>{sub}</div>
    </div>
    <div style={{ flex:1, height:1, background:C.border, marginInlineStart:12 }}/>
  </div>
);

const CC = ({ title, sub, children, h=210 }) => (
  <div className="chart-card" style={{ background:C.card, borderRadius:14, padding:"18px 18px 12px", border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,0.04)" }}>
    <div style={{ marginBottom:12 }}>
      <div style={{ color:C.text, fontSize:12, fontWeight:600 }}>{title}</div>
      <div style={{ color:C.textDim, fontSize:9, fontFamily:"'IBM Plex Mono',monospace" }}>{sub}</div>
    </div>
    <ResponsiveContainer width="100%" height={h}>{children}</ResponsiveContainer>
  </div>
);

const Tip = ({ active, payload, label, lang }) => {
  if (!active||!payload?.length) return null;
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 12px", boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}>
      <div style={{ color:C.textDim, fontSize:9, marginBottom:3, fontFamily:"'IBM Plex Mono',monospace" }}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{ color:p.color||C.text, fontSize:11, fontWeight:600, fontFamily:"'IBM Plex Mono',monospace" }}>
          {p.name}: {typeof p.value==="number"&&Math.abs(p.value)>100?fSARText(p.value,lang||"en"):`${p.value}%`}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ MAIN ═══════════════ */
export default function App() {
  const [lang, setLang] = useState("ar");
  const [totalEmp, setTotalEmp] = useState(100);
  const [partRate, setPartRate] = useState(0.60);
  const [sal, setSal] = useState(10000);
  const [turnover, setTurnover] = useState(0.20);
  const [repCost, setRepCost] = useState(3);
  const [savRate, setSavRate] = useState(0.10);
  const [matchRate, setMatchRate] = useState(0.10);
  const [target, setTarget] = useState(0.10);
  const [subFeePerEmp, setSubFeePerEmp] = useState(100);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);

  const t = T[lang];
  const $ = v => fSAR(v, lang);

  const participants = Math.round(totalEmp*partRate);
  const bleed = totalEmp*sal*turnover*repCost;
  const subFee = participants*subFeePerEmp;
  const matchCost = participants*sal*savRate*matchRate*12;
  const vestSave = matchCost*turnover*0.5;
  const progCost = subFee+matchCost-vestSave;
  const turnoverSavings = (participants*sal*repCost)*(turnover-target);
  const netSavings = turnoverSavings-progCost;
  const roi = progCost>0?netSavings/progCost:0;
  const retained = Math.round(participants*(turnover-target));
  const turnReduction = ((turnover-target)/turnover)*100;
  const payback = netSavings>0?Math.ceil(12/(netSavings/progCost)):null;
  const partPct = partRate*100;

  const scenarioData = [0.30,0.40,0.50,0.60,0.70,0.80,0.90].map(pr=>{
    const p=Math.round(totalEmp*pr), mc=p*sal*savRate*matchRate*12, vs=mc*turnover*0.5;
    const pc=p*subFeePerEmp+mc-vs, ts=(p*sal*repCost)*(turnover-target);
    return { name:`${(pr*100).toFixed(0)}%`, savings:Math.max(0,ts-pc), active:Math.abs(pr-partRate)<0.005 };
  });

  const costPie = [
    { name:t.mSub, value:subFee, color:C.blue },
    { name:t.mMatch, value:matchCost, color:C.orange },
    { name:t.mVest, value:vestSave, color:C.green },
  ];

  const monthlyData = Array.from({length:12},(_,i)=>{
    const fac=Math.min(1,(i+1)/8), mt=turnover-(turnover-target)*fac;
    const mSave=Math.round((bleed/12)*(participants/totalEmp)*((turnover-mt)/turnover));
    return { name:`${i+1}`, turnover:+(mt*100).toFixed(1), savings:mSave, cumSavings:0 };
  });
  let cum=0; monthlyData.forEach(d=>{cum+=d.savings;d.cumSavings=cum});

  const w = { opacity:loaded?1:0, transform:loaded?"none":"translateY(12px)", transition:"all 0.5s cubic-bezier(0.4,0,0.2,1)" };

  return (
    <div dir={t.dir} style={{ minHeight:"100vh", background:C.bg, fontFamily:t.font, color:C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        input[type=range]{-webkit-appearance:none;appearance:none}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${C.green};border:3px solid white;box-shadow:0 2px 8px rgba(43,182,115,0.35);cursor:pointer;transition:transform 0.2s}
        input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.2);box-shadow:0 2px 12px rgba(43,182,115,0.5)}
        input[type=range]::-moz-range-thumb{width:16px;height:16px;border-radius:50%;border:3px solid white;background:${C.green};box-shadow:0 2px 8px rgba(43,182,115,0.35);cursor:pointer}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .au{animation:fadeUp 0.5s ease-out forwards}
        .d1{animation-delay:0.05s;opacity:0}.d2{animation-delay:0.1s;opacity:0}.d3{animation-delay:0.15s;opacity:0}.d4{animation-delay:0.2s;opacity:0}.d5{animation-delay:0.25s;opacity:0}
        *{scrollbar-width:thin;scrollbar-color:${C.border} transparent;box-sizing:border-box}
        *::-webkit-scrollbar{width:5px}*::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
        .main-grid{display:grid;grid-template-columns:330px 1fr;gap:24px;align-items:start}
        .chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .summary-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:20px}
        .hero-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
        .metrics-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
        .nav-inner{display:flex;justify-content:space-between;align-items:center}
        .nav-actions{display:flex;align-items:center;gap:10px}
        .nav-cta{padding:7px 18px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;transition:background 0.2s}
        .roi-badge{display:flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;font-size:11px;font-weight:600}
        .sidebar-sticky{position:sticky;top:72px;max-height:calc(100vh - 88px);overflow-y:auto;padding-bottom:16px}
        .chart-card{overflow:hidden;position:relative;z-index:1}
        .dashboard-col{position:relative;z-index:2;overflow:hidden}
        @media(max-width:900px){
          .main-grid{grid-template-columns:1fr !important}
          .chart-grid{grid-template-columns:1fr !important}
          .summary-grid{grid-template-columns:1fr 1fr !important}
          .hero-kpis{grid-template-columns:repeat(auto-fit,minmax(140px,1fr)) !important}
          .metrics-row{flex-direction:column}
          .nav-cta{display:none}
          .roi-badge{display:none}
          .sidebar-sticky{position:static !important;max-height:none !important;overflow-y:visible !important}
          .dashboard-col{overflow:visible}
        }
        @media(max-width:500px){
          .summary-grid{grid-template-columns:1fr !important}
          .hero-kpis{grid-template-columns:1fr 1fr !important}
          .nav-inner{gap:8px}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background:C.white, borderBottom:`1px solid ${C.border}`, padding:"12px 16px", position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 4px rgba(0,0,0,0.03)" }}>
        <div className="nav-inner" style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <Logo t={t}/>
            <div style={{ height:20, width:1, background:C.border }}/>
            <span style={{ color:C.textMid, fontSize:12, fontWeight:500 }}>{t.roiCalc}</span>
          </div>
          <div className="nav-actions">
            <LangToggle lang={lang} setLang={setLang}/>
            <div className="roi-badge" style={{ background:netSavings>0?C.greenLt:C.redLt, color:netSavings>0?C.green:C.red }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:netSavings>0?C.green:C.red, animation:"pulse 2s infinite" }}/>
              {netSavings>0?t.roiPos:t.roiNeg}
            </div>
            <a href="https://eddekhar.com/ar/Services/Save" target="_blank" rel="noreferrer" className="nav-cta"
              style={{ background:C.green, color:"white" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.greenDk} onMouseLeave={e=>e.currentTarget.style.background=C.green}>
              {t.learnMore}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background:`linear-gradient(135deg,${C.navy} 0%,${C.navyLt} 50%,${C.navyMd} 100%)`, padding:"32px 16px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, left:-80, width:280, height:280, borderRadius:"50%", background:`radial-gradient(circle,${C.green}18,transparent)` }}/>
        <div style={{ position:"absolute", bottom:-100, right:-60, width:220, height:220, borderRadius:"50%", background:`radial-gradient(circle,${C.green}10,transparent)` }}/>
        <div style={{ maxWidth:1400, margin:"0 auto", position:"relative", zIndex:1, ...w }}>
          <div style={{ color:C.green, fontSize:11, fontWeight:600, fontFamily:"'IBM Plex Mono',monospace", letterSpacing:2, marginBottom:6 }}>{t.heroTag}</div>
          <h1 style={{ color:"white", fontSize:24, fontWeight:800, margin:"0 0 8px", lineHeight:1.3 }}>
            {t.heroT1} <span style={{ color:C.green }}>{t.heroT2}</span> {lang==="en"?"program":""}
          </h1>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:13, margin:0, maxWidth:580, lineHeight:1.7 }}>{t.heroSub}</p>

          <div className="hero-kpis" style={{ marginTop:24 }}>
            {[
              { icon:"👥", l:t.kpiPart, s:t.kpiPartSub, v:`${participants} ${t.of} ${totalEmp}`, c:"#60B4F7", bg:"rgba(96,180,247,0.12)" },
              { icon:"💸", l:t.kpiBleed, s:t.kpiBleedSub, v:$(bleed), c:C.red, bg:"rgba(231,76,94,0.12)" },
              { icon:"🛡️", l:t.kpiSav, s:t.kpiSavSub, v:$(netSavings), c:netSavings>0?C.green:C.red, bg:netSavings>0?"rgba(43,182,115,0.12)":"rgba(231,76,94,0.12)" },
              { icon:"📈", l:t.kpiRoi, s:t.kpiRoiSub, v:`${(roi*100).toFixed(0)}%`, c:C.green, bg:"rgba(43,182,115,0.12)" },
              { icon:"🎯", l:t.kpiRet, s:t.kpiRetSub, v:retained, c:C.purple, bg:"rgba(123,97,255,0.12)" },
            ].map((m,i)=>(
              <div key={i} className={`au d${i+1}`} style={{ background:"rgba(255,255,255,0.06)", backdropFilter:"blur(10px)", borderRadius:12, padding:"16px 18px", border:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:30, height:30, borderRadius:7, background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>{m.icon}</div>
                  <div>
                    <div style={{ color:"rgba(255,255,255,0.65)", fontSize:10, fontWeight:500 }}>{m.l}</div>
                    <div style={{ color:"rgba(255,255,255,0.3)", fontSize:8, fontFamily:"'IBM Plex Mono',monospace" }}>{m.s}</div>
                  </div>
                </div>
                <div style={{ color:m.c, fontSize:22, fontWeight:800, fontFamily:"'IBM Plex Mono',monospace" }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"24px 16px 72px" }}>
        <div className="main-grid">

          {/* INPUTS */}
          <div className="sidebar-sticky">
            <div style={{ marginBottom:12, padding:"10px 14px", borderRadius:10, background:C.greenPale, border:`1px solid ${C.greenMd}`, fontSize:11, color:C.textMid, lineHeight:1.8, textAlign:"center" }}>{t.hint}</div>
            <Sec title={t.params} sub={t.paramsEn} icon="⚙️"/>
            <Sl label={t.slTotalEmp} sub={t.slTotalEmpSub} value={totalEmp} min={10} max={20000} step={10} onChange={setTotalEmp} format={v=>v} icon="🏢" color={C.navy}/>
            <Sl label={t.slPart} sub={t.slPartSub} value={partRate} min={0.10} max={1.0} step={0.05} onChange={setPartRate} format={fPct} icon="🎯" color={C.green}/>
            <div style={{ background:C.card, borderRadius:12, padding:"12px 16px", marginBottom:10, border:`1px solid ${C.greenMd}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.textMid }}>{t.partActual}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ background:C.greenLt, borderRadius:6, padding:"2px 10px" }}>
                  <span style={{ color:C.green, fontSize:18, fontWeight:800, fontFamily:"'IBM Plex Mono',monospace" }}>{participants}</span>
                </div>
                <span style={{ color:C.textDim, fontSize:11 }}>{t.emp}</span>
              </div>
            </div>
            <Sl label={t.slSal} sub={t.slSalSub} value={sal} min={3000} max={50000} step={500} onChange={setSal} format={v=>`${(v/1000).toFixed(1)}K`} icon="💰" color={C.orange}/>
            <Sl label={t.slTurn} sub={t.slTurnSub} value={turnover} min={0.05} max={0.40} step={0.01} onChange={setTurnover} format={fPct} icon="🔄" color={C.red}/>
            <Sl label={t.slRep} sub={t.slRepSub} value={repCost} min={1} max={12} step={0.5} onChange={setRepCost} format={v=>`${v}x`} icon="📊" color={C.blue}/>
            <Sl label={t.slSav} sub={t.slSavSub} value={savRate} min={0.03} max={0.20} step={0.01} onChange={setSavRate} format={fPct} icon="🏦" color={C.cyan}/>
            <Sl label={t.slMatch} sub={t.slMatchSub} value={matchRate} min={0.03} max={0.20} step={0.01} onChange={setMatchRate} format={fPct} icon="🤝" color={C.purple}/>
            <Sl label={t.slFee} sub={t.slFeeSub} value={subFeePerEmp} min={50} max={500} step={10} onChange={setSubFeePerEmp} format={v=>v} icon="🏷️" color={C.blue}/>
            <Sl label={t.slTarget} sub={t.slTargetSub} value={target} min={0.02} max={Math.max(0.03,turnover-0.01)} step={0.01} onChange={setTarget} format={fPct} icon="🎯" color={C.green}/>
          </div>

          {/* DASHBOARD */}
          <div className="dashboard-col">
            <Sec title={t.secCost} sub={t.secCostSub} icon="📊"/>
            <div className="metrics-row">
              <Met icon="🏷️" title={t.mSub} sub2={t.mSubSub} value={$(subFee)} color={C.blue} colorLt={C.blueLt} sub={<span>{participants} × {subFeePerEmp} <R s={10}/></span>}/>
              <Met icon="💼" title={t.mMatch} sub2={t.mMatchSub} value={$(matchCost)} color={C.orange} colorLt={C.orangeLt}/>
              <Met icon="↩️" title={t.mVest} sub2={t.mVestSub} value={$(vestSave)} color={C.green} colorLt={C.greenLt}/>
              <Met icon="⚡" title={t.mProg} sub2={t.mProgSub} value={$(progCost)} color={C.purple} colorLt={C.purpleLt}/>
            </div>

            <div className="chart-grid">
              <CC title={t.chBefore} sub={t.chBeforeSub}>
                <BarChart data={[{name:t.bBefore,cost:bleed},{name:t.bAfter,cost:(participants*sal*target*repCost)+((totalEmp-participants)*sal*turnover*repCost)+progCost}]} barSize={44}>
                  <XAxis dataKey="name" tick={{fill:C.textDim,fontSize:10,fontFamily:t.font}} axisLine={false} tickLine={false}/>
                  <YAxis hide/><Tooltip content={<Tip lang={lang}/>}/>
                  <Bar dataKey="cost" name={t.bCost} radius={[8,8,0,0]}><Cell fill={C.red}/><Cell fill={C.green}/></Bar>
                </BarChart>
              </CC>
              <CC title={t.chPie} sub={t.chPieSub}>
                <PieChart>
                  <Pie data={costPie} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value" strokeWidth={0}>
                    {costPie.map((d,i)=><Cell key={i} fill={d.color}/>)}
                  </Pie>
                  <Tooltip content={<Tip lang={lang}/>}/>
                </PieChart>
              </CC>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:-2, marginBottom:6 }}>
              {costPie.map((d,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:C.textMid }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:d.color }}/>{d.name}
                </div>
              ))}
            </div>

            <Sec title={t.secImpact} sub={t.secImpactSub} icon="🎯"/>
            <div className="chart-grid">
              <div style={{ background:C.card, borderRadius:14, padding:18, border:`1px solid ${C.border}`, boxShadow:"0 1px 3px rgba(0,0,0,0.04)", display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ marginBottom:8 }}>
                  <div style={{ color:C.text, fontSize:12, fontWeight:600, textAlign:"center" }}>{t.chGauge}</div>
                  <div style={{ color:C.textDim, fontSize:9, fontFamily:"'IBM Plex Mono',monospace", textAlign:"center" }}>{t.chGaugeSub}</div>
                </div>
                <div style={{ position:"relative", width:160, height:100 }}>
                  <svg viewBox="0 0 160 100" style={{ width:"100%", height:"100%" }}>
                    <path d="M 20 90 A 60 60 0 0 1 140 90" fill="none" stroke={C.bgAlt} strokeWidth="12" strokeLinecap="round"/>
                    <path d="M 20 90 A 60 60 0 0 1 140 90" fill="none" stroke={C.green} strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${partPct*1.88} 188`} style={{ transition:"stroke-dasharray 0.4s ease" }}/>
                  </svg>
                  <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
                    <div style={{ fontSize:28, fontWeight:800, color:C.green, fontFamily:"'IBM Plex Mono',monospace" }}>{partPct.toFixed(0)}%</div>
                    <div style={{ fontSize:10, color:C.textDim }}>{participants} {t.of} {totalEmp}</div>
                  </div>
                </div>
              </div>
              <CC title={t.chScen} sub={t.chScenSub} h={170}>
                <BarChart data={scenarioData} barSize={28}>
                  <XAxis dataKey="name" tick={{fill:C.textDim,fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis hide/><Tooltip content={<Tip lang={lang}/>}/>
                  <Bar dataKey="savings" name={t.bSav} radius={[6,6,0,0]}>
                    {scenarioData.map((d,i)=><Cell key={i} fill={d.active?C.green:`${C.green}30`}/>)}
                  </Bar>
                </BarChart>
              </CC>
            </div>

            <Sec title={t.secMonth} sub={t.secMonthSub} icon="📈"/>
            <div className="chart-grid">
              <CC title={t.chTurn} sub={t.chTurnSub}>
                <AreaChart data={monthlyData}>
                  <defs><linearGradient id="tG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.red} stopOpacity={0.2}/><stop offset="95%" stopColor={C.red} stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="name" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} width={28} unit="%"/>
                  <Tooltip content={<Tip lang={lang}/>}/>
                  <Area type="monotone" dataKey="turnover" name={t.bTurn} stroke={C.red} fill="url(#tG)" strokeWidth={2.5} dot={false}/>
                </AreaChart>
              </CC>
              <CC title={t.chCum} sub={t.chCumSub}>
                <AreaChart data={monthlyData}>
                  <defs><linearGradient id="sG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.green} stopOpacity={0.25}/><stop offset="95%" stopColor={C.green} stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="name" tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:C.textDim,fontSize:9}} axisLine={false} tickLine={false} width={40}/>
                  <Tooltip content={<Tip lang={lang}/>}/>
                  <Area type="monotone" dataKey="cumSavings" name={t.bCum} stroke={C.green} fill="url(#sG)" strokeWidth={2.5} dot={false}/>
                </AreaChart>
              </CC>
            </div>

            {/* Summary */}
            <div style={{ marginTop:22, borderRadius:16, overflow:"hidden", border:`1px solid ${C.greenMd}`, boxShadow:"0 4px 24px rgba(43,182,115,0.08)" }}>
              <div style={{ background:`linear-gradient(135deg,${C.navy},${C.navyLt})`, padding:"20px 24px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:20 }}>💡</span>
                  <span style={{ color:"white", fontSize:17, fontWeight:700 }}>{t.sumT}</span>
                </div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginTop:3 }}>{t.sumSub1} {participants} {t.sumSub2} {totalEmp}</div>
              </div>
              <div className="summary-grid" style={{ background:C.greenPale, padding:"24px 24px" }}>
                {[
                  { l:t.sumTurnSav, v:$(turnoverSavings), c:C.green, s:`↓ ${turnReduction.toFixed(0)}% ${t.turnDown}`, icon:"🛡️" },
                  { l:t.sumPay, v:payback?<span style={{fontSize:28,fontWeight:800}}>{payback} <span style={{fontSize:16,fontWeight:600,color:"#5B8DEF"}}>{t.months}</span></span>:"—", c:"#3366CC", s:t.sumPaySub, icon:"⏱️" },
                  { l:t.sum3y, v:$(netSavings*3), c:"#6B4FBB", s:t.sum3ySub, icon:"📊" },
                  { l:t.sumCPR, v:retained>0?$(Math.round(progCost/retained)):"—", c:"#D97706", s:`${retained} ${t.sumRet}`, icon:"👤" },
                ].map((m,i)=>(
                  <div key={i} style={{ background:"white", borderRadius:14, padding:"18px 20px", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.04)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                      <span style={{ fontSize:15 }}>{m.icon}</span>
                      <div style={{ color:C.navy, fontSize:13, fontWeight:700, lineHeight:1.3 }}>{m.l}</div>
                    </div>
                    <div style={{ color:m.c, fontSize:28, fontWeight:800, lineHeight:1.1, marginBottom:6 }}>{m.v}</div>
                    <div style={{ color:C.textMid, fontSize:12, fontWeight:500, lineHeight:1.4 }}>{m.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop:14, padding:"12px 18px", borderRadius:10, background:C.card, border:`1px solid ${C.border}`, fontSize:10, color:C.textDim, lineHeight:2 }}>
              {t.n1a}{participants}{t.n1b}<br/>{t.n2}<br/>{t.n3a}{subFeePerEmp} <R s={10}/>{t.n3b}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background:C.navy, padding:"24px 16px", borderTop:`3px solid ${C.green}` }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <img src={LOGO_URL} alt="eddekhar" style={{ height:28, objectFit:"contain", borderRadius:4 }}/>
            <div>
              <div style={{ color:"white", fontSize:13, fontWeight:700 }}>{t.brand}</div>
              <div style={{ color:"rgba(255,255,255,0.35)", fontSize:10 }}>{t.footDesc}</div>
            </div>
          </div>
          <div style={{ color:"rgba(255,255,255,0.25)", fontSize:10, fontFamily:"'IBM Plex Mono',monospace" }}>{t.footCopy}</div>
        </div>
      </footer>
    </div>
  );
}
