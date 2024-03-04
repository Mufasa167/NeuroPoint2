import mongoose from "mongoose";

const bookingTestSchema = new mongoose.Schema(
  {
    tester: {
      type: mongoose.Types.ObjectId,
      ref: "tester",
      required: true,
    },
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ticketPrice: { type: String, required: true },
    // appointmentDate: {
    //   type: Date,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    // isPaid: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingTestSchema);