import React from "react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Footer() {
  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
  method: "POST",
  body: formData,
});
    const data = await res.json();
    setUrl(data.cloudinary?.secure_url);
    setUploaded(true);
  };
  return (
    <footer className="bg-gray-900 text-white mt-10">
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleUpload}>
          <label htmlFor="file">
            {" "}
            Upload Image to Show :{" "}
            <input type="file" name="file" encType="multipart/form-data" />{" "}
          </label>
          <input type="submit" />
        </form>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <form
          onSubmit={handleUpload}
          style={{
            display: uploaded ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            border: "2px solid #21f600ff",
            borderRadius: "0.5rem",
            backgroundColor: "#111827",
          }}
        >
          <label
            htmlFor="file"
            style={{ color: "#facc15", fontWeight: "bold" }}
          >
            Upload Image to Show :{" "}
            <input
              type="file"
              name="file"
              encType="multipart/form-data"
              style={{
                marginLeft: "0.5rem",
                padding: "0.25rem",
                borderRadius: "0.25rem",
                border: "1px solid #00ddffff",
              }}
            />
          </label>
          <input
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#facc15",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#111827",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#eab308")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#facc15")}
          />
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        {/* Left: Profile Image
        <div className="flex flex-col items-center md:items-start">
          <img
            src={HaneefPic}
            alt="Haneef Ur Rahman"
            className="w-[310px] h-[350px] rounded-none border-4 border-yellow-400 shadow-lg mb-4"
          />
        </div> */}

        {/* Right: Name & Skills */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "2.25rem",
            padding: "1.75rem",
            backgroundColor: "#1f2937",
            borderRadius: "0.5rem",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          }}
        >
          {/* Left: Profile Image */}
          <div style={{ flexShrink: 0 }}>
            {url && (
              <img
                src={url}
                alt="Haneef Ur Rahman"
                style={{
                  width: "350px",
                  height: "410px",
                  borderRadius: "0px",
                  boxShadow:
                    "0 0 10px rgba(255, 13, 0, 1), 0 0 20px rgb(10,200,0), 0 0 30px rgb(0,10,200), 0 0 40px rgb(150,200,10)",
                  border: "4px solid #facc15",
                }}
              />
            )}
          </div>

          {/* Right: Info */}
          <div style={{ textAlign: "left", flex: 1 }}>
            {/* Name */}
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                color: "#facc15",
                textShadow: "0 0 15px rgb(255,20,147)",
                marginBottom: "1rem",
              }}
            >
              Haneef Ur Rahman
            </h1>

            {/* Headline & Skills */}
            <p
              style={{
                color: "#e5e7eb",
                fontSize: "1.125rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "#3b82f6",
                  textShadow: "0 0 5px rgb(0,191,255)",
                }}
              >
                Front-End Engineer
              </span>{" "}
              ||{" "}
              <span
                style={{
                  color: "#facc15",
                  textShadow: "0 0 5px rgb(255,255,0)",
                }}
              >
                HTML
              </span>
              ,{" "}
              <span
                style={{ color: "#22c55e", textShadow: "0 0 5px rgb(0,255,0)" }}
              >
                CSS
              </span>
              ,{" "}
              <span
                style={{
                  color: "#a855f7",
                  textShadow: "0 0 5px rgb(128,0,128)",
                }}
              >
                Bootstrap
              </span>
              ,{" "}
              <span
                style={{
                  color: "#ec4899",
                  textShadow: "0 0 5px rgb(255,20,147)",
                }}
              >
                JavaScript (ES6+)
              </span>
              ,{" "}
              <span
                style={{
                  color: "#6366f1",
                  textShadow: "0 0 5px rgb(75,0,130)",
                }}
              >
                TypeScript
              </span>
              ,{" "}
              <span
                style={{
                  color: "#06b6d4",
                  textShadow: "0 0 5px rgb(0,255,255)",
                }}
              >
                React.js
              </span>
              ,{" "}
              <span
                style={{
                  color: "#f43f5e",
                  textShadow: "0 0 5px rgb(255,0,127)",
                }}
              >
                Firebase ♦
              </span>{" "}
              <span
                style={{
                  color: "#0d9488",
                  textShadow: "0 0 5px rgb(0,128,128)",
                }}
              >
                REST APIs
              </span>
              ,{" "}
              <span
                style={{ color: "#84cc16", textShadow: "0 0 5px rgb(0,255,0)" }}
              >
                Git
              </span>
              ,{" "}
              <span
                style={{
                  color: "#f97316",
                  textShadow: "0 0 5px rgb(255,165,0)",
                }}
              >
                GitHub ♦
              </span>{" "}
              <span
                style={{
                  color: "#f97316",
                  textShadow: "0 0 5px rgb(0,245,117)",
                }}
              >
                Express.js
              </span>
              ,{" "}
              <span
                style={{
                  color: "#d946ef",
                  textShadow: "0 0 5px rgb(255,0,255)",
                }}
              >
                PHP
              </span>
              ,{" "}
              <span
                style={{
                  color: "#10b981",
                  textShadow: "0 0 5px rgb(0,255,127)",
                }}
              >
                MySQL ♦
              </span>{" "}
              <span
                style={{
                  color: "#8b5cf6",
                  textShadow: "0 0 5px rgb(238,130,238)",
                }}
              >
                Figma
              </span>
              .
            </p>

            {/* Contact Info */}
            <div
              style={{
                color: "#d1d5db",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              <p style={{ fontWeight: "bold" }}>📫 Connect with Me:</p>
              <p style={{ paddingTop: "0.5rem" }}>
                🐙 GitHub:{" "}
                <a
                  href="https://github.com/Haneef-Ur-Rahman"
                  target="_blank"
                  style={{ color: "#facc15", textDecoration: "underline" }}
                >
                  github.com/Haneef-Ur-Rahman
                </a>
              </p>
              <p>
                💼 LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/haneef-ur-rahman-85006433b/"
                  target="_blank"
                  style={{ color: "#3b82f6", textDecoration: "underline" }}
                >
                  linkedin.com/in/haneef-ur-rahman-85006433b/
                </a>
              </p>
              <p>
                📂 Portfolio:{" "}
                <a
                  href="https://haneef-ur-rahman.github.io/my-Portfolio/"
                  target="_blank"
                  style={{ color: "#ec4899", textDecoration: "underline" }}
                >
                  haneef-ur-rahman.github.io/my-Portfolio/
                </a>
              </p>
              <p>
                ✉️ Email:{" "}
                <a
                  href="mailto:haneef04022004@gmail.com"
                  style={{ color: "#f97316", textDecoration: "underline" }}
                >
                  haneef04022004@gmail.com
                </a>
              </p>
              <p>
                📱 WhatsApp:{" "}
                <a
                  href="https://wa.me/923083336559"
                  target="_blank"
                  style={{ color: "#22c55e", textDecoration: "underline" }}
                >
                  +92 308 3336559
                </a>
              </p>
              <p>
                🌐 Linktree:{" "}
                <a
                  href="https://linktr.ee/Haneef_Ur_Rahman"
                  target="_blank"
                  style={{ color: "#a855f7", textDecoration: "underline" }}
                >
                  linktr.ee/Haneef_Ur_Rahman
                </a>
              </p>
            </div>
          </div>
        </div>
        <div>
          <p
            style={{
              color: "#d9ff00ff",
              fontSize: "1rem",
              marginTop: "25px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            &copy; 2025 Hiozon Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
