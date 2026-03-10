const STORAGE_KEY = "pro_users";

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function seedAdmin() {
  const users = getUsers();
  if (users.length > 0) return;
  const now = new Date().toISOString();
  users.push({
    id: 1,
    first_name: "System",
    last_name: "Admin",
    dob: "1990-01-01",
    gender: "Other",
    email: "admin@example.com",
    phone: "+10000000000",
    username: "admin",
    password_hash: "admin123",
    role_id: "1",
    created_at: now,
    reset_code: "",
    is_active: true,
    activation_code: "ACT-ADMIN",
    updated_by: "system",
    updated_at: now,
    user_category_id: "A1",
    notes: "Default administrator account",
    is_visible: "y"
  });
  saveUsers(users);
}

function toFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.is_active = data.is_active === "on";
  data.is_visible = data.is_visible || "y";
  return data;
}

function showNotice(el, message, isError = false) {
  if (!el) return;
  el.className = `notice ${isError ? "notice-error" : "notice-success"}`;
  el.textContent = message;
}

function requireLogin() {
  if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = "index.html";
  }
}

function setNavActive() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

function logout() {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
}

seedAdmin();
