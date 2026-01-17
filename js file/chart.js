document.addEventListener("DOMContentLoaded", async () => {
  const page = document.body.dataset.page;

  if (page !== "dashboard" && page !== "all") return;

  if (!window.supabaseClient) {
    console.error("Supabase not loaded");
    return;
  }

  const chartCanvas = document.getElementById("complaintChart");
  if (!chartCanvas) return;

  const { data: complaints, error } = await window.supabaseClient
    .from("complaints")
    .select("status");

  if (error) {
    console.error(error);
    return;
  }

  const pendingCount = complaints.filter(c => c.status === "pending").length;
  const resolvedCount = complaints.filter(c => c.status === "resolved").length;

  new Chart(chartCanvas.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: ["Pending", "Resolved"],
      datasets: [{
        data: [pendingCount, resolvedCount],
        backgroundColor: ["#f39c12", "#27ae60"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
});
