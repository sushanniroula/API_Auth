const { string, required } = require("@hapi/joi");
const mongoose = require("mongoose");

const LineGraph = new mongoose.Schema(
  {
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerSatisfaction: {
        type: Number,
        required: true,
    },
    retentionRate: {
        type: Number,
        required: true,
    },
    churnRate: {
        type: Number,
        required: true,
    },
    recentActivities: {
        type: [String]
    },
    chartData: [
        {
            line:{
                title: {
                    type: String,
                    required: true,
                },
                xAxis: {
                    type: [String],
                    required: true,
                },
                yAxis: {
                    type: [Number],
                    required: true,
                }
            },
            pi: {
                title: {
                    type: String,
                    required: true,
                },
                labels: {
                    type: [String],
                    required: true,
                },
                values: {
                    type: [Number],
                    required: true,
                },
            },
            bar: {
                title: {
                    type: String,
                    required: true,
                },
                xAxis: {
                    type: [String],
                    required: true,
                },
                yAxis: {
                    type: [Number],
                    required: true,
                }
            }
        }
    ]
  }
);

module.exports = mongoose.model("Dashboard", LineGraph);
