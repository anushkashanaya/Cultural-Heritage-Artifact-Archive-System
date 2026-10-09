// =============================
// DATA STORAGE (FRONTEND ONLY)
// =============================

let disasters = [];
let camps = [];
let victims = [];
let users = [];
let resources = [];
let donations = [];

let dId = 1, cId = 1, vId = 1, uId = 1, rId = 1, dnId = 1;

// =============================
// NAVIGATION FIX
// =============================

function showPanel(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// =============================
// CLOCK
// =============================

setInterval(() => {
  document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// =============================
// DELETE HELPER
// =============================

function deleteItem(arr, id, renderFn) {
  const index = arr.findIndex(i => i.id === id);
  if (index !== -1) arr.splice(index, 1);
  renderFn();
  updateDashboard();
}

// =============================
// DASHBOARD
// =============================

function updateDashboard() {
  document.getElementById('totalDisasters').innerText = disasters.length;
  document.getElementById('totalVictims').innerText = victims.length;
  document.getElementById('totalUsers').innerText = users.length;

  let total = donations.reduce((sum, d) => sum + d.amount, 0);
  document.getElementById('totalDonations').innerText = `₹${total}`;
}

// =============================
// DISASTERS
// =============================

function addDisaster() {
  disasters.push({
    id: dId++,
    name: document.getElementById('d-name').value,
    type: document.getElementById('d-type').value,
    location: document.getElementById('d-location').value,
    severity: document.getElementById('d-severity').value
  });

  renderDisasters();
  updateDashboard();
}

function renderDisasters() {
  document.getElementById('disasterTable').innerHTML =
    disasters.map(d => `
      <tr>
        <td>${d.id}</td>
        <td>${d.name}</td>
        <td>${d.type}</td>
        <td>${d.location}</td>
        <td>${d.severity}</td>
        <td><button onclick="deleteDisaster(${d.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteDisaster(id) {
  deleteItem(disasters, id, renderDisasters);
}

// =============================
// CAMPS
// =============================

function addCamp() {
  camps.push({
    id: cId++,
    name: document.getElementById('camp-name').value,
    location: document.getElementById('camp-location').value,
    capacity: document.getElementById('camp-capacity').value,
    manager: document.getElementById('camp-manager').value
  });

  renderCamps();
}

function renderCamps() {
  document.getElementById('campTable').innerHTML =
    camps.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.location}</td>
        <td>${c.capacity}</td>
        <td><button onclick="deleteCamp(${c.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteCamp(id) {
  deleteItem(camps, id, renderCamps);
}

// =============================
// VICTIMS
// =============================

function addVictim() {
  victims.push({
    id: vId++,
    name: document.getElementById('victim-name').value,
    age: document.getElementById('victim-age').value,
    status: document.getElementById('victim-status').value
  });

  renderVictims();
  updateDashboard();
}

function renderVictims() {
  document.getElementById('victimTable').innerHTML =
    victims.map(v => `
      <tr>
        <td>${v.id}</td>
        <td>${v.name}</td>
        <td>${v.age}</td>
        <td>${v.status}</td>
        <td><button onclick="deleteVictim(${v.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteVictim(id) {
  deleteItem(victims, id, renderVictims);
}

// =============================
// USERS
// =============================

function addUser() {
  users.push({
    id: uId++,
    name: document.getElementById('user-name').value,
    email: document.getElementById('user-email').value,
    role: document.getElementById('user-role').value
  });

  renderUsers();
  updateDashboard();
}

function renderUsers() {
  document.getElementById('userTable').innerHTML =
    users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td><button onclick="deleteUser(${u.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteUser(id) {
  deleteItem(users, id, renderUsers);
}

// =============================
// RESOURCES
// =============================

function addResource() {
  resources.push({
    id: rId++,
    name: document.getElementById('resource-name').value,
    qty: document.getElementById('resource-qty').value,
    category: document.getElementById('resource-category').value
  });

  renderResources();
}

function renderResources() {
  document.getElementById('resourceTable').innerHTML =
    resources.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.qty}</td>
        <td>${r.category}</td>
        <td><button onclick="deleteResource(${r.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteResource(id) {
  deleteItem(resources, id, renderResources);
}

// =============================
// DONATIONS
// =============================

function addDonation() {
  donations.push({
    id: dnId++,
    donor: document.getElementById('donor-name').value,
    amount: Number(document.getElementById('donation-amount').value || 0)
  });

  renderDonations();
  updateDashboard();
}

function renderDonations() {
  document.getElementById('donationTable').innerHTML =
    donations.map(d => `
      <tr>
        <td>${d.id}</td>
        <td>${d.donor}</td>
        <td>₹${d.amount}</td>
        <td><button onclick="deleteDonation(${d.id})">❌</button></td>
      </tr>
    `).join('');
}

function deleteDonation(id) {
  deleteItem(donations, id, renderDonations);
}

// =============================
// SQL (DUMMY)
// =============================

function runSql() {
  document.getElementById('sqlResult').innerText =
    "⚠ SQL Terminal is UI-only (no backend connected yet)";
}

// =============================
// INIT
// =============================

updateDashboard();