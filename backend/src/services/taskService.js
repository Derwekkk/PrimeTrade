const Task = require("../models/Task");

class TaskService {
  async getTasks(userId, query = {}) {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = query;

    const filter = { user: userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortBy] = order === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sort).skip(skip).limit(parseInt(limit)),
      Task.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getTask(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async createTask(userId, taskData) {
    const task = await Task.create({
      ...taskData,
      user: userId,
    });

    return task;
  }

  async updateTask(taskId, userId, updates) {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }
}

module.exports = new TaskService();
