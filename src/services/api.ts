export interface ApiResult<T = unknown> { ok: boolean; data?: T; error?: string }
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function submitContact(payload: unknown): Promise<ApiResult> {
  try { await sleep(900); return { ok: true, data: { id: crypto.randomUUID(), payload } }; }
  catch (err) { return { ok: false, error: err instanceof Error ? err.message : "Unknown error" }; }
}
export async function submitAdmission(payload: unknown): Promise<ApiResult> {
  try { await sleep(1100); return { ok: true, data: { applicationId: `ADA-${Date.now().toString(36).toUpperCase()}`, payload } }; }
  catch (err) { return { ok: false, error: err instanceof Error ? err.message : "Unknown error" }; }
}
