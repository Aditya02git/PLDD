import { useState, useEffect } from "react";

export default function Languages() {
  const [open, setOpen] = useState(false);
  const [openCount, setOpenCount] = useState(0); // To track modal opening count

  useEffect(() => {
    if (open) {
      setOpenCount((prevCount) => prevCount + 1); // Increment open count on each open
    }
  }, [open]);

  useEffect(() => {
    if (openCount === 2) {
      window.location.reload(); // Refresh the page only when the modal is opened twice
    }
  }, [openCount]); // This effect runs when `openCount` changes

  useEffect(() => {
    if (open && openCount === 1) {
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,as,bn,gu,hi,kn,ml,mr,ne,or,pa,sa,ta,te,ur",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        };

        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      } else {
        window.googleTranslateElementInit();
      }
    }
  }, [open, openCount]); // This effect runs when modal opens

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      background: "white",
      padding: "20px",
      borderRadius: "5px",
      textAlign: "center",
    },
    closeButton: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
    googleTranslate: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <button
        className="btn btn-sm font-normal btn-ghost   text-black dark:text-white"
        onClick={() => setOpen(true)}
      >
        🌐Language
      </button>
      {open && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div
              id="google_translate_element"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
              }}
            >
              <h2>Select Your Language</h2>
            </div>
            <style>
              {`
                .goog-te-gadget-icon {
                  display: none !important;
                }
                .goog-te-menu-value span:first-child {
                  display: block !important;
                }
                .goog-te-menu-frame {
                  max-height: 300px !important;
                  overflow-y: auto !important;
                }
                .goog-te-menu2 {
                  display: flex !important;
                  flex-direction: column !important;
                }
                iframe.VIpgJd-ZVi9od-ORHb-OEVmcd {
                  display: none !important;
                }
              `}
            </style>
            <button style={styles.closeButton} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
