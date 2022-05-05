// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
  address public owner;

  event TodoCreated(uint indexed id, string title);
  event TodoUpdated(uint indexed id, Status status);
  event TodoDeleted(uint indexed id);

  enum Status {
    done,
    backlog,
    in_progress    
  }

  struct Todo {
    uint id;
    string title; 
    string description;
    Status status;
    address owner;
  }

  mapping(address => uint) private userTodoCounter;
  mapping(uint => address) private todoToUser;

  Todo[] private todos;

  constructor(){
    owner = address(this);
  }

   modifier _onlyTodoOwner(uint _id) {
    require(todoToUser[_id] == msg.sender, "You are not the owner of this list");
    _;
   } 

  function createTodo(
    string memory _title,
    string memory _description
    ) public  {
    
    uint id = userTodoCounter[msg.sender];

    Todo memory todo = Todo(id, _title, _description,Status.backlog, msg.sender);
    todoToUser[id] = msg.sender;
    todos.push(todo);
    userTodoCounter[msg.sender]++;

    emit TodoCreated(id, _title);

  }

  function updateTodoStatus(uint _id, uint _status) public _onlyTodoOwner(_id) {
    require(todos.length > 0, "No todos to update");
    require(_status >= 0 && _status <=2, "Invalid status");

    uint _counter = 0;

    for(uint i = 0; i < todos.length; i++){
      if(todos[i].id == _id){
        todos[_counter].status = Status(_status);
        todoToUser[todos[_counter].id] = msg.sender;
        _counter++;
      }
    }

    emit TodoUpdated(_id, Status(_status));

  }

  function getUserTodos () external view returns(Todo[] memory) {
      address _owner = msg.sender;
      Todo[] memory userTodos = new Todo[](userTodoCounter[_owner]);

      uint _counter = 0;

      for(uint i = 0; i < todos.length; i++){
        if(todos[i].owner == _owner){
          userTodos[_counter] = todos[i];
          _counter++;
        }
      }

      return userTodos;
  }

  function deleteTodo(uint _id) public _onlyTodoOwner(_id) {
    require(todos.length > 0, "No todos to delete");
    delete todoToUser[_id];

    uint _counter = 0;
    for(uint i = 0; i < todos.length; i++){
      if(todos[i].id == _id){
        delete todos[_counter];
        _counter++;
      }
    }

    userTodoCounter[msg.sender]--;

    emit TodoDeleted(_id);

  }


  function getAllTodos() public view returns(Todo[] memory) {
    return todos;
  }


}



