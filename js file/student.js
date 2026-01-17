document.addEventListener("DOMContentLoaded", async () => {
  if (!window.supabaseClient) {
    console.error("Supabase client not loaded");
    return;
  }

  const { data: { user } } = await window.supabaseClient.auth.getUser();
  if (!user) {
    window.location.href = "student-register.html";
    return;
  }

  //  PROFILE MENU 
  const profileBtn = document.getElementById("profileBtn");
  const profileMenu = document.getElementById("profileMenu");
  if (profileBtn && profileMenu) {
    const name = user.user_metadata?.full_name || "Student";
    profileBtn.querySelector("span").textContent = name;
    profileMenu.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Name:</strong> ${name}`;
    profileMenu.querySelector("p:nth-of-type(2)").innerHTML = `<strong>Email:</strong> ${user.email}`;

    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle("show");
    });
    document.addEventListener("click", () => profileMenu.classList.remove("show"));
  }

  // DASHBOARD NAV 
  const dashRaiseBtn = document.getElementById("dash-raise-complaint");
  const dashViewBtn = document.getElementById("dash-view-complaint");
  if (dashRaiseBtn) dashRaiseBtn.addEventListener("click", () => window.location.href = "raise-complaints.html");
  if (dashViewBtn) dashViewBtn.addEventListener("click", () => window.location.href = "view-complaints.html");

  // SIDE NAV 
  const sideRaiseBtn = document.getElementById("side-raise-complaint");
  const sideViewBtn = document.getElementById("side-view-complaint");
  if (sideRaiseBtn) sideRaiseBtn.addEventListener("click", () => window.location.href = "raise-complaints.html");
  if (sideViewBtn) sideViewBtn.addEventListener("click", () => window.location.href = "view-complaints.html");

  // LOGOUT 
  const logoutBtn = document.querySelector(".logout") || document.getElementById("back");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await window.supabaseClient.auth.signOut();
      window.location.href = "index.html";
    });
  }

  //  RAISE COMPLAINT FORM 
  const form = document.getElementById("raise-complaint-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = document.getElementById("title")?.value.trim();
      const category = document.getElementById("category")?.value;
      const description = document.getElementById("description")?.value.trim();

      if (!title || !category || !description) {
        alert("All fields required");
        return;
      }

      const { error } = await window.supabaseClient.from("complaints").insert([{
        student_id: user.id,
        title,
        category,
        description,
        status: "pending"
      }]);

      if (error) {
        console.error(error);
        alert("Complaint submission failed");
        return;
      }
      await window.supabaseClient.from("notifications").insert([{
  student_id: user.id,
  message: "Your complaint was successfully submitted"
}]);

      window.location.href = "view-complaints.html";
    });
  }

  // VIEW COMPLAINTS 
  const list = document.getElementById("complaintList");
  if (list) {
    const { data: complaints, error } = await window.supabaseClient
      .from("complaints")
      .select("*")
      .eq("student_id", user.id)
      .order("created_at", { ascending: false });

    if (error) return console.error(error);

    list.innerHTML = complaints.length
      ? complaints.map(c => `
          <div class="complaint-card">
            <h3>${c.title}</h3>
            <p>${c.description}</p>
            <small>Status: ${c.status}</small>
          </div>
        `).join("")
      : "<p>No complaints yet</p>";
  }


  //  GO BACK TO DASHBOARD
document.getElementById("go-dashboard")?.addEventListener("click", () => {
  window.location.href = "student-dashboard.html";
});

// NOTIFICATION PAGE
document.getElementById("notification")?.addEventListener("click", () => {
  window.location.href = "notifications.html";
});

// NOTIFICATIONS 
const notificationList = document.getElementById("notificationList");
if (notificationList) {
  const { data, error } = await window.supabaseClient
    .from("notifications")
    .select("*")
    .eq("student_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return console.error(error);

  notificationList.innerHTML = data.length
    ? data.map(n => `<p>🔔 ${n.message}</p>`).join("")
    : "<p>No notifications</p>";
}

});