const STORAGE_KEY = "akrivis-uat-v1-5-0";
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

function defaultState() {
  return {
    recordId: "",
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

function saveState(show = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  updateSummaries();
  if (show) showToast("บันทึกข้อมูลในเครื่องเรียบร้อยแล้ว");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
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
      saveState(false);
    });
  });

  document.querySelectorAll("[data-result-group] input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", () => {
      setPath(radio.name, radio.value);
      saveState(false);
    });
  });
}

function refreshBoundInputs() {
  document.querySelectorAll("[data-field]").forEach((input) => {
    const path = input.dataset.field;
    const value = getPath(path) || "";
    if (input.value !== value) input.value = value;
  });
}

function updateSummaries() {
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
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function exportJson() {
  saveState(false);
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json;charset=utf-8" });
  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `akrivis-uat-v1.5.0-${date}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast("Export JSON เรียบร้อยแล้ว");
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = deepMerge(defaultState(), imported);
      saveState(false);
      window.location.reload();
    } catch (error) {
      showToast("ไฟล์ JSON ไม่ถูกต้อง");
    }
  };
  reader.readAsText(file);
}

function resetData() {
  const confirmed = window.confirm("ยืนยันล้างข้อมูล UAT ทั้งหมดในเครื่องนี้หรือไม่? ข้อมูลบน Firebase จะไม่ถูกลบ");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  window.location.reload();
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
    setCloudStatus("muted", "Firebase ยังไม่ได้ตั้งค่า · ตอนนี้บันทึกเฉพาะในเครื่อง");
    toggleCloudButtons(true);
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
    setCloudStatus("connected", `เชื่อมต่อ Firebase แล้ว · Collection: ${FIREBASE_COLLECTION}`);
    toggleCloudButtons(false);
  } catch (error) {
    console.error(error);
    firebaseEnabled = false;
    setCloudStatus("error", "เชื่อมต่อ Firebase ไม่สำเร็จ · ตรวจสอบ config / rules / internet");
    toggleCloudButtons(true);
  }
}

function toggleCloudButtons(disabled) {
  ["saveCloudBtn", "loadCloudBtn", "listCloudBtn", "newRecordBtn"].forEach((id) => {
    const button = document.getElementById(id);
    if (button) button.disabled = Boolean(disabled && id !== "newRecordBtn");
  });
}

function generateRecordId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `UAT-${stamp}-${rand}`;
}

function setRecordId(recordId) {
  state.recordId = recordId;
  refreshBoundInputs();
  saveState(false);
}

function cloudDocumentRef(recordId) {
  return firebaseModules.doc(firestoreDb, FIREBASE_COLLECTION, recordId);
}

async function saveToFirebase() {
  saveState(false);

  if (!firebaseEnabled) {
    showToast("ยังไม่ได้เชื่อมต่อ Firebase");
    return;
  }

  const recordId = state.recordId || generateRecordId();
  setRecordId(recordId);

  const payload = {
    recordId,
    project: state.project,
    overallResult: state.overallResult || "",
    testerBigScale: state.bigScale?.tester || "",
    testerSmallScale: state.smallScale?.tester || "",
    testerAdmin: state.admin?.tester || "",
    ticketNo: state.bigScale?.ticketNo || state.smallScale?.ticketNo || state.admin?.ticketNo || "",
    data: JSON.parse(JSON.stringify(state)),
    updatedAt: firebaseModules.serverTimestamp(),
    updatedAtLocal: new Date().toISOString(),
  };

  try {
    await firebaseModules.setDoc(cloudDocumentRef(recordId), payload, { merge: true });
    showToast(`บันทึกขึ้น Firebase แล้ว: ${recordId}`);
    await listCloudRecords(false);
  } catch (error) {
    console.error(error);
    showToast("บันทึกขึ้น Firebase ไม่สำเร็จ");
  }
}

async function loadFromFirebase(recordIdFromButton) {
  if (!firebaseEnabled) {
    showToast("ยังไม่ได้เชื่อมต่อ Firebase");
    return;
  }

  const recordIdInput = document.querySelector("[data-field='recordId']");
  const recordId = (recordIdFromButton || state.recordId || recordIdInput?.value || "").trim();
  if (!recordId) {
    showToast("กรุณากรอก Record ID ก่อนโหลดข้อมูล");
    return;
  }

  try {
    const snap = await firebaseModules.getDoc(cloudDocumentRef(recordId));
    if (!snap.exists()) {
      showToast("ไม่พบข้อมูล Record ID นี้ใน Firebase");
      return;
    }
    const remote = snap.data()?.data || {};
    state = deepMerge(defaultState(), remote);
    state.recordId = recordId;
    saveState(false);
    showToast("โหลดข้อมูลจาก Firebase เรียบร้อยแล้ว");
    window.setTimeout(() => window.location.reload(), 500);
  } catch (error) {
    console.error(error);
    showToast("โหลดข้อมูลจาก Firebase ไม่สำเร็จ");
  }
}

async function listCloudRecords(showMessage = true) {
  const list = document.getElementById("cloudRecords");
  if (!list) return;

  if (!firebaseEnabled) {
    list.innerHTML = `<p class="muted-text">ยังไม่ได้เชื่อมต่อ Firebase</p>`;
    return;
  }

  try {
    list.innerHTML = `<p class="muted-text">กำลังโหลดรายการล่าสุด...</p>`;
    const q = firebaseModules.query(
      firebaseModules.collection(firestoreDb, FIREBASE_COLLECTION),
      firebaseModules.orderBy("updatedAt", "desc"),
      firebaseModules.limit(20)
    );
    const snapshot = await firebaseModules.getDocs(q);

    if (snapshot.empty) {
      list.innerHTML = `<p class="muted-text">ยังไม่มีข้อมูลใน Firebase</p>`;
      return;
    }

    list.innerHTML = Array.from(snapshot.docs).map((docSnap) => {
      const item = docSnap.data();
      const data = item.data || {};
      const title = [data.project?.system || "Akrivis", data.project?.version || "1.5.0"].join(" ");
      const ticket = item.ticketNo ? ` · ตั๋ว: ${escapeHtml(item.ticketNo)}` : "";
      const updated = item.updatedAtLocal ? new Date(item.updatedAtLocal).toLocaleString("th-TH") : "ไม่ทราบเวลา";
      const resultLabel = resultOptions.find((r) => r.value === item.overallResult)?.label || "ยังไม่สรุปผล";
      return `
        <article class="cloud-record">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(item.recordId || docSnap.id)}${ticket}</p>
            <small>อัปเดตล่าสุด: ${updated} · ผลรวม: ${escapeHtml(resultLabel)}</small>
          </div>
          <button type="button" data-load-cloud-record="${escapeHtml(item.recordId || docSnap.id)}">โหลด</button>
        </article>
      `;
    }).join("");

    document.querySelectorAll("[data-load-cloud-record]").forEach((button) => {
      button.addEventListener("click", () => loadFromFirebase(button.dataset.loadCloudRecord));
    });

    if (showMessage) showToast("โหลดรายการจาก Firebase เรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    list.innerHTML = `<p class="muted-text">โหลดรายการ Firebase ไม่สำเร็จ ตรวจสอบ Rules หรือ Index</p>`;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createNewRecord() {
  const confirmed = window.confirm("ต้องการเริ่ม Record ใหม่หรือไม่? ข้อมูลเดิมในเครื่องจะถูกล้าง แต่ข้อมูลที่บันทึกบน Firebase แล้วจะยังอยู่");
  if (!confirmed) return;
  state = defaultState();
  state.recordId = generateRecordId();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
  window.location.reload();
}

function bindCloudActions() {
  const saveCloudBtn = document.getElementById("saveCloudBtn");
  const loadCloudBtn = document.getElementById("loadCloudBtn");
  const listCloudBtn = document.getElementById("listCloudBtn");
  const newRecordBtn = document.getElementById("newRecordBtn");

  if (saveCloudBtn) saveCloudBtn.addEventListener("click", saveToFirebase);
  if (loadCloudBtn) loadCloudBtn.addEventListener("click", () => loadFromFirebase());
  if (listCloudBtn) listCloudBtn.addEventListener("click", () => listCloudRecords(true));
  if (newRecordBtn) newRecordBtn.addEventListener("click", createNewRecord);
}

function init() {
  renderTests("bigScale", "bigScaleTests");
  renderTests("smallScale", "smallScaleTests");
  renderTests("admin", "adminTests");
  renderSignatures();
  renderResultGroups();
  bindInputs();
  bindTabs();
  bindCloudActions();
  updateSummaries();

  document.getElementById("saveBtn").addEventListener("click", () => saveState(true));
  document.getElementById("printBtn").addEventListener("click", () => window.print());
  document.getElementById("exportBtn").addEventListener("click", exportJson);
  document.getElementById("resetBtn").addEventListener("click", resetData);
  document.getElementById("importFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importJson(file);
  });

  window.setInterval(() => saveState(false), 30000);
  initFirebase();
}

document.addEventListener("DOMContentLoaded", init);
