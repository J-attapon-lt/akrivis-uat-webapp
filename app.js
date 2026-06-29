const STORAGE_KEY = "akrivis-uat-v1-5-0-draft";
const FIREBASE_COLLECTION = window.AKRIVIS_FIREBASE_COLLECTION || "akrivis_uat_records";

const resultOptions = [
  { value: "pass", label: "ผ่าน" },
  { value: "fail", label: "ไม่ผ่าน" },
  { value: "note", label: "ผ่านโดยมีข้อสังเกต" },
];

const tests = {
  bigScale: [
    ["เปิดตั๋วชั่งใหญ่", "สร้างตั๋วชั่งใหญ่สำหรับการรับเข้าสินค้า", "ระบบสามารถสร้างตั๋วชั่งใหญ่ได้ตามปกติ"],
    ["เพิ่มลูกค้าหลายราย", "เลือกลูกค้ามากกว่า 1 รายในตั๋วชั่งใหญ่", "ระบบสามารถบันทึกลูกค้าหลายรายในตั๋วเดียวได้"],
    ["เพิ่มสินค้าหลายรายการ", "เลือกสินค้ามากกว่า 1 รายการในตั๋วชั่งใหญ่", "ระบบสามารถบันทึกสินค้าหลายรายการในตั๋วเดียวได้"],
    ["แสดงข้อมูลลูกค้าและสินค้า", "ตรวจสอบหน้ารายละเอียดตั๋วชั่งใหญ่", "ระบบแสดงลูกค้าและสินค้าได้ครบถ้วน ไม่ตกหล่น"],
    ["แสดงสถานะใบชั่งเล็ก", "ตรวจสอบสถานะใบชั่งเล็กที่ผูกกับตั๋วชั่งใหญ่", "ระบบแสดงสถานะแยกตามใบชั่งเล็กแต่ละใบได้ถูกต้อง"],
    ["ตรวจสอบความถูกต้องของข้อมูล", "เปรียบเทียบข้อมูลลูกค้า สินค้า และใบชั่งเล็ก", "ข้อมูลตรงกับรายการที่บันทึกไว้"],
  ],
  smallScale: [
    ["เปิดหน้าชั่งซื้อ", "เข้าเมนูชั่งซื้อจากตั๋วชั่งใหญ่ที่สร้างไว้", "ระบบสามารถเปิดหน้าชั่งซื้อได้ตามปกติ"],
    ["แสดงบัตรชั่งเล็กตามลูกค้า", "ตรวจสอบบัตรชั่งเล็กที่ระบบแสดง", "ระบบแสดงบัตรชั่งเล็กแยกตามลูกค้าได้ถูกต้อง"],
    ["แสดงบัตรชั่งเล็กตามสินค้า", "ตรวจสอบสินค้าที่แสดงในแต่ละบัตรชั่งเล็ก", "ระบบแสดงสินค้าแยกตามข้อมูลที่กรอกไว้"],
    ["แสดงคู่ข้อมูลลูกค้า + สินค้า", "ตรวจสอบว่าลูกค้าและสินค้าจับคู่กันถูกต้อง", "ระบบแสดงลูกค้าและสินค้าตรงกับตั๋วชั่งใหญ่"],
    ["บันทึกน้ำหนักชั่งเล็ก", "บันทึกน้ำหนักในบัตรชั่งเล็กแต่ละรายการ", "ระบบสามารถบันทึกน้ำหนักได้ถูกต้อง"],
    ["สถานะหลังบันทึกชั่งเล็ก", "ตรวจสอบสถานะหลังบันทึกน้ำหนัก", "สถานะของบัตรชั่งเล็กเปลี่ยนถูกต้อง"],
    ["ข้อมูลส่งกลับตั๋วชั่งใหญ่", "กลับไปตรวจสอบตั๋วชั่งใหญ่", "ข้อมูลจากชั่งเล็กแสดงในตั๋วชั่งใหญ่ครบถ้วน"],
  ],
  admin: [
    ["เปิดหน้าอนุมัติ Admin", "เข้าสู่ระบบด้วยสิทธิ์ Admin และเปิดหน้าอนุมัติ", "ระบบแสดงรายการรออนุมัติได้ตามปกติ"],
    ["แสดงข้อมูลแยกตามลูกค้า", "ตรวจสอบรายการที่รออนุมัติ", "ระบบแสดงข้อมูลแยกตามลูกค้าได้ชัดเจน"],
    ["แสดงข้อมูลแยกตามสินค้า", "ตรวจสอบสินค้าที่แสดงในรายการอนุมัติ", "ระบบแสดงสินค้าแยกตามรายการได้ถูกต้อง"],
    ["แสดงข้อมูลลูกค้า + สินค้า", "ตรวจสอบการจับคู่ลูกค้าและสินค้าในรายการ", "ข้อมูลลูกค้าและสินค้าถูกต้อง ไม่สลับรายการ"],
    ["ตรวจสอบข้อมูลน้ำหนัก", "ตรวจสอบน้ำหนักจากใบชั่งเล็กก่อนอนุมัติ", "น้ำหนักแสดงครบถ้วนและถูกต้อง"],
    ["ตรวจสอบสถานะรายการ", "ตรวจสอบสถานะของแต่ละรายการก่อนอนุมัติ", "ระบบแสดงสถานะถูกต้องตามขั้นตอนการชั่ง"],
    ["อนุมัติรายการ", "กดอนุมัติรายการที่ตรวจสอบแล้ว", "ระบบสามารถอนุมัติรายการได้สำเร็จ"],
    ["สถานะหลังอนุมัติ", "ตรวจสอบสถานะหลัง Admin อนุมัติ", "สถานะรายการเปลี่ยนเป็นอนุมัติแล้วอย่างถูกต้อง"],
  ],
};

const signatures = [
  "ผู้ทดสอบตาชั่งใหญ่",
  "ผู้ทดสอบตาชั่งเล็ก",
  "ผู้ทดสอบ Admin",
  "ผู้ตรวจสอบ / หัวหน้างาน",
  "ผู้อนุมัติให้นำขึ้น Production",
  "ผู้พัฒนาระบบ / Vendor",
];

let state = loadState();
let firebaseEnabled = false;
let firebaseModules = null;
let firestoreDb = null;
let isSaving = false;

function todayLocalDate() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function defaultState() {
  return {
    evaluator: {
      name: "",
      department: "",
      date: todayLocalDate(),
      note: "",
    },
    project: {
      system: "Akrivis",
      version: "1.5.0",
      environment: "Staging Server",
      topic: "การรับเข้าหลายลูกค้าและหลายสินค้า",
    },
    bigScale: { results: {}, notes: {}, finalResult: "", data: {}, sign: {} },
    smallScale: { results: {}, notes: {}, finalResult: "", data: {}, sign: {} },
    admin: { results: {}, notes: {}, finalResult: "", data: {}, sign: {} },
    overallResult: "",
    overallRemarks: "",
    signatures: {},
  };
}

function loadState() {
  const base = defaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return deepMerge(base, saved);
  } catch (error) {
    return base;
  }
}

function deepMerge(target, source) {
  for (const key of Object.keys(source || {})) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function getPath(path) {
  return path.split(".").reduce((obj, key) => obj?.[key], state);
}

function setPath(path, value) {
  const parts = path.split(".");
  let obj = state;
  while (parts.length > 1) {
    const key = parts.shift();
    obj[key] = obj[key] || {};
    obj = obj[key];
  }
  obj[parts[0]] = value;
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  updateSummaries();
}

function countCompletedAssessmentItems() {
  const sectionKeys = ["bigScale", "smallScale", "admin"];
  const totalTests = sectionKeys.reduce((sum, key) => sum + tests[key].length, 0);
  const total = totalTests + sectionKeys.length + 1;
  let completed = 0;

  sectionKeys.forEach((key) => {
    tests[key].forEach((_, index) => {
      if (state[key]?.results?.[index + 1]) completed += 1;
    });
    if (state[key]?.finalResult) completed += 1;
  });

  if (state.overallResult) completed += 1;
  return { completed, total, percent: Math.round((completed / total) * 100) };
}

function updateDashboard() {
  const evaluatorStatus = document.getElementById("evaluatorStatus");
  const evaluatorName = String(state.evaluator?.name || "").trim();
  if (evaluatorStatus) {
    evaluatorStatus.textContent = evaluatorName ? evaluatorName : "รอกรอกชื่อผู้ประเมิน";
  }

  const progress = countCompletedAssessmentItems();
  const completionText = document.getElementById("completionText");
  const completionBar = document.getElementById("completionBar");
  if (completionText) {
    completionText.textContent = `กรอกผลแล้ว ${progress.completed}/${progress.total} รายการ (${progress.percent}%)`;
  }
  if (completionBar) {
    completionBar.style.width = `${progress.percent}%`;
  }
}

function clearDraftAfterSuccessfulSubmit() {
  const evaluator = {
    name: "",
    department: state.evaluator?.department || "",
    date: todayLocalDate(),
    note: "",
  };
  state = defaultState();
  state.evaluator = evaluator;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  window.setTimeout(() => window.location.reload(), 900);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function renderTests(sectionKey, containerId) {
  const container = document.getElementById(containerId);
  const rows = tests[sectionKey].map((item, index) => {
    const no = index + 1;
    return `
      <div class="test-row">
        <div class="cell">${no}</div>
        <div class="cell"><strong>${item[0]}</strong></div>
        <div class="cell">${item[1]}</div>
        <div class="cell">${item[2]}</div>
        <div class="cell"><div class="radio-options" data-result-group="${sectionKey}.results.${no}"></div></div>
        <div class="cell"><textarea rows="2" data-field="${sectionKey}.notes.${no}" aria-label="หมายเหตุ ${item[0]}"></textarea></div>
      </div>`;
  }).join("");

  container.innerHTML = `
    <div class="test-head">
      <div class="cell">ลำดับ</div>
      <div class="cell">หัวข้อทดสอบ</div>
      <div class="cell">ขั้นตอนการทดสอบ</div>
      <div class="cell">ผลลัพธ์ที่คาดหวัง</div>
      <div class="cell">ผลการทดสอบ</div>
      <div class="cell">หมายเหตุ</div>
    </div>
    ${rows}
  `;
}

function renderResultGroups() {
  document.querySelectorAll("[data-result-group]").forEach((group) => {
    const path = group.dataset.resultGroup;
    group.innerHTML = resultOptions.map((option) => `
      <label>
        <input type="radio" name="${path}" value="${option.value}" ${getPath(path) === option.value ? "checked" : ""} />
        ${option.label}
      </label>
    `).join("");
  });
}

function renderSignatures() {
  const table = document.getElementById("signatureTable");
  table.innerHTML = `
    <div class="signature-head">
      <div class="cell">บทบาท</div>
      <div class="cell">ชื่อ-นามสกุล</div>
      <div class="cell">ลายเซ็น</div>
      <div class="cell">วันที่</div>
    </div>
    ${signatures.map((role, index) => `
      <div class="signature-row">
        <div class="cell"><strong>${role}</strong></div>
        <div class="cell"><input data-field="signatures.${index}.name" aria-label="ชื่อ ${role}" /></div>
        <div class="cell"><input data-field="signatures.${index}.signature" aria-label="ลายเซ็น ${role}" /></div>
        <div class="cell"><input type="date" data-field="signatures.${index}.date" aria-label="วันที่ ${role}" /></div>
      </div>
    `).join("")}
  `;
}

function bindInputs() {
  document.querySelectorAll("[data-field]").forEach((input) => {
    const path = input.dataset.field;
    input.value = getPath(path) || input.getAttribute("value") || "";
    setPath(path, input.value);
    input.addEventListener("input", () => {
      setPath(path, input.value);
      saveDraft();
    });
  });

  document.querySelectorAll("[data-result-group] input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", () => {
      setPath(radio.name, radio.value);
      saveDraft();
    });
  });
}

function updateSummaries() {
  updateDashboard();

  ["bigScale", "smallScale", "admin"].forEach((key) => {
    const value = state[key]?.finalResult || "";
    const label = resultOptions.find((r) => r.value === value)?.label || "ยังไม่สรุปผล";
    document.querySelectorAll(`[data-summary-text='${key}'], [data-summary-pill='${key}']`).forEach((el) => {
      el.textContent = label;
      el.classList.remove("pass", "fail", "note");
      if (value) el.classList.add(value);
    });
  });

  const overallValue = state.overallResult || "";
  const overallLabel = resultOptions.find((r) => r.value === overallValue)?.label || "ยังไม่สรุปผล";
  const overallPill = document.querySelector("[data-overall-pill]");
  if (overallPill) {
    overallPill.textContent = overallLabel;
    overallPill.classList.remove("pass", "fail", "note");
    if (overallValue) overallPill.classList.add(overallValue);
  }
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function firebaseConfigIsReady() {
  const config = window.AKRIVIS_FIREBASE_CONFIG;
  return Boolean(
    config &&
    config.apiKey &&
    config.projectId &&
    !String(config.apiKey).includes("YOUR_") &&
    !String(config.projectId).includes("YOUR_")
  );
}

function setCloudStatus(kind, message) {
  const status = document.getElementById("cloudStatus");
  if (!status) return;
  status.className = `cloud-status ${kind || "muted"}`;
  status.textContent = message;
}

async function initFirebase() {
  if (!firebaseConfigIsReady()) {
    setCloudStatus("error", "ยังไม่ได้ตั้งค่า Firebase config · ปุ่มบันทึกจะยังส่งเข้าฐานข้อมูลไม่ได้");
    return;
  }

  setCloudStatus("muted", "กำลังเชื่อมต่อ Firebase...");

  try {
    const appModule = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js");
    const firestoreModule = await import("https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js");
    const firebaseApp = appModule.initializeApp(window.AKRIVIS_FIREBASE_CONFIG);
    firestoreDb = firestoreModule.getFirestore(firebaseApp);
    firebaseModules = firestoreModule;
    firebaseEnabled = true;
    setCloudStatus("connected", `พร้อมบันทึกลง Firebase · Collection: ${FIREBASE_COLLECTION}`);
  } catch (error) {
    console.error(error);
    firebaseEnabled = false;
    setCloudStatus("error", "เชื่อมต่อ Firebase ไม่สำเร็จ · ตรวจสอบ config / rules / internet");
  }
}

function validateBeforeSubmit() {
  const evaluatorNameInput = document.getElementById("evaluatorName");
  const evaluatorName = String(state.evaluator?.name || "").trim();

  if (!evaluatorName) {
    showToast("กรุณากรอกชื่อผู้ประเมินก่อนบันทึก");
    evaluatorNameInput?.focus();
    evaluatorNameInput?.classList.add("input-error");
    window.setTimeout(() => evaluatorNameInput?.classList.remove("input-error"), 1800);
    return false;
  }

  if (!firebaseEnabled) {
    showToast("ยังไม่พร้อมบันทึก Firebase กรุณาตรวจสอบการตั้งค่า Firebase");
    return false;
  }

  return true;
}

function buildPayload() {
  const evaluatorName = String(state.evaluator?.name || "").trim();
  const ticketNo = state.bigScale?.ticketNo || state.smallScale?.ticketNo || state.admin?.ticketNo || "";
  const data = JSON.parse(JSON.stringify(state));

  return {
    evaluatorName,
    evaluatorDepartment: state.evaluator?.department || "",
    evaluatorDate: state.evaluator?.date || todayLocalDate(),
    evaluatorNote: state.evaluator?.note || "",
    projectSystem: state.project?.system || "Akrivis",
    projectVersion: state.project?.version || "1.5.0",
    projectEnvironment: state.project?.environment || "Staging Server",
    projectTopic: state.project?.topic || "การรับเข้าหลายลูกค้าและหลายสินค้า",
    overallResult: state.overallResult || "",
    bigScaleResult: state.bigScale?.finalResult || "",
    smallScaleResult: state.smallScale?.finalResult || "",
    adminResult: state.admin?.finalResult || "",
    ticketNo,
    data,
    createdAt: firebaseModules.serverTimestamp(),
    createdAtLocal: new Date().toISOString(),
    source: "akrivis-uat-webapp-v1.5.0",
  };
}

function setSaveButtonLoading(isLoading) {
  const saveBtn = document.getElementById("saveBtn");
  if (!saveBtn) return;
  saveBtn.disabled = isLoading;
  saveBtn.innerHTML = isLoading
    ? `<span class="button-icon" aria-hidden="true">…</span>กำลังบันทึก...`
    : `<span class="button-icon" aria-hidden="true">✓</span>บันทึก`;
}

function switchToTab(tabId) {
  const targetTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const targetPanel = document.getElementById(tabId);
  if (!targetTab || !targetPanel) return;

  document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
  targetTab.classList.add("active");
  targetPanel.classList.add("active");
}

function editAssessment() {
  switchToTab("big-scale");
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("สามารถแก้ไขข้อมูลในแบบฟอร์มได้เลย แล้วกดบันทึกด้านล่างเมื่อพร้อมส่ง");
  document.getElementById("evaluatorName")?.focus();
}

function cancelAssessment() {
  const confirmed = window.confirm("ต้องการยกเลิกและล้างข้อมูลที่กำลังกรอกอยู่หรือไม่? ข้อมูลที่บันทึกไปแล้วใน Firebase จะไม่ถูกลบ");
  if (!confirmed) return;

  state = defaultState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  showToast("ยกเลิกและล้างข้อมูลในแบบฟอร์มแล้ว");
  window.setTimeout(() => window.location.reload(), 450);
}

async function submitAssessment() {
  if (isSaving) return;
  saveDraft();
  if (!validateBeforeSubmit()) return;

  isSaving = true;
  setSaveButtonLoading(true);

  try {
    const payload = buildPayload();
    const docRef = await firebaseModules.addDoc(
      firebaseModules.collection(firestoreDb, FIREBASE_COLLECTION),
      payload
    );
    showToast(`บันทึกสำเร็จ เลขอ้างอิง: ${docRef.id}`);
    clearDraftAfterSuccessfulSubmit();
  } catch (error) {
    console.error(error);
    showToast("บันทึกไม่สำเร็จ กรุณาตรวจสอบ Firebase Rules หรืออินเทอร์เน็ต");
  } finally {
    isSaving = false;
    setSaveButtonLoading(false);
  }
}

function init() {
  renderTests("bigScale", "bigScaleTests");
  renderTests("smallScale", "smallScaleTests");
  renderTests("admin", "adminTests");
  renderSignatures();
  renderResultGroups();
  bindInputs();
  bindTabs();
  updateSummaries();

  document.getElementById("saveBtn")?.addEventListener("click", submitAssessment);
  document.getElementById("editBtn")?.addEventListener("click", editAssessment);
  document.getElementById("cancelBtn")?.addEventListener("click", cancelAssessment);

  window.setInterval(saveDraft, 30000);
  initFirebase();
}

document.addEventListener("DOMContentLoaded", init);
