const button = document.querySelector("button");

const clientId =
  process.env.CLIENT
const redirectUrl = process.env.REDIRECT_URL;
const authUrl = process.env.AUTH_URL;

if (!clientId || !redirectUrl || !authUrl) {
  throw new Error("Environment variables CLIENT, REDIRECT_URL, and AUTH_URL must be set.");
}

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", async ({ data }) => {
  if (data.message === "success") {
    location.href = "/";
  } else {
    const para = document.createElement("p");
    para.innerText = "Something went wrong!";
    document.body.appendChild(para);
    setTimeout(() => {
      para.remove();
    }, 2000);
  }
});
