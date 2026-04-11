import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SareeGeneratedPreview.css";

const SareeGeneratedPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    type = 'saree', // item type: saree, lehanga, half-saree
    sareeType, 
    sareeColor, 
    hasBorder, 
    borderType, 
    borderColor, 
    blouseColor, 
    frontNeck, 
    backNeck, 
    handDesign,
    skirtFabric,
    lehangaFabric,
    dupattaFabric,
    dupattaColor,
    blouseFabric,
    designs = []
  } = location.state || {};

  const [isGenerating, setIsGenerating] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentImage, setCurrentImage] = useState("/saree-model.jpeg");
  const [aiDescription, setAiDescription] = useState("");

  const hasFetchedRef = useRef(false);

  // Helper for dynamic labels
  const getProductLabel = () => {
    if (type === 'lehanga') return 'Lehanga';
    if (type === 'half-saree') return 'Half Saree';
    return 'Saree';
  };

  const productLabel = getProductLabel();

  // Helper for restart path
  const getRestartPath = () => {
    if (type === 'lehanga') return '/lehanga/select';
    if (type === 'half-saree') return '/half-saree/select';
    return '/saree/select';
  };

  const handleImageError = () => {
    setCurrentImage(`https://placehold.co/400x600/1a1a2e/FFF?text=${productLabel}+Model`);
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
      setTimeLeft(10); 

      try {
        const payload = {
          type,
          selections: {
            productType: sareeType,
            baseColor: sareeColor,
            fabric: skirtFabric || lehangaFabric || sareeType,
            dupatta: dupattaFabric ? { fabric: dupattaFabric, color: dupattaColor } : null,
            border: hasBorder ? { type: borderType, color: borderColor } : "None",
            blouse: {
              color: blouseColor,
              frontNeck,
              backNeck,
              handDesign
            },
            embellishments: designs
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
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.description) setAiDescription(data.description);
        if (data.imageBase64) setCurrentImage(`data:image/png;base64,${data.imageBase64}`);
        else if (data.image) setCurrentImage(`data:image/png;base64,${data.image}`);

      } catch (error) {
        console.error("Backend integration failed:", error);
        setAiDescription(
          `Our AI designers crafted this high-fashion ${productLabel.toLowerCase()} look based on your unique luxury specifications.`
        );
      } finally {
        setIsGenerating(false);
        setTimeLeft(0);
      }
    };

    generateLook();
  }, [sareeType, sareeColor, hasBorder, borderType, borderColor, blouseColor, frontNeck, backNeck, handDesign, type]);

  const handleSave = () => {
    const link = document.createElement("a");
    link.href = currentImage;
    link.download = `bespoke-${productLabel.toLowerCase()}-design.png`;
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
            onClick={() => navigate(getRestartPath())}
            className="back-button"
            disabled={isGenerating}
          >
            ← Back to Selection
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">
              {isGenerating
                ? `Generating ${productLabel}... (${timeLeft}s)`
                : "AI Vision Ready"}
            </h1>
            <p className="page-subtitle">
              {isGenerating
                ? `Synthesizing your custom ${productLabel.toLowerCase()} specifications...`
                : `Your bespoke ${productLabel.toLowerCase()} design is ready for preview`}
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
                    Designing your masterpiece: {timeLeft}s remaining
                  </p>
                </div>
              </div>
            ) : (
              <div className="generated-result fade-in">
                <div className="result-image-wrapper">
                  <img
                    src={currentImage}
                    alt={`AI Generated ${productLabel}`}
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
                      {aiDescription || `A sophisticated ${productLabel.toLowerCase()} ensemble harmonizing traditional craftsmanship with modern silhouettes.`}
                    </p>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">{type === 'saree' ? 'Saree Style' : productLabel + ' Style'}</span>
                      <span className="value">{sareeType || "Classic"}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Base Color</span>
                      <span className="value">{sareeColor?.name || "Selected"}</span>
                    </div>

                    {(skirtFabric || lehangaFabric) && (
                       <div className="info-item">
                        <span className="label">{type === 'lehanga' ? 'Lehanga Fabric' : 'Skirt Fabric'}</span>
                        <span className="value">{skirtFabric || lehangaFabric}</span>
                      </div>
                    )}

                    {dupattaFabric && (
                       <div className="info-item">
                        <span className="label">Dupatta</span>
                        <span className="value">{dupattaFabric} {dupattaColor ? `(${dupattaColor.name})` : ''}</span>
                      </div>
                    )}

                    {hasBorder && (
                      <>
                        <div className="info-item">
                          <span className="label">Border</span>
                          <span className="value">{borderType}</span>
                        </div>
                        <div className="info-item">
                          <span className="label">Border Color</span>
                          <span className="value">{borderColor?.name}</span>
                        </div>
                      </>
                    )}

                    <div className="info-item">
                      <span className="label">Blouse Color</span>
                      <span className="value">{blouseColor?.name || "Match Selected"}</span>
                    </div>

                    {blouseFabric && (
                       <div className="info-item">
                        <span className="label">Blouse Fabric</span>
                        <span className="value">{blouseFabric}</span>
                      </div>
                    )}

                    {frontNeck && (
                      <div className="info-item">
                        <span className="label">Front Neck</span>
                        <span className="value">{frontNeck}</span>
                      </div>
                    )}
                    {backNeck && (
                      <div className="info-item">
                        <span className="label">Back Neck</span>
                        <span className="value">{backNeck}</span>
                      </div>
                    )}
                    {handDesign && (
                      <div className="info-item">
                        <span className="label">Hands / Sleeves</span>
                        <span className="value">{handDesign}</span>
                      </div>
                    )}
                    {designs && designs.length > 0 && (
                      <div className="info-item full-width">
                        <span className="label">Details & Work</span>
                        <span className="value">{designs.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="action-buttons">
                    <button
                      className="secondary-button"
                      onClick={() => navigate(getRestartPath())}
                    >
                      Restart Fresh
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
