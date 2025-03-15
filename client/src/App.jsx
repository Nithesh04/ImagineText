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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white-500 to-white-600 text-black p-12">
      <Heading content="ImagineText" />
      <br/>
      <SubHeading  />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mt-12">
        
        <div className="bg-white/10 backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full min-h-[500px] flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-center mb-6">Upload Image</h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-6">
            <input
              type="file"
              name="file"
              id="file"
              className="block text-black w-full text-white-300  file:mr-4 file:py-4 file:px-8 file:rounded-lg file:border-0 file:text-xl file:font-semibold file:bg-black/20 file:text-white hover:file:bg-grey/50 transition"
              onChange={handleImageChange}
              accept="image/*"
            />
            {selectedImage && (
              <div className="mt-6">
                <img src={selectedImage} alt="Selected" className="max-w-96 max-h-96 rounded-lg shadow-lg" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-white-700 transition px-8 py-4 rounded-xl text-black font-semibold disabled:bg-gray-400 text-xl"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Extract Text"}
            </button>
          </form>
        </div>

        
        <div className="bg-blue backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full min-h-[500px] flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-center mb-6">Extracted Text</h2>
          <textarea
            id="text"
            className="w-full h-80 bg-white/20 text-black p-6 text-xl rounded-lg resize-none shadow-lg"
            value={text}
            readOnly
            ref={textareaRef}
          ></textarea>
          <button
            className="w-full mt-6 bg-green-500 hover:bg-green-700 transition px-8 py-4 rounded-xl text-black font-semibold text-xl"
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
