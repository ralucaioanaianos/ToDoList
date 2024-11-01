using api;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS for the React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React app URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure in-memory database for Todo items
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));

// Register controllers
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowReactApp");

// Map controllers
app.MapControllers();

app.Run();
