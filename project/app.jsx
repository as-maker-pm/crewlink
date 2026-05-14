/* CrewLink — Interactive Prototype */
const { useState, useEffect, useMemo, useRef } = React;

/* ---------- Icons (inline SVG, lucide-style) ---------- */
const Icon = ({ name, size=18 }) => {
  const paths = {
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7H10v7H6a2 2 0 01-2-2z"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    clipboard: <><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="8" r="3"/><path d="M22 19c0-2.5-2-4.5-5-4.5"/></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h0M15 7h0M9 11h0M15 11h0M9 15h0M15 15h0"/></>,
    creditcard: <><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    bell: <><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon: <><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></>,
    chevdown: <><path d="M6 9l6 6 6-6"/></>,
    chevleft: <><path d="M15 18l-6-6 6-6"/></>,
    chevright: <><path d="M9 18l6-6-6-6"/></>,
    x: <><path d="M18 6L6 18M6 6l12 12"/></>,
    headset: <><path d="M3 14v-3a9 9 0 0118 0v3"/><path d="M21 14v3a3 3 0 01-3 3h-1v-7M3 14v3a3 3 0 003 3h1v-7"/></>,
    map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    arrowup: <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowdown: <><path d="M12 5v14M19 12l-7 7-7-7"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4z"/></>,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></>,
    filter: <><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    upload: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></>,
    alert: <><path d="M10.29 3.86l-8.18 14a2 2 0 001.71 3h16.36a2 2 0 001.71-3l-8.18-14a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h0"/></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h0M3 12h0M3 18h0"/></>,
    dots: <><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></>,
    sparkle: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></>,
    bolt: <><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></>,
    zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9z"/></>,
    refresh: <><path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 3v5h-5"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></>,
    crown: <><path d="M2 7l5 5 5-9 5 9 5-5-2 13H4z"/></>,
    bookmark: <><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></>,
    pin2: <><path d="M12 17v5M9 10.76V6h6v4.76l3 3.24v2H6v-2z"/></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      {paths[name] || null}
    </svg>
  );
};

/* ---------- Brand Mark ---------- */
const BrandMark = ({ collapsed }) => (
  <div className="brand">
    <div className="brand-mark">
      {/* abstract solar+link mark */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1"/>
      </svg>
    </div>
    {!collapsed && <span>CrewLink</span>}
  </div>
);

/* ---------- Mock Data ---------- */
const TECHS = [
  { id:'t1', name:'Marcus Chen',   spec:'Solar PV', city:'Austin, TX', phone:'(512) 555-0142', email:'marcus@crew.io', status:'Active',  jobs:42, rating:4.9 },
  { id:'t2', name:'Priya Patel',   spec:'Roof Survey', city:'Houston, TX', phone:'(713) 555-0183', email:'priya@crew.io', status:'Active', jobs:38, rating:4.8 },
  { id:'t3', name:'Diego Ramirez', spec:'Battery + PV', city:'Dallas, TX', phone:'(214) 555-0117', email:'diego@crew.io', status:'On leave', jobs:51, rating:4.7 },
  { id:'t4', name:'Sarah O\'Brien',spec:'Site Inspector', city:'San Antonio, TX', phone:'(210) 555-0166', email:'sarah@crew.io', status:'Active', jobs:29, rating:4.9 },
  { id:'t5', name:'Yuki Tanaka',   spec:'Solar PV', city:'Austin, TX', phone:'(512) 555-0177', email:'yuki@crew.io', status:'Active', jobs:33, rating:4.6 },
  { id:'t6', name:'Wesley Adebayo',spec:'Commercial', city:'Dallas, TX', phone:'(214) 555-0192', email:'wesley@crew.io', status:'Inactive', jobs:18, rating:4.5 },
];

const CLIENTS = [
  { id:'c1', name:'Lone Star Dispatch Co.', contacts:8, region:'TX-Central', tier:'Gold',   activeJobs:14, status:'Active' },
  { id:'c2', name:'Austin Roof Partners',   contacts:4, region:'TX-Central', tier:'Silver', activeJobs:6,  status:'Active' },
  { id:'c3', name:'Gulf Solar Group',       contacts:11,region:'TX-Coast',   tier:'Gold',   activeJobs:22, status:'Active' },
  { id:'c4', name:'Hill Country Solar',     contacts:3, region:'TX-West',    tier:'Bronze', activeJobs:3,  status:'Invited' },
  { id:'c5', name:'Permian Energy LLC',     contacts:6, region:'TX-West',    tier:'Silver', activeJobs:9,  status:'Active' },
];

const STATUSES = ['Pending','Completed','Cancelled'];
const SERVICES = ['Roof Survey','Solar PV Install','Battery Storage','Annual Inspection','Permit Walk'];
const SUPPORT_EMAIL = 'support@crewlink.com';

/* All US timezones from constants.ts */
const US_TIMEZONES = [
  { name:'America/New_York',    label:'Eastern Standard Time (GMT-5)' },
  { name:'America/Chicago',     label:'Central Standard Time (GMT-6)' },
  { name:'America/Denver',      label:'Mountain Standard Time (GMT-7)' },
  { name:'America/Phoenix',     label:'Mountain Standard Time - Phoenix (GMT-7, No DST)' },
  { name:'America/Los_Angeles', label:'Pacific Standard Time (GMT-8)' },
  { name:'America/Anchorage',   label:'Alaska Standard Time (GMT-9)' },
  { name:'Pacific/Honolulu',    label:'Hawaii-Aleutian Standard Time (GMT-10)' },
];

const WORKING_DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const DEFAULT_RADIUS = 250;

/* CPM / Dispatcher mock data — separate from dispatching companies */
const CPMS = [
  { id:'cpm1', clientId:'c1', name:'Olivia Stewart', role:'Lead Dispatcher', email:'olivia@lonestar.com', phone:'(512) 555-2231', status:'Active',  jobs:48 },
  { id:'cpm2', clientId:'c1', name:'Carlos Mendez',  role:'Dispatcher',      email:'carlos@lonestar.com', phone:'(512) 555-2232', status:'Active',  jobs:32 },
  { id:'cpm3', clientId:'c1', name:'Aisha Brown',    role:'Dispatcher',      email:'aisha@lonestar.com',  phone:'(512) 555-2233', status:'Invited', jobs:0 },
  { id:'cpm4', clientId:'c1', name:'Tyler Quinn',    role:'Coordinator',     email:'tyler@lonestar.com',  phone:'(512) 555-2234', status:'Inactive',jobs:14 },
];

// Generate ~40 survey requests
const REQUESTS = (() => {
  const homeowners = ['Anderson','Brooks','Cole','Diaz','Edwards','Foster','Garcia','Hayes','Iverson','Jackson','Kim','Lopez','Martinez','Nguyen','Owens','Park','Quincy','Reed','Singh','Torres','Underwood','Velasquez','Wong','Young','Zhao'];
  const firstNames = ['James','Maria','David','Emily','Robert','Linda','Michael','Sarah','William','Jennifer'];
  const streets = ['Maple Ave','Cedar St','Oak Ln','Pinewood Dr','Ridgeline Rd','Sunset Blvd','Autumn Way','Bluebonnet Tr','Acorn Ct','Riverside Dr'];
  const out = [];
  for (let i = 0; i < 40; i++) {
    const status = STATUSES[i % STATUSES.length];
    const day = ((i * 3) % 28) + 1;
    const homeowner = `${firstNames[i%firstNames.length]} ${homeowners[i % homeowners.length]}`;
    out.push({
      id: 'SR-' + (1024 + i),
      client: homeowners[i % homeowners.length] + ' Residence',
      homeownerName: homeowner,
      email: `${homeowner.toLowerCase().replace(' ','.')}@gmail.com`,
      phone: `(${512 + (i%4)*100}) 555-${String(1000+i*7).slice(0,4)}`,
      address: `${100 + i*7} ${streets[i%streets.length]}, ${['Austin','Houston','Dallas','San Antonio'][i%4]}, TX`,
      service: SERVICES[i % SERVICES.length],
      slotMinutes: [60,90,120,45,60][i%5],
      status,
      tech: TECHS[i % TECHS.length],
      cpm: CPMS[i % CPMS.length],
      date: `2025-11-${String(day).padStart(2,'0')}`,
      time: ['08:00','10:00','13:00','15:00'][i%4],
      priority: ['Normal','High','Normal','Low','Normal'][i%5],
      notes: 'Customer prefers morning slots. Gate code 4421. Two-story home, south-facing roof.',
      noteText: 'Homeowner confirmed gate code. Pets on premises.',
      proposal: i%4===0 ? { fileName:'Solar_Proposal_v2.pdf', fileSize:'2.4 MB' } : null,
      cancellationReason: status==='Cancelled' ? ['Homeowner rescheduled','Weather conditions','Permitting delay'][i%3] : null,
      created: `2025-10-${String(((i*2)%28)+1).padStart(2,'0')}`,
      photos: i % 3 === 0 ? 3 : (i%3===1?1:0),
    });
  }
  return out;
})();

const TENANTS = [
  { id:'tn1', name:'SunPath Solar Inc.', plan:'Pro', users:48, requests:1240, status:'Active',  joined:'2024-03' },
  { id:'tn2', name:'BrightField Energy', plan:'Business', users:124, requests:5680, status:'Active', joined:'2023-09' },
  { id:'tn3', name:'Helio Roofing Co.',  plan:'Starter', users:9, requests:120, status:'Trial', joined:'2025-10' },
  { id:'tn4', name:'GreenLeaf Solutions',plan:'Pro', users:32, requests:890, status:'Active', joined:'2024-08' },
  { id:'tn5', name:'Solaris West',       plan:'Business',users:88, requests:3210, status:'Past due', joined:'2023-11' },
];

const PLANS = [
  { name:'Starter',  price:49,  desc:'For small crews getting started', feats:['Up to 10 users','100 surveys/mo','Basic calendar','Email support'] },
  { name:'Pro',      price:149, desc:'For growing solar businesses',    feats:['Up to 50 users','1000 surveys/mo','Advanced calendar','Conflict detection','Priority support','Custom branding'], featured:true },
  { name:'Business', price:399, desc:'Multi-region operations',         feats:['Unlimited users','Unlimited surveys','Multi-tenant','SSO + RBAC','Dedicated success mgr','99.9% SLA'] },
];

const BOOKINGS_BY_DATE = (() => {
  const map = {};
  REQUESTS.forEach(r => {
    if (!map[r.date]) map[r.date] = [];
    map[r.date].push(r);
  });
  return map;
})();

/* ---------- Roles ---------- */
const ROLES = [
  { key:'super_admin', label:'Super Admin', user:'Alex Kowalski', initials:'AK' },
  { key:'admin',       label:'Admin',       user:'Jamie Reyes',   initials:'JR' },
  { key:'cpm',         label:'Dispatcher',  user:'Sam Whitfield', initials:'SW' },
  { key:'tech',        label:'Technician',  user:'Marcus Chen',   initials:'MC' },
];

const NAV_BY_ROLE = {
  super_admin: ['home','tenants','plans','calendar','settings'],
  admin:       ['home','calendar','requests','technicians','clients','tenant_services','plan_usage','settings'],
  cpm:         ['home','calendar','requests','technicians','clients','settings'],
  tech:        ['home','calendar','my_requests','settings'],
};

const NAV_DEFS = {
  home:            { label:'Dashboard',        icon:'home' },
  calendar:        { label:'Calendar',         icon:'calendar' },
  requests:        { label:'Survey Requests',  icon:'clipboard' },
  my_requests:     { label:'My Schedule',      icon:'clipboard' },
  technicians:     { label:'Technicians',      icon:'users' },
  clients:         { label:'Dispatching Cos.', icon:'building' },
  tenants:         { label:'Tenants',          icon:'building' },
  tenant_services: { label:'Services',         icon:'bookmark' },
  plans:           { label:'Plan Management',  icon:'crown' },
  plan_usage:      { label:'Plan & Billing',   icon:'creditcard' },
  settings:        { label:'Settings',         icon:'settings' },
};

/* ---------- Helpers ---------- */
const statusBadge = (s) => {
  const cls = ({
    'Active':'badge-success','Scheduled':'badge-pri','In Progress':'badge-warn','Completed':'badge-success','Cancelled':'badge-danger','Pending':'badge-warn','Invited':'badge-pri','Trial':'badge-warn','Past due':'badge-danger','On leave':'badge-warn','Inactive':'badge-muted','High':'badge-danger','Low':'badge-muted','Normal':'badge-pri'
  })[s] || 'badge-muted';
  return <span className={`badge ${cls}`}><span className="dot" style={{background:'currentColor'}}/>{s}</span>;
};

const tierColors = { Gold:'#d99a00', Silver:'#9ca3af', Bronze:'#a26430' };

/* ---------- Sidebar ---------- */
const Sidebar = ({ role, route, setRoute, collapsed, setCollapsed }) => {
  const items = NAV_BY_ROLE[role.key];
  return (
    <aside className={`sb ${collapsed?'collapsed':''}`}>
      <div className="sb-head">
        <BrandMark collapsed={collapsed}/>
      </div>
      <nav className="sb-nav">
        {!collapsed && <div className="sb-section">Workspace</div>}
        {items.map(k => {
          const def = NAV_DEFS[k];
          const active = route === k;
          return (
            <div key={k} className={`sb-item ${active?'active':''}`} onClick={() => setRoute(k)} title={def.label}>
              <Icon name={def.icon}/>
              {!collapsed && <span>{def.label}</span>}
            </div>
          );
        })}
      </nav>
      <div className="sb-foot">
        <div className="sb-item" onClick={() => setCollapsed(!collapsed)} style={{padding:'8px 14px'}}>
          <Icon name={collapsed?'chevright':'chevleft'}/>
          {!collapsed && <span style={{fontSize:13}}>Collapse</span>}
        </div>
        <div className="sb-item" style={{padding:'8px 14px'}}>
          <Icon name="headset"/>
          {!collapsed && <span style={{fontSize:13}}>Get Support</span>}
        </div>
      </div>
    </aside>
  );
};

/* ---------- Header ---------- */
const Header = ({ role, setRole, theme, setTheme, onAdd, onSearch, query, onSignOut, setView }) => {
  const [roleOpen, setRoleOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return (
    <header className="hd">
      <div className="left">
        <div className="search">
          <Icon name="search" size={16}/>
          <input value={query} onChange={e=>onSearch(e.target.value)} placeholder="Search requests, clients, technicians…"/>
          <span className="muted" style={{fontSize:11, padding:'2px 6px', border:'1px solid var(--border)', borderRadius:5}}>⌘K</span>
        </div>
      </div>
      <button className="btn btn-primary" onClick={onAdd}><Icon name="plus" size={16}/>New Survey Request</button>
      <button className="icon-btn" onClick={() => setTheme(theme==='light'?'dark':'light')} title="Toggle theme">
        <Icon name={theme==='light'?'moon':'sun'}/>
      </button>
      <button className="icon-btn" title="Notifications"><Icon name="bell"/><span className="hd-dot"/></button>
      <div style={{position:'relative'}}>
        <div className="role-pill" onClick={()=>setRoleOpen(o=>!o)}>
          <span className="role-dot"/>
          <span>{role.label}</span>
          <Icon name="chevdown" size={14}/>
        </div>
        {roleOpen && (
          <div style={{position:'absolute', top:'calc(100% + 6px)', right:0, background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, boxShadow:'var(--shadow-md)', minWidth:240, zIndex:50, overflow:'hidden'}}>
            <div style={{padding:'10px 14px', borderBottom:'1px solid var(--border)', fontSize:11, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:600}}>Switch role</div>
            {ROLES.map(r => (
              <div key={r.key} onClick={()=>{setRole(r); setRoleOpen(false);}} style={{padding:'10px 14px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', background: r.key===role.key?'var(--accent)':'transparent'}}>
                <div className="avatar-sm">{r.initials}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:600}}>{r.label}</div>
                  <div style={{fontSize:11, color:'var(--muted-foreground)'}}>{r.user}</div>
                </div>
                {r.key===role.key && <Icon name="check" size={14}/>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{position:'relative'}}>
        <div className="avatar" style={{cursor:'pointer'}} onClick={()=>setUserOpen(o=>!o)}>{role.initials}</div>
        {userOpen && (
          <div style={{position:'absolute', top:'calc(100% + 6px)', right:0, background:'var(--card)', border:'1px solid var(--border)', borderRadius:10, boxShadow:'var(--shadow-md)', minWidth:230, zIndex:60, overflow:'hidden'}}>
            <div style={{padding:'12px 14px', borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:13, fontWeight:700}}>{role.user}</div>
              <div className="muted" style={{fontSize:11, marginTop:2}}>{role.label}</div>
            </div>
            <div style={{padding:'6px 0', borderBottom:'1px solid var(--border)', fontSize:10, color:'var(--muted-foreground)', textTransform:'uppercase', letterSpacing:'.06em', fontWeight:700, paddingLeft:14}}>Preview screens</div>
            {[
              {l:'Payment success', v:'pay_ok',     i:'check'},
              {l:'Payment cancel',  v:'pay_cancel', i:'x'},
              {l:'404 not found',   v:'notfound',   i:'alert'},
            ].map(p => (
              <div key={p.v} className="row" onClick={()=>{setView(p.v); setUserOpen(false);}} style={{padding:'9px 14px', fontSize:13, cursor:'pointer', gap:10}}>
                <Icon name={p.i} size={14}/>{p.l}
              </div>
            ))}
            <div className="row" onClick={()=>{setUserOpen(false); onSignOut();}} style={{padding:'11px 14px', fontSize:13, cursor:'pointer', gap:10, borderTop:'1px solid var(--border)', color:'var(--destructive)', fontWeight:600}}>
              <Icon name="logout" size={14}/>Sign out
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

/* ---------- Page Header ---------- */
const PageHead = ({ title, sub, right }) => (
  <div className="page-head">
    <div>
      <h1>{title}</h1>
      {sub && <div className="sub">{sub}</div>}
    </div>
    {right && <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>{right}</div>}
  </div>
);

/* ---------- Stat ---------- */
const Stat = ({ label, value, delta, deltaDir='up', icon, iconColor }) => (
  <div className="stat">
    <div className={`stat-icon ${iconColor||''}`}><Icon name={icon}/></div>
    <div className="lbl">{label}</div>
    <div className="val">{value}</div>
    {delta && <div className={`delta ${deltaDir==='down'?'down':''}`}>
      <Icon name={deltaDir==='down'?'arrowdown':'arrowup'} size={12}/>
      {delta}
    </div>}
  </div>
);

/* ---------- DASHBOARDS ---------- */
const HomeDashboard = ({ role, go }) => {
  if (role.key === 'super_admin') return <SuperAdminHome go={go}/>;
  if (role.key === 'tech')        return <TechHome go={go}/>;
  return <AdminHome go={go} role={role}/>;
};

const AdminHome = ({ go, role }) => (
  <div>
    <PageHead
      title={`Welcome back, ${role.user.split(' ')[0]}`}
      sub="Here's what's happening across your team this week."
      right={<>
        <button className="btn btn-outline"><Icon name="download" size={14}/>Export</button>
        <div className="seg">
          <button className="active">This week</button>
          <button>This month</button>
          <button>Quarter</button>
        </div>
      </>}
    />
    <div className="stats">
      <Stat label="Active Requests" value="138" delta="+12% vs last week" icon="clipboard"/>
      <Stat label="Surveys Today" value="14" delta="+3 since 9am" icon="calendar" iconColor="green"/>
      <Stat label="Technicians on-job" value="18 / 24" icon="users" iconColor="gold"/>
      <Stat label="Conflicts" value="3" delta="-2 vs yesterday" deltaDir="down" icon="alert" iconColor="red"/>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:18, marginBottom:18}}>
      <div className="card">
        <div className="card-h">
          <h3>Recent Survey Requests</h3>
          <button className="btn btn-ghost btn-sm" onClick={()=>go('requests')}>View all <Icon name="chevright" size={14}/></button>
        </div>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Client</th><th>Service</th><th>Tech</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {REQUESTS.slice(0,7).map(r => (
              <tr key={r.id}>
                <td style={{fontWeight:600}}>{r.id}</td>
                <td>{r.client}</td>
                <td><span className="muted">{r.service}</span></td>
                <td><div className="row"><div className="avatar-sm">{r.tech.name.split(' ').map(n=>n[0]).join('')}</div>{r.tech.name}</div></td>
                <td>{statusBadge(r.status)}</td>
                <td className="muted">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-h"><h3>Today's Schedule</h3><span className="badge badge-pri">14 jobs</span></div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {REQUESTS.slice(0, 5).map(r => (
            <div key={r.id} style={{display:'flex', gap:10, padding:'10px 0', borderBottom:'1px dashed var(--border)'}}>
              <div style={{width:54, textAlign:'center'}}>
                <div style={{fontWeight:700, fontSize:14}}>{r.time}</div>
                <div className="muted" style={{fontSize:11}}>2h</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:13, fontWeight:600}}>{r.client}</div>
                <div className="muted" style={{fontSize:12}}>{r.service} · {r.tech.name}</div>
              </div>
              {statusBadge(r.status)}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
      <div className="card">
        <div className="card-h"><h3>Top Performing Technicians</h3></div>
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {TECHS.slice(0,4).map((t,i) => (
            <div key={t.id} className="row">
              <div className="avatar-md">{t.name.split(' ').map(n=>n[0]).join('')}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600, fontSize:13}}>{t.name}</div>
                <div className="muted" style={{fontSize:12}}>{t.spec} · {t.city}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:700, fontSize:14}}>{t.jobs} <span className="muted" style={{fontWeight:400, fontSize:11}}>jobs</span></div>
                <div style={{color:'var(--warning)', fontSize:12, fontWeight:600}}>★ {t.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-h"><h3>Service Mix (last 30 days)</h3></div>
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {[
            {name:'Roof Survey', pct: 38, count: 142},
            {name:'Solar PV Install', pct: 27, count: 101},
            {name:'Battery Storage', pct: 18, count: 67},
            {name:'Annual Inspection', pct: 11, count: 41},
            {name:'Permit Walk', pct: 6, count: 22},
          ].map(s => (
            <div key={s.name}>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:5}}>
                <span style={{fontWeight:500}}>{s.name}</span>
                <span className="muted">{s.count} · {s.pct}%</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${s.pct*2.5}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SuperAdminHome = ({ go }) => (
  <div>
    <PageHead title="Platform Overview" sub="Cross-tenant metrics and recent activity"/>
    <div className="stats">
      <Stat label="Active Tenants" value="47" delta="+3 this month" icon="building"/>
      <Stat label="Total MRR" value="$28,440" delta="+8.2%" icon="creditcard" iconColor="green"/>
      <Stat label="Surveys This Month" value="12,408" delta="+14%" icon="clipboard" iconColor="gold"/>
      <Stat label="Tenants past due" value="3" deltaDir="down" delta="needs attention" icon="alert" iconColor="red"/>
    </div>
    <div className="card" style={{marginBottom:18}}>
      <div className="card-h"><h3>Tenants</h3><button className="btn btn-outline btn-sm" onClick={()=>go('tenants')}>Manage all</button></div>
      <table className="tbl">
        <thead><tr><th>Tenant</th><th>Plan</th><th>Users</th><th>Requests</th><th>Status</th><th>Joined</th></tr></thead>
        <tbody>
          {TENANTS.map(t => (
            <tr key={t.id}>
              <td style={{fontWeight:600}}><div className="row"><div className="avatar-sm">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>{t.name}</div></td>
              <td><span className="badge badge-pri">{t.plan}</span></td>
              <td>{t.users}</td>
              <td>{t.requests.toLocaleString()}</td>
              <td>{statusBadge(t.status)}</td>
              <td className="muted">{t.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TechHome = ({ go }) => {
  const myJobs = REQUESTS.filter(r => r.tech.id === 't1').slice(0,8);
  return (
    <div>
      <PageHead title="My Schedule" sub="Wednesday, November 12 · 4 jobs today"/>
      <div className="stats">
        <Stat label="Jobs today" value="4" icon="calendar"/>
        <Stat label="Jobs this week" value="18" delta="+2" icon="clipboard" iconColor="green"/>
        <Stat label="Completed (mo)" value="42" icon="check" iconColor="gold"/>
        <Stat label="Avg rating" value="4.9" icon="sparkle" iconColor="gold"/>
      </div>
      <div className="card">
        <div className="card-h"><h3>Today's Route</h3><button className="btn btn-outline btn-sm"><Icon name="map" size={14}/>View on map</button></div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {myJobs.slice(0,4).map((j, idx) => (
            <div key={j.id} style={{display:'flex', gap:14, padding:14, border:'1px solid var(--border)', borderRadius:10}}>
              <div style={{width:32, height:32, borderRadius:'50%', background:'var(--primary)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, flexShrink:0}}>{idx+1}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
                  <span style={{fontWeight:600}}>{j.time}</span>
                  <span style={{fontWeight:600}}>· {j.client}</span>
                  {statusBadge(j.status)}
                </div>
                <div className="muted" style={{fontSize:12, display:'flex', alignItems:'center', gap:6}}><Icon name="pin" size={12}/>{j.address}</div>
                <div className="muted" style={{fontSize:12, marginTop:2}}>{j.service}</div>
              </div>
              <button className="btn btn-outline btn-sm">Open</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- CALENDAR ---------- */
const Calendar = ({ go, openDetail }) => {
  const [view, setView] = useState('month');
  const [cursor, setCursor] = useState(new Date(2025, 10, 12)); // Nov 12 2025

  const monthName = cursor.toLocaleString('en-US', {month:'long', year:'numeric'});

  const shift = (n) => {
    const d = new Date(cursor);
    if (view==='month') d.setMonth(d.getMonth()+n);
    else if (view==='week') d.setDate(d.getDate()+ 7*n);
    else d.setDate(d.getDate()+n);
    setCursor(d);
  };

  return (
    <div>
      <PageHead title="Calendar" sub="Manage technician schedules and availability"
        right={<>
          <div className="seg">
            <button className={view==='month'?'active':''} onClick={()=>setView('month')}>Month</button>
            <button className={view==='week'?'active':''} onClick={()=>setView('week')}>Week</button>
            <button className={view==='day'?'active':''} onClick={()=>setView('day')}>Day</button>
          </div>
          <button className="btn btn-outline"><Icon name="filter" size={14}/>Filters</button>
        </>}
      />

      <div className="card">
        <div className="cal-toolbar">
          <div className="row">
            <button className="icon-btn" onClick={()=>shift(-1)}><Icon name="chevleft"/></button>
            <button className="btn btn-outline btn-sm" onClick={()=>setCursor(new Date(2025,10,12))}>Today</button>
            <button className="icon-btn" onClick={()=>shift(1)}><Icon name="chevright"/></button>
            <h2 style={{fontSize:18, marginLeft:8}}>{view==='month'?monthName:cursor.toDateString()}</h2>
          </div>
          <div className="row" style={{gap:14}}>
            <span className="muted" style={{fontSize:12, display:'flex', alignItems:'center', gap:6}}><span className="dot" style={{background:'var(--primary)'}}/>Active</span>
            <span className="muted" style={{fontSize:12, display:'flex', alignItems:'center', gap:6}}><span className="dot" style={{background:'var(--success)'}}/>Completed</span>
            <span className="muted" style={{fontSize:12, display:'flex', alignItems:'center', gap:6}}><span className="dot" style={{background:'var(--destructive)'}}/>Cancelled</span>
            <span className="muted" style={{fontSize:12, display:'flex', alignItems:'center', gap:6}}><span className="dot" style={{background:'var(--warning)'}}/>Conflict</span>
          </div>
        </div>

        {view==='month' && <MonthView cursor={cursor} setView={setView} setCursor={setCursor} openDetail={openDetail}/>}
        {view==='week'  && <WeekView  cursor={cursor} openDetail={openDetail}/>}
        {view==='day'   && <DayView   cursor={cursor} openDetail={openDetail}/>}
      </div>
    </div>
  );
};

const MonthView = ({ cursor, setView, setCursor, openDetail }) => {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const totalDays = new Date(year, month+1, 0).getDate();
  const cells = [];
  // leading from prev month
  const prevDays = new Date(year, month, 0).getDate();
  for (let i = startDow-1; i >= 0; i--) cells.push({ date: new Date(year, month-1, prevDays-i), muted:true });
  for (let i = 1; i <= totalDays; i++) cells.push({ date: new Date(year, month, i), muted:false });
  while (cells.length % 7 !== 0) {
    const d = cells[cells.length-1].date;
    cells.push({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()+1), muted:true });
  }
  // pad to 6 weeks for consistent height
  while (cells.length < 42) {
    const d = cells[cells.length-1].date;
    cells.push({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()+1), muted:true });
  }
  const today = new Date(2025,10,12);
  const todayStr = today.toISOString().slice(0,10);
  const fmt = d => d.toISOString().slice(0,10);

  return (
    <div>
      <div className="cal-month-grid" style={{marginBottom:6}}>
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="cal-dow">{d}</div>)}
      </div>
      <div className="cal-month-grid">
        {cells.map((c, i) => {
          const k = fmt(c.date);
          const events = (BOOKINGS_BY_DATE[k] || []).slice(0, 3);
          const hasMore = (BOOKINGS_BY_DATE[k] || []).length - events.length;
          const isToday = k === todayStr;
          return (
            <div key={i} className={`cal-day ${c.muted?'muted':''} ${isToday?'today':''}`}
                 onClick={()=>{ setCursor(c.date); setView('day'); }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span className="cal-day-num">{c.date.getDate()}</span>
                {events.length>0 && <span className="muted" style={{fontSize:10}}>{events.length + (hasMore>0?hasMore:0)}</span>}
              </div>
              {events.map((ev, ei) => {
                const cls = ev.status==='Completed'?'completed':ev.status==='Cancelled'?'cancelled':(ei===0&&i%9===3)?'conflict':'active';
                return <div key={ev.id} className={`cal-event ${cls}`} onClick={(e)=>{e.stopPropagation(); openDetail(ev);}}>{ev.time} · {ev.client.split(' ')[0]}</div>;
              })}
              {hasMore > 0 && <div className="cal-more">+{hasMore} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeekView = ({ cursor, openDetail }) => {
  const start = new Date(cursor); start.setDate(cursor.getDate() - cursor.getDay());
  const days = Array.from({length:7}, (_,i) => { const d = new Date(start); d.setDate(start.getDate()+i); return d; });
  const slots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
  const todayStr = new Date(2025,10,12).toISOString().slice(0,10);
  return (
    <div className="week-grid">
      <div className="week-head"></div>
      {days.map(d => {
        const isT = d.toISOString().slice(0,10) === todayStr;
        return <div key={d.toISOString()} className={`week-head ${isT?'today':''}`}>
          <div style={{fontSize:11, opacity:.7}}>{d.toLocaleString('en',{weekday:'short'})}</div>
          <div>{d.getDate()}</div>
        </div>;
      })}
      {slots.map(slot => (
        <React.Fragment key={slot}>
          <div className="week-time">{slot}</div>
          {days.map(d => {
            const k = d.toISOString().slice(0,10);
            const events = (BOOKINGS_BY_DATE[k]||[]).filter(e => e.time === slot);
            return (
              <div key={k+slot} className="week-cell">
                {events.map((ev, ei) => {
                  const cls = ev.status==='Completed'?'completed':ev.status==='Cancelled'?'cancelled':(ei===0 && d.getDate()%5===0)?'conflict':'active';
                  return <div key={ev.id} className={`cal-event ${cls}`} onClick={()=>openDetail(ev)}>{ev.client.split(' ')[0]} · {ev.tech.name.split(' ')[0]}</div>;
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

const DayView = ({ cursor, openDetail }) => {
  const k = cursor.toISOString().slice(0,10);
  const slots = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
  const events = BOOKINGS_BY_DATE[k] || [];
  const hasConflict = events.length > 1 && cursor.getDate() % 4 === 0;
  return (
    <div>
      {hasConflict && (
        <div className="banner warn">
          <Icon name="alert" size={16}/>
          <div><strong>Schedule conflict detected.</strong> Two requests overlap at 13:00. <a href="#" style={{color:'inherit', textDecoration:'underline'}}>Reassign</a></div>
        </div>
      )}
      <div className="day-grid">
        {slots.map(slot => {
          const slotEvents = events.filter(e => e.time === slot);
          return (
            <React.Fragment key={slot}>
              <div className="day-cell" style={{background:'var(--muted)', fontSize:12, fontWeight:600, color:'var(--muted-foreground)'}}>{slot}</div>
              <div className="day-cell">
                {slotEvents.length === 0 ? <span className="muted" style={{fontSize:12}}>—</span> :
                  slotEvents.map((ev,i) => (
                    <div key={ev.id} className={`day-event ${i===1?'conflict':''}`} onClick={()=>openDetail(ev)}>
                      <h4>{ev.client} · <span style={{fontWeight:500, color:'var(--muted-foreground)'}}>{ev.id}</span></h4>
                      <p>{ev.service} · {ev.tech.name} · {ev.address}</p>
                    </div>
                  ))
                }
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- REQUESTS ---------- */
const RequestsList = ({ openDetail, openAdd, query }) => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('date');

  const filtered = REQUESTS
    .filter(r => filter==='All' || r.status===filter)
    .filter(r => !query || (r.id+r.client+r.service+r.tech.name).toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <PageHead title="Survey Requests" sub={`${filtered.length} of ${REQUESTS.length} requests`}
        right={<>
          <button className="btn btn-outline"><Icon name="download" size={14}/>Export</button>
          <button className="btn btn-primary" onClick={openAdd}><Icon name="plus" size={14}/>New Request</button>
        </>}
      />

      <div className="card flat" style={{padding:'10px 14px', marginBottom:14, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'}}>
        <div className="seg">
          {['All',...STATUSES].map(s => <button key={s} className={filter===s?'active':''} onClick={()=>setFilter(s)}>{s}</button>)}
        </div>
        <span className="spacer"/>
        <span className="muted" style={{fontSize:12}}>Sort by</span>
        <select className="input" style={{width:140}} value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="date">Date</option>
          <option value="client">Client</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <table className="tbl">
          <thead><tr>
            <th>ID</th><th>Client</th><th>Service</th><th>Address</th><th>Technician</th><th>Status</th><th>Priority</th><th>Date</th><th></th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} onClick={()=>openDetail(r)}>
                <td style={{fontWeight:700, color:'var(--primary)'}}>{r.id}</td>
                <td style={{fontWeight:600}}>{r.client}</td>
                <td><span className="muted">{r.service}</span></td>
                <td className="muted" style={{maxWidth:240, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{r.address}</td>
                <td><div className="row"><div className="avatar-sm">{r.tech.name.split(' ').map(n=>n[0]).join('')}</div>{r.tech.name}</div></td>
                <td>{statusBadge(r.status)}</td>
                <td>{statusBadge(r.priority)}</td>
                <td className="muted">{r.date} · {r.time}</td>
                <td><Icon name="dots" size={16}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RequestDetail = ({ req, onClose, onStatusChange, toast }) => {
  if (!req) return null;
  const [cancelReason, setCancelReason] = useState(req.cancellationReason || '');
  const [showCancel, setShowCancel] = useState(false);
  return (
    <div>
      <PageHead title={`${req.id} · ${req.homeownerName || req.client}`}
        sub={req.address}
        right={<>
          <button className="btn btn-ghost" onClick={onClose}><Icon name="chevleft" size={14}/>Back</button>
          <button className="btn btn-outline"><Icon name="edit" size={14}/>Edit</button>
          {req.status !== 'Cancelled' && req.status !== 'Completed' && <button className="btn btn-outline" onClick={()=>setShowCancel(true)} style={{color:'var(--destructive)'}}><Icon name="x" size={14}/>Cancel</button>}
          {req.status !== 'Completed' && <button className="btn btn-primary" onClick={()=>{onStatusChange(req,'Completed'); toast('Marked as completed');}}><Icon name="check" size={14}/>Mark complete</button>}
        </>}
      />
      {req.status === 'Cancelled' && req.cancellationReason && (
        <div className="banner warn" style={{marginBottom:16}}>
          <Icon name="alert" size={16}/>
          <div><strong>Cancelled.</strong> Reason: {req.cancellationReason}</div>
        </div>
      )}
      <div className="detail-grid">
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div className="card-h"><h3>Homeowner & request details</h3>{statusBadge(req.status)}</div>
            <div className="grid-2">
              <div className="kv"><div className="k">Homeowner</div><div className="v">{req.homeownerName || req.client}</div></div>
              <div className="kv"><div className="k">Email</div><div className="v">{req.email || '—'}</div></div>
              <div className="kv"><div className="k">Phone</div><div className="v">{req.phone || '—'}</div></div>
              <div className="kv"><div className="k">Dispatched by</div><div className="v">{req.cpm ? req.cpm.name : '—'}</div></div>
              <div className="kv"><div className="k">Service</div><div className="v">{req.service} <span className="muted" style={{fontWeight:400}}>· {req.slotMinutes || 60} min</span></div></div>
              <div className="kv"><div className="k">Priority</div><div className="v">{statusBadge(req.priority)}</div></div>
              <div className="kv"><div className="k">Scheduled</div><div className="v">{req.date} at {req.time}</div></div>
              <div className="kv"><div className="k">Created</div><div className="v">{req.created}</div></div>
              <div className="kv" style={{gridColumn:'1 / -1'}}><div className="k">Address</div><div className="v">{req.address}</div></div>
              <div className="kv" style={{gridColumn:'1 / -1'}}><div className="k">Notes</div><div className="v" style={{fontWeight:400, lineHeight:1.6}}>{req.noteText || req.notes}</div></div>
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Solar proposal</h3>{!req.proposal && <button className="btn btn-outline btn-sm"><Icon name="upload" size={14}/>Upload proposal</button>}</div>
            {req.proposal ?
              <div className="row" style={{padding:14, border:'1px solid var(--border)', borderRadius:10}}>
                <div style={{width:40, height:48, background:'var(--accent)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)'}}><Icon name="file" size={20}/></div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, fontSize:13}}>{req.proposal.fileName}</div>
                  <div className="muted" style={{fontSize:12}}>PDF · {req.proposal.fileSize}</div>
                </div>
                <button className="btn btn-ghost btn-sm"><Icon name="download" size={14}/>Download</button>
                <button className="btn btn-ghost btn-sm"><Icon name="eye" size={14}/>Preview</button>
              </div>
              :
              <div className="muted" style={{padding:'30px 0', textAlign:'center', border:'1px dashed var(--border)', borderRadius:10}}>
                <Icon name="upload" size={22}/>
                <div style={{marginTop:8, fontSize:13}}>Drop a solar proposal PDF here or click to upload</div>
              </div>
            }
          </div>

          <div className="card">
            <div className="card-h"><h3>Activity</h3></div>
            <div style={{display:'flex', flexDirection:'column', gap:14, position:'relative'}}>
              {[
                { t:'Survey scheduled',  when:'2 days ago', who:'Jamie Reyes', icon:'calendar' },
                { t:'Tech assigned: '+req.tech.name, when:'2 days ago', who:'Auto-assignment', icon:'users' },
                req.proposal ? { t:'Proposal uploaded: '+req.proposal.fileName, when:'3 days ago', who:'CPM · '+(req.cpm?req.cpm.name:'Dispatcher'), icon:'file' } : null,
                { t:'Request created',   when:'4 days ago', who:'Customer portal', icon:'plus' },
              ].filter(Boolean).map((a,i) => (
                <div key={i} className="row">
                  <div style={{width:32, height:32, borderRadius:'50%', background:'var(--accent)', color:'var(--primary)', display:'flex',alignItems:'center', justifyContent:'center'}}><Icon name={a.icon} size={14}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, fontWeight:600}}>{a.t}</div>
                    <div className="muted" style={{fontSize:12}}>{a.who} · {a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Photos & files</h3><button className="btn btn-outline btn-sm"><Icon name="upload" size={14}/>Upload</button></div>
            {req.photos === 0 ?
              <div style={{padding:'30px 0', textAlign:'center'}} className="muted">No files yet</div>
              :
              <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10}}>
                {Array.from({length:req.photos}).map((_,i) => (
                  <div key={i} style={{aspectRatio:'1', background:'var(--muted)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Icon name="file" size={22}/>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div className="card-h"><h3>Assigned technician</h3></div>
            <div className="row" style={{gap:14}}>
              <div className="avatar-md" style={{width:54, height:54, fontSize:18}}>{req.tech.name.split(' ').map(n=>n[0]).join('')}</div>
              <div>
                <div style={{fontWeight:700}}>{req.tech.name}</div>
                <div className="muted" style={{fontSize:12}}>{req.tech.spec}</div>
                <div style={{color:'var(--warning)', fontSize:13, fontWeight:600}}>★ {req.tech.rating} · {req.tech.jobs} jobs</div>
              </div>
            </div>
            <div className="divider"/>
            <div className="row muted" style={{fontSize:13}}><Icon name="phone" size={14}/>{req.tech.phone}</div>
            <div className="row muted" style={{fontSize:13, marginTop:6}}><Icon name="mail" size={14}/>{req.tech.email}</div>
            <button className="btn btn-outline btn-sm" style={{marginTop:14, width:'100%'}}>Reassign technician</button>
          </div>

          {req.cpm && (
            <div className="card">
              <div className="card-h"><h3>Dispatched by (CPM)</h3></div>
              <div className="row" style={{gap:14}}>
                <div className="avatar-md">{req.cpm.name.split(' ').map(n=>n[0]).join('')}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700, fontSize:13}}>{req.cpm.name}</div>
                  <div className="muted" style={{fontSize:12}}>{req.cpm.role}</div>
                </div>
                {statusBadge(req.cpm.status)}
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-h"><h3>Status</h3></div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {STATUSES.map(s => (
                <div key={s} onClick={()=>{ if(s==='Cancelled'){setShowCancel(true);} else {onStatusChange(req,s); toast(`Status changed to "${s}"`);} }}
                  style={{padding:'9px 12px', border:'1px solid var(--border)', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', background: req.status===s?'var(--accent)':'transparent'}}>
                  <span style={{fontSize:13, fontWeight:500}}>{s}</span>
                  {req.status===s && <Icon name="check" size={14}/>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showCancel && (
        <div className="modal-bg" onClick={()=>setShowCancel(false)}>
          <div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}>
            <div className="modal-h">
              <h2 style={{fontSize:17}}>Cancel survey request</h2>
              <button className="icon-btn" onClick={()=>setShowCancel(false)}><Icon name="x"/></button>
            </div>
            <div className="modal-b">
              <div className="muted" style={{fontSize:13, marginBottom:14}}>This will notify the homeowner and technician. Please share a reason.</div>
              <div className="field">
                <label>Cancellation reason <span className="req">*</span></label>
                <select className="input" value={cancelReason} onChange={e=>setCancelReason(e.target.value)}>
                  <option value="">Select a reason…</option>
                  <option>Homeowner rescheduled</option>
                  <option>Weather conditions</option>
                  <option>Permitting delay</option>
                  <option>Technician unavailable</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>Additional notes</label>
                <textarea className="input" rows="3" placeholder="Optional context…"/>
              </div>
            </div>
            <div className="modal-f">
              <button className="btn btn-outline" onClick={()=>setShowCancel(false)}>Keep request</button>
              <button className="btn btn-danger" disabled={!cancelReason} onClick={()=>{ onStatusChange(req,'Cancelled'); req.cancellationReason = cancelReason; toast('Request cancelled'); setShowCancel(false);}}>Cancel request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- ADD REQUEST MODAL ---------- */
const AddRequestModal = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ client:'', address:'', service:SERVICES[0], date:'2025-11-20', time:'10:00', tech:'', priority:'Normal', notes:'' });
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-h">
          <div>
            <h2 style={{fontSize:18}}>New Survey Request</h2>
            <div className="muted" style={{fontSize:12, marginTop:2}}>Step {step} of 3</div>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x"/></button>
        </div>
        <div style={{padding:'0 24px', paddingTop:18}}>
          <div style={{display:'flex', gap:6, marginBottom:18}}>
            {[1,2,3].map(s => <div key={s} style={{flex:1, height:4, borderRadius:2, background: s<=step?'var(--primary)':'var(--muted)'}}/>)}
          </div>
        </div>

        <div className="modal-b">
          {step === 1 && (
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              <div className="field">
                <label>Client name <span className="req">*</span></label>
                <input className="input" value={form.client} onChange={e=>set('client', e.target.value)} placeholder="e.g. Robinson Residence"/>
              </div>
              <div className="field">
                <label>Service address <span className="req">*</span></label>
                <input className="input" value={form.address} onChange={e=>set('address', e.target.value)} placeholder="123 Main St, Austin, TX"/>
              </div>
              <div className="grid-2">
                <div className="field">
                  <label>Service type</label>
                  <select className="input" value={form.service} onChange={e=>set('service', e.target.value)}>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Priority</label>
                  <select className="input" value={form.priority} onChange={e=>set('priority', e.target.value)}>
                    {['Low','Normal','High'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              <div className="grid-2">
                <div className="field"><label>Date <span className="req">*</span></label><input className="input" type="date" value={form.date} onChange={e=>set('date', e.target.value)}/></div>
                <div className="field"><label>Time slot</label>
                  <select className="input" value={form.time} onChange={e=>set('time', e.target.value)}>
                    {['08:00','10:00','13:00','15:00'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Assign technician</label>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                  {TECHS.filter(t=>t.status==='Active').map(t => (
                    <div key={t.id} onClick={()=>set('tech', t.id)}
                      style={{padding:12, border:'1px solid var(--border)', borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center', gap:10, background: form.tech===t.id?'var(--accent)':'transparent', borderColor: form.tech===t.id?'var(--primary)':'var(--border)'}}>
                      <div className="avatar-md">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{t.name}</div>
                        <div className="muted" style={{fontSize:11}}>{t.spec} · ★ {t.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="banner info" style={{marginTop:6}}>
                <Icon name="sparkle" size={16}/>
                <div>Smart-assign suggests <strong>Marcus Chen</strong> based on proximity and availability.</div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              <div className="field">
                <label>Notes for technician</label>
                <textarea className="input" rows="4" value={form.notes} onChange={e=>set('notes', e.target.value)} placeholder="Gate codes, parking, customer preferences…"/>
              </div>
              <div className="card flat" style={{background:'var(--muted)'}}>
                <h4 style={{fontSize:13, marginBottom:10}}>Summary</h4>
                <div className="grid-2" style={{gap:10}}>
                  <div className="kv" style={{padding:'4px 0', borderBottom:0}}><div className="k">Client</div><div className="v">{form.client||'—'}</div></div>
                  <div className="kv" style={{padding:'4px 0', borderBottom:0}}><div className="k">Service</div><div className="v">{form.service}</div></div>
                  <div className="kv" style={{padding:'4px 0', borderBottom:0}}><div className="k">When</div><div className="v">{form.date} at {form.time}</div></div>
                  <div className="kv" style={{padding:'4px 0', borderBottom:0}}><div className="k">Tech</div><div className="v">{TECHS.find(t=>t.id===form.tech)?.name || 'Unassigned'}</div></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-f">
          {step > 1 && <button className="btn btn-ghost" onClick={()=>setStep(step-1)}><Icon name="chevleft" size={14}/>Back</button>}
          <span className="spacer"/>
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          {step < 3 ?
            <button className="btn btn-primary" onClick={()=>setStep(step+1)}>Continue<Icon name="chevright" size={14}/></button> :
            <button className="btn btn-primary" onClick={()=>onSave(form)}><Icon name="check" size={14}/>Create request</button>
          }
        </div>
      </div>
    </div>
  );
};

/* ---------- TECHNICIANS ---------- */
const TechList = ({ openTech }) => {
  const [layout, setLayout] = useState('grid');
  return (
    <div>
      <PageHead title="Technicians" sub={`${TECHS.length} team members`}
        right={<>
          <div className="seg">
            <button className={layout==='grid'?'active':''} onClick={()=>setLayout('grid')}><Icon name="grid" size={14}/></button>
            <button className={layout==='list'?'active':''} onClick={()=>setLayout('list')}><Icon name="list" size={14}/></button>
          </div>
          <button className="btn btn-primary"><Icon name="plus" size={14}/>Add technician</button>
        </>}
      />
      {layout === 'grid' ?
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14}}>
          {TECHS.map(t => (
            <div key={t.id} className="card" style={{cursor:'pointer'}} onClick={()=>openTech(t)}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className="avatar-md" style={{width:54, height:54, fontSize:18}}>{t.name.split(' ').map(n=>n[0]).join('')}</div>
                {statusBadge(t.status)}
              </div>
              <h3 style={{fontSize:16, marginTop:14}}>{t.name}</h3>
              <div className="muted" style={{fontSize:13}}>{t.spec}</div>
              <div className="divider"/>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12}} className="muted">
                <span><Icon name="pin" size={12}/> {t.city}</span>
                <span style={{color:'var(--warning)', fontWeight:600}}>★ {t.rating}</span>
              </div>
              <div style={{display:'flex', gap:14, marginTop:10, fontSize:12}} className="muted">
                <span><strong style={{color:'var(--foreground)'}}>{t.jobs}</strong> jobs</span>
                <span><strong style={{color:'var(--foreground)'}}>{Math.floor(t.jobs*0.85)}</strong> done</span>
              </div>
            </div>
          ))}
        </div>
        :
        <div className="card" style={{padding:0, overflow:'hidden'}}>
          <table className="tbl">
            <thead><tr><th>Name</th><th>Specialization</th><th>Region</th><th>Status</th><th>Jobs</th><th>Rating</th></tr></thead>
            <tbody>{TECHS.map(t => (
              <tr key={t.id} onClick={()=>openTech(t)}>
                <td style={{fontWeight:600}}><div className="row"><div className="avatar-sm">{t.name.split(' ').map(n=>n[0]).join('')}</div>{t.name}</div></td>
                <td>{t.spec}</td>
                <td className="muted">{t.city}</td>
                <td>{statusBadge(t.status)}</td>
                <td>{t.jobs}</td>
                <td style={{color:'var(--warning)', fontWeight:600}}>★ {t.rating}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      }
    </div>
  );
};

const TechDetail = ({ tech, onClose, openDetail }) => {
  const myJobs = REQUESTS.filter(r => r.tech.id === tech.id);
  return (
    <div>
      <PageHead title={tech.name} sub={`${tech.spec} · ${tech.city}`}
        right={<>
          <button className="btn btn-ghost" onClick={onClose}><Icon name="chevleft" size={14}/>Back</button>
          <button className="btn btn-outline"><Icon name="edit" size={14}/>Edit</button>
          <button className="btn btn-primary"><Icon name="calendar" size={14}/>View schedule</button>
        </>}
      />
      <div className="detail-grid">
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div className="stats" style={{marginBottom:0}}>
              <Stat label="Jobs total" value={tech.jobs} icon="clipboard"/>
              <Stat label="Completed" value={Math.floor(tech.jobs*0.85)} icon="check" iconColor="green"/>
              <Stat label="Rating" value={`★ ${tech.rating}`} icon="sparkle" iconColor="gold"/>
              <Stat label="On time" value="94%" icon="clock"/>
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Recent jobs</h3></div>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Client</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{myJobs.slice(0,8).map(r => (
                <tr key={r.id} onClick={()=>openDetail(r)}>
                  <td style={{fontWeight:700, color:'var(--primary)'}}>{r.id}</td>
                  <td style={{fontWeight:600}}>{r.client}</td>
                  <td className="muted">{r.service}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td className="muted">{r.date}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'10px 0'}}>
              <div className="avatar-md" style={{width:80, height:80, fontSize:24}}>{tech.name.split(' ').map(n=>n[0]).join('')}</div>
              <h3 style={{fontSize:18, marginTop:14}}>{tech.name}</h3>
              <div className="muted" style={{fontSize:13}}>{tech.spec}</div>
              <div style={{marginTop:10}}>{statusBadge(tech.status)}</div>
            </div>
            <div className="divider"/>
            <div className="kv"><div className="k">Phone</div><div className="v">{tech.phone}</div></div>
            <div className="kv"><div className="k">Email</div><div className="v">{tech.email}</div></div>
            <div className="kv"><div className="k">Region</div><div className="v">{tech.city}</div></div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Weekly availability</h3><button className="btn btn-ghost btn-sm"><Icon name="edit" size={12}/>Edit</button></div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((d,i) => {
                const isWork = i < 5;
                return (
                  <div key={d} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 10px', borderRadius:8, background: isWork?'var(--accent)':'var(--muted)'}}>
                    <span style={{fontWeight:600, fontSize:13, color: isWork?'var(--primary)':'var(--muted-foreground)'}}>{d}</span>
                    <span style={{fontSize:12, color: isWork?'var(--foreground)':'var(--muted-foreground)'}}>{isWork ? '09:00 – 17:00' : 'Unavailable'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-h"><h3>Service area</h3></div>
            <div className="kv"><div className="k">Base</div><div className="v">{tech.city}</div></div>
            <div className="kv" style={{borderBottom:0}}>
              <div className="k">Service radius</div>
              <div className="v">{DEFAULT_RADIUS} miles</div>
            </div>
            <div style={{position:'relative', height:120, marginTop:10, borderRadius:10, background:'linear-gradient(135deg, var(--accent), transparent)', border:'1px dashed var(--primary)', overflow:'hidden'}}>
              <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon name="pin" size={28}/>
              </div>
              <div style={{position:'absolute', bottom:8, left:10, fontSize:11, color:'var(--muted-foreground)'}}>250 mi radius</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- DISPATCHING COMPANIES (Clients) ---------- */
const ClientsList = ({ openClient }) => (
  <div>
    <PageHead title="Dispatching Companies" sub={`${CLIENTS.length} partner companies`}
      right={<button className="btn btn-primary"><Icon name="plus" size={14}/>Add Dispatching Co.</button>}
    />
    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <table className="tbl">
        <thead><tr><th>Company</th><th>Tier</th><th>Region</th><th>Dispatchers</th><th>Active jobs</th><th>Status</th></tr></thead>
        <tbody>{CLIENTS.map(c => (
          <tr key={c.id} onClick={()=>openClient(c)}>
            <td style={{fontWeight:600}}><div className="row"><div style={{width:36, height:36, borderRadius:8, background:'var(--accent)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13}}>{c.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>{c.name}</div></td>
            <td><span className="badge" style={{background:`${tierColors[c.tier]}22`, color: tierColors[c.tier]}}><Icon name="crown" size={10}/>{c.tier}</span></td>
            <td className="muted">{c.region}</td>
            <td>{c.contacts}</td>
            <td><strong>{c.activeJobs}</strong></td>
            <td>{statusBadge(c.status)}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

const ClientDetail = ({ client, onClose, openCpm }) => (
  <div>
    <PageHead title={client.name} sub={`${client.region} · ${client.tier} tier · ${client.contacts} dispatchers`}
      right={<>
        <button className="btn btn-ghost" onClick={onClose}><Icon name="chevleft" size={14}/>Back</button>
        <button className="btn btn-outline"><Icon name="edit" size={14}/>Edit</button>
        <button className="btn btn-primary"><Icon name="plus" size={14}/>Invite Dispatcher</button>
      </>}
    />
    <div className="stats">
      <Stat label="Active jobs" value={client.activeJobs} icon="clipboard"/>
      <Stat label="Total this year" value="184" icon="check" iconColor="green"/>
      <Stat label="Avg job value" value="$2,840" icon="creditcard" iconColor="gold"/>
      <Stat label="Dispatchers" value={client.contacts} icon="users"/>
    </div>
    <div className="card">
      <div className="card-h"><h3>Dispatchers (CPMs)</h3><button className="btn btn-outline btn-sm"><Icon name="mail" size={14}/>Invite Dispatcher</button></div>
      <table className="tbl">
        <thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th><th>Jobs</th><th></th></tr></thead>
        <tbody>{CPMS.map(p => (
          <tr key={p.id} onClick={()=>openCpm(p)}>
            <td style={{fontWeight:600}}><div className="row"><div className="avatar-sm">{p.name.split(' ').map(n=>n[0]).join('')}</div>{p.name}</div></td>
            <td className="muted">{p.role}</td>
            <td className="muted">{p.email}</td>
            <td>{statusBadge(p.status)}</td>
            <td>{p.jobs}</td>
            <td><Icon name="chevright" size={14}/></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

const CpmDetail = ({ cpm, onClose, toast, openDetail }) => {
  const myJobs = REQUESTS.filter(r => r.cpm && r.cpm.id === cpm.id).slice(0,6);
  return (
    <div>
      <PageHead title={cpm.name} sub={`Dispatcher · ${cpm.role}`}
        right={<>
          <button className="btn btn-ghost" onClick={onClose}><Icon name="chevleft" size={14}/>Back to Dispatchers</button>
          {cpm.status==='Invited' && <button className="btn btn-outline" onClick={()=>toast('Invite resent successfully')}><Icon name="mail" size={14}/>Resend Invite</button>}
          <button className="btn btn-primary"><Icon name="edit" size={14}/>Edit</button>
        </>}
      />
      {cpm.status==='Invited' && (
        <div className="banner info" style={{marginBottom:16}}>
          <Icon name="mail" size={16}/>
          <div><strong>Invitation pending.</strong> {cpm.name} hasn't accepted yet. Resend the invite or copy the link.</div>
        </div>
      )}
      <div className="detail-grid">
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div className="card-h"><h3>Dispatcher details</h3>{statusBadge(cpm.status)}</div>
            <div className="grid-2">
              <div className="kv"><div className="k">Full name</div><div className="v">{cpm.name}</div></div>
              <div className="kv"><div className="k">Role</div><div className="v">{cpm.role}</div></div>
              <div className="kv"><div className="k">Email</div><div className="v">{cpm.email}</div></div>
              <div className="kv"><div className="k">Phone</div><div className="v">{cpm.phone}</div></div>
              <div className="kv"><div className="k">Jobs dispatched</div><div className="v">{cpm.jobs}</div></div>
              <div className="kv"><div className="k">Status</div><div className="v">{statusBadge(cpm.status)}</div></div>
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Recent bookings dispatched</h3></div>
            {myJobs.length === 0 ?
              <div className="muted" style={{padding:'30px 0', textAlign:'center'}}>No bookings yet</div>
              :
              <table className="tbl">
                <thead><tr><th>ID</th><th>Homeowner</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>{myJobs.map(r => (
                  <tr key={r.id} onClick={()=>openDetail(r)}>
                    <td style={{fontWeight:700, color:'var(--primary)'}}>{r.id}</td>
                    <td style={{fontWeight:600}}>{r.homeownerName}</td>
                    <td className="muted">{r.service}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td className="muted">{r.date}</td>
                  </tr>
                ))}</tbody>
              </table>
            }
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          <div className="card">
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'10px 0'}}>
              <div className="avatar-md" style={{width:80, height:80, fontSize:24}}>{cpm.name.split(' ').map(n=>n[0]).join('')}</div>
              <h3 style={{fontSize:18, marginTop:14}}>{cpm.name}</h3>
              <div className="muted" style={{fontSize:13}}>{cpm.role}</div>
              <div style={{marginTop:10}}>{statusBadge(cpm.status)}</div>
            </div>
            <div className="divider"/>
            <div className="row muted" style={{fontSize:13}}><Icon name="mail" size={14}/>{cpm.email}</div>
            <div className="row muted" style={{fontSize:13, marginTop:6}}><Icon name="phone" size={14}/>{cpm.phone}</div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Actions</h3></div>
            {cpm.status==='Invited' && <button className="btn btn-outline btn-sm" style={{width:'100%', marginBottom:8}} onClick={()=>toast('Invite resent successfully')}><Icon name="mail" size={14}/>Resend invite</button>}
            {cpm.status==='Active' && <button className="btn btn-outline btn-sm" style={{width:'100%', marginBottom:8}}><Icon name="x" size={14}/>Deactivate</button>}
            {cpm.status==='Inactive' && <button className="btn btn-outline btn-sm" style={{width:'100%', marginBottom:8}}><Icon name="check" size={14}/>Reactivate</button>}
            <button className="btn btn-ghost btn-sm" style={{width:'100%', color:'var(--destructive)'}}><Icon name="trash" size={14}/>Remove dispatcher</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- TENANTS (Super Admin) ---------- */
const TenantsList = ({ openTenant }) => (
  <div>
    <PageHead title="Tenants" sub={`${TENANTS.length} organizations on the platform`}
      right={<button className="btn btn-primary"><Icon name="plus" size={14}/>Invite tenant</button>}
    />
    <div className="card" style={{padding:0, overflow:'hidden'}}>
      <table className="tbl">
        <thead><tr><th>Tenant</th><th>Plan</th><th>Users</th><th>Requests</th><th>Status</th><th>Joined</th></tr></thead>
        <tbody>{TENANTS.map(t => (
          <tr key={t.id} onClick={()=>openTenant(t)}>
            <td style={{fontWeight:600}}><div className="row"><div className="avatar-sm">{t.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>{t.name}</div></td>
            <td><span className="badge badge-pri">{t.plan}</span></td>
            <td>{t.users}</td>
            <td>{t.requests.toLocaleString()}</td>
            <td>{statusBadge(t.status)}</td>
            <td className="muted">{t.joined}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

const TenantDetail = ({ tenant, onClose }) => (
  <div>
    <PageHead title={tenant.name} sub={`${tenant.plan} plan · joined ${tenant.joined}`}
      right={<button className="btn btn-ghost" onClick={onClose}><Icon name="chevleft" size={14}/>Back</button>}
    />
    <div className="stats">
      <Stat label="Active users" value={tenant.users} icon="users"/>
      <Stat label="Total requests" value={tenant.requests.toLocaleString()} icon="clipboard" iconColor="gold"/>
      <Stat label="MRR" value={`$${(tenant.users*12).toLocaleString()}`} icon="creditcard" iconColor="green"/>
      <Stat label="Status" value={tenant.status} icon="check"/>
    </div>
    <div className="card">
      <div className="card-h"><h3>Recent activity</h3></div>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {[
          {t:'Plan upgraded to Pro', when:'4 days ago'},
          {t:'24 new survey requests created', when:'1 week ago'},
          {t:'2 technicians added', when:'2 weeks ago'},
          {t:'Invoice #INV-3091 paid', when:'1 month ago'},
        ].map((a,i) => (
          <div key={i} style={{padding:12, border:'1px solid var(--border)', borderRadius:8, display:'flex', justifyContent:'space-between'}}>
            <span style={{fontSize:13, fontWeight:500}}>{a.t}</span>
            <span className="muted" style={{fontSize:12}}>{a.when}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- PLAN MANAGEMENT / BILLING ---------- */
const Plans = () => (
  <div>
    <PageHead title="Plan Management" sub="Configure platform pricing tiers"/>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18}}>
      {PLANS.map(p => (
        <div key={p.name} className={`plan-card ${p.featured?'featured':''}`}>
          {p.featured && <div className="badge-feat">MOST POPULAR</div>}
          <h3 style={{fontSize:18}}>{p.name}</h3>
          <div className="muted" style={{fontSize:13, marginTop:6, minHeight:34}}>{p.desc}</div>
          <div style={{marginTop:18, display:'flex', alignItems:'baseline', gap:6}}>
            <span style={{fontSize:36, fontWeight:700, fontFamily:'var(--font-primary)', letterSpacing:'-0.02em'}}>${p.price}</span>
            <span className="muted" style={{fontSize:13}}>/month</span>
          </div>
          <div className="divider"/>
          <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10}}>
            {p.feats.map(f => <li key={f} style={{display:'flex', gap:10, fontSize:13}}><Icon name="check" size={14}/>{f}</li>)}
          </ul>
          <button className={`btn ${p.featured?'btn-primary':'btn-outline'}`} style={{marginTop:18, width:'100%'}}>{p.featured?'Set as default':'Edit plan'}</button>
        </div>
      ))}
    </div>
  </div>
);

const PlanUsage = () => (
  <div>
    <PageHead title="Plan & Billing" sub="Your CrewLink Pro subscription"/>
    <div style={{display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:18}}>
      <div className="card">
        <div className="card-h">
          <div>
            <h3>Pro plan</h3>
            <div className="muted" style={{fontSize:12, marginTop:2}}>Renews November 28, 2025</div>
          </div>
          <button className="btn btn-outline btn-sm">Change plan</button>
        </div>
        <div className="divider"/>
        <div style={{display:'flex', flexDirection:'column', gap:18}}>
          {[
            {name:'Team members', used:32, total:50, unit:'seats'},
            {name:'Survey requests', used:412, total:1000, unit:'this month'},
            {name:'File storage', used:8.2, total:25, unit:'GB'},
            {name:'API calls', used:14820, total:50000, unit:'this month'},
          ].map(u => (
            <div key={u.name}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
                <span style={{fontWeight:500, fontSize:13}}>{u.name}</span>
                <span className="muted" style={{fontSize:12}}>{u.used.toLocaleString()} / {u.total.toLocaleString()} {u.unit}</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{width:`${(u.used/u.total*100).toFixed(1)}%`, background: u.used/u.total > 0.85 ? 'var(--warning)':'var(--primary)'}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Payment method</h3><button className="btn btn-ghost btn-sm"><Icon name="edit" size={12}/>Update</button></div>
        <div style={{padding:18, background:'linear-gradient(135deg, #1a1a1a, #007bff)', borderRadius:12, color:'#fff', minHeight:140, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div style={{fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', opacity:.8}}>Visa</div>
            <Icon name="creditcard" size={20}/>
          </div>
          <div>
            <div style={{fontFamily:'monospace', fontSize:18, letterSpacing:'.1em'}}>•••• •••• •••• 4821</div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, opacity:.85}}>
              <span>JAMIE REYES</span>
              <span>09/27</span>
            </div>
          </div>
        </div>
        <div className="divider"/>
        <div className="kv"><div className="k">Next charge</div><div className="v">$149.00 on Nov 28</div></div>
        <div className="kv"><div className="k">Billing email</div><div className="v">finance@sunpath.io</div></div>
      </div>
    </div>

    <div className="card" style={{marginTop:18}}>
      <div className="card-h"><h3>Recent invoices</h3><button className="btn btn-ghost btn-sm">View all</button></div>
      <table className="tbl">
        <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>{[
          {id:'INV-3091', date:'Oct 28, 2025', amt:'$149.00', status:'Completed'},
          {id:'INV-3022', date:'Sep 28, 2025', amt:'$149.00', status:'Completed'},
          {id:'INV-2954', date:'Aug 28, 2025', amt:'$149.00', status:'Completed'},
          {id:'INV-2887', date:'Jul 28, 2025', amt:'$149.00', status:'Completed'},
        ].map(i => (
          <tr key={i.id}><td style={{fontWeight:700}}>{i.id}</td><td className="muted">{i.date}</td><td style={{fontWeight:600}}>{i.amt}</td><td>{statusBadge(i.status)}</td><td><Icon name="download" size={14}/></td></tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);

/* ---------- SETTINGS ---------- */
const Settings = ({ theme, setTheme }) => {
  const [tab, setTab] = useState('profile');
  const [notifs, setNotifs] = useState({ email:true, sms:true, push:false, weekly:true });
  return (
    <div>
      <PageHead title="Settings" sub="Manage your account and preferences"/>
      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:18}}>
        <div className="card" style={{padding:8}}>
          {[
            {k:'profile', l:'Profile', i:'users'},
            {k:'notifs', l:'Notifications', i:'bell'},
            {k:'team', l:'Team', i:'users'},
            {k:'integ', l:'Integrations', i:'bolt'},
            {k:'theme', l:'Appearance', i:'sun'},
            {k:'security', l:'Security', i:'check'},
          ].map(s => (
            <div key={s.k} className={`sb-item ${tab===s.k?'active':''}`} onClick={()=>setTab(s.k)} style={{margin:0}}>
              <Icon name={s.i}/>{s.l}
            </div>
          ))}
        </div>

        <div className="card">
          {tab === 'profile' && (
            <div>
              <h3 style={{marginBottom:14}}>Profile</h3>
              <div className="grid-2">
                <div className="field"><label>Full name</label><input className="input" defaultValue="Jamie Reyes"/></div>
                <div className="field"><label>Title</label><input className="input" defaultValue="Operations Lead"/></div>
                <div className="field"><label>Email</label><input className="input" defaultValue="jamie@sunpath.io"/></div>
                <div className="field"><label>Phone</label><input className="input" defaultValue="(512) 555-0192"/></div>
                <div className="field"><label>Time zone</label>
                  <select className="input" defaultValue="CT">
                    <option>Central Time (CT)</option><option>Eastern Time (ET)</option><option>Pacific Time (PT)</option>
                  </select>
                </div>
                <div className="field"><label>Language</label><select className="input"><option>English (US)</option><option>Español</option></select></div>
              </div>
              <div className="modal-f" style={{marginTop:18, padding:'14px 0 0', borderTop:'1px solid var(--border)'}}>
                <button className="btn btn-outline">Discard</button>
                <button className="btn btn-primary"><Icon name="check" size={14}/>Save changes</button>
              </div>
            </div>
          )}
          {tab === 'notifs' && (
            <div>
              <h3 style={{marginBottom:14}}>Notification preferences</h3>
              {[
                {k:'email', l:'Email notifications', d:'Receive job assignments and status updates by email'},
                {k:'sms', l:'SMS notifications', d:'Get critical updates via text'},
                {k:'push', l:'Push notifications', d:'Real-time alerts in the mobile app'},
                {k:'weekly', l:'Weekly summary', d:'Weekly performance recap every Monday'},
              ].map(n => (
                <div key={n.k} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:'1px solid var(--border)'}}>
                  <div>
                    <div style={{fontWeight:600, fontSize:14}}>{n.l}</div>
                    <div className="muted" style={{fontSize:12}}>{n.d}</div>
                  </div>
                  <Toggle on={notifs[n.k]} onChange={v=>setNotifs(s=>({...s,[n.k]:v}))}/>
                </div>
              ))}
            </div>
          )}
          {tab === 'theme' && (
            <div>
              <h3 style={{marginBottom:14}}>Appearance</h3>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14}}>
                {['light','dark'].map(t => (
                  <div key={t} onClick={()=>setTheme(t)} style={{padding:18, border:`2px solid ${theme===t?'var(--primary)':'var(--border)'}`, borderRadius:12, cursor:'pointer'}}>
                    <div style={{height:80, borderRadius:8, background: t==='dark'?'#181818':'#f4f7fb', border:'1px solid var(--border)', display:'flex'}}>
                      <div style={{width:30, background: t==='dark'?'#0f0f0f':'#fff', borderRight:'1px solid '+(t==='dark'?'#27272a':'#e2e8f0')}}/>
                      <div style={{flex:1, padding:8}}>
                        <div style={{height:8, width:'60%', background:'var(--primary)', borderRadius:2, marginBottom:5}}/>
                        <div style={{height:6, width:'40%', background: t==='dark'?'#27272a':'#e2e8f0', borderRadius:2}}/>
                      </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                      <span style={{fontWeight:600, textTransform:'capitalize'}}>{t}</span>
                      {theme===t && <Icon name="check" size={16}/>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab !== 'profile' && tab !== 'notifs' && tab !== 'theme' && (
            <div style={{padding:'40px 0', textAlign:'center'}} className="muted">
              <Icon name="settings" size={32}/>
              <div style={{marginTop:14, fontSize:14}}>This section is part of the prototype shell.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Toggle = ({ on, onChange }) => (
  <div onClick={()=>onChange(!on)} style={{width:42, height:24, borderRadius:999, background: on?'var(--primary)':'var(--muted)', position:'relative', cursor:'pointer', transition:'.15s'}}>
    <div style={{position:'absolute', top:2, left: on?20:2, width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 3px rgba(0,0,0,0.2)', transition:'.15s'}}/>
  </div>
);

/* ---------- Tenant Services ---------- */
const TenantServices = () => (
  <div>
    <PageHead title="Services" sub="Manage the service catalog offered to your dispatchers"
      right={<button className="btn btn-primary"><Icon name="plus" size={14}/>New service</button>}
    />
    <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14}}>
      {[
        {n:'Roof Survey',       d:'Standard 90-min residential roof inspection', dur:'90 min', price:'$185'},
        {n:'Solar PV Install',  d:'Full-day photovoltaic installation', dur:'8 hours', price:'$2,400'},
        {n:'Battery Storage',   d:'Tesla Powerwall / Enphase battery setup', dur:'6 hours', price:'$1,650'},
        {n:'Annual Inspection', d:'Yearly maintenance and performance check', dur:'45 min', price:'$95'},
        {n:'Permit Walk',       d:'Pre-installation permit and code review', dur:'60 min', price:'$120'},
        {n:'Drone Roof Scan',   d:'Aerial imaging and shading analysis', dur:'30 min', price:'$140'},
      ].map(s => (
        <div key={s.n} className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div>
              <h3 style={{fontSize:15}}>{s.n}</h3>
              <div className="muted" style={{fontSize:12, marginTop:4}}>{s.d}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:18, fontWeight:700}}>{s.price}</div>
              <div className="muted" style={{fontSize:11}}>{s.dur}</div>
            </div>
          </div>
          <div className="divider"/>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-outline btn-sm" style={{flex:1}}><Icon name="edit" size={12}/>Edit</button>
            <button className="btn btn-ghost btn-sm"><Icon name="dots" size={14}/></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Auth screens ---------- */
const AuthShell = ({ children }) => (
  <div style={{minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', background:'var(--background)'}}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:40}}>
      <div style={{width:'100%', maxWidth:400}}>
        <div className="row" style={{marginBottom:32}}>
          <div className="brand-mark"><Icon name="bolt" size={18}/></div>
          <div style={{fontWeight:700, fontSize:18, fontFamily:'var(--font-primary)'}}>CrewLink</div>
        </div>
        {children}
        <div className="muted" style={{fontSize:12, marginTop:40, textAlign:'center'}}>
          Need help? <a style={{color:'var(--primary)'}}>support@crewlink.com</a>
        </div>
      </div>
    </div>
    <div style={{background:'linear-gradient(135deg, var(--primary), var(--primary-2))', display:'flex', alignItems:'center', justifyContent:'center', padding:40, position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', inset:0, opacity:0.1, backgroundImage:'radial-gradient(circle at 30% 20%, white 0%, transparent 40%), radial-gradient(circle at 70% 80%, white 0%, transparent 40%)'}}/>
      <div style={{color:'white', maxWidth:420, position:'relative', zIndex:1}}>
        <div style={{fontSize:13, fontWeight:600, opacity:0.85, letterSpacing:0.5, textTransform:'uppercase', marginBottom:18}}>Solar survey scheduling</div>
        <div style={{fontSize:34, fontWeight:700, lineHeight:1.15, marginBottom:18}}>Dispatch every survey, on time, with the right tech.</div>
        <div style={{fontSize:15, opacity:0.92, lineHeight:1.6}}>Route to the closest qualified technician, share progress with dispatching companies, and close the loop with homeowners — all from one workspace.</div>
        <div style={{display:'flex', gap:24, marginTop:36}}>
          {[{n:'1,200+', l:'Surveys / week'},{n:'98.4%', l:'On-time rate'},{n:'34 min', l:'Median dispatch'}].map(s=>(
            <div key={s.l}><div style={{fontSize:22, fontWeight:700}}>{s.n}</div><div style={{fontSize:12, opacity:0.85}}>{s.l}</div></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SignIn = ({ onSignIn, goForgot }) => {
  const [email, setEmail] = useState('jamie@sunpoint.co');
  const [pwd, setPwd] = useState('demo1234');
  const [show, setShow] = useState(false);
  return (
    <AuthShell>
      <h1 style={{fontSize:26, marginBottom:8}}>Welcome back</h1>
      <div className="muted" style={{fontSize:14, marginBottom:28}}>Sign in to your CrewLink workspace.</div>
      <form onSubmit={e=>{e.preventDefault(); onSignIn(email);}} style={{display:'flex', flexDirection:'column', gap:14}}>
        <div className="field">
          <label>Work email <span className="req">*</span></label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required/>
        </div>
        <div className="field">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <label>Password <span className="req">*</span></label>
            <a onClick={goForgot} style={{fontSize:12, color:'var(--primary)', cursor:'pointer', fontWeight:600}}>Forgot?</a>
          </div>
          <div style={{position:'relative'}}>
            <input className="input" type={show?'text':'password'} value={pwd} onChange={e=>setPwd(e.target.value)} required/>
            <button type="button" onClick={()=>setShow(s=>!s)} style={{position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:0, cursor:'pointer', color:'var(--muted-foreground)'}}><Icon name="eye" size={16}/></button>
          </div>
        </div>
        <label className="row" style={{fontSize:13, color:'var(--muted-foreground)', cursor:'pointer'}}>
          <input type="checkbox" defaultChecked/> Keep me signed in for 30 days
        </label>
        <button className="btn btn-primary" type="submit" style={{padding:'12px', fontSize:14}}>Sign in <Icon name="chevright" size={14}/></button>
      </form>
      <div className="divider" style={{margin:'22px 0'}}/>
      <div className="muted" style={{fontSize:13, textAlign:'center'}}>Sign-ups are by invitation. Contact your admin to get access.</div>
    </AuthShell>
  );
};

const ForgotPassword = ({ goBack, onDone }) => {
  const [step, setStep] = useState('REQUEST');
  const [email, setEmail] = useState('');
  return (
    <AuthShell>
      <a onClick={goBack} className="row" style={{fontSize:13, color:'var(--muted-foreground)', cursor:'pointer', marginBottom:18}}>
        <Icon name="chevleft" size={14}/>Back to sign in
      </a>
      {step==='REQUEST' && <>
        <h1 style={{fontSize:26, marginBottom:8}}>Reset password</h1>
        <div className="muted" style={{fontSize:14, marginBottom:28}}>Enter the email on your account and we'll send you a 6-digit verification code.</div>
        <div className="field"><label>Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></div>
        <button className="btn btn-primary" style={{marginTop:14, padding:'12px', width:'100%'}} onClick={()=>setStep('CONFIRM_RESET_PASSWORD_WITH_CODE')} disabled={!email}>Send code</button>
      </>}
      {step==='CONFIRM_RESET_PASSWORD_WITH_CODE' && <>
        <h1 style={{fontSize:26, marginBottom:8}}>Check your email</h1>
        <div className="muted" style={{fontSize:14, marginBottom:28}}>We sent a 6-digit code to <strong style={{color:'var(--foreground)'}}>{email}</strong>. Enter it below along with your new password.</div>
        <div className="field"><label>Verification code</label>
          <div style={{display:'flex', gap:8}}>
            {Array.from({length:6}).map((_,i)=>(
              <input key={i} className="input" maxLength="1" style={{textAlign:'center', fontSize:18, fontWeight:600, padding:'12px 0'}} defaultValue={['4','2','1','9','3','7'][i]}/>
            ))}
          </div>
        </div>
        <div className="field" style={{marginTop:14}}><label>New password</label><input className="input" type="password" placeholder="At least 8 characters"/></div>
        <div className="field" style={{marginTop:14}}><label>Confirm new password</label><input className="input" type="password"/></div>
        <button className="btn btn-primary" style={{marginTop:18, padding:'12px', width:'100%'}} onClick={()=>setStep('DONE')}>Reset password</button>
        <div className="muted" style={{fontSize:12, textAlign:'center', marginTop:14}}>Didn't get a code? <a style={{color:'var(--primary)', cursor:'pointer'}}>Resend</a></div>
      </>}
      {step==='DONE' && <>
        <div style={{width:60, height:60, borderRadius:'50%', background:'oklch(0.94 0.07 150)', color:'var(--success)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:22}}><Icon name="check" size={28}/></div>
        <h1 style={{fontSize:26, marginBottom:8}}>Password updated</h1>
        <div className="muted" style={{fontSize:14, marginBottom:28}}>You can now sign in with your new password.</div>
        <button className="btn btn-primary" style={{padding:'12px', width:'100%'}} onClick={onDone}>Back to sign in</button>
      </>}
    </AuthShell>
  );
};

/* ---------- Payment / 404 ---------- */
const PaymentResult = ({ kind, goHome, goBilling }) => {
  const ok = kind==='success';
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:40, background:'var(--background)'}}>
      <div className="card" style={{maxWidth:480, width:'100%', textAlign:'center', padding:40}}>
        <div style={{width:72, height:72, borderRadius:'50%', background: ok?'oklch(0.94 0.07 150)':'oklch(0.94 0.07 30)', color: ok?'var(--success)':'var(--destructive)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 22px'}}>
          <Icon name={ok?'check':'x'} size={32}/>
        </div>
        <h1 style={{fontSize:24, marginBottom:10}}>{ok ? 'Payment successful' : 'Payment cancelled'}</h1>
        <div className="muted" style={{fontSize:14, marginBottom:28, lineHeight:1.6}}>
          {ok
            ? "Your CrewLink Pro subscription is active. You'll receive a receipt by email shortly."
            : "No charges were made. You can try again any time from your billing page."}
        </div>
        {ok && (
          <div style={{background:'var(--muted)', borderRadius:10, padding:16, marginBottom:22, textAlign:'left'}}>
            <div className="row" style={{justifyContent:'space-between', fontSize:13}}><span className="muted">Plan</span><strong>CrewLink Pro · Monthly</strong></div>
            <div className="row" style={{justifyContent:'space-between', fontSize:13, marginTop:8}}><span className="muted">Amount</span><strong>$249.00</strong></div>
            <div className="row" style={{justifyContent:'space-between', fontSize:13, marginTop:8}}><span className="muted">Next charge</span><strong>Nov 22, 2025</strong></div>
          </div>
        )}
        <div style={{display:'flex', gap:10}}>
          <button className="btn btn-outline" style={{flex:1}} onClick={goBilling}>View billing</button>
          <button className="btn btn-primary" style={{flex:1}} onClick={goHome}>Go to dashboard</button>
        </div>
      </div>
    </div>
  );
};

const NotFound = ({ goHome }) => (
  <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:40, background:'var(--background)'}}>
    <div style={{maxWidth:520, textAlign:'center'}}>
      <div style={{fontSize:120, fontWeight:800, lineHeight:1, background:'linear-gradient(135deg, var(--primary), var(--primary-2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:14}}>404</div>
      <h1 style={{fontSize:26, marginBottom:10}}>Page not found</h1>
      <div className="muted" style={{fontSize:14, marginBottom:28, lineHeight:1.6}}>The page you're looking for has been moved, renamed, or doesn't exist. Let's get you back on track.</div>
      <button className="btn btn-primary" onClick={goHome} style={{padding:'12px 28px'}}><Icon name="home" size={14}/>Back to dashboard</button>
    </div>
  </div>
);

/* ---------- ROOT APP ---------- */
function App() {
  const [theme, setTheme] = useState('light');
  const [role, setRole] = useState(ROLES[1]); // Admin default
  const [view, setView] = useState('app'); // app | signin | forgot | pay_ok | pay_cancel | notfound
  const [route, setRoute] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null); // request detail
  const [techDetail, setTechDetail] = useState(null);
  const [clientDetail, setClientDetail] = useState(null);
  const [cpmDetail, setCpmDetail] = useState(null);
  const [tenantDetail, setTenantDetail] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState(null);
  const [reqOverrides, setReqOverrides] = useState({});

  useEffect(() => {
    document.body.classList.toggle('dark', theme==='dark');
  }, [theme]);

  // reset child views on route change
  useEffect(() => { setDetail(null); setTechDetail(null); setClientDetail(null); setCpmDetail(null); setTenantDetail(null); }, [route]);

  // also reset to allowed nav when role changes
  useEffect(() => {
    if (!NAV_BY_ROLE[role.key].includes(route)) setRoute('home');
  }, [role]);

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(null), 2400); };

  const onStatusChange = (req, status) => {
    setReqOverrides(o => ({...o, [req.id]: status}));
    setDetail(d => d ? {...d, status} : d);
  };

  const go = (r) => setRoute(r);

  // override status from local edits
  const reqsView = REQUESTS.map(r => reqOverrides[r.id] ? {...r, status: reqOverrides[r.id]} : r);

  // page render
  let content = null;
  if (detail) content = <RequestDetail req={detail} onClose={()=>setDetail(null)} onStatusChange={onStatusChange} toast={showToast}/>;
  else if (cpmDetail) content = <CpmDetail cpm={cpmDetail} onClose={()=>setCpmDetail(null)} toast={showToast} openDetail={setDetail}/>;
  else if (techDetail) content = <TechDetail tech={techDetail} onClose={()=>setTechDetail(null)} openDetail={setDetail}/>;
  else if (clientDetail) content = <ClientDetail client={clientDetail} onClose={()=>setClientDetail(null)} openCpm={p=>{setCpmDetail(p);}}/>;
  else if (tenantDetail) content = <TenantDetail tenant={tenantDetail} onClose={()=>setTenantDetail(null)}/>;
  else if (route === 'home') content = <HomeDashboard role={role} go={go}/>;
  else if (route === 'calendar') content = <Calendar go={go} openDetail={setDetail}/>;
  else if (route === 'requests' || route === 'my_requests') content = <RequestsList openDetail={setDetail} openAdd={()=>setShowAdd(true)} query={query}/>;
  else if (route === 'technicians') content = <TechList openTech={setTechDetail}/>;
  else if (route === 'clients') content = <ClientsList openClient={setClientDetail}/>;
  else if (route === 'tenants') content = <TenantsList openTenant={setTenantDetail}/>;
  else if (route === 'plans') content = <Plans/>;
  else if (route === 'plan_usage') content = <PlanUsage/>;
  else if (route === 'tenant_services') content = <TenantServices/>;
  else if (route === 'settings') content = <Settings theme={theme} setTheme={setTheme}/>;

  if (view === 'signin')     return <SignIn onSignIn={()=>setView('app')} goForgot={()=>setView('forgot')}/>;
  if (view === 'forgot')     return <ForgotPassword goBack={()=>setView('signin')} onDone={()=>setView('signin')}/>;
  if (view === 'pay_ok')     return <PaymentResult kind="success" goHome={()=>{setView('app'); setRoute('home');}} goBilling={()=>{setView('app'); setRoute('plan_usage');}}/>;
  if (view === 'pay_cancel') return <PaymentResult kind="cancel" goHome={()=>{setView('app'); setRoute('home');}} goBilling={()=>{setView('app'); setRoute('plan_usage');}}/>;
  if (view === 'notfound')   return <NotFound goHome={()=>{setView('app'); setRoute('home');}}/>;

  return (
    <div className="app" data-screen-label={NAV_DEFS[route]?.label || 'CrewLink'}>
      <Sidebar role={role} route={route} setRoute={setRoute} collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div style={{display:'flex', flexDirection:'column', minWidth:0}}>
        <Header role={role} setRole={setRole} theme={theme} setTheme={setTheme} onAdd={()=>setShowAdd(true)} onSearch={setQuery} query={query} onSignOut={()=>setView('signin')} setView={setView}/>
        <main className="main">{content}</main>
      </div>
      {showAdd && <AddRequestModal onClose={()=>setShowAdd(false)} onSave={(f)=>{setShowAdd(false); showToast('Survey request created');}}/>}
      {toast && <div className="toast"><Icon name="check" size={16}/>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
