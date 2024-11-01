using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [Route("todoitems")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDb _db;

        public TodoController(TodoDb db)
        {
            _db = db;
        }

        // GET: /todoitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _db.Todos.ToListAsync();
        }

        // GET: /todoitems/complete
        [HttpGet("complete")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetCompleteTodos()
        {
            return await _db.Todos.Where(t => t.IsComplete).ToListAsync();
        }

        // GET: /todoitems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoById(int id)
        {
            var todo = await _db.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // POST: /todoitems
        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
        {
            _db.Todos.Add(todo);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
        }

        // PUT: /todoitems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, Todo inputTodo)
        {
            var todo = await _db.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            todo.Name = inputTodo.Name;
            todo.IsComplete = inputTodo.IsComplete;

            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: /todoitems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _db.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _db.Todos.Remove(todo);
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
