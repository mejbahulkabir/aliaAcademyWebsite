import { submitContact as apiSubmitContact, submitAdmission as apiSubmitAdmission } from "@/lib/api-client";

export interface ApiResult<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

export async function submitContact(payload: unknown): Promise<ApiResult> {
  return apiSubmitContact(payload);
}

export async function submitAdmission(payload: unknown): Promise<ApiResult> {
  return apiSubmitAdmission(payload);
}
