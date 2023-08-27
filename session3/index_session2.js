const fs = require("node:fs");
const { resolve } = require("node:path");
const superagent = require("superagent");

//================================================
// fs.readFile("./dog.txt", (err, data) => {
//   console.log(data);
//   superagent
//     .get(`https://dog.ceo/api/${data}/image/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) {
//           console.log(err.message);
//           return;
//         }
//         console.log("Image is saved to file");
//       });
//     })
//     .catch((err) => {
//       console.log(`OK error: ${err.message}`);
//     });
// });

//================================================
// const fs = require("node:fs/promises");
// fs.readFile(`${__dirname}/dog.txt`, "utf-8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log("OK error: " + error.message);
//   });

// const fs = require("node:fs");
// const readableStream = fs.createReadStream(`${__dirname}/dog-img.txt`, "utf-8");
// readableStream.on("data", (chunk) => {
//   console.log("data is: " + chunk);
// });

// function okbanoi(path) {
//   let temp_view = path;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Before invoke resolve");
//       resolve(temp_view);
//       console.log("After invoke resolve");
//     }, 1000);
//   });
// }

// okbanoi("hello")
//   .then((value) => {
//     console.log("Data0 is: " + value);
//     return `${value} and bar`;
//   })
//   .then((value) => {
//     console.log("Data1 is: " + value);
//     return `${value} and bar again`;
//   })
//   .then((value) => {
//     console.log("Data2 is: " + value);
//     return `${value} and again`;
//   })
//   .then((value) => {
//     console.log("Data3 is: " + value);
//     return `${value} and again`;
//   })
//   .then((value) => {
//     console.log("Data4 is: " + value);
//   })
//   .catch((err) => {
//     console.log("error all");
//     console.error(err);
//   });

//================================================
const readFilePro = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFilePro = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("write done");
      }
    });
  });
};

(async () => {
  console.log("1.Before await");
  const data = await readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
      console.log("data0 is: " + data);
      return superagent.get(`https://dog.ceo/api/${data}/image/random`);
    })
    .then((res) => {
      console.log(res.body.message);
      return writeFilePro("dog-img0.txt", res.body.message);
    })
    .then((data) => {
      console.log("Data1 is: " + data);
      console.log("Image is saved to file");
      return "data then";
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("3.After await");
  console.log(data);
})();

const getDogPic = async () => {
  try {
    console.log("Start to read file");
    const data = await readFilePro(`${__dirname}/dog0.txt`);
    console.log("Data read is: " + data);

    console.log("Start to get image from server");
    const res = await superagent.get(
      `https://dog.ceo/api0/${data}/image/random`
    );

    console.log("Get file done");
    console.log("Start to write image in dog-img0.txt");
    await writeFilePro("dog-img0.txt", res.body.message);
    console.log("Image is saved to file");
  } catch (err) {
    console.log("Catch process...");
    throw err;
  }

  return "ok ban oi";
};

// getDogPic()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// (async () => {
//   try {
//     console.log("1.Before await");
//     const data = await getDogPic();
//     console.log("3.After await,data: " + data);
//   } catch (err) {
//     console.log(err);
//   }
// })();
