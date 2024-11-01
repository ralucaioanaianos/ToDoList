using Microsoft.EntityFrameworkCore;

namespace api
{
    public class TodoDb : DbContext
    {
        public TodoDb(DbContextOptions<TodoDb> options) : base(options) { }

        public DbSet<Todo> Todos => Set<Todo>();
    }
}
