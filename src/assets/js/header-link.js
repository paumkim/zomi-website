document.addEventListener("DOMContentLoaded", function() {
  var title = document.querySelector(".md-header__title");
  if (title) {
    title.style.cursor = "pointer";
    title.addEventListener("click", function() {
      window.location.href = "/zomi-website/";
    });
  }

  // Floating GoFundMe button
  var btn = document.createElement("a");
  btn.href = "https://www.gofundme.com/f/zomi-zolai-zopau?attribution_id=a6f2a24f-9569-405e-aabf-92efec33807a";
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.innerHTML = "❤️ Support Zomi AI";
  btn.style.cssText = "position:fixed;bottom:24px;right:24px;background:#FF5370;color:white;padding:12px 20px;border-radius:30px;text-decoration:none;font-weight:600;z-index:9999;box-shadow:0 4px 15px rgba(255,83,112,0.4);transition:transform 0.2s,box-shadow 0.2s;font-family:inherit;font-size:14px;";
  btn.onmouseover = function() { this.style.transform = "scale(1.05)"; this.style.boxShadow = "0 6px 20px rgba(255,83,112,0.6)"; };
  btn.onmouseout = function() { this.style.transform = "scale(1)"; this.style.boxShadow = "0 4px 15px rgba(255,83,112,0.4)"; };
  document.body.appendChild(btn);
});
