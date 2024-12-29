using System;
using System.Collections.Generic;
using Domain;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    // Mediator Query class to encapsulate the logic for listing activities
    public class List
    {
        // Defines a query that requests a list of Activity objects
        public class Query : IRequest<List<Activity>> { }

        // Handler to process the Query and return the result
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context; // Dependency injection of DataContext to interact with the database

            // Constructor to initialize the DataContext
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Method to handle the query and return a list of activities
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Fetches all activities from the Activities table and converts them to a list asynchronously
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
