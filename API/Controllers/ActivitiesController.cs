using System; 
using Domain; 
using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Persistence; 

namespace API.Controllers
{
    // This controller handles HTTP requests related to activities.
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context; // Database context for interacting with the database.

        // Constructor for dependency injection of the DataContext.
        public ActivitiesController(DataContext context)
        {
            _context = context; // Assign the injected context to a private field.
        }

        // HTTP GET: Retrieves a list of all activities from the database.
        [HttpGet] // Maps this method to GET requests at /api/activities.
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // Use Entity Framework Core to fetch all records from the Activities table.
            return await _context.Activities.ToListAsync();
        }

        // HTTP GET: Retrieves a single activity by its unique identifier (GUID).
        [HttpGet("{id}")] // Maps this method to GET requests at /api/activities/{id}.
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            // Use Entity Framework Core to find a specific activity by its ID.
            return await _context.Activities.FindAsync(id);
        }
    }
}
