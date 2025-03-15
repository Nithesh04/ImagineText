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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 text-black p-10">
      <Heading content="ImagineText" />
      <SubHeading />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mt-10">
        
        
        <div className="bg-white p-8 rounded-xl shadow-md w-full min-h-[400px] flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold text-center mb-4">Upload Image</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
            <input
              type="file"
              name="file"
              id="file"
              className="block w-full file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-lg file:font-medium file:bg-gray-200 file:text-black hover:file:bg-gray-300 transition"
              onChange={handleImageChange}
              accept="image/*"
            />
            {selectedImage && (
              <div className="mt-4">
                <img src={selectedImage} alt="Selected" className="max-w-56 max-h-56 rounded-lg shadow" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-medium text-lg"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Extract Text"}
            </button>
          </form>
        </div>

        
        <div className="bg-white p-8 rounded-xl shadow-md w-full min-h-[400px] flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-center mb-4">Extracted Text</h2>
          <textarea
            id="text"
            className="w-full h-48 bg-gray-100 text-black p-4 text-lg rounded-lg resize-none shadow-inner"
            value={text}
            readOnly
            ref={textareaRef}
          ></textarea>
          <button
            className="w-full mt-4 bg-green-500 hover:bg-green-700 transition px-6 py-3 rounded-lg text-white font-medium text-lg"
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
