const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({

    text: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
      replies:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
      }]
      },

    {
      timestamps: true,
    }
  
);

module.exports = mongoose.model("Post", PostSchema);
