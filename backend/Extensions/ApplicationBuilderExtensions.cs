using Microsoft.AspNetCore.Builder;
using Microsoft.Net.Http.Headers;

namespace Slimbo.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCachedFileServer(this IApplicationBuilder app, int duration = 31536000)
        {
            var options = new FileServerOptions();
            options.StaticFileOptions.OnPrepareResponse = context =>
                context.Context.Response.Headers[HeaderNames.CacheControl] = "public,max-age=" + duration;

            return app.UseFileServer(options);
        }
    }
}