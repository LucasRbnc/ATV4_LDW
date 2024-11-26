import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
{
    titulo: {
      type: String,
      trim: true,
      required: [true, "O título é obrigatório"],
    },
    descricao: {
        type: String,
        trim: true
    },
    data: {
        type: Date,
        required: [true, "A data é obrigatória"]
    },
    local: {
        type: String,
        trim: true,
        required: [true, "O local é obrigatório"]
    }
});

const EventModel = mongoose.model("Event", EventSchema, "events");

export default EventModel;