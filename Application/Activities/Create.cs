using System;
using System.Collections.Generic;
using Domain;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    // Represents the "Create" functionality for activities using the CQRS pattern.
    public class Create
    {
        // Command object: This represents a request to create a new Activity.
        // In CQRS, Commands are write operations that modify the system state.
        public class Command : IRequest
        {
            // The Activity object to be added to the database.
            public Activity Activity { get; set; }
        }

        // Handler: Processes the Create.Command and performs the write operation.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context; // Data context for database interactions.

            // Constructor for injecting the DataContext dependency.
            public Handler(DataContext context)
            {
                _context = context; // Assign the injected DataContext to the private field.
            }

            // Asynchronous method to handle the Command and create a new activity.
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Add the new Activity object to the database context.
                _context.Activities.Add(request.Activity);

                // Save changes to the database asynchronously.
                // Use the cancellationToken to handle operation cancellations.
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}