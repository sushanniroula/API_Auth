const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  totalInstances: {
    type: Number,
    default: 0,
  },
  activeUser: {
    type: Number,
    default: 0,
  },
  failedLogins: {
    type: Number,
    default: 0,
  },
  instances:[
    {
        instanceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        apiToken: {
            type: String,
            require: true,
        },
        ipAddress: {
            type: String,
    
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Active", "In-active", "Pending"],
            default: "Pending"
        },
        lastBackup: {
            type: Date,
        },
        databaseSize: {
            type: String
        },
        apiCallUsed: {
            type: Number,
            default: 0
        },
        loginAttemps: {
            type: Number,
            default: 0
        },
        region: {
            type: String
        },
        notification: {
            type: String,
            enum: ["SMS", "Email", "Not required"],
            default: "Not required"
        }

    }
  ],
  activities: [
    {
      recent: {
        type: String,
      },
      timestamp:{
        type: Date,
        default: Date.now()
      }
    },
  ],
});

module.exports = mongoose.model("Admin", adminSchema);
