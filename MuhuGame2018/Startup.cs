using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.Logging;
using MuhuGame2018.Helpers;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using MuhuGame2018.Services;
using Microsoft.Extensions.Logging.AzureAppServices;
using Serilog;
using Microsoft.WindowsAzure.Storage;

namespace nabe_order_management
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<DataContext>(x => x.UseInMemoryDatabase("TestDb"));
            services.AddDbContext<DataContext>(x => x.UseSqlite("DataSource=muhugame2018.db"));

            //services.AddDbContext<DataContext>(x => x.UseNpgsql("Host=pgsql.pipni.cz;Database=muhugame2018.cestuje.net;Username=muhugame2018.cestuje.net;Password=Mdmfced60"));
            //services.AddDbContext<DataContext>(x => x.UseMySql("Host=sql20.pipni.cz;Database=muhugame2018_cestuje_net;Username=muhugame2018.cestuje.net;Password=Mdmfced60"));
            //services.AddDbContext<DataContext>(x => x.UseMySql("server=sql20.pipni.cz;database=muhugame2018_cestuje_net;uid=muhugame2018.cestuje.net;pwd=Mdmfced60;"));
            //services.AddDbContext<DataContext>(x => x.UseMySql("server=localhost;database=;uid=muhugame2018.cestuje.net;pwd=Mdmfced60;"));

            services.AddMvc();
            services.AddAutoMapper();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMailService, MailService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Muhugame 2018 API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            loggerFactory.AddAzureWebAppDiagnostics(
              new AzureAppServicesDiagnosticsSettings
              {
                  OutputTemplate = "{Timestamp:yyyy-MM-dd HH:mm:ss zzz} [{Level}] {RequestId}-{SourceContext}: {Message}{NewLine}{Exception}"
              }
            );
            loggerFactory.AddSerilog();

            app.UseStaticFiles(/*new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    const int durationInSeconds = 60 * 60 * 24;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            }*/);

            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });   
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MuhuGame 2018 V1");
            });

            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase), builder =>
            {
                builder.UseMvc(routes =>
                {
                    routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
                    routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Home", action = "Index" });
                });
            });

            using (var context = serviceProvider.GetService<DataContext>())
            {
                context.Database.EnsureCreated();
                UserValidator.Initialize(context);
            }

            Log.Logger = new LoggerConfiguration()
                .WriteTo.AzureTableStorage(CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=jnstorage;AccountKey=yGxWAOAgQlj9Qqo9P8HEDlqlsglWvepD1Pq0UZG50Qq4C65hh+W5Ka+3CZAOP3/kvmOxJiCpyevsZAJHuQPU3g==;EndpointSuffix=core.windows.net"))
                .CreateLogger();
        }
    }
}
