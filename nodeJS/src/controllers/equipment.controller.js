/** @format */

const Equipment = require("../models/equipment.model")
const Room = require("../models/room.model")

const twilio = require("twilio")
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const mongoose = require("mongoose")


// Create new equipment
exports.createEquipment = async (req, res) => {
  try {
    const { room, ...rest } = req.body

    const equipment = new Equipment({
      ...rest,
      room,
    })

    const savedEquipment = await equipment.save()
    const populatedEquipment = await Equipment.findById(
      savedEquipment._id
    ).populate("room")

    res.status(201).json(populatedEquipment)
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {}
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message
      })
      res.status(400).json({ errors })
    } else if (err.code === 11000) {
      res.status(400).json({
        error:
          "This serial number is already in use. Please enter a unique serial number.",
      })
    } else {
      console.error("Error creating equipment:", err) // Add logging
      res.status(500).json({ error: "Internal server error" })
    }
  }
}

// Get all equipments
exports.getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find().populate("room")
    res.json(equipments)
  } catch (err) {
    console.error("Error fetching equipments:", err) // Add logging
    res.status(500).json({ error: "Internal server error" })
  }
}

// Get a single equipment
exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate("room")
    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" })
    res.json(equipment)
  } catch (err) {
    console.error("Error fetching equipment by ID:", err) // Add logging
    res.status(500).json({ error: "Internal server error" })
  }
}

// Update equipment
exports.updateEquipment = async (req, res) => {
  try {
    const { room, ...rest } = req.body

    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { ...rest, room },
      { new: true, runValidators: true }
    ).populate("room")

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" })
    }

    res.json(equipment)
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = {}
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message
      })
      res.status(400).json({ errors })
    } else if (err.code === 11000) {
      res.status(400).json({
        error:
          "This serial number is already in use. Please enter a unique serial number.",
      })
    } else {
      console.error("Error updating equipment:", err)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
// Delete equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id)
    if (!equipment)
      return res.status(404).json({ message: "Equipment not found" })
    res.json({ message: "Equipment deleted" })
  } catch (err) {
    console.error("Error deleting equipment:", err) // Add logging
    res.status(500).json({ error: "Internal server error" })
  }
}



exports.sendNotification = async (req, res) => {
  const { id } = req.params;
  const { type, message } = req.body;

  try {
    const equipment = await Equipment.findById(id).populate("room");
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    // Prepare the message if not provided
    const notificationMessage =
      message ||
      `Manual reminder: ${equipment.name} (Serial: ${equipment.serialNumber}) is due for maintenance soon!`;

    // Send SMS
    let smsError = null;
    try {
      const smsResponse = await client.messages.create({
        body: notificationMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+21625837933",
      });
      console.log("Twilio response for manual reminder:", smsResponse.sid);
    } catch (err) {
      console.error(`❌ Failed to send SMS for ${equipment.name}:`, err.message);
      smsError = err.message;
    }

    // Log the notification in the database
    equipment.notifications.push({ type, message: notificationMessage });
    equipment.lastNotified = new Date();
    await equipment.save();

    // Emit WebSocket event with error if SMS failed
    try {
      const io = req.io; // Use req.io as set in app.js
      if (io) {
        io.emit("maintenanceNotification", {
          equipmentId: equipment._id,
          message: notificationMessage,
          sentAt: new Date(),
          ...(smsError && { error: `Failed to send SMS: ${smsError}` }),
        });
      } else {
        console.error("Socket.IO instance not available on req.io");
      }
    } catch (err) {
      console.error("Error emitting WebSocket event:", err.message);
    }

    // Always send a response, even if WebSocket fails
    res.status(200).json({ message: "Notification logged successfully" });
  } catch (err) {
    console.error("Error in sendNotification:", err.message);
    res.status(500).json({ error: err.message });
  }
};





