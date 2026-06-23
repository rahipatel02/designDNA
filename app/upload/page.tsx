"use client";

import { useState } from "react";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [brightness, setBrightness] = useState<number | null>(null);
  const [contrast, setContrast] = useState<number | null>(null);
  const [sharpness, setSharpness] = useState<number | null>(null);

  const [score, setScore] = useState<number | null>(null);
  const [quality, setQuality] = useState("");

  const [feedback, setFeedback] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
    setFileName(file.name);

    const sizeMB = (
      file.size /
      1024 /
      1024
    ).toFixed(2);

    setFileSize(sizeMB + " MB");

    setBrightness(null);
    setContrast(null);
    setSharpness(null);
    setScore(null);
    setQuality("");
    setFeedback([]);
  };

  const analyzeDesign = async () => {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "file",
        file
      );

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Analysis failed"
        );
      }

      const data =
        await response.json();

      console.log(
        "Analysis Result:",
        data
      );

      setBrightness(
        data.brightness
      );

      setContrast(
        data.contrast
      );

      setSharpness(
        data.sharpness
      );

      setScore(
        data.score
      );

      setQuality(
        data.quality
      );

      setFeedback(
        data.feedback
      );

    } catch (error) {
      console.error(error);

      alert(
        "Failed to analyze image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-10">
        Upload Design
      </h1>

      <div className="max-w-3xl mx-auto border border-gray-700 rounded-xl p-10">

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-8"
        />

        {fileName && (
          <div className="mb-5">
            <p>
              <strong>File:</strong>{" "}
              {fileName}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {fileSize}
            </p>
          </div>
        )}

        {image && (
          <>
            <img
              src={image}
              alt="Preview"
              className="rounded-xl max-h-[500px] mx-auto mb-6"
            />

            <button
              onClick={analyzeDesign}
              disabled={loading}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold block mx-auto hover:bg-gray-200 transition"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Design"}
            </button>

            {brightness !== null && (
              <div className="mt-8 text-center space-y-3">

                <p>
                  <strong>
                    Brightness:
                  </strong>{" "}
                  {brightness.toFixed(
                    2
                  )}
                </p>

                <p>
                  <strong>
                    Contrast:
                  </strong>{" "}
                  {contrast?.toFixed(
                    2
                  )}
                </p>

                <p>
                  <strong>
                    Sharpness:
                  </strong>{" "}
                  {sharpness?.toFixed(
                    2
                  )}
                </p>

                <p className="text-2xl font-bold text-green-400">
                  Design Score: {score}/100
                </p>

                <p className="text-lg text-blue-400 font-semibold">
                  Quality: {quality}
                </p>

                <div className="mt-6 border border-gray-700 rounded-xl p-4 text-left">
                  <h3 className="font-bold mb-3">
                    AI Feedback
                  </h3>

                  <ul className="list-disc pl-5 space-y-2">
                    {feedback.map(
                      (
                        item,
                        index
                      ) => (
                        <li
                          key={
                            index
                          }
                        >
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}