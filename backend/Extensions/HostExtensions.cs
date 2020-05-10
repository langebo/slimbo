using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Polly;
using Slimbo.Data;
using Slimbo.Models.Entities;

namespace Slimbo.Extensions
{
    public static class HostExtensions
    {
        public static IHost Migrate<TContext>(this IHost host) where TContext : DbContext
        {
            using var scope = host.Services.CreateScope();
            var db = scope.ServiceProvider.GetService<TContext>();
            var logger = host.Services.GetService<ILogger<IHost>>();

            Policy
                .Handle<Exception>()
                .WaitAndRetry(5, retry => TimeSpan.FromSeconds(retry * 5),
                    (ex, ts) => logger.LogCritical(ex, $"Unable to migrate database, retrying in {ts}"))
                .Execute(() => db.Database.Migrate());

            return host;
        }

        public static IHost Seed(this IHost host)
        {
            using var scope = host.Services.CreateScope();
            var env = scope.ServiceProvider.GetService<IWebHostEnvironment>();

            if (!env.IsDevelopment())
                return host;

            var measurements = new List<Measurement>();
            var rnd = new Random();
            var weight = 88.2D;
            var date = DateTimeOffset.UtcNow;

            for (var i = 50; i > 0; i--)
            {
                var diff = rnd.NextDouble() * 2 - 1;
                weight += diff;
                measurements.Add(new Measurement
                {
                    Weight = weight,
                    Timestamp = date
                        .AddDays(i * (-1))
                        .AddHours(rnd.Next(0, 2) - 1)
                        .AddMinutes(rnd.Next(0, 60) - 30)
                });
            }

            var db = scope.ServiceProvider.GetService<AppDbContext>();

            db.AddRange(measurements);
            db.SaveChanges();

            return host;
        }
    }
}