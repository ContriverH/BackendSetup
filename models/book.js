const mongoose = require("mongoose");
// const path = require("path");

// const coverImageBasePath = "uploads/bookCovers";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  coverImage: {
    type: Buffer, // We want to store the actual image onto our local system. So, for that we are using filepond library. And filepond returns the image string as a buffer.
    // here we are passing the name of the image that we want to store, so that we have to store a small string instead of the whole file. And we can store the actual image on our server on the file system. We will try to store the file on the file system whenever we can.
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author", // It is the name of the schema to which we are referring.
  },
});

// bookSchema.virtual("coverImagePath").get(function () {
//   // virtual will all the property as all other fields in the model, but it is going to derive its value from those fields.
//   if (this.coverImage != null) {
//     return path.join("/", coverImageBasePath, this.coverImage);
//   }
// });

bookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    // we want to return the source of image object.
    // ` ` is called template string, so that we can use our variables inside of it.
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`; // this data object in HTML allows us to take the Buffer data and use that as actual source for our image.
  }
});

module.exports = mongoose.model("Book", bookSchema);
// module.exports.coverImageBasePath = coverImageBasePath; // exporting it as a named variable.
