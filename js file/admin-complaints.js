document.addEventListener("DOMContentLoaded", async () => {
  const { data: { user } } = await window.supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = "admin-register.html";
    return;
  }

  //Profile Menu 
  const profileBtn = document.getElementById("profileBtn");
  const profileMenu = document.getElementById("profileMenu");
  profileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu?.classList.toggle("show");
  });
  document.addEventListener("click", () => profileMenu?.classList.remove("show"));
  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await window.supabaseClient.auth.signOut();
    window.location.href = "admin-register.html";
  });
   document.getElementById("adminDashboardBtn")?.addEventListener("click", () => {
    window.location.href = "admin-dashboard.html";
});


  // Determine Page Type
  const pageType = document.querySelector(".heading")?.textContent.toLowerCase();

  // Fetch Complaints 
  let query = window.supabaseClient.from("complaints").select("*").order("created_at", { ascending: false });
  
  if (pageType.includes("pending")) query = query.eq("status", "pending");
  else if (pageType.includes("resolved")) query = query.eq("status", "resolved");
  else if (pageType.includes("new")) {
    const lastLogin = user.last_sign_in_at || new Date(0).toISOString();
    query = query.gt("created_at", lastLogin);
  }

  const { data: complaints, error } = await query;
  if (error) {
    console.error(error);
    return;
  }

  const list = document.getElementById("complaintList");
  if (list) {
    list.innerHTML = complaints.length
  ? complaints.map(c => `
      <div class="complaint-card">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <small>Status: ${c.status}</small>

        ${c.status === "pending" ? 
          `<button class="resolve-btn" data-id="${c.id}" data-student="${c.student_id}">
            Mark as Resolved
          </button>` 
        : ""}
      </div>
    `).join("")
  : "<p>No complaints found</p>";

  }


  // RESOLVE COMPLAINT + NOTIFICATION
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("resolve-btn")) return;

  const complaintId = e.target.dataset.id;
  const studentId = e.target.dataset.student;

  //  Update complaint status
  const { error: updateError } = await window.supabaseClient
    .from("complaints")
    .update({ status: "resolved" })
    .eq("id", complaintId);

  if (updateError) {
    alert("Failed to resolve complaint");
    console.error(updateError);
    return;
  }

  const { error: notifError } = await window.supabaseClient
    .from("notifications")
    .insert([{
      student_id: studentId,
      message: "Your complaint has been resolved"
    }]);

  if (notifError) {
    console.error("Notification error:", notifError);
  }

  alert("Complaint resolved successfully");
  location.reload(); 
});

});


//total-complaint
function renderComplaint(c) {
    const list = document.getElementById("complaintList");

    const card = document.createElement("div");
    card.className = "complaint-card";

    const statusText = c.status.trim().toLowerCase(); 

    let statusClass = "";
    if (statusText.includes("pending")) {
        statusClass = "status-pending";
    }
    else if (statusText.includes("resolved") || statusText.includes("solved")) {
        statusClass = "status-resolved";
    }

    card.innerHTML = `
        <h3>${c.title}</h3>
        <p>${c.details}</p>

        <div class="status-box ${statusClass}">
            ${c.status}
        </div>

        ${statusText.includes("pending") 
            ? `<button class="resolve-btn" onclick="markResolved('${c.id}')">Mark as Resolved</button>` 
            : ""
        }
    `;

    list.appendChild(card);
}