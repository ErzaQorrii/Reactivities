using System;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Persistence; 

namespace API.Controllers
{
    // This controller handles HTTP
    public class ActivitiesController : BaseApiController
    {
        // HTTP GET: Retrieves a list of all activities from the database.
        [HttpGet] // Maps this method to GET requests at /api/activities.
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            // Use Entity Framework Core to fetch all records from the Activities table.
            return await Mediator.Send(new List.Query());
        }

        // HTTP GET: Retrieves a single activity by its unique identifier (GUID).
        [HttpGet("{id}")] // Maps this method to GET requests at /api/activities/{id}.
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
       }
       [HttpPost]
       public async Task<IActionResult> CreateActivity(Activity activity)
       {
        await Mediator.Send(new Create.Command{Activity=activity});
        return Ok();
       }
        [HttpPut("{id}")]
        public async Task<IActionResult>Edit(Guid id,Activity activity)
        {
            activity.Id=id;
            await Mediator.Send(new Edit.Command{Activity=activity});
            return Ok();
        }
      [HttpDelete("{id}")]
      public async Task<IActionResult>Delete(Guid id)
      {
        await Mediator.Send(new Delete.Command{Id=id});
        return Ok();
      }
       
       





}}
