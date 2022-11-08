using Data;
using Domain.Logger;
using Domain.Validators.Shared;
using FluentValidation;
using Microsoft.Net.Http.Headers;
using Services.ActivityService;
using Services.UserService;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                    builder => builder.WithOrigins("https://localhost:44333",
                                                  "http://127.0.0.1:3000",
                                                  "https://127.0.0.1:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) => true)
                        .WithExposedHeaders(HeaderNames.ContentDisposition));
        });

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddScoped<ICommonValidators, CommonValidators>();

        builder.Services.AddValidatorsFromAssembly(typeof(CommonValidators).Assembly);

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddScoped<ILoymarkDbContext, LoymarkDbContext>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IActivityService, ActivityService>();
        builder.Services.AddSingleton<ILoggerManager, LoggerManager>();
        
        builder.Services.AddAutoMapper(typeof(Services.UserService.UserService));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}