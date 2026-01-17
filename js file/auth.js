
  // AUTH.JS

function $(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.supabaseClient) {
    console.error("Supabase not loaded");
    return;
  }

  const currentPage = window.location.pathname.split("/").pop();

  // SESSION CHECK 
  const protectedPages = [
    "student-dashboard.html",
    "raise-complaints.html",
    "view-complaints.html",
    "admin-dashboard.html",
    "total-complaints.html",
    "new-complaints.html",
    "pending-complaints.html",
    "resolved-complaints.html"
  ];

  if (protectedPages.includes(currentPage)) {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) window.location.href = currentPage.includes("admin") ? "admin-register.html" : "student-register.html";
  }

  // STUDENT LOGIN 
  const studentLoginBtn = $("student-login");
  if (studentLoginBtn) {
    studentLoginBtn.addEventListener("click", async () => {
      const email = $("student-username").value.trim();
      const password = $("student-password").value.trim();
      const hostelCode = $("hostel-code").value.trim();

      if (!email || !password || !hostelCode) return alert("All fields required");

      const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });

      if (error) return alert(error.message);

      window.location.href = "student-dashboard.html";
    }); 
  }

 // ADMIN LOGIN

  const adminLoginBtn = $("admin-login");
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", async () => {
      const email = $("admin-username").value.trim();
      const password = $("admin-password").value.trim();
      if (!email || !password) return alert("All fields required");

      const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
      if (error) return alert(error.message);

      window.location.href = "admin-dashboard.html";
    });
  }

  // BACK BUTTON 
  $("back")?.addEventListener("click", () => window.history.back());

  // LOGOUT 
  document.querySelector(".logout")?.addEventListener("click", async () => {
    await window.supabaseClient.auth.signOut();
    window.location.href = "index.html";
  });
});








// /* =========================
//    AUTH.JS – LOGIN / LOGOUT / SESSION
// ========================= */

// function $(id) {
//   return document.getElementById(id);
// }

// document.addEventListener("DOMContentLoaded", async () => {
//     if (!window.supabaseClient) {
//         console.error("Supabase not loaded");
//         return;
//     }

//     // SESSION CHECK (for protected pages)
//     const protectedPages = ["student-dashboard.html", "raise-complaint.html", "view-complaint.html"];
//     const currentPage = window.location.pathname.split("/").pop();

//     if (protectedPages.includes(currentPage)) {
//         const { data } = await window.supabaseClient.auth.getSession();
//         if (!data.session) {
//             window.location.href = "index.html";
//         }
//     }

//     // STUDENT LOGIN
//     const loginBtn = $("student-login");
//     if (loginBtn) {
//         loginBtn.addEventListener("click", async () => {
//             const email = $("student-username").value.trim();
//             const password = $("student-password").value.trim();

//             if (!email || !password) {
//                 alert("Please enter email and password");
//                 return;
//             }

//             const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });

//             if (error) {
//                 alert(error.message);
//                 return;
//             }

//             window.location.href = "student-dashboard.html";
//         });
//     }

//     // LOGOUT
//     const logoutBtn = $("back") || document.querySelector(".logout");
//     if (logoutBtn) {
//         logoutBtn.addEventListener("click", async () => {
//             await window.supabaseClient.auth.signOut();
//             window.location.href = "index.html";
//         });
//     }
// });




// function $(id) { return document.getElementById(id); }

// document.addEventListener("DOMContentLoaded", async () => {
//   if (!window.supabaseClient) return;

//   // SESSION CHECK
//   const protectedPages = ["student-dashboard.html","raise-complaints.html","view-complaints.html"];
//   const currentPage = window.location.pathname.split("/").pop();
//   if (protectedPages.includes(currentPage)) {
//     const { data } = await window.supabaseClient.auth.getSession();
//     if (!data.session) window.location.href = "index.html";
//   }

//   // STUDENT LOGIN
//   const loginBtn = $("student-login");
//   if (loginBtn) {
//     loginBtn.addEventListener("click", async () => {
//       const email = $("student-username")?.value.trim();
//       const password = $("student-password")?.value.trim();
//       if (!email || !password) return alert("Please enter email and password");

//       const { data, error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
//       if (error) return alert(error.message);

//       window.location.href = "student-dashboard.html";
//     });
//   }

//   // LOGOUT
//   const logoutBtn = $("back") || document.querySelector(".logout");
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", async () => {
//       await window.supabaseClient.auth.signOut();
//       window.location.href = "index.html";
//     });
//   }
// });
