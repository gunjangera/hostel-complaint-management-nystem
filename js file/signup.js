document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = form.name.value.trim();
        const enrollment = form.enrollment.value.trim();
        const email = form.email.value.trim();
        const mobile = form.mobile.value.trim();
        const password = form.password.value.trim();
        const confirmPassword = form.confirm_password.value.trim();

        if (!fullName || !enrollment || !email || !mobile || !password || !confirmPassword) {
            return alert("All fields are required!");
        }

        if (password !== confirmPassword) {
            return alert("Passwords do not match!");
        }

        // Create user in Supabase Auth
        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,
            options: {
               
                emailRedirectTo: "http://localhost:3000/student-register.html",

                data: {
                    full_name: fullName,
                    enrollment,
                    mobile
                }
            }
        });

        if (error) return alert("Signup failed: " + error.message);

        alert("Signup successful! Please check your email and then login.");
        window.location.href = "student-register.html";
    });
});
