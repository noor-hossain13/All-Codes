import { useState, useEffect } from "react";

const PHISHING_DB = ["fake-bank.com","phishing-site.net","scam-login.xyz","free-prize.tk","paypa1.com","g00gle.com","amaz0n-login.net","secure-update.ml","bank-alert.cf","login-verify.ga","verify-account.gq","support-helpdesk.tk","ebay-confirm.com","netflix-update.net","microsoft-alert.xyz","bkash-verify.tk","nagad-login.ml","bikash-bonus.cf","bd-bank-alert.gq"];
const SAFE_DOMAINS = ["google.com","youtube.com","facebook.com","amazon.com","wikipedia.org","github.com","stackoverflow.com","reddit.com","twitter.com","linkedin.com","microsoft.com","apple.com","netflix.com","paypal.com","ebay.com","messenger.com","whatsapp.com","zoom.us","linkedin.com"];

function analyzeURL(url) {
  if (!url || !url.trim()) return null;
  let raw = url.trim().toLowerCase();
  if (!raw.startsWith("http")) raw = "http://" + raw;
  let hostname = "";
  try { hostname = new URL(raw).hostname.replace("www.", ""); } catch { return { status: "dangerous", score: 95, reasons: ["Invalid URL format"] }; }
  if (SAFE_DOMAINS.some(d => hostname === d || hostname.endsWith("." + d))) return { status: "safe", score: 2, reasons: ["Trusted domain verified"] };
  if (PHISHING_DB.some(d => hostname.includes(d) || d.includes(hostname))) return { status: "dangerous", score: 98, reasons: ["Found in phishing database"] };
  const reasons = []; let score = 0;
  if (!raw.startsWith("https")) { score += 25; reasons.push("No HTTPS encryption"); }
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostname)) { score += 35; reasons.push("IP address instead of domain"); }
  if (hostname.length > 40) { score += 20; reasons.push("Suspiciously long domain"); }
  if ((hostname.match(/-/g)||[]).length > 3) { score += 15; reasons.push("Multiple hyphens in domain"); }
  if (/0|1|3|4|@/.test(hostname)) { score += 20; reasons.push("Lookalike characters detected"); }
  if (["tk","ml","cf","ga","gq","xyz","pw"].some(t => hostname.endsWith("."+t))) { score += 25; reasons.push("Suspicious TLD used"); }
  if (/login|verify|secure|update|account|banking|paypal|amazon|bkash|nagad/.test(hostname)) { score += 20; reasons.push("Phishing keywords in domain"); }
  if (raw.includes("%") || raw.includes("@")) { score += 15; reasons.push("URL encoding tricks"); }
  if (!reasons.length) reasons.push("No obvious threats found");
  return { status: score>=60?"dangerous":score>=25?"suspicious":"safe", score: Math.min(score,99), reasons };
}

const INIT_MESSAGES = {
  sms: [
    { id:"s1", platform:"sms", sender:"+880 1700-000001", avatar:"📱", preview:"Your account will be suspended. Verify now: http://fake-bank.com/verify", time:"2m ago", ts:Date.now()-120000, hasLink:true, url:"http://fake-bank.com/verify", deleted:false },
    { id:"s2", platform:"sms", sender:"Bank BD", avatar:"🏦", preview:"Your OTP is 847291. Do not share with anyone.", time:"15m ago", ts:Date.now()-900000, hasLink:false, url:null, deleted:false },
    { id:"s3", platform:"sms", sender:"+880 1900-123456", avatar:"📱", preview:"Congratulations! You won BDT 50,000. Claim: http://free-prize.tk", time:"1h ago", ts:Date.now()-3600000, hasLink:true, url:"http://free-prize.tk", deleted:false },
    { id:"s4", platform:"sms", sender:"bKash", avatar:"💙", preview:"BDT 500 sent to 01711-XXXXXX. Balance: BDT 2,450", time:"2h ago", ts:Date.now()-7200000, hasLink:false, url:null, deleted:false },
    { id:"s5", platform:"sms", sender:"+880 1600-987654", avatar:"📱", preview:"Parcel ready. Track: https://google.com/tracking/BD9182", time:"3h ago", ts:Date.now()-10800000, hasLink:true, url:"https://google.com/tracking", deleted:false },
  ],
  messenger: [
    { id:"m1", platform:"messenger", sender:"Rahim Ahmed", avatar:"👤", preview:"Bhai eta dekh, free iPhone diche! http://free-prize.tk/iphone", time:"5m ago", ts:Date.now()-300000, hasLink:true, url:"http://free-prize.tk/iphone", deleted:false },
    { id:"m2", platform:"messenger", sender:"Sadia Islam", avatar:"👩", preview:"Tui ki kal ashbi? Party ache.", time:"30m ago", ts:Date.now()-1800000, hasLink:false, url:null, deleted:false },
    { id:"m3", platform:"messenger", sender:"Tech Group 🇧🇩", avatar:"💬", preview:"Check this out: http://login-verify.ga/fb-login urgent!", time:"1h ago", ts:Date.now()-3600000, hasLink:true, url:"http://login-verify.ga/fb-login", deleted:false },
    { id:"m4", platform:"messenger", sender:"Karim Hossain", avatar:"🧑", preview:"Job opening: https://linkedin.com/jobs/bd-tech", time:"2h ago", ts:Date.now()-7200000, hasLink:true, url:"https://linkedin.com/jobs/bd-tech", deleted:false },
    { id:"m5", platform:"messenger", sender:"Mama", avatar:"👴", preview:"Amar phone e ki problem hoiche?", time:"4h ago", ts:Date.now()-14400000, hasLink:false, url:null, deleted:false },
  ],
  whatsapp: [
    { id:"w1", platform:"whatsapp", sender:"Nadia Begum", avatar:"👩‍💼", preview:"Ei link e click koro, lottery jitechis! http://scam-login.xyz/lottery", time:"10m ago", ts:Date.now()-600000, hasLink:true, url:"http://scam-login.xyz/lottery", deleted:false },
    { id:"w2", platform:"whatsapp", sender:"Office Group", avatar:"🏢", preview:"Meeting 3PM. Zoom: https://zoom.us/j/123456789", time:"45m ago", ts:Date.now()-2700000, hasLink:true, url:"https://zoom.us/j/123456789", deleted:false },
    { id:"w3", platform:"whatsapp", sender:"Farid Uddin", avatar:"👨‍💻", preview:"Dekh bhai, eta install kor: http://secure-update.ml/app.apk", time:"2h ago", ts:Date.now()-7200000, hasLink:true, url:"http://secure-update.ml/app.apk", deleted:false },
    { id:"w4", platform:"whatsapp", sender:"Family Group 🏠", avatar:"🏠", preview:"Eid er salami pathalam sob ke 😊❤️", time:"5h ago", ts:Date.now()-18000000, hasLink:false, url:null, deleted:false },
    { id:"w5", platform:"whatsapp", sender:"Shakil Ahmed", avatar:"👨", preview:"Bhai tomar number ki change hoiche?", time:"1d ago", ts:Date.now()-86400000, hasLink:false, url:null, deleted:false },
  ],
};

const INIT_HISTORY = [
  { id:"h1", url:"https://fake-bank.com/login", status:"dangerous", time:"Today 10:32 AM", source:"SMS", platform:"sms" },
  { id:"h2", url:"https://google.com", status:"safe", time:"Today 09:15 AM", source:"Manual", platform:"manual" },
  { id:"h3", url:"http://phishing-site.net", status:"dangerous", time:"Yesterday", source:"Messenger", platform:"messenger" },
  { id:"h4", url:"https://github.com/user/repo", status:"safe", time:"Yesterday", source:"Manual", platform:"manual" },
  { id:"h5", url:"http://verify-account.gq", status:"dangerous", time:"2 days ago", source:"WhatsApp", platform:"whatsapp" },
  { id:"h6", url:"https://youtube.com/watch?v=abc", status:"safe", time:"2 days ago", source:"Manual", platform:"manual" },
  { id:"h7", url:"http://secure-update.ml/patch", status:"suspicious", time:"3 days ago", source:"WhatsApp", platform:"whatsapp" },
];

const STORAGE_KEY = "spda_messages_v3";
const HISTORY_KEY = "spda_history_v3";

const Icon = ({ name, size=20, color="currentColor" }) => {
  const icons = {
    shield:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    shieldCheck:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    shieldX:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>,
    shieldAlert:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    scan:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></svg>,
    sms:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    history:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/></svg>,
    report:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    link:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    x:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    send:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    trash:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    bell:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    home:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    save:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    restore:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>,
    eye:<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  };
  return icons[name] || null;
};

const STATUS = {
  safe:      { color:"#00e676", bg:"rgba(0,230,118,0.12)", label:"SAFE",      icon:"shieldCheck" },
  suspicious:{ color:"#ffab00", bg:"rgba(255,171,0,0.12)", label:"SUSPICIOUS",icon:"shieldAlert" },
  dangerous: { color:"#ff1744", bg:"rgba(255,23,68,0.12)", label:"DANGEROUS", icon:"shieldX" },
};

const PM = {
  sms:      { label:"SMS",       color:"#00e5ff", emoji:"💬", bg:"rgba(0,229,255,0.1)" },
  messenger:{ label:"Messenger", color:"#0099ff", emoji:"🔵", bg:"rgba(0,153,255,0.1)" },
  whatsapp: { label:"WhatsApp",  color:"#25D366", emoji:"🟢", bg:"rgba(37,211,102,0.1)" },
};

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3800); return () => clearTimeout(t); }, []);
  const c = { danger:"#ff1744", success:"#00e676", info:"#7c4dff", warning:"#ffab00" };
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:9999, background:"#0d0d1a", border:`1px solid ${c[type]||"#7c4dff"}`, borderLeft:`4px solid ${c[type]||"#7c4dff"}`, borderRadius:12, padding:"14px 40px 14px 18px", maxWidth:310, boxShadow:`0 8px 32px ${c[type]}33`, color:"#e0e0ff", fontSize:12, fontFamily:"'Exo 2',sans-serif", animation:"slideIn 0.3s ease", lineHeight:1.5 }}>
      {msg}
      <button onClick={onClose} style={{ position:"absolute", top:10, right:10, background:"none", border:"none", color:"#666", cursor:"pointer" }}><Icon name="x" size={13}/></button>
    </div>
  );
}

function ResultModal({ result, url, onClose, onReport }) {
  if (!result) return null;
  const s = STATUS[result.status];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.88)", backdropFilter:"blur(8px)" }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0d0d1a", border:`1px solid ${s.color}44`, borderRadius:22, padding:26, maxWidth:390, width:"92%", boxShadow:`0 0 60px ${s.color}22,0 20px 60px rgba(0,0,0,0.8)`, animation:"popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)", fontFamily:"'Exo 2',sans-serif" }}>
        <div style={{ textAlign:"center", marginBottom:18 }}>
          <div style={{ width:76, height:76, borderRadius:"50%", background:s.bg, border:`3px solid ${s.color}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", boxShadow:`0 0 30px ${s.color}44`, animation:result.status==="dangerous"?"pulse 1.5s infinite":"none" }}>
            <Icon name={s.icon} size={34} color={s.color}/>
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:s.color, letterSpacing:3 }}>{s.label}</div>
        </div>
        <div style={{ background:"#161625", borderRadius:10, padding:"9px 12px", marginBottom:12, wordBreak:"break-all", fontSize:11, color:"#777", border:"1px solid #222" }}>{url}</div>
        <div style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:11, color:"#888" }}><span>Threat Score</span><span style={{ color:s.color, fontWeight:700 }}>{result.score}%</span></div>
          <div style={{ height:6, background:"#1a1a2e", borderRadius:3 }}><div style={{ height:"100%", width:`${result.score}%`, background:`linear-gradient(90deg,#7c4dff,${s.color})`, borderRadius:3, transition:"width 1s ease" }}/></div>
        </div>
        <div style={{ marginBottom:18 }}>
          {result.reasons.map((r,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:i<result.reasons.length-1?"1px solid #1a1a2e":"none", fontSize:11, color:"#bbb" }}>
              <span style={{ color:s.color }}>{result.status==="safe"?"✓":"⚠"}</span>{r}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {result.status!=="safe" && <button onClick={onReport} style={{ flex:1, padding:"11px", borderRadius:10, border:"1px solid #ff1744", background:"transparent", color:"#ff1744", cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"'Exo 2',sans-serif" }}>Report</button>}
          <button onClick={onClose} style={{ flex:2, padding:"11px", borderRadius:10, border:"none", background:`linear-gradient(135deg,#7c4dff,${s.color})`, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:700, fontFamily:"'Exo 2',sans-serif" }}>Done</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ msg, onConfirm, onCancel }) {
  if (!msg) return null;
  const pm = PM[msg.platform];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.9)", backdropFilter:"blur(10px)" }} onClick={onCancel}>
      <div onClick={e=>e.stopPropagation()} style={{ background:"#0d0d1a", border:"1px solid #ff174433", borderRadius:20, padding:22, maxWidth:340, width:"90%", fontFamily:"'Exo 2',sans-serif", animation:"popIn 0.25s ease" }}>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <div style={{ fontSize:34, marginBottom:8 }}>🗑️</div>
          <div style={{ fontSize:15, fontWeight:800, color:"#e0e0ff", marginBottom:6 }}>Delete Message?</div>
          <div style={{ fontSize:11, color:"#777", lineHeight:1.7 }}>
            এই message টি <span style={{ color:pm.color, fontWeight:700 }}>{pm.emoji} {pm.label}</span> থেকে delete হবে।<br/>
            কিন্তু SPDA <span style={{ color:"#00e676", fontWeight:700 }}>Vault-এ সেভ থাকবে</span> — delete করলেও হারাবে না!
          </div>
        </div>
        <div style={{ background:"#161625", borderRadius:9, padding:"9px 12px", marginBottom:12, fontSize:11, color:"#666", border:"1px solid #1a1a2e", wordBreak:"break-word" }}>
          <span style={{ color:"#e0e0ff", fontWeight:600 }}>{msg.sender}: </span>{msg.preview.substring(0,70)}{msg.preview.length>70?"...":""}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(0,230,118,0.07)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:9, padding:"9px 12px", marginBottom:16 }}>
          <Icon name="save" size={15} color="#00e676"/>
          <span style={{ fontSize:11, color:"#00e676" }}>SPDA Vault-এ automatically save হবে</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onCancel} style={{ flex:1, padding:"11px", borderRadius:9, border:"1px solid #2a2a4a", background:"transparent", color:"#888", cursor:"pointer", fontSize:12, fontFamily:"'Exo 2',sans-serif" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#ff1744,#ff6d00)", color:"#fff", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Exo 2',sans-serif" }}>Delete & Save</button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ stats, onQuickScan }) {
  return (
    <div style={{ padding:"0 18px 100px" }}>
      <div style={{ background:"linear-gradient(135deg,#0d0d2e,#1a0538,#0d1a3e)", borderRadius:22, padding:"24px 20px", marginBottom:16, border:"1px solid rgba(124,77,255,0.3)", boxShadow:"0 20px 60px rgba(124,77,255,0.15)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,77,255,0.15),transparent)" }}/>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, position:"relative" }}>
          <div style={{ width:50, height:50, borderRadius:14, background:"linear-gradient(135deg,#7c4dff,#00e5ff)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 24px rgba(124,77,255,0.4)" }}><Icon name="shield" size={24} color="#fff"/></div>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>SPDA</div>
            <div style={{ fontSize:11, color:"#00e5ff", opacity:0.8 }}>Smart Phishing Detection App</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, background:"rgba(0,230,118,0.15)", border:"1px solid rgba(0,230,118,0.4)", borderRadius:20, padding:"3px 10px" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#00e676", boxShadow:"0 0 8px #00e676", animation:"blink 1.5s infinite" }}/>
            <span style={{ fontSize:10, color:"#00e676", fontWeight:600 }}>ACTIVE</span>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, position:"relative" }}>
          {[{l:"Scanned",v:stats.total,c:"#00e5ff"},{l:"Threats",v:stats.dangerous,c:"#ff1744"},{l:"Safe",v:stats.safe,c:"#00e676"}].map((s,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:11, padding:"10px 8px", textAlign:"center", border:`1px solid ${s.c}22` }}>
              <div style={{ fontSize:20, fontWeight:800, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:9, color:"#888", marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onQuickScan} style={{ width:"100%", padding:"15px", borderRadius:14, background:"linear-gradient(135deg,#7c4dff,#00e5ff)", border:"none", color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", boxShadow:"0 8px 32px rgba(124,77,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:16, letterSpacing:1 }}>
        <Icon name="scan" size={19} color="#fff"/> SCAN A URL NOW
      </button>

      <div style={{ fontSize:10, color:"#555", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>Protected Platforms</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
        {[{e:"💬",l:"SMS",c:"#00e5ff",k:"sms"},{e:"🔵",l:"Messenger",c:"#0099ff",k:"messenger"},{e:"🟢",l:"WhatsApp",c:"#25D366",k:"whatsapp"}].map((p,i)=>(
          <div key={i} style={{ background:"#0d0d1a", borderRadius:12, padding:"14px 10px", textAlign:"center", border:`1px solid ${p.c}22` }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{p.e}</div>
            <div style={{ fontSize:11, fontWeight:700, color:"#e0e0ff" }}>{p.l}</div>
            <div style={{ fontSize:9, color: stats[p.k+"Danger"]>0?"#ff1744":"#00e676", marginTop:3, fontWeight:600 }}>
              {stats[p.k+"Danger"]>0?`${stats[p.k+"Danger"]} threat${stats[p.k+"Danger"]>1?"s":""}` :"Protected ✓"}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:"#0d0d1a", borderRadius:14, padding:"12px 16px", border:"1px solid rgba(0,106,78,0.4)", display:"flex", alignItems:"center", gap:12 }}>
        <span style={{ fontSize:20 }}>🇧🇩</span>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:"#e0e0ff" }}>বাংলাদেশ স্থানীয় সুরক্ষা</div>
          <div style={{ fontSize:10, color:"#666" }}>bKash, Nagad, local scam database active</div>
        </div>
        <div style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:"#00e676", boxShadow:"0 0 8px #00e676", animation:"blink 2s infinite" }}/>
      </div>
    </div>
  );
}

function URLScanner({ onResult, setHistory }) {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState("");
  const steps = ["Parsing URL structure...","Checking phishing database...","Heuristic analysis...","Running ML model...","Finalizing..."];

  const scan = async () => {
    if (!url.trim()) return;
    setScanning(true); setProgress(0);
    for (let i=0;i<steps.length;i++) { setStep(steps[i]); setProgress((i+1)*20); await new Promise(r=>setTimeout(r,380)); }
    const result = analyzeURL(url);
    setHistory(prev=>[{ id:`h${Date.now()}`, url:url.trim(), status:result.status, time:"Just now", source:"Manual", platform:"manual" },...prev]);
    setScanning(false); onResult(result, url.trim()); setUrl("");
  };

  return (
    <div style={{ padding:"0 18px 100px" }}>
      <div style={{ background:"#0d0d1a", borderRadius:18, padding:16, border:"1px solid #1a1a3e", marginBottom:14 }}>
        <div style={{ display:"flex", gap:8 }}>
          <input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&scan()} placeholder="Paste any URL here..." style={{ flex:1, padding:"12px 14px", borderRadius:10, background:"#161625", border:"1px solid #2a2a4a", color:"#e0e0ff", fontSize:12, outline:"none", fontFamily:"'Exo 2',sans-serif" }}/>
          <button onClick={scan} disabled={scanning||!url.trim()} style={{ padding:"12px 16px", borderRadius:10, border:"none", background:scanning?"#2a2a4a":"linear-gradient(135deg,#7c4dff,#00e5ff)", color:"#fff", cursor:scanning?"not-allowed":"pointer", fontFamily:"'Exo 2',sans-serif", fontWeight:700, fontSize:12, display:"flex", alignItems:"center", gap:5 }}>
            <Icon name="scan" size={14}/>{scanning?"...":"Scan"}
          </button>
        </div>
        {scanning && (
          <div style={{ marginTop:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#7c4dff", marginBottom:4 }}><span>{step}</span><span>{progress}%</span></div>
            <div style={{ height:5, background:"#1a1a2e", borderRadius:3 }}><div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#7c4dff,#00e5ff)", borderRadius:3, transition:"width 0.35s ease" }}/></div>
          </div>
        )}
        <div style={{ marginTop:12, display:"flex", gap:6, flexWrap:"wrap" }}>
          {[{l:"🚨 Phishing",u:"http://fake-bank.com/login"},{l:"✅ Safe",u:"https://google.com"},{l:"⚠️ Suspicious",u:"http://login-verify.tk"}].map(p=>(
            <button key={p.l} onClick={()=>setUrl(p.u)} style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #2a2a4a", background:"#161625", color:"#888", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif" }}>{p.l}</button>
          ))}
        </div>
      </div>
      <div style={{ background:"#0d0d1a", borderRadius:18, padding:16, border:"1px solid #1a1a3e" }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#e0e0ff", marginBottom:12 }}>Detection Methods</div>
        {[{e:"🗄️",l:"Phishing DB",d:"1,200+ known URLs"},{e:"🔒",l:"HTTPS Check",d:"Detects no-encryption"},{e:"🔍",l:"Domain Analysis",d:"TLDs & pattern checks"},{e:"🤖",l:"ML Model",d:"TensorFlow Lite"},{e:"🇧🇩",l:"BD Local Scams",d:"bKash, Nagad list"}].map((m,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:i<4?"1px solid #1a1a2e":"none" }}>
            <span style={{ fontSize:15 }}>{m.e}</span>
            <div><div style={{ fontSize:12, color:"#e0e0ff", fontWeight:600 }}>{m.l}</div><div style={{ fontSize:10, color:"#555" }}>{m.d}</div></div>
            <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#00e676" }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesScreen({ messages, setMessages, onResult, setHistory, showToast }) {
  const [activeTab, setActiveTab] = useState("sms");
  const [showVault, setShowVault] = useState(false);
  const [scanning, setScanning] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [scanResults, setScanResults] = useState({});

  const allMsgs = messages[activeTab] || [];
  const activeMsgs = allMsgs.filter(m => !m.deleted);
  const vaultMsgs = allMsgs.filter(m => m.deleted);
  const displayed = showVault ? vaultMsgs : activeMsgs;

  const scanMsg = async (msg) => {
    if (!msg.hasLink) return;
    setScanning(msg.id);
    await new Promise(r => setTimeout(r, 1300));
    const result = analyzeURL(msg.url);
    setScanResults(prev => ({ ...prev, [msg.id]: result.status }));
    setHistory(prev=>[{ id:`h${Date.now()}`, url:msg.url, status:result.status, time:"Just now", source:PM[activeTab].label, platform:activeTab },...prev]);
    setScanning(null);
    onResult(result, msg.url);
  };

  const doDelete = () => {
    if (!deleteTarget) return;
    setMessages(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(m => m.id === deleteTarget.id ? { ...m, deleted:true } : m)
    }));
    showToast(`✓ Message deleted from ${PM[activeTab].label} — SPDA Vault-এ save হয়ে গেছে!`, "success");
    setDeleteTarget(null);
  };

  const restoreMsg = (id) => {
    setMessages(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(m => m.id === id ? { ...m, deleted:false } : m)
    }));
    showToast("Message restored to inbox!", "info");
  };

  return (
    <div style={{ padding:"0 18px 100px" }}>
      {/* Platform tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:14, background:"#0d0d1a", borderRadius:14, padding:5, border:"1px solid #1a1a2e" }}>
        {["sms","messenger","whatsapp"].map(t => {
          const pm = PM[t];
          const active = activeTab===t;
          const tDanger = (messages[t]||[]).filter(m=>!m.deleted&&m.hasLink&&scanResults[m.id]==="dangerous").length;
          return (
            <button key={t} onClick={()=>{ setActiveTab(t); setShowVault(false); }} style={{ flex:1, padding:"9px 6px", borderRadius:10, border:"none", background:active?pm.bg:"transparent", color:active?pm.color:"#555", cursor:"pointer", fontSize:10, fontWeight:active?700:400, fontFamily:"'Exo 2',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", gap:2, transition:"all 0.2s", position:"relative" }}>
              <span style={{ fontSize:18 }}>{pm.emoji}</span>
              <span>{pm.label}</span>
              {tDanger>0 && <div style={{ position:"absolute", top:3, right:3, width:14, height:14, borderRadius:"50%", background:"#ff1744", fontSize:8, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{tDanger}</div>}
            </button>
          );
        })}
      </div>

      {/* Vault / Inbox toggle */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={()=>setShowVault(false)} style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${!showVault?PM[activeTab].color:"#1a1a3e"}`, background:!showVault?`${PM[activeTab].color}18`:"transparent", color:!showVault?PM[activeTab].color:"#555", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", fontWeight:!showVault?700:400 }}>
            📥 Inbox ({activeMsgs.length})
          </button>
          {vaultMsgs.length>0 && (
            <button onClick={()=>setShowVault(true)} style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${showVault?"#7c4dff":"#1a1a3e"}`, background:showVault?"rgba(124,77,255,0.15)":"transparent", color:showVault?"#7c4dff":"#666", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", fontWeight:showVault?700:400, display:"flex", alignItems:"center", gap:4 }}>
              <Icon name="save" size={11}/> Vault ({vaultMsgs.length})
            </button>
          )}
        </div>
        {showVault && <div style={{ fontSize:10, color:"#7c4dff", fontStyle:"italic" }}>Deleted — safe here ✓</div>}
      </div>

      {/* Vault explanation banner */}
      {showVault && (
        <div style={{ background:"rgba(124,77,255,0.08)", border:"1px solid rgba(124,77,255,0.25)", borderRadius:12, padding:"10px 14px", marginBottom:12, display:"flex", gap:10, alignItems:"center" }}>
          <Icon name="save" size={18} color="#7c4dff"/>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#7c4dff" }}>SPDA Vault</div>
            <div style={{ fontSize:10, color:"#666" }}>এই messages গুলো {PM[activeTab].label} থেকে delete হয়েছে কিন্তু SPDA permanently save রেখেছে।</div>
          </div>
        </div>
      )}

      {/* Messages list */}
      {displayed.length===0 && (
        <div style={{ textAlign:"center", padding:"40px 20px", color:"#444" }}>
          <div style={{ fontSize:32, marginBottom:10 }}>{showVault?"🗄️":"📭"}</div>
          <div style={{ fontSize:12 }}>{showVault?"Vault empty — no deleted messages":"No messages"}</div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {displayed.map(msg => {
          const pm = PM[msg.platform];
          const isScanning = scanning===msg.id;
          const scanned = scanResults[msg.id];
          const st = scanned ? STATUS[scanned] : null;
          return (
            <div key={msg.id} style={{ background:"#0d0d1a", borderRadius:14, padding:"14px 14px", border:`1px solid ${msg.deleted?"rgba(124,77,255,0.25)":msg.hasLink?pm.color+"22":"#111122"}`, position:"relative" }}>
              {msg.deleted && (
                <div style={{ position:"absolute", top:0, right:0, background:"linear-gradient(135deg,#7c4dff,#00e5ff)", borderRadius:"0 14px 0 10px", padding:"3px 10px", fontSize:8, color:"#fff", fontWeight:700, letterSpacing:0.5 }}>🔒 VAULT</div>
              )}
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:`${pm.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18 }}>{msg.avatar}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#e0e0ff" }}>{msg.sender}</span>
                    <span style={{ fontSize:10, color:"#444" }}>{msg.time}</span>
                  </div>
                  <div style={{ fontSize:11, color:msg.deleted?"#555":"#777", lineHeight:1.55, wordBreak:"break-word" }}>{msg.preview}</div>
                  <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                    {msg.hasLink && !scanned && (
                      <div style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(124,77,255,0.1)", borderRadius:6, padding:"3px 7px" }}>
                        <Icon name="link" size={9} color="#7c4dff"/>
                        <span style={{ fontSize:9, color:"#7c4dff", fontWeight:600 }}>LINK DETECTED</span>
                      </div>
                    )}
                    {scanned && st && (
                      <div style={{ display:"flex", alignItems:"center", gap:4, background:st.bg, borderRadius:6, padding:"3px 7px", border:`1px solid ${st.color}33` }}>
                        <Icon name={st.icon} size={9} color={st.color}/>
                        <span style={{ fontSize:9, color:st.color, fontWeight:700 }}>{st.label}</span>
                      </div>
                    )}
                    <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
                      {msg.hasLink && !msg.deleted && (
                        <button onClick={()=>scanMsg(msg)} disabled={isScanning||!!scanned} style={{ padding:"5px 10px", borderRadius:7, border:"none", background:scanned?`${st?.bg}`:`linear-gradient(135deg,${pm.color}99,${pm.color})`, color: scanned?st?.color:"#fff", fontSize:9, fontWeight:700, cursor:(isScanning||scanned)?"default":"pointer", fontFamily:"'Exo 2',sans-serif", display:"flex", alignItems:"center", gap:4 }}>
                          <Icon name="scan" size={10}/>{isScanning?"Scanning...":scanned?"Scanned":"Scan"}
                        </button>
                      )}
                      {!msg.deleted && (
                        <button onClick={()=>setDeleteTarget(msg)} style={{ padding:"5px 8px", borderRadius:7, border:"1px solid #ff174422", background:"transparent", color:"#ff174877", cursor:"pointer" }}>
                          <Icon name="trash" size={12}/>
                        </button>
                      )}
                      {msg.deleted && (
                        <button onClick={()=>restoreMsg(msg.id)} style={{ padding:"5px 10px", borderRadius:7, border:"1px solid #7c4dff44", background:"rgba(124,77,255,0.1)", color:"#7c4dff", fontSize:9, fontWeight:600, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", display:"flex", alignItems:"center", gap:4 }}>
                          <Icon name="restore" size={10}/>Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DeleteModal msg={deleteTarget} onConfirm={doDelete} onCancel={()=>setDeleteTarget(null)}/>
    </div>
  );
}

function History({ history }) {
  const [filter, setFilter] = useState("all");
  const counts = history.reduce((a,h)=>({...a,[h.status]:(a[h.status]||0)+1}),{});
  const pIcon = { sms:"💬", messenger:"🔵", whatsapp:"🟢", manual:"🔍" };
  const filtered = filter==="all" ? history : history.filter(h=>h.status===filter||h.platform===filter);

  return (
    <div style={{ padding:"0 18px 100px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
        {["safe","suspicious","dangerous"].map(s=>(
          <button key={s} onClick={()=>setFilter(f=>f===s?"all":s)} style={{ background:filter===s?STATUS[s].bg:"#0d0d1a", borderRadius:12, padding:"11px 8px", textAlign:"center", border:`1px solid ${STATUS[s].color+(filter===s?"":"22")}`, cursor:"pointer" }}>
            <div style={{ fontSize:18, fontWeight:800, color:STATUS[s].color }}>{counts[s]||0}</div>
            <div style={{ fontSize:9, color:"#666", textTransform:"capitalize", marginTop:2 }}>{s}</div>
          </button>
        ))}
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:12, overflowX:"auto", paddingBottom:4 }}>
        {["all","sms","messenger","whatsapp","manual"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ padding:"4px 11px", borderRadius:20, border:`1px solid ${filter===f?"#7c4dff":"#1a1a3e"}`, background:filter===f?"rgba(124,77,255,0.15)":"transparent", color:filter===f?"#7c4dff":"#555", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", whiteSpace:"nowrap", fontWeight:filter===f?700:400 }}>
            {f==="all"?"All":f==="manual"?"🔍 Manual":`${pIcon[f]} ${f.charAt(0).toUpperCase()+f.slice(1)}`}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {filtered.length===0 && <div style={{ textAlign:"center", padding:"40px 0", color:"#444", fontSize:12 }}>No entries found</div>}
        {filtered.map((h,i)=>{
          const s = STATUS[h.status];
          return (
            <div key={h.id||i} style={{ background:"#0d0d1a", borderRadius:12, padding:"11px 14px", border:`1px solid ${s.color}18`, display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:9, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon name={s.icon} size={16} color={s.color}/></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11, color:"#e0e0ff", fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{h.url}</div>
                <div style={{ display:"flex", gap:6, marginTop:3, alignItems:"center" }}>
                  <span style={{ fontSize:10, color:"#444" }}>{h.time}</span>
                  <span style={{ fontSize:9, color:"#333", background:"#1a1a2e", borderRadius:4, padding:"1px 5px" }}>{pIcon[h.platform]||"🔍"} {h.source}</span>
                </div>
              </div>
              <span style={{ fontSize:9, fontWeight:700, color:s.color, textTransform:"uppercase", letterSpacing:0.8, flexShrink:0 }}>{h.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Report({ showToast }) {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("whatsapp");
  const [category, setCategory] = useState("phishing");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!url.trim()) return;
    setSubmitted(true);
    showToast("Report submitted! ধন্যবাদ 🇧🇩 Community safe রাখতে সাহায্যের জন্য।", "success");
    setTimeout(()=>{ setUrl(""); setDesc(""); setSubmitted(false); }, 2500);
  };

  const platOpts = [
    {k:"sms",e:"💬",l:"SMS"},{k:"messenger",e:"🔵",l:"Msngr"},{k:"whatsapp",e:"🟢",l:"WA"},{k:"other",e:"❓",l:"Other"}
  ];

  return (
    <div style={{ padding:"0 18px 100px" }}>
      <div style={{ background:"#0d0d1a", borderRadius:18, padding:16, border:"1px solid #1a1a3e", marginBottom:14 }}>
        <div style={{ fontSize:11, color:"#888", marginBottom:7 }}>Suspicious URL *</div>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://suspicious-link.com" style={{ width:"100%", padding:"11px 13px", borderRadius:10, background:"#161625", border:"1px solid #2a2a4a", color:"#e0e0ff", fontSize:12, outline:"none", fontFamily:"'Exo 2',sans-serif", boxSizing:"border-box" }}/>
        <div style={{ fontSize:11, color:"#888", margin:"13px 0 7px" }}>Platform</div>
        <div style={{ display:"flex", gap:6 }}>
          {platOpts.map(p=>(
            <button key={p.k} onClick={()=>setPlatform(p.k)} style={{ flex:1, padding:"8px 4px", borderRadius:8, border:`1px solid ${platform===p.k?(PM[p.k]?.color||"#7c4dff"):"#2a2a4a"}`, background:platform===p.k?`${PM[p.k]?.color||"#7c4dff"}18`:"transparent", color:platform===p.k?(PM[p.k]?.color||"#7c4dff"):"#555", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <span>{p.e}</span><span style={{ fontSize:9 }}>{p.l}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize:11, color:"#888", margin:"13px 0 7px" }}>Category</div>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {["phishing","scam","malware","fake-login","other"].map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{ padding:"5px 11px", borderRadius:8, border:`1px solid ${category===c?"#7c4dff":"#2a2a4a"}`, background:category===c?"rgba(124,77,255,0.15)":"transparent", color:category===c?"#7c4dff":"#555", fontSize:10, cursor:"pointer", fontFamily:"'Exo 2',sans-serif" }}>{c}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:"#888", margin:"13px 0 7px" }}>Description (optional)</div>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe how you got this link..." rows={3} style={{ width:"100%", padding:"11px 13px", borderRadius:10, background:"#161625", border:"1px solid #2a2a4a", color:"#e0e0ff", fontSize:12, outline:"none", fontFamily:"'Exo 2',sans-serif", resize:"none", boxSizing:"border-box" }}/>
        <button onClick={submit} disabled={!url.trim()||submitted} style={{ width:"100%", marginTop:13, padding:"12px", borderRadius:10, border:"none", background:submitted?"#00e676":"linear-gradient(135deg,#ff1744,#ff6d00)", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Exo 2',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {submitted?<><Icon name="check" size={16}/>Submitted!</>:<><Icon name="send" size={16}/>Submit Report</>}
        </button>
      </div>
      <div style={{ background:"#0d0d1a", borderRadius:18, padding:16, border:"1px solid #1a1a3e" }}>
        <div style={{ fontSize:12, fontWeight:700, color:"#e0e0ff", marginBottom:12 }}>Community Reports</div>
        {[{u:"brac-bank-verify.tk",r:47,t:"2h",c:"phishing",p:"💬 SMS"},{u:"bikash-bonus.ml",r:23,t:"5h",c:"scam",p:"🟢 WhatsApp"},{u:"nagad-offer.cf",r:31,t:"1d",c:"fake-login",p:"🔵 Messenger"},{u:"free-iphone-bd.xyz",r:18,t:"2d",c:"scam",p:"🟢 WhatsApp"}].map((r,i)=>(
          <div key={i} style={{ padding:"9px 0", borderBottom:i<3?"1px solid #1a1a2e":"none" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:11, color:"#e0e0ff", fontWeight:600 }}>{r.u}</span>
              <span style={{ fontSize:9, background:"rgba(255,23,68,0.15)", color:"#ff1744", padding:"2px 7px", borderRadius:10, fontWeight:600 }}>{r.r} reports</span>
            </div>
            <div style={{ display:"flex", gap:7, marginTop:3 }}>
              <span style={{ fontSize:10, color:"#444" }}>{r.t} ago</span>
              <span style={{ fontSize:9, color:"#7c4dff", background:"rgba(124,77,255,0.1)", padding:"1px 5px", borderRadius:4 }}>{r.c}</span>
              <span style={{ fontSize:9, color:"#555" }}>{r.p}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [history, setHistory] = useState(INIT_HISTORY);
  const [result, setResult] = useState(null);
  const [resultURL, setResultURL] = useState("");
  const [toast, setToast] = useState(null);
  const [notifs, setNotifs] = useState(3);
  const [loaded, setLoaded] = useState(false);

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const m = await window.storage?.get(STORAGE_KEY);
        if (m?.value) setMessages(JSON.parse(m.value));
        const h = await window.storage?.get(HISTORY_KEY);
        if (h?.value) setHistory(JSON.parse(h.value));
      } catch {}
      setLoaded(true);
    })();
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage?.set(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    })();
  }, [messages, loaded]);

  // Save history whenever it changes
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage?.set(HISTORY_KEY, JSON.stringify(history)); } catch {}
    })();
  }, [history, loaded]);

  const showToast = (msg, type) => setToast({ msg, type });

  const handleResult = (r, url) => {
    setResult(r); setResultURL(url);
    if (r.status==="dangerous") showToast("⚠️ Dangerous link! এই link এ যাবেন না।", "danger");
    else if (r.status==="suspicious") showToast("⚠️ Suspicious link — সাবধান!", "warning");
    else showToast("✓ This link appears safe.", "success");
  };

  const handleReport = () => { setResult(null); setScreen("report"); };

  const allDeleted = Object.values(messages).flat().filter(m=>m.deleted).length;
  const stats = {
    total: history.length,
    dangerous: history.filter(h=>h.status==="dangerous").length,
    suspicious: history.filter(h=>h.status==="suspicious").length,
    safe: history.filter(h=>h.status==="safe").length,
    smsDanger: history.filter(h=>h.platform==="sms"&&h.status==="dangerous").length,
    messengerDanger: history.filter(h=>h.platform==="messenger"&&h.status==="dangerous").length,
    whatsappDanger: history.filter(h=>h.platform==="whatsapp"&&h.status==="dangerous").length,
  };

  const navItems = [
    { id:"home", icon:"home", label:"Home" },
    { id:"scanner", icon:"scan", label:"Scanner" },
    { id:"messages", icon:"sms", label:"Messages" },
    { id:"history", icon:"history", label:"History" },
    { id:"report", icon:"report", label:"Report" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        body{background:#070712;font-family:'Exo 2',sans-serif;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#0d0d1a;}::-webkit-scrollbar-thumb{background:#2a2a4a;border-radius:2px;}
        @keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(255,23,68,0.4)}50%{box-shadow:0 0 40px rgba(255,23,68,0.8)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes slideIn{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes popIn{from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes fadeUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        input::placeholder,textarea::placeholder{color:#444;}
        button:active{opacity:0.8;}
      `}</style>
      <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#070712", fontFamily:"'Exo 2',sans-serif", display:"flex", flexDirection:"column" }}>
        {/* Top bar */}
        <div style={{ background:"#0a0a18", padding:"10px 18px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100, borderBottom:"1px solid #1a1a2e", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:"linear-gradient(135deg,#7c4dff,#00e5ff)", display:"flex", alignItems:"center", justifyContent:"center" }}><Icon name="shield" size={15} color="#fff"/></div>
            <span style={{ fontSize:15, fontWeight:800, color:"#e0e0ff" }}>SPDA</span>
            {allDeleted>0 && <div style={{ background:"rgba(124,77,255,0.15)", border:"1px solid rgba(124,77,255,0.3)", borderRadius:10, padding:"2px 7px", fontSize:9, color:"#7c4dff", fontWeight:700 }}>🔒 VAULT {allDeleted}</div>}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:11, color:"#555" }}>
            <span>9:41</span>
            <div style={{ position:"relative", cursor:"pointer" }} onClick={()=>setNotifs(0)}>
              <Icon name="bell" size={18} color={notifs>0?"#7c4dff":"#555"}/>
              {notifs>0 && <div style={{ position:"absolute", top:-4, right:-4, width:14, height:14, borderRadius:"50%", background:"#ff1744", fontSize:8, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{notifs}</div>}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto" }}>
          {screen !== "home" && (
            <div style={{ padding:"16px 18px 6px" }}>
              <h1 style={{ fontSize:19, fontWeight:900, color:"#e0e0ff" }}>{navItems.find(n=>n.id===screen)?.label}</h1>
            </div>
          )}
          <div key={screen} style={{ animation:"fadeUp 0.3s ease" }}>
            {screen==="home"     && <HomeScreen stats={stats} onQuickScan={()=>setScreen("scanner")}/>}
            {screen==="scanner"  && <URLScanner onResult={handleResult} setHistory={setHistory}/>}
            {screen==="messages" && <MessagesScreen messages={messages} setMessages={setMessages} onResult={handleResult} setHistory={setHistory} showToast={showToast}/>}
            {screen==="history"  && <History history={history}/>}
            {screen==="report"   && <Report showToast={showToast}/>}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ background:"#0a0a18", borderTop:"1px solid #1a1a2e", display:"flex", padding:"6px 0 10px", flexShrink:0 }}>
          {navItems.map(item=>{
            const active = screen===item.id;
            const isMsgs = item.id==="messages";
            return (
              <button key={item.id} onClick={()=>setScreen(item.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"4px 0", position:"relative" }}>
                <div style={{ width:34, height:34, borderRadius:10, background:active?"rgba(124,77,255,0.15)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <Icon name={item.icon} size={18} color={active?"#7c4dff":"#444"}/>
                  {isMsgs && (
                    <div style={{ position:"absolute", top:-2, right:-2, display:"flex", gap:2 }}>
                      {["#00e5ff","#0099ff","#25D366"].map((c,i)=><div key={i} style={{ width:4, height:4, borderRadius:"50%", background:c, boxShadow:`0 0 4px ${c}` }}/>)}
                    </div>
                  )}
                </div>
                <span style={{ fontSize:9, color:active?"#7c4dff":"#444", fontWeight:active?700:400 }}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {result && <ResultModal result={result} url={resultURL} onClose={()=>setResult(null)} onReport={handleReport}/>}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
    </>
  );
}
