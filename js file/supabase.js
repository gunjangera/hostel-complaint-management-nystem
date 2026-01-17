const SUPABASE_URL = "https://anxxhejgleehoinlubhx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhoZWpnbGVlaG9pbmx1Ymh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NzE5NDcsImV4cCI6MjA4MzQ0Nzk0N30.TJCYy4C-hTnse_NZgL4XzP36sBrgk-tNtSx1cqu3F_s";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
);

console.log("Supabase ready:", window.supabaseClient);
console.log("Auth object:", window.supabaseClient.auth);