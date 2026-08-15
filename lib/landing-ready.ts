export const SOZU_LANDING_READY_EVENT = "sozu:landing-ready"

let landingReadySignaled = false

export function signalLandingReady() {
  if (typeof window === "undefined" || landingReadySignaled) return
  landingReadySignaled = true
  window.dispatchEvent(new Event(SOZU_LANDING_READY_EVENT))
}
