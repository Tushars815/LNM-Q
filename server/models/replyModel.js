const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema({

    text: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      },
    },

    {
      timestamps: true,
  
    });

module.exports = mongoose.model("Reply", ReplySchema);
