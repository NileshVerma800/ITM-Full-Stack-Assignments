/* ===== Student Registration & Result Management System ===== */
const SUBJECTS = ["Mathematics", "Programming", "Database", "Networks", "Web Technology"];
const PASS_MARK = 35, KEY = "students";
const $ = id => document.getElementById(id);
let memory = [];            // fallback if localStorage is blocked
let filter = "all";
let lastStudent = null;

/* ---------- Local Storage (JSON) ---------- */
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch (e) { return memory; }
}
function save(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); }   // object -> JSON string
  catch (e) { memory = list; }
}

/* ---------- Helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function toast(msg) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove("show"), 2400);
}
function setErr(id, msg) {
  $("e-" + id).textContent = msg || "";
  $(id).classList.toggle("bad", !!msg);
  return !msg;
}
function grade(p) { return p >= 75 ? "Distinction" : p >= 60 ? "First Class" : p >= 50 ? "Second Class" : "Pass"; }

/* ---------- Build marks inputs ---------- */
$("subjects").innerHTML = SUBJECTS.map((s, i) =>
  `<div class="field"><label for="m${i}">${s}</label>
   <input id="m${i}" type="number" min="0" max="100" inputmode="numeric" placeholder="0 - 100">
   <div class="err" id="e-m${i}"></div></div>`).join("");

/* ---------- Live total ---------- */
function updateLive() {
  const t = SUBJECTS.reduce((a, _, i) => a + (Number($("m" + i).value) || 0), 0);
  $("live").textContent = `Total: ${t} / ${SUBJECTS.length * 100}`;
}
SUBJECTS.forEach((_, i) => $("m" + i).addEventListener("input", updateLive));

/* ---------- Validation ---------- */
function validate() {
  let ok = true;
  const name = $("name").value.trim(), roll = $("roll").value.trim(), email = $("email").value.trim();
  ok &= setErr("name", !name ? "Name is required" : !/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name) ? "Use letters only (2-50 chars)" : "");
  const dup = load().some(s => s.rollNo === roll);
  ok &= setErr("roll", !roll ? "Roll number is required" : !/^\d{1,6}$/.test(roll) ? "Digits only" : dup ? "This roll no is already registered" : "");
  ok &= setErr("email", !email ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "Enter a valid email" : "");
  ok &= setErr("course", !$("course").value ? "Select a course" : "");
  SUBJECTS.forEach((_, i) => {
    const v = $("m" + i).value.trim(), n = Number(v);
    ok &= setErr("m" + i, v === "" ? "Required" : isNaN(n) ? "Must be a number" : n < 0 || n > 100 ? "Must be 0-100" : !Number.isInteger(n) ? "Whole numbers only" : "");
  });
  return !!ok;
}

/* ---------- Calculate ---------- */
function compute(d) {
  const total = Object.values(d.marks).reduce((a, b) => a + b, 0);
  const percentage = +(total / (SUBJECTS.length * 100) * 100).toFixed(2);
  const passed = Object.values(d.marks).every(m => m >= PASS_MARK);
  return {
    name: d.name, rollNo: d.rollNo, email: d.email, course: d.course,
    marks: d.marks, total, percentage,
    grade: passed ? grade(percentage) : "Fail", result: passed ? "Pass" : "Fail",
    date: new Date().toISOString().slice(0, 10)
  };
}
function buildStudent() {
  const marks = {};
  SUBJECTS.forEach((s, i) => marks[s] = Number($("m" + i).value));
  return compute({ name: $("name").value.trim(), rollNo: $("roll").value.trim(),
    email: $("email").value.trim(), course: $("course").value, marks });
}

/* ---------- Sample data ---------- */
const SAMPLES = [
  ["Nilesh Verma",    "58", "MCA",    [78, 85, 72, 66, 90]],
  ["Aarav Sharma",    "51", "MCA",    [88, 92, 81, 79, 95]],
  ["Priya Patil",     "52", "MCA",    [67, 74, 70, 62, 58]],
  ["Rohan Deshmukh",  "53", "BSc IT", [45, 52, 48, 40, 55]],
  ["Sneha Kulkarni",  "54", "MCA",    [30, 62, 58, 49, 66]],   // fails Mathematics
  ["Aditya Singh",    "55", "BCA",    [91, 87, 94, 89, 96]],
  ["Neha Joshi",      "56", "MSc IT", [55, 38, 61, 44, 50]],
  ["Karan Mehta",     "57", "BCA",    [28, 32, 41, 36, 30]]    // fails overall
].map(([name, rollNo, course, m]) => ({
  name, rollNo, course,
  email: name.split(" ")[0].toLowerCase() + "@example.com",
  marks: Object.fromEntries(SUBJECTS.map((s, i) => [s, m[i]]))
}));
let sampleIdx = 0;
function freeRoll(preferred) {          // keep roll numbers unique
  const used = load().map(s => s.rollNo);
  if (!used.includes(preferred)) return preferred;
  return String(Math.max(0, ...used.map(Number)) + 1);
}

/* ---------- Display result ---------- */
function showResult(st) {
  lastStudent = st;
  const pass = st.result === "Pass";
  const bars = Object.entries(st.marks).map(([s, m]) =>
    `<div class="bar-row ${m < PASS_MARK ? "low" : ""}"><span>${esc(s)}</span>
     <span class="track"><span class="fill" data-w="${m}"></span></span><b>${m}</b></div>`).join("");
  $("result").innerHTML = `
    <div class="res-top">
      <div class="ring" style="--p:${st.percentage};--rc:${pass ? "var(--pass)" : "var(--fail)"}"><span>${st.percentage}%</span></div>
      <div class="res-info">
        <h3>${esc(st.name)}</h3>
        <p>Roll ${esc(st.rollNo)} · ${esc(st.course)}</p>
        <span class="badge ${pass ? "pass" : "fail"}">${pass ? "✔ PASS" : "✘ FAIL"}</span>
        <span class="grade">${esc(st.grade)}</span>
      </div>
    </div>
    <div class="bars">${bars}</div>
    <div class="total-line"><span>Total Marks</span><span>${st.total} / ${SUBJECTS.length * 100}</span></div>
    <details open><summary>Stored as JSON</summary>
      <pre>${esc(JSON.stringify(st, null, 2))}</pre>
      <div class="res-actions">
        <button class="btn ghost sm" type="button" id="copyJson">Copy JSON</button>
        <button class="btn ghost sm" type="button" id="dlJson">Download JSON</button>
      </div>
    </details>`;
  $("placeholder").hidden = true;
  $("result").hidden = false;
  requestAnimationFrame(() => document.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.w + "%"));
  $("copyJson").onclick = () => navigator.clipboard?.writeText(JSON.stringify(st, null, 2)).then(() => toast("JSON copied"), () => toast("Copy not allowed"));
  $("dlJson").onclick = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(st, null, 2)], { type: "application/json" }));
    a.download = `student-${st.rollNo}.json`; a.click(); URL.revokeObjectURL(a.href);
  };
  if (window.innerWidth < 900) $("resultCard").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Stats + table ---------- */
function renderStats(all) {
  $("sTotal").textContent = all.length;
  const passed = all.filter(s => s.result === "Pass").length;
  $("sRate").textContent = all.length ? Math.round(passed / all.length * 100) + "%" : "0%";
  $("sAvg").textContent = all.length ? (all.reduce((a, s) => a + s.percentage, 0) / all.length).toFixed(1) + "%" : "0%";
  const top = all.slice().sort((a, b) => b.percentage - a.percentage)[0];
  $("sTop").textContent = top ? top.name.split(" ")[0] : "—";
}
function render() {
  const all = load(), q = $("search").value.trim().toLowerCase();
  const list = all.filter(s =>
    (filter === "all" || s.result === filter) &&
    (!q || s.name.toLowerCase().includes(q) || s.rollNo.includes(q)));
  renderStats(all);
  $("count").textContent = all.length;
  $("empty").style.display = list.length ? "none" : "block";
  $("tbody").innerHTML = list.map(s => `<tr>
    <td>${esc(s.rollNo)}</td>
    <td><div class="who"><span class="av">${esc(s.name[0].toUpperCase())}</span><div>${esc(s.name)}<small>${esc(s.email)}</small></div></div></td>
    <td>${esc(s.course)}</td><td>${s.total}</td><td>${s.percentage}</td><td>${esc(s.grade)}</td>
    <td><span class="badge ${s.result === "Pass" ? "pass" : "fail"}">${s.result}</span></td>
    <td><button class="del" data-roll="${esc(s.rollNo)}">Delete</button></td></tr>`).join("");
}

/* ---------- Events ---------- */
$("f").addEventListener("submit", e => {
  e.preventDefault();
  if (!validate()) { toast("Please fix the highlighted fields"); return; }
  const st = buildStudent();
  const list = load(); list.push(st); save(list);
  showResult(st); render(); toast("Student saved ✔");
  $("f").reset(); updateLive();
});
$("resetBtn").addEventListener("click", () => {
  document.querySelectorAll(".err").forEach(e => e.textContent = "");
  document.querySelectorAll(".bad").forEach(e => e.classList.remove("bad"));
  setTimeout(updateLive, 0);
});
$("sample").addEventListener("click", () => {
  const d = SAMPLES[sampleIdx++ % SAMPLES.length];      // each click = next student
  $("name").value = d.name; $("roll").value = freeRoll(d.rollNo);
  $("email").value = d.email; $("course").value = d.course;
  SUBJECTS.forEach((sub, i) => $("m" + i).value = d.marks[sub]);
  document.querySelectorAll(".err").forEach(e => e.textContent = "");
  document.querySelectorAll(".bad").forEach(e => e.classList.remove("bad"));
  updateLive();
});
$("demo").addEventListener("click", () => {
  const list = load(), have = list.map(s => s.rollNo);
  const add = SAMPLES.filter(d => !have.includes(d.rollNo)).map(compute);
  if (!add.length) { toast("Demo data is already loaded"); return; }
  save(list.concat(add)); render(); toast(add.length + " demo students added");
  $("records").scrollIntoView({ behavior: "smooth" });
});
$("search").addEventListener("input", render);
$("chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  filter = b.dataset.f;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === b));
  render();
});
$("tbody").addEventListener("click", e => {
  const r = e.target.dataset.roll; if (!r) return;
  save(load().filter(s => s.rollNo !== r)); render(); toast("Record deleted");
});
$("clear").addEventListener("click", () => {
  if (load().length && confirm("Delete all saved records?")) { save([]); render(); toast("All records cleared"); }
});

/* ---------- Theme ---------- */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("theme", t); } catch (e) {}
}
try {
  const t = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = t;
} catch (e) {}
$("theme").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

render(); updateLive();
