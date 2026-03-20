let isIdChecked = false;
let checkedIdValue = "";

// =============================
// 초기 설정
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const signupIdInput = document.getElementById("signupId");
  const nameInput = document.getElementById("name");
<<<<<<< HEAD
  const loginIdInput = document.getElementById("username");
  const loginPwInput = document.getElementById("loginPw");
=======

  // 🔥 로그인 엔터 처리 (핵심 추가)
  const pwInput = document.getElementById("loginPw");
  const idInput = document.getElementById("username");

  if (pwInput) {
    pwInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        login();
      }
    });
  }

  // 👉 아이디 입력창에서도 엔터 가능하게
  if (idInput) {
    idInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        login();
      }
    });
  }
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f

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
    signupIdInput.addEventListener("input", () => {
      isIdChecked = false;
      checkedIdValue = "";
    });
  }
<<<<<<< HEAD

  // 로그인 엔터 처리
  if (loginIdInput) {
    loginIdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        login();
      }
    });
  }

  if (loginPwInput) {
    loginPwInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        login();
      }
    });
  }
=======
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
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

<<<<<<< HEAD
  if (!id) return alert("아이디를 입력해주세요.");

  if (!isValidId(id)) {
    return alert("아이디 형식 오류 (4~20자, 영문/숫자/._- 가능)");
  }

  try {
    const doc = await db.collection("users").doc(id).get();

    if (doc.exists) {
      alert("이미 존재하는 아이디입니다.");
      isIdChecked = false;
      checkedIdValue = "";
    } else {
      alert("사용 가능한 아이디입니다.");
      isIdChecked = true;
      checkedIdValue = id;
    }
  } catch (error) {
    console.error(error);
    alert("중복확인 중 오류가 발생했습니다.");
=======
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
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
  }
}


// =============================
// 회원가입
// =============================
async function signup() {
<<<<<<< HEAD
  const courseEl = document.getElementById("course");
  const nameEl = document.getElementById("name");

  const course = courseEl ? courseEl.value : "";
  const name = nameEl ? nameEl.value.trim() : "";

  const phone = document.getElementById("phone").value.trim();
  const birthYear = document.getElementById("birthYear").value.trim();
  const birthMonth = document.getElementById("birthMonth").value.trim();
  const birthDay = document.getElementById("birthDay").value.trim();
  const emailFront = document.getElementById("emailFront").value.trim();
  const emailBack = document.getElementById("emailBack").value.trim();
=======
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const emailFront = document.getElementById("emailFront").value.trim();
  const emailBack = document.getElementById("emailBack").value.trim();

>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
  const signupId = document.getElementById("signupId").value.trim();
  const signupPw = document.getElementById("signupPw").value;
  const signupPwConfirm = document.getElementById("signupPwConfirm").value;

<<<<<<< HEAD
  // admin 아이디는 관리자 계정 처리
  const role = signupId === "admin" ? "admin" : "user";

  if (role !== "admin" && !course) return alert("과정을 선택해주세요.");
  if (!name) return alert("이름을 입력해주세요.");
  if (!birthYear || !birthMonth || !birthDay) return alert("생년월일을 입력해주세요.");
  const birthdate = `${birthYear}-${String(birthMonth).padStart(2,"0")}-${String(birthDay).padStart(2,"0")}`;
=======
  const role = document.getElementById("role").value;

  if (!name) return alert("이름 입력");
  if (!role) return alert("역할 선택");
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f

  if (!isValidPhone(phone)) {
    return alert("전화번호 형식 오류 (010-0000-0000)");
  }

  if (!isValidEmailFront(emailFront)) {
<<<<<<< HEAD
    return alert("이메일 앞부분 형식이 올바르지 않습니다.");
  }

  if (!isValidDomain(emailBack)) {
    return alert("도메인 형식이 올바르지 않습니다.");
  }

  if (!isValidId(signupId)) {
    return alert("아이디 형식 오류 (4~20자, 영문/숫자/._- 가능)");
  }

  if (!isIdChecked || checkedIdValue !== signupId) {
    return alert("아이디 중복확인을 해주세요.");
  }

  if (!signupPw) return alert("비밀번호를 입력해주세요.");
  if (!isValidPassword(signupPw)) return alert("비밀번호는 4자 이상이어야 합니다.");

  if (signupPw !== signupPwConfirm) {
    return alert("비밀번호가 일치하지 않습니다.");
=======
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
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
  }

  const email = `${emailFront}@${emailBack}`;

  try {
    await auth.createUserWithEmailAndPassword(email, signupPw);

    await db.collection("users").doc(signupId).set({
      id: signupId,
      role,
      name,
<<<<<<< HEAD
      birthdate,
      phone,
      email,
      course: role === "admin" ? null : course
    });

    alert("회원가입이 완료되었습니다.");
    goBack();
=======
      phone,
      email
    });

    alert("회원가입 완료");
    goBack();

>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}


// =============================
// 로그인
// =============================
async function login() {
  const id = document.getElementById("username").value.trim();
  const pw = document.getElementById("loginPw").value;

<<<<<<< HEAD
  if (!id) return alert("아이디를 입력해주세요.");
  if (!pw) return alert("비밀번호를 입력해주세요.");

=======
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
  try {
    const doc = await db.collection("users").doc(id).get();

    if (!doc.exists) {
<<<<<<< HEAD
      alert("사용자 정보가 없습니다.");
=======
      alert("사용자 정보 없음");
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
      return;
    }

    const user = doc.data();

    await auth.signInWithEmailAndPassword(user.email, pw);

    document.getElementById("loginModal").classList.add("hidden");
<<<<<<< HEAD
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    // 이전 표시 초기화
    document.getElementById("adminSection").classList.add("hidden");
    document.getElementById("userSection").classList.add("hidden");

    if (user.role === "운영" || user.role === "admin") {
      document.getElementById("adminSection").classList.remove("hidden");
      loadUsers();
    } else {
      document.getElementById("userSection").classList.remove("hidden");
      showUserData(user.name);
    }
=======
    document.getElementById("mainPage").classList.remove("hidden");

    if (user.role === "운영" || user.role === "admin") {
  document.getElementById("adminSection").classList.remove("hidden");
  loadUsers();
} else {
  document.getElementById("userSection").classList.remove("hidden");
  showUserData(user.name);
}

>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
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
<<<<<<< HEAD
  const courseFilterEl = document.getElementById("adminCourseFilter");

  list.innerHTML = "";

  let query = db.collection("users");
  const selectedCourse = courseFilterEl ? courseFilterEl.value : "";

  if (selectedCourse) {
    query = query.where("course", "==", selectedCourse);
  }

  try {
    const snapshot = await query.get();

    snapshot.forEach((doc) => {
      const u = doc.data();

      const div = document.createElement("div");
      div.className = "user-card";

      div.innerHTML = `
  <div class="card-top">
    <div class="user-name">${u.name} (${u.id})</div>
    <div class="user-role">${u.role}</div>

    <button class="edit-btn" onclick="updateUser('${u.id}')">
      수정하기
    </button>
  </div>

  <div class="card-bottom">
    <div>
      전화번호<br>
      <input id="p-${u.id}" value="${u.phone || ''}">
    </div>

    <div>
      이메일<br>
      <input id="e-${u.id}" value="${u.email || ''}">
    </div>
  </div>
`;

      list.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    alert("유저 목록을 불러오는 중 오류가 발생했습니다.");
  }
=======
  list.innerHTML = "";

  const snapshot = await db.collection("users").get();

  snapshot.forEach(doc => {
    const u = doc.data();

    const div = document.createElement("div");
    div.className = "user-card";

    div.innerHTML = `
      <div>${u.name} (${u.role})</div>

      <div>
        전화번호<br>
        <input id="p-${u.id}" value="${u.phone || ''}">
      </div>

      <div>
        이메일<br>
        <input id="e-${u.id}" value="${u.email || ''}">
      </div>

      <button onclick="updateUser('${u.id}')">수정</button>
    `;

    list.appendChild(div);
  });
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
}


// =============================
<<<<<<< HEAD
// 수정하기 / 저장 토글
// =============================
async function toggleEdit(id) {
  const phoneInput = document.getElementById(`p-${id}`);
  const emailInput = document.getElementById(`e-${id}`);
  const btn = document.getElementById(`btn-${id}`);

  if (!phoneInput || !emailInput || !btn) return;

  const isReadOnly = phoneInput.hasAttribute("readonly");

  if (isReadOnly) {
    phoneInput.removeAttribute("readonly");
    emailInput.removeAttribute("readonly");

    phoneInput.style.border = "2px solid #4d4dff";
    emailInput.style.border = "2px solid #4d4dff";

    btn.textContent = "저장";
  } else {
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!isValidPhone(phone)) {
      alert("전화번호 형식 오류 (010-0000-0000)");
      return;
    }

    if (!email.includes("@")) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }

    try {
      await db.collection("users").doc(id).update({
        phone,
        email
      });

      phoneInput.setAttribute("readonly", true);
      emailInput.setAttribute("readonly", true);

      phoneInput.style.border = "";
      emailInput.style.border = "";

      btn.textContent = "수정하기";

      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.error(error);
      alert("수정 중 오류가 발생했습니다.");
    }
  }
}


// =============================
// 관리자 - 유저 추가
// =============================
async function addUser() {
  const name = document.getElementById("adminName").value.trim();
  const phone = document.getElementById("adminPhone").value.trim();
  const email = document.getElementById("adminEmail").value.trim();
  const role = document.getElementById("adminRole").value;
  const course = document.getElementById("adminCourseFilter").value || null;

  if (!name) return alert("이름을 입력해주세요.");
  if (!phone) return alert("전화번호를 입력해주세요.");
  if (!email) return alert("이메일을 입력해주세요.");
  if (!role) return alert("역할을 선택해주세요.");

  if (!isValidPhone(phone)) {
    return alert("전화번호 형식 오류 (010-0000-0000)");
  }

  if (!email.includes("@")) {
    return alert("이메일 형식을 확인해주세요.");
  }

  try {
    const newId = `user-${Date.now()}`;

    await db.collection("users").doc(newId).set({
      id: newId,
      name,
      phone,
      email,
      role,
      course
    });

    document.getElementById("adminName").value = "";
    document.getElementById("adminPhone").value = "";
    document.getElementById("adminEmail").value = "";
    document.getElementById("adminRole").value = "";

    alert("유저가 추가되었습니다.");
    loadUsers();
  } catch (error) {
    console.error(error);
    alert("유저 추가 중 오류가 발생했습니다.");
  }
=======
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
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
}


// =============================
// 사용자 데이터
// =============================
async function showUserData(name) {
  const result = document.getElementById("result");
  result.innerHTML = "";

<<<<<<< HEAD
  try {
    const snapshot = await db.collection("scores")
      .where("name", "==", name)
      .get();

    if (snapshot.empty) {
      const li = document.createElement("li");
      li.textContent = "등록된 성취도 데이터가 없습니다.";
      result.appendChild(li);
      return;
    }

    snapshot.forEach((doc) => {
      const d = doc.data();
      const li = document.createElement("li");
      li.textContent = `${d.subject}: ${d.score}`;
      result.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert("성취도 데이터를 불러오는 중 오류가 발생했습니다.");
  }
=======
  const snapshot = await db.collection("scores")
    .where("name", "==", name)
    .get();

  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `${d.subject}: ${d.score}`;
    result.appendChild(li);
  });
>>>>>>> 533643da1a2b620afb68a75c27c4e8a527ba2c5f
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