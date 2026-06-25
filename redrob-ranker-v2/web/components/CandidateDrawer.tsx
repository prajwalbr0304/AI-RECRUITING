"use client";
import type { Detail } from "@/lib/types";
import { IconClose } from "./icons";

const CK = ["semantic_seer", "name_rectifier", "evidence_scout", "mask_piercer", "path_reader", "terrain_master"] as const;
const LABEL: Record<string, string> = {
  semantic_seer: "Role-Signal Alignment", name_rectifier: "Title Calibration Index", evidence_scout: "Delivery Velocity",
  mask_piercer: "Declared vs. Demonstrated Skill", path_reader: "Tenure & Progression Depth", terrain_master: "Domain Density",
};

export default function CandidateDrawer({ d, loading, onClose }:
  { d: Detail | null; loading: boolean; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[1px]" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-pop border-l border-line overflow-y-auto animate-[slidein_.2s_ease]">
        <style>{`@keyframes slidein{from{transform:translateX(20px);opacity:.4}to{transform:none;opacity:1}}`}</style>
        {loading || !d ? (
          <div className="p-8 text-ink-faint">Loading candidate…</div>
        ) : (
          <div>
            <div className="sticky top-0 bg-white border-b border-line px-7 py-6 flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-brand-wash text-brand-dark grid place-items-center font-extrabold text-xl">
                #{d.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-2xl leading-tight">{d.title}</div>
                <div className="text-lg text-ink-faint">{d.candidate_id} · {d.yoe ?? "—"} yrs · {d.location || "—"}</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-brand">{d.score.toFixed(0)}</div>
                <div className="text-sm uppercase tracking-wide text-ink-faint">Relevance</div>
              </div>
              <button onClick={onClose} className="ml-1 text-ink-faint hover:text-ink p-1"><IconClose className="h-7 w-7" /></button>
            </div>

            <div className="p-7 space-y-10">
              <div className="rounded-lg bg-brand-wash/60 border border-brand/15 px-6 py-5 text-lg text-ink-soft">
                <span className="font-semibold text-brand-dark">Grounded reasoning. </span>{d.reasoning}
              </div>

              <div>
                <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-4">Council of Nine</div>
                <div className="space-y-5">
                  {CK.map((k) => (
                    <div key={k}>
                      <div className="flex justify-between text-lg">
                        <span className="text-ink-soft">{LABEL[k]}</span>
                        <span className="font-semibold tabular-nums">{((d.council[k] ?? 0) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden mt-2">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${(d.council[k] ?? 0) * 100}%` }} />
                      </div>
                      {d.rationales[LABEL[k]] && (
                        <div className="text-base text-ink-faint mt-2">{d.rationales[LABEL[k]]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {d.summary && (
                <div>
                  <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-3">Summary</div>
                  <p className="text-lg text-ink-soft leading-relaxed">{d.summary}</p>
                </div>
              )}

              <div>
                <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-4">Verified relevant skills</div>
                <div className="flex flex-wrap gap-3">
                  {d.verified_skills.length ? d.verified_skills.map((s) => (
                    <span key={s} className="pill bg-positive/10 text-positive">{s}</span>
                  )) : <span className="text-lg text-ink-faint">None verified</span>}
                </div>
                <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-4 mt-5">All listed skills</div>
                <div className="flex flex-wrap gap-3">
                  {d.all_skills.map((s) => <span key={s} className="pill bg-gray-100 text-ink-muted">{s}</span>)}
                </div>
              </div>

              {d.education?.length > 0 && (
                <div>
                  <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-3">Education</div>
                  {d.education.map((e, i) => (
                    <div key={i} className="text-lg text-ink-soft">{e.degree} {e.field} — {e.institution} <span className="text-ink-faint">({e.tier})</span></div>
                  ))}
                </div>
              )}

              <div>
                <div className="text-base font-bold uppercase tracking-wide text-ink-faint mb-4">Career timeline</div>
                <div className="space-y-5">
                  {d.career.map((r, i) => (
                    <div key={i} className="border-l-2 border-line pl-5">
                      <div className="text-lg font-semibold">{r.title} · <span className="font-normal text-ink-soft">{r.company}</span></div>
                      <div className="text-base text-ink-faint">{r.start} → {r.end} · {r.months} mo</div>
                      <div className="text-base text-ink-muted mt-2 leading-relaxed">{r.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
