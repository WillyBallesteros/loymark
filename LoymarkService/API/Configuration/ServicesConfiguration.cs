using Data;
using Services.UserService;

namespace API.Configuration
{
    public static class ServicesConfiguration
    {
        public static IServiceCollection AddContextDependencies(this IServiceCollection serviceCollection)
        {
            var services = serviceCollection;
            services.AddScoped<ILoymarkDbContext, LoymarkDbContext>();
            return services;
        }

        public static IServiceCollection AddServicesDependencies(this IServiceCollection serviceCollection)
        {
            var services = serviceCollection;
            services.AddScoped<IUserService, UserService>();
            return services;
        }
    }
}
