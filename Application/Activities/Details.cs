using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Persistence;

namespace Application.Activities
{
    // Encapsulates the logic for retrieving details of a specific activity.
    public class Details
    {
        // Query: Represents the data required to fetch a specific activity.
        public class Query : IRequest<Activity>
        {
            // The unique identifier (Id) of the activity to retrieve.
            public Guid Id { get; set; }
        }

        // Handler: Processes the Details.Query and retrieves the activity.
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context; // Database context for accessing activities.

            // Constructor: Injects the DataContext dependency for database operations.
            public Handler(DataContext context)
            {
                _context = context; // Assign the injected context to the private field.
            }

            // Asynchronous method to handle the Query and fetch the specified activity.
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                // Finds and returns the activity by its unique Id.
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}