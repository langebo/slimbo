using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Slimbo.Data;
using Slimbo.Extensions;

namespace Slimbo
{
    public class Program
    {
        public static async Task Main(string[] args) =>
            await CreateHostBuilder(args)
                .Build()
                .Migrate<AppDbContext>()
                .Seed()
                .RunAsync();

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                    webBuilder.UseStartup<Startup>());
    }
}
