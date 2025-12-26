import { supabase } from "./supabase.js";

const authSection = document.getElementById("authSection");
const userSection = document.getElementById("userSection");
const userEmailEl = document.getElementById("userEmail");

function showAuth() {
  authSection.classList.remove("hidden");
  userSection.classList.add("hidden");
}

function showUser(user) {
  userEmailEl.textContent = user.email;
  authSection.classList.add("hidden");
  userSection.classList.remove("hidden");
}

document.getElementById("googleLogin").addEventListener("click", async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "https://plcnbgocfafalblbhmlikcplkmnnmcfj.chromiumapp.org/supabase/callback",
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
  }
});

document.getElementById("emailLogin").onclick = async () => {
  const email = prompt("Enter your email");
  if (!email) return;

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: chrome.runtime.getURL("sidepanel.html"),
    },
  });

  alert("Check your email for the login link.");
};

document.getElementById("logout").onclick = async () => {
  await supabase.auth.signOut();
  showAuth();
};

async function loadSession() {
  const { data } = await supabase.auth.getUser();
  if (data?.user) showUser(data.user);
  else showAuth();
}

loadSession();
