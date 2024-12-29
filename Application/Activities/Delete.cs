using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using SQLitePCL;

namespace Application.Activities
{
    // Encapsulates the logic for deleting an activity in the system.
    public class Delete
    {
        // Command: Represents the data required to delete an activity.
        public class Command : IRequest
        {
            // The unique identifier (Id) of the activity to delete.
            public Guid Id { get; set; }
        }

        // Handler: Processes the Delete.Command and performs the delete operation.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context; // Database context for interacting with the Activities table.

            // Constructor: Injects the DataContext dependency for database operations.
            public Handler(DataContext context)
            {
                _context = context; // Assign the injected context to the private field.
            }

            // Asynchronous method to handle the Command and delete the specified activity.
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Find the activity to delete by its unique Id.
                var activity = await _context.Activities.FindAsync(request.Id);

                // Ensure the activity exists before attempting to delete.
                if (activity == null)
                {
                    throw new Exception("Activity not found"); // Optionally, use a custom exception.
                }

                // Mark the activity for removal from the database context.
                _context.Remove(activity);

                // Persist the changes to the database asynchronously.
                // Use the cancellationToken to handle operation cancellations.
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}