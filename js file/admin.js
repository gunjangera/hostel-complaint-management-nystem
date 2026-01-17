document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");
    const logoutBtn = document.getElementById("logoutBtn");

    // PROFILE MENU TOGGLE
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle("show");
        });
        document.addEventListener("click", () => profileMenu.classList.remove("show"));
    }

    document.getElementById("adminDashboardBtn")?.addEventListener("click", () => {
    window.location.href = "admin-dashboard.html";
});


    // LOGOUT
    logoutBtn?.addEventListener("click", async () => {
        await window.supabaseClient.auth.signOut();
        window.location.href = "index.html";
    });

    // DASHBOARD BUTTONS
    document.querySelector(".card-btn.blue")?.addEventListener("click", () => {
        window.location.href = "total-complaints.html";
    });
    document.querySelector(".card-btn.yellow")?.addEventListener("click", () => {
        window.location.href = "new-complaints.html";
    });
    document.querySelector(".card-btn.red")?.addEventListener("click", () => {
        window.location.href = "pending-complaints.html";
    });
    document.querySelector(".card-btn.green")?.addEventListener("click", () => {
        window.location.href = "resolved-complaints.html";
    });
});







