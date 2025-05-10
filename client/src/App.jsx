import { useState, useRef } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import Spinner from "./components/Spinner";

const App = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      alert("Please select an image before submitting.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.file.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/extractTextFromImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setText(response.data.text);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <Heading content="ImagineText" />
      <SubHeading />

      <div className="bg-gray-200 p-6 rounded-lg mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="flex flex-col items-center justify-start">
          <h2 className="font-semibold mb-2">Select Your Image</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
            <input
              type="file"
              name="file"
              id="file"
              className="bg-white p-2 rounded-md w-full text-sm"
              onChange={handleImageChange}
              accept="image/*"
            />
            {selectedImage && (
              <img src={selectedImage} alt="Selected" className="max-w-[180px] rounded-md" />
            )}
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>

        {/* Text Output Section */}
        <div className="flex flex-col items-center">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <textarea
            ref={textareaRef}
            readOnly
            value={text}
            className="w-full h-48 p-4 rounded-md bg-white text-sm"
          ></textarea>
          <button
            className="mt-4 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded w-full"
            onClick={() => {
              navigator.clipboard.writeText(text);
              alert("Text copied to clipboard!");
            }}
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
