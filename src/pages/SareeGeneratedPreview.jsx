import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SareeGeneratedPreview.css";

const SareeGeneratedPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blouseFront, blouseBack, sareeType, blouseColor, sareeColor } =
    location.state || {};

  const [isGenerating, setIsGenerating] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentImage, setCurrentImage] = useState("/saree-model.jpeg");
  const [aiDescription, setAiDescription] = useState("");

  // Ref to track if we've already initiated the fetch (Prevents Double Call)
  const hasFetchedRef = useRef(false);

  const handleImageError = () => {
    setCurrentImage("https://placehold.co/400x600/1a1a2e/FFF?text=Saree+Model");
  };

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const generateLook = async () => {
      // Start countdown (8s = 6s backend + 2s buffer)
      setTimeLeft(8);

      try {
        const response = await fetch("http://localhost:5000/generate-look", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selections: {
              fabric: { name: sareeType },
              sareeColor: sareeColor, // Keeping as is (object or string, handled by backend)
              frontNeck: { name: blouseFront },
              backNeck: { name: blouseBack },
              blouseColor: blouseColor, // Keeping as is (object or string, handled by backend)
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        // Update UI with Backend Response
        if (data.description) {
          setAiDescription(data.description);
        }

        // Handle success: true logic if present in your requested snippet
        if (data.success && data.description) {
          setAiDescription(data.description);
        }

        // Handle image if backend returns one (even though snippet only touched text)
        if (data.imageBase64) {
          setCurrentImage(`data:image/png;base64,${data.imageBase64}`);
        } else if (data.image) {
          setCurrentImage(`data:image/png;base64,${data.image}`);
        } else {
          console.warn("Backend did not return an image. Using fallback.");
        }
      } catch (error) {
        console.error("Backend integration failed:", error);
        setAiDescription(
          "Could not contact the design studio. Please try again.",
        );
      } finally {
        setIsGenerating(false);
        setTimeLeft(0);
      }
    };

    generateLook();
  }, [blouseFront, blouseBack, sareeType, blouseColor, sareeColor]);

  const handleContinue = () => {
    navigate("/saree/customize", {
      state: { blouseFront, blouseBack, sareeType, baseImage: currentImage },
    });
  };

  // UI rendering (Unchanged)
  return (
    <div className="saree-preview-container">
      <div className="preview-header">
        <div className="container">
          <button
            onClick={() => navigate("/saree/select")}
            className="back-button"
            disabled={isGenerating}
          >
            ← Back to Selection
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">
              {isGenerating
                ? `Generating... (${timeLeft}s)`
                : "Your Custom Design"}
            </h1>
            <p className="page-subtitle">
              {isGenerating
                ? "Please wait while AI designs your look..."
                : "Here is the realistic preview of your selections"}
            </p>
          </div>
        </div>
      </div>

      <div className="preview-content">
        <div className="container">
          <div className="preview-card">
            {isGenerating ? (
              <div className="generation-loader">
                <div className="scanner-container">
                  <div className="scanner-line"></div>
                  <div className="ai-icon-pulse">✨</div>
                </div>

                {/* Progress Bar with Countdown */}
                <div
                  style={{
                    width: "80%",
                    maxWidth: "400px",
                    margin: "2rem auto",
                  }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      height: "6px",
                      background: "#e0e0e0",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="progress-fill"
                      style={{
                        width: `${((8 - timeLeft) / 8) * 100}%`,
                        height: "100%",
                        background: "#a855f7",
                        transition: "width 1s linear",
                      }}
                    ></div>
                  </div>
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      color: "#666",
                    }}
                  >
                    Estimated time: {timeLeft} seconds remaining
                  </p>
                </div>
              </div>
            ) : (
              <div className="generated-result fade-in">
                <div className="result-image-wrapper">
                  <img
                    src={currentImage}
                    alt="AI Generated Saree"
                    className="result-image"
                    onError={handleImageError}
                  />
                  <div className="image-overlay">
                    <span className="ai-badge">✨ AI Generated</span>
                  </div>
                </div>

                <div className="design-info">
                  <h3 className="info-title">Design Specs</h3>

                  <div
                    className="ai-description-box"
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      borderLeft: "4px solid #a855f7",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      marginBottom: "1.5rem",
                      color: "#e9d5ff",
                      fontStyle: "italic",
                    }}
                  >
                    <p>
                      <strong>✨ Designer's Note:</strong>{" "}
                      {aiDescription || "A masterpiece of elegance."}
                    </p>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Blouse Style</span>
                      <span className="value">
                        {blouseFront || "Round Neck"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Saree Type</span>
                      <span className="value">{sareeType || "Silk"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Model Fit</span>
                      <span className="value">Standard Drape</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="secondary-button"
                      onClick={() => navigate("/saree/select")}
                    >
                      Regenerate
                    </button>
                    <button
                      className="primary-button pulse-button"
                      onClick={handleContinue}
                    >
                      Customize Colors →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeGeneratedPreview;
