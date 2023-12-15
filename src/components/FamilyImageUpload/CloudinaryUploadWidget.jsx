// import React from "react";

// const CloudinaryUploadWidget = () => {


//     var myWidget = window.cloudinary.createUploadWidget(
//         {
//             cloudName: "di3t7lflz",
//             uploadPreset: "igbzgkxx"
//         },
//         (error, result) => {
//             if (!error && result && result.event === "success") {
//                 console.log("Done! Here is the image info: ", result.info);
//             }
//         }
//     );



//     document.getElementById("upload_widget").addEventListener(
//         "click",
//         function () {
//             myWidget.open();
//         },
//         false
//     );



//     return (
//         <button id="upload_widget" className="cloudinary-button">
//             Upload
//         </button>
//     );

// }

// export default CloudinaryUploadWidget;
