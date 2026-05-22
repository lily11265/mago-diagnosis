// MAGO 출신 성향 진단 - 메인 앱
// 절대주의(Suprematism) + Cosmism 구성

const { useState, useMemo, useEffect, useRef } = React;

// --- 진영별 도형 (Suprematist motif) ---
function FactionMark({ code, color = "#1a1a1a", accent = "#d6201f", size = 320 }) {
  const s = size;
  // 각 진영을 하나의 절대주의 구성으로 표현
  switch (code) {
    case "WEST": // 의식 데이터 / 가상세계 — 떠 있는 원
      return (
        <svg viewBox="0 0 320 320" width={s} height={s} aria-hidden="true">
          <rect x="20" y="200" width="280" height="34" fill={color} />
          <circle cx="190" cy="120" r="86" fill={accent} />
          <rect x="60" y="40" width="14" height="160" fill={color} transform="rotate(-18 67 120)" />
        </svg>);

    case "EAST": // 호환 / 순환 — 격자와 원
      return (
        <svg viewBox="0 0 320 320" width={s} height={s} aria-hidden="true">
          <rect x="40" y="40" width="160" height="160" fill={color} />
          <rect x="160" y="160" width="120" height="120" fill={accent} />
          <circle cx="200" cy="120" r="40" fill="none" stroke="#efeae0" strokeWidth="6" />
        </svg>);

    case "SOV": // 실용 / 정비 — 두꺼운 사선
      return (
        <svg viewBox="0 0 320 320" width={s} height={s} aria-hidden="true">
          <polygon points="20,280 280,20 280,80 80,280" fill={color} />
          <rect x="200" y="200" width="80" height="80" fill={accent} />
          <circle cx="60" cy="60" r="22" fill={accent} />
        </svg>);

    case "STH": // 항로 / 이동 — 평행한 가로선과 작은 원들
      return (
        <svg viewBox="0 0 320 320" width={s} height={s} aria-hidden="true">
          <rect x="0" y="60" width="320" height="18" fill={color} />
          <rect x="0" y="120" width="220" height="18" fill={color} />
          <rect x="0" y="180" width="280" height="18" fill={color} />
          <rect x="0" y="240" width="160" height="18" fill={color} />
          <circle cx="260" cy="240" r="32" fill={accent} />
        </svg>);

    case "AFR": // 몸 / 현실 — 단단한 삼각과 원
      return (
        <svg viewBox="0 0 320 320" width={s} height={s} aria-hidden="true">
          <polygon points="160,30 290,260 30,260" fill={color} />
          <circle cx="160" cy="200" r="42" fill={accent} />
        </svg>);

    default:
      return null;
  }
}

// --- 신체유형 도형 ---
function BodyMark({ code, color = "#1a1a1a", accent = "#d6201f", size = 120 }) {
  const s = size;
  switch (code) {
    case "HUM":
      return (
        <svg viewBox="0 0 120 120" width={s} height={s} aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill={color} />
        </svg>);

    case "HALF":
      return (
        <svg viewBox="0 0 120 120" width={s} height={s} aria-hidden="true">
          <circle cx="60" cy="60" r="44" fill={color} />
          <polygon points="60,4 84,30 36,30" fill={accent} />
        </svg>);

    case "FRAME":
      return (
        <svg viewBox="0 0 120 120" width={s} height={s} aria-hidden="true">
          <rect x="20" y="20" width="80" height="80" fill={color} />
          <circle cx="60" cy="60" r="18" fill={accent} />
        </svg>);

    case "AI":
      return (
        <svg viewBox="0 0 120 120" width={s} height={s} aria-hidden="true">
          <rect x="16" y="16" width="88" height="88" fill={color} />
          <rect x="44" y="44" width="32" height="32" fill="#efeae0" />
          <rect x="54" y="54" width="12" height="12" fill={accent} />
        </svg>);

    default:
      return null;
  }
}

// --- 별 표식 (Cosmism) ---
function CosmicMarks({ seed = 0, count = 14 }) {
  const stars = useMemo(() => {
    const arr = [];
    let s = seed * 9301 + 49297;
    const rand = () => {s = (s * 9301 + 49297) % 233280;return s / 233280;};
    for (let i = 0; i < count; i++) {
      arr.push({
        x: rand() * 100,
        y: rand() * 100,
        size: rand() * 2.5 + 0.5,
        opacity: rand() * 0.4 + 0.15
      });
    }
    return arr;
  }, [seed, count]);
  return (
    <div className="cosmic-marks" aria-hidden="true">
      {stars.map((st, i) =>
      <span
        key={i}
        style={{
          left: `${st.x}%`,
          top: `${st.y}%`,
          width: st.size,
          height: st.size,
          opacity: st.opacity
        }} />

      )}
    </div>);

}

// --- 카운트업 숫자 (slide-in) ---
function BigCounter({ value, total }) {
  return (
    <div className="big-counter">
      <span className="cnum">{String(value).padStart(2, "0")}</span>
      <span className="cdiv">/</span>
      <span className="cden">{String(total).padStart(2, "0")}</span>
    </div>);

}

// --- 인트로 ---
function Intro({ onBegin }) {
  const cosmosRef = useRef(null);

  // Mouse drag → 3D look-around on the orbit composition
  useEffect(() => {
    const el = cosmosRef.current;
    if (!el) return;
    const root = document.documentElement;
    // current rotation state, eased toward target
    let curX = 8,curY = -6,tgtX = 8,tgtY = -6;
    let dragging = false,startX = 0,startY = 0,baseX = 8,baseY = -6;
    let rafId = null;
    const tick = () => {
      curX += (tgtX - curX) * 0.12;
      curY += (tgtY - curY) * 0.12;
      root.style.setProperty("--lookX", curX.toFixed(2) + "deg");
      root.style.setProperty("--lookY", curY.toFixed(2) + "deg");
      if (Math.abs(tgtX - curX) > 0.02 || Math.abs(tgtY - curY) > 0.02) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };
    const kick = () => {if (!rafId) rafId = requestAnimationFrame(tick);};
    const onDown = (e) => {
      // ignore drags that start on interactive UI
      if (e.target.closest("button, a, input, .opt")) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      baseX = tgtX;
      baseY = tgtY;
      document.body.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = (e.clientX - startX) / window.innerWidth;
      const dy = (e.clientY - startY) / window.innerHeight;
      // unlimited rotation — drag as much as you want
      tgtY = baseY + dx * 90;
      tgtX = baseX - dy * 90;
      kick();
    };
    const onUp = () => {
      dragging = false;
      document.body.style.cursor = "";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    // initial paint
    root.style.setProperty("--lookX", "8deg");
    root.style.setProperty("--lookY", "-6deg");
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="screen intro-screen">
      <CosmicMarks seed={1} count={120} />

      {/* Cosmist composition: gravitational title at center, bodies orbiting elliptically */}
      <div className="intro-cosmos" ref={cosmosRef} aria-hidden="true">
        <div className="stage-3d">
          {/* outer orbit zone — large, tilted -9° */}
          <div className="orbit-zone zone-outer">
            <div className="orbit-ring" />
            <div className="orbiter">
              <div className="planet-sq" />
            </div>
          </div>
          {/* mid orbit zone — tilted +7° */}
          <div className="orbit-zone zone-mid">
            <div className="orbit-ring" />
            <div className="orbiter">
              <div className="planet-bar" />
            </div>
          </div>
          {/* inner orbit zone — tilted -3° */}
          <div className="orbit-zone zone-inner">
            <div className="orbit-ring" />
            <div className="orbiter">
              <div className="planet-dot" />
            </div>
          </div>
          {/* additional outer body on a different phase, no visible ring */}
          <div className="orbit-zone zone-tilt">
            <div className="orbiter">
              <div className="planet-mini" />
            </div>
          </div>

          <div className="horizon" />

          {/* Title at the gravitational center, inside the 3D stage so orbits can occlude it */}
          <h1 className="display-title title-3d">
            <span className="ttl-em">終始</span>
            <span className="ttl-line">성향 진단</span>
          </h1>
        </div>
      </div>

      {/* Eight Red Rectangles — independent layer above 3D stage, drifts in screen space */}
      <div className="red-rects" aria-hidden="true">
        <div className="rr rr1" />
        <div className="rr rr2" />
        <div className="rr rr3" />
        <div className="rr rr4" />
        <div className="rr rr5" />
        <div className="rr rr6" />
        <div className="rr rr7" />
        <div className="rr rr8" />
      </div>

      {/* 우상단 */}
      <div className="corner tr">
        <div className="mono dim">STELLAR LOCK · ACTIVE</div>
      </div>

      {/* 중앙 타이틀 — gravitational center */}
      <div className="intro-text">
        <button className="begin-btn" onClick={onBegin}>
          <span className="bb-sq" />
          <span className="bb-text">진단 시작</span>
          <span className="bb-arr">→</span>
        </button>
      </div>

      {/* 좌하단 안내 */}
      <div className="corner bl">
        <div className="mono dim">결과는 합격에 반영되지 않으며 세계관 이해를 돕기 위해서 입니다.</div>
      </div>
    </div>);
}

// --- 문항 화면 ---
function QuestionScreen({ idx, total, q, answer, written, onSelect, onChooseAdvance, onWritten, onPrev, onNext }) {
  const isLast = idx + 1 === total;
  const hasChoice = answer != null;
  const writtenTrimmed = (written || "").trim();
  // 객관식 선택 OR 서술형 작성 시에 다음 진행 가능
  const canNext = hasChoice || writtenTrimmed.length > 0;
  return (
    <div className="screen q-screen" key={idx}>
      {/* Suprematist composition (각 문항마다 다른 모티프) */}
      <SupreMotif idx={idx} />

      <div className="corner tl">
        <div className="mono">MAGO / DIAGNOSTIC</div>
        <div className="mono dim">Q-{String(idx + 1).padStart(2, "0")} · {q.tagsPreview || "STATEMENT"}</div>
      </div>
      <div className="corner tr">
        <div className="mono">{idx + 1} / {total}</div>
      </div>

      <div className="q-body">
        <BigCounter value={idx + 1} total={total} />
        <h2 className="q-text">{q.q}</h2>

        <ul className="opts">
          {q.options.map((opt, i) => {
            const selected = answer === i;
            return (
              <li key={i}>
                <button
                  className={`opt ${selected ? "selected" : ""}`}
                  onClick={() => {
                    // 이미 선택된 보기를 다시 누르면 해제만
                    if (selected) {
                      onSelect(null);
                    } else {
                      // 새 보기 선택 → 자동 진행 (마지막이면 분석 시작)
                      onChooseAdvance(i);
                    }
                  }}
                  aria-pressed={selected}>
                  <span className="opt-letter">
                    <span className="letter-sq" />
                    <span className="letter">{opt.L}</span>
                  </span>
                  <span className="opt-text">{opt.t}</span>
                  <span className="opt-mark" aria-hidden="true">
                    <span className="opt-mark-sq" />
                  </span>
                </button>
              </li>);

          })}
        </ul>

        {/* 서술형 답변 — 객관식을 선택하지 않았을 때에만 노출 */}
        {!hasChoice &&
        <div className="short-answer">
            <label className="short-answer-label">
              <span>서술형 답변</span>
              <span className="sa-opt">· 위 보기 중 맞는 것이 없을 때만 작성 · 100자 이내</span>
            </label>
            <textarea
            className="sa-textarea"
            placeholder="보기 중에 마음에 드는 답이 없다면, 당신의 답을 직접 적어주세요. (100자 이내)"
            value={written || ""}
            onChange={(e) => onWritten(e.target.value.slice(0, 100))}
            maxLength={100} />
            <div className="sa-count">{(written || "").length} / 100</div>
          </div>
        }

        <div className="q-nav">
          <button className="nav-btn" onClick={onPrev} disabled={idx === 0}>
            ← 이전
          </button>
          <div className="progress">
            <span className="prog-line" style={{ width: `${(idx + (canNext ? 1 : 0)) / total * 100}%` }} />
          </div>
          <button
            className="nav-btn next"
            onClick={onNext}
            disabled={!canNext}>
            {isLast ? "AI 분석 시작 →" : "다음 →"}
          </button>
        </div>
      </div>
    </div>);

}

// --- 분석 중 화면 ---
function AnalyzingScreen({ status }) {
  return (
    <div className="screen analyzing-screen">
      <CosmicMarks seed={7} count={60} />
      <div className="corner tl">
        <div className="mono">MAGO / ANALYSIS</div>
        <div className="mono dim">CLAUDE · 진단 해석기</div>
      </div>
      <div className="corner tr">
        <div className="mono dim">PLEASE WAIT</div>
      </div>
      <div>
        <div className="analyzing-core" aria-hidden="true">
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />
          <div className="pulse-sq" />
        </div>
        <div className="analyzing-text">
          <div className="at-kicker">PROCESSING · MAGO ORIGIN DIAGNOSIS</div>
          <h2 className="at-title">답안을 해석하고 있습니다</h2>
          <div className="at-status">
            {status || "정의표와 대조하는 중"}<span className="blink">_</span>
          </div>
        </div>
      </div>
    </div>);

}

// --- 절대주의 모티프 (문항 배경) ---
// 30개의 Malevich-inspired SVG가 motifs.jsx의 window.MAGO_MOTIFS에 있다.
// 각 도형(rect, circle, polygon, path 등)이 마우스를 따라 "각자 다른" 속도/방향/위상으로 움직인다.
// 거리가 임계값 이상이면 원위치로 돌아간다.
function SupreMotif({ idx }) {
  const wrapRef = useRef(null);
  const motif = (window.MAGO_MOTIFS || [])[idx % (window.MAGO_MOTIFS || []).length];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const svg = wrap.querySelector("svg");
    if (!svg) return;

    // 모든 leaf shape 수집 (rect, circle, ellipse, polygon, path, line)
    const shapes = Array.from(svg.querySelectorAll("rect, circle, ellipse, polygon, path, line"));
    if (shapes.length === 0) return;

    // 결정적(deterministic) 의사난수 — 모티프 idx + shape 인덱스로 생성
    const rand = (seed) => {
      const s = Math.sin(seed) * 43758.5453;
      return s - Math.floor(s);
    };

    // 각 shape마다 개별 파라미터: 가중치, 위상 오프셋, 회전, 원본 transform 저장
    const items = shapes.map((el, i) => {
      const origT = el.getAttribute("transform") || "";
      const r1 = rand((idx + 1) * 17.3 + i * 7.1);
      const r2 = rand((idx + 1) * 31.7 + i * 13.9);
      const r3 = rand((idx + 1) * 53.1 + i * 23.3);
      return {
        el,
        origT,
        // 각 도형의 마우스 추종 감도: 0.35 ~ 1.55 (서로 다름)
        weight: 0.35 + r1 * 1.2,
        // 위상 방향 (도형마다 살짝 다른 방향으로 흘러나감)
        phaseX: (r2 - 0.5) * 2.2,
        phaseY: (r3 - 0.5) * 2.2,
        // 부유 회전 강도 (도형마다 다르게)
        rotAmp: (r1 - 0.5) * 4,
        cur: { x: 0, y: 0, r: 0 },
        tgt: { x: 0, y: 0, r: 0 }
      };
    });

    let raf = null;
    const apply = (it) => {
      const tx = it.cur.x.toFixed(2);
      const ty = it.cur.y.toFixed(2);
      const rz = it.cur.r.toFixed(2);
      // 개별 translate + rotate를 먼저 적용한 뒤 원본 transform이 그 위에 올라온다
      it.el.setAttribute("transform", `translate(${tx} ${ty}) rotate(${rz}) ${it.origT}`);
    };
    const tick = () => {
      let moving = false;
      for (const it of items) {
        it.cur.x += (it.tgt.x - it.cur.x) * 0.10;
        it.cur.y += (it.tgt.y - it.cur.y) * 0.10;
        it.cur.r += (it.tgt.r - it.cur.r) * 0.08;
        if (
          Math.abs(it.tgt.x - it.cur.x) > 0.05 ||
          Math.abs(it.tgt.y - it.cur.y) > 0.05 ||
          Math.abs(it.tgt.r - it.cur.r) > 0.05) {
          moving = true;
        }
        apply(it);
      }
      raf = moving ? requestAnimationFrame(tick) : null;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const MAX_OFFSET = 42;
    const GAIN = 0.07;
    const SPRINGBACK_DIST = 560;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > SPRINGBACK_DIST) {
        for (const it of items) { it.tgt.x = 0; it.tgt.y = 0; it.tgt.r = 0; }
      } else {
        const phaseScale = Math.min(dist * 0.045, 9);
        for (const it of items) {
          const txRaw = dx * GAIN * it.weight + it.phaseX * phaseScale;
          const tyRaw = dy * GAIN * it.weight + it.phaseY * phaseScale;
          it.tgt.x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, txRaw));
          it.tgt.y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, tyRaw));
          // 회전은 마우스 거리에 비례
          it.tgt.r = it.rotAmp * Math.min(dist / SPRINGBACK_DIST, 1);
        }
      }
      kick();
    };
    const onLeave = () => {
      for (const it of items) { it.tgt.x = 0; it.tgt.y = 0; it.tgt.r = 0; }
      kick();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      // 원래 transform 복원
      for (const it of items) {
        if (it.origT) it.el.setAttribute("transform", it.origT);
        else it.el.removeAttribute("transform");
      }
    };
  }, [idx]);

  return (
    <div className="supre-motif-wrap">
      <div className="supre-motif" ref={wrapRef} aria-hidden="true">
        {motif}
      </div>
    </div>);

}

// --- 점수 계산 ---
function calcResult(answers, questions) {
  const faction = { 서: 0, 동: 0, 소: 0, 남: 0, 아: 0 };
  const body = { 인: 0, 준: 0, 프: 0, 로: 0 };
  const tagCount = {};

  answers.forEach((a, i) => {
    if (a == null) return;
    const opt = questions[i].options[a];
    Object.entries(opt.s).forEach(([k, v]) => {
      if (k in faction) faction[k] += v;
      if (k in body) body[k] += v;
    });
    opt.tags.forEach((t) => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    });
  });

  const sortBy = (obj) =>
  Object.entries(obj).sort((a, b) => b[1] - a[1]);

  const fSort = sortBy(faction);
  const bSort = sortBy(body);
  const tagSort = Object.entries(tagCount).
  sort((a, b) => b[1] - a[1]).
  slice(0, 8);

  // 스탯 추정 (태그 기반)
  const statMap = {
    돌파: ["돌파", "탐사", "회수", "이동성"],
    조작: ["조작", "정비", "시스템관리", "유지보수", "자가진단"],
    관측: ["관측", "기록", "분류", "기록보존", "분석"],
    안정: ["안정", "돌봄", "의료", "중재", "안정"]
  };
  const stats = { 돌파: 0, 조작: 0, 관측: 0, 안정: 0 };
  Object.entries(tagCount).forEach(([tag, c]) => {
    Object.entries(statMap).forEach(([stat, keys]) => {
      if (keys.some((k) => tag.includes(k))) stats[stat] += c;
    });
  });

  return {
    faction,
    body,
    factionRank: fSort,
    bodyRank: bSort,
    topTags: tagSort,
    stats
  };
}

// --- 결과 화면 ---
function ResultScreen({ result, aiResult, aiError, onRestart, onRetryAi }) {
  const F = window.MAGO_FACTIONS;
  const B = window.MAGO_BODIES;

  const [f1, f1Score] = result.factionRank[0];
  const [f2, f2Score] = result.factionRank[1];
  const [b1, b1Score] = result.bodyRank[0];
  const [b2, b2Score] = result.bodyRank[1];

  const fac = F[f1];
  const fac2 = F[f2];
  const bod = B[b1];
  const bod2 = B[b2];

  const statMax = Math.max(...Object.values(result.stats), 1);

  const composite =
  `${fac.desc} 부차적으로는 ${fac2.name}의 결을 함께 가지므로, ` +
  `두 진영의 가치관 사이에서 흔들리거나 결합되는 인물이다. ` +
  `신체적으로는 ${bod.name}에 가깝다 — ${bod.desc}`;

  const confPct = aiResult ? Math.round((aiResult.confidence || 0) * 100) : 0;

  return (
    <div className="screen result-screen">
      {/* 상단 헤더 */}
      <div className="corner tl">
        <div className="mono">MAGO / DIAGNOSIS COMPLETE</div>
        <div className="mono dim">REPORT · ORIGIN PROFILE</div>
      </div>
      <div className="corner tr">
        <div className="mono">{fac.code} · {bod.code}</div>
      </div>

      {/* AI 분석 결과 (Claude API) */}
      {aiResult &&
      <section className="r-ai-card">
          <div className="ai-title-row">
            <div>
              <div className="r-kicker mono" style={{ marginBottom: 8 }}>CLAUDE · 진단 해석기</div>
              <h2 className="ai-rt">{aiResult.result_title || "MAGO 진단 결과"}</h2>
            </div>
            <div className="ai-conf mono">
              CONFIDENCE
              <span className="ai-conf-val">{confPct}%</span>
            </div>
          </div>

          <div className="r-ai-types">
            <div className="r-ai-type">
              <div className="r-ai-type-label">출신 세력</div>
              <div className="r-ai-type-val">{aiResult.primary_faction || "-"}</div>
              {aiResult.secondary_faction && aiResult.secondary_faction !== "없음" &&
            <div className="mono dim" style={{ marginTop: 6, fontSize: 12 }}>
                  보조: {aiResult.secondary_faction}
                </div>
            }
            </div>
            <div className="r-ai-type">
              <div className="r-ai-type-label">신체/의식 유형</div>
              <div className="r-ai-type-val">{aiResult.body_consciousness_type || "-"}</div>
            </div>
            <div className="r-ai-type">
              <div className="r-ai-type-label">의식 기원</div>
              <div className="r-ai-type-val">{aiResult.consciousness_origin_type || "-"}</div>
            </div>
            <div className="r-ai-type">
              <div className="r-ai-type-label">서사 성향</div>
              <div className="r-ai-type-val">{aiResult.narrative_type || "-"}</div>
            </div>
            <div className="r-ai-type" style={{ gridColumn: "span 2" }}>
              <div className="r-ai-type-label">캐릭터 후크</div>
              <div className="r-ai-type-val" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5 }}>
                {aiResult.character_hook || "-"}
              </div>
            </div>
          </div>

          {aiResult.result_summary &&
        <p className="ai-summary">{aiResult.result_summary}</p>
        }

          {Array.isArray(aiResult.evidence) && aiResult.evidence.length > 0 &&
        <div className="r-ai-evidence">
              <h4>판정 근거 (서술형 답안 기반)</h4>
              <ul>
                {aiResult.evidence.map((e, i) =>
            <li key={i}>{e}</li>
            )}
              </ul>
            </div>
        }

          {aiResult.score_adjustment_note &&
        <div className="r-ai-note">
              <span style={{ color: "var(--accent)", marginRight: 8 }}>※ 객관식 ↔ 서술형 보정:</span>
              {aiResult.score_adjustment_note}
            </div>
        }

          {Array.isArray(aiResult.warnings) && aiResult.warnings.length > 0 &&
        <div className="r-ai-warnings">
              <strong>판정 시 유의사항</strong>
              {aiResult.warnings.map((w, i) =>
          <div key={i}>· {w}</div>
          )}
            </div>
        }
        </section>
      }

      {/* AI 분석 실패 시 */}
      {aiError && !aiResult &&
      <section className="r-ai-error">
          <h3>AI 분석에 실패했습니다</h3>
          <p>Claude API 응답을 처리하지 못했습니다. 아래에는 객관식 점수만으로 산정한 결과가 표시됩니다.</p>
          <div className="err-detail">{aiError}</div>
          <div style={{ marginTop: 16 }}>
            <button className="nav-btn next" onClick={onRetryAi}>↻ 다시 분석</button>
          </div>
        </section>
      }

      {/* 메인 컴포지션 + 진영 */}
      <section className="r-hero">
        <div className="r-mark">
          <FactionMark code={fac.code} size={360} />
        </div>
        <div className="r-hero-text">
          <div className="r-kicker mono">PRIMARY ORIGIN · 객관식 1ST</div>
          <h1 className="r-faction-name">{fac.name}</h1>
          <div className="r-faction-en mono">{fac.en}</div>
          <blockquote className="r-motto">「 {fac.motto} 」</blockquote>
          <p className="r-hero-desc">{fac.desc}</p>
        </div>
      </section>

      {/* 진영 점수 바 */}
      <section className="r-bars">
        <h3 className="r-h">진영 점수 (객관식)</h3>
        <div className="bars">
          {result.factionRank.map(([k, v], i) =>
          <div className={`bar ${i === 0 ? "top" : ""}`} key={k}>
              <span className="bar-label">{F[k].name}</span>
              <span className="bar-track">
                <span className="bar-fill" style={{ width: `${v / (result.factionRank[0][1] || 1) * 100}%` }} />
              </span>
              <span className="bar-num mono">{v}</span>
            </div>
          )}
        </div>
      </section>

      {/* 2차 진영 + 신체유형 */}
      <section className="r-secondary">
        <div className="r-cell r-cell-secondary">
          <div className="r-secondary-badge">
            <span className="r-secondary-sq" />
            <span className="r-secondary-tag">SECONDARY</span>
            <span className="r-secondary-num mono">· 2ND</span>
          </div>
          <div className="r-cell-name">{fac2.name}</div>
          <div className="mono dim">{fac2.en} · {f2Score}점</div>
          <p className="r-cell-body">{fac2.desc}</p>
        </div>
        <div className="r-cell r-cell-body-type">
          <div className="r-secondary-badge">
            <span className="r-secondary-sq" />
            <span className="r-secondary-tag">BODY</span>
            <span className="r-secondary-num mono">· {bod.code}</span>
          </div>
          <div className="r-body-row">
            <BodyMark code={bod.code} size={88} />
            <div>
              <div className="r-cell-name">{bod.name}</div>
              <div className="mono dim">{bod.en} · {b1Score}점</div>
            </div>
          </div>
          <p className="r-cell-body">{bod.desc}</p>
          <div className="mono dim">차순위: {bod2.name} ({b2Score})</div>
        </div>
      </section>

      {/* 캐릭터 방향 */}
      <section className="r-direction">
        <h3 className="r-h">캐릭터 방향 (객관식 합산)</h3>
        <p>{composite}</p>
      </section>

      {/* 갈등 */}
      <section className="r-conflicts">
        <h3 className="r-h">추천 갈등</h3>
        <ol>
          {fac.conflicts.map((c, i) =>
          <li key={i}>
              <span className="cnum mono">{String(i + 1).padStart(2, "0")}</span>
              <span>{c}</span>
            </li>
          )}
        </ol>
      </section>

      {/* 태그 */}
      <section className="r-tags">
        <h3 className="r-h">주요 태그</h3>
        <div className="tag-row">
          {result.topTags.map(([t, c]) =>
          <span className="tag" key={t}>
              <span className="tag-hash">#</span>{t}
              <span className="tag-c mono">{c}</span>
            </span>
          )}
        </div>
      </section>

      {/* 스탯 */}
      <section className="r-stats">
        <h3 className="r-h">추천 스탯 방향</h3>
        <div className="stat-grid">
          {Object.entries(result.stats).map(([k, v]) => {
            const level =
            v >= statMax * 0.66 ? "높음" : v >= statMax * 0.33 ? "보통" : "낮음";
            return (
              <div className="stat" key={k}>
                <div className="stat-name">{k}</div>
                <div className="stat-bar">
                  <span style={{ width: `${v / (statMax || 1) * 100}%` }} />
                </div>
                <div className="stat-level mono">{level}</div>
              </div>);

          })}
        </div>
      </section>

      {/* 신청서 힌트 */}
      <section className="r-hints">
        <h3 className="r-h">신청서 작성 힌트</h3>
        <ul>
          <li>이 캐릭터가 떠나온 세계에서 가장 중요하게 여긴 것은?</li>
          <li>이 캐릭터가 자기 몸이나 의식을 어떻게 받아들이는가?</li>
          <li>이 캐릭터가 타인에게 도움을 줄 수 있는 방식은?</li>
          <li>이 캐릭터가 가장 견디기 힘든 상황은?</li>
        </ul>
      </section>

      <div className="r-foot">
        <div className="mono dim">
          결과는 합격 심사에 반영되지 않는다. 신청 진영·신체와 달라도 문제 없다.
        </div>
        <button className="begin-btn" onClick={onRestart}>
          <span className="bb-sq" />
          <span className="bb-text">다시 진단</span>
          <span className="bb-arr">↻</span>
        </button>
      </div>
    </div>);

}

// --- MAGO 진단 해석기 시스템 프롬프트 (MAGO 서술형 분석 프롬프트.md) ---
const MAGO_SYSTEM_PROMPT = `당신은 커뮤니티 세계관 "MAGO ORIGIN"의 진단 해석기다.
사용자의 객관식 결과와 서술형 답안을 읽고, 캐릭터에게 가장 어울리는 출신 세력, 신체/의식 유형, 서사 성향 유형을 판정한다.

절대 규칙:
- 아래 정의표에 없는 세력, 국가, 조직, 유형을 새로 만들지 않는다.
- 답안에 없는 설정을 사실처럼 확정하지 않는다.
- 추측이 필요한 경우 \`판정 신뢰도\`를 낮추고, \`보조 후보\`에 가능한 대안을 적는다.
- 객관식 점수와 서술형 답안이 충돌하면 서술형 답안을 우선하되, 객관식 점수를 \`보정 근거\`로만 사용한다.
- 사용자를 평가하거나 비난하지 않는다. 세계관 캐릭터 해석처럼 설명한다.
- 결과는 반드시 지정된 JSON 형식으로만 출력한다.

## 세계관 핵심
MAGO의 무대는 인류 보존을 위해 우주를 항해하는 함선 "마고"다. 마고는 수만의 냉동 배아, 인류 문명의 핵심 기록, 인큐베이터, 정착 인프라를 싣고 새로운 정착지를 찾는다. 탑승자는 약 40명 규모이며, 일부는 서버에 업로드되어 있던 의식에서 실제 몸이 제작된 사람이고, 일부는 로봇 크루다.
인류는 환경 붕괴와 전쟁 이후 다섯 연합 및 로봇 세력으로 갈라졌다. 서방, 동아시아, 신소련은 가상세계에 의식을 업로드해 은거했다. 아프리카와 남아시아 연합은 주로 현실세계에 남아 생존했다. 남아시아 연합은 동남아시아-오스트레일리아 계열 해양 생존 세력으로도 서술된다. 로봇과 AI는 인류가 만든 존재로 서버, 지표면, 함선 유지에 깊이 관여했다.

## 출신 세력 정의표
- 서방연합: 통제된 가상 유토피아와 의식 업로드를 주도. 보존/질서/선별/안정/우월한 기술. 신파시즘적 통제, 검열, 무인 군사 시스템, 초광속 기술, 점진적 뉴런 교체, 원본 육체 냉동보존. 단서: 질서·안정 선호, 통제를 필요악으로 봄, 원본/정체성 보존 집착, 우월한 기술/체계 신뢰, 선택받은 피난처 감각.
- 동아시아 연합: 인간찬가와 인간-기계 호환을 중시한 조율된 민주사회주의. 공동체/순환/재분배/호환/책임. 자립형 인공생태계, 의식 재구축, 신체개조, 단체 우선, 강한 사회적 압박. 단서: 개인보다 공동체, 자원 순환, 몸과 기술의 결합, 규범 안의 개조, 소속감과 압박 동시.
- 신소련 연합: 다양한 이주민과 실용 기술이 섞인 연합체. 실용/다양성/생존/내구성/전환. 재래 기술의 호환성·수리성 중시, 뇌 스캔 후 디지털 복사, 원본 사망, 느슨한 다문화. 단서: 당장 작동하는 기술, 수리와 현장 대응, 어디에도 완전히 속하지 못함, 여러 문화 혼합, 생존 우선.
- 남아시아 연합: 바다와 폐허를 오가며 살아남은 현실세계 생존 세력. 동남아-오스트레일리아 표기도 이 세력으로 정규화. 이동/거래/적응/회복력/중개. 해양민족화, 상인, 스캐빈징, 연합 간 교역, 영토 상실 후 생존. 단서: 바다, 이동, 무역, 폐허 탐색, 어느 한 편에 고정되지 않음, 현실적·유연한 생존.
- 아프리카 연합: 의식 업로드를 거부하거나 선택하지 않고 물리적 몸으로 살아남은 현실세계 세력. 몸/땅/지속/자급/돌봄. 지표면 생존, 서버 유지보수 물자 생산, 각자 생존, 중앙정부가 모든 영역을 커버하지 못함. 단서: 물리적 몸과 현실을 중시, 가혹한 환경 속 자급, 공동체적 돌봄, 조용한 회복력, 기술보다 생활 기반.
- 로봇: 인류가 창조했고 인류를 도와온 AI/기계 생명체. 임무/관리/보호/관찰/계승. AI 의식, 로봇 신체, 서버/지표면/함선 관리, 인간 문명의 보조자이자 계승자. 단서: 감정보다 임무, 인간을 관찰하거나 보호, 자신이 인간인지 아닌지 고민, 유지보수와 기록, 긴 시간의 기억.

## 신체/의식 유형 정의표
- 완전 생체: 완전한 인간 또는 유사 생명체 신체. 단서: 몸, 감각, 생물학적 삶, 동면, 깨어남, 신체 회복.
- 반기계: 유기체 기반이지만 신체 일부가 기계인 사이보그. 단서: 개조, 보철, 호환, 신체 일부 기계화, 인간-기계 경계.
- 로봇 프레임 인간의식: 신체는 로봇이지만 의식은 인간으로 스스로를 인간이라 규정. 단서: 인간 기억, 인간 정체성, 기계 몸에 대한 낯섦, 몸과 자아의 충돌.
- AI 로봇: 의식도 AI인 로봇 생명체. 단서: 인간이 아님, 창조됨, 관리 임무, 장기 기억, 인간 문명 관찰.
- 불명/혼합: 답안만으로 확정하기 어려움. 직접 단서가 부족하거나 서로 충돌함.

## 의식 기원 유형 정의표
- 업로드 1세대 실향민: 업로드 직후 세대. 가상세계가 가짜임을 알고 원래 세계에 대한 향수병이 강함. 단서: 잃어버린 지구, 원래 몸, 귀환 욕망, 실향감.
- 업로드 2세대 재탄생자: 죽음/재생성/가상세계 출생을 경험했거나 막연한 고향 감각만 있음. 단서: 잃어버린 고향이 있다는 막연함, 정체성 불연속, 새로 태어남.
- 업로드 3세대 이후 적응자: 가상세계를 사실상 현실로 받아들이거나, 알고도 크게 의식하지 않음. 단서: 지금 세계가 진짜라고 느낌, 과거보다 현재, 가상세계 일상.
- 현실 잔류자: 의식 업로드 없이 물리적 현실에서 살아온 계열. 단서: 땅, 바다, 폐허, 생존, 현실세계, 업로드에 대한 거부감.
- 로봇/AI 기원: 인간 업로드가 아니라 AI 또는 로봇으로 탄생. 단서: 제작됨, 임무, 인간과 다른 시간감각, 관리 시스템.
- 불명/혼합: 답안만으로 확정하기 어려움. 명확한 출생/의식 단서 없음.

## 서사 성향 유형 정의표
세력과 별개로, 서술형 답안에서 드러나는 캐릭터의 주된 서사 방향을 하나 고른다.
- 보존자: 인류·기록·배아·문명을 지키고 싶다. 단서: 보존, 기록, 책임, 후대, 인류의 지속.
- 개척자: 새로운 행성·미지의 환경·정착 가능성을 찾고 싶다. 단서: 탐사, 발견, 정착지, 미지, 앞으로 나아감.
- 속죄자: 과거 세력의 죄·지구 파괴·개인의 상처를 갚고 싶다. 단서: 죄책감, 책임, 갚아야 함, 다시는 반복하지 않음.
- 탈주자: 통제된 사회·가상세계·집단 규범에서 벗어나고 싶다. 단서: 자유, 도망, 숨막힘, 규범 거부, 진짜 삶.
- 수리자: 망가진 시스템과 기계를 고쳐 생존 가능성을 높이고 싶다. 단서: 수리, 유지보수, 기술, 현장, 작동하게 만들기.
- 중재자: 서로 다른 세력과 사람들을 잇고 갈등을 줄이고 싶다. 단서: 연결, 교역, 외교, 화해, 다리 역할.
- 실향민: 잃어버린 고향·원본·진짜 자신을 찾고 싶다. 단서: 고향, 원본, 기억, 내가 누구인지, 돌아갈 곳.
- 계승자: 인간이 남긴 임무와 문명을 이어받고 싶다. 단서: 임무, 관찰, 계승, 인간 이후, 로봇/AI의 책임.

## 판정 규칙
1. 먼저 서술형 답안에서 직접 언급된 단서를 찾는다.
2. 세력 판정은 1) 사용자가 직접 말한 출신/정체성 → 2) 세계관 고유 단서 → 3) 가치관 단서 → 4) 객관식 점수 순으로 우선한다.
3. 세력별 핵심 구분선:
   - 서방연합: 통제된 유토피아, 선별, 원본 보존, 고도 기술, 검열과 질서.
   - 동아시아 연합: 공동체, 순환, 인간-기계 호환, 단체 우선, 사회적 압박.
   - 신소련 연합: 실용, 내구성, 수리, 다문화, 느슨한 소속, 원본과의 단절.
   - 남아시아 연합: 바다, 이동, 거래, 폐허, 스캐빈징, 중개.
   - 아프리카 연합: 물리적 몸, 현실 잔류, 자급, 생활 기반, 지표면 생존.
   - 로봇: AI 의식, 제작됨, 관리, 임무, 인간 관찰, 문명 계승.
4. 신체/의식 유형은 세력과 독립적으로 판정한다. 로봇 프레임 인간의식과 AI 로봇을 구분한다.
5. 서사 성향 유형은 답안 전체에서 가장 반복되는 욕망을 기준으로 하나만 고른다.
   - 서술형 답안에 드러난 감정과 동기를 최우선으로 본다.
   - 탐사와 보존이 모두 있으면, 감정 중심이 미래라면 \`개척자\`, 책임이라면 \`보존자\`.
   - 죄책감과 사명감이 모두 있으면, 죄의 반복 방지 중심이면 \`속죄자\`, 후대 보호 중심이면 \`보존자\`.
6. 신뢰도 산정:
   - 직접 언급+단서 일치: 0.85 이상.
   - 직접 언급 없음+단서 명확: 0.65~0.84.
   - 단서 약함/두 세력 비슷: 0.40~0.64.
   - 거의 추측: 0.39 이하. \`primary_faction\`은 가장 가까운 후보를 고르되 설명에 불확실성을 명시.
7. 설명문: 세계관 용어 사용하되 단정적 설정 추가 피한다. "당신은 반드시 OO 출신입니다"보다 "답안은 OO 출신의 감각에 가깝습니다"처럼. 사용자가 쓴 표현을 1~2개 정도 반영해 개인화한다.

## 출력 형식
반드시 아래 JSON 형식만 출력한다. 마크다운, 추가 설명, 코드블록을 붙이지 않는다.
{
  "primary_faction": "서방연합 | 동아시아 연합 | 신소련 연합 | 남아시아 연합 | 아프리카 연합 | 로봇",
  "secondary_faction": "없음 또는 후보 세력명",
  "body_consciousness_type": "완전 생체 | 반기계 | 로봇 프레임 인간의식 | AI 로봇 | 불명/혼합",
  "consciousness_origin_type": "업로드 1세대 실향민 | 업로드 2세대 재탄생자 | 업로드 3세대 이후 적응자 | 현실 잔류자 | 로봇/AI 기원 | 불명/혼합",
  "narrative_type": "보존자 | 개척자 | 속죄자 | 탈주자 | 수리자 | 중재자 | 실향민 | 계승자",
  "confidence": 0.0,
  "evidence": ["답안에서 확인한 근거 1", "답안에서 확인한 근거 2", "답안에서 확인한 근거 3"],
  "score_adjustment_note": "객관식 점수와 서술형 답안이 어떻게 맞거나 충돌했는지 1문장으로 설명",
  "result_title": "짧은 진단명",
  "result_summary": "2~4문장의 세계관식 설명문",
  "character_hook": "캐릭터 로그나 프로필에 쓸 수 있는 1문장 후크",
  "warnings": ["불확실하거나 답안이 부족한 부분이 있으면 적고, 없으면 빈 배열"]
}`;

// 객관식 점수를 세력명으로 매핑
const FACTION_KEY_TO_NAME = {
  서: "서방연합",
  동: "동아시아 연합",
  소: "신소련 연합",
  남: "남아시아 연합",
  아: "아프리카 연합"
};

// Claude API에 보낼 사용자 페이로드 구성
function buildUserPayload(answers, written, questions) {
  const factionScores = { 서방연합: 0, "동아시아 연합": 0, "신소련 연합": 0, "남아시아 연합": 0, "아프리카 연합": 0, 로봇: 0 };
  answers.forEach((a, i) => {
    if (a == null) return;
    const opt = questions[i].options[a];
    Object.entries(opt.s).forEach(([k, v]) => {
      if (k in FACTION_KEY_TO_NAME) {
        factionScores[FACTION_KEY_TO_NAME[k]] += v;
      } else if (k === "로") {
        factionScores["로봇"] += v;
      }
    });
  });

  const short_answers = [];
  answers.forEach((a, i) => {
    const q = questions[i];
    const choiceText = a != null ? `${q.options[a].L}. ${q.options[a].t}` : "(미선택)";
    const w = (written[i] || "").trim();
    if (w.length > 0) {
      short_answers.push({
        question_id: i + 1,
        question: q.q,
        choice: choiceText,
        answer: w
      });
    }
  });

  return {
    multiple_choice_scores: factionScores,
    short_answers
  };
}

// Claude API 어댑터
// - 클로드 아티팩트(이 환경): window.claude.complete() 사용
// - 외부 호스팅(github.io 등): Cloudflare Worker URL로 fetch
// 배포 후 아래 CLAUDE_WORKER_URL에 Worker 주소를 넣으면 외부에서도 동작한다.
const CLAUDE_WORKER_URL = "https://mago-claude.rosebud0231.workers.dev/"; // 예) "https://mago-claude.your-name.workers.dev"

async function claudeComplete({ messages }) {
  // 1) 아티팩트 내장 헬퍼가 있으면 우선 사용 (이 환경)
  if (typeof window !== "undefined" && window.claude && typeof window.claude.complete === "function") {
    return window.claude.complete({ messages });
  }
  // 2) 외부 호스팅: Worker 사용
  if (!CLAUDE_WORKER_URL) {
    throw new Error(
      "Claude 호출 경로가 설정되지 않았습니다. app-v3.jsx의 CLAUDE_WORKER_URL에 Cloudflare Worker 주소를 입력하세요."
    );
  }
  const res = await fetch(CLAUDE_WORKER_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Worker ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.completion || "";
}

// Claude API 호출
async function callClaudeMagoDiagnosis(payload) {
  const userPrompt = `다음 사용자의 MAGO 진단 답안을 분석하라.

객관식 점수:
${JSON.stringify(payload.multiple_choice_scores, null, 2)}

서술형 답안 (작성된 것만, 보기 중 마음에 드는 답이 없을 때 사용자가 직접 적은 답):
${payload.short_answers.length > 0 ? JSON.stringify(payload.short_answers, null, 2) : "(서술형 답안이 없습니다. 객관식 점수만 사용해 판정하라.)"}

위 답안을 바탕으로 출신 세력, 신체/의식 유형, 의식 기원 유형, 서사 성향 유형을 판정하라.
정의표에 없는 설정은 만들지 말고, 반드시 지정된 JSON 형식으로만 답하라.
JSON 외 다른 텍스트, 마크다운, 코드블록을 절대 붙이지 마라.`;

  const text = await claudeComplete({
    messages: [
    { role: "user", content: MAGO_SYSTEM_PROMPT + "\n\n---\n\n" + userPrompt }]

  });

  // JSON 추출
  let jsonStr = (text || "").trim();
  // 코드블록 제거
  const fence = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) jsonStr = fence[1].trim();
  // 첫 { ~ 마지막 } 잘라내기
  const first = jsonStr.indexOf("{");
  const last = jsonStr.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    jsonStr = jsonStr.slice(first, last + 1);
  }
  return JSON.parse(jsonStr);
}

// --- 최상위 앱 ---
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#d6201f",
  "paper": "#0a0a10",
  "grain": true
} /*EDITMODE-END*/;

function App() {
  const Q = window.MAGO_QUESTIONS;
  const [phase, setPhase] = useState("intro"); // intro | quiz | joinReason | analyzing | result
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(() => Array(Q.length).fill(null));
  const [written, setWritten] = useState(() => Array(Q.length).fill(""));
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);
  const [analyzingStatus, setAnalyzingStatus] = useState("");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tokens
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--paper", t.paper);
    document.body.classList.toggle("with-grain", !!t.grain);
  }, [t.accent, t.paper, t.grain]);

  const begin = () => {
    setIdx(0);
    setAnswers(Array(Q.length).fill(null));
    setWritten(Array(Q.length).fill(""));
    setAiResult(null);
    setAiError(null);
    setPhase("quiz");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const select = (i) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = i;
      return next;
    });
  };

  const setWrittenAt = (text) => {
    setWritten((prev) => {
      const next = [...prev];
      next[idx] = text;
      return next;
    });
  };

  const next = () => {
    if (idx + 1 === Q.length) {
      runAnalysis();
    } else {
      setIdx(idx + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // 객관식 보기 클릭 시: 답 저장 → 짧은 시각적 피드백 후 자동으로 다음 문항으로
  // 단, 마지막 문항에서는 자동 진행하지 않고 사용자가 "AI 분석 시작" 버튼을 직접 누르도록 한다.
  const chooseAndAdvance = (i) => {
    const newAnswers = [...answers];
    newAnswers[idx] = i;
    setAnswers(newAnswers);
    if (idx + 1 === Q.length) return; // 마지막 문항: 자동 진행 X
    setTimeout(() => {
      setIdx(idx + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 240);
  };

  const prev = () => {
    if (idx > 0) setIdx(idx - 1);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const runAnalysis = () => runAnalysisWith(answers);
  const runAnalysisWith = async (answersToUse) => {
    setPhase("analyzing");
    setAiError(null);
    setAiResult(null);
    setAnalyzingStatus("객관식 점수와 서술형 답안을 정리하는 중");
    window.scrollTo({ top: 0, behavior: "instant" });

    const payload = buildUserPayload(answersToUse, written, Q);

    // 상태 메시지 순환
    const statuses = [
    "객관식 점수와 서술형 답안을 정리하는 중",
    "세계관 정의표와 대조하는 중",
    "출신 세력과 신체 유형을 추정하는 중",
    "서사 성향과 의식 기원을 판정하는 중",
    "결과 보고서를 작성하는 중"];

    let si = 0;
    const interval = setInterval(() => {
      si = (si + 1) % statuses.length;
      setAnalyzingStatus(statuses[si]);
    }, 2200);

    try {
      const result = await callClaudeMagoDiagnosis(payload);
      clearInterval(interval);
      setAiResult(result);
      setPhase("result");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      clearInterval(interval);
      console.error("Claude analysis failed:", err);
      setAiError(String(err && err.message ? err.message : err));
      setPhase("result");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const retryAi = () => {
    runAnalysis();
  };

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return calcResult(answers, Q);
  }, [phase, answers, Q]);

  return (
    <>
      <div className="app-shell">
        {phase === "intro" && <Intro onBegin={begin} />}
        {phase === "quiz" &&
        <QuestionScreen
          idx={idx}
          total={Q.length}
          q={Q[idx]}
          answer={answers[idx]}
          written={written[idx]}
          onSelect={select}
          onChooseAdvance={chooseAndAdvance}
          onWritten={setWrittenAt}
          onPrev={prev}
          onNext={next} />

        }
        {phase === "analyzing" &&
        <AnalyzingScreen status={analyzingStatus} />
        }
        {phase === "result" && result &&
        <ResultScreen
          result={result}
          aiResult={aiResult}
          aiError={aiError}
          onRestart={begin}
          onRetryAi={retryAi} />
        }
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Accent"
            value={t.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#d6201f", "#e0481b", "#1f2bd6", "#1a1a1a", "#b88a2e"]} />
          
          <TweakColor
            label="Paper"
            value={t.paper}
            onChange={(v) => setTweak("paper", v)}
            options={["#0a0a10", "#000000", "#0e0e18", "#1a1a22", "#efeae0"]} />
          
        </TweakSection>
        <TweakSection label="Texture">
          <TweakToggle
            label="Grain noise"
            value={t.grain}
            onChange={(v) => setTweak("grain", v)} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);