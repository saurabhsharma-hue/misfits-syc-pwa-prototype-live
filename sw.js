const CACHE_NAME = "misfits-syc-pwa-v5";
const BASE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const withBase = (path) => `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

const SHELL_ASSETS = [
  "/",
  "/host-entry/",
  "/start-your-club/",
  "/manifest.json",
  "/icon.png",
  "/app_icon.png",
  "/start-your-club/miffy_wave.svg",
  "/start-your-club/misfits_logo.png",
  "/start-your-club/story-photo-1.jpg",
  "/start-your-club/story-photo-2.jpg",
  "/start-your-club/story-photo-3.jpg",
  "/start-your-club/unhinged-black.png",
  "/start-your-club/clubs-black.png",
  "/images/mascot_logo.svg"
].map(withBase);

const state = {
  nextApplicationPk: 1001,
  nextVerificationPk: 501,
  nextDraftPk: 701,
  nextFilePk: 9001,
  nonces: {},
  sessions: {}
};

const cities = [
  { id: 1, name: "Bangalore", state: "Karnataka" },
  { id: 2, name: "Delhi", state: "Delhi" },
  { id: 3, name: "Mumbai", state: "Maharashtra" },
  { id: 4, name: "Gurgaon", state: "Haryana" },
  { id: 5, name: "Noida", state: "Uttar Pradesh" },
  { id: 6, name: "Pune", state: "Maharashtra" },
  { id: 7, name: "Hyderabad", state: "Telangana" }
];

const areasByCity = {
  1: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield", "JP Nagar", "Bellandur"],
  2: ["North Delhi", "South Delhi", "East Delhi", "West Delhi", "New Delhi", "Central Delhi"],
  3: ["Bandra", "Andheri", "Lower Parel", "Powai", "Juhu"],
  4: ["Sector 29", "Sector 43", "Sector 56", "Golf Course Road", "Cyber Hub"],
  5: ["Sector 50", "Sector 62", "Sector 104", "Greater Noida", "Noida Extension"],
  6: ["Koregaon Park", "Kalyani Nagar", "Baner", "Viman Nagar"],
  7: ["Jubilee Hills", "Hitech City", "Gachibowli", "Banjara Hills"]
};

const activities = [
  { id: 1, name: "Badminton", emoji: "🏸" },
  { id: 2, name: "Boardgaming", emoji: "🎲" },
  { id: 3, name: "Book Club", emoji: "📚" },
  { id: 4, name: "Chess", emoji: "♟️" },
  { id: 5, name: "Dance", emoji: "💃" },
  { id: 6, name: "Film", emoji: "🎬" },
  { id: 7, name: "Football", emoji: "⚽" },
  { id: 8, name: "Running", emoji: "🏃" },
  { id: 9, name: "Social Deduction", emoji: "🕵️" },
  { id: 10, name: "Others", emoji: "🔸" }
];

const audienceOptions = {
  kind: "audience",
  allow_custom: true,
  categories: [
    {
      key: "who",
      label: "Who they are",
      emoji: "👤",
      hint: "women, parents, LGBTQ+...",
      chips: [
        { key: "women_only", label: "Women only", emoji: "👩" },
        { key: "moms", label: "Moms", emoji: "👩‍👧" },
        { key: "lgbtq", label: "LGBTQ+", emoji: "🏳️‍🌈" },
        { key: "parents", label: "Parents", emoji: "👨‍👩‍👧" },
        { key: "students", label: "Students", emoji: "🎓" },
        { key: "age_20_30", label: "20-30", emoji: "🎂" }
      ]
    },
    {
      key: "do",
      label: "What they do",
      emoji: "💼",
      hint: "CAs, founders, doctors...",
      chips: [
        { key: "cas", label: "CAs only", emoji: "🧮" },
        { key: "lawyers", label: "Lawyers", emoji: "⚖️" },
        { key: "founders", label: "Founders", emoji: "🚀" },
        { key: "doctors", label: "Doctors", emoji: "🩺" }
      ]
    },
    {
      key: "skill",
      label: "Skill level",
      emoji: "🎯",
      hint: "beginners, intermediate...",
      chips: [
        { key: "beginners", label: "Beginners", emoji: "🌱" },
        { key: "intermediate", label: "Intermediate", emoji: "📈" },
        { key: "advanced", label: "Advanced", emoji: "🏆" }
      ]
    }
  ]
};

const syc2Questions = [
  { pk: 201, section: "syc2_setup", question_order: 1, question_text: "Which city are you in, and what's your club about?", question_type: "city_activity", options: null, helper_text: "Your city, and the thing your club is built around - chess, running, books, anything at all. Can't spot yours? Just type it and add your own.", is_required: true },
  { pk: 202, section: "syc2_setup", question_order: 2, question_text: "Who's your club for?", question_type: "audience", options: audienceOptions, helper_text: "Is it open to everyone, or for a certain group - like beginners, or women, or a specific crowd? Just tell us who you have in mind.", is_required: true },
  { pk: 203, section: "syc2_you", question_order: 3, question_text: "Why do you want to run a club?", question_type: "long_text", options: null, helper_text: "We're curious about the spark - was there a moment, a gap you kept feeling, something you wished existed? The real reason, not the polished one.", is_required: true },
  { pk: 204, section: "syc2_you", question_order: 4, question_text: "How long have you been into this activity?", question_type: "mcq", options: ["Just getting into it", "1-3 years", "3-5 years", "5+ years"], helper_text: "Tell us roughly how long you've been into it yourself. There is genuinely no wrong answer here.", is_required: true },
  { pk: 205, section: "syc2_you", question_order: 5, question_text: "Have you run a group or community before?", question_type: "leadership_gate", options: null, helper_text: "Any group, club, or regular hangout you've organised - even a small WhatsApp group counts. Running one right now? We'd love its name and a bit about it.", is_required: true },
  { pk: 206, section: "syc2_club", question_order: 6, question_text: "What kinds of things will your club do?", question_type: "long_text", options: null, helper_text: "The different ways you'll bring people together - maybe regular meetups, a trip here and there, a friendly tournament, or a bigger event once in a while. Tell us everything you're picturing.", is_required: true },
  { pk: 207, section: "syc2_club", question_order: 7, question_text: "What's a typical meetup like?", question_type: "format_gate", options: null, helper_text: "Walk us through a regular meetup from start to end, so we can picture what actually happens. If you haven't figured it out yet, that is completely fine.", is_required: true },
  { pk: 208, section: "syc2_club", question_order: 8, question_text: "Would you be up for hosting 1-2 meetups every week?", question_type: "mcq", options: ["Yes, definitely", "Yes, at least 1 per week", "Maybe, depends on my schedule", "Not sure I can commit to that"], helper_text: "Be honest about your life - whatever you'd genuinely show up for. We'd rather know the real answer than the impressive one.", is_required: true },
  { pk: 209, section: "syc2_proof", question_order: 9, question_text: "Got somewhere we can see your community?", question_type: "text", options: null, helper_text: "Drop a link if you have one - Instagram, a WhatsApp group, Reddit, Discord, anything. Just starting out? No worries at all, leave it blank.", is_required: false }
];

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers || {}) }
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function nowIso() {
  return new Date().toISOString();
}

function apiPath(url) {
  let path = url.pathname;
  if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) path = path.slice(BASE_PATH.length);
  return path.replace(/^\/api\/?/, "").replace(/^v1\/?/, "");
}

function tokenFromRequest(request) {
  const header = request.headers.get("authorization") || "";
  return header.replace(/^Bearer\s+/i, "");
}

function makeUser(phone) {
  const normalized = String(phone || "919999999999").replace(/\D/g, "").replace(/^91/, "").slice(-10) || "9999999999";
  return {
    id: Number(`1${normalized.slice(-5)}`),
    name: { first: "Aastha", last: "", full: "Aastha" },
    phone: normalized,
    phoneNumber: normalized,
    is_admin: true
  };
}

function sessionFromRequest(request) {
  const token = tokenFromRequest(request);
  if (!token) return null;
  if (!state.sessions[token]) {
    state.sessions[token] = { user: makeUser(token), token };
  }
  return state.sessions[token];
}

function requireSession(request) {
  const session = sessionFromRequest(request);
  return session ? { session } : { response: json({ message: "Unauthorized" }, { status: 401 }) };
}

function makeApplication(session, source = "pwa-prototype") {
  const t = nowIso();
  return {
    pk: state.nextApplicationPk++,
    user_id: session.user.id,
    source,
    status: "ACTIVE",
    kind: "club",
    awareness: "",
    city_id: null,
    activity_id: null,
    questionnaire_data: {},
    rejection_reason: "",
    exit_type: "",
    screening_ratings: null,
    first_call_done: false,
    venue_sorted: false,
    marketing_launched: false,
    toolkit_shared: false,
    first_call_done_at: null,
    venue_sorted_at: null,
    marketing_launched_at: null,
    toolkit_shared_at: null,
    archived: false,
    created_at: t,
    updated_at: t,
    last_screen: null,
    last_story_slide: null,
    last_question_index: null,
    last_question_section: null,
    total_questions: null,
    abandoned_at: null,
    admin_created: false,
    interview_scheduled_at: null,
    calendly_meet_link: null,
    contract_url: null,
    contract_pdf_url: null,
    signed_contract_url: null,
    created_club_pk: null,
    promoted_container_pk: null
  };
}

function applyQuestionnairePatch(app, body) {
  const data = body.data && typeof body.data === "object" ? body.data : {};
  app.questionnaire_data = { ...app.questionnaire_data, ...data };
  if (typeof body.city === "string" && body.city.trim()) {
    app.city_name = body.city.trim();
    app.city_id = (cities.find((c) => c.name === app.city_name) || {}).id || null;
  }
  if (typeof body.activity === "string" && body.activity.trim()) {
    app.activity_name = body.activity.trim().replace(/^[^\w]+ /, "");
    app.activity_id = (activities.find((a) => a.name === app.activity_name) || {}).id || null;
  }
  app.updated_at = nowIso();
}

async function handleApi(request) {
  const url = new URL(request.url);
  const path = apiPath(url);
  const method = request.method.toUpperCase();
  const authed = sessionFromRequest(request);

  if (method === "GET" && (path === "start-your-club/cities" || path === "leader-onboarding/cities")) return json(cities);
  if (method === "GET" && (path === "start-your-club/activities" || path === "leader-onboarding/activities")) return json(activities);
  if (method === "GET" && path === "start-your-club/questionnaire-config") return json(syc2Questions);
  if (method === "GET" && path === "leader-onboarding/my-clubs") return json([]);

  const areaMatch = path.match(/^leader-onboarding\/cities\/(\d+)\/areas$/);
  if (method === "GET" && areaMatch) {
    const cityId = Number(areaMatch[1]);
    return json((areasByCity[cityId] || []).map((name, index) => ({ id: cityId * 100 + index + 1, name })));
  }

  if (method === "GET" && path === "leader-onboarding/locations/search") {
    const q = (url.searchParams.get("q") || "").toLowerCase();
    return json([
      { id: 301, name: "Clayworks Indiranagar", url: "https://maps.google.com", area_name: "Indiranagar", city_name: "Bangalore" },
      { id: 302, name: "Dialogues Cafe JP Nagar", url: "https://maps.google.com", area_name: "JP Nagar", city_name: "Bangalore" },
      { id: 303, name: "The Social HSR", url: "https://maps.google.com", area_name: "HSR Layout", city_name: "Bangalore" }
    ].filter((loc) => !q || loc.name.toLowerCase().includes(q) || loc.area_name.toLowerCase().includes(q)));
  }

  if (method === "GET" && path === "leader-onboarding/bank-details") {
    return json({ has_bank_details: true, bank_name: "HDFC Bank", invoice_email: "demo@misfits.in" });
  }

  if (method === "GET" && path === "users/me") {
    const { session, response } = requireSession(request);
    if (response) return response;
    return json({ user: session.user, is_admin: true });
  }

  if (method === "GET" && path === "start-your-club/me") {
    const { session, response } = requireSession(request);
    if (response) return response;
    const apps = session.application ? [session.application] : [];
    return json({ exists: apps.length > 0, application: session.application || null, applications: apps, is_admin: true });
  }

  if (method === "GET" && path === "leader-onboarding/verifications/event-host") {
    return json({ exists: !!authed?.verification, verification: authed?.verification || null });
  }

  if (method === "GET" && path === "event-host-drafts/me") {
    return json({ exists: !!authed?.eventDraft, draft: authed?.eventDraft || null });
  }

  if (method === "GET" && path === "hosted-events/me/event-status") {
    return json({ exists: !!authed?.eventState, event: authed?.eventState || null });
  }

  if (method === "POST" && path === "auth/generate") {
    const body = await readJson(request);
    const nonce = `nonce-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    state.nonces[nonce] = { phone: String(body.phone || "919999999999") };
    return json({ nonce });
  }

  if (method === "POST" && path === "auth/validate") {
    const body = await readJson(request);
    const phone = (state.nonces[String(body.nonce || "")] || {}).phone || "919999999999";
    const token = `demo-token-${String(phone).replace(/\D/g, "").slice(-10)}`;
    const user = makeUser(phone);
    state.sessions[token] = state.sessions[token] || { user, token };
    return json({ user, token });
  }

  if (method === "POST" && path === "auth/otp/send") {
    const body = await readJson(request);
    const nonce = `nonce-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    state.nonces[nonce] = { phone: String(body.phone || "9999999999") };
    return json({ nonce });
  }

  if (method === "POST" && path === "auth/otp/verify") {
    const body = await readJson(request);
    const phone = (state.nonces[String(body.nonce || "")] || {}).phone || "9999999999";
    const token = `demo-token-${String(phone).replace(/\D/g, "").slice(-10)}`;
    const user = makeUser(phone);
    state.sessions[token] = state.sessions[token] || { user, token };
    return json({ success: true, token, isNewUser: false, user, is_admin: true });
  }

  if (method === "POST" && path === "start-your-club/start") {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    session.application = session.application || makeApplication(session, String(body.source || "pwa-prototype"));
    if (typeof body.name === "string" && body.name.trim()) {
      session.user.name = { first: body.name.trim().split(/\s+/)[0], last: "", full: body.name.trim() };
    }
    session.application.updated_at = nowIso();
    return json({ exists: true, application: session.application });
  }

  const questionnaireMatch = path.match(/^start-your-club\/(\d+)\/questionnaire$/);
  if (method === "PATCH" && questionnaireMatch) {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    const app = session.application;
    if (!app || app.pk !== Number(questionnaireMatch[1])) return json({ message: "Application not found" }, { status: 404 });
    applyQuestionnairePatch(app, body);
    return json(app);
  }

  const submitMatch = path.match(/^start-your-club\/(\d+)\/submit$/);
  if (method === "POST" && submitMatch) {
    const { session, response } = requireSession(request);
    if (response) return response;
    const app = session.application;
    if (!app || app.pk !== Number(submitMatch[1])) return json({ message: "Application not found" }, { status: 404 });
    app.status = "SUBMITTED";
    app.updated_at = nowIso();
    return json({ application: app, message: "Application submitted" });
  }

  const exitMatch = path.match(/^start-your-club\/(\d+)\/exit$/);
  if (method === "PATCH" && exitMatch) {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    const app = session.application;
    if (!app || app.pk !== Number(exitMatch[1])) return json({ message: "Application not found" }, { status: 404 });
    app.status = app.status === "ACTIVE" ? "ABANDONED" : app.status;
    app.exit_type = String(body.exit_type || "");
    app.last_screen = typeof body.last_screen === "string" ? body.last_screen : app.last_screen;
    app.abandoned_at = nowIso();
    app.updated_at = nowIso();
    return json(app);
  }

  if (method === "POST" && path === "leader-onboarding/verifications/event-host") {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    const t = nowIso();
    session.verification = {
      id: state.nextVerificationPk++,
      subject_type: "EVENT_HOST",
      subject_id: session.user.id,
      method: "INSTAGRAM",
      status: "IN_REVIEW",
      instagram_handle: typeof body.instagram_handle === "string" ? body.instagram_handle : "",
      answers: body.answers && typeof body.answers === "object" ? body.answers : {},
      requested_by: session.user.id,
      created_at: t,
      updated_at: t
    };
    return json(session.verification);
  }

  if (method === "POST" && path === "leader-onboarding/verifications/event-host/withdraw") {
    const { session, response } = requireSession(request);
    if (response) return response;
    if (session.verification) {
      session.verification.status = "REVOKED";
      session.verification.updated_at = nowIso();
    }
    session.eventDraft = undefined;
    return json(session.verification || { status: "REVOKED" });
  }

  if (method === "PATCH" && path === "event-host-drafts/me") {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    const t = nowIso();
    session.eventDraft = {
      pk: session.eventDraft?.pk || state.nextDraftPk++,
      created_by: session.user.id,
      meetup_data: { ...(session.eventDraft?.meetup_data || {}), ...(body.meetup_data || {}) },
      application_data: { ...(session.eventDraft?.application_data || {}), ...(body.application_data || {}) },
      status: "ACTIVE",
      created_at: session.eventDraft?.created_at || t,
      updated_at: t
    };
    return json(session.eventDraft);
  }

  if (method === "DELETE" && path === "event-host-drafts/me") {
    const { session, response } = requireSession(request);
    if (response) return response;
    session.eventDraft = undefined;
    return new Response(null, { status: 204 });
  }

  if (method === "POST" && path === "hosted-events") {
    const { session, response } = requireSession(request);
    if (response) return response;
    const body = await readJson(request);
    const t = nowIso();
    session.verification = session.verification || {
      id: state.nextVerificationPk++,
      subject_type: "EVENT_HOST",
      subject_id: session.user.id,
      method: "INSTAGRAM",
      status: "IN_REVIEW",
      instagram_handle: typeof body.instagram_handle === "string" ? body.instagram_handle : "",
      answers: {},
      requested_by: session.user.id,
      created_at: t,
      updated_at: t
    };
    session.eventState = {
      event_id: "demo-event-1",
      club_id: "demo-host-club",
      status: "PENDING",
      name: String(session.eventDraft?.meetup_data?.name || "Investor Demo Meetup"),
      description: String(session.eventDraft?.meetup_data?.description || "A demo one-time event created from the PWA prototype."),
      venue_name: "Clayworks Indiranagar",
      start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ticket_price_inr: 499,
      max_people: 30
    };
    return json({ status: "in_review", verification_request_id: session.verification.id });
  }

  if (method === "POST" && path === "file/put-url") {
    const fileId = state.nextFilePk++;
    return json({ fileId, file_id: fileId, s3Url: withBase(`/demo-upload/${fileId}`), s3_url: withBase(`/demo-upload/${fileId}`) });
  }

  if (method === "PUT") return new Response(null, { status: 204 });
  return json({ message: `Unhandled demo ${method} /api/${path}` }, { status: 404 });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS)).catch(() => undefined)
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const scopedApi = BASE_PATH && url.pathname.startsWith(`${BASE_PATH}/api/`);
  const rootApi = url.pathname.startsWith("/api/");

  if (scopedApi || rootApi) {
    event.respondWith(handleApi(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(withBase("/")) || caches.match(withBase("/start-your-club/")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
