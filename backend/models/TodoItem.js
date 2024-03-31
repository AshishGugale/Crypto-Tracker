import mongoose from "mongoose";

const Item = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    UUID: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    Deadline: {
        type: String,
        required: true
    }
})

const TodoItem = mongoose.model("TodoList", Item);
export default TodoItem;