import { useState, useContext } from "react";
import { GeneralContext } from "../contexts/generalContext";

const ImageLinkForm = () => {
  const {
    imageUrl,
    setImageUrl,
    imageResult,
    setImageResult,
    loadUser,
    setLoadUser,
  } = useContext(GeneralContext);
  const [boxStyle, setBoxStyle] = useState("");
  const localUser = loadUser.name;
  let localEntries = loadUser.entries;

  const MODEL_ID = "face-detection";
  const PAT = import.meta.env.VITE_CLARIFAI_PAT;
  const USER_ID = import.meta.env.VITE_CLARIFAI_USER_ID;
  const APP_ID = import.meta.env.VITE_CLARIFAI_APP_ID;
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const boxData = data.outputs[0].data.regions;

    if (boxData.length === 0) return null;
    else if (boxData.length === 1) {
      const clarifaiFace =
        data.outputs[0].data.regions[0].region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    } else {
      return boxData.map((box) => {
        const clarifaiFace = box.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height,
        };
      });
    }
  };

  const displayFaceBox = (box) => {
    setBoxStyle(box);
  };

  const onSubmit = () => {
    setImageResult(imageUrl);
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          if (localUser === "Guest") {
            setLoadUser({ name: "Guest", entries: localEntries + 1 });
          } else {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: loadUser.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => (loadUser.entries = count));
          }
        }
        displayFaceBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <p className="block mb-10 font-medium text-gray-700 text-2xl">
        This Magic Brain will detect faces in your pictures. Give it a try!
      </p>
      <div className="flex max-w-3xl m-auto items-center p-10 shadow-xl rounded-lg relative">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-bl-lg rounded-tl-lg focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5 focus:outline-none transition duration-300 ease-in-out h-10"
          onChange={handleUrlChange}
        />
        <button
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-br-lg rounded-tr-lg text-sm px-5 py-2.5 w-4/12 transition duration-300 ease-in-out"
          onClick={onSubmit}
        >
          Detect
        </button>
      </div>
      <div className="relative w-fit mx-auto">
        <img
          className="relative mt-7 mb-4 mx-auto w-full max-w-sm shadow-2xl rounded-2xl"
          id="inputImage"
          src={imageResult}
          alt=""
        />
        {!Array.isArray(boxStyle) ? (
          <div
            className="bounding-box"
            style={{
              top: boxStyle.topRow,
              right: boxStyle.rightCol,
              bottom: boxStyle.bottomRow,
              left: boxStyle.leftCol,
            }}
          ></div>
        ) : (
          boxStyle.map((box, index) => (
            <div
              className="bounding-box"
              key={index} // it's safe to use index as key, the Data is static,
              style={{
                top: box.topRow,
                right: box.rightCol, // reordering the list or filtering is not going to happen.
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageLinkForm;
