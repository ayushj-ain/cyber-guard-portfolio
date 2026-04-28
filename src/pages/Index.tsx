import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/Cursor";
import { MatrixRain } from "@/components/MatrixRain";
import { CyberScene } from "@/components/CyberScene";

const NAV_LINKS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certifications" },
  { id: "career", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

const PROJECTS = [
  {
    num: "01",
    year: "2024",
    title: "SOC Monitoring & Alert Triage Lab",
    desc: "End-to-end SOC simulation built on Splunk + ELK Stack. Investigated 50+ enterprise-grade security alerts achieving a 95% accurate triage rate. Correlated logs across network, endpoint, and cloud telemetry to detect 10 distinct attack patterns including spear phishing, credential brute-force, lateral movement, and DNS exfiltration. Authored runbooks aligned to NIST SP 800-61 with severity scoring and escalation matrices.",
    tags: [
      { label: "SIEM", v: "" },
      { label: "Splunk", v: "" },
      { label: "ELK Stack", v: "" },
      { label: "NIST 800-61", v: "v" },
    ],
    metrics: [
      "95% triage accuracy across 50+ alerts",
      "10 distinct attack patterns documented",
      "Runbooks reduced analyst escalation by 30%",
    ],
  },
  {
    num: "02",
    year: "2024",
    title: "Ethical Hacking — SQL Injection Assessment Pipeline",
    desc: "Performed manual + automated SQLi testing (ethical hacking engagement) on 3 deliberately vulnerable web apps using Burp Suite Pro and custom Python tooling. Built a CI-friendly Python detector that hooks into a monitoring pipeline, surfacing 8 critical injection points (UNION, blind boolean, time-based) and slashing MTTD by 30%. Findings mapped to OWASP Top 10 A03:2021 with full remediation guidance.",
    tags: [
      { label: "Ethical Hacking", v: "r" },
      { label: "Burp Suite", v: "" },
      { label: "Python", v: "" },
      { label: "OWASP", v: "" },
    ],
    metrics: [
      "8 critical injection points discovered",
      "30% reduction in mean-time-to-detect",
      "Custom Python detector with CI integration",
    ],
  },
  {
    num: "03",
    year: "2023",
    title: "Threat Intelligence & Ransomware IR Simulation",
    desc: "Architected and executed a full-kill-chain ransomware incident response playbook covering all 6 NIST IR phases (Prep → Lessons Learned). Parsed 5,000+ firewall and Snort IDS log entries with Bash + Python scripts to extract IOCs, build a MITRE ATT&CK mapping (T1486, T1027, T1059), and produce an executive after-action report. Investigation cycle time cut by 40%.",
    tags: [
      { label: "Ransomware IR", v: "r" },
      { label: "MITRE ATT&CK", v: "" },
      { label: "Bash", v: "" },
      { label: "IDS/IPS", v: "" },
    ],
    metrics: [
      "All 6 NIST IR phases executed end-to-end",
      "5,000+ log entries parsed for IOCs",
      "40% faster investigation cycle time",
    ],
  },
  {
    num: "04",
    year: "2025",
    title: "HackZero'26 CTF — Web & Crypto Challenge Solver",
    desc: "Competed in the HackZero'26 Capture The Flag tournament across Web, Crypto, Forensics, and Reverse Engineering categories. Solved 12 challenges including JWT token forgery, blind XSS exploitation, RSA weak-key recovery, and PCAP forensics. Documented every exploit chain with reproducible payloads and writeups published to GitHub for the security community.",
    tags: [
      { label: "CTF", v: "r" },
      { label: "Web Exploitation", v: "" },
      { label: "Cryptography", v: "" },
      { label: "Forensics", v: "v" },
    ],
    metrics: [
      "12 challenges solved across 4 categories",
      "Reproducible exploit writeups on GitHub",
      "JWT, RSA, XSS & PCAP exploit chains",
    ],
  },
  {
    num: "05",
    year: "2025",
    title: "Phishing Email Analyzer & Threat Triage Tool",
    desc: "Built a Python-based phishing email forensic analyzer that parses raw .eml files, extracts SPF/DKIM/DMARC verdicts, decodes obfuscated URLs, performs WHOIS + VirusTotal IOC lookups, and outputs a SOC-ready triage report in JSON. Reduced analyst time-per-email from 8 minutes to under 90 seconds across a 200-email test corpus.",
    tags: [
      { label: "Phishing", v: "r" },
      { label: "Python", v: "" },
      { label: "Threat Intel", v: "" },
      { label: "Automation", v: "v" },
    ],
    metrics: [
      "200-email test corpus, 92% true-positive rate",
      "Time-per-email cut from 8 min → 90 sec",
      "SPF / DKIM / DMARC + VirusTotal integration",
    ],
  },
  {
    num: "06",
    year: "2025",
    title: "Network Traffic Anomaly Detector (Wireshark + Python)",
    desc: "Engineered a network anomaly detection toolkit that ingests live PCAP captures via Scapy + tshark, baselines normal traffic with statistical profiling, and flags suspicious indicators: port scans, DNS tunneling, beaconing C2 traffic, and ARP spoofing. Tested against 6 simulated attack scenarios in an isolated lab with a custom dashboard for visualization.",
    tags: [
      { label: "Network Security", v: "r" },
      { label: "Wireshark", v: "" },
      { label: "Scapy", v: "" },
      { label: "Anomaly Detection", v: "v" },
    ],
    metrics: [
      "6 attack scenarios validated end-to-end",
      "Live PCAP ingestion via Scapy + tshark",
      "Detects C2 beaconing, scans, DNS tunneling",
    ],
  },
];

const SKILLS = [
  {
    label: "SOC & Defensive Ops",
    chips: ["SIEM", "Splunk", "ELK Stack", "Alert Triage", "Log Analysis", "Threat Hunting", "Incident Response", "IOC Investigation"],
  },
  {
    label: "Ethical Hacking & Offense",
    chips: ["Ethical Hacking", "Penetration Testing", "VAPT", "Burp Suite", "Metasploit", "Nmap", "OWASP Top 10", "Recon", "CTF Player"],
  },
  {
    label: "Network & Forensics",
    chips: ["Wireshark", "Scapy", "tshark", "PCAP Analysis", "TCP/IP", "DNS / HTTP", "Firewall Rules", "IDS / IPS"],
  },
  {
    label: "Frameworks & Standards",
    chips: ["NIST CSF", "ISO 27001", "MITRE ATT&CK", "CIS Controls", "NIST SP 800-61", "Cyber Kill Chain"],
  },
  {
    label: "Scripting & Tooling",
    chips: ["Python", "Bash", "Shell Scripting", "SQL", "Linux / Unix", "Git", "GitHub", "Splunk SPL"],
  },
  {
    label: "Soft Skills",
    chips: ["Incident Documentation", "Threat Reporting", "Stakeholder Comms", "Analytical Thinking", "Crisis Response"],
  },
];

const CERTS = [
  {
    icon: "🛡",
    name: "EC-Council Certified SOC Analyst (CSA)",
    body: "Validated tier-1 SOC operations expertise: alert triage, log correlation, escalation procedures, and 40+ real-world attack scenario simulations.",
    badge: "EC-Council",
    href: undefined as string | undefined,
  },
  {
    icon: "🚩",
    name: "HackZero'26 CTF — Certificate of Participation",
    body: "Competed in HackZero'26 Capture The Flag, solving challenges across Web Exploitation, Cryptography, Forensics, and Reverse Engineering with full writeups.",
    badge: "HackZero'26",
    href: undefined as string | undefined,
  },
  {
    icon: "🎯",
    name: "Social Engineering Defence Certified",
    body: "Trained in identifying and defending against social engineering vectors: phishing, vishing, pretexting, baiting, and impersonation. Awareness program completion.",
    badge: "SE Defence",
    href: undefined as string | undefined,
  },
  {
    icon: "🔎",
    name: "Deloitte Australia Cyber Job Simulation",
    body: "Completed Deloitte's simulated consulting engagement: threat intelligence analysis, security risk reporting, and structured client advisory documentation.",
    badge: "Deloitte",
    href: undefined as string | undefined,
  },
  {
    icon: "🐙",
    name: "GitHub — Open Security Tooling",
    body: "Active on GitHub publishing detection scripts, IR playbooks, phishing analyzers, and CTF writeups. Hands-on contributor to defensive security tooling.",
    badge: "View GitHub →",
    href: "https://github.com/Ayushjain1030",
  },
  {
    icon: "🎓",
    name: "MCA — Cyber / Electronic Operations & Warfare",
    body: "Pursuing Master of Computer Applications at Poornima University with specialization in offensive and defensive cybersecurity, electronic warfare, and threat ops.",
    badge: "Poornima Univ.",
    href: undefined as string | undefined,
  },
];

const SLIDES = [
  { bg: "CYBER" },
  { bg: "TOP 5%" },
  { bg: "DEFENSE" },
  { bg: "HIRE ME" },
];

const Index = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll-driven slide activation
  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const wh = window.innerHeight;
      const totalScroll = wrapper.offsetHeight - wh;
      const scrolled = -rect.top;
      if (scrolled < 0 || scrolled > totalScroll) return;
      const progress = scrolled / totalScroll;
      const idx = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length));
      setCurrentSlide(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goToSlide = (idx: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const wh = window.innerHeight;
    const totalScroll = wrapper.offsetHeight - wh;
    const target = window.scrollY + rect.top + totalScroll * (idx / SLIDES.length);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="bg-void min-h-screen relative">
      <Cursor />
      <MatrixRain />
      <div className="scanline" />
      <div className="noise" />

      {/* Corners */}
      <div className="fixed top-[72px] left-0 w-10 h-10 border-t border-l z-[5] pointer-events-none" style={{ borderColor: "hsl(174 100% 50% / 0.25)" }} />
      <div className="fixed top-[72px] right-0 w-10 h-10 border-t border-r z-[5] pointer-events-none" style={{ borderColor: "hsl(174 100% 50% / 0.25)" }} />
      <div className="fixed bottom-0 left-0 w-10 h-10 border-b border-l z-[5] pointer-events-none" style={{ borderColor: "hsl(174 100% 50% / 0.25)" }} />
      <div className="fixed bottom-0 right-0 w-10 h-10 border-b border-r z-[5] pointer-events-none" style={{ borderColor: "hsl(174 100% 50% / 0.25)" }} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-[800] h-16 flex items-center justify-between border-b backdrop-blur-xl px-6 md:px-15"
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
          borderColor: "hsl(174 100% 50% / 0.12)",
          background: "hsl(200 100% 1.5% / 0.88)",
        }}
      >
        <div className="font-display text-[0.95rem] font-bold tracking-[0.22em] text-cyber-cyan text-glow-cyan">
          AYUSH JAIN
        </div>
        <div className="hidden md:flex gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="font-body font-semibold text-[0.78rem] tracking-[0.18em] uppercase no-underline transition-colors"
              style={{ color: "hsl(195 40% 70% / 0.5)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "hsl(var(--cyber-cyan))";
                (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px hsl(174 100% 50% / 0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "hsl(195 40% 70% / 0.5)";
                (e.currentTarget as HTMLElement).style.textShadow = "none";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div
            className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full border"
            style={{
              borderColor: "hsl(165 85% 48% / 0.25)",
              background: "hsl(165 85% 48% / 0.06)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "hsl(165 85% 48% / 0.55)" }} />
              <span className="relative rounded-full h-2 w-2" style={{ background: "hsl(var(--cyber-cyan))" }} />
            </span>
            <span className="font-body font-semibold text-[0.65rem] tracking-[0.2em] uppercase text-cyber-cyan">
              Open to Work
            </span>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex font-body font-bold text-[0.65rem] tracking-[0.22em] uppercase py-2 px-4 no-underline transition-all"
            style={{
              background: "hsl(var(--cyber-cyan))",
              color: "hsl(var(--void))",
              boxShadow: "0 0 20px hsl(165 85% 48% / 0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px hsl(165 85% 48% / 0.6)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px hsl(165 85% 48% / 0.35)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Hire Me →
          </a>
        </div>
      </nav>

      {/* Scroll progress dots */}
      <div className="fixed bottom-8 right-8 z-[900] flex flex-col gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
            className="interactive w-1.5 h-1.5 rounded-full transition-all cursor-pointer border-0"
            style={{
              background: i === currentSlide ? "hsl(var(--cyber-cyan))" : "hsl(174 100% 50% / 0.2)",
              boxShadow: i === currentSlide ? "var(--glow-cyan)" : "none",
            }}
          />
        ))}
      </div>

      {/* SCROLLY HERO with 3D scene */}
      <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* 3D Background */}
          <div className="absolute inset-0 z-[1]">
            <CyberScene />
          </div>

          {/* Gradient overlay for legibility */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background:
                "linear-gradient(95deg, hsl(222 47% 4% / 0.92) 0%, hsl(222 47% 4% / 0.45) 55%, hsl(222 47% 4% / 0.7) 100%)",
            }}
          />

          {/* Color accent glows */}
          <div
            className="absolute top-[15%] left-[-10%] w-[40vw] h-[40vw] z-[2] pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(165 85% 48% / 0.18) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute bottom-[5%] right-[-5%] w-[35vw] h-[35vw] z-[2] pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(38 95% 58% / 0.14) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute top-[60%] left-[40%] w-[25vw] h-[25vw] z-[2] pointer-events-none rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(250 70% 65% / 0.12) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(165 85% 48%) 1px, transparent 1px), linear-gradient(90deg, hsl(165 85% 48%) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          {/* Massive bg word */}
          <div
            className="absolute top-1/2 left-1/2 font-display font-black whitespace-nowrap pointer-events-none select-none z-[3]"
            style={{
              fontSize: "clamp(8rem, 20vw, 22rem)",
              color: "hsl(165 85% 48% / 0.05)",
              transform: "translate(-50%, -50%)",
              letterSpacing: "-0.05em",
            }}
          >
            {SLIDES[currentSlide].bg}
          </div>

          {/* Right accent bar */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[3px] z-[4]"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--cyber-cyan)), transparent)",
              opacity: 0.4,
            }}
          />
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] z-[4]"
            style={{
              background: "linear-gradient(to bottom, transparent, hsl(var(--cyber-red)), transparent)",
              opacity: 0.3,
            }}
          />

          {/* SLIDES */}
          <div className="relative z-[5] h-full">
            {/* Slide 0: Name */}
            <div
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-15 transition-all duration-700"
              style={{
                paddingLeft: "clamp(24px, 5vw, 60px)",
                paddingRight: "clamp(24px, 5vw, 60px)",
                paddingTop: "100px",
                opacity: currentSlide === 0 ? 1 : 0,
                transform: currentSlide === 0 ? "translateY(0)" : "translateY(40px)",
                pointerEvents: currentSlide === 0 ? "auto" : "none",
              }}
            >
              <div className="font-mono-cyber text-[0.85rem] text-cyber-red tracking-[0.35em] mb-6 uppercase flex items-center">
                <span className="inline-block w-8 h-px bg-current mr-3" />
                SOC Analyst &nbsp;·&nbsp; Ethical Hacker
              </div>
              <h1
                className="font-display font-bold leading-[0.95]"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 10rem)",
                  letterSpacing: "-0.045em",
                  color: "#fff",
                  textShadow: "0 0 80px hsl(165 85% 48% / 0.25)",
                }}
              >
                <span className="text-white">Ayush</span>
                <br />
                <span className="stroke-cyan">Jain.</span>
              </h1>
              <div
                className="font-body tracking-[0.18em] text-cyber-cyan mt-6 uppercase font-medium"
                style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)", opacity: 0.85 }}
              >
                Threat Detection &nbsp;·&nbsp; Penetration Testing &nbsp;·&nbsp; Incident Response
              </div>

              {/* Hero meta strip */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {[
                  { l: "EC-Council CSA", c: "cyan" },
                  { l: "Deloitte Cyber Sim", c: "cyan" },
                  { l: "MCA · Cyber Warfare", c: "amber" },
                  { l: "Jaipur, India", c: "muted" },
                ].map((t) => (
                  <span
                    key={t.l}
                    className="font-mono-cyber text-[0.7rem] tracking-[0.18em] uppercase py-1.5 px-3 border rounded-sm"
                    style={
                      t.c === "cyan"
                        ? { color: "hsl(var(--cyber-cyan))", borderColor: "hsl(165 85% 48% / 0.35)", background: "hsl(165 85% 48% / 0.06)" }
                        : t.c === "amber"
                        ? { color: "hsl(var(--cyber-red))", borderColor: "hsl(38 95% 58% / 0.35)", background: "hsl(38 95% 58% / 0.06)" }
                        : { color: "hsl(195 25% 65% / 0.7)", borderColor: "hsl(195 25% 65% / 0.18)", background: "hsl(0 0% 100% / 0.02)" }
                    }
                  >
                    {t.l}
                  </span>
                ))}
              </div>

              {/* Scroll cue */}
              <div className="mt-10 flex items-center gap-3 font-mono-cyber text-[0.7rem] tracking-[0.3em] uppercase" style={{ color: "hsl(195 25% 65% / 0.45)" }}>
                <span className="inline-block w-px h-8 animate-pulse" style={{ background: "hsl(165 85% 48% / 0.6)" }} />
                Scroll to explore
              </div>
            </div>

            {/* Slide 1: Stats */}
            <div
              className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
              style={{
                paddingLeft: "clamp(24px, 5vw, 60px)",
                paddingRight: "clamp(24px, 5vw, 60px)",
                paddingTop: "100px",
                opacity: currentSlide === 1 ? 1 : 0,
                transform: currentSlide === 1 ? "translateY(0)" : "translateY(40px)",
                pointerEvents: currentSlide === 1 ? "auto" : "none",
              }}
            >
              <div className="font-mono-cyber text-[0.85rem] text-cyber-cyan tracking-[0.35em] mb-8 uppercase">
                <span className="inline-block w-8 h-px bg-current align-middle mr-3" />
                Credentials
              </div>
              <h2
                className="font-display font-bold mb-8"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.035em",
                }}
              >
                EC-Council <span className="text-cyber-cyan">CSA</span>
                <br />
                Certified.
              </h2>
              <p
                className="font-body max-w-[560px] leading-[1.7] border-l-2 pl-5"
                style={{
                  fontSize: "1.1rem",
                  color: "hsl(195 40% 70% / 0.6)",
                  borderColor: "hsl(var(--cyber-cyan))",
                }}
              >
                <strong className="text-cyber-cyan">EC-Council Certified SOC Analyst</strong> — validated expertise in tier-1 SOC operations, alert triage, log correlation, and real-world attack scenario simulation. Backed by hands-on Deloitte cyber simulation engagement.
              </p>
            </div>

            {/* Slide 2: Specialization */}
            <div
              className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
              style={{
                paddingLeft: "clamp(24px, 5vw, 60px)",
                paddingRight: "clamp(24px, 5vw, 60px)",
                paddingTop: "100px",
                opacity: currentSlide === 2 ? 1 : 0,
                transform: currentSlide === 2 ? "translateY(0)" : "translateY(40px)",
                pointerEvents: currentSlide === 2 ? "auto" : "none",
              }}
            >
              <div className="font-mono-cyber text-[0.85rem] text-cyber-red tracking-[0.35em] mb-8 uppercase">
                <span className="inline-block w-8 h-px bg-current align-middle mr-3" />
                Specialization
              </div>
              <h2
                className="font-display font-bold mb-8"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.8rem)",
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                }}
              >
                Built for
                <br />
                <span className="stroke-red">Defense.</span>
              </h2>
              <div className="flex gap-3 flex-wrap">
                {["SIEM Monitoring", "SQL Injection Detection", "Incident Response", "Threat Hunting", "Log Correlation"].map((c) => (
                  <span
                    key={c}
                    className="font-body font-bold text-[0.85rem] tracking-[0.12em] py-2.5 px-5 uppercase border text-cyber-red"
                    style={{ borderColor: "hsl(348 100% 50% / 0.3)" }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Slide 3: CTA */}
            <div
              className="absolute inset-0 flex flex-col justify-center transition-all duration-700"
              style={{
                paddingLeft: "clamp(24px, 5vw, 60px)",
                paddingRight: "clamp(24px, 5vw, 60px)",
                paddingTop: "100px",
                opacity: currentSlide === 3 ? 1 : 0,
                transform: currentSlide === 3 ? "translateY(0)" : "translateY(40px)",
                pointerEvents: currentSlide === 3 ? "auto" : "none",
              }}
            >
              <div className="font-mono-cyber text-[0.85rem] text-cyber-orange tracking-[0.35em] mb-8 uppercase">
                <span className="inline-block w-8 h-px bg-current align-middle mr-3" />
                Let's Connect
              </div>
              <h2
                className="font-display font-bold mb-12"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                }}
              >
                <span className="stroke-cyan">Hire</span>
                <br />
                Me.
              </h2>
              <div className="flex flex-wrap gap-0 mb-12">
                {[
                  { n: "TOP 5%", l: "Detection Accuracy" },
                  { n: "95%", l: "Alert Triage Rate" },
                  { n: "50+", l: "Alerts Investigated" },
                  { n: "5K+", l: "Logs Analyzed" },
                ].map((s, i, arr) => (
                  <div
                    key={s.l}
                    className="py-5 pr-9 mr-9"
                    style={{
                      borderRight: i < arr.length - 1 ? "1px solid hsl(174 100% 50% / 0.15)" : "none",
                    }}
                  >
                    <div
                      className="font-display font-black text-cyber-cyan text-glow-cyan"
                      style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", lineHeight: 1 }}
                    >
                      {s.n}
                    </div>
                    <div
                      className="font-body font-semibold uppercase mt-1"
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.18em",
                        color: "hsl(195 40% 70% / 0.5)",
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                <a href="mailto:ayushjain100330@gmail.com" className="cyber-btn cyber-btn-primary">→ Hire Me</a>
                <a href="https://github.com/Ayushjain1030" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-outline">GitHub</a>
                <a href="https://www.linkedin.com/in/ayush-jain-388092371/" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-amber">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline btn styles via utility */}
      <style>{`
        .cyber-btn {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 28px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s;
        }
        .cyber-btn-primary {
          background: hsl(var(--cyber-cyan));
          color: hsl(var(--void));
          border-color: hsl(var(--cyber-cyan));
          box-shadow: var(--glow-cyan);
        }
        .cyber-btn-primary:hover {
          box-shadow: 0 0 50px hsl(var(--cyber-cyan) / 0.9), 0 0 100px hsl(var(--cyber-cyan) / 0.3);
          transform: translateY(-2px);
        }
        .cyber-btn-outline {
          background: transparent;
          color: hsl(var(--cyber-cyan));
          border-color: hsl(174 100% 50% / 0.4);
        }
        .cyber-btn-outline:hover {
          border-color: hsl(var(--cyber-cyan));
          box-shadow: var(--glow-cyan);
          transform: translateY(-2px);
        }
        .cyber-btn-amber {
          background: transparent;
          color: hsl(var(--cyber-red));
          border-color: hsl(38 95% 58% / 0.45);
        }
        .cyber-btn-amber:hover {
          border-color: hsl(var(--cyber-red));
          box-shadow: var(--glow-red);
          transform: translateY(-2px);
        }
      `}</style>

      {/* SECTIONS */}
      <div className="relative z-10 max-w-[1160px] mx-auto px-6 md:px-15" style={{ paddingLeft: "clamp(24px, 5vw, 60px)", paddingRight: "clamp(24px, 5vw, 60px)" }}>
        {/* CAREER */}
        <SectionHead num="00" title="CAREER" accent="TIMELINE" id="career" />
        <div className="reveal pl-10 relative pb-30" style={{ paddingBottom: "120px" }}>
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, hsl(174 100% 50% / 0.4), hsl(174 100% 50% / 0.05))" }}
          />
          {[
            {
              date: "AUG 2025 — PRESENT",
              role: "MCA Student — Cyber / Electronic Operations & Warfare",
              org: "Poornima University, Jaipur",
              desc: "Pursuing Master of Computer Applications with specialization in Cybersecurity and Electronic Warfare, deepening expertise in offensive and defensive security operations.",
            },
            {
              date: "2024",
              role: "Cybersecurity Analyst Intern",
              org: "Deloitte Australia — Virtual Cyber Job Simulation",
              desc: "Assessed the security posture of a simulated enterprise client, identifying 6 high-priority risks and mapping findings to ISO 27001 and NIST CSF. Produced a structured risk advisory report and collaborated with a virtual team of 8 analysts.",
            },
            {
              date: "2023 — 2025",
              role: "Bachelor's Degree — Computer Science",
              org: "Poddar International College, Jaipur",
              desc: "Foundation in computer science with focus on network security, systems programming, and applied cryptography. Earned EC-Council CSA certification alongside degree coursework.",
            },
          ].map((tl) => (
            <div key={tl.role} className="relative mb-16 last:mb-0">
              <div
                className="absolute -left-[46px] top-1.5 w-3 h-3 border-2 rounded-full bg-void"
                style={{ borderColor: "hsl(var(--cyber-cyan))", boxShadow: "var(--glow-cyan)" }}
              />
              <div className="font-mono-cyber text-base text-cyber-red tracking-[0.15em] mb-2">{tl.date}</div>
              <div className="font-display text-[1.1rem] font-bold text-white mb-1">{tl.role}</div>
              <div className="font-body font-bold text-[0.9rem] tracking-[0.12em] text-cyber-cyan uppercase mb-4">{tl.org}</div>
              <p className="text-[0.95rem] leading-[1.75] max-w-[600px]" style={{ color: "hsl(195 40% 70% / 0.65)" }}>{tl.desc}</p>
            </div>
          ))}
        </div>

        {/* PROJECTS */}
        <SectionHead num="01" title="KEY" accent="PROJECTS" id="projects" />
        <div className="reveal grid md:grid-cols-3 gap-px pb-30" style={{ background: "hsl(174 100% 50% / 0.08)", border: "1px solid hsl(174 100% 50% / 0.08)", paddingBottom: "120px" }}>
          {PROJECTS.map((p) => (
            <div key={p.num} className="cyber-card p-9 px-9 py-11 relative" style={{ padding: "44px 36px" }}>
              <div
                className="absolute top-3 right-5 font-mono-cyber leading-none select-none pointer-events-none"
                style={{ fontSize: "5rem", color: "hsl(174 100% 50% / 0.05)" }}
              >
                {p.num}
              </div>
              <div className="font-mono-cyber text-xs text-cyber-red tracking-[0.25em] mb-5 uppercase">{p.year}</div>
              <h3 className="font-display text-[0.95rem] font-bold text-white leading-[1.25] mb-5 tracking-[0.02em]">{p.title}</h3>
              <p className="text-[0.9rem] leading-[1.75] mb-7" style={{ color: "hsl(195 40% 70% / 0.6)" }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((t) => (
                  <span
                    key={t.label}
                    className="font-body font-semibold text-[0.63rem] tracking-[0.15em] uppercase py-1 px-3 border"
                    style={
                      t.v === "r"
                        ? { borderColor: "hsl(348 100% 50% / 0.25)", color: "hsl(var(--cyber-red))", background: "hsl(348 100% 50% / 0.04)" }
                        : t.v === "v"
                        ? { borderColor: "hsl(268 100% 50% / 0.3)", color: "hsl(268 100% 70%)", background: "hsl(268 100% 50% / 0.04)" }
                        : { borderColor: "hsl(174 100% 50% / 0.2)", color: "hsl(var(--cyber-cyan))", background: "hsl(174 100% 50% / 0.04)" }
                    }
                  >
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                {p.metrics.map((m) => (
                  <div key={m} className="font-body font-semibold text-[0.8rem] flex items-center gap-2.5" style={{ color: "hsl(174 100% 50% / 0.7)" }}>
                    <span className="inline-block w-5 h-px bg-cyber-cyan" style={{ background: "hsl(var(--cyber-cyan))" }} />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <SectionHead num="02" title="TECHNICAL" accent="SKILLS" id="skills" />
        <div className="reveal grid md:grid-cols-2 gap-6 pb-30" style={{ paddingBottom: "120px" }}>
          {SKILLS.map((s) => (
            <div key={s.label} className="cyber-card p-9" style={{ padding: "36px" }}>
              <div className="font-display text-[0.63rem] font-bold tracking-[0.25em] uppercase text-cyber-cyan mb-6 pb-4 border-b flex items-center gap-3" style={{ borderColor: "hsl(174 100% 50% / 0.1)" }}>
                <span className="w-1 h-1 bg-cyber-cyan glow-cyan" style={{ background: "hsl(var(--cyber-cyan))" }} />
                {s.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="chip interactive font-body font-semibold text-[0.8rem] py-1.5 px-4 border cursor-default transition-all"
                    style={{ background: "hsl(0 0% 100% / 0.03)", borderColor: "hsl(0 0% 100% / 0.07)", color: "hsl(195 40% 70% / 0.7)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "hsl(174 100% 50% / 0.08)";
                      el.style.borderColor = "hsl(174 100% 50% / 0.35)";
                      el.style.color = "hsl(var(--cyber-cyan))";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "hsl(0 0% 100% / 0.03)";
                      el.style.borderColor = "hsl(0 0% 100% / 0.07)";
                      el.style.color = "hsl(195 40% 70% / 0.7)";
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <SectionHead num="03" title="WORK" accent="EXPERIENCE" id="experience" />
        <div className="reveal cyber-card pb-30" style={{ padding: "56px", marginBottom: "120px" }}>
          <div className="font-display text-[1.5rem] font-black text-white tracking-[-0.02em] mb-2.5">Cybersecurity Analyst Intern</div>
          <div className="font-body font-bold text-base tracking-[0.12em] text-cyber-cyan uppercase mb-1.5">Deloitte Australia — Virtual Cyber Job Simulation</div>
          <div className="font-mono-cyber text-[0.85rem] tracking-[0.25em] mb-10 uppercase" style={{ color: "hsl(195 40% 70% / 0.5)" }}>2024 &nbsp;·&nbsp; Simulated Enterprise Engagement</div>
          <ul className="list-none flex flex-col gap-4">
            {[
              <>Assessed security posture of a simulated enterprise client, identifying <strong className="text-white">6 high-priority risks</strong> and mapping findings to ISO 27001 and NIST CSF control families.</>,
              <>Produced a structured risk advisory report recommending <strong className="text-white">4 strategic remediation actions</strong>, improving simulated client compliance readiness score by 25%.</>,
              <>Collaborated asynchronously with a virtual team of <strong className="text-white">8 analysts</strong> to deliver a consolidated threat landscape briefing within a 48-hour deadline.</>,
            ].map((li, i) => (
              <li key={i} className="text-base leading-[1.7] pl-7 relative" style={{ color: "hsl(195 40% 70% / 0.75)" }}>
                <span className="absolute left-0 top-[3px] text-cyber-cyan text-[0.65rem]">▶</span>
                {li}
              </li>
            ))}
          </ul>
        </div>

        {/* CERTS */}
        <SectionHead num="04" title="" accent="CERTIFICATIONS" id="certs" />
        <div className="reveal grid md:grid-cols-3 gap-6 pb-30" style={{ paddingBottom: "120px" }}>
          {CERTS.map((c) => (
            <div key={c.name} className="cyber-card" style={{ padding: "36px 28px" }}>
              <div
                className="w-13 h-13 flex items-center justify-center mb-5 border"
                style={{ width: "52px", height: "52px", background: "hsl(174 100% 50% / 0.07)", borderColor: "hsl(174 100% 50% / 0.2)", fontSize: "1.5rem" }}
              >
                {c.icon}
              </div>
              <div className="font-display text-[0.82rem] font-bold text-white leading-[1.3] mb-3">{c.name}</div>
              <div className="text-[0.85rem] leading-[1.65] mb-5" style={{ color: "hsl(195 40% 70% / 0.55)" }}>{c.body}</div>
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase py-1 px-3 no-underline border text-cyber-cyan"
                  style={{ background: "hsl(174 100% 50% / 0.08)", borderColor: "hsl(174 100% 50% / 0.25)" }}
                >
                  {c.badge}
                </a>
              ) : (
                <span
                  className="inline-block font-body font-bold text-[0.62rem] tracking-[0.2em] uppercase py-1 px-3 border text-cyber-cyan"
                  style={{ background: "hsl(174 100% 50% / 0.08)", borderColor: "hsl(174 100% 50% / 0.25)" }}
                >
                  {c.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <SectionHead num="05" title="" accent="EDUCATION" id="education" />
        <div className="reveal flex flex-col gap-px pb-30" style={{ background: "hsl(174 100% 50% / 0.08)", paddingBottom: "120px" }}>
          {[
            { deg: "Master of Computer Applications — MCA", school: "Poornima University, Jaipur · Cyber / Electronic Operations & Warfare", year: "AUG 2025 — MAY 2027" },
            { deg: "Bachelor's Degree — Computer Science", school: "Poddar International College, Jaipur", year: "2023 — 2025" },
          ].map((e) => (
            <div key={e.deg} className="bg-deep flex items-center gap-8 transition-colors" style={{ padding: "36px 48px" }}>
              <div className="w-3 h-3 border-2 rounded-full flex-shrink-0" style={{ borderColor: "hsl(var(--cyber-cyan))" }} />
              <div className="flex-1">
                <div className="font-display font-bold text-base text-white tracking-[-0.01em] mb-1.5">{e.deg}</div>
                <div className="font-body text-[0.85rem] font-semibold tracking-[0.1em]" style={{ color: "hsl(174 100% 50% / 0.6)" }}>{e.school}</div>
              </div>
              <div className="font-mono-cyber text-[1.1rem] whitespace-nowrap tracking-wider ml-auto" style={{ color: "hsl(195 40% 70% / 0.4)" }}>{e.year}</div>
            </div>
          ))}
        </div>

        {/* CONTACT */}
        <SectionHead num="06" title="GET IN" accent="TOUCH" id="contact" />
        <div className="reveal cyber-card relative overflow-hidden text-center" style={{ padding: "80px 60px", marginBottom: "120px" }}>
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, hsl(174 100% 50% / 0.06) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <h2
            className="font-display font-black mb-4 relative"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "-0.03em",
              color: "#fff",
              textShadow: "0 0 60px hsl(174 100% 50% / 0.15)",
            }}
          >
            LET'S <em className="stroke-cyan not-italic">BUILD</em>
            <br />
            SOMETHING SECURE
          </h2>
          <div className="font-body text-base mb-13 tracking-[0.08em] relative" style={{ color: "hsl(195 40% 70% / 0.5)", marginBottom: "52px" }}>
            Open to SOC Analyst &amp; Cybersecurity Analyst roles · Based in Jaipur, India
          </div>
          <div className="flex justify-center gap-5 flex-wrap relative">
            <a href="mailto:ayushjain100330@gmail.com" className="cyber-btn cyber-btn-outline">✉ ayushjain100330@gmail.com</a>
            <a href="https://github.com/Ayushjain1030" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-outline">GitHub</a>
            <a href="https://www.linkedin.com/in/ayush-jain-388092371/" target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-outline">LinkedIn</a>
          </div>
        </div>
      </div>

      <footer
        className="text-center py-7 font-mono-cyber text-[0.8rem] tracking-[0.25em] border-t relative z-10 uppercase"
        style={{ color: "hsl(195 40% 70% / 0.35)", borderColor: "hsl(165 85% 48% / 0.08)" }}
      >
        © 2025 &nbsp;Ayush Jain &nbsp;·&nbsp; Cybersecurity Portfolio &nbsp;·&nbsp; Jaipur, India
      </footer>
    </div>
  );
};

const SectionHead = ({ num, title, accent, id }: { num: string; title: string; accent: string; id: string }) => (
  <div id={id} className="reveal flex items-end gap-6 mb-18 pt-30" style={{ marginBottom: "72px", paddingTop: "120px" }}>
    <div className="font-mono-cyber leading-none font-medium" style={{ fontSize: "2.5rem", color: "hsl(165 85% 48% / 0.35)" }}>{num}</div>
    <h2
      className="font-display font-bold"
      style={{
        fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
        letterSpacing: "-0.035em",
        color: "#fff",
        textShadow: "0 0 40px hsl(165 85% 48% / 0.12)",
      }}
    >
      {title && <span>{title} </span>}<span className="text-cyber-cyan">{accent}</span>
    </h2>
    <div className="flex-1 h-px mb-3" style={{ background: "linear-gradient(to right, hsl(165 85% 48% / 0.4), transparent)" }} />
  </div>
);

export default Index;
