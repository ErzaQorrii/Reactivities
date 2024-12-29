using System;
using System.Collections.Generic;
using Domain;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Activities
{
    // Encapsulates the logic for editing an existing activity using CQRS.
    public class Edit
    {
        // Command: Represents the data required to edit an activity.
        public class Command : IRequest
        {
            // The updated Activity object with changes to be applied.
            public Activity Activity { get; set; }
        }

        // Handler: Processes the Edit.Command and applies the changes.
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context; // Database context for interacting with Activities.
            private readonly IMapper _mapper; // Mapper for efficiently copying data between objects.

            // Constructor: Injects DataContext and IMapper dependencies.
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context; // Assign the injected context to the private field.
                _mapper = mapper;   // Assign the injected mapper to the private field.
            }

            // Asynchronous method to handle the Command and apply the edit operation.
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Find the existing activity by its unique Id in the database.
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                // Ensure the activity exists before attempting to edit it.
                if (activity == null)
                {
                    throw new Exception("Activity not found"); // Optionally, use a custom NotFoundException.
                }

                // Map the updated data from the incoming Activity object to the existing entity.
                _mapper.Map(request.Activity, activity);

                // Save the changes to the database asynchronously.
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}