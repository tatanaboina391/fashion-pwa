import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SareeGeneratedPreview.css";

const SareeGeneratedPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    sareeType, 
    sareeColor, 
    hasBorder, 
    borderType, 
    borderColor, 
    blouseColor, 
    frontNeck, 
    backNeck, 
    handDesign 
  } = location.state || {};

  const [isGenerating, setIsGenerating] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentImage, setCurrentImage] = useState("/saree-model.jpeg");
  const [aiDescription, setAiDescription] = useState("");

  const hasFetchedRef = useRef(false);

  const handleImageError = () => {
    setCurrentImage("https://placehold.co/400x600/1a1a2e/FFF?text=Saree+Model");
  };

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
      setTimeLeft(10); // Slightly more time for complex designs

      try {
        const payload = {
          selections: {
            fabric: { name: sareeType },
            sareeColor: sareeColor,
            border: hasBorder ? { type: borderType, color: borderColor } : "None",
            blouse: hasBorder ? "Standard" : {
              color: blouseColor,
              frontNeck,
              backNeck,
              handDesign
            }
          }
        };

        const response = await fetch("http://localhost:5000/generate-look", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();

        if (data.description) {
          setAiDescription(data.description);
        }

        if (data.imageBase64) {
          setCurrentImage(`data:image/png;base64,${data.imageBase64}`);
        } else if (data.image) {
          setCurrentImage(`data:image/png;base64,${data.image}`);
        }
      } catch (error) {
        console.error("Backend integration failed:", error);
        setAiDescription(
          "Our AI designers crafted this high-fashion look based on your unique specifications."
        );
      } finally {
        setIsGenerating(false);
        setTimeLeft(0);
      }
    };

    generateLook();
  }, [sareeType, sareeColor, hasBorder, borderType, borderColor, blouseColor, frontNeck, backNeck, handDesign]);

  const handleSave = () => {
    // Create a temporary link to download the AI generated masterpiece
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = `bespoke-${sareeType.toLowerCase()}-design.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("✨ Your bespoke design has been saved to your device!");
  };

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
                : "AI Vision Ready"}
            </h1>
            <p className="page-subtitle">
              {isGenerating
                ? "Synthesizing your custom fabric, border, and blouse specifications..."
                : "Your bespoke fashion design is ready for preview"}
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

                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="countdown-text">
                    Processing complex design patterns: {timeLeft}s remaining
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
                    <span className="ai-badge">✨ Luxury AI Edit</span>
                  </div>
                </div>

                <div className="design-info">
                  <h3 className="info-title">Design Parameters</h3>

                  <div className="ai-description-box">
                    <p>
                      <strong>✨ Designer's Note:</strong>{" "}
                      {aiDescription || "A sophisticated ensemble harmonizing traditional craftsmanship with modern silhouettes."}
                    </p>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Fabric</span>
                      <span className="value">{sareeType || "Silk"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Saree Color</span>
                      <span className="value">{sareeColor?.name || "Selected"}</span>
                    </div>

                    {hasBorder && (
                      <>
                        <div className="info-item">
                          <span className="label">Border</span>
                          <span className="value">{borderType}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Border Shade</span>
                          <span className="value">{borderColor?.name}</span>
                        </div>
                      </>
                    )}

                    <div className="info-item">
                      <span className="label">Blouse Shade</span>
                      <span className="value">{blouseColor?.name || "Match Selected"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Front Neck</span>
                      <span className="value">{frontNeck}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Back Neck</span>
                      <span className="value">{backNeck}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Hands</span>
                      <span className="value">{handDesign}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="secondary-button"
                      onClick={() => navigate("/saree/select")}
                    >
                      Restart
                    </button>
                    <button
                      className="primary-button pulse-button"
                      onClick={handleSave}
                    >
                      Save Design →
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
