using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services,IConfiguration config)
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

//Create databaseconnection for DataContext class
//Use SQLlite Database
services.AddDbContext<DataContext>(opt=>
    {
      opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
    }
);
services.AddCors(opt =>
{
opt.AddPolicy("CorsPolicy", policy =>
{
  policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});
});
services.AddMediatR(cfg=>cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
services.AddAutoMapper(typeof(MappingProfiles).Assembly);
return services;
        }
        
    }
}