let isIdChecked = false;
let checkedIdValue = "";

// =============================
// 초기 설정
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const signupIdInput = document.getElementById("signupId");
  const nameInput = document.getElementById("name");
  const courseSelect = document.getElementById("course");
  const csvFile = document.getElementById("csvFile");

  if (phoneInput) {
    phoneInput.addEventListener("input", onPhoneInput);
    phoneInput.addEventListener("blur", validatePhoneOnBlur);
  }

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/\s/g, "");
    });
  }

  if (signupIdInput) {
    signupIdInput.addEventListener("input", (e) => {
      isIdChecked = false;
      checkedIdValue = "";

      if (courseSelect) {
        courseSelect.style.display =
          e.target.value === "admin" ? "none" : "block";
      }
    });
  }

  if (csvFile) {
    csvFile.addEventListener("change", uploadCsvToFirestore);
  }
});


// =============================
// 전화번호 처리
// =============================
function onPhoneInput(e) {
  const numbers = e.target.value.replace(/\D/g, "").slice(0, 11);
  e.target.value = formatPhoneNumber(numbers);
}

function formatPhoneNumber(numbers) {
  if (numbers.length < 4) return numbers;
  if (numbers.length < 7) {
    return numbers.replace(/(\d{3})(\d+)/, "$1-$2");
  }
  return numbers.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
}

function isValidPhone(phone) {
  return /^010-\d{4}-\d{4}$/.test(phone);
}

function validatePhoneOnBlur(e) {
  const value = e.target.value.trim();
  e.target.style.border = value && !isValidPhone(value) ? "2px solid red" : "";
}


// =============================
// 이메일 검증
// =============================
function isValidEmailFront(front) {
  return /^[A-Za-z0-9._%+-]+$/.test(front);
}

function isValidDomain(domain) {
  return /^([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(domain);
}


// =============================
// 아이디 / 비밀번호
// =============================
function isValidId(id) {
  return /^[A-Za-z0-9._-]{4,20}$/.test(id);
}

function isValidPassword(pw) {
  return pw.length >= 4;
}


// =============================
// 아이디 중복확인
// =============================
async function checkDuplicate() {
  const id = document.getElementById("signupId").value.trim();

  if (!id) return alert("아이디 입력");

  if (!isValidId(id)) {
    return alert("아이디 형식 오류 (4~20자)");
  }

  const doc = await db.collection("users").doc(id).get();

  if (doc.exists) {
    alert("이미 존재하는 아이디");
    isIdChecked = false;
  } else {
    alert("사용 가능 아이디");
    isIdChecked = true;
    checkedIdValue = id;
  }
}


// =============================
// 회원가입 (🔥 핵심 수정 완료)
// =============================
async function signup() {
  const courseEl = document.getElementById("course");
  const nameEl = document.getElementById("name");

  const course = courseEl ? courseEl.value : "";
  const name = nameEl ? nameEl.value.trim() : "";

  const phone = document.getElementById("phone").value.trim();
  const emailFront = document.getElementById("emailFront").value.trim();
  const emailBack = document.getElementById("emailBack").value.trim();
  const signupId = document.getElementById("signupId").value.trim();
  const signupPw = document.getElementById("signupPw").value;
  const signupPwConfirm = document.getElementById("signupPwConfirm").value;

  let role = signupId === "admin" ? "admin" : "user";

  if (role !== "admin" && !course) return alert("과정 선택 필요");
  if (!name) return alert("이름 입력");

  if (!isValidPhone(phone)) {
    return alert("전화번호 형식 오류 (010-0000-0000)");
  }

  if (!isValidEmailFront(emailFront)) {
    return alert("이메일 앞부분 오류");
  }

  if (!isValidDomain(emailBack)) {
    return alert("도메인 오류");
  }

  if (!isIdChecked || checkedIdValue !== signupId) {
    return alert("아이디 중복확인 필요");
  }

  if (!signupPw) return alert("비밀번호 입력");
  if (!isValidPassword(signupPw)) return alert("비밀번호 4자 이상");

  if (signupPw !== signupPwConfirm) {
    return alert("비밀번호 불일치");
  }

  // 🔥 핵심: 실제 이메일 사용
  const email = `${emailFront}@${emailBack}`;

  try {
    await auth.createUserWithEmailAndPassword(email, signupPw);

    await db.collection("users").doc(signupId).set({
      id: signupId,
      role,
      name,
      phone,
      email, // 🔥 동일하게 저장
      course: role === "admin" ? null : course
    });

    alert("회원가입 완료");
    goBack();

  } catch (error) {
    console.error(error);
    alert(error.message); // 🔥 원인 확인 가능
  }
}


// =============================
// 로그인 (🔥 핵심 수정 완료)
// =============================
async function login() {
  const id = document.getElementById("username").value.trim();
  const pw = document.getElementById("loginPw").value;

  try {
    // 🔥 Firestore에서 이메일 조회
    const doc = await db.collection("users").doc(id).get();

    if (!doc.exists) {
      alert("사용자 정보 없음");
      return;
    }

    const user = doc.data();

    // 🔥 실제 이메일로 로그인
    await auth.signInWithEmailAndPassword(user.email, pw);

    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    if (user.role === "admin") {
      document.getElementById("adminSection").classList.remove("hidden");
      loadUsers();
    } else {
      document.getElementById("userSection").classList.remove("hidden");
      showUserData(user.name);
    }

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}


// =============================
// 관리자 유저 리스트
// =============================
async function loadUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  const course = document.getElementById("adminCourseFilter").value;

  let query = db.collection("users");

  if (course) {
    query = query.where("course", "==", course);
  }

  const snapshot = await query.get();

  snapshot.forEach(doc => {
    const u = doc.data();

    const div = document.createElement("div");
    div.className = "user-card";

    div.innerHTML = `
      <div class="user-top">
        <div>${u.name} (${u.id})</div>
      </div>

      <div class="user-bottom">
        <div>
          전화번호<br>
          <input id="p-${u.id}" value="${u.phone || ''}">
        </div>

        <div>
          이메일<br>
          <input id="e-${u.id}" value="${u.email || ''}">
        </div>
      </div>

      <button onclick="updateUser('${u.id}')">수정</button>
    `;

    list.appendChild(div);
  });
}


// =============================
// 유저 수정
// =============================
async function updateUser(id) {
  const email = document.getElementById(`e-${id}`).value;
  const phone = document.getElementById(`p-${id}`).value;

  await db.collection("users").doc(id).update({
    email,
    phone
  });

  alert("수정 완료");
}


// =============================
// CSV 업로드
// =============================
function uploadCsvToFirestore(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    const rows = event.target.result.split("\n").slice(1);

    for (let row of rows) {
      const [name, subject, score] = row.split(",");
      if (!name) continue;

      await db.collection("scores").add({
        name,
        subject,
        score: Number(score)
      });
    }

    alert("업로드 완료");
  };

  reader.readAsText(file);
}


// =============================
// 사용자 데이터
// =============================
async function showUserData(name) {
  const result = document.getElementById("result");
  result.innerHTML = "";

  const snapshot = await db.collection("scores")
    .where("name", "==", name)
    .get();

  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `${d.subject}: ${d.score}`;
    result.appendChild(li);
  });
}


// =============================
// 페이지 전환
// =============================
function openSignup() {
  document.getElementById("loginModal").classList.add("hidden");
  document.getElementById("signupPage").classList.remove("hidden");
}

function goBack() {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginModal").classList.remove("hidden");
}