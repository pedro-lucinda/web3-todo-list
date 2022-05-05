const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("create tasks", async () => {
    await this.todoList.createTodo("task one", "task one description");
    await this.todoList.createTodo("task two", "task two description");

    const userTasks = await this.todoList.getUserTodos();

    assert.equal(userTasks.length, 2);
  });

  it("updates tasks status", async () => {

    await this.todoList.updateTodoStatus(0, 2);

  const userTasks = await this.todoList.getUserTodos();
  assert.equal(userTasks[0].status, 2);
  });

  it("deletes tasks", async () => {
    await this.todoList.deleteTodo(0);

    const userTasks = await this.todoList.getUserTodos();

    assert.equal(userTasks.length, 1);
  })
});
