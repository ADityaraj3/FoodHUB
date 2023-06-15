import { useRef, useState } from "react";
const fs = require("fs");
// fs.writeFileSync()

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  } 

export default function SearchByImage() {
  var file = null;
  const input = useRef();


  function handleChange(event) {
    console.log(event);
    file = event.target.files[0];
  }

  function submitHandler(ev) {
    ev.preventDefault();
    getBase64(file).then(function(data) {
        // console.log("data",data)
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": "aditya_raj",
                "app_id": "app_id"
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "base64": data
                        }
                    }
                }
            ]
            });
    
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + '6faf225276c14e7aaec95a29cb82e2bd'
                    
                },
                body: raw
            };
            // console.log(raw)
            // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
            // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
            // this will default to the latest version_id
    
            fetch(`https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        // do something with value
      }, function(error) {
        // do something with errorconst raw = JSON.stringify({
      });
    }
  

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="file" ref={input} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
