using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Slimbo.Data;
using Slimbo.Extensions;

namespace Slimbo
{
    public class Startup
    {
        private readonly IConfiguration config;

        public Startup(IConfiguration config)
        {
            this.config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(o =>
                o.UseNpgsql(config.GetConnectionString("postgres")));

            services.AddControllers();
            services.AddResponseCompression();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseWhen(_ => env.IsDevelopment(), a =>
                a.UseCors(c => c.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader()));

            app.UseResponseCompression();
            app.UseCachedFileServer();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
                endpoints.MapControllers());
        }
    }
}
